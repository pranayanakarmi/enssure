<script setup>
import { Head, useForm, router } from '@inertiajs/vue3';
import { Plus, Edit, Trash2, ExternalLink, ChevronDown, ChevronUp, Search, X, XCircle } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    infographics: Array,
});

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-50 rounded-lg px-4 py-2 text-white shadow-lg ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

const infographicsList = ref([...props.infographics]);
const searchQuery = ref('');
const filteredInfographics = computed(() => {
    if (!searchQuery.value) return infographicsList.value;
    const q = searchQuery.value.toLowerCase();
    return infographicsList.value.filter(inf => inf.title.toLowerCase().includes(q) || inf.slug.toLowerCase().includes(q));
});

// ---------- Create Infographic ----------
const showCreateForm = ref(false);
const createForm = useForm({
    title: '', hero_title: '', slug: '', description: '',
    meta_title: '', meta_description: '', url: '', is_published: true,
    image: null, banner_image: null,
});

function createInfographic() {
    createForm.post('/admin/infographics', {
        forceFormData: true,
        onSuccess: () => {
            createForm.reset();
            showCreateForm.value = false;
            showToast('Infographic created');
            window.location.reload();
        },
        onError: () => showToast('Creation failed', 'error')
    });
}

// ---------- Edit Infographic ----------
const editingId = ref(null);
const editForms = ref({});

function startEdit(inf) {
    editingId.value = inf.id;
    editForms.value[inf.id] = useForm({
        id: inf.id,
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
    });
}

function cancelEdit(id) {
    editingId.value = null;
    delete editForms.value[id];
}

function saveInfographic(inf) {
    const form = editForms.value[inf.id];
    form.put(`/admin/infographics/${inf.id}`, {
        forceFormData: true,
        onSuccess: () => {
            editingId.value = null;
            delete editForms.value[inf.id];
            showToast('Infographic updated');
            window.location.reload();
        },
        onError: () => showToast('Update failed', 'error')
    });
}

