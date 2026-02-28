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
    medium: { type: Object, required: true },
});

const form = useForm({
    file_name: props.medium.file_name ?? '',
    path: props.medium.path ?? '',
    file_type: props.medium.file_type ?? '',
    title: props.medium.title ?? '',
});

const breadcrumbItems = [
    { title: 'Media', href: '/admin/media' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit media" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit media" :description="medium.file_name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/media/${medium.id}`)">
                    <div class="grid gap-2">
                        <Label for="file_name">File name</Label>
                        <Input id="file_name" v-model="form.file_name" type="text" required />
                        <InputError :message="form.errors.file_name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="path">Path</Label>
                        <Input id="path" v-model="form.path" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="file_type">File type</Label>
                        <Input id="file_type" v-model="form.file_type" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/media">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
