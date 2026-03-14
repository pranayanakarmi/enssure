<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    aboutMainSection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.aboutMainSection ?? {
    id: null,
    title: '',
    body: '',
    card_title: '',
    content_image_url: null,
    background_image_url: null,
    cta_text: '',
    cta_url: '',
});

const form = useForm({
    title: section.value.title ?? '',
    body: section.value.body ?? '',
    card_title: section.value.card_title ?? '',
    content_image: null,
    background_image: null,
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
});

const contentImagePreviewUrl = ref(null);
const backgroundImagePreviewUrl = ref(null);

function onContentImageChange(event) {
    if (contentImagePreviewUrl.value) {
        URL.revokeObjectURL(contentImagePreviewUrl.value);
        contentImagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.content_image = file;
    if (file) {
        contentImagePreviewUrl.value = URL.createObjectURL(file);
    }
}

function onBackgroundImageChange(event) {
    if (backgroundImagePreviewUrl.value) {
        URL.revokeObjectURL(backgroundImagePreviewUrl.value);
        backgroundImagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.background_image = file;
    if (file) {
        backgroundImagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (contentImagePreviewUrl.value) {
        URL.revokeObjectURL(contentImagePreviewUrl.value);
    }
    if (backgroundImagePreviewUrl.value) {
        URL.revokeObjectURL(backgroundImagePreviewUrl.value);
    }
});

const contentImageDisplayUrl = computed(() =>
    contentImagePreviewUrl.value ?? section.value.content_image_url,
);
const backgroundImageDisplayUrl = computed(() =>
    backgroundImagePreviewUrl.value ?? section.value.background_image_url,
);

const breadcrumbItems = [
    { title: 'About Page', href: '#' },
    { title: 'Main section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit About Page Main Section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="About Page Main Section"
                    description="Edit the main about block: title, body, images, card overlay and CTA on the About page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/about-page/main-section', { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="body">Body (rich text)</Label>
                        <RichTextEditor
                            id="body"
                            v-model="form.body"
                            placeholder="Enter body content..."
                        />
                        <InputError :message="form.errors.body" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="card_title">Card overlay text</Label>
                        <Input
                            id="card_title"
                            v-model="form.card_title"
                            type="text"
                            placeholder="e.g. Skill Upgrading Training for Workers"
                        />
                        <InputError :message="form.errors.card_title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="content_image">Content image (left column)</Label>
                        <div
                            v-if="contentImageDisplayUrl"
                            class="mb-3 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                        >
                            <img
                                :src="contentImageDisplayUrl"
                                alt="Content preview"
                                class="h-32 w-40 rounded border object-cover"
                            />
                            <p class="text-xs text-muted-foreground">
                                Current or chosen image. Select a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="content_image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onContentImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.content_image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="background_image">Background image</Label>
                        <div
                            v-if="backgroundImageDisplayUrl"
                            class="mb-3 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                        >
                            <img
                                :src="backgroundImageDisplayUrl"
                                alt="Background preview"
                                class="h-24 w-40 rounded border object-cover"
                            />
                            <p class="text-xs text-muted-foreground">
                                Current or chosen image. Select a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="background_image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onBackgroundImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.background_image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_text">CTA text</Label>
                        <Input
                            id="cta_text"
                            v-model="form.cta_text"
                            type="text"
                            placeholder="e.g. Explore more"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="https:// or /path or #"
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
