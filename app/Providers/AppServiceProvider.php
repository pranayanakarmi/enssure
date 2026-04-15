<?php

namespace App\Providers;

use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use App\Policies\RolePolicy;
use App\Support\ActivityLogger;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        Event::listen(Login::class, function (Login $event): void {
            if (! $event->user instanceof User) {
                return;
            }

            app(ActivityLogger::class)->log(
                event: 'auth.login',
                description: 'User logged in',
                subject: $event->user,
                actor: $event->user,
            );
        });

        Event::listen(Logout::class, function (Logout $event): void {
            if ($event->user instanceof User) {
                app(ActivityLogger::class)->log(
                    event: 'auth.logout',
                    description: 'User logged out',
                    subject: $event->user,
                    actor: $event->user,
                );
            }
        });

        Event::listen(Failed::class, function (Failed $event): void {
            $subject = $event->user instanceof User ? $event->user : null;

            app(ActivityLogger::class)->log(
                event: 'auth.failed',
                description: 'Login failed',
                subject: $subject,
                properties: [
                    'credentials' => [
                        'email' => $event->credentials['email'] ?? null,
                    ],
                ],
                actor: $subject,
            );
        });

        Gate::policy(Role::class, RolePolicy::class);

        Gate::before(function (User $user, string $ability) {
            if ($user->hasRole('super_admin')) {
                return true;
            }
        });

        Route::bind('published_post', function (string $value): Post {
            return Post::query()
                ->published()
                ->where('slug', $value)
                ->firstOrFail();
        });

        Route::bind('published_page', function (string $value): Page {
            return Page::query()
                ->published()
                ->where('slug', $value)
                ->firstOrFail();
        });

        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
