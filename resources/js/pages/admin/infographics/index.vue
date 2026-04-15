<script setup>
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, Edit, ImageIcon, ExternalLink,
    CheckCircle2, AlertCircle, X, ChevronDown, ChevronUp, XCircle
} from 'lucide-vue-next';
import { ref, computed } from 'vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    infographics: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

const infographicsList = ref([...props.infographics]);
const searchQuery = ref('');
const filteredInfographics = computed(() => {
    if (!searchQuery.value) return infographicsList.value;
    const q = searchQuery.value.toLowerCase();
    return infographicsList.value.filter(inf => inf.title.toLowerCase().includes(q) || inf.slug.toLowerCase().includes(q));
});

// ── Create Infographic (inline) ─────────────────────────────────
const showCreateForm = ref(false);
const createForm = useForm({
    title: '', hero_title: '', slug: '', description: '',
    meta_title: '', meta_description: '', url: '', is_published: true,
    image: null, banner_image: null,
});
const createImagePreview = ref(null);
const createBannerPreview = ref(null);

function onCreateImageChange(e) {
    if (createImagePreview.value) URL.revokeObjectURL(createImagePreview.value);
    const file = e.target.files?.[0] || null;
    createForm.image = file;
    if (file) createImagePreview.value = URL.createObjectURL(file);
    else createImagePreview.value = null;
}
function onCreateBannerChange(e) {
    if (createBannerPreview.value) URL.revokeObjectURL(createBannerPreview.value);
    const file = e.target.files?.[0] || null;
    createForm.banner_image = file;
    if (file) createBannerPreview.value = URL.createObjectURL(file);
    else createBannerPreview.value = null;
}
function clearCreatePreviews() {
    if (createImagePreview.value) URL.revokeObjectURL(createImagePreview.value);
    if (createBannerPreview.value) URL.revokeObjectURL(createBannerPreview.value);
    createImagePreview.value = null;
    createBannerPreview.value = null;
    createForm.image = null;
    createForm.banner_image = null;
}
function createInfographic() {
    createForm.post('/admin/infographics', {
        forceFormData: true,
        onSuccess: () => {
            createForm.reset();
            showCreateForm.value = false;
            clearCreatePreviews();
        },
    });
}

// ── Edit Infographic (inline) ──────────────────────────────────
const editingId = ref(null);
const editForms = ref({});
const editImagePreviews = ref({});
const editBannerPreviews = ref({});
const editCurrentImageUrls = ref({});
const editCurrentBannerUrls = ref({});

function startEdit(inf) {
    editingId.value = inf.id;
    editForms.value[inf.id] = useForm({
        title: inf.title,
        hero_title: inf.hero_title || '',
        slug: inf.slug,
        description: inf.description || '',
        meta_title: inf.meta_title || '',
        meta_description: inf.meta_description || '',
        url: inf.url || '',
        is_published: inf.is_published,
        image: null,
        banner_image: null,
        remove_banner: false,
        _method: 'put',
    });
    editImagePreviews.value[inf.id] = null;
    editBannerPreviews.value[inf.id] = null;
    editCurrentImageUrls.value[inf.id] = inf.image_url;
    editCurrentBannerUrls.value[inf.id] = inf.banner_image_url;
}
function cancelEdit(id) {
    editingId.value = null;
    delete editForms.value[id];
    delete editImagePreviews.value[id];
    delete editBannerPreviews.value[id];
}
function onEditImageChange(infId, e) {
    if (editImagePreviews.value[infId]) URL.revokeObjectURL(editImagePreviews.value[infId]);
    const file = e.target.files?.[0] || null;
    editForms.value[infId].image = file;
    if (file) editImagePreviews.value[infId] = URL.createObjectURL(file);
    else editImagePreviews.value[infId] = null;
}
function onEditBannerChange(infId, e) {
    if (editBannerPreviews.value[infId]) URL.revokeObjectURL(editBannerPreviews.value[infId]);
    const file = e.target.files?.[0] || null;
    editForms.value[infId].banner_image = file;
    if (file) editBannerPreviews.value[infId] = URL.createObjectURL(file);
    else editBannerPreviews.value[infId] = null;
}
function clearEditImage(infId) {
    if (editImagePreviews.value[infId]) URL.revokeObjectURL(editImagePreviews.value[infId]);
    editImagePreviews.value[infId] = null;
    editForms.value[infId].image = null;
    editCurrentImageUrls.value[infId] = null;
}
function clearEditBanner(infId) {
    if (editBannerPreviews.value[infId]) URL.revokeObjectURL(editBannerPreviews.value[infId]);
    editBannerPreviews.value[infId] = null;
    editForms.value[infId].banner_image = null;
    editForms.value[infId].remove_banner = true;
    editCurrentBannerUrls.value[infId] = null;
}
function saveInfographic(inf) {
    const form = editForms.value[inf.id];
    form.post(`/admin/infographics/${inf.id}`, {
        forceFormData: true,
        onSuccess: () => {
            editingId.value = null;
            delete editForms.value[inf.id];
        },
    });
}

