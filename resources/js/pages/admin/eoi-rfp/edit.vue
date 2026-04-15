<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Save, X } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    item: { type: Object, required: true },
});

const form = useForm({
    title: props.item.title,
    slug: props.item.slug,
    description: props.item.description ?? '',
    content: props.item.content ?? '',
    location: props.item.location ?? '',
    deadline: props.item.deadline ?? '',
    external_url: props.item.external_url ?? '',
    status: props.item.status,
    published_at: props.item.published_at ? props.item.published_at.slice(0, 16) : '',
    order: props.item.order,
    _method: 'put',
});

const existingDocuments = ref(props.item.documents ?? []);
const newDocuments = ref([]);
const removeDocumentIds = ref([]);

const titleText = computed(() => props.item.type === 'eoi' ? 'EOI' : 'RFP');

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: titleText.value, href: `/admin/eoi-rfp?type=${props.item.type}` },
    { title: 'Edit', href: '#' },
];

function onDocumentsChange(e) {
    newDocuments.value = Array.from(e.target.files);
}
function removeExistingDocument(docId) {
    removeDocumentIds.value.push(docId);
    existingDocuments.value = existingDocuments.value.filter(d => d.id !== docId);
}
function removeNewDocument(idx) {
    newDocuments.value.splice(idx, 1);
}

function submitForm() {
    const data = {
        ...form.data(),
        documents: newDocuments.value,
        remove_document_ids: removeDocumentIds.value,
    };
    form.transform(() => data).post(`/admin/eoi-rfp/${props.item.id}`, { forceFormData: true });
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="`Edit ${titleText}`" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">
            <div class="flex items-center gap-3">
                <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                    <Link :href="`/admin/eoi-rfp?type=${item.type}`">
                        <ArrowLeft class="h-3.5 w-3.5" />Back
                    </Link>
                </Button>
                <div>
                    <h1 class="text-xl font-semibold">Edit {{ titleText }}</h1>
                    <p class="text-xs text-muted-foreground">{{ item.title }}</p>
                </div>
            </div>

            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b px-5 py-4">
                    <CardTitle>{{ titleText }} Details</CardTitle>
                    <CardDescription>Update the information.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="space-y-5" @submit.prevent="submitForm">
                        <!-- Type (read‑only) -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Type</Label>
                            <div class="flex gap-4">
                                <label class="flex items-center gap-2 opacity-70">
                                    <input type="radio" value="eoi" :checked="item.type === 'eoi'" disabled class="h-4 w-4" />
                                    <span>EOI (Expression of Interest)</span>
                                </label>
                                <label class="flex items-center gap-2 opacity-70">
                                    <input type="radio" value="rfp" :checked="item.type === 'rfp'" disabled class="h-4 w-4" />
                                    <span>RFP (Request for Proposal)</span>
                                </label>
                            </div>
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <div><Label>Title *</Label><Input v-model="form.title" required /><InputError :message="form.errors.title" /></div>
                            <div><Label>Slug</Label><Input v-model="form.slug" /><InputError :message="form.errors.slug" /></div>
                        </div>
                        <div><Label>Description (SEO meta description)</Label><textarea v-model="form.description" rows="3" class="w-full rounded border p-2 text-sm"></textarea><InputError :message="form.errors.description" /></div>
                        <div><Label>Content (Rich Text)</Label><RichTextEditor v-model="form.content" /><InputError :message="form.errors.content" /></div>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div><Label>Location</Label><Input v-model="form.location" /><InputError :message="form.errors.location" /></div>
                            <div><Label>Deadline</Label><Input type="date" v-model="form.deadline" /><InputError :message="form.errors.deadline" /></div>
                        </div>
                        <div><Label>External URL (apply / details)</Label><Input v-model="form.external_url" type="url" placeholder="https://..." /><InputError :message="form.errors.external_url" /></div>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div><Label>Status</Label><select v-model="form.status" class="h-9 w-full rounded border p-1"><option value="draft">Draft</option><option value="published">Published</option><option value="closed">Closed</option></select><InputError :message="form.errors.status" /></div>
                            <div><Label>Published At</Label><Input type="datetime-local" v-model="form.published_at" /><InputError :message="form.errors.published_at" /></div>
                        </div>
                        <div><Label>Order</Label><Input type="number" v-model.number="form.order" min="0" /><InputError :message="form.errors.order" /></div>

                        <!-- Documents -->
                        <div class="space-y-2">
                            <Label>Related Documents</Label>
                            <div v-if="existingDocuments.length" class="space-y-2">
                                <div v-for="doc in existingDocuments" :key="doc.id" class="flex items-center justify-between border p-2 rounded">
                                    <a :href="doc.file_url" target="_blank" class="text-primary underline">{{ doc.original_name }}</a>
                                    <Button type="button" variant="ghost" size="sm" @click="removeExistingDocument(doc.id)">Remove</Button>
                                </div>
                            </div>
                            <input type="file" multiple @change="onDocumentsChange" class="block w-full cursor-pointer rounded-md border px-3 py-2 text-sm" />
                            <div v-if="newDocuments.length" class="mt-2 space-y-1">
                                <div v-for="(file, idx) in newDocuments" :key="idx" class="flex items-center justify-between border p-2 rounded">
                                    <span>{{ file.name }}</span>
                                    <button type="button" @click="removeNewDocument(idx)" class="text-destructive"><X class="h-4 w-4" /></button>
                                </div>
                            </div>
                            <InputError :message="form.errors.documents" />
                        </div>

                        <div class="flex justify-end gap-3 border-t pt-4">
                            <Button type="button" variant="outline" size="sm" as-child><Link :href="`/admin/eoi-rfp?type=${item.type}`">Cancel</Link></Button>
                            <Button type="submit" size="sm" :disabled="form.processing"><Save class="h-3.5 w-3.5 mr-1" />Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
