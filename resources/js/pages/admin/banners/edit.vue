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
    banner: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.banner.title ?? '',
    subtitle: props.banner.subtitle ?? '',
    description: props.banner.description ?? '',
    image_path: props.banner.image_path ?? '',
    button_text: props.banner.button_text ?? '',
    button_url: props.banner.button_url ?? '',
    order: props.banner.order ?? 0,
    is_active: props.banner.is_active ?? true,
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Banners', href: '/admin/banners' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit banner" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit banner"
                    :description="banner.title || 'Banner'"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/banners/${banner.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
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
                            Save banner
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/banners">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
