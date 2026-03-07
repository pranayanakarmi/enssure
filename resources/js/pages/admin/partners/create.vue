<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    name: '',
    logo: null,
    website_url: '',
    partner_type: '',
    description: '',
    order: 0,
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Partners', href: '/admin/partners' },
    { title: 'Create', href: '/admin/partners/create' },
];

function submitForm() {
    form.post('/admin/partners', {
        forceFormData: true,
    });
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create partner" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create partner"
                    description="Add a new partner"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="submitForm"
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
                        <Label for="logo">Logo</Label>
                        <input
                            id="logo"
                            type="file"
                            accept="image/*"
                            class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                            @change="form.logo = $event.target.files?.[0] || null"
                        />
                        <p class="text-xs text-muted-foreground">
                            Upload an image (max 2 MB). Recommended for display on the home page.
                        </p>
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
                            placeholder="e.g. strategic, funding"
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
                        <Button
                            type="submit"
                            :disabled="form.processing"
                        >
                            Create partner
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/partners">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
