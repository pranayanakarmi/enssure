<script setup>
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    feedback: { type: Object, required: true },
});

const breadcrumbItems = [
    { title: 'Feedback', href: '/admin/feedback' },
    { title: 'View', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="View feedback" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Feedback details" :description="feedback.name || feedback.email" />
                <div class="space-y-6 rounded-xl border p-6">
                    <div class="grid gap-2">
                        <Label>Type</Label>
                        <p class="text-sm text-foreground">
                            {{ feedback.feedback_type === 'complaint' ? 'Complaint' : 'Feedback' }}
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <Label>Name</Label>
                        <p class="text-sm text-foreground">{{ feedback.name || '—' }}</p>
                    </div>
                    <div class="grid gap-2">
                        <Label>Email</Label>
                        <p class="text-sm text-foreground">{{ feedback.email || '—' }}</p>
                    </div>
                    <div class="grid gap-2">
                        <Label>Message</Label>
                        <p class="whitespace-pre-wrap break-words text-sm text-foreground">
                            {{ feedback.feedback_text || '—' }}
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button variant="outline" as-child>
                            <Link href="/admin/feedback">Back</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
