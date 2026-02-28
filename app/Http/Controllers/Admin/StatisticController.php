<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreStatisticRequest;
use App\Http\Requests\Admin\UpdateStatisticRequest;
use App\Models\Statistic;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StatisticController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Statistic::class);

        $statistics = Statistic::orderBy('order')
            ->get()
            ->map(fn (Statistic $s) => [
                'id' => $s->id,
                'stat_key' => $s->stat_key,
                'stat_label' => $s->stat_label,
                'stat_value' => $s->stat_value,
                'stat_prefix' => $s->stat_prefix,
                'stat_suffix' => $s->stat_suffix,
                'order' => $s->order,
                'is_visible' => $s->is_visible,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/statistics/index', [
            'statistics' => $statistics,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Statistic::class);

        return Inertia::render('admin/statistics/create');
    }

    public function store(StoreStatisticRequest $request): RedirectResponse
    {
        Statistic::create($request->validated());

        return to_route('admin.statistics.index')
            ->with('success', 'Statistic created successfully.');
    }

    public function edit(Statistic $statistic): Response
    {
        $this->authorize('update', $statistic);

        return Inertia::render('admin/statistics/edit', [
            'statistic' => [
                'id' => $statistic->id,
                'stat_key' => $statistic->stat_key,
                'stat_label' => $statistic->stat_label,
                'stat_value' => $statistic->stat_value,
                'stat_prefix' => $statistic->stat_prefix,
                'stat_suffix' => $statistic->stat_suffix,
                'icon' => $statistic->icon,
                'order' => $statistic->order,
                'is_visible' => $statistic->is_visible,
            ],
        ]);
    }

    public function update(UpdateStatisticRequest $request, Statistic $statistic): RedirectResponse
    {
        $statistic->update($request->validated());

        return to_route('admin.statistics.index')
            ->with('success', 'Statistic updated successfully.');
    }

    public function destroy(Statistic $statistic): RedirectResponse
    {
        $this->authorize('delete', $statistic);

        $statistic->delete();

        return to_route('admin.statistics.index')
            ->with('success', 'Statistic deleted successfully.');
    }
}
