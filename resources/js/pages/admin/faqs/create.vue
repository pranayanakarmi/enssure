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
    question: '',
    answer: '',
    category: '',
    order: '',
});

const breadcrumbItems = [
    { title: 'FAQs', href: '/admin/faqs' },
    { title: 'Create', href: '/admin/faqs/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create FAQ" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create FAQ" description="Add a new FAQ" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/faqs')">
                    <div class="grid gap-2">
                        <Label for="question">Question</Label>
                        <Input id="question" v-model="form.question" type="text" required />
                        <InputError :message="form.errors.question" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="answer">Answer</Label>
                        <Input id="answer" v-model="form.answer" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="category">Category</Label>
                        <Input id="category" v-model="form.category" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/faqs">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