// ── Delete Infographic (modal) ──────────────────────────────────
const deleteModalOpen = ref(false);
const infToDelete = ref(null);
const isDeleting = ref(false);
function confirmDelete(inf) {
    infToDelete.value = inf;
    deleteModalOpen.value = true;
}
function deleteInfographic() {
    if (!infToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/infographics/${infToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            deleteModalOpen.value = false;
            infToDelete.value = null;
        },
    });
}

// ── Items Management ────────────────────────────────────────────
const expandedId = ref(null);
function toggleItems(id) {
    expandedId.value = expandedId.value === id ? null : id;
}

// Add item
const newItemForms = ref({});
function getNewItemForm(infId) {
    if (!newItemForms.value[infId]) {
        newItemForms.value[infId] = useForm({ title: '', alt_text: '', image: null });
    }
    return newItemForms.value[infId];
}
function addItem(infId) {
    const form = getNewItemForm(infId);
    form.post(`/admin/infographics/${infId}/items`, {
        forceFormData: true,
        onSuccess: () => {
            form.reset();
            const input = document.getElementById(`item_image_${infId}`);
            if (input) input.value = '';
        },
    });
}

// Edit item (inline)
const editingItemId = ref(null);
const editItemForm = useForm({ title: '', alt_text: '', image: null });
const editItemPreview = ref(null);
function startEditItem(item) {
    editingItemId.value = item.id;
    editItemForm.title = item.title;
    editItemForm.alt_text = item.alt_text || '';
    editItemForm.image = null;
    editItemPreview.value = null;
}
function onEditItemImageChange(e) {
    if (editItemPreview.value) URL.revokeObjectURL(editItemPreview.value);
    const file = e.target.files?.[0] || null;
    editItemForm.image = file;
    if (file) editItemPreview.value = URL.createObjectURL(file);
    else editItemPreview.value = null;
}
function saveItem(itemId) {
    editItemForm.put(`/admin/infographic-items/${itemId}`, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            editingItemId.value = null;
            editItemForm.reset();
            editItemPreview.value = null;
        },
    });
}
function deleteItem(itemId) {
    if (confirm('Remove this item?')) {
        router.delete(`/admin/infographic-items/${itemId}`, { preserveScroll: true });
    }
}

