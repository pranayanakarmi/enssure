<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    ArrowLeft, Edit, Trash2, Plus, User,
    CheckCircle2, AlertCircle
} from 'lucide-vue-next';

const props = defineProps({
    teamMembers: { type: Array, default: () => [] },
    listingType: { type: String, default: null },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

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

// Delete modal state
const showDeleteModal = ref(false);
const memberToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(member) {
    memberToDelete.value = member;
    showDeleteModal.value = true;
}

function deleteMember() {
    if (!memberToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/team_members/${memberToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            memberToDelete.value = null;
        },
    });
}

const breadcrumbItems = computed(() => [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Our Team', href: '/admin/team-page' },
    { title: listTitle.value, href: indexHref.value },
]);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="listTitle" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/team-page">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">{{ listTitle }}</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ listDescription }}</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" as-child>
                    <Link :href="createHref">
                        <Plus class="h-3.5 w-3.5" /> Add
                    </Link>
                </Button>
            </div>

            <!-- Flash messages -->
            <Transition>
                <div v-if="success" class="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-50 px-4 py-2.5 text-sm text-green-800">
                    <CheckCircle2 class="h-4 w-4" /> {{ success }}
                </div>
            </Transition>
            <Transition>
                <div v-if="error" class="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5 text-sm text-red-800">
                    <AlertCircle class="h-4 w-4" /> {{ error }}
                </div>
            </Transition>

            <!-- Members Table (no Order column) -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Members List</CardTitle>
                    <CardDescription class="text-xs">Click Edit to modify a member or Delete to remove.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left font-medium">Photo</th>
                                    <th class="px-4 py-3 text-left font-medium">Name</th>
                                    <th class="px-4 py-3 text-left font-medium">Job Title</th>
                                    <th class="px-4 py-3 text-left font-medium">Department</th>
                                    <th class="px-4 py-3 text-left font-medium">Location</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="teamMembers.length === 0">
                                    <td colspan="6" class="px-4 py-12 text-center text-sm text-gray-500">
                                        No members yet. Click "Add" to create one.
                                    </td>
                                </tr>
                                <tr
                                    v-for="member in teamMembers"
                                    :key="member.id"
                                    class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td class="px-4 py-3">
                                        <div class="h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                                            <img
                                                v-if="member.photo_url"
                                                :src="member.photo_url"
                                                :alt="member.name"
                                                class="h-full w-full object-cover"
                                            />
                                            <div v-else class="flex h-full w-full items-center justify-center text-xs font-medium text-gray-500">
                                                {{ (member.name || '?').charAt(0).toUpperCase() }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 font-medium text-gray-900">
                                        {{ member.name }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600">
                                        {{ member.job_title || '—' }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600">
                                        {{ member.department || '—' }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600">
                                        {{ member.location || '—' }}
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                class="h-7 gap-1 text-xs"
                                                as-child
                                            >
                                                <Link :href="`/admin/team_members/${member.id}/edit`">
                                                    <Edit class="h-3 w-3" /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                                                @click="confirmDelete(member)"
                                            >
                                                <Trash2 class="h-3 w-3" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete member</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ memberToDelete?.name }}”?<br>
                    This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" @click="deleteMember" :disabled="isDeleting">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
