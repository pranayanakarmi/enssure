<script setup>
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, Edit, GripVertical, Building2,
    CheckCircle2, AlertCircle, X, ImageIcon, Link as LinkIcon
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    partners: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Local copy for drag‑drop reordering
const localItems = ref([...props.partners]);
watch(() => props.partners, (newItems) => {
    localItems.value = [...newItems];
}, { immediate: true, deep: true });

// ── Modal state (create/edit) ────────────────────────────────────
const modalOpen = ref(false);
const editingItem = ref(null);
const form = useForm({
    name: '',
    partner_type: '',
    description: '',        // ✅ added description field
    logo: null,
    website_url: '',
    order: 0,
    is_active: true,
    _method: 'post',
});
const imagePreview = ref(null);
const existingImage = ref(null);

function openCreateModal() {
    editingItem.value = null;
    form.reset();
    form._method = 'post';
    form.order = localItems.value.length;
    imagePreview.value = null;
    existingImage.value = null;
    modalOpen.value = true;
}

function openEditModal(partner) {
    editingItem.value = partner;
    form.name = partner.name;
    form.partner_type = partner.partner_type;
    form.description = partner.description || '';
    form.website_url = partner.website_url;
    form.order = partner.order;
    form.is_active = partner.is_active;
    form.logo = null;
    form._method = 'put';
    imagePreview.value = null;
    existingImage.value = partner.logo_url;
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
    form.reset();
    imagePreview.value = null;
    existingImage.value = null;
}

function onImageChange(e) {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    const file = e.target.files?.[0] || null;
    form.logo = file;
    if (file) imagePreview.value = URL.createObjectURL(file);
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.logo = null;
    const el = document.getElementById('modal_logo');
    if (el) el.value = '';
}

