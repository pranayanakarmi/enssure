<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     */
    public function index(): Response
    {
        $this->authorize('viewAny', Role::class);

        $roles = Role::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Role $role) => [
                'id' => $role->id,
                'name' => $role->name,
                'users_count' => $role->users()->count(),
            ])
            ->values()
            ->all();

        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): Response
    {
        $this->authorize('create', Role::class);

        return Inertia::render('admin/roles/create', [
            'permission_groups' => $this->permissionGroupsForUi(),
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', Role::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        if (! empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return to_route('admin.roles.index')
            ->with('success', 'Role created successfully.');
    }

    /**
     * Show the form for editing the role.
     */
    public function edit(Role $role): Response
    {
        $this->authorize('update', $role);

        return Inertia::render('admin/roles/edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->all(),
            ],
            'permission_groups' => $this->permissionGroupsForUi(),
        ]);
    }

    /**
     * Update the role.
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        $this->authorize('update', $role);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,'.$role->id],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role->update(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions'] ?? []);

        return to_route('admin.roles.index')
            ->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the role.
     */
    public function destroy(Role $role): RedirectResponse
    {
        $this->authorize('delete', $role);

        if (in_array($role->name, ['super_admin', 'admin'])) {
            return back()->with('error', 'System roles cannot be deleted.');
        }

        $role->delete();

        return to_route('admin.roles.index')
            ->with('success', 'Role deleted successfully.');
    }

    /**
     * @return array<int, string>
     */
    private function availablePermissions(): array
    {
        return Permission::orderBy('name')->pluck('name')->all();
    }

    /**
     * Group permissions by content resource (module) for the admin UI.
     *
     * @return array<int, array{key: string, label: string, permissions: array<int, array{name: string, action: string, action_label: string}>}>
     */
    private function permissionGroupsForUi(): array
    {
        $flat = $this->availablePermissions();
        $actionsOrder = array_flip(config('admin_content.actions', ['view', 'create', 'update', 'delete']));
        $canonicalResources = config('admin_content.resources', []);

        /** @var array<string, array<int, array{name: string, action: string, action_label: string}>> $byResource */
        $byResource = [];
        /** @var array<int, array{name: string, action: string, action_label: string}> $other */
        $other = [];

        foreach ($flat as $name) {
            if (preg_match('/^(view|create|update|delete) (.+)$/', $name, $matches)) {
                $action = $matches[1];
                $resource = $matches[2];
                $byResource[$resource][] = [
                    'name' => $name,
                    'action' => $action,
                    'action_label' => Str::title($action),
                ];
            } else {
                $other[] = [
                    'name' => $name,
                    'action' => '',
                    'action_label' => $name,
                ];
            }
        }

        foreach ($byResource as $resource => &$items) {
            usort($items, function (array $a, array $b) use ($actionsOrder): int {
                return ($actionsOrder[$a['action']] ?? 99) <=> ($actionsOrder[$b['action']] ?? 99);
            });
        }
        unset($items);

        $groups = [];

        foreach ($canonicalResources as $resource) {
            if (empty($byResource[$resource])) {
                continue;
            }
            $groups[] = [
                'key' => $resource,
                'label' => Str::title(str_replace('_', ' ', $resource)),
                'permissions' => $byResource[$resource],
            ];
            unset($byResource[$resource]);
        }

        ksort($byResource);

        foreach ($byResource as $resource => $items) {
            $groups[] = [
                'key' => $resource,
                'label' => Str::title(str_replace('_', ' ', $resource)),
                'permissions' => $items,
            ];
        }

        if ($other !== []) {
            $groups[] = [
                'key' => '_other',
                'label' => 'Other',
                'permissions' => $other,
            ];
        }

        return $groups;
    }
}
