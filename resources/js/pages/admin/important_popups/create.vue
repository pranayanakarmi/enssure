<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, BellRing, ImageIcon, Save, X } from 'lucide-vue-next';
import { onBeforeUnmount, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    title: '',
    description: '',
    image: null,
    cta_text: '',
    cta_url: '',
    is_active: false,
});

const imagePreview = ref(null);
const imageInputRef = ref(null);

function onImageChange(event) {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    const file = event.target.files?.[0] || null;
    form.image = file;
    imagePreview.value = file ? URL.createObjectURL(file) : null;
}

function clearImagePreview() {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    imagePreview.value = null;
    form.image = null;

    if (imageInputRef.value) {
        imageInputRef.value.value = '';
    }
}

onBeforeUnmount(() => {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }
});

const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Important Popup', href: '/admin/important-popups' },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create Important Popup" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/important-popups">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Create Important Popup</h1>
                        <p class="mt-0.5 text-xs text-muted-foreground">Add a new popup and tick show popup if it should appear on the homepage.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <BellRing class="h-3.5 w-3.5" />New Popup
                </div>
            </div>

            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Popup Content</CardTitle>
                    <CardDescription class="text-xs">Title, message, image, CTA, and visibility for the public popup.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post('/admin/important-popups', { forceFormData: true })">
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title *</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="Important Notice" />
                            <InputError :message="form.errors.title" />
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <Label for="description" class="text-xs font-medium">Description</Label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="4"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Write the popup message here..."
                            ></textarea>
                            <InputError :message="form.errors.description" />
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_text" class="text-xs font-medium">CTA Text</Label>
                                <Input id="cta_text" v-model="form.cta_text" class="h-9 text-sm" placeholder="Learn More" />
                                <InputError :message="form.errors.cta_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_url" class="text-xs font-medium">CTA URL</Label>
                                <Input id="cta_url" v-model="form.cta_url" class="h-9 text-sm" placeholder="https://example.org/important" />
                                <InputError :message="form.errors.cta_url" />
                            </div>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="imagePreview" class="relative">
                                    <img :src="imagePreview" alt="Popup preview" class="h-28 w-44 rounded-lg border border-gray-200 object-cover" />
                                    <button
                                        type="button"
                                        class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white"
                                        @click="clearImagePreview"
                                    >
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-else class="flex h-28 w-44 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                ref="imageInputRef"
                                id="popup_image"
                                type="file"
                                accept="image/*"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                            <InputError :message="form.errors.image" />
                        </div>

                        <div class="flex items-center gap-2">
                            <input
                                id="is_active"
                                v-model="form.is_active"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300"
                            />
                            <Label for="is_active" class="text-xs font-medium">Show popup on homepage</Label>
                        </div>

                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Creating...' : 'Create Popup' }}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
