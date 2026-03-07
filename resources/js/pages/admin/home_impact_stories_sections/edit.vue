<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeImpactStoriesSection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.homeImpactStoriesSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    cta_text: '',
    cta_url: '',
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin' },
    { title: 'Impact Stories section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Impact Stories section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Impact Stories section"
                    description="Edit the badge, title, description and CTA shown on the home page impact stories block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/home-impact-stories-section')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Impact Stories"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Transforming Skills, Changing Lives"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Section description..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_text">CTA button text</Label>
                        <Input
                            id="cta_text"
                            v-model="form.cta_text"
                            type="text"
                            placeholder="e.g. View all stories"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /impact-stories"
                        />
                        <InputError :message="form.errors.cta_url" />
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
                            <Link href="/admin">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
