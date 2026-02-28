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
    batch_name: '',
    batch_code: '',
    start_date: '',
    end_date: '',
    training_center: '',
    status: '',
});

const breadcrumbItems = [
    { title: 'Training Batches', href: '/admin/training_batches' },
    { title: 'Create', href: '/admin/training_batches/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create training batch" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create training batch" description="Add a new batch" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/training_batches')">
                    <div class="grid gap-2">
                        <Label for="batch_name">Batch name</Label>
                        <Input id="batch_name" v-model="form.batch_name" type="text" required />
                        <InputError :message="form.errors.batch_name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="batch_code">Batch code</Label>
                        <Input id="batch_code" v-model="form.batch_code" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="start_date">Start date</Label>
                        <Input id="start_date" v-model="form.start_date" type="date" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="end_date">End date</Label>
                        <Input id="end_date" v-model="form.end_date" type="date" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="training_center">Training center</Label>
                        <Input id="training_center" v-model="form.training_center" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status">Status</Label>
                        <Input id="status" v-model="form.status" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/training_batches">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
