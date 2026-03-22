<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    contactFeedbackContent: {
        type: Object,
        default: null,
    },
});

const content = computed(() => props.contactFeedbackContent ?? {
    id: null,
    title: '',
    description: '',
});

const form = useForm({
    title: content.value.title ?? '',
    description: content.value.description ?? '',
});

const breadcrumbItems = [
    { title: 'Feedback', href: '/admin/feedback' },
    { title: 'Contact section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Contact feedback section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Contact page — feedback section"
                    description="Edit the heading and intro text shown above the feedback form on the public Contact page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/contact-feedback-content')"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="8"
                            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Introductory paragraph for visitors..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/feedback">View submissions</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
