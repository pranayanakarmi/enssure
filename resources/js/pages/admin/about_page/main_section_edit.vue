<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X, Type } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    aboutMainSection: { type: Object, default: null },
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
    _method: 'put',
});

// Content image
const contentPreview = ref(null);
const currentContentUrl = section.value.content_image_url ?? null;
function onContentImageChange(e) {
    if (contentPreview.value) URL.revokeObjectURL(contentPreview.value);
    const file = e.target.files?.[0] || null;
    form.content_image = file;
    if (file) contentPreview.value = URL.createObjectURL(file);
    else contentPreview.value = null;
}
function clearContentPreview() {
    if (contentPreview.value) URL.revokeObjectURL(contentPreview.value);
    contentPreview.value = null;
    form.content_image = null;
    const el = document.getElementById('content_image');
    if (el) el.value = '';
}
const contentDisplayUrl = computed(() => contentPreview.value ?? currentContentUrl);

// Background image
const bgPreview = ref(null);
const currentBgUrl = section.value.background_image_url ?? null;
function onBgImageChange(e) {
    if (bgPreview.value) URL.revokeObjectURL(bgPreview.value);
    const file = e.target.files?.[0] || null;
    form.background_image = file;
    if (file) bgPreview.value = URL.createObjectURL(file);
    else bgPreview.value = null;
}
function clearBgPreview() {
    if (bgPreview.value) URL.revokeObjectURL(bgPreview.value);
    bgPreview.value = null;
    form.background_image = null;
    const el = document.getElementById('background_image');
    if (el) el.value = '';
}
const bgDisplayUrl = computed(() => bgPreview.value ?? currentBgUrl);

onBeforeUnmount(() => {
    if (contentPreview.value) URL.revokeObjectURL(contentPreview.value);
    if (bgPreview.value) URL.revokeObjectURL(bgPreview.value);
});

function submitForm() {
    form.put('/admin/about-page/main-section', { forceFormData: true });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'About Page', href: '/admin/about-page' },
    { title: 'Main Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="About Page – Main Section" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/about-page">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">About Page – Main Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit the main content block, images, and CTA.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Type class="h-3.5 w-3.5" />Main Content
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Section Content</CardTitle>
                    <CardDescription class="text-xs">Update the title, body, images, card overlay and CTA.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="e.g. Enhanced Skills for Sustainable Employment" />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Body (rich text) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="body" class="text-xs font-medium">Body (Rich Text)</Label>
                            <RichTextEditor id="body" v-model="form.body" placeholder="Enter body content..." />
                            <InputError :message="form.errors.body" />
                        </div>

                        <!-- Card overlay text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="card_title" class="text-xs font-medium">Card Overlay Text</Label>
                            <Input id="card_title" v-model="form.card_title" class="h-9 text-sm" placeholder="e.g. Skill Upgrading Training for Workers" />
                            <InputError :message="form.errors.card_title" />
                        </div>

                        <!-- Images (two columns) -->
                        <div class="grid gap-5 sm:grid-cols-2">
                            <!-- Content image -->
                            <div class="flex flex-col gap-1.5">
                                <Label class="text-xs font-medium">Content Image (left column)</Label>
                                <div class="relative">
                                    <div v-if="contentDisplayUrl" class="relative inline-block">
                                        <img :src="contentDisplayUrl" alt="Content preview" class="h-32 w-40 rounded-lg border border-gray-200 object-cover" />
                                        <button type="button" @click="clearContentPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                            <X class="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div v-else class="flex h-32 w-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                        <ImageIcon class="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <input
                                    id="content_image"
                                    type="file"
                                    accept="image/*"
                                    class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                    @change="onContentImageChange"
                                />
                                <InputError :message="form.errors.content_image" />
                            </div>

                            <!-- Background image -->
                            <div class="flex flex-col gap-1.5">
                                <Label class="text-xs font-medium">Background Image</Label>
                                <div class="relative">
                                    <div v-if="bgDisplayUrl" class="relative inline-block">
                                        <img :src="bgDisplayUrl" alt="Background preview" class="h-32 w-40 rounded-lg border border-gray-200 object-cover" />
                                        <button type="button" @click="clearBgPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                            <X class="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div v-else class="flex h-32 w-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                        <ImageIcon class="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <input
                                    id="background_image"
                                    type="file"
                                    accept="image/*"
                                    class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                    @change="onBgImageChange"
                                />
                                <InputError :message="form.errors.background_image" />
                            </div>
                        </div>

                        <!-- CTA (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_text" class="text-xs font-medium">CTA Text</Label>
                                <Input id="cta_text" v-model="form.cta_text" class="h-9 text-sm" placeholder="e.g. Explore more" />
                                <InputError :message="form.errors.cta_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_url" class="text-xs font-medium">CTA URL</Label>
                                <Input id="cta_url" v-model="form.cta_url" class="h-9 text-sm" placeholder="https:// or /path" />
                                <InputError :message="form.errors.cta_url" />
                            </div>
                        </div>

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Saving…' : 'Save Changes' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
