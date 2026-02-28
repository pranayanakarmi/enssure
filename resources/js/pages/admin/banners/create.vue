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
    title: '',
    subtitle: '',
    description: '',
    image_path: '',
    button_text: '',
    button_url: '',
    order: 0,
    is_active: true,
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Banners', href: '/admin/banners' },
    { title: 'Create', href: '/admin/banners/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create banner" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create banner"
                    description="Add a new banner"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/banners')"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="Banner title"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="subtitle">Subtitle</Label>
                        <Input
                            id="subtitle"
                            v-model="form.subtitle"
                            type="text"
                        />
                        <InputError :message="form.errors.subtitle" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image_path">Image path</Label>
                        <Input
                            id="image_path"
                            v-model="form.image_path"
                            type="text"
                            placeholder="/images/banner.jpg"
                        />
                        <InputError :message="form.errors.image_path" />
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
                    <div class="flex items-center gap-2">
                        <input
                            id="is_active"
                            v-model="form.is_active"
                            type="checkbox"
                            class="rounded border-sidebar-border"
                        />
                        <Label for="is_active">Active</Label>
                    </div>
                    <InputError :message="form.errors.is_active" />
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create banner
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/banners">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
