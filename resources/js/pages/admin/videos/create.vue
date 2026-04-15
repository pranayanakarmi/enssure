<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    title: '',
    video_url: '',
    thumbnail: null,      // will hold the uploaded file
    date: '',
    order: 0,
    is_active: true,
    is_hero: false,
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Videos', href: '/admin/videos' },
    { title: 'Create', href: '/admin/videos/create' },
];

function submit() {
    form.transform((data) => ({
        ...data,
        is_active: data.is_active ? '1' : '0',
        is_hero: data.is_hero ? '1' : '0',
    })).post('/admin/videos', {
        forceFormData: true,
    });
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create video" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create video"
                    description="Add a new video to the homepage gallery"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="submit"
                    enctype="multipart/form-data"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title *</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="e.g. Community Empowerment"
                        />
                        <InputError :message="form.errors.title" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="video_url">Video URL *</Label>
                        <Input
                            id="video_url"
                            v-model="form.video_url"
                            type="url"
                            required
                            placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                        />
                        <p class="text-xs text-muted-foreground">
                            YouTube, Vimeo, or direct MP4 link. Thumbnail will be auto‑generated if you don't upload one.
                        </p>
                        <InputError :message="form.errors.video_url" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="thumbnail">Custom Thumbnail (optional)</Label>
                        <Input
                            id="thumbnail"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            @input="form.thumbnail = $event.target.files[0]"
                        />
                        <p class="text-xs text-muted-foreground">
                            Upload a custom thumbnail image. Leave empty to auto‑generate from YouTube/Vimeo.
                        </p>
                        <InputError :message="form.errors.thumbnail" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="date">Date (optional)</Label>
                        <Input
                            id="date"
                            v-model="form.date"
                            type="date"
                        />
                        <InputError :message="form.errors.date" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="order">Order (lower = higher priority)</Label>
                        <Input
                            id="order"
                            v-model="form.order"
                            type="number"
                            placeholder="0"
                        />
                        <InputError :message="form.errors.order" />
                    </div>

                    <div class="flex items-center space-x-2">
                        <Checkbox
                            id="is_active"
                            v-model="form.is_active"
                        />
                        <Label for="is_active">Active (show on homepage)</Label>
                    </div>

                    <div class="flex items-center space-x-2">
                        <Checkbox
                            id="is_hero"
                            v-model="form.is_hero"
                        />
                        <Label for="is_hero">Use as hero modal video</Label>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create video
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/videos">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
