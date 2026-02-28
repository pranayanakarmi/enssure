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
    batchEnrollment: { type: Object, required: true },
    batches: { type: Array, default: () => [] },
    beneficiaries: { type: Array, default: () => [] },
});

const form = useForm({
    batch_id: props.batchEnrollment.batch_id ?? '',
    beneficiary_id: props.batchEnrollment.beneficiary_id ?? '',
    enrollment_date: props.batchEnrollment.enrollment_date ?? '',
    status: props.batchEnrollment.status ?? '',
});

const breadcrumbItems = [
    { title: 'Batch Enrollments', href: '/admin/batch_enrollments' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit batch enrollment" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit batch enrollment" description="Enrollment" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/batch_enrollments/${batchEnrollment.id}`)">
                    <div class="grid gap-2">
                        <Label for="batch_id">Batch</Label>
                        <select id="batch_id" v-model="form.batch_id" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" required>
                            <option value="">— Select —</option>
                            <option v-for="b in batches" :key="b.id" :value="b.id">{{ b.batch_name }} ({{ b.batch_code }})</option>
                        </select>
                        <InputError :message="form.errors.batch_id" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="beneficiary_id">Beneficiary</Label>
                        <select id="beneficiary_id" v-model="form.beneficiary_id" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" required>
                            <option value="">— Select —</option>
                            <option v-for="b in beneficiaries" :key="b.id" :value="b.id">{{ b.full_name }}</option>
                        </select>
                        <InputError :message="form.errors.beneficiary_id" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="enrollment_date">Enrollment date</Label>
                        <Input id="enrollment_date" v-model="form.enrollment_date" type="date" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status">Status</Label>
                        <Input id="status" v-model="form.status" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/batch_enrollments">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
