<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link, router } from '@inertiajs/vue3';
import { Trash2, ArrowLeft, Save, Plus, X, ImageIcon, ArrowUp, ArrowDown, Settings, Images } from 'lucide-vue-next';
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

function slugify(text) {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

const props = defineProps({
    gallery: { type: Object, required: true },
});

// Tab state
const activeTab = ref('details'); // 'details' or 'images'

// Album details form
const form = useForm({
    title: props.gallery.title ?? '',
    slug: props.gallery.slug ?? '',
    description: props.gallery.description ?? '',
    cover_image: null,
    remove_cover_image: false,
});

watch(
    () => form.title,
    (title) => {
        if (!form.remove_cover_image) {
            form.slug = slugify(title);
        }
    },
);

// ── Multi‑image upload ───────────────────────────────────────────
const addImageForm = useForm({
    images: [],        // array of File objects
    caption: '',
    startOrder: (props.gallery.images?.length ?? 0),
});
const imagePreviews = ref([]);   // array of preview URLs
const addImageInputRef = ref(null);
const isUploading = ref(false);

function onAddImageChange(e) {
    // Clear old previews
    imagePreviews.value.forEach(url => URL.revokeObjectURL(url));
    imagePreviews.value = [];
    const files = Array.from(e.target.files || []);
    addImageForm.images = files;
    // Create previews
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            imagePreviews.value.push(URL.createObjectURL(file));
        }
    });
}
function clearImagePreviews() {
    imagePreviews.value.forEach(url => URL.revokeObjectURL(url));
    imagePreviews.value = [];
    addImageForm.images = [];
    if (addImageInputRef.value) addImageInputRef.value.value = '';
}

async function submitAddImages() {
    const files = addImageForm.images;
    if (files.length === 0) return;

    isUploading.value = true;
    let successCount = 0;
    let failCount = 0;
    const total = files.length;

    // Capture the current max order before starting (so new images get consecutive orders)
    const startOrder = (props.gallery.images?.length ?? 0);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('image', file);
        formData.append('caption', addImageForm.caption);
        formData.append('order', startOrder + i);

        try {
            await router.post(`/admin/galleries/${props.gallery.id}/images`, formData, {
                forceFormData: true,
                preserveScroll: true,
            });
            successCount++;
        } catch (error) {
            console.error(`Failed to upload: ${file.name}`, error);
            failCount++;
        }
    }

    isUploading.value = false;
    clearImagePreviews();
    addImageForm.caption = '';
    addImageForm.startOrder = (props.gallery.images?.length ?? 0) + files.length;

    // Show result summary
    if (successCount > 0) {
        alert(`${successCount} image(s) uploaded successfully.${failCount > 0 ? ` ${failCount} failed.` : ''}`);
        router.reload({ only: ['gallery'] });
    } else if (failCount > 0) {
        alert(`Upload failed for all ${failCount} image(s). Check console for details.`);
    }
}

