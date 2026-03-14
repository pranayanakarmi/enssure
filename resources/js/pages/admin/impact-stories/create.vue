<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    title: '',
    slug: '',
    person_title: '',
    location: '',
    story: '',
    image: null,
    video_url: '',
});

const imagePreviewUrl = ref(null);

function onImageChange(event) {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.image = file;
    if (file) {
        imagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
    }
});

const breadcrumbItems = [
    { title: 'Impact Stories', href: '/admin/impact_stories' },
    { title: 'Create', href: '/admin/impact_stories/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create impact story" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create impact story"
                    description="Add a new impact story with title, slug, featured image and rich text content."
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/impact_stories', { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="e.g. Story of Engineer from a remote village"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="slug">Slug</Label>
                        <Input
                            id="slug"
                            v-model="form.slug"
                            type="text"
                            placeholder="Auto-generated from title if empty"
                        />
                        <InputError :message="form.errors.slug" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Featured image</Label>
                        <div
                            v-if="imagePreviewUrl"
                            class="mb-3 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                        >
                            <img
                                :src="imagePreviewUrl"
                                alt="Preview"
                                class="h-32 w-40 rounded border object-cover"
                            />
                        </div>
                        <div class="max-w-md">
                            <input
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
                            Create
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/impact_stories">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
