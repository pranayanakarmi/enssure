<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, Tag } from 'lucide-vue-next';

const form = useForm({
    name: '',
    slug: '',
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Document Types', href: '/admin/document_types' },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create Document Type" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/document_types">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Create Document Type</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Add a new document type (category).</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Tag class="h-3.5 w-3.5" />New Type
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm max-w-lg mx-auto w-full">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Type Details</CardTitle>
                    <CardDescription class="text-xs">Fill in the name and slug for the new document type.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post('/admin/document_types')">

                        <!-- Name -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="name" class="text-xs font-medium">Name *</Label>
                            <Input id="name" v-model="form.name" class="h-9 text-sm" placeholder="e.g. Report" />
                            <InputError :message="form.errors.name" />
                        </div>

                        <!-- Slug -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="slug" class="text-xs font-medium">Slug *</Label>
                            <Input id="slug" v-model="form.slug" class="h-9 text-sm" placeholder="e.g. report" />
                            <p class="text-xs text-gray-500">Used in URLs – lowercase letters and hyphens only.</p>
                            <InputError :message="form.errors.slug" />
                        </div>

                        <!-- Form actions -->
                        <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                            <Button type="button" variant="outline" size="sm" as-child>
                                <Link href="/admin/document_types">Cancel</Link>
                            </Button>
                            <Button type="submit" size="sm" :disabled="form.processing" class="gap-1.5">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Creating...' : 'Create Type' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
