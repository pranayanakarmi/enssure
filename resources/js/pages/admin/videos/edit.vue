<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    video: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.video.title,
    video_url: props.video.video_url,
    thumbnail: null,           // new file if uploaded
    date: props.video.date,
    order: props.video.order,
    is_active: props.video.is_active,
});

const existingThumbnail = ref(props.video.thumbnail);
const previewUrl = ref(props.video.thumbnail);

function onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        form.thumbnail = file;
        // Create local preview
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        form.thumbnail = null;
        previewUrl.value = existingThumbnail.value;
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Videos', href: '/admin/videos' },
    { title: 'Edit', href: `/admin/videos/${props.video.id}/edit` },
];

function submit() {
    form.put(`/admin/videos/${props.video.id}`);
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit video" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit video"
                    description="Update video details"
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
                        />
                        <InputError :message="form.errors.video_url" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="thumbnail">Custom Thumbnail (optional)</Label>
                        <Input
                            id="thumbnail"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            @input="onFileChange"
                        />
                        <p class="text-xs text-muted-foreground">
                            Upload a new image to replace the current thumbnail. Leave empty to keep existing.
                        </p>
                        <InputError :message="form.errors.thumbnail" />
                        <div v-if="previewUrl" class="mt-2">
                            <p class="text-sm text-muted-foreground">Thumbnail preview:</p>
                            <img :src="previewUrl" class="h-20 w-auto rounded border mt-1 object-cover" />
                        </div>
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
                        />
                        <InputError :message="form.errors.order" />
                    </div>

                    <div class="flex items-center space-x-2">
                        <Checkbox
                            id="is_active"
                            v-model:checked="form.is_active"
                        />
                        <Label for="is_active">Active (show on homepage)</Label>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Update video
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
