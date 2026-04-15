<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, GripVertical,
    Hash, Link2, ImageIcon, UploadCloud, X,
    Pencil, Check, ChevronDown, BarChart2, Tag, Type
} from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount, watch } from 'vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeReachSection: { type: Object, default: null },
});

const section = computed(() => props.homeReachSection ?? {
    id: null, badge_text: '', title: '', description: '', items: [],
});

// ── Section settings (compact bar) ────────────────────────────────
const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
});

// ── Local items with drag & drop ──────────────────────────────────
const localItems = ref([...(section.value.items || [])]);
watch(() => props.homeReachSection?.items, (newItems) => {
    if (newItems) localItems.value = [...newItems];
}, { immediate: true, deep: true });

// ── Add new stat card (collapsible) ───────────────────────────────
const newCardOpen = ref(false);
const itemForm = useForm({
    value: '', suffix: '', label: '', image: null, link_url: '', order: localItems.value.length,
});
const newImagePreviewUrl = ref(null);
const newIsDragging = ref(false);

function onNewImageChange(e) {
    clearNewPreview();
    setNewFile(e.target.files?.[0] || null);
}
function onNewDrop(e) {
    newIsDragging.value = false;
    const f = e.dataTransfer.files?.[0];
    if (f?.type.startsWith('image/')) setNewFile(f);
}
function setNewFile(file) {
    itemForm.image = file;
    if (file) newImagePreviewUrl.value = URL.createObjectURL(file);
}
function clearNewPreview() {
    if (newImagePreviewUrl.value) URL.revokeObjectURL(newImagePreviewUrl.value);
    newImagePreviewUrl.value = null;
    itemForm.image = null;
    const el = document.getElementById('item_image');
    if (el) el.value = '';
}
function addItem() {
    itemForm.post('/admin/impact-and-milestones/items', {
        forceFormData: true,
        onSuccess: () => {
            clearNewPreview();
            itemForm.reset();
            itemForm.order = localItems.value.length;
            newCardOpen.value = false;
        },
    });
}

// ── Remove item ───────────────────────────────────────────────────
function removeItem(itemId) {
    if (confirm('Remove this stat card?')) {
        router.delete(`/admin/impact-and-milestones-items/${itemId}`, {
            preserveScroll: true,
            onSuccess: () => {
                localItems.value = localItems.value.filter(i => i.id !== itemId);
            },
        });
    }
}

