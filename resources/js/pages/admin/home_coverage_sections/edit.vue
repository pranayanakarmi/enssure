<script setup>
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, Edit, GripVertical, ImageIcon,
    CheckCircle2, AlertCircle, X, UploadCloud, Hash, Tag
} from 'lucide-vue-next';
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeCoverageSection: { type: Object, default: null },
});

const section = computed(() => props.homeCoverageSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    map_image_url: null,
    items: [],
});

// ── Local items for drag‑drop ────────────────────────────────────
const localItems = ref([...(section.value.items || [])]);
watch(() => props.homeCoverageSection?.items, (newItems) => {
    if (newItems) localItems.value = [...newItems];
}, { immediate: true, deep: true });

// ── Section settings form ────────────────────────────────────────
const sectionForm = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    map_image: null,
});
const mapPreviewUrl = ref(null);
const currentMapUrl = section.value.map_image_url ?? null;

function onMapImageChange(e) {
    if (mapPreviewUrl.value) URL.revokeObjectURL(mapPreviewUrl.value);
    const file = e.target.files?.[0] || null;
    sectionForm.map_image = file;
    if (file) mapPreviewUrl.value = URL.createObjectURL(file);
}
function clearMapPreview() {
    if (mapPreviewUrl.value) URL.revokeObjectURL(mapPreviewUrl.value);
    mapPreviewUrl.value = null;
    sectionForm.map_image = null;
    const el = document.getElementById('map_image');
    if (el) el.value = '';
}

// ✅ FIXED: use PUT instead of POST
function saveSection() {
    sectionForm.put('/admin/home-coverage-section', {
        forceFormData: true,
        onSuccess: () => {
            // Flash message handled by backend
        },
    });
}

// ── Modal for add/edit item ──────────────────────────────────────
const modalOpen = ref(false);
const editingItem = ref(null);
const itemForm = useForm({
    value: '',
    label: '',
    icon: null,
    order: 0,
    _method: 'post',
});
const iconPreviewUrl = ref(null);
const existingIconUrl = ref(null);

function openAddModal() {
    editingItem.value = null;
    itemForm.reset();
    itemForm._method = 'post';
    itemForm.order = localItems.value.length;
    iconPreviewUrl.value = null;
    existingIconUrl.value = null;
    modalOpen.value = true;
}

function openEditModal(item) {
    editingItem.value = item;
    itemForm.value = item.value;
    itemForm.label = item.label;
    itemForm.order = item.order;
    itemForm.icon = null;
    itemForm._method = 'put';
    iconPreviewUrl.value = null;
    existingIconUrl.value = item.icon_url;
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
    itemForm.reset();
    iconPreviewUrl.value = null;
    existingIconUrl.value = null;
}

function onIconChange(e) {
    if (iconPreviewUrl.value) URL.revokeObjectURL(iconPreviewUrl.value);
    const file = e.target.files?.[0] || null;
    itemForm.icon = file;
    if (file) iconPreviewUrl.value = URL.createObjectURL(file);
}
function clearIconPreview() {
    if (iconPreviewUrl.value) URL.revokeObjectURL(iconPreviewUrl.value);
    iconPreviewUrl.value = null;
    itemForm.icon = null;
    const el = document.getElementById('item_icon');
    if (el) el.value = '';
}

