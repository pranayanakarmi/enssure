<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
const initialOrder = Number(props.document.order ?? 0);

const form = useForm({
    title: props.document.title ?? '',
    description: props.document.description ?? '',
    document_type: initialType,
    order: Number.isFinite(initialOrder) ? initialOrder : 0,
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
                        <Label for="order">Order</Label>
                        <Input id="order" v-model.number="form.order" type="number" min="0" />
                        <InputError :message="form.errors.order" />
                    </div>
                    <div class="grid gap-2">
                        <Card>
                            <CardHeader class="pb-3">
                                <div class="flex flex-wrap items-center justify-between gap-3">
                                    <CardTitle class="text-base">
                                        {{ document.title || 'PDF Preview' }}
                                    </CardTitle>
                                    <div class="flex items-center gap-2">
                                        <a
                                            :href="document.file_url"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Open in new tab
                                        </a>
                                        <a
                                            :href="document.file_url"
                                            :download="`${document.title || 'document'}.pdf`"
                                            class="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <iframe
                                    :src="document.file_url"
                                    :title="document.title || 'Document PDF'"
                                    class="h-[28rem] w-full rounded-md border border-border bg-muted"
                                />
                            </CardContent>
                        </Card>
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
