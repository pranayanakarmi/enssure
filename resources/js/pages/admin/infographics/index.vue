<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    infographics: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

function destroyInfographic(id) {
    if (! confirm('Delete this infographic?')) {
        return;
    }
    router.delete(`/admin/infographics/${id}`);
}

const breadcrumbItems = [
    { title: 'Infographics Page', href: '#' },
    { title: 'Infographics', href: '/admin/infographics' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Infographics" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Infographics"
                        description="Manage infographic sections shown on the public Infographics page."
                    />
                    <Button as-child>
                        <Link href="/admin/infographics/create">Add infographic</Link>
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
                        <span>Infographic list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="row in (infographics || [])"
                                :key="row.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="flex min-w-0 flex-1 flex-wrap items-center gap-4">
                                    <img
                                        :src="row.image_url"
                                        :alt="row.title"
                                        class="h-16 w-24 shrink-0 rounded border object-cover"
                                    />
                                    <div class="min-w-0 flex-1">
                                        <p class="truncate font-medium text-foreground">
                                            {{ row.title }}
                                        </p>
                                        <p class="truncate text-sm text-muted-foreground">
                                            Sort order: {{ row.sort_order }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/infographics/${row.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        type="button"
                                        @click="destroyInfographic(row.id)"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(infographics || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No infographics yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
