<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
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
    person_name: props.impactStory.person_name ?? '',
    person_title: props.impactStory.person_title ?? '',
    location: props.impactStory.location ?? '',
    story: props.impactStory.story ?? '',
    image: props.impactStory.image ?? '',
    video_url: props.impactStory.video_url ?? '',
    published_at: props.impactStory.published_at ? props.impactStory.published_at.slice(0, 10) : '',
    order: props.impactStory.order ?? 0,
});

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
                    @submit.prevent="form.put(`/admin/impact_stories/${impactStory.id}`)"
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
                        <Label for="person_name">Person name</Label>
                        <Input
                            id="person_name"
                            v-model="form.person_name"
                            type="text"
                        />
                        <InputError :message="form.errors.person_name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="story">Story</Label>
                        <textarea
                            id="story"
                            v-model="form.story"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <InputError :message="form.errors.story" />
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
