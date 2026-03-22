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
    title: '',
    description: '',
    document_type: 'report',
    file: null,
});

function onFileChange(event) {
    const file = event.target.files?.[0] || null;
    form.file = file;
}

const breadcrumbItems = [
    { title: 'Documents', href: '/admin/documents' },
    { title: 'Create', href: '/admin/documents/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create document" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create document" description="Upload a PDF and add a title." />
                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/documents', { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" required />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <Input id="description" v-model="form.description" type="text" />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="document_type">Type</Label>
                        <select
                            id="document_type"
                            v-model="form.document_type"
                            required
                            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="report">Report</option>
                            <option value="documents">Documents</option>
                        </select>
                        <InputError :message="form.errors.document_type" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="file">PDF file</Label>
                        <Input
                            id="file"
                            type="file"
                            accept="application/pdf,.pdf"
                            class="cursor-pointer"
                            @change="onFileChange"
                        />
                        <InputError :message="form.errors.file" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/documents">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
