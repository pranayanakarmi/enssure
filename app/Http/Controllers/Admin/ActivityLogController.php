<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ActivityLogController extends Controller
{
    public function index(Request $request): Response
    {
        $logs = $this->filteredQuery($request)
            ->orderByDesc('id')
            ->paginate(25)
            ->withQueryString()
            ->through(fn (ActivityLog $log) => [
                'id' => $log->id,
                'actor_id' => $log->actor_id,
                'actor_name' => $log->actor_name,
                'actor_role' => $log->actor_role,
                'event' => $log->event,
                'description' => $log->description,
                'subject_type' => $log->subject_type,
                'subject_id' => $log->subject_id,
                'subject_label' => $this->subjectLabel($log),
                'route_name' => $log->route_name,
                'method' => $log->method,
                'url' => $log->url,
                'ip_address' => $log->ip_address,
                'created_at' => $log->created_at?->toDateTimeString(),
                'properties' => $log->properties,
            ]);

        return Inertia::render('admin/activity_logs/index', [
            'logs' => $logs,
            'filters' => [
                'event' => $request->string('event')->value(),
                'actor_role' => $request->string('actor_role')->value(),
                'actor_id' => $request->string('actor_id')->value(),
                'search' => $request->string('search')->value(),
                'subject_type' => $request->string('subject_type')->value(),
                'from' => $request->string('from')->value(),
                'to' => $request->string('to')->value(),
            ],
            'filterOptions' => [
                'events' => ActivityLog::query()
                    ->whereNotNull('event')
                    ->distinct()
                    ->orderBy('event')
                    ->pluck('event')
                    ->values()
                    ->all(),
                'subject_types' => ActivityLog::query()
                    ->whereNotNull('subject_type')
                    ->distinct()
                    ->orderBy('subject_type')
                    ->pluck('subject_type')
                    ->values()
                    ->all(),
            ],
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $fileName = 'activity-logs-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($request): void {
            $handle = fopen('php://output', 'w');

            if ($handle === false) {
                return;
            }

            fputcsv($handle, [
                'ID',
                'Created At',
                'Actor',
                'Actor Role',
                'Event',
                'Description',
                'Subject',
                'Route',
                'Method',
                'URL',
                'IP Address',
                'Before',
                'After',
            ]);

            $this->filteredQuery($request)
                ->orderByDesc('id')
                ->chunk(500, function ($logs) use ($handle): void {
                    foreach ($logs as $log) {
                        fputcsv($handle, [
                            $log->id,
                            $log->created_at?->toDateTimeString(),
                            $log->actor_name,
                            $log->actor_role,
                            $log->event,
                            $log->description,
                            $this->subjectLabel($log),
                            $log->route_name,
                            $log->method,
                            $log->url,
                            $log->ip_address,
                            json_encode($log->properties['changes']['before'] ?? $log->properties['deleted'] ?? [], JSON_UNESCAPED_SLASHES),
                            json_encode($log->properties['changes']['after'] ?? [], JSON_UNESCAPED_SLASHES),
                        ]);
                    }
                });

            fclose($handle);
        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    private function filteredQuery(Request $request): Builder
    {
        return ActivityLog::query()
            ->with('actor:id,name,email')
            ->when($request->filled('event'), fn (Builder $query) => $query->where('event', $request->string('event')))
            ->when($request->filled('actor_role'), fn (Builder $query) => $query->where('actor_role', $request->string('actor_role')))
            ->when($request->filled('actor_id'), fn (Builder $query) => $query->where('actor_id', $request->integer('actor_id')))
            ->when($request->filled('subject_type'), fn (Builder $query) => $query->where('subject_type', $request->string('subject_type')))
            ->when($request->filled('search'), function (Builder $query) use ($request): void {
                $search = (string) $request->string('search');

                $query->where(function (Builder $inner) use ($search): void {
                    $inner->where('description', 'like', "%{$search}%")
                        ->orWhere('url', 'like', "%{$search}%")
                        ->orWhere('route_name', 'like', "%{$search}%")
                        ->orWhere('actor_name', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('from'), fn (Builder $query) => $query->whereDate('created_at', '>=', (string) $request->string('from')))
            ->when($request->filled('to'), fn (Builder $query) => $query->whereDate('created_at', '<=', (string) $request->string('to')));
    }

    private function subjectLabel(ActivityLog $log): string
    {
        if ($log->subject_type === null || $log->subject_id === null) {
            return 'N/A';
        }

        $segments = explode('\\', $log->subject_type);
        $subject = end($segments);

        return sprintf('%s #%s', $subject ?: $log->subject_type, $log->subject_id);
    }
}
