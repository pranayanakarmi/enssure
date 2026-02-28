<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link, router } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

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
    event_date: props.gallery.event_date ?? '',
});

function removeImage(imageId) {
    if (confirm('Remove this image?')) {
        router.delete(`/admin/gallery-images/${imageId}`);
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Galleries', href: '/admin/galleries' },
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
                    @submit.prevent="form.put(`/admin/galleries/${gallery.id}`)"
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
                        <Label for="event_date">Event date</Label>
                        <Input
                            id="event_date"
                            v-model="form.event_date"
                            type="date"
                        />
                        <InputError :message="form.errors.event_date" />
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
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save gallery
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/galleries">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Gallery images</span>
                        <p class="text-sm text-muted-foreground">
                            Images in this gallery. Add/remove from a future update.
                        </p>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="img in (gallery.images || [])"
                                :key="img.id"
                                class="flex items-center justify-between gap-4 px-6 py-3"
                            >
                                <span class="truncate text-sm">{{ img.caption || img.image_path || '(No caption)' }}</span>
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
                                class="px-6 py-6 text-center text-sm text-muted-foreground"
                            >
                                No images yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
