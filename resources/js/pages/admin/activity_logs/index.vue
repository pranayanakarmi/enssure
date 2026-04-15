<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { computed, reactive, ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const props = defineProps({
    logs: {
        type: Object,
        required: true,
    },
    filters: {
        type: Object,
        default: () => ({
            event: '',
            actor_role: '',
            actor_id: '',
            search: '',
            subject_type: '',
            from: '',
            to: '',
        }),
    },
    filterOptions: {
        type: Object,
        default: () => ({
            events: [],
            subject_types: [],
        }),
    },
});

const localFilters = reactive({
    event: props.filters.event ?? '',
    actor_role: props.filters.actor_role ?? '',
    actor_id: props.filters.actor_id ?? '',
    search: props.filters.search ?? '',
    subject_type: props.filters.subject_type ?? '',
    from: props.filters.from ?? '',
    to: props.filters.to ?? '',
});

const breadcrumbItems = [
    { title: 'Activity Logs', href: '/admin/activity-logs' },
];

const rows = computed(() => props.logs?.data ?? []);
const links = computed(() => props.logs?.links ?? []);
const expandedRows = ref([]);
const exportUrl = computed(() => {
    const params = new URLSearchParams();

    Object.entries(localFilters).forEach(([key, value]) => {
        if (value) {
            params.set(key, value);
        }
    });

    const query = params.toString();

    return query ? `/admin/activity-logs/export?${query}` : '/admin/activity-logs/export';
});

function applyFilters() {
    router.get('/admin/activity-logs', localFilters, {
        preserveState: true,
        replace: true,
    });
}

function resetFilters() {
    localFilters.event = '';
    localFilters.actor_role = '';
    localFilters.actor_id = '';
    localFilters.search = '';
    localFilters.subject_type = '';
    localFilters.from = '';
    localFilters.to = '';

    applyFilters();
}

function toggleDetails(id) {
    if (expandedRows.value.includes(id)) {
        expandedRows.value = expandedRows.value.filter((value) => value !== id);

        return;
    }

    expandedRows.value = [...expandedRows.value, id];
}

function isExpanded(id) {
    return expandedRows.value.includes(id);
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Activity Logs" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Activity Logs"
                    description="Track actions performed by admins and users"
                />

                <Card>
                    <CardHeader class="pb-3">
                        <div class="grid gap-3 md:grid-cols-7">
                            <Input v-model="localFilters.search" placeholder="Search description, route, actor" />
                            <Input v-model="localFilters.event" list="activity-log-events" placeholder="Event (e.g. auth.login)" />
                            <Input v-model="localFilters.actor_role" placeholder="Role (admin, user, super_admin)" />
                            <Input v-model="localFilters.actor_id" type="number" min="1" placeholder="Actor ID" />
                            <Input v-model="localFilters.subject_type" list="activity-log-subject-types" placeholder="Subject type" />
                            <Input v-model="localFilters.from" type="date" />
                            <Input v-model="localFilters.to" type="date" />
                        </div>
                        <div class="mt-3 flex gap-2">
                            <Button size="sm" @click="applyFilters">Apply filters</Button>
                            <Button size="sm" variant="outline" @click="resetFilters">Reset</Button>
                            <Button size="sm" variant="outline" as-child>
                                <a :href="exportUrl">Export CSV</a>
                            </Button>
                        </div>
                        <datalist id="activity-log-events">
                            <option v-for="event in (filterOptions.events || [])" :key="event" :value="event" />
                        </datalist>
                        <datalist id="activity-log-subject-types">
                            <option v-for="subjectType in (filterOptions.subject_types || [])" :key="subjectType" :value="subjectType" />
                        </datalist>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="border-b bg-muted/30">
                                    <tr>
                                        <th class="px-4 py-3 text-left font-medium">When</th>
                                        <th class="px-4 py-3 text-left font-medium">Actor</th>
                                        <th class="px-4 py-3 text-left font-medium">Event</th>
                                        <th class="px-4 py-3 text-left font-medium">Description</th>
                                        <th class="px-4 py-3 text-left font-medium">Subject</th>
                                        <th class="px-4 py-3 text-left font-medium">Route</th>
                                        <th class="px-4 py-3 text-left font-medium">IP</th>
                                        <th class="px-4 py-3 text-left font-medium">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!rows.length">
                                        <td colspan="8" class="px-4 py-12 text-center text-muted-foreground">
                                            No activity records found.
                                        </td>
                                    </tr>
                                    <template v-for="log in rows" :key="log.id">
                                        <tr class="border-b border-sidebar-border align-top">
                                            <td class="px-4 py-3 whitespace-nowrap">{{ log.created_at }}</td>
                                            <td class="px-4 py-3">
                                                <p class="font-medium">{{ log.actor_name || 'Guest' }}</p>
                                                <p class="text-xs text-muted-foreground">{{ log.actor_role || 'unknown' }}</p>
                                            </td>
                                            <td class="px-4 py-3">{{ log.event }}</td>
                                            <td class="px-4 py-3">{{ log.description }}</td>
                                            <td class="px-4 py-3">{{ log.subject_label }}</td>
                                            <td class="px-4 py-3">{{ log.route_name || log.method || 'N/A' }}</td>
                                            <td class="px-4 py-3">{{ log.ip_address || 'N/A' }}</td>
                                            <td class="px-4 py-3">
                                                <Button size="sm" variant="outline" @click="toggleDetails(log.id)">
                                                    {{ isExpanded(log.id) ? 'Hide' : 'View' }}
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr v-if="isExpanded(log.id)" class="border-b border-sidebar-border bg-muted/10">
                                            <td colspan="8" class="px-4 py-4">
                                                <pre class="overflow-x-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">{{ JSON.stringify(log.properties || {}, null, 2) }}</pre>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>

                        <div class="flex flex-wrap items-center justify-end gap-2 border-t px-4 py-3">
                            <Button
                                v-for="(link, idx) in links"
                                :key="`${idx}-${link.label}`"
                                size="sm"
                                :variant="link.active ? 'default' : 'outline'"
                                :disabled="!link.url"
                                as-child
                            >
                                <Link v-if="link.url" :href="link.url" preserve-scroll>
                                    <span v-html="link.label" />
                                </Link>
                                <span v-else v-html="link.label" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
