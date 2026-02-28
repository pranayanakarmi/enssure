<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    feedback: { type: Object, required: true },
});

const form = useForm({
    feedback_type: props.feedback.feedback_type ?? '',
    name: props.feedback.name ?? '',
    email: props.feedback.email ?? '',
    feedback_text: props.feedback.feedback_text ?? '',
    is_public: props.feedback.is_public ?? false,
    response: props.feedback.response ?? '',
});

const breadcrumbItems = [
    { title: 'Feedback', href: '/admin/feedback' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit feedback" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit feedback" :description="feedback.name || feedback.email" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/feedback/${feedback.id}`)">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="form.email" type="email" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="feedback_type">Type</Label>
                        <Input id="feedback_type" v-model="form.feedback_type" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="feedback_text">Feedback</Label>
                        <Input id="feedback_text" v-model="form.feedback_text" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="response">Response</Label>
                        <Input id="response" v-model="form.response" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/feedback">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
