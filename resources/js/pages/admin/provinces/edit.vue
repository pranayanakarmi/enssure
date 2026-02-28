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
    province: { type: Object, required: true },
});

const form = useForm({
    name: props.province.name ?? '',
    province_number: props.province.province_number ?? '',
    capital: props.province.capital ?? '',
    is_covered: props.province.is_covered ?? false,
});

const breadcrumbItems = [
    { title: 'Provinces', href: '/admin/provinces' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit province" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit province" :description="province.name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/provinces/${province.id}`)">
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
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/provinces">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
