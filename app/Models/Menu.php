<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    protected $fillable = [
        'name',
        'is_published',
        'is_main_header_menu',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'is_main_header_menu' => 'boolean',
        ];
    }

    public function items(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'menu_id')->whereNull('parent_id')->orderBy('order');
    }

    public function allItems(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'menu_id')->orderBy('order');
    }

    public function scopeMainHeader(Builder $query): void
    {
        $query->where('is_published', true)->where('is_main_header_menu', true);
    }

    /**
     * Get the main header menu as a tree for the frontend (title, href, target, children).
     *
     * @return array<int, array{title: string, href: string, target: string, children: array}>
     */
    public static function getMainHeaderForFrontend(): array
    {
        $menu = self::mainHeader()->first();

        if (! $menu) {
            return [];
        }

        $menu->load(['allItems' => fn ($q) => $q->orderBy('order')->with('post')]);

        $items = $menu->allItems->keyBy('id');

        $buildNode = function (MenuItem $item) use ($items, &$buildNode): array {
            $href = self::resolveMenuItemHref($item);
            $children = $items->where('parent_id', $item->id)->sortBy('order')->values()
                ->map(fn (MenuItem $child) => $buildNode($child))
                ->all();

            return [
                'title' => $item->title,
                'href' => $href,
                'target' => $item->target ?? '_self',
                'children' => $children,
            ];
        };

        return $items->whereNull('parent_id')->sortBy('order')->values()
            ->map(fn (MenuItem $item) => $buildNode($item))
            ->values()
            ->all();
    }

    protected static function resolveMenuItemHref(MenuItem $item): string
    {
        if (! empty(trim((string) $item->url))) {
            return $item->url;
        }

        if ($item->relationLoaded('post') && $item->post?->slug) {
            $prefix = trim((string) config('menus.post_path_prefix', 'posts'), '/');

            return '/'.($prefix !== '' ? $prefix.'/' : '').$item->post->slug;
        }

        return '#';
    }
}
