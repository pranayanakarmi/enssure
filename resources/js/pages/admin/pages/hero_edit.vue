<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X } from 'lucide-vue-next';
import { computed, onBeforeUnmount, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    pageHero: { type: Object, default: null },
});

const hero = computed(() => props.pageHero ?? {
    id: null,
    hero_image_url: null,
});

const form = useForm({
    hero_image: null,
    remove_hero_image: false,
    _method: 'put',
});

const imagePreview = ref(null);
const currentImageUrl = hero.value.hero_image_url ?? null;
const imageInputRef = ref(null);

function onImageChange(e) {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    const file = e.target.files?.[0] || null;
    form.hero_image = file;
    form.remove_hero_image = false;
    if (file) imagePreview.value = URL.createObjectURL(file);
    else imagePreview.value = null;
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.hero_image = null;
    form.remove_hero_image = true;
    if (imageInputRef.value) imageInputRef.value.value = '';
}
const displayImageUrl = computed(() => {
    if (form.remove_hero_image) return null;
    return imagePreview.value ?? currentImageUrl;
});

onBeforeUnmount(() => {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
});

function submitForm() {
    form.post('/admin/pages/hero', { forceFormData: true });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Pages', href: '/admin/pages-page' },
    { title: 'Hero Background', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Pages – Hero Background" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/pages-page">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Pages – Hero Background</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Choose a shared hero background image for all public pages under /pages/*.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <ImageIcon class="h-3.5 w-3.5" />Hero Image
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Hero Background Settings</CardTitle>
                    <CardDescription class="text-xs">Update the hero background image for the pages section.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Hero image -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Hero Background Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="displayImageUrl" class="relative">
                                    <img :src="displayImageUrl" alt="Hero preview" class="h-32 w-48 rounded-lg border border-gray-200 object-cover" />
                                    <button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-else class="flex h-32 w-48 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                ref="imageInputRef"
                                type="file"
                                accept="image/*"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                            <p class="text-xs text-gray-500">Leave empty to keep current image, or click the X to remove it.</p>
                            <InputError :message="form.errors.hero_image" />
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