function savePartner() {
    if (editingItem.value) {
        form.post(`/admin/partners/${editingItem.value.id}`, {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    } else {
        form.post('/admin/partners', {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    }
}

// ── Delete ────────────────────────────────────────────────────────
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
    router.delete(`/admin/partners/${itemToDelete.value.id}`, {
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

// ── Drag & drop reordering for table rows ────────────────────────
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
    router.post('/admin/partners/reorder', { items: payload }, {
        preserveScroll: true,
        onError: () => { localItems.value = [...props.partners]; },
    });
    dragIndex.value = null;
    dragOverIndex.value = null;
}
function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Partners', href: '/admin/partners' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Partners Management" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Partners</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage partner logos and information.</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" @click="openCreateModal">
                    <Plus class="h-3.5 w-3.5" />Add Partner
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

            <!-- Partners Table -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Partners List</CardTitle>
                    <CardDescription class="text-xs">Drag the ⋮⋮ handle to reorder partners.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="w-8 px-4 py-3 text-left font-medium"></th>
                                    <th class="px-4 py-3 text-left font-medium">Logo</th>
                                    <th class="px-4 py-3 text-left font-medium">Name</th>
                                    <th class="px-4 py-3 text-left font-medium">Type</th>
                                    <th class="px-4 py-3 text-left font-medium">Website</th>
                                    <th class="px-4 py-3 text-left font-medium">Order</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="localItems.length === 0">
                                    <td colspan="7" class="px-4 py-12 text-center text-sm text-gray-500">
                                        No partners yet. Click "Add Partner" to create one.
                                    </td>
                                </tr>
                                <tr
                                    v-for="(item, idx) in localItems"
                                    :key="item.id"
                                    draggable="true"
                                    @dragstart="onDragStart(idx, $event)"
                                    @dragover="onDragOver(idx, $event)"
                                    @drop="onDrop(idx)"
                                    @dragend="onDragEnd"
                                    :class="[
                                        'border-b border-gray-200 transition-all',
                                        dragOverIndex === idx && dragIndex !== idx ? 'bg-blue-50 ring-1 ring-blue-300' : '',
                                        dragIndex === idx ? 'opacity-50' : '',
                                        'hover:bg-gray-50'
                                    ]"
                                >
                                    <td class="px-4 py-3">
                                        <div class="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                                            <GripVertical class="h-4 w-4" />
                                        </div>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="h-12 w-20 overflow-hidden rounded bg-gray-100 p-1">
                                            <img
                                                v-if="item.logo_url"
                                                :src="item.logo_url"
                                                :alt="item.name"
                                                class="h-full w-full object-contain"
                                            />
                                            <div v-else class="flex h-full items-center justify-center text-gray-400">
                                                <Building2 class="h-6 w-6" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 font-medium text-gray-900">
                                        {{ item.name }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600">
                                        {{ item.partner_type || '—' }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <a
                                            v-if="item.website_url"
                                            :href="item.website_url"
                                            target="_blank"
                                            class="text-primary hover:underline flex items-center gap-1"
                                        >
                                            <LinkIcon class="h-3 w-3" />
                                            <span class="truncate max-w-[150px]">{{ item.website_url }}</span>
                                        </a>
                                        <span v-else class="text-gray-400">—</span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <Badge variant="outline">{{ item.order }}</Badge>
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                class="h-7 gap-1 text-xs"
                                                @click.stop="openEditModal(item)"
                                            >
                                                <Edit class="h-3 w-3" /> Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                                                @click.stop="confirmDelete(item)"
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
                <h3 class="text-lg font-semibold">Delete partner</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ itemToDelete?.name }}”?<br>
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

        <!-- Create/Edit modal (with description field) -->
        <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
            <div class="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
                <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h2 class="text-lg font-semibold text-foreground">
                        {{ editingItem ? 'Edit Partner' : 'Add New Partner' }}
                    </h2>
                    <button type="button" @click="closeModal" class="text-gray-400 hover:text-gray-600">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <form class="mt-5 space-y-5" @submit.prevent="savePartner">
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label for="modal_name">Name *</Label>
                            <Input id="modal_name" v-model="form.name" required class="h-9 text-sm" />
                            <InputError :message="form.errors.name" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="modal_partner_type">Partner Type</Label>
                            <Input id="modal_partner_type" v-model="form.partner_type" class="h-9 text-sm" placeholder="e.g. Funding, Implementing" />
                            <InputError :message="form.errors.partner_type" />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label for="modal_description">Description</Label>
                        <textarea
                            id="modal_description"
                            v-model="form.description"
                            rows="3"
                            class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                            placeholder="Brief description of the partner..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>

                    <div class="space-y-1.5">
                        <Label for="modal_website_url">Website URL</Label>
                        <Input id="modal_website_url" v-model="form.website_url" type="url" class="h-9 text-sm" placeholder="https://..." />
                        <InputError :message="form.errors.website_url" />
                    </div>

                    <div class="space-y-1.5">
                        <Label class="text-xs font-medium">Logo</Label>
                        <div class="flex flex-wrap gap-3">
                            <div v-if="existingImage && !imagePreview" class="relative">
                                <img :src="existingImage" alt="Current logo" class="h-20 w-32 rounded-lg border border-gray-200 object-contain p-2" />
                                <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                            </div>
                            <div v-if="imagePreview" class="relative">
                                <img :src="imagePreview" alt="Preview" class="h-20 w-32 rounded-lg border border-gray-200 object-contain p-2 ring-2 ring-primary" />
                                <button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                    <X class="h-3 w-3" />
                                </button>
                            </div>
                            <div v-if="!existingImage && !imagePreview" class="flex h-20 w-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                <ImageIcon class="h-6 w-6 text-gray-400" />
                            </div>
                        </div>
                        <input
                            id="modal_logo"
                            type="file"
                            accept="image/*"
                            class="block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                            @change="onImageChange"
                        />
                        <p class="text-xs text-gray-500">Recommended: square image, max 2MB.</p>
                        <InputError :message="form.errors.logo" />
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label for="modal_order">Order</Label>
                            <Input id="modal_order" v-model.number="form.order" type="number" min="0" class="h-9 text-sm" />
                            <InputError :message="form.errors.order" />
                        </div>
                        <div class="flex items-center space-x-2 pt-2">
                            <Checkbox id="modal_is_active" v-model:checked="form.is_active" />
                            <Label for="modal_is_active" class="text-sm font-normal">Active (visible on site)</Label>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                        <Button type="button" variant="outline" @click="closeModal">Cancel</Button>
                        <Button type="submit" :disabled="form.processing" class="gap-1.5">
                            <Save class="h-3.5 w-3.5" />
                            {{ form.processing ? 'Saving…' : (editingItem ? 'Update Partner' : 'Create Partner') }}
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
