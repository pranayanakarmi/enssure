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
    applicationForm: { type: Object, required: true },
});

const form = useForm({
    applicant_name: props.applicationForm.applicant_name ?? '',
    email: props.applicationForm.email ?? '',
    course_interest: props.applicationForm.course_interest ?? '',
    status: props.applicationForm.status ?? '',
    notes: props.applicationForm.notes ?? '',
});

const breadcrumbItems = [
    { title: 'Application Forms', href: '/admin/application_forms' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit application form" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit application" :description="applicationForm.applicant_name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/application_forms/${applicationForm.id}`)">
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
                        <Label for="status">Status</Label>
                        <Input id="status" v-model="form.status" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/application_forms">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
