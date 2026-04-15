<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X, Type } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import CopyablePublicUrl from '@/components/CopyablePublicUrl.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNoticePublicUrl } from '@/composables/useNoticePublicUrl';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    notice: { type: Object, required: true },
});

const form = useForm({
    title: props.notice.title ?? '',
    slug: props.notice.slug ?? '',
    content: props.notice.content ?? '',
    image: null,
    remove_image: false,
    attachment: props.notice.attachment ?? '',
    is_featured: props.notice.is_featured ?? false,
});

const { publicNoticeUrl } = useNoticePublicUrl(form);

const imagePreview = ref(null);
const currentImageUrl = props.notice.image_url ?? null;
const imageInputRef = ref(null);

function onImageChange(e) {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    const file = e.target.files?.[0] || null;
    form.image = file;
    form.remove_image = false;
    if (file) imagePreview.value = URL.createObjectURL(file);
    else imagePreview.value = null;
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.image = null;
    form.remove_image = true;
    if (imageInputRef.value) imageInputRef.value.value = '';
}
const displayImageUrl = computed(() => {
    if (form.remove_image) return null;
    return imagePreview.value ?? currentImageUrl;
});

onBeforeUnmount(() => {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
});

function submitForm() {
    form.put(`/admin/notices/${props.notice.id}`, { forceFormData: true });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Notices', href: '/admin/notices' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Notice" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/notices">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Edit Notice</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ notice.title }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Type class="h-3.5 w-3.5" />Edit Notice
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Notice Details</CardTitle>
                    <CardDescription class="text-xs">Update the notice information.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title *</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="Notice title" />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Slug -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="slug" class="text-xs font-medium">Slug</Label>
                            <Input id="slug" v-model="form.slug" class="h-9 text-sm" placeholder="auto-generated from title" />
                            <p class="text-xs text-gray-500">Leave empty to auto-generate from the title.</p>
                            <InputError :message="form.errors.slug" />
                        </div>

                        <!-- Featured image -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Featured Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="displayImageUrl" class="relative">
                                    <img :src="displayImageUrl" alt="Preview" class="h-32 w-48 rounded-lg border border-gray-200 object-cover" />
                                    <button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-else class="flex h-32 w-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                ref="imageInputRef"
                                type="file"
                                accept="image/*"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                            <p class="text-xs text-gray-500">Leave empty to keep current image, or click the X to remove it.</p>
                            <InputError :message="form.errors.image" />
                        </div>

                        <!-- Content (rich text) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="content" class="text-xs font-medium">Content</Label>
                            <RichTextEditor id="content" v-model="form.content" placeholder="Enter notice content..." />
                            <InputError :message="form.errors.content" />
                        </div>

                        <!-- Featured checkbox -->
                        <div class="flex items-center gap-2">
                            <input
                                id="is_featured"
                                v-model="form.is_featured"
                                type="checkbox"
                                class="rounded border-gray-300 h-4 w-4"
                            />
                            <Label for="is_featured" class="text-xs font-medium">Featured</Label>
                        </div>

                        <!-- Public URL (minimised space, at the bottom) -->
                        <div class="mt-2 pt-1 border-t border-gray-100">
                            <CopyablePublicUrl :url="publicNoticeUrl" />
                        </div>

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Saving…' : 'Save Changes' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
