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
    document: { type: Object, required: true },
});

const form = useForm({
    title: props.document.title ?? '',
    description: props.document.description ?? '',
    document_type: props.document.document_type ?? '',
    file_path: props.document.file_path ?? '',
});

const breadcrumbItems = [
    { title: 'Documents', href: '/admin/documents' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit document" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit document" :description="document.title" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/documents/${document.id}`)">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" required />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="document_type">Type</Label>
                        <Input id="document_type" v-model="form.document_type" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="file_path">File path</Label>
                        <Input id="file_path" v-model="form.file_path" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/documents">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
