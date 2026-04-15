<?php

namespace App\Http\Middleware;

use App\Support\ActivityLogger;
use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class LogActivityRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $subject = $this->findSubjectModel($request);
        $logger = app(ActivityLogger::class);
        $beforeAttributes = $subject ? $logger->modelAttributes($subject) : null;

        $response = $next($request);

        if (! Auth::check()) {
            return $response;
        }

        if (! in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            return $response;
        }

        if ($this->shouldSkipRoute($request)) {
            return $response;
        }

        $method = strtolower($request->method());
        $event = 'request.'.$method;
        $properties = [
            'status' => $response->getStatusCode(),
            'input' => Arr::except($request->all(), ['_token', '_method']),
            'route_parameters' => $request->route()?->parameters() ?? [],
        ];

        if (in_array($method, ['put', 'patch'], true) && $subject !== null && $beforeAttributes !== null) {
            $afterAttributes = $logger->modelAttributes($subject->fresh() ?? $subject);
            $changes = $logger->diff($beforeAttributes, $afterAttributes);

            if ($changes !== null) {
                $properties['changes'] = $changes;
            }
        }

        if ($method === 'delete' && $beforeAttributes !== null) {
            $properties['deleted'] = $beforeAttributes;
        }

        if ($method === 'post' && $subject === null) {
            $properties['resource'] = [
                'route_name' => $request->route()?->getName(),
                'resource_name' => $this->resourceName($request),
            ];
        }

        $logger->log(
            event: $event,
            description: strtoupper($method).' '.$request->path(),
            subject: $subject,
            properties: $properties,
        );

        return $response;
    }

    private function shouldSkipRoute(Request $request): bool
    {
        return $request->routeIs(
            'login',
            'login.store',
            'logout',
            'password.*',
            'register',
            'register.store',
            'two-factor.*',
        );
    }

    private function findSubjectModel(Request $request): ?Model
    {
        $parameters = $request->route()?->parameters() ?? [];

        foreach ($parameters as $parameter) {
            if ($parameter instanceof \Illuminate\Database\Eloquent\Model) {
                return $parameter;
            }
        }

        return null;
    }

    private function resourceName(Request $request): ?string
    {
        $routeName = $request->route()?->getName();

        if ($routeName === null) {
            return null;
        }

        $segments = explode('.', $routeName);

        return Str::headline($segments[count($segments) - 2] ?? $segments[0]);
    }
}
