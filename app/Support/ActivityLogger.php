<?php

namespace App\Support;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Throwable;

class ActivityLogger
{
    /**
     * @param  array<string, mixed>  $before
     * @param  array<string, mixed>  $after
     * @return array{before: array<string, mixed>, after: array<string, mixed>}|null
     */
    public function diff(array $before, array $after): ?array
    {
        $keys = collect(array_keys($before))
            ->merge(array_keys($after))
            ->unique()
            ->reject(fn (string $key) => in_array($key, ['created_at', 'updated_at', 'deleted_at'], true))
            ->values();

        $changesBefore = [];
        $changesAfter = [];

        foreach ($keys as $key) {
            $beforeValue = $this->sanitizeValue($before[$key] ?? null);
            $afterValue = $this->sanitizeValue($after[$key] ?? null);

            if ($beforeValue === $afterValue) {
                continue;
            }

            $changesBefore[$key] = $beforeValue;
            $changesAfter[$key] = $afterValue;
        }

        if ($changesBefore === [] && $changesAfter === []) {
            return null;
        }

        return [
            'before' => $changesBefore,
            'after' => $changesAfter,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function modelAttributes(Model $model): array
    {
        return $this->sanitizeArray($model->attributesToArray());
    }

    /**
     * @param  array<string, mixed>  $properties
     */
    public function log(
        string $event,
        string $description,
        ?Model $subject = null,
        array $properties = [],
        ?User $actor = null,
    ): ?ActivityLog {
        try {
            $request = request();
            $authenticatedUser = Auth::user();
            $currentActor = $actor;

            if ($currentActor === null && $authenticatedUser instanceof User) {
                $currentActor = $authenticatedUser;
            }

            $logData = [
                'actor_id' => $currentActor?->id,
                'actor_name' => $currentActor?->name,
                'actor_role' => $this->resolveActorRole($currentActor),
                'event' => $event,
                'description' => $description,
                'route_name' => $request?->route()?->getName(),
                'method' => $request?->method(),
                'url' => $request?->fullUrl(),
                'ip_address' => $request?->ip(),
                'user_agent' => $request?->userAgent(),
                'properties' => $this->sanitizeValue($properties),
            ];

            if ($subject !== null && $subject->exists) {
                $logData['subject_type'] = $subject::class;
                $logData['subject_id'] = $subject->getKey();
            }

            return ActivityLog::query()->create($logData);
        } catch (Throwable $exception) {
            report($exception);

            return null;
        }
    }

    private function resolveActorRole(?User $actor): ?string
    {
        if ($actor === null) {
            return null;
        }

        if ($actor->hasRole('super_admin')) {
            return 'super_admin';
        }

        if ($actor->hasRole('admin')) {
            return 'admin';
        }

        $firstRole = $actor->getRoleNames()->first();

        return $firstRole !== null ? (string) $firstRole : 'user';
    }

    private function sanitizeValue(mixed $value): mixed
    {
        $sensitiveKeys = $this->sensitiveKeys();

        if ($value instanceof UploadedFile) {
            return [
                'original_name' => $value->getClientOriginalName(),
                'mime_type' => $value->getClientMimeType(),
                'size' => $value->getSize(),
            ];
        }

        if (is_array($value)) {
            $sanitized = [];

            foreach ($value as $key => $item) {
                if (is_string($key) && in_array(strtolower($key), $sensitiveKeys, true)) {
                    $sanitized[$key] = '[redacted]';
                } else {
                    $sanitized[$key] = $this->sanitizeValue($item);
                }
            }

            return $sanitized;
        }

        if (is_object($value)) {
            if ($value instanceof Model) {
                return [
                    'model' => $value::class,
                    'id' => $value->getKey(),
                    'attributes' => $this->sanitizeArray($value->attributesToArray()),
                ];
            }

            if ($value instanceof Collection) {
                return $value->map(fn (mixed $item) => $this->sanitizeValue($item))->all();
            }

            if ($value instanceof \DateTimeInterface) {
                return $value->format(DATE_ATOM);
            }

            if ($value instanceof \UnitEnum) {
                return $value->name;
            }

            if (method_exists($value, 'toArray')) {
                /** @var array<string, mixed> $arrayValue */
                $arrayValue = $value->toArray();

                return $this->sanitizeArray($arrayValue);
            }

            if ($value instanceof \JsonSerializable) {
                return $this->sanitizeValue($value->jsonSerialize());
            }

            if (method_exists($value, '__toString')) {
                return (string) $value;
            }

            return ['object' => $value::class];
        }

        if (is_string($value) && Str::contains(strtolower($value), ['bearer ', 'token '])) {
            return '[redacted]';
        }

        if (is_resource($value)) {
            return '[resource]';
        }

        return $value;
    }

    /**
     * @param  array<string, mixed>  $value
     * @return array<string, mixed>
     */
    private function sanitizeArray(array $value): array
    {
        $sanitized = [];

        foreach ($value as $key => $item) {
            if (is_string($key) && in_array(strtolower($key), $this->sensitiveKeys(), true)) {
                $sanitized[$key] = '[redacted]';

                continue;
            }

            $sanitized[$key] = $this->sanitizeValue($item);
        }

        return $sanitized;
    }

    /**
     * @return array<int, string>
     */
    private function sensitiveKeys(): array
    {
        return [
            'password',
            'password_confirmation',
            'current_password',
            'remember_token',
            'token',
            'two_factor_secret',
            'two_factor_recovery_codes',
            'g-recaptcha-response',
        ];
    }
}
