<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Plus, Eye, GripVertical, CheckCircle2, AlertCircle } from 'lucide-vue-next';

const props = defineProps({
    documents: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

const localDocuments = ref([...props.documents]);
watch(() => props.documents, (newDocs) => {
    localDocuments.value = [...newDocs];
}, { immediate: true, deep: true });

// Drag & drop state
const draggingId = ref(null);
const isSavingOrder = ref(false);

function onDragStart(docId) {
    draggingId.value = docId;
}
function onDragOver(e) {
    e.preventDefault();
}
function onDrop(targetId) {
    if (!draggingId.value || draggingId.value === targetId) return;
    const items = [...localDocuments.value];
    const sourceIndex = items.findIndex(i => i.id === draggingId.value);
    const targetIndex = items.findIndex(i => i.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, moved);
    // Update order based on new index
    const reordered = items.map((item, idx) => ({ ...item, order: idx }));
    localDocuments.value = reordered;
    // Save order to backend
    saveOrder(reordered);
    draggingId.value = null;
}
function onDragEnd() {
    draggingId.value = null;
}
async function saveOrder(items) {
    isSavingOrder.value = true;
    router.post('/admin/documents/reorder', {
        documents: items.map((item, idx) => ({ id: item.id, order: idx })),
    }, {
        preserveScroll: true,
        onFinish: () => {
            isSavingOrder.value = false;
        },
    });
}

// Delete modal
const showDeleteModal = ref(false);
const docToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(doc) {
    docToDelete.value = doc;
    showDeleteModal.value = true;
}
function deleteDocument() {
    if (!docToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/documents/${docToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            docToDelete.value = null;
        },
    });
}

function getFileExtension(filename) {
    if (!filename) return '';
    return filename.split('.').pop().toUpperCase();
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Documents', href: '/admin/documents' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Documents" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Documents</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage documents and reports.</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" as-child>
                    <Link href="/admin/documents/create">
                        <Plus class="h-3.5 w-3.5" /> Add Document
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

            <!-- Documents Table with drag-drop -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Documents List</CardTitle>
                    <CardDescription class="text-xs">Drag the ⋮⋮ handle to reorder. Click Edit to modify or Delete to remove.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="w-8 px-4 py-3 text-left font-medium"></th>
                                    <th class="px-4 py-3 text-left font-medium">Title</th>
                                    <th class="px-4 py-3 text-left font-medium">Type</th>
                                    <th class="px-4 py-3 text-left font-medium">Extension</th>
                                    <th class="px-4 py-3 text-left font-medium">Order</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="localDocuments.length === 0">
                                    <td colspan="6" class="px-4 py-12 text-center text-sm text-gray-500">
                                        No documents yet. Click "Add Document" to create one.
                                    </td>
                                </tr>
                                <tr
                                    v-for="doc in localDocuments"
                                    :key="doc.id"
                                    draggable="true"
                                    @dragstart="onDragStart(doc.id)"
                                    @dragover="onDragOver($event)"
                                    @drop="onDrop(doc.id)"
                                    @dragend="onDragEnd"
                                    class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td class="px-4 py-3">
                                        <div class="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                                            <GripVertical class="h-4 w-4" />
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 font-medium text-gray-900">
                                        {{ doc.title }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600">
                                        {{ doc.document_type || '—' }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <Badge variant="outline" class="text-[10px]">
                                            {{ getFileExtension(doc.file_path) }}
                                        </Badge>
                                    </td>
                                    <td class="px-4 py-3">
                                        <Badge variant="outline">{{ doc.order ?? 0 }}</Badge>
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                class="h-7 gap-1 text-xs"
                                                as-child
                                            >
                                                <a :href="doc.file_url" target="_blank" rel="noopener noreferrer">
                                                    <Eye class="h-3 w-3" /> View
                                                </a>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                class="h-7 gap-1 text-xs"
                                                as-child
                                            >
                                                <Link :href="`/admin/documents/${doc.id}/edit`">
                                                    <Edit class="h-3 w-3" /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                                                @click="confirmDelete(doc)"
                                            >
                                                <Trash2 class="h-3 w-3" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="isSavingOrder" class="px-6 py-3 text-xs text-gray-500 bg-gray-50 border-t">
                        Saving order...
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete document</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ docToDelete?.title }}”?<br>
                    This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" size="sm" @click="deleteDocument" :disabled="isDeleting">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
[draggable="true"] {
    user-select: none;
}
</style>
