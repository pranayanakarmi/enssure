<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    applications: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

function formatSubmitted(iso) {
    if (!iso) {
        return '—';
    }
    try {
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    } catch {
        return iso;
    }
}

const breadcrumbItems = [
    { title: 'Vacancies', href: '/admin/vacancies' },
    { title: 'Applications', href: '/admin/vacancy-applications' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Vacancy applications" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Vacancy applications"
                        description="Applications submitted from the public Vacancies pages (listing and job detail)."
                    />
                    <Button variant="outline" as-child>
                        <Link href="/admin/vacancies">Manage job listings</Link>
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
                        <span>Applications list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="a in (applications || [])"
                                :key="a.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground">
                                        {{ a.name }} · {{ a.email }}
                                    </p>
                                    <p class="truncate text-sm text-muted-foreground">
                                        {{ a.vacancy_title || '—' }}
                                        <span v-if="a.phone"> · {{ a.phone }}</span>
                                        · {{ formatSubmitted(a.submitted_at) }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/vacancy-applications/${a.id}`">
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(applications || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No applications yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
