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
    emailTemplate: { type: Object, required: true },
});

const form = useForm({
    name: props.emailTemplate.name ?? '',
    slug: props.emailTemplate.slug ?? '',
    subject: props.emailTemplate.subject ?? '',
    body: props.emailTemplate.body ?? '',
    is_active: props.emailTemplate.is_active ?? true,
});

const breadcrumbItems = [
    { title: 'Email Templates', href: '/admin/email_templates' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit email template" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit email template" :description="emailTemplate.name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/email_templates/${emailTemplate.id}`)">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="slug">Slug</Label>
                        <Input id="slug" v-model="form.slug" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="subject">Subject</Label>
                        <Input id="subject" v-model="form.subject" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/email_templates">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
