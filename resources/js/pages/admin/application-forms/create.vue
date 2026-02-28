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
    applicant_name: '',
    email: '',
    phone: '',
    course_interest: '',
    status: '',
});

const breadcrumbItems = [
    { title: 'Application Forms', href: '/admin/application_forms' },
    { title: 'Create', href: '/admin/application_forms/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create application form" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create application" description="Add a new application" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/application_forms')">
                    <div class="grid gap-2">
                        <Label for="applicant_name">Applicant name</Label>
                        <Input id="applicant_name" v-model="form.applicant_name" type="text" required />
                        <InputError :message="form.errors.applicant_name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="form.email" type="email" required />
                        <InputError :message="form.errors.email" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="course_interest">Course interest</Label>
                        <Input id="course_interest" v-model="form.course_interest" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status">Status</Label>
                        <Input id="status" v-model="form.status" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/application_forms">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
