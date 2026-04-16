<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, Plus, CheckCircle2, AlertCircle } from 'lucide-vue-next';

const props = defineProps({
    types: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Delete modal state
const showDeleteModal = ref(false);
const typeToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(type) {
    typeToDelete.value = type;
    showDeleteModal.value = true;
}

function deleteType() {
    if (!typeToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/document_types/${typeToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            typeToDelete.value = null;
        },
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Document Types', href: '/admin/document_types' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Document Types" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <!-- <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button> -->
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Document Types</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage document types (categories).</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" as-child>
                    <Link href="/admin/document_types/create">
                        <Plus class="h-3.5 w-3.5" /> Add Type
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

            <!-- Document Types Table -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Document Types List</CardTitle>
                    <CardDescription class="text-xs">Click Edit to modify or Delete to remove.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left font-medium">Name</th>
                                    <th class="px-4 py-3 text-left font-medium">Slug</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="types.length === 0">
                                    <td colspan="3" class="px-4 py-12 text-center text-sm text-gray-500">
                                        No document types yet. Click "Add Type" to create one.
                                    </td>
                                </tr>
                                <tr
                                    v-for="type in types"
                                    :key="type.id"
                                    class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td class="px-4 py-3 font-medium text-gray-900">
                                        {{ type.name }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-500">
                                        {{ type.slug }}
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                class="h-7 gap-1 text-xs"
                                                as-child
                                            >
                                                <Link :href="`/admin/document_types/${type.id}/edit`">
                                                    <Edit class="h-3 w-3" /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                                                @click="confirmDelete(type)"
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
                <h3 class="text-lg font-semibold">Delete document type</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ typeToDelete?.name }}”?<br>
                    This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" size="sm" @click="deleteType" :disabled="isDeleting">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
