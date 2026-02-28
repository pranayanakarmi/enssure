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
    name: '',
    province_number: '',
    capital: '',
    is_covered: false,
});

const breadcrumbItems = [
    { title: 'Provinces', href: '/admin/provinces' },
    { title: 'Create', href: '/admin/provinces/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create province" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create province" description="Add a new province" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/provinces')">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="province_number">Province number</Label>
                        <Input id="province_number" v-model="form.province_number" type="number" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="capital">Capital</Label>
                        <Input id="capital" v-model="form.capital" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/provinces">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
