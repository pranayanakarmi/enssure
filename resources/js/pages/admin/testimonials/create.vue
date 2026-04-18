<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onUnmounted } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, ImageIcon, X } from 'lucide-vue-next';

const form = useForm({
    name: '',
    designation: '',
    testimonial_text: '',
    image: null,
    order: 0,
    is_published: true,
});

const imagePreview = ref(null);
const imageInputRef = ref(null);

function onImageChange(e) {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    const file = e.target.files?.[0] || null;
    form.image = file;
    if (file) imagePreview.value = URL.createObjectURL(file);
    else imagePreview.value = null;
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.image = null;
    if (imageInputRef.value) imageInputRef.value.value = '';
}

onUnmounted(() => {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Testimonials', href: '/admin/testimonials' },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create Testimonial" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/testimonials">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Create Testimonial</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Add a new client or partner testimonial.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <ImageIcon class="h-3.5 w-3.5" />New Testimonial
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Testimonial Details</CardTitle>
                    <CardDescription class="text-xs">Fill in the information for the new testimonial.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post('/admin/testimonials', { forceFormData: true })">

                        <!-- Name -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="name" class="text-xs font-medium">Name *</Label>
                            <Input id="name" v-model="form.name" class="h-9 text-sm" placeholder="e.g. Anita Shrestha" />
                            <InputError :message="form.errors.name" />
                        </div>

                        <!-- Designation / Role -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="designation" class="text-xs font-medium">Designation / Role</Label>
                            <Input id="designation" v-model="form.designation" class="h-9 text-sm" placeholder="e.g. Former Apprentice, Now Workshop Owner" />
                            <InputError :message="form.errors.designation" />
                        </div>

                        <!-- Testimonial Text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="testimonial_text" class="text-xs font-medium">Testimonial Text *</Label>
                            <textarea
                                id="testimonial_text"
                                v-model="form.testimonial_text"
                                rows="4"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Write the testimonial quote..."
                            />
                            <InputError :message="form.errors.testimonial_text" />
                        </div>

                        <!-- Image (optional) -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Photo (optional)</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="imagePreview" class="relative">
                                    <img :src="imagePreview" alt="Preview" class="h-20 w-20 rounded-full border border-gray-200 object-cover" />
                                    <button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-else class="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50">
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
                            <p class="text-xs text-gray-500">Recommended: square image, max 2MB.</p>
                            <InputError :message="form.errors.image" />
                        </div>

                        <!-- Order -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="order" class="text-xs font-medium">Order</Label>
                            <Input id="order" v-model.number="form.order" type="number" min="0" class="h-9 text-sm" />
                            <p class="text-xs text-gray-500">Lower order = higher priority in the list.</p>
                            <InputError :message="form.errors.order" />
                        </div>

                        <!-- Published -->
                        <div class="flex items-center gap-2">
                            <Checkbox id="is_published" v-model:checked="form.is_published" />
                            <Label for="is_published" class="text-xs font-medium">Published (visible on site)</Label>
                        </div>

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Creating...' : 'Create Testimonial' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