function deleteInfographic(inf) {
    if (confirm('Delete this infographic? All items will be deleted.')) {
        router.delete(`/admin/infographics/${inf.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                showToast('Deleted');
                window.location.reload();
            },
            onError: () => showToast('Delete failed', 'error')
        });
    }
}

// ---------- Items Management ----------
const expandedId = ref(null);
function toggleItems(id) {
    expandedId.value = expandedId.value === id ? null : id;
}

// Add item
const newItemForms = ref({});

function getNewItemForm(infId) {
    if (!newItemForms.value[infId]) {
        newItemForms.value[infId] = useForm({ title: '', image: null, alt_text: '' });
    }
    return newItemForms.value[infId];
}

function addItem(infId) {
    const form = getNewItemForm(infId);
    form.post(`/admin/infographics/${infId}/items`, {
        forceFormData: true,
        onSuccess: () => {
            form.reset();
            showToast('Item added');
            window.location.reload();
        },
        onError: () => showToast('Add failed', 'error')
    });
}

// Edit item
const editingItemId = ref(null);
const editItemForm = useForm({ title: '', alt_text: '', image: null });

function startEditItem(item) {
    editingItemId.value = item.id;
    editItemForm.title = item.title;
    editItemForm.alt_text = item.alt_text || '';
    editItemForm.image = null;
    editItemForm.clearErrors();
}

function saveItem(itemId) {
    editItemForm.put(`/admin/infographic-items/${itemId}`, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            editingItemId.value = null;
            editItemForm.reset();
            showToast('Item updated');
            window.location.reload();
        },
        onError: (errors) => {
            console.error('Update error:', errors);
            showToast('Update failed', 'error');
        }
    });
}

function deleteItem(itemId) {
    if (!confirm('Delete this item?')) return;
    router.delete(`/admin/infographic-items/${itemId}`, {
        preserveScroll: true,
        onSuccess: () => {
            showToast('Item deleted');
            window.location.reload();
        },
        onError: (errors) => {
            console.error('Delete error:', errors);
            showToast('Delete failed', 'error');
        }
    });
}
</script>

<template>
    <AppLayout>
        <Head title="Infographics Dashboard" />
        <div class="p-6">
            <!-- Header -->
            <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold">Infographics</h1>
                    <p class="text-sm text-gray-500">Manage all infographics and their items</p>
                </div>
                <div class="flex gap-3">
                    <div class="relative">
                        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input v-model="searchQuery" type="text" placeholder="Search..." class="rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm" />
                        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-2 top-1/2 -translate-y-1/2"><X class="h-4 w-4" /></button>
                    </div>
                    <button @click="showCreateForm = !showCreateForm" class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        <Plus class="h-4 w-4" /> {{ showCreateForm ? 'Cancel' : 'New Infographic' }}
                    </button>
                </div>
            </div>

            <!-- Create Infographic Form (inline) -->
            <div v-if="showCreateForm" class="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-semibold">Create New Infographic</h3>
                    <button @click="showCreateForm = false"><XCircle class="h-5 w-5 text-gray-400" /></button>
                </div>
                <form @submit.prevent="createInfographic" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="block text-sm font-medium">Title *</label><input v-model="createForm.title" class="mt-1 w-full rounded border p-2" /><span class="text-xs text-red-500">{{ createForm.errors.title }}</span></div>
                    <div><label class="block text-sm font-medium">Hero Title</label><input v-model="createForm.hero_title" class="mt-1 w-full rounded border p-2" /></div>
                    <div><label class="block text-sm font-medium">Slug *</label><input v-model="createForm.slug" class="mt-1 w-full rounded border p-2" /></div>
                    <div class="md:col-span-2"><label class="block text-sm font-medium">Description</label><textarea v-model="createForm.description" rows="2" class="mt-1 w-full rounded border p-2"></textarea></div>
                    <div><label class="block text-sm font-medium">Meta Title</label><input v-model="createForm.meta_title" class="mt-1 w-full rounded border p-2" /></div>
                    <div><label class="block text-sm font-medium">Meta Description</label><textarea v-model="createForm.meta_description" rows="2" class="mt-1 w-full rounded border p-2"></textarea></div>
                    <div><label class="block text-sm font-medium">External URL</label><input v-model="createForm.url" type="text" class="mt-1 w-full rounded border p-2" /></div>
                    <div class="flex items-center gap-2"><label class="text-sm font-medium">Published</label><input type="checkbox" v-model="createForm.is_published" class="h-4 w-4" /></div>
                    <div><label class="block text-sm font-medium">Thumbnail</label><input type="file" accept="image/*" @change="e => createForm.image = e.target.files[0]" /></div>
                    <div><label class="block text-sm font-medium">Banner Image</label><input type="file" accept="image/*" @change="e => createForm.banner_image = e.target.files[0]" /></div>
                    <div class="md:col-span-2"><button type="submit" class="rounded-md bg-blue-600 px-4 py-2 text-white" :disabled="createForm.processing">Create</button></div>
                </form>
            </div>

            <!-- Infographics List – FULL WIDTH (single column) -->
            <div class="space-y-6">
                <div v-for="inf in filteredInfographics" :key="inf.id">
                    <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <!-- Card Header -->
                        <div class="p-4 border-b">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-semibold text-lg">{{ inf.title }}</h3>
                                    <p class="text-xs text-gray-500">/{{ inf.slug }}</p>
                                </div>
                                <div class="flex gap-1">
                                    <button @click="startEdit(inf)" class="rounded p-1.5 hover:bg-gray-100"><Edit class="h-4 w-4" /></button>
                                    <button @click="deleteInfographic(inf)" class="rounded p-1.5 hover:bg-gray-100"><Trash2 class="h-4 w-4 text-red-500" /></button>
                                    <a :href="inf.public_url" target="_blank" class="rounded p-1.5 hover:bg-gray-100"><ExternalLink class="h-4 w-4" /></a>
                                </div>
                            </div>
                            <div class="mt-3 flex justify-between items-center">
                                <span :class="['rounded-full px-2 py-0.5 text-xs', inf.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600']">
                                    {{ inf.is_published ? 'Published' : 'Draft' }}
                                </span>
                                <button @click="toggleItems(inf.id)" class="text-sm text-blue-600 flex items-center gap-1">
                                    {{ expandedId === inf.id ? 'Hide Items' : 'Manage Items' }}
                                    <ChevronDown v-if="expandedId !== inf.id" class="h-3.5 w-3.5" />
                                    <ChevronUp v-else class="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>

                        <!-- Inline Edit Infographic -->
                        <div v-if="editingId === inf.id" class="p-4 border-b bg-gray-50">
                            <form @submit.prevent="saveInfographic(inf)" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div><label class="text-sm">Title</label><input v-model="editForms[inf.id].title" class="w-full rounded border p-1" /></div>
                                <div><label class="text-sm">Hero Title</label><input v-model="editForms[inf.id].hero_title" class="w-full rounded border p-1" /></div>
                                <div><label class="text-sm">Slug</label><input v-model="editForms[inf.id].slug" class="w-full rounded border p-1" /></div>
                                <div class="sm:col-span-2">
                                <label class="text-sm">Description</label>
                                             <RichTextEditor v-model="editForms[inf.id].description" />
                                </div>
                                <div><label class="text-sm">Meta Title</label><input v-model="editForms[inf.id].meta_title" class="w-full rounded border p-1" /></div>
                                <div><label class="text-sm">Meta Desc</label><textarea v-model="editForms[inf.id].meta_description" rows="2" class="w-full rounded border p-1"></textarea></div>
                                <div><label class="text-sm">URL</label><input v-model="editForms[inf.id].url" type="text" class="w-full rounded border p-1" /></div>
                                <div class="flex items-center gap-2"><label class="text-sm">Published</label><input type="checkbox" v-model="editForms[inf.id].is_published" /></div>
                                <div><label class="text-sm">Thumbnail</label><input type="file" @change="e => editForms[inf.id].image = e.target.files[0]" /></div>
                                <div><label class="text-sm">Banner</label><input type="file" @change="e => editForms[inf.id].banner_image = e.target.files[0]" /></div>
                                <div class="sm:col-span-2 flex gap-2">
                                    <button type="submit" class="rounded bg-blue-600 px-3 py-1 text-white">Save</button>
                                    <button type="button" @click="cancelEdit(inf.id)" class="rounded border px-3 py-1">Cancel</button>
                                </div>
                            </form>
                        </div>

                        <!-- Items Section (expandable) -->
                        <div v-if="expandedId === inf.id" class="p-4 space-y-4 bg-gray-50 rounded-b-xl">
                            <div class="flex justify-between">
                                <h4 class="font-medium text-sm">Items</h4>
                                <span class="text-xs text-gray-500">Drag to reorder (coming soon)</span>
                            </div>

                            <div v-if="inf.items?.length" class="space-y-3">
                                <div v-for="item in inf.items" :key="item.id" class="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                    <img :src="item.image_url" class="h-14 w-20 rounded object-cover border" />
                                    <div class="flex-1">
                                        <div v-if="editingItemId === item.id">
                                            <input v-model="editItemForm.title" class="w-full rounded border p-1 text-sm" />
                                            <input v-model="editItemForm.alt_text" placeholder="Alt text" class="mt-1 w-full rounded border p-1 text-xs" />
                                            <input type="file" @change="e => editItemForm.image = e.target.files[0]" class="mt-1 text-xs" />
                                            <div class="flex gap-2 mt-2">
                                                <button @click="saveItem(item.id)" class="rounded bg-green-600 px-2 py-1 text-xs text-white">Save</button>
                                                <button @click="editingItemId = null" class="rounded border px-2 py-1 text-xs">Cancel</button>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p class="font-medium text-sm">{{ item.title }}</p>
                                            <p class="text-xs text-gray-500">Order: {{ item.sort_order }}</p>
                                            <p v-if="item.alt_text" class="text-xs text-gray-400">Alt: {{ item.alt_text }}</p>
                                        </div>
                                    </div>
                                    <div class="flex gap-1">
                                        <button @click="startEditItem(item)" class="rounded p-1 hover:bg-gray-100"><Edit class="h-3.5 w-3.5" /></button>
                                        <button @click="deleteItem(item.id)" class="rounded p-1 hover:bg-gray-100"><Trash2 class="h-3.5 w-3.5 text-red-500" /></button>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-center text-sm text-gray-500 py-2 bg-white rounded">No items yet.</div>

                            <form @submit.prevent="addItem(inf.id)" class="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end mt-4 pt-4 border-t">
                                <div class="sm:col-span-2"><label class="text-xs font-medium">Title *</label><input v-model="getNewItemForm(inf.id).title" required class="mt-1 w-full rounded border p-1 text-sm" /></div>
                                <div><label class="text-xs font-medium">Alt Text</label><input v-model="getNewItemForm(inf.id).alt_text" class="mt-1 w-full rounded border p-1 text-sm" /></div>
                                <div><label class="text-xs font-medium">Image *</label><input type="file" accept="image/*" @change="e => getNewItemForm(inf.id).image = e.target.files[0]" required class="mt-1 text-sm" /></div>
                                <div><button type="submit" class="rounded bg-blue-600 px-3 py-1 text-sm text-white"><Plus class="h-3.5 w-3.5 inline mr-1" /> Add</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!filteredInfographics.length" class="text-center py-12 bg-gray-50 rounded-xl border">
                <p class="text-gray-500">No infographics found.</p>
            </div>
        </div>
    </AppLayout>
</template>
