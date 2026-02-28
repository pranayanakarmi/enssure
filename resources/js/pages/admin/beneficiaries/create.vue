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
    full_name: '',
    gender: '',
    contact_number: '',
    province: '',
    district: '',
    status: '',
});

const breadcrumbItems = [
    { title: 'Beneficiaries', href: '/admin/beneficiaries' },
    { title: 'Create', href: '/admin/beneficiaries/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create beneficiary" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create beneficiary" description="Add a new beneficiary" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/beneficiaries')">
                    <div class="grid gap-2">
                        <Label for="full_name">Full name</Label>
                        <Input id="full_name" v-model="form.full_name" type="text" required />
                        <InputError :message="form.errors.full_name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="gender">Gender</Label>
                        <Input id="gender" v-model="form.gender" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="contact_number">Contact number</Label>
                        <Input id="contact_number" v-model="form.contact_number" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="province">Province</Label>
                        <Input id="province" v-model="form.province" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="district">District</Label>
                        <Input id="district" v-model="form.district" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status">Status</Label>
                        <Input id="status" v-model="form.status" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/beneficiaries">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
