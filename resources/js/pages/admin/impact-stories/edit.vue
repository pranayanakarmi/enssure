<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { Trash2 } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    impactStory: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.impactStory.title ?? '',
    slug: props.impactStory.slug ?? '',
    person_title: props.impactStory.person_title ?? '',
    location: props.impactStory.location ?? '',
    story: props.impactStory.story ?? '',
    image: null,
    remove_image: false,
    video_url: props.impactStory.video_url ?? '',
});

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
    return imagePreviewUrl.value ?? props.impactStory.image_url;
});

const imageInputRef = ref(null);

function removeImage() {
    form.remove_image = true;
    form.image = null;
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    if (imageInputRef.value) {
        imageInputRef.value.value = '';
    }
}

const breadcrumbItems = [
    { title: 'Impact Stories', href: '/admin/impact_stories' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit impact story" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit impact story"
                    :description="impactStory.title"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/impact_stories/${impactStory.id}`, { forceFormData: true })"
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
                                ref="imageInputRef"
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
                        <Label for="story">Content</Label>
                        <RichTextEditor
                            id="story"
                            v-model="form.story"
                            placeholder="Enter story content..."
                        />
                        <InputError :message="form.errors.story" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/impact_stories">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
