<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X, Tag, Type } from 'lucide-vue-next';
import { computed, ref, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeContactCtaSection: { type: Object, default: null },
});

const section = computed(() => props.homeContactCtaSection ?? {
    id: null,
    badge_text: '',
    title: '',
    highlight_phrase: '',
    button_text: '',
    background_image_url: null,
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    highlight_phrase: section.value.highlight_phrase ?? '',
    button_text: section.value.button_text ?? '',
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
    form.post('/admin/home-contact-cta-section', {
        forceFormData: true,
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Contact CTA Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Contact CTA Section" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Contact CTA Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge, title, highlighted phrase, button text and background image.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Tag class="h-3.5 w-3.5" />Call to Action
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold flex items-center gap-2">
                        <Type class="h-4 w-4" /> Section Content
                    </CardTitle>
                    <CardDescription class="text-xs">Update the banner above the contact area on the home page.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Badge text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="badge_text" class="text-xs font-medium flex items-center gap-1.5">
                                <Tag class="h-3 w-3" />Badge Text
                            </Label>
                            <Input id="badge_text" v-model="form.badge_text" class="h-9 text-sm" placeholder="e.g. JOIN US" />
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
                                placeholder="e.g. Build Skills, Build Futures. Support sustainable employment today."
                            />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Highlight phrase -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="highlight_phrase" class="text-xs font-medium">Highlight Phrase (shown in red)</Label>
                            <Input id="highlight_phrase" v-model="form.highlight_phrase" class="h-9 text-sm" placeholder="e.g. Support sustainable" />
                            <p class="text-xs text-gray-500">Must appear in the title. This part will be styled in red.</p>
                            <InputError :message="form.errors.highlight_phrase" />
                        </div>

                        <!-- Button text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="button_text" class="text-xs font-medium">Button Text</Label>
                            <Input id="button_text" v-model="form.button_text" class="h-9 text-sm" placeholder="e.g. Contact us" />
                            <InputError :message="form.errors.button_text" />
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
                            <p class="text-xs text-gray-500">Recommended size: 1920×1080px, max 2MB.</p>
                            <InputError :message="form.errors.background_image" />
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
