<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { AlertCircle, BellRing, CheckCircle2, Edit, Eye, EyeOff, ImageIcon, Plus, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    importantPopups: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

const showDeleteModal = ref(false);
const popupToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(popup) {
    popupToDelete.value = popup;
    showDeleteModal.value = true;
}

function deletePopup() {
    if (!popupToDelete.value) {
        return;
    }

    isDeleting.value = true;

    router.delete(`/admin/important-popups/${popupToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            popupToDelete.value = null;
        },
    });
}

const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Important Popup', href: '/admin/important-popups' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Important Popup" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 class="text-xl font-semibold tracking-tight text-foreground">Important Popup</h1>
                    <p class="mt-0.5 text-xs text-muted-foreground">Manage popup items and choose which one is shown on the homepage.</p>
                </div>

                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                        <BellRing class="h-3.5 w-3.5" />Popup Manager
                    </div>
                    <Button size="sm" class="h-8 gap-1.5 text-xs" as-child>
                        <Link href="/admin/important-popups/create">
                            <Plus class="h-3.5 w-3.5" /> Add Popup
                        </Link>
                    </Button>
                </div>
            </div>

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

            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Popup List</CardTitle>
                    <CardDescription class="text-xs">Tick show popup when creating or editing an item to make it visible on the homepage.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left font-medium">Image</th>
                                    <th class="px-4 py-3 text-left font-medium">Title</th>
                                    <th class="px-4 py-3 text-left font-medium">CTA</th>
                                    <th class="px-4 py-3 text-left font-medium">Status</th>
                                    <th class="px-4 py-3 text-left font-medium">Updated</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="importantPopups.length === 0">
                                    <td colspan="6" class="px-4 py-12 text-center text-sm text-gray-500">
                                        No popups yet. Click "Add Popup" to create one.
                                    </td>
                                </tr>
                                <tr
                                    v-for="popup in importantPopups"
                                    :key="popup.id"
                                    class="border-b border-gray-200 transition-colors hover:bg-gray-50"
                                >
                                    <td class="px-4 py-3">
                                        <div class="h-12 w-20 overflow-hidden rounded bg-gray-100">
                                            <img
                                                v-if="popup.image_url"
                                                :src="popup.image_url"
                                                :alt="popup.title"
                                                class="h-full w-full object-cover"
                                            />
                                            <div v-else class="flex h-full items-center justify-center text-gray-400">
                                                <ImageIcon class="h-5 w-5" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 font-medium text-gray-900">{{ popup.title }}</td>
                                    <td class="px-4 py-3 text-gray-500">{{ popup.cta_text || 'No CTA' }}</td>
                                    <td class="px-4 py-3">
                                        <span
                                            class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                                            :class="popup.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                                        >
                                            <component :is="popup.is_active ? Eye : EyeOff" class="h-3.5 w-3.5" />
                                            {{ popup.is_active ? 'Showing' : 'Hidden' }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-gray-500">{{ popup.updated_at || 'Not available' }}</td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button size="sm" variant="outline" class="h-7 gap-1 text-xs" as-child>
                                                <Link :href="`/admin/important-popups/${popup.id}/edit`">
                                                    <Edit class="h-3 w-3" /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                                                @click="confirmDelete(popup)"
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

        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete popup</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete "{{ popupToDelete?.title }}"?<br>
                    This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" size="sm" :disabled="isDeleting" @click="deletePopup">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
