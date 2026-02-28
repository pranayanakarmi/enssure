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
    file_name: '',
    path: '',
    file_type: '',
    title: '',
});

const breadcrumbItems = [
    { title: 'Media', href: '/admin/media' },
    { title: 'Create', href: '/admin/media/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create media" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create media" description="Add a new media entry" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/media')">
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
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/media">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
