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

const allowedTypes = ['report', 'documents'];

const initialType = allowedTypes.includes(props.document.document_type)
    ? props.document.document_type
    : 'report';

const form = useForm({
    title: props.document.title ?? '',
    description: props.document.description ?? '',
    document_type: initialType,
    file: null,
});

function onFileChange(event) {
    const file = event.target.files?.[0] || null;
    form.file = file;
}

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
                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/documents/${document.id}`, { forceFormData: true })"
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
                        <p class="text-sm text-muted-foreground">
                            Current file:
                            <a
                                :href="document.file_url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-primary underline underline-offset-2"
                            >
                                Open current PDF
                            </a>
                            <span v-if="document.file_extension" class="text-muted-foreground">
                                ({{ document.file_extension }})
                            </span>
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <Label for="file">Replace PDF (optional)</Label>
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
