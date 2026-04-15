<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, FileText } from 'lucide-vue-next';
import { computed } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    contactFeedbackContent: { type: Object, default: null },
});

const content = computed(() => props.contactFeedbackContent ?? {
    id: null,
    title: '',
    description: '',
});

const form = useForm({
    title: content.value.title ?? '',
    description: content.value.description ?? '',
    _method: 'put',
});

function submitForm() {
    form.put('/admin/contact-feedback-content');
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Contact Us', href: '/admin/contact-page' },
    { title: 'Contact Us page', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Contact Us – Page Content" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/contact-page">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Contact Us – Page Content</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit the heading and intro text shown above the feedback form.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <FileText class="h-3.5 w-3.5" />Page Content
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Feedback Section Settings</CardTitle>
                    <CardDescription class="text-xs">Update the title and description for the contact page feedback section.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title *</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="e.g. Send us a message" />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Description (textarea) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="description" class="text-xs font-medium">Description</Label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="6"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Introductory paragraph for visitors..."
                            />
                            <InputError :message="form.errors.description" />
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
