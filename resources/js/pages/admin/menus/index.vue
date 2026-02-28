<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    menus: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

function deleteMenu(menuId, menuName) {
    if (confirm(`Delete the menu “${menuName}”? This cannot be undone.`)) {
        router.delete(`/admin/menus/${menuId}`);
    }
}

const breadcrumbItems = [
    { title: 'Menus', href: '/admin/menus' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Menus" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Menus"
                        description="Manage navigation menus"
                    />
                    <Button as-child>
                        <Link href="/admin/menus/create">Add menu</Link>
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

                <Card>
                    <CardHeader class="sr-only">
                        <span>Menu list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="m in (menus || [])"
                                :key="m.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground">
                                        {{ m.name }}
                                    </p>
                                    <p class="truncate text-sm text-muted-foreground">
                                        <span v-if="m.is_published">Published</span>
                                        <span v-else>Draft</span>
                                        <span v-if="m.is_main_header_menu"> · Main header</span>
                                        · {{ m.items_count ?? 0 }} items
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/menus/${m.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        class="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        @click="deleteMenu(m.id, m.name)"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(menus || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No menus yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
