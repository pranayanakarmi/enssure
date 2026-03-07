<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    footerColumns: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

const breadcrumbItems = [
    { title: 'Footer', href: '/admin/footer-columns' },
    { title: 'Footer columns', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Footer columns" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Footer columns"
                        description="Manage footer link columns (Company, Legal, Resources, etc.)"
                    />
                    <Button as-child>
                        <Link href="/admin/footer-columns/create">Add column</Link>
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
                        <span>Footer columns list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="c in (footerColumns || [])"
                                :key="c.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground">
                                        {{ c.title }}
                                    </p>
                                    <p class="truncate text-sm text-muted-foreground">
                                        {{ c.links_count ?? 0 }} link(s) · Order: {{ c.order }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        as-child
                                    >
                                        <Link :href="`/admin/footer-columns/${c.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(footerColumns || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No footer columns yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
