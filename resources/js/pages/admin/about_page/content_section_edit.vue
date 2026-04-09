<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, FileText } from 'lucide-vue-next';

const props = defineProps({
    aboutContentSection: { type: Object, default: null },
});

const section = computed(() => props.aboutContentSection ?? {
    id: null,
    paragraph_1: '',
    paragraph_2: '',
});

const form = useForm({
    paragraph_1: section.value.paragraph_1 ?? '',
    paragraph_2: section.value.paragraph_2 ?? '',
    _method: 'put',
});

function submitForm() {
    form.put('/admin/about-page/content-section');
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'About Page', href: '/admin/about-page' },
    { title: 'Content Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="About Page – Content Section" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">About Page – Content Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit the two‑paragraph content block below the main about section.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <FileText class="h-3.5 w-3.5" />Text Content
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Paragraphs</CardTitle>
                    <CardDescription class="text-xs">Edit the first (left column) and second (right column) paragraphs.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- First paragraph -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="paragraph_1" class="text-xs font-medium">First paragraph (left column)</Label>
                            <textarea
                                id="paragraph_1"
                                v-model="form.paragraph_1"
                                rows="6"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="First paragraph text..."
                            />
                            <InputError :message="form.errors.paragraph_1" />
                        </div>

                        <!-- Second paragraph -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="paragraph_2" class="text-xs font-medium">Second paragraph (right column)</Label>
                            <textarea
                                id="paragraph_2"
                                v-model="form.paragraph_2"
                                rows="6"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Second paragraph text..."
                            />
                            <InputError :message="form.errors.paragraph_2" />
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
