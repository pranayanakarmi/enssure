<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed, ref, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, ImageIcon, X, Tag } from 'lucide-vue-next';

const props = defineProps({
    homeSupportSection: { type: Object, default: null },
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

const imagePreview = ref(null);
const currentImageUrl = section.value.image_url ?? null;

function onImageChange(e) {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    const file = e.target.files?.[0] || null;
    form.image = file;
    if (file) imagePreview.value = URL.createObjectURL(file);
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.image = null;
    const el = document.getElementById('support_image');
    if (el) el.value = '';
}

onBeforeUnmount(() => {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
});

function submitForm() {
    form.post('/admin/home-support-section', {
        forceFormData: true,
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Support Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Support Section" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Support Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge, title and image for the support block.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Tag class="h-3.5 w-3.5" />Support Block
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Section Content</CardTitle>
                    <CardDescription class="text-xs">Update the badge text, title, and image for the support section.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Badge text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="badge_text" class="text-xs font-medium flex items-center gap-1.5">
                                <Tag class="h-3 w-3" />Badge Text
                            </Label>
                            <Input id="badge_text" v-model="form.badge_text" class="h-9 text-sm" placeholder="e.g. Support" />
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
                                placeholder="e.g. Technical Assistance By"
                            />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Image upload with preview -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="currentImageUrl && !imagePreview" class="relative">
                                    <img :src="currentImageUrl" alt="Current image" class="h-24 w-40 rounded-lg border border-gray-200 object-contain p-2" />
                                    <span class="absolute -top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] text-white">Current</span>
                                </div>
                                <div v-if="imagePreview" class="relative">
                                    <img :src="imagePreview" alt="Preview" class="h-24 w-40 rounded-lg border border-gray-200 object-contain p-2 ring-2 ring-primary" />
                                    <button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-if="!currentImageUrl && !imagePreview" class="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                id="support_image"
                                type="file"
                                accept="image/*"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                            <p class="text-xs text-gray-500">Recommended: square image, max 2MB.</p>
                            <InputError :message="form.errors.image" />
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
