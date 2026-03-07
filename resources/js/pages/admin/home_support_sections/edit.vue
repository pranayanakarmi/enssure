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
    homeSupportSection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.homeSupportSection ?? {
    id: null,
    badge_text: '',
    title: '',
    image_url: null,
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    image: null,
    _method: 'put',
});

function submitForm() {
    form.post('/admin/home-support-section', {
        forceFormData: true,
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin' },
    { title: 'Support section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Support section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Support section"
                    description="Edit the badge, title and image shown in the Support block on the home page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="submitForm"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Support"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <textarea
                            id="title"
                            v-model="form.title"
                            rows="3"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. Technical Assistance By"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image</Label>
                        <div
                            v-if="section.image_url"
                            class="mb-2"
                        >
                            <img
                                :src="section.image_url"
                                alt="Current support image"
                                class="h-24 w-auto rounded border object-contain bg-white"
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
                        <p class="text-xs text-muted-foreground">
                            Upload an image (max 2 MB). Shown below the title in the Support section.
                        </p>
                        <InputError :message="form.errors.image" />
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
