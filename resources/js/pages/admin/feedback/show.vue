<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Mail, User, MessageSquare, FileText } from 'lucide-vue-next';

const props = defineProps({
    feedback: { type: Object, required: true },
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Contact Us', href: '/admin/contact-page' },
    { title: 'Feedback Submissions', href: '/admin/feedback' },
    { title: 'View', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="View Feedback" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/feedback">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Feedback Details</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ feedback.name || feedback.email || 'Submission' }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <FileText class="h-3.5 w-3.5" />View Feedback
                </div>
            </div>

            <!-- Feedback details card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Submission Details</CardTitle>
                    <CardDescription class="text-xs">Information provided by the user.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5 space-y-4">
                    <!-- Type -->
                    <div class="flex flex-col gap-1.5">
                        <Label class="text-xs font-medium flex items-center gap-1.5">
                            <MessageSquare class="h-3 w-3" /> Type
                        </Label>
                        <p class="text-sm text-foreground">
                            {{ feedback.feedback_type === 'complaint' ? 'Complaint' : 'Feedback' }}
                        </p>
                    </div>
                    <!-- Name -->
                    <div class="flex flex-col gap-1.5">
                        <Label class="text-xs font-medium flex items-center gap-1.5">
                            <User class="h-3 w-3" /> Name
                        </Label>
                        <p class="text-sm text-foreground">{{ feedback.name || '—' }}</p>
                    </div>
                    <!-- Email -->
                    <div class="flex flex-col gap-1.5">
                        <Label class="text-xs font-medium flex items-center gap-1.5">
                            <Mail class="h-3 w-3" /> Email
                        </Label>
                        <p class="text-sm text-foreground">{{ feedback.email || '—' }}</p>
                    </div>
                    <!-- Message -->
                    <div class="flex flex-col gap-1.5">
                        <Label class="text-xs font-medium flex items-center gap-1.5">
                            <MessageSquare class="h-3 w-3" /> Message
                        </Label>
                        <div class="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-foreground whitespace-pre-wrap break-words">
                            {{ feedback.feedback_text || '—' }}
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