// ── Drag & drop reordering ────────────────────────────────────────
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
    router.post('/admin/impact-and-milestones-items/reorder', { items: payload }, {
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

// ── Modal for editing a stat card ─────────────────────────────────
const editingItem = ref(null);
const editForm = useForm({
    value: '', suffix: '', label: '', image: null, link_url: '', order: 0,
    _method: 'put',
});
const editPreviewUrl = ref(null);

function openEditModal(item) {
    editingItem.value = item;
    editForm.value = item.value ?? '';
    editForm.suffix = item.suffix ?? '';
    editForm.label = item.label ?? '';
    editForm.link_url = item.link_url ?? '';
    editForm.order = item.order ?? 0;
    editForm.image = null;
    editPreviewUrl.value = null;
}
function closeEditModal() {
    editingItem.value = null;
    editForm.reset();
    if (editPreviewUrl.value) URL.revokeObjectURL(editPreviewUrl.value);
    editPreviewUrl.value = null;
}
function onEditImageChange(e) {
    if (editPreviewUrl.value) URL.revokeObjectURL(editPreviewUrl.value);
    const file = e.target.files?.[0] || null;
    editForm.image = file;
    if (file) editPreviewUrl.value = URL.createObjectURL(file);
}
function saveEdit() {
    editForm.post(`/admin/impact-and-milestones-items/${editingItem.value.id}`, {
        forceFormData: true,
        onSuccess: () => {
            closeEditModal();
        },
    });
}

onBeforeUnmount(() => {
    clearNewPreview();
    if (editPreviewUrl.value) URL.revokeObjectURL(editPreviewUrl.value);
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Impact & Milestones', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Impact & Milestones" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Page header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Impact & Milestones</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage badge, heading, description and stat cards.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <BarChart2 class="h-3.5 w-3.5" />
                    {{ localItems.length }} stat card{{ localItems.length !== 1 ? 's' : '' }}
                </div>
            </div>

            <!-- Compact settings bar -->
            <div class="rounded-lg border border-gray-200 bg-white">
                <div class="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                    <div class="flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Section Settings</span>
                    </div>
                    <form @submit.prevent="form.put('/admin/impact-and-milestones')" class="flex items-center gap-3">
                        <div class="flex items-center gap-2">
                            <Label for="badge_text" class="text-xs font-medium">Badge</Label>
                            <Input id="badge_text" v-model="form.badge_text" class="h-7 w-32 text-xs" placeholder="e.g. Our Reach" />
                        </div>
                        <div class="flex items-center gap-2">
                            <Label for="title" class="text-xs font-medium">Title</Label>
                            <Input id="title" v-model="form.title" class="h-7 w-40 text-xs" placeholder="Impact & Milestones" />
                        </div>
                        <Button type="submit" size="sm" :disabled="form.processing" class="h-7 gap-1 text-xs px-3">
                            <Save class="h-3 w-3" />
                            {{ form.processing ? 'Saving…' : 'Save' }}
                        </Button>
                    </form>
                </div>
                <div class="px-4 py-2">
                    <RichTextEditor id="description" v-model="form.description" placeholder="Enter section description…" />
                    <InputError :message="form.errors.description" class="mt-1 text-xs" />
                </div>
            </div>

            <!-- Stat Cards Card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <CardTitle class="text-sm font-semibold">Stat Cards</CardTitle>
                            <CardDescription class="text-xs mt-0.5">
                                Drag the <GripVertical class="inline h-3 w-3 align-[-2px]" /> handle to reorder. Click <strong>Edit</strong> to modify content.
                            </CardDescription>
                        </div>
                        <Button type="button" size="sm" variant="outline" class="h-8 gap-1.5 text-xs" @click="newCardOpen = !newCardOpen">
                            <Plus class="h-3.5 w-3.5" />
                            {{ newCardOpen ? 'Cancel' : 'Add Card' }}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent class="p-0">

                    <!-- Add card collapsible form -->
                    <div v-if="newCardOpen" class="border-b border-gray-200 bg-gray-50 p-5">
                        <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="addItem">
                            <p class="sm:col-span-2 -mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">New Stat Card</p>

                            <div class="flex flex-col gap-1.5">
                                <Label for="item_value" class="text-xs font-medium">Value</Label>
                                <Input id="item_value" v-model="itemForm.value" class="h-9 text-sm" placeholder="e.g. 2500" />
                                <InputError :message="itemForm.errors.value" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="item_suffix" class="text-xs font-medium">Suffix</Label>
                                <Input id="item_suffix" v-model="itemForm.suffix" class="h-9 text-sm" placeholder="e.g. +, %" />
                                <InputError :message="itemForm.errors.suffix" />
                            </div>
                            <div class="flex flex-col gap-1.5 sm:col-span-2">
                                <Label for="item_label" class="text-xs font-medium">Label</Label>
                                <Input id="item_label" v-model="itemForm.label" class="h-9 text-sm" placeholder="e.g. Apprenticeships" />
                                <InputError :message="itemForm.errors.label" />
                            </div>
                            <div class="flex flex-col gap-1.5 sm:col-span-2">
                                <Label class="text-xs font-medium">Image</Label>
                                <div v-if="newImagePreviewUrl" class="relative mb-1 inline-flex">
                                    <img :src="newImagePreviewUrl" alt="Preview" class="h-20 w-32 rounded-lg border border-gray-200 object-cover shadow-sm" />
                                    <button type="button" @click="clearNewPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <label for="item_image" :class="['flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed p-4 text-center transition-colors', newIsDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100']" @dragover.prevent="newIsDragging = true" @dragleave.prevent="newIsDragging = false" @drop.prevent="onNewDrop">
                                    <UploadCloud class="h-4 w-4 text-gray-500" />
                                    <span class="text-xs text-gray-500">Drag & drop, or <span class="font-medium underline">browse</span></span>
                                    <input id="item_image" type="file" accept="image/*" class="sr-only" @change="onNewImageChange" />
                                </label>
                                <InputError :message="itemForm.errors.image" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="item_link_url" class="text-xs font-medium">Link URL</Label>
                                <Input id="item_link_url" v-model="itemForm.link_url" class="h-9 text-sm" placeholder="https://…" />
                                <InputError :message="itemForm.errors.link_url" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="item_order" class="text-xs font-medium">Order</Label>
                                <Input id="item_order" v-model.number="itemForm.order" type="number" min="0" class="h-9 text-sm" />
                                <InputError :message="itemForm.errors.order" />
                            </div>
                            <div class="sm:col-span-2 flex gap-2 pt-1">
                                <Button type="submit" size="sm" :disabled="itemForm.processing" class="h-8 gap-1.5 text-xs">
                                    <Plus class="h-3.5 w-3.5" />
                                    {{ itemForm.processing ? 'Adding…' : 'Add Card' }}
                                </Button>
                                <Button type="button" variant="ghost" size="sm" class="h-8 text-xs" @click="newCardOpen = false">Cancel</Button>
                            </div>
                        </form>
                    </div>

                    <!-- Stat cards list with drag & drop -->
                    <div class="divide-y divide-gray-200">
                        <div v-if="localItems.length === 0" class="py-12 text-center text-sm text-gray-500">No stat cards yet. Click "Add Card" to create one.</div>
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
                            <!-- Drag handle -->
                            <div class="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                                <GripVertical class="h-4 w-4" />
                            </div>

                            <!-- Thumbnail -->
                            <div class="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                <img v-if="item.image_url" :src="item.image_url" :alt="item.label" class="h-full w-full object-cover" />
                                <div v-else class="flex h-full items-center justify-center">
                                    <ImageIcon class="h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <!-- Info -->
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-bold text-gray-900">
                                    {{ item.value }}<span class="text-sm font-medium text-gray-500">{{ item.suffix }}</span>
                                </p>
                                <p class="text-xs text-gray-500">{{ item.label || '—' }}</p>
                                <div class="mt-1 flex flex-wrap gap-1">
                                    <span class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                        <Hash class="h-2.5 w-2.5" /> Order: {{ item.order }}
                                    </span>
                                    <span v-if="item.link_url" class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
                                        <Link2 class="h-2.5 w-2.5" /> Has link
                                    </span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex shrink-0 gap-2">
                                <Button variant="outline" size="sm" class="h-7 text-xs" @click="openEditModal(item)">Edit</Button>
                                <Button variant="ghost" size="sm" class="h-7 w-7 p-0 text-gray-500 hover:bg-red-50 hover:text-red-600" @click="removeItem(item.id)">
                                    <Trash2 class="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>

        <!-- Modal for editing a stat card -->
        <div v-if="editingItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeEditModal">
            <div class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
                <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h2 class="text-lg font-semibold text-gray-900">Edit Stat Card</h2>
                    <button type="button" @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <form class="mt-5 space-y-5" @submit.prevent="saveEdit">
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label for="modal_value" class="text-xs font-medium">Value</Label>
                            <Input id="modal_value" v-model="editForm.value" class="h-9 text-sm" placeholder="e.g. 2500" />
                            <InputError :message="editForm.errors.value" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="modal_suffix" class="text-xs font-medium">Suffix</Label>
                            <Input id="modal_suffix" v-model="editForm.suffix" class="h-9 text-sm" placeholder="e.g. +, %" />
                            <InputError :message="editForm.errors.suffix" />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label for="modal_label" class="text-xs font-medium">Label</Label>
                        <Input id="modal_label" v-model="editForm.label" class="h-9 text-sm" placeholder="e.g. Apprenticeships" />
                        <InputError :message="editForm.errors.label" />
                    </div>

                    <div class="space-y-1.5">
                        <Label class="text-xs font-medium">Image</Label>
                        <div class="flex flex-wrap gap-3">
                            <div v-if="editingItem.image_url && !editPreviewUrl" class="relative">
                                <img :src="editingItem.image_url" alt="Current" class="h-20 w-32 rounded-lg border border-gray-200 object-cover" />
                                <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                            </div>
                            <div v-if="editPreviewUrl" class="relative">
                                <img :src="editPreviewUrl" alt="Preview" class="h-20 w-32 rounded-lg border border-gray-200 object-cover ring-2 ring-primary" />
                                <button type="button" @click="editPreviewUrl = null; editForm.image = null; document.getElementById('modal_image').value = ''" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                    <X class="h-3 w-3" />
                                </button>
                            </div>
                            <div v-if="!editingItem.image_url && !editPreviewUrl" class="flex h-20 w-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                <ImageIcon class="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <input
                            id="modal_image"
                            type="file"
                            accept="image/*"
                            class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                            @change="onEditImageChange"
                        />
                        <p class="text-xs text-gray-500">Leave empty to keep current image.</p>
                        <InputError :message="editForm.errors.image" />
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label for="modal_link_url" class="text-xs font-medium">Link URL</Label>
                            <Input id="modal_link_url" v-model="editForm.link_url" class="h-9 text-sm" placeholder="https://…" />
                            <InputError :message="editForm.errors.link_url" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="modal_order" class="text-xs font-medium">Order</Label>
                            <Input id="modal_order" v-model.number="editForm.order" type="number" min="0" class="h-9 text-sm" />
                            <InputError :message="editForm.errors.order" />
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                        <Button type="button" variant="outline" size="sm" @click="closeEditModal">Cancel</Button>
                        <Button type="submit" size="sm" :disabled="editForm.processing" class="gap-1.5">
                            <Save class="h-3.5 w-3.5" />
                            {{ editForm.processing ? 'Saving…' : 'Save Changes' }}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
[draggable="true"] {
    user-select: none;
}
</style>
