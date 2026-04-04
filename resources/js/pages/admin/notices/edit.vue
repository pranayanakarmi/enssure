<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { Trash2 } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import CopyablePublicUrl from '@/components/CopyablePublicUrl.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNoticePublicUrl } from '@/composables/useNoticePublicUrl';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    notice: {
        type: Object,
        required: true,
    },
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

const imagePreviewUrl = ref(null);

function onImageChange(event) {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.image = file;
    form.remove_image = false;
    if (file) {
        imagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
    }
});

const imageDisplayUrl = computed(() => {
    if (form.remove_image) return null;
    return imagePreviewUrl.value ?? props.notice.image_url;
});

const removeImageInputRef = ref(null);

function removeImage() {
    form.remove_image = true;
    form.image = null;
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    if (removeImageInputRef.value) {
        removeImageInputRef.value.value = '';
    }
}

const breadcrumbItems = [
    { title: 'Notices', href: '/admin/notices' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit notice" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit notice"
                    :description="notice.title"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/notices/${notice.id}`, { forceFormData: true })"
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
                        />
                        <InputError :message="form.errors.slug" />
                    </div>
                    <CopyablePublicUrl :url="publicNoticeUrl" />
                    <div class="grid gap-2">
                        <Label for="image">Featured image</Label>
                        <div
                            v-if="imageDisplayUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="imageDisplayUrl"
                                alt="Preview"
                                class="h-32 w-40 shrink-0 rounded border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Current or chosen image. Select a new file to replace, or remove it.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="removeImage"
                                >
                                    <Trash2 class="size-3.5" />
                                    Remove image
                                </button>
                            </div>
                        </div>
                        <div class="max-w-md">
                            <input
                                ref="removeImageInputRef"
                                id="image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="content">Content</Label>
                        <RichTextEditor
                            id="content"
                            v-model="form.content"
                            placeholder="Enter notice content..."
                        />
                        <InputError :message="form.errors.content" />
                    </div>
                    <div class="flex items-center gap-2">
                        <input
                            id="is_featured"
                            v-model="form.is_featured"
                            type="checkbox"
                            class="rounded border-sidebar-border"
                        />
                        <Label for="is_featured">Featured</Label>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/notices">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
