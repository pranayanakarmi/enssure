<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    teamMembers: {
        type: Array,
        default: () => [],
    },
    listingType: {
        type: String,
        default: null,
    },
});

const page = usePage();
const success = page.props.flash?.success;

const isExecutive = computed(() => props.listingType === 'executive_committee');
const listTitle = computed(() => {
    if (props.listingType === 'executive_committee') return 'Executive Committee';
    if (props.listingType === 'staff') return 'Staff';
    return 'Team Members';
});
const listDescription = computed(() => {
    if (props.listingType === 'executive_committee') return 'Manage executive committee members';
    if (props.listingType === 'staff') return 'Manage staff members';
    return 'Manage team members';
});
const indexHref = computed(() => {
    if (props.listingType === 'executive_committee') return '/admin/team_members/executive';
    if (props.listingType === 'staff') return '/admin/team_members/staff';
    return '/admin/team_members';
});
const createHref = computed(() => `/admin/team_members/create?type=${props.listingType || 'staff'}`);

const breadcrumbItems = computed(() => [
    { title: 'Our Team', href: '#' },
    { title: listTitle.value, href: indexHref.value },
]);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="listTitle" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        :title="listTitle"
                        :description="listDescription"
                    />
                    <Button as-child>
                        <Link :href="createHref">Add</Link>
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
                        <span>Team member list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="t in (teamMembers || [])"
                                :key="t.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="flex min-w-0 flex-1 items-center gap-4">
                                    <div class="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                                        <img
                                            v-if="t.photo_url"
                                            :src="t.photo_url"
                                            :alt="t.name"
                                            class="h-full w-full object-cover"
                                        />
                                        <div
                                            v-else
                                            class="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground"
                                        >
                                            {{ (t.name || '?').charAt(0).toUpperCase() }}
                                        </div>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="truncate font-medium text-foreground">
                                            {{ t.name }}
                                        </p>
                                        <p class="truncate text-sm text-muted-foreground">
                                            {{ t.job_title || '' }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/team_members/${t.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(teamMembers || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No team members yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