function saveItem() {
    if (editingItem.value) {
        // Update
        itemForm.post(`/admin/home-coverage-section-items/${editingItem.value.id}`, {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    } else {
        // Create
        itemForm.post('/admin/home-coverage-section/items', {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    }
}

// ── Delete item ──────────────────────────────────────────────────
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(item) {
    itemToDelete.value = item;
    showDeleteModal.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/home-coverage-section-items/${itemToDelete.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            localItems.value = localItems.value.filter(i => i.id !== itemToDelete.value.id);
        },
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            itemToDelete.value = null;
        },
    });
}

// ── Drag & drop reordering for items ─────────────────────────────
const dragIndex = ref(null);
const dragOverIndex = ref(null);

function onDragStart(index, e) {
    dragIndex.value = index;
    e.dataTransfer.effectAllowed = 'move';
}
function onDragOver(index, e) {
    e.preventDefault();
    dragOverIndex.value = index;
}
function onDrop(index) {
    if (dragIndex.value === null || dragIndex.value === index) return;
    const newItems = [...localItems.value];
    const [moved] = newItems.splice(dragIndex.value, 1);
    newItems.splice(index, 0, moved);
    localItems.value = newItems;
    const payload = newItems.map((item, idx) => ({ id: item.id, order: idx }));
    router.post('/admin/home-coverage-section-items/reorder', { items: payload }, {
        preserveScroll: true,
        onError: () => { localItems.value = [...(section.value.items || [])]; },
    });
    dragIndex.value = null;
    dragOverIndex.value = null;
}
function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

// ── Flash messages ───────────────────────────────────────────────
const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

onBeforeUnmount(() => {
    if (mapPreviewUrl.value) URL.revokeObjectURL(mapPreviewUrl.value);
    if (iconPreviewUrl.value) URL.revokeObjectURL(iconPreviewUrl.value);
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Coverage Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Coverage Section" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Coverage Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge, title, description, map image and coverage stats.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Tag class="h-3.5 w-3.5" />{{ localItems.length }} stats
                </div>
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

            <!-- Section Settings Card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Section Content</CardTitle>
                    <CardDescription class="text-xs">Update badge, title, description and map image.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="saveSection">
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="badge_text" class="text-xs font-medium">Badge Text</Label>
                                <Input id="badge_text" v-model="sectionForm.badge_text" class="h-9 text-sm" placeholder="e.g. Coverage" />
                                <InputError :message="sectionForm.errors.badge_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="title" class="text-xs font-medium">Section Title</Label>
                                <Input id="title" v-model="sectionForm.title" class="h-9 text-sm" placeholder="e.g. Reaching Across the Nation" />
                                <InputError :message="sectionForm.errors.title" />
                            </div>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <Label for="description" class="text-xs font-medium">Description (Rich Text)</Label>
                            <RichTextEditor id="description" v-model="sectionForm.description" placeholder="Enter description..." />
                            <InputError :message="sectionForm.errors.description" />
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Map Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="currentMapUrl && !mapPreviewUrl" class="relative">
                                    <img :src="currentMapUrl" alt="Current map" class="h-32 w-48 rounded-lg border border-gray-200 object-contain" />
                                    <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                                </div>
                                <div v-if="mapPreviewUrl" class="relative">
                                    <img :src="mapPreviewUrl" alt="Preview" class="h-32 w-48 rounded-lg border border-gray-200 object-contain ring-2 ring-primary" />
                                    <button type="button" @click="clearMapPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-if="!currentMapUrl && !mapPreviewUrl" class="flex h-32 w-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                id="map_image"
                                type="file"
                                accept="image/*,.svg,image/svg+xml"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onMapImageChange"
                            />
                            <InputError :message="sectionForm.errors.map_image" />
                        </div>

                        <div class="flex justify-end">
                            <Button type="submit" size="sm" :disabled="sectionForm.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" /> Save Section
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <!-- Coverage Stats Card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <CardTitle class="text-sm font-semibold">Coverage Stats</CardTitle>
                            <CardDescription class="text-xs mt-0.5">Drag the handle to reorder. Click <strong>Edit</strong> to modify a stat.</CardDescription>
                        </div>
                        <Button type="button" size="sm" variant="outline" class="h-8 gap-1.5 text-xs" @click="openAddModal">
                            <Plus class="h-3.5 w-3.5" /> Add Stat
                        </Button>
                    </div>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="divide-y divide-gray-200">
                        <div v-if="localItems.length === 0" class="py-12 text-center text-sm text-gray-500">
                            No coverage stats yet. Click "Add Stat" to create one.
                        </div>
                        <div
                            v-for="(item, idx) in localItems"
                            :key="item.id"
                            draggable="true"
                            @dragstart="onDragStart(idx, $event)"
                            @dragover="onDragOver(idx, $event)"
                            @drop="onDrop(idx)"
                            @dragend="onDragEnd"
                            :class="[
                                'flex items-center gap-3 px-5 py-3 transition-colors',
                                dragOverIndex === idx && dragIndex !== idx ? 'bg-blue-50 ring-1 ring-blue-300' : '',
                                'hover:bg-gray-50'
                            ]"
                        >
                            <div class="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                                <GripVertical class="h-4 w-4" />
                            </div>
                            <div class="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100">
                                <img v-if="item.icon_url" :src="item.icon_url" :alt="item.label" class="h-full w-full object-contain" />
                                <div v-else class="flex h-full items-center justify-center text-xs text-gray-400">—</div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-bold text-gray-900">{{ item.value }}</p>
                                <p class="text-xs text-gray-500">{{ item.label || '—' }}</p>
                                <div class="mt-1 inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                    <Hash class="h-2.5 w-2.5" /> Order: {{ item.order }}
                                </div>
                            </div>
                            <div class="flex shrink-0 gap-2">
                                <Button variant="outline" size="sm" class="h-7 text-xs" @click="openEditModal(item)">Edit</Button>
                                <Button variant="ghost" size="sm" class="h-7 w-7 p-0 text-gray-500 hover:bg-red-50 hover:text-red-600" @click="confirmDelete(item)">
                                    <Trash2 class="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Delete confirmation modal -->
            <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
                <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                    <h3 class="text-lg font-semibold">Delete stat</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Are you sure you want to delete “{{ itemToDelete?.value }} {{ itemToDelete?.label }}”?<br>
                        This action cannot be undone.
                    </p>
                    <div class="mt-6 flex justify-end gap-2">
                        <Button variant="outline" @click="showDeleteModal = false">Cancel</Button>
                        <Button variant="destructive" @click="deleteItem" :disabled="isDeleting">
                            {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Add/Edit modal for stat -->
            <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
                <div class="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
                    <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                        <h2 class="text-lg font-semibold text-foreground">
                            {{ editingItem ? 'Edit Stat' : 'Add New Stat' }}
                        </h2>
                        <button type="button" @click="closeModal" class="text-gray-400 hover:text-gray-600">
                            <X class="h-5 w-5" />
                        </button>
                    </div>

                    <form class="mt-5 space-y-5" @submit.prevent="saveItem">
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="space-y-1.5">
                                <Label for="modal_value">Value *</Label>
                                <Input id="modal_value" v-model="itemForm.value" required class="h-9 text-sm" placeholder="e.g. 308" />
                                <InputError :message="itemForm.errors.value" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="modal_label">Label</Label>
                                <Input id="modal_label" v-model="itemForm.label" class="h-9 text-sm" placeholder="e.g. Planned Events" />
                                <InputError :message="itemForm.errors.label" />
                            </div>
                        </div>

                        <div class="space-y-1.5">
                            <Label class="text-xs font-medium">Icon (optional)</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="existingIconUrl && !iconPreviewUrl" class="relative">
                                    <img :src="existingIconUrl" alt="Current icon" class="h-12 w-12 rounded-lg border border-gray-200 object-contain" />
                                    <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                                </div>
                                <div v-if="iconPreviewUrl" class="relative">
                                    <img :src="iconPreviewUrl" alt="Preview" class="h-12 w-12 rounded-lg border border-gray-200 object-contain ring-2 ring-primary" />
                                    <button type="button" @click="clearIconPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-if="!existingIconUrl && !iconPreviewUrl" class="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <UploadCloud class="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <input
                                id="item_icon"
                                type="file"
                                accept="image/*,.svg,image/svg+xml"
                                class="block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onIconChange"
                            />
                            <p class="text-xs text-gray-500">Leave empty to keep current icon.</p>
                            <InputError :message="itemForm.errors.icon" />
                        </div>

                        <div class="space-y-1.5">
                            <Label for="modal_order">Order</Label>
                            <Input id="modal_order" v-model.number="itemForm.order" type="number" min="0" class="h-9 text-sm" />
                            <InputError :message="itemForm.errors.order" />
                        </div>

                        <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                            <Button type="button" variant="outline" @click="closeModal">Cancel</Button>
                            <Button type="submit" :disabled="itemForm.processing" class="gap-1.5">
                                <Save class="h-3.5 w-3.5" />
                                {{ itemForm.processing ? 'Saving…' : (editingItem ? 'Update Stat' : 'Create Stat') }}
                            </Button>
                        </div>
                    </form>
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
