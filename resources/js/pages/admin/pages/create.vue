<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import CopyablePublicUrl from '@/components/CopyablePublicUrl.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePagePublicUrl } from '@/composables/usePagePublicUrl';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, FileText } from 'lucide-vue-next';

defineProps({
    pages: { type: Array, default: () => [] },
});

const form = useForm({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    parent_id: '',
    published_at: '',
});

const { publicPageUrl } = usePagePublicUrl(form);

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Pages', href: '/admin/pages-page' },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create Page" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Create Page</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Add a new page with rich text. Published pages appear at /pages/your-slug.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <FileText class="h-3.5 w-3.5" />New Page
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Page Details</CardTitle>
                    <CardDescription class="text-xs">Fill in the information for the new page.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post('/admin/pages')">

                        <!-- Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title *</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="Page title" />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Slug -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="slug" class="text-xs font-medium">Slug</Label>
                            <Input id="slug" v-model="form.slug" class="h-9 text-sm" placeholder="Auto-generated from title if empty" />
                            <p class="text-xs text-gray-500">Leave empty to auto-generate from the title.</p>
                            <InputError :message="form.errors.slug" />
                        </div>

                        <!-- Meta Title & Meta Description (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="meta_title" class="text-xs font-medium">Meta Title (SEO)</Label>
                                <Input id="meta_title" v-model="form.meta_title" class="h-9 text-sm" placeholder="Optional; defaults to page title" />
                                <InputError :message="form.errors.meta_title" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="meta_description" class="text-xs font-medium">Meta Description (SEO)</Label>
                                <textarea id="meta_description" v-model="form.meta_description" rows="2" class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm" placeholder="Optional summary for search engines" />
                                <InputError :message="form.errors.meta_description" />
                            </div>
                        </div>

                        <!-- Content (rich text) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="content" class="text-xs font-medium">Content</Label>
                            <RichTextEditor id="content" v-model="form.content" placeholder="Enter page content..." />
                            <InputError :message="form.errors.content" />
                        </div>

                        <!-- Parent & Published At (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="parent_id" class="text-xs font-medium">Parent Page</Label>
                                <select id="parent_id" v-model="form.parent_id" class="h-9 w-full rounded-md border border-gray-300 bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="">— None —</option>
                                    <option v-for="p in pages" :key="p.id" :value="p.id">{{ p.title }}</option>
                                </select>
                                <InputError :message="form.errors.parent_id" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="published_at" class="text-xs font-medium">Published At</Label>
                                <Input id="published_at" v-model="form.published_at" type="datetime-local" class="h-9 text-sm" />
                                <p class="text-xs text-gray-500">Pages only appear publicly when this is set and not in the future. Clear to save as a draft.</p>
                                <InputError :message="form.errors.published_at" />
                            </div>
                        </div>

                        <!-- Copyable Public URL (only shown when published_at is set) -->
                        <div v-if="form.published_at && publicPageUrl" class="mt-2 pt-1 border-t border-gray-100">
                            <CopyablePublicUrl :url="publicPageUrl" label="Public page URL" />
                        </div>

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Creating...' : 'Create Page' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
