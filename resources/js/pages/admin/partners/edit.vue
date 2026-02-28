<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    partner: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: props.partner.name ?? '',
    logo: props.partner.logo ?? '',
    website_url: props.partner.website_url ?? '',
    partner_type: props.partner.partner_type ?? '',
    description: props.partner.description ?? '',
    order: props.partner.order ?? 0,
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Partners', href: '/admin/partners' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit partner" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit partner"
                    :description="partner.name"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/partners/${partner.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="logo">Logo (path or URL)</Label>
                        <Input
                            id="logo"
                            v-model="form.logo"
                            type="text"
                        />
                        <InputError :message="form.errors.logo" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="website_url">Website URL</Label>
                        <Input
                            id="website_url"
                            v-model="form.website_url"
                            type="url"
                        />
                        <InputError :message="form.errors.website_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="partner_type">Type</Label>
                        <Input
                            id="partner_type"
                            v-model="form.partner_type"
                            type="text"
                        />
                        <InputError :message="form.errors.partner_type" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="order">Order</Label>
                        <Input
                            id="order"
                            v-model.number="form.order"
                            type="number"
                            min="0"
                        />
                        <InputError :message="form.errors.order" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save partner
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/partners">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
