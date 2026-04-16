<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, FileText } from 'lucide-vue-next';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';


const props = defineProps({
    nextOrder: { type: Number, default: 0 },
    documentTypes: { type: Array, default: () => [] },
});

const form = useForm({
    title: '',
    description: '',
    document_type: 'report',
    order: props.nextOrder,
    file: null,
});

function onFileChange(event) {
    form.file = event.target.files?.[0] || null;
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Documents', href: '/admin/documents' },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create Document" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/documents">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Create Document</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Upload a PDF document and add details.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <FileText class="h-3.5 w-3.5" />New Document
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Document Details</CardTitle>
                    <CardDescription class="text-xs">Fill in the information for the new document.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post('/admin/documents', { forceFormData: true })">

                        <!-- Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title *</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="Document title" />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Description -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="description" class="text-xs font-medium">Description</Label>
                            <Input id="description" v-model="form.description" class="h-9 text-sm" placeholder="Optional description" />
                            <InputError :message="form.errors.description" />
                        </div>

                        <!-- Document Type -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="document_type" class="text-xs font-medium">Type</Label>
                            <select
                                id="document_type"
                                v-model="form.document_type"
                                required
                                class="h-9 w-full rounded-md border border-gray-300 bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option v-for="type in props.documentTypes" :key="type.slug" :value="type.slug">
                                    {{ type.name }}
                                </option>
                            </select>
                            <InputError :message="form.errors.document_type" />
                        </div>

                        <!-- Order -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="order" class="text-xs font-medium">Order</Label>
                            <Input id="order" v-model.number="form.order" type="number" min="0" class="h-9 text-sm" />
                            <p class="text-xs text-gray-500">Lower order = higher priority in the list.</p>
                            <InputError :message="form.errors.order" />
                        </div>

                        <!-- PDF File -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="file" class="text-xs font-medium">PDF File *</Label>
                            <input
                                id="file"
                                type="file"
                                accept="application/pdf,.pdf"
                                required
                                class="block w-full cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onFileChange"
                            />
                            <InputError :message="form.errors.file" />
                        </div>

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Creating...' : 'Create Document' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
