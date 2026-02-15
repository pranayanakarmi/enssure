<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    roles: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;
const error = page.props.flash?.error;

const breadcrumbItems = [
    { title: 'Roles', href: '/admin/roles' },
];

function deleteRole(role) {
    if (confirm(`Are you sure you want to delete the "${role.name}" role?`)) {
        router.delete(`/admin/roles/${role.id}`);
    }
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Roles" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Roles"
                        description="Manage application roles and their permissions"
                    />
                    <Button as-child>
                        <Link href="/admin/roles/create">Add role</Link>
                    </Button>
                </div>

                <Transition
                    enter-active-class="transition ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="success"
                        class="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                        {{ success }}
                    </p>
                </Transition>

                <Transition
                    enter-active-class="transition ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="error"
                        class="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400"
                    >
                        {{ error }}
                    </p>
                </Transition>

                <Card>
                    <CardHeader class="sr-only">
                        <span>Role list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="role in (roles || [])"
                                :key="role.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground">
                                        {{ role.name }}
                                    </p>
                                    <p class="mt-0.5 text-sm text-muted-foreground">
                                        {{ role.users_count }} {{ role.users_count === 1 ? 'user' : 'users' }}
                                    </p>
                                    <div v-if="role.permissions.length" class="mt-1 flex flex-wrap gap-1">
                                        <span
                                            v-for="perm in role.permissions"
                                            :key="perm"
                                            class="inline-flex items-center rounded-md bg-sidebar-accent px-2 py-0.5 text-xs font-medium text-sidebar-accent-foreground"
                                        >
                                            {{ perm }}
                                        </span>
                                    </div>
                                    <p v-else class="mt-0.5 text-xs text-muted-foreground">
                                        No permissions assigned
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/roles/${role.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        v-if="!['super_admin', 'admin'].includes(role.name)"
                                        variant="outline"
                                        size="sm"
                                        class="text-destructive hover:bg-destructive/10"
                                        @click="deleteRole(role)"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(roles || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No roles yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
