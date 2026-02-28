<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    feedback_type: '',
    name: '',
    email: '',
    feedback_text: '',
    is_public: false,
});

const breadcrumbItems = [
    { title: 'Feedback', href: '/admin/feedback' },
    { title: 'Create', href: '/admin/feedback/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create feedback" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create feedback" description="Add a new feedback entry" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/feedback')">
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
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/feedback">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
