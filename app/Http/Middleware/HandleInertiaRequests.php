<?php

namespace App\Http\Middleware;

use App\Models\FooterColumn;
use App\Models\FooterSetting;
use App\Models\Menu;
use App\Models\NewsTickerItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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
            'footerSetting' => function () {
                $s = FooterSetting::first();

                return $s ? [
                    'copyright_text' => $s->copyright_text,
                    'social_links' => $s->social_links ?? [],
                ] : null;
            },
            'newsTickerItems' => NewsTickerItem::published()->orderBy('order')->limit(20)->get(['id', 'title', 'url'])->toArray(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
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
