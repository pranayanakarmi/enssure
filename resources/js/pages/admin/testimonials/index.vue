<script setup>
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, Edit, GripVertical, Quote,
    CheckCircle2, AlertCircle, X, User, Star
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
    testimonials: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Local copy for drag‑drop reordering
const localItems = ref([...props.testimonials]);
watch(() => props.testimonials, (newItems) => {
    localItems.value = [...newItems];
}, { immediate: true, deep: true });

// ── Modal state (create/edit) ────────────────────────────────────
const modalOpen = ref(false);
const editingItem = ref(null);
const form = useForm({
    name: '',
    designation: '',
    testimonial_text: '',
    image: null,
    order: 0,
    is_published: true,
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

function openEditModal(testimonial) {
    editingItem.value = testimonial;
    form.name = testimonial.name;
    form.designation = testimonial.designation;
    form.testimonial_text = testimonial.testimonial_text;
    form.order = testimonial.order;
    form.is_published = testimonial.is_published;
    form.image = null;
    form._method = 'put';
    imagePreview.value = null;
    existingImage.value = testimonial.image_url;
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
    form.image = file;
    if (file) imagePreview.value = URL.createObjectURL(file);
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.image = null;
    const el = document.getElementById('modal_image');
    if (el) el.value = '';
}

function saveTestimonial() {
    if (editingItem.value) {
        form.post(`/admin/testimonials/${editingItem.value.id}`, {
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    } else {
        form.post('/admin/testimonials', {
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
    router.delete(`/admin/testimonials/${itemToDelete.value.id}`, {
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

// ── Drag & drop reordering ───────────────────────────────────────
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
    router.post('/admin/testimonials/reorder', { items: payload }, {
        preserveScroll: true,
        onError: () => { localItems.value = [...props.testimonials]; },
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
    { title: 'Testimonials', href: '/admin/testimonials' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Testimonials Management" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Testimonials</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage client and partner testimonials.</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" @click="openCreateModal">
                    <Plus class="h-3.5 w-3.5" />Add Testimonial
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

            <!-- Testimonials grid -->
            <div v-if="localItems.length === 0" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Quote class="h-12 w-12 text-muted-foreground/40" />
                <p class="text-sm text-muted-foreground">No testimonials yet.</p>
                <Button size="sm" @click="openCreateModal">Add your first testimonial</Button>
            </div>

            <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div
                    v-for="(item, idx) in localItems"
                    :key="item.id"
                    draggable="true"
                    @dragstart="onDragStart(idx, $event)"
                    @dragover="onDragOver(idx, $event)"
                    @drop="onDrop(idx)"
                    @dragend="onDragEnd"
                    :class="[
                        'group relative cursor-grab rounded-xl border bg-card transition-all hover:shadow-md active:cursor-grabbing',
                        dragOverIndex === idx && dragIndex !== idx ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/20' : 'border-border',
                        dragIndex === idx ? 'opacity-50' : 'opacity-100'
                    ]"
                >
                    <!-- Drag handle -->
                    <div class="absolute left-2 top-2 z-10 rounded-md bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <GripVertical class="h-3.5 w-3.5 text-muted-foreground" />
                    </div>

                    <!-- Status badge (top right) -->
                    <div class="absolute right-2 top-2 z-10">
                        <Badge :variant="item.is_published ? 'default' : 'secondary'" class="text-[10px]">
                            {{ item.is_published ? 'Published' : 'Draft' }}
                        </Badge>
                    </div>

                    <div class="p-4">
                        <!-- Quote icon -->
                        <div class="mb-3 flex justify-between items-start">
                            <Quote class="h-6 w-6 text-primary/40" />
                        </div>

                        <!-- Testimonial text -->
                        <p class="text-sm text-foreground line-clamp-4 mb-4 italic">
                            “{{ item.testimonial_text }}”
                        </p>

                        <!-- Author -->
                        <div class="flex items-center gap-3 mt-3">
                            <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                                <img v-if="item.image_url" :src="item.image_url" :alt="item.name" class="h-full w-full object-cover" />
                                <div v-else class="flex h-full items-center justify-center">
                                    <User class="h-5 w-5 text-muted-foreground/40" />
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-foreground truncate">{{ item.name }}</p>
                                <p class="text-xs text-muted-foreground truncate">{{ item.designation || '—' }}</p>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="mt-4 flex items-center justify-end gap-1.5">
                            <Button size="sm" variant="outline" class="h-7 gap-1 text-xs" @click.stop="openEditModal(item)">
                                <Edit class="h-3 w-3" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10" @click.stop="confirmDelete(item)">
                                <Trash2 class="h-3 w-3" /> Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete testimonial</h3>
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

        <!-- Create/Edit modal -->
        <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
            <div class="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
                <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                    <h2 class="text-lg font-semibold text-foreground">
                        {{ editingItem ? 'Edit Testimonial' : 'Add New Testimonial' }}
                    </h2>
                    <button type="button" @click="closeModal" class="text-gray-400 hover:text-gray-600">
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <form class="mt-5 space-y-5" @submit.prevent="saveTestimonial">
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label for="modal_name">Name *</Label>
                            <Input id="modal_name" v-model="form.name" required class="h-9 text-sm" />
                            <InputError :message="form.errors.name" />
                        </div>
                        <div class="space-y-1.5">
                            <Label for="modal_designation">Designation / Title</Label>
                            <Input id="modal_designation" v-model="form.designation" class="h-9 text-sm" />
                            <InputError :message="form.errors.designation" />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <Label for="modal_testimonial_text">Testimonial Text *</Label>
                        <!-- ✅ Use native textarea instead of missing Textarea component -->
                        <textarea
                            id="modal_testimonial_text"
                            v-model="form.testimonial_text"
                            rows="4"
                            required
                            class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        ></textarea>
                        <InputError :message="form.errors.testimonial_text" />
                    </div>

                    <!-- <div class="space-y-1.5">
                        <Label class="text-xs font-medium">Photo (optional)</Label>
                        <div class="flex flex-wrap gap-3">
                            <div v-if="existingImage && !imagePreview" class="relative">
                                <img :src="existingImage" alt="Current" class="h-16 w-16 rounded-full border border-gray-200 object-cover" />
                                <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                            </div>
                            <div v-if="imagePreview" class="relative">
                                <img :src="imagePreview" alt="Preview" class="h-16 w-16 rounded-full border border-gray-200 object-cover ring-2 ring-primary" />
                                <button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                    <X class="h-3 w-3" />
                                </button>
                            </div>
                            <div v-if="!existingImage && !imagePreview" class="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50">
                                <User class="h-6 w-6 text-gray-400" />
                            </div>
                        </div>
                        <input
                            id="modal_image"
                            type="file"
                            accept="image/*"
                            class="block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                            @change="onImageChange"
                        />
                        <p class="text-xs text-gray-500">Recommended: square image, max 2MB.</p>
                        <InputError :message="form.errors.image" />
                    </div> -->

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="space-y-1.5">
                            <Label for="modal_order">Order</Label>
                            <Input id="modal_order" v-model.number="form.order" type="number" min="0" class="h-9 text-sm" />
                            <InputError :message="form.errors.order" />
                        </div>
                        <div class="flex items-center space-x-2 pt-2">
                            <Checkbox id="modal_is_published" v-model:checked="form.is_published" />
                            <Label for="modal_is_published" class="text-sm font-normal">Published (visible on site)</Label>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                        <Button type="button" variant="outline" @click="closeModal">Cancel</Button>
                        <Button type="submit" :disabled="form.processing" class="gap-1.5">
                            <Save class="h-3.5 w-3.5" />
                            {{ form.processing ? 'Saving…' : (editingItem ? 'Update Testimonial' : 'Create Testimonial') }}
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
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
