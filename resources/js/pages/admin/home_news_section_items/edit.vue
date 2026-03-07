<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeNewsSectionItem: {
        type: Object,
        required: true,
    },
    section: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.homeNewsSectionItem.title ?? '',
    image: null,
    link_url: props.homeNewsSectionItem.link_url ?? '',
    order: props.homeNewsSectionItem.order ?? 0,
    _method: 'put',
});

function submitForm() {
    form.post(`/admin/home-news-section-items/${props.homeNewsSectionItem.id}`, {
        forceFormData: true,
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'News section', href: '/admin/home-news-section/edit' },
    { title: 'Edit news item', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit news item" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit news item"
                    description="Update title, image and link for this news item."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="submitForm"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Article headline"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image (optional)</Label>
                        <div
                            v-if="homeNewsSectionItem.image_url"
                            class="mb-2"
                        >
                            <img
                                :src="homeNewsSectionItem.image_url"
                                alt="Current"
                                class="h-24 w-auto rounded border object-cover"
                            />
                            <p class="mt-1 text-xs text-muted-foreground">
                                Current image. Choose a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="form.image = $event.target.files?.[0] || null"
                            />
                        </div>
                        <InputError :message="form.errors.image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="link_url">Link URL</Label>
                        <Input
                            id="link_url"
                            v-model="form.link_url"
                            type="text"
                            placeholder="https:// or /path"
                        />
                        <InputError :message="form.errors.link_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="order">Order</Label>
                        <Input
                            id="order"
                            v-model.number="form.order"
                            type="number"
                            min="0"
                        />
                        <InputError :message="form.errors.order" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button
                            type="submit"
                            :disabled="form.processing"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            as-child
                        >
                            <Link href="/admin/home-news-section/edit">Back to News section</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
