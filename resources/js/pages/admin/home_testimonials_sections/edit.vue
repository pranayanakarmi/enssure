<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X, Tag } from 'lucide-vue-next';
import { computed, ref, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeTestimonialsSection: { type: Object, default: null },
});

const section = computed(() => props.homeTestimonialsSection ?? {
    id: null,
    badge_text: '',
    title: '',
    background_image_url: null,
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    background_image: null,
    _method: 'put',
});

const bgPreview = ref(null);
const currentBgUrl = section.value.background_image_url ?? null;

function onBgImageChange(e) {
    if (bgPreview.value) URL.revokeObjectURL(bgPreview.value);
    const file = e.target.files?.[0] || null;
    form.background_image = file;
    if (file) bgPreview.value = URL.createObjectURL(file);
}
function clearBgPreview() {
    if (bgPreview.value) URL.revokeObjectURL(bgPreview.value);
    bgPreview.value = null;
    form.background_image = null;
    const el = document.getElementById('background_image');
    if (el) el.value = '';
}

onBeforeUnmount(() => {
    if (bgPreview.value) URL.revokeObjectURL(bgPreview.value);
});

function submitForm() {
    form.post('/admin/home-testimonials-section', {
        forceFormData: true,
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Testimonials Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Testimonials Section" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Testimonials Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge, title and background image for the testimonials block.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Tag class="h-3.5 w-3.5" />Section Header
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Section Content</CardTitle>
                    <CardDescription class="text-xs">Update the badge text, title, and background image.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Badge text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="badge_text" class="text-xs font-medium flex items-center gap-1.5">
                                <Tag class="h-3 w-3" />Badge Text
                            </Label>
                            <Input id="badge_text" v-model="form.badge_text" class="h-9 text-sm" placeholder="e.g. Testimonials" />
                            <InputError :message="form.errors.badge_text" />
                        </div>

                        <!-- Title (textarea) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title</Label>
                            <textarea
                                id="title"
                                v-model="form.title"
                                rows="3"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Section title (e.g. Direct testimonials that showcase...)"
                            />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Background image -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Background Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="currentBgUrl && !bgPreview" class="relative">
                                    <img :src="currentBgUrl" alt="Current background" class="h-32 w-48 rounded-lg border border-gray-200 object-cover" />
                                    <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                                </div>
                                <div v-if="bgPreview" class="relative">
                                    <img :src="bgPreview" alt="Preview" class="h-32 w-48 rounded-lg border border-gray-200 object-cover ring-2 ring-primary" />
                                    <button type="button" @click="clearBgPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-if="!currentBgUrl && !bgPreview" class="flex h-32 w-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
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
                            <p class="text-xs text-gray-500">Leave empty to keep current image. Recommended size: 1920×1080px.</p>
                            <InputError :message="form.errors.background_image" />
                        </div>

                        <!-- Form actions -->
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
