<?php

namespace App\Http\Middleware;

use App\Models\FooterColumn;
use App\Models\HomeNewsSection;
use App\Models\ImportantPopup;
use App\Models\Menu;
use App\Models\Notice;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user() ? array_merge(
                    $request->user()->toArray(),
                    [
                        'roles' => $request->user()->getRoleNames()->all(),
                        'permissions' => $request->user()->getAllPermissions()->pluck('name')->all(),
                    ],
                ) : null,
                'roles' => $request->user()?->getRoleNames()->all() ?? [],
                'permissions' => $request->user()?->getAllPermissions()->pluck('name')->all() ?? [],
            ],
            'adminMenu' => self::resolveMenuUrls(config('admin_content.menu', []), $request),
            'mainMenu' => Menu::getMainHeaderForFrontend(),
            'footerColumns' => FooterColumn::with(['links' => fn ($q) => $q->orderBy('order')])
                ->orderBy('order')
                ->get()
                ->map(fn (FooterColumn $c) => [
                    'title' => $c->title,
                    'links' => $c->links->map(fn ($link) => [
                        'label' => $link->label,
                        'url' => $link->url,
                    ])->values()->all(),
                ])
                ->values()
                ->all(),
            'siteSetting' => function () {
                $s = SiteSetting::first();

                if (! $s) {
                    return null;
                }

                return [
                    'social_links' => array_filter([
                        ['platform' => 'facebook', 'url' => $s->facebook_url ?? ''],
                        ['platform' => 'x', 'url' => $s->x_url ?? ''],
                        ['platform' => 'youtube', 'url' => $s->youtube_url ?? ''],
                    ], fn ($l) => ! empty($l['url'])),
                    'header_phone_1' => $s->header_phone_1,
                    'header_phone_2' => $s->header_phone_2,
                    'header_fax' => $s->header_fax,
                    'header_email' => $s->header_email,
                    'logo_left_url' => $s->logo_left ? Storage::disk('public')->url($s->logo_left) : null,
                    'logo_center_url' => $s->logo_center ? Storage::disk('public')->url($s->logo_center) : null,
                    'logo_right_url' => $s->logo_right ? Storage::disk('public')->url($s->logo_right) : null,
                    'footer_privacy_policy_url' => $s->footer_privacy_policy_url,
                    'footer_terms_of_service_url' => $s->footer_terms_of_service_url,
                ];
            },
            'newsTickerItems' => fn () => self::newsTickerItemsFromHomeNotices(),
            'importantNotice' => fn () => $request->routeIs('home')
                ? self::importantNoticeForModal()
                : null,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }

    /**
     * Resolve featured notice data for the global guest modal.
     *
     * @return array{id: int, title: string, description: string|null, image_url: string|null, cta_text: string, cta_url: string}|null
     */
    protected static function importantNoticeForModal(): ?array
    {
        $popup = ImportantPopup::query()
            ->where('is_active', true)
            ->latest('updated_at')
            ->latest('id')
            ->first();

        if (! $popup) {
            return null;
        }

        return [
            'id' => $popup->id,
            'title' => $popup->title,
            'description' => $popup->description
                ? Str::of(strip_tags($popup->description))->squish()->limit(220)->toString()
                : null,
            'image_url' => $popup->image ? Storage::disk('public')->url($popup->image) : null,
            'cta_text' => $popup->cta_text ?: 'Learn More',
            'cta_url' => $popup->cta_url,
            'video_url' => $popup->video_url,
        ];
    }

    /**
     * Headlines for the guest layout ticker: same notices as the home page Latest News block (pivot order, max 20).
     *
     * @return list<array{id: int, title: string, url: string}>
     */
    protected static function newsTickerItemsFromHomeNotices(): array
    {
        $section = HomeNewsSection::query()->with('notices')->first();

        if (! $section) {
            return [];
        }

        return $section->notices
            ->take(20)
            ->map(fn (Notice $notice) => [
                'id' => $notice->id,
                'title' => $notice->title,
                'url' => '/notices/'.$notice->slug,
            ])
            ->values()
            ->all();
    }

    /**
     * Resolve route names to URLs and filter menu by permissions/roles.
     *
     * @param  array<int, mixed>  $menu
     * @return array<int, mixed>
     */
    protected static function resolveMenuUrls(array $menu, Request $request): array
    {
        $user = $request->user();
        $roles = $user?->getRoleNames()->all() ?? [];
        $permissions = $user?->getAllPermissions()->pluck('name')->all() ?? [];

        $filtered = [];
        foreach ($menu as $item) {
            $item = (array) $item;
            if (isset($item['href']) && is_string($item['href'])) {
                $item['href'] = Route::has($item['href']) ? route($item['href']) : '#';
            }
            if (isset($item['children'])) {
                $children = [];
                foreach ($item['children'] as $child) {
                    $child = (array) $child;
                    if (isset($child['href']) && is_string($child['href'])) {
                        $child['href'] = Route::has($child['href']) ? route($child['href']) : '#';
                    }
                    if (! self::menuItemVisible($child, $roles, $permissions)) {
                        continue;
                    }
                    $children[] = $child;
                }
                $item['children'] = $children;
                if (count($children) === 0) {
                    continue;
                }
            } elseif (! self::menuItemVisible($item, $roles, $permissions)) {
                continue;
            }
            $filtered[] = $item;
        }

        return $filtered;
    }

    /**
     * @param  array<string, mixed>  $item
     * @param  array<int, string>  $roles
     * @param  array<int, string>  $permissions
     */
    protected static function menuItemVisible(array $item, array $roles, array $permissions): bool
    {
        $isAdminOrSuperAdmin = count(array_intersect($roles, ['admin', 'super_admin'])) > 0;

        if (isset($item['role_only']) && is_array($item['role_only'])) {
            if (array_intersect($roles, $item['role_only']) === []) {
                return false;
            }
        }
        if (! empty($item['permission_resource'])) {
            if ($isAdminOrSuperAdmin) {
                return true;
            }
            $resource = $item['permission_resource'];
            $allowed = [
                "view {$resource}",
                "create {$resource}",
                "update {$resource}",
                "delete {$resource}",
            ];
            if (array_intersect($permissions, $allowed) === []) {
                return false;
            }
        }

        return true;
    }
}