// ── Reorder single image (arrow buttons) ─────────────────────────
function moveImageUp(image, index) {
    if (index === 0) return;
    const newOrder = image.order - 10;
    router.put(`/admin/gallery-images/${image.id}`, { order: newOrder }, {
        preserveScroll: true,
        onSuccess: () => {
            router.reload({ only: ['gallery'] });
        },
    });
}
function moveImageDown(image, index) {
    if (index === (props.gallery.images?.length ?? 0) - 1) return;
    const newOrder = image.order + 10;
    router.put(`/admin/gallery-images/${image.id}`, { order: newOrder }, {
        preserveScroll: true,
        onSuccess: () => {
            router.reload({ only: ['gallery'] });
        },
    });
}
function removeImage(imageId) {
    if (confirm('Remove this image?')) {
        router.delete(`/admin/gallery-images/${imageId}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['gallery'] });
            },
        });
    }
}

// ── Cover image handling ─────────────────────────────────────────
const coverPreview = ref(null);
const coverInputRef = ref(null);
const currentCoverUrl = props.gallery.cover_image_url;

function onCoverImageChange(e) {
    if (coverPreview.value) URL.revokeObjectURL(coverPreview.value);
    const file = e.target.files?.[0] || null;
    form.cover_image = file;
    form.remove_cover_image = false;
    if (file) coverPreview.value = URL.createObjectURL(file);
    else coverPreview.value = null;
}
function removeCoverImage() {
    form.remove_cover_image = true;
    form.cover_image = null;
    if (coverPreview.value) {
        URL.revokeObjectURL(coverPreview.value);
        coverPreview.value = null;
    }
    if (coverInputRef.value) coverInputRef.value.value = '';
}
const coverDisplayUrl = computed(() => {
    if (form.remove_cover_image) return null;
    return coverPreview.value ?? currentCoverUrl;
});

onBeforeUnmount(() => {
    if (coverPreview.value) URL.revokeObjectURL(coverPreview.value);
    imagePreviews.value.forEach(url => URL.revokeObjectURL(url));
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Gallery Page', href: '/admin/gallery-page' },
    { title: 'Albums', href: '/admin/galleries' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Album" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/galleries">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Edit Album</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ gallery.title }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <ImageIcon class="h-3.5 w-3.5" />{{ gallery.images?.length ?? 0 }} images
                </div>
            </div>

            <!-- Tabs -->
            <div class="border-b border-gray-200">
                <nav class="flex gap-4" aria-label="Tabs">
                    <button
                        @click="activeTab = 'details'"
                        :class="[
                            'flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'details'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        <Settings class="h-4 w-4" />
                        Album Details
                    </button>
                    <button
                        @click="activeTab = 'images'"
                        :class="[
                            'flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'images'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        ]"
                    >
                        <Images class="h-4 w-4" />
                        Album Images
                        <Badge variant="secondary" class="ml-1">{{ gallery.images?.length ?? 0 }}</Badge>
                    </button>
                </nav>
            </div>

            <!-- Tab: Album Details (unchanged) -->
            <div v-show="activeTab === 'details'">
                <Card class="border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-5 py-4">
                        <CardTitle class="text-sm font-semibold">Album Details</CardTitle>
                        <CardDescription class="text-xs">Update album information and cover image.</CardDescription>
                    </CardHeader>
                    <CardContent class="px-5 py-5">
                        <form class="flex flex-col gap-5" @submit.prevent="form.put(`/admin/galleries/${gallery.id}`, { forceFormData: true })">
                            <!-- Title -->
                            <div class="flex flex-col gap-1.5">
                                <Label for="title" class="text-xs font-medium">Title *</Label>
                                <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="Album title" />
                                <InputError :message="form.errors.title" />
                            </div>
                            <!-- Slug -->
                            <div class="flex flex-col gap-1.5">
                                <Label for="slug" class="text-xs font-medium">Slug</Label>
                                <Input id="slug" v-model="form.slug" class="h-9 text-sm" placeholder="auto-generated from title" />
                                <p class="text-xs text-gray-500">Auto-generated from title. You can edit it if needed.</p>
                                <InputError :message="form.errors.slug" />
                            </div>
                            <!-- Description -->
                            <div class="flex flex-col gap-1.5">
                                <Label for="description" class="text-xs font-medium">Description</Label>
                                <textarea id="description" v-model="form.description" rows="3" class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm" placeholder="Brief description..." />
                                <InputError :message="form.errors.description" />
                            </div>
                            <!-- Cover image -->
                            <div class="flex flex-col gap-1.5">
                                <Label class="text-xs font-medium">Cover Image</Label>
                                <div class="flex flex-wrap gap-3">
                                    <div v-if="coverDisplayUrl" class="relative">
                                        <img :src="coverDisplayUrl" alt="Cover" class="h-24 w-40 rounded-lg border border-gray-200 object-cover" />
                                        <button type="button" @click="removeCoverImage" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                            <X class="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div v-else class="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                        <ImageIcon class="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <input ref="coverInputRef" type="file" accept="image/*" class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90" @change="onCoverImageChange" />
                                <p class="text-xs text-gray-500">Leave empty to keep current cover, or click the X to remove it.</p>
                                <InputError :message="form.errors.cover_image" />
                            </div>
                            <div class="flex justify-end border-t border-gray-200 pt-4">
                                <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                    <Save class="h-3.5 w-3.5" /> {{ form.processing ? 'Saving...' : 'Save Album' }}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <!-- Tab: Album Images (with multi‑upload) -->
            <div v-show="activeTab === 'images'">
                <Card class="border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-5 py-4">
                        <CardTitle class="text-sm font-semibold">Album Images</CardTitle>
                        <CardDescription class="text-xs">Select multiple images at once, preview before upload, reorder with arrows, or remove.</CardDescription>
                    </CardHeader>
                    <CardContent class="px-5 py-5">
                        <!-- Multi‑image upload form -->
                        <form class="flex flex-wrap items-end gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4" @submit.prevent="submitAddImages">
                            <div class="flex-1 min-w-[200px]">
                                <Label for="add_image" class="text-xs font-medium">Image files *</Label>
                                <input
                                    ref="addImageInputRef"
                                    id="add_image"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    required
                                    class="block w-full cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                    @change="onAddImageChange"
                                />
                                <InputError :message="addImageForm.errors.images" />
                            </div>
                            <div class="w-48">
                                <Label for="add_caption" class="text-xs font-medium">Caption (optional)</Label>
                                <Input id="add_caption" v-model="addImageForm.caption" class="h-9 text-sm" placeholder="Same caption for all" />
                            </div>
                            <div class="w-28">
                                <Label for="add_order" class="text-xs font-medium">Start order</Label>
                                <Input id="add_order" v-model.number="addImageForm.startOrder" type="number" min="0" class="h-9 text-sm" />
                            </div>
                            <Button type="submit" :disabled="isUploading" size="sm" class="h-9 gap-1">
                                <Plus class="h-3.5 w-3.5" /> {{ isUploading ? 'Uploading...' : 'Add Images' }}
                            </Button>
                        </form>

                        <!-- Preview of selected images -->
                        <div v-if="imagePreviews.length" class="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            <div v-for="(preview, idx) in imagePreviews" :key="idx" class="relative">
                                <img :src="preview" alt="Preview" class="h-24 w-full rounded object-cover border" />
                                <button
                                    type="button"
                                    @click="() => {
                                        // Remove this specific preview and its file
                                        URL.revokeObjectURL(preview);
                                        imagePreviews.splice(idx, 1);
                                        addImageForm.images.splice(idx, 1);
                                    }"
                                    class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white"
                                >
                                    <X class="h-3 w-3" />
                                </button>
                            </div>
                        </div>

                        <!-- Existing images grid (same as before) -->
                        <div v-if="gallery.images?.length" class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div v-for="(img, idx) in gallery.images" :key="img.id" class="relative rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                                <img :src="img.image_url" alt="" class="h-32 w-full rounded object-cover" />
                                <div class="mt-2">
                                    <p class="text-sm font-medium truncate">{{ img.caption || 'Untitled' }}</p>
                                    <div class="mt-1 flex items-center justify-between">
                                        <Badge variant="outline" class="text-[10px]">Order: {{ img.order }}</Badge>
                                        <div class="flex gap-1">
                                            <button type="button" @click="moveImageUp(img, idx)" :disabled="idx === 0" class="p-1 text-gray-500 hover:text-primary disabled:opacity-30">
                                                <ArrowUp class="h-3.5 w-3.5" />
                                            </button>
                                            <button type="button" @click="moveImageDown(img, idx)" :disabled="idx === gallery.images.length - 1" class="p-1 text-gray-500 hover:text-primary disabled:opacity-30">
                                                <ArrowDown class="h-3.5 w-3.5" />
                                            </button>
                                            <button type="button" @click="removeImage(img.id)" class="p-1 text-gray-500 hover:text-destructive">
                                                <Trash2 class="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="mt-5 py-8 text-center text-sm text-gray-500">
                            No images yet. Add one above.
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    </AppLayout>
</template>

<style scoped>
/* optional */
</style>
