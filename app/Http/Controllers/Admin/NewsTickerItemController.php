<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNewsTickerItemRequest;
use App\Http\Requests\Admin\UpdateNewsTickerItemRequest;
use App\Models\NewsTickerItem;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NewsTickerItemController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', NewsTickerItem::class);

        $items = NewsTickerItem::orderBy('order')
            ->get()
            ->map(fn (NewsTickerItem $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'url' => $item->url,
                'order' => $item->order,
                'is_published' => $item->is_published,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/news_ticker_items/index', [
            'newsTickerItems' => $items,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', NewsTickerItem::class);

        return Inertia::render('admin/news_ticker_items/create');
    }

    public function store(StoreNewsTickerItemRequest $request): RedirectResponse
    {
        NewsTickerItem::create($request->validated());

        return to_route('admin.news_ticker_items.index')
            ->with('success', 'News ticker item created successfully.');
    }

    public function edit(NewsTickerItem $news_ticker_item): Response
    {
        $this->authorize('update', $news_ticker_item);

        $item = $news_ticker_item;

        return Inertia::render('admin/news_ticker_items/edit', [
            'newsTickerItem' => [
                'id' => $item->id,
                'title' => $item->title,
                'url' => $item->url,
                'order' => $item->order,
                'is_published' => $item->is_published,
            ],
        ]);
    }

    public function update(UpdateNewsTickerItemRequest $request, NewsTickerItem $news_ticker_item): RedirectResponse
    {
        $news_ticker_item->update($request->validated());

        return to_route('admin.news_ticker_items.index')
            ->with('success', 'News ticker item updated successfully.');
    }

    public function destroy(NewsTickerItem $news_ticker_item): RedirectResponse
    {
        $this->authorize('delete', $news_ticker_item);

        $news_ticker_item->delete();

        return to_route('admin.news_ticker_items.index')
            ->with('success', 'News ticker item deleted successfully.');
    }
}
