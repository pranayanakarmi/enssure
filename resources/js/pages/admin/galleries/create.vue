<script setup>
import { ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
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

const form = useForm({
    title: '',
    slug: '',
    description: '',
    cover_image: null,
});

watch(
    () => form.title,
    (title) => {
        form.slug = slugify(title);
    },
);

const coverImageInputRef = ref(null);

function onCoverImageChange(event) {
    form.cover_image = event.target.files?.[0] || null;
}

const breadcrumbItems = [
    { title: 'Gallery Page', href: '#' },
    { title: 'Albums', href: '/admin/galleries' },
    { title: 'Create', href: '/admin/galleries/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create album" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create album"
                    description="Add a new gallery album with title and cover image."
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/galleries', { forceFormData: true })"
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
                        <Label for="cover_image">Album cover image</Label>
                        <input
                            ref="coverImageInputRef"
                            id="cover_image"
                            type="file"
                            accept="image/*"
                            class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                            @change="onCoverImageChange"
                        />
                        <InputError :message="form.errors.cover_image" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create album
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/galleries">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
