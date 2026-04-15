<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X } from 'lucide-vue-next';
import { ref, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    sliderItem: { type: Object, required: true },
    slider: { type: Object, required: true },
});

const form = useForm({
    title: props.sliderItem.title ?? '',
    subtitle: props.sliderItem.subtitle ?? '',
    description: props.sliderItem.description ?? '',
    image: null,
    link_url: props.sliderItem.link_url ?? '',
    link_text: props.sliderItem.link_text ?? '',
    order: props.sliderItem.order ?? 0,
    _method: 'put',
});

const previewUrl = ref(null);
const currentImageUrl = props.sliderItem.image_url ?? null;

function onImageChange(e) {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    const file = e.target.files?.[0] || null;
    form.image = file;
    if (file) previewUrl.value = URL.createObjectURL(file);
}

function clearPreview() {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
    form.image = null;
    const input = document.getElementById('image');
    if (input) input.value = '';
}

onBeforeUnmount(() => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Sliders', href: '/admin/sliders' },
    { title: props.slider.name, href: `/admin/sliders/${props.slider.id}/edit` },
    { title: 'Edit Slide', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Slide" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link :href="`/admin/sliders/${slider.id}/edit`">
                            <ArrowLeft class="h-3.5 w-3.5" />
                            Back to Slider
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Edit Slide</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ slider.name }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <ImageIcon class="h-3.5 w-3.5" />
                    Slide #{{ sliderItem.order }}
                </div>
            </div>

            <!-- Edit form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Slide Details</CardTitle>
                    <CardDescription class="text-xs">Update the content and image of this slide.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post(`/admin/slider-items/${sliderItem.id}`, { forceFormData: true })">

                        <!-- Title & Subtitle (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="title" class="text-xs font-medium">Title</Label>
                                <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="Slide headline" />
                                <InputError :message="form.errors.title" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="subtitle" class="text-xs font-medium">Subtitle</Label>
                                <Input id="subtitle" v-model="form.subtitle" class="h-9 text-sm" placeholder="Supporting line" />
                                <InputError :message="form.errors.subtitle" />
                            </div>
                        </div>

                        <!-- Description
                        <div class="flex flex-col gap-1.5">
                            <Label for="description" class="text-xs font-medium">Description</Label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="4"
                                class="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Detailed description…"
                            />
                            <InputError :message="form.errors.description" />
                        </div> -->

                        <!-- Image upload with preview -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <!-- Current image -->
                                <div v-if="currentImageUrl && !previewUrl" class="relative">
                                    <img :src="currentImageUrl" alt="Current" class="h-24 w-40 rounded-lg border border-gray-200 object-cover shadow-sm" />
                                    <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                                </div>
                                <!-- New preview -->
                                <div v-if="previewUrl" class="relative">
                                    <img :src="previewUrl" alt="New preview" class="h-24 w-40 rounded-lg border border-gray-200 object-cover shadow-sm ring-2 ring-primary" />
                                    <button type="button" @click="clearPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <!-- Placeholder -->
                                <div v-if="!currentImageUrl && !previewUrl" class="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                            <p class="text-xs text-gray-500">Leave empty to keep current image. Recommended size: 1920×1080px.</p>
                            <InputError :message="form.errors.image" />
                        </div>

                        <!-- Link URL & Text (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="link_url" class="text-xs font-medium">Link URL</Label>
                                <Input id="link_url" v-model="form.link_url" class="h-9 text-sm" placeholder="https://example.com" />
                                <InputError :message="form.errors.link_url" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="link_text" class="text-xs font-medium">Link Text</Label>
                                <Input id="link_text" v-model="form.link_text" class="h-9 text-sm" placeholder="Learn more" />
                                <InputError :message="form.errors.link_text" />
                            </div>
                        </div>

                        <!-- Order -->
                        <div class="flex flex-col gap-1.5 sm:max-w-[200px]">
                            <Label for="order" class="text-xs font-medium">Order</Label>
                            <Input id="order" v-model.number="form.order" type="number" min="0" step="10" class="h-9 text-sm" />
                            <p class="text-xs text-gray-500">Slides are ordered from lowest to highest.</p>
                            <InputError :message="form.errors.order" />
                        </div>

                        <!-- Form actions -->
                        <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                            <Button type="button" variant="outline" size="sm" as-child>
                                <Link :href="`/admin/sliders/${slider.id}/edit`">Cancel</Link>
                            </Button>
                            <Button type="submit" size="sm" :disabled="form.processing" class="gap-1.5">
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