// Reorder items
function moveItemUp(infId, item, index) {
    if (index === 0) return;
    const newOrder = item.sort_order - 10;
    router.put(`/admin/infographic-items/${item.id}`, { order: newOrder }, {
        preserveScroll: true,
        onSuccess: () => router.reload({ only: ['infographics'] }),
    });
}
function moveItemDown(infId, item, index, itemsLength) {
    if (index === itemsLength - 1) return;
    const newOrder = item.sort_order + 10;
    router.put(`/admin/infographic-items/${item.id}`, { order: newOrder }, {
        preserveScroll: true,
        onSuccess: () => router.reload({ only: ['infographics'] }),
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Infographics', href: '/admin/infographics' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Infographics" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Infographics</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage infographics and their items.</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                        <Input v-model="searchQuery" placeholder="Search..." class="h-8 w-48 pl-8 text-xs" />
                    </div>
                    <Button size="sm" class="h-8 gap-1.5 text-xs" @click="showCreateForm = !showCreateForm">
                        <Plus class="h-3.5 w-3.5" /> {{ showCreateForm ? 'Cancel' : 'New Infographic' }}
                    </Button>
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

            <!-- Create Infographic Form (inline) -->
            <div v-if="showCreateForm" class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="text-sm font-semibold">Create New Infographic</h3>
                    <button @click="showCreateForm = false"><XCircle class="h-5 w-5 text-gray-400" /></button>
                </div>
                <form @submit.prevent="createInfographic" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label class="text-xs font-medium">Title *</Label><Input v-model="createForm.title" class="h-9 text-sm" /><span class="text-xs text-red-500">{{ createForm.errors.title }}</span></div>
                    <div><Label class="text-xs font-medium">Hero Title</Label><Input v-model="createForm.hero_title" class="h-9 text-sm" /></div>
                    <div><Label class="text-xs font-medium">Slug *</Label><Input v-model="createForm.slug" class="h-9 text-sm" /></div>
                    <div><Label class="text-xs font-medium">External URL</Label><Input v-model="createForm.url" class="h-9 text-sm" /></div>
                    <div class="md:col-span-2"><Label class="text-xs font-medium">Description</Label><RichTextEditor v-model="createForm.description" /></div>
                    <div><Label class="text-xs font-medium">Meta Title</Label><Input v-model="createForm.meta_title" class="h-9 text-sm" /></div>
                    <div><Label class="text-xs font-medium">Meta Description</Label><textarea v-model="createForm.meta_description" rows="2" class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"></textarea></div>
                    <div class="flex items-center gap-2"><Checkbox id="create_published" v-model:checked="createForm.is_published" /><Label for="create_published" class="text-xs font-medium">Published</Label></div>
                    <div><Label class="text-xs font-medium">Thumbnail</Label><input type="file" accept="image/*" @change="onCreateImageChange" class="block w-full text-sm" /><div v-if="createImagePreview" class="mt-1"><img :src="createImagePreview" class="h-20 rounded border" /></div></div>
                    <div><Label class="text-xs font-medium">Banner Image</Label><input type="file" accept="image/*" @change="onCreateBannerChange" class="block w-full text-sm" /><div v-if="createBannerPreview" class="mt-1"><img :src="createBannerPreview" class="h-20 rounded border" /></div></div>
                    <div class="md:col-span-2"><Button type="submit" size="sm" :disabled="createForm.processing">Create</Button></div>
                </form>
            </div>

            <!-- Infographics List – full width cards -->
            <div class="space-y-5">
                <div v-for="inf in filteredInfographics" :key="inf.id" class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <!-- Card Header -->
                    <div class="p-4 border-b border-gray-200">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-sm font-semibold text-foreground">{{ inf.title }}</h3>
                                <p class="text-xs text-muted-foreground">{{ inf.slug }}</p>
                            </div>
                            <div class="flex gap-1">
                                <Button v-if="editingId !== inf.id" size="sm" variant="outline" class="h-7 gap-1 text-xs" @click="startEdit(inf)">
                                    <Edit class="h-3 w-3" /> Edit
                                </Button>
                                <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10" @click="confirmDelete(inf)">
                                    <Trash2 class="h-3 w-3" /> Delete
                                </Button>
                                <a :href="inf.public_url" target="_blank" class="inline-flex items-center justify-center h-7 w-7 rounded text-gray-500 hover:text-gray-700"><ExternalLink class="h-3.5 w-3.5" /></a>
                            </div>
                        </div>
                        <div class="mt-2 flex items-center justify-between">
                            <Badge :variant="inf.is_published ? 'default' : 'secondary'" class="text-[10px]">{{ inf.is_published ? 'Published' : 'Draft' }}</Badge>
                            <button @click="toggleItems(inf.id)" class="text-xs text-primary flex items-center gap-1">
                                {{ expandedId === inf.id ? 'Hide Items' : 'Manage Items' }}
                                <ChevronDown v-if="expandedId !== inf.id" class="h-3.5 w-3.5" />
                                <ChevronUp v-else class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>

                    <!-- Inline Edit Infographic Form -->
                    <div v-if="editingId === inf.id" class="p-4 border-b border-gray-200 bg-gray-50">
                        <form @submit.prevent="saveInfographic(inf)" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div><Label class="text-xs font-medium">Title</Label><Input v-model="editForms[inf.id].title" class="h-9 text-sm" /></div>
                            <div><Label class="text-xs font-medium">Hero Title</Label><Input v-model="editForms[inf.id].hero_title" class="h-9 text-sm" /></div>
                            <div><Label class="text-xs font-medium">Slug</Label><Input v-model="editForms[inf.id].slug" class="h-9 text-sm" /></div>
                            <div><Label class="text-xs font-medium">URL</Label><Input v-model="editForms[inf.id].url" class="h-9 text-sm" /></div>
                            <div class="sm:col-span-2"><Label class="text-xs font-medium">Description</Label><RichTextEditor v-model="editForms[inf.id].description" /></div>
                            <div><Label class="text-xs font-medium">Meta Title</Label><Input v-model="editForms[inf.id].meta_title" class="h-9 text-sm" /></div>
                            <div><Label class="text-xs font-medium">Meta Desc</Label><textarea v-model="editForms[inf.id].meta_description" rows="2" class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"></textarea></div>
                            <div class="flex items-center gap-2"><Checkbox id="edit_published" v-model:checked="editForms[inf.id].is_published" /><Label class="text-xs font-medium">Published</Label></div>
                            <div><Label class="text-xs font-medium">Thumbnail</Label>
                                <div v-if="editCurrentImageUrls[inf.id] && !editImagePreviews[inf.id]" class="relative inline-block"><img :src="editCurrentImageUrls[inf.id]" class="h-16 rounded border" /><button type="button" @click="clearEditImage(inf.id)" class="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"><X class="h-3 w-3 text-white" /></button></div>
                                <div v-if="editImagePreviews[inf.id]" class="relative inline-block"><img :src="editImagePreviews[inf.id]" class="h-16 rounded border" /><button type="button" @click="editImagePreviews[inf.id] = null; editForms[inf.id].image = null" class="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"><X class="h-3 w-3 text-white" /></button></div>
                                <input type="file" accept="image/*" @change="e => onEditImageChange(inf.id, e)" class="mt-1 block w-full text-sm" />
                            </div>
                            <div><Label class="text-xs font-medium">Banner</Label>
                                <div v-if="editCurrentBannerUrls[inf.id] && !editBannerPreviews[inf.id]" class="relative inline-block"><img :src="editCurrentBannerUrls[inf.id]" class="h-16 rounded border" /><button type="button" @click="clearEditBanner(inf.id)" class="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"><X class="h-3 w-3 text-white" /></button></div>
                                <div v-if="editBannerPreviews[inf.id]" class="relative inline-block"><img :src="editBannerPreviews[inf.id]" class="h-16 rounded border" /><button type="button" @click="editBannerPreviews[inf.id] = null; editForms[inf.id].banner_image = null" class="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"><X class="h-3 w-3 text-white" /></button></div>
                                <input type="file" accept="image/*" @change="e => onEditBannerChange(inf.id, e)" class="mt-1 block w-full text-sm" />
                            </div>
                            <div class="sm:col-span-2 flex gap-2">
                                <Button type="submit" size="sm" :disabled="editForms[inf.id].processing">Save</Button>
                                <Button type="button" variant="outline" size="sm" @click="cancelEdit(inf.id)">Cancel</Button>
                            </div>
                        </form>
                    </div>

                    <!-- Items Section (expandable) -->
                    <div v-if="expandedId === inf.id" class="p-4 space-y-4 bg-gray-50 rounded-b-xl">
                        <div class="flex justify-between">
                            <h4 class="text-xs font-semibold uppercase tracking-wide text-gray-500">Items</h4>
                        </div>

                        <div v-if="inf.items?.length" class="space-y-2">
                            <div v-for="(item, idx) in inf.items" :key="item.id" class="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
                                <img :src="item.image_url" class="h-10 w-14 rounded object-cover border" />
                                <div class="flex-1 min-w-0">
                                    <div v-if="editingItemId === item.id" class="space-y-1">
                                        <Input v-model="editItemForm.title" class="h-7 text-xs" placeholder="Title" />
                                        <Input v-model="editItemForm.alt_text" class="h-7 text-xs" placeholder="Alt text" />
                                        <input type="file" @change="onEditItemImageChange" class="text-xs" />
                                        <div class="flex gap-1">
                                            <Button size="sm" class="h-6 text-xs" @click="saveItem(item.id)">Save</Button>
                                            <Button size="sm" variant="ghost" class="h-6 text-xs" @click="editingItemId = null">Cancel</Button>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <p class="text-xs font-medium truncate">{{ item.title }}</p>
                                        <p class="text-[10px] text-gray-500">Order: {{ item.sort_order }}</p>
                                    </div>
                                </div>
                                <div class="flex gap-0.5">
                                    <button @click="startEditItem(item)" class="p-1 text-gray-500 hover:text-primary"><Edit class="h-3 w-3" /></button>
                                    <button @click="moveItemUp(inf.id, item, idx)" :disabled="idx === 0" class="p-1 text-gray-500 hover:text-primary disabled:opacity-30"><ChevronUp class="h-3 w-3" /></button>
                                    <button @click="moveItemDown(inf.id, item, idx, inf.items.length)" :disabled="idx === inf.items.length-1" class="p-1 text-gray-500 hover:text-primary disabled:opacity-30"><ChevronDown class="h-3 w-3" /></button>
                                    <button @click="deleteItem(item.id)" class="p-1 text-gray-500 hover:text-destructive"><Trash2 class="h-3 w-3" /></button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center text-xs text-gray-500 py-2">No items yet.</div>

                        <!-- Add item form -->
                        <form @submit.prevent="addItem(inf.id)" class="flex flex-wrap items-end gap-2 pt-2 border-t border-gray-200">
                            <div class="flex-1 min-w-[100px]">
                                <Input v-model="getNewItemForm(inf.id).title" placeholder="Title *" class="h-7 text-xs" required />
                            </div>
                            <div class="flex-1 min-w-[100px]">
                                <Input v-model="getNewItemForm(inf.id).alt_text" placeholder="Alt text" class="h-7 text-xs" />
                            </div>
                            <div>
                                <input :id="`item_image_${inf.id}`" type="file" accept="image/*" required @change="e => getNewItemForm(inf.id).image = e.target.files[0]" class="text-xs" />
                            </div>
                            <Button type="submit" size="sm" class="h-7 gap-1 text-xs">
                                <Plus class="h-3 w-3" /> Add
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div v-if="!filteredInfographics.length" class="text-center py-12 bg-gray-50 rounded-xl border">
                <p class="text-sm text-gray-500">No infographics found.</p>
            </div>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="deleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="deleteModalOpen = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete infographic</h3>
                <p class="mt-2 text-sm text-muted-foreground">Are you sure you want to delete “{{ infToDelete?.title }}”? All its items will be deleted. This cannot be undone.</p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="deleteModalOpen = false">Cancel</Button>
                    <Button variant="destructive" size="sm" @click="deleteInfographic" :disabled="isDeleting">{{ isDeleting ? 'Deleting...' : 'Delete permanently' }}</Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
[draggable="true"] { user-select: none; }
</style>
