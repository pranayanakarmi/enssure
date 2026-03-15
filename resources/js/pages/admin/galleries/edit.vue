<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Head, Link, router } from '@inertiajs/vue3';
import { Trash2 } from 'lucide-vue-next';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    gallery: {
        type: Object,
        required: true,
    },
});

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
        form.slug = slugify(title);
    },
);

const addImageForm = useForm({
    image: null,
    caption: '',
    order: (props.gallery.images?.length ?? 0),
});

const coverImagePreviewUrl = ref(null);
const coverImageInputRef = ref(null);

function onCoverImageChange(event) {
    const file = event.target.files?.[0] || null;
    form.cover_image = file;
    form.remove_cover_image = false;
    if (coverImagePreviewUrl.value) {
        URL.revokeObjectURL(coverImagePreviewUrl.value);
        coverImagePreviewUrl.value = null;
    }
    if (file) {
        coverImagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (coverImagePreviewUrl.value) {
        URL.revokeObjectURL(coverImagePreviewUrl.value);
    }
});

const coverImageDisplayUrl = computed(() => {
    if (form.remove_cover_image) return null;
    return coverImagePreviewUrl.value ?? props.gallery.cover_image_url;
});

function removeCoverImage() {
    form.remove_cover_image = true;
    form.cover_image = null;
    if (coverImagePreviewUrl.value) {
        URL.revokeObjectURL(coverImagePreviewUrl.value);
        coverImagePreviewUrl.value = null;
    }
    if (coverImageInputRef.value) {
        coverImageInputRef.value.value = '';
    }
}

function removeImage(imageId) {
    if (confirm('Remove this image?')) {
        router.delete(`/admin/gallery-images/${imageId}`);
    }
}

function onAddImageFileChange(event) {
    addImageForm.image = event.target.files?.[0] || null;
}

const addImageInputRef = ref(null);

function submitAddImage() {
    addImageForm.post(`/admin/galleries/${props.gallery.id}/images`, {
        forceFormData: true,
        onSuccess: () => {
            addImageForm.caption = '';
            addImageForm.image = null;
            addImageForm.order = (props.gallery.images?.length ?? 0) + 1;
            if (addImageInputRef.value) {
                addImageInputRef.value.value = '';
            }
        },
    });
}

const breadcrumbItems = [
    { title: 'Gallery Page', href: '#' },
    { title: 'Albums', href: '/admin/galleries' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit gallery" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit gallery"
                    :description="gallery.title"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/galleries/${gallery.id}`, { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="slug">Slug</Label>
                        <Input
                            id="slug"
                            v-model="form.slug"
                            type="text"
                            placeholder="Auto-generated from title (editable)"
                        />
                        <p class="text-xs text-muted-foreground">
                            Generated from title. You can edit it if needed.
                        </p>
                        <InputError :message="form.errors.slug" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="3"
                            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label>Album cover image</Label>
                        <div
                            v-if="coverImageDisplayUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="coverImageDisplayUrl"
                                alt="Cover preview"
                                class="h-32 w-40 shrink-0 rounded border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Current or chosen image. Select a new file to replace, or remove it.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="removeCoverImage"
                                >
                                    <Trash2 class="size-3.5" />
                                    Remove cover
                                </button>
                            </div>
                        </div>
                        <input
                            ref="coverImageInputRef"
                            type="file"
                            accept="image/*"
                            class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                            @change="onCoverImageChange"
                        />
                        <InputError :message="form.errors.cover_image" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save album
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/galleries">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Album images</span>
                        <p class="text-sm text-muted-foreground">
                            Add images to this album. Order determines display order.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-4 p-6">
                        <form
                            class="flex flex-wrap items-end gap-4 rounded-md border border-sidebar-border bg-muted/20 p-4"
                            @submit.prevent="submitAddImage"
                        >
                            <div class="grid min-w-0 flex-1 gap-2">
                                <Label for="add_image">Image file</Label>
                                <input
                                    ref="addImageInputRef"
                                    id="add_image"
                                    type="file"
                                    accept="image/*"
                                    required
                                    class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                    @change="onAddImageFileChange"
                                />
                                <InputError :message="addImageForm.errors.image" />
                            </div>
                            <div class="grid w-48 gap-2">
                                <Label for="add_caption">Caption</Label>
                                <Input
                                    id="add_caption"
                                    v-model="addImageForm.caption"
                                    type="text"
                                    placeholder="Optional caption"
                                />
                            </div>
                            <div class="grid w-24 gap-2">
                                <Label for="add_order">Order</Label>
                                <Input
                                    id="add_order"
                                    v-model.number="addImageForm.order"
                                    type="number"
                                    min="0"
                                />
                            </div>
                            <Button
                                type="submit"
                                :disabled="addImageForm.processing"
                            >
                                Add image
                            </Button>
                        </form>
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="img in (gallery.images || [])"
                                :key="img.id"
                                class="flex items-center justify-between gap-4 px-2 py-3"
                            >
                                <div class="flex min-w-0 items-center gap-3">
                                    <img
                                        v-if="img.image_url"
                                        :src="img.image_url"
                                        alt=""
                                        class="h-14 w-14 shrink-0 rounded border object-cover"
                                    />
                                    <span class="truncate text-sm">{{ img.caption || '(No caption)' }}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="button"
                                    @click="removeImage(img.id)"
                                >
                                    Remove
                                </Button>
                            </div>
                            <div
                                v-if="!(gallery.images || []).length"
                                class="px-2 py-6 text-center text-sm text-muted-foreground"
                            >
                                No images yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
