<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm';

const props = defineProps({
    vacancy: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    position_title: props.vacancy.position_title ?? '',
    job_description: props.vacancy.job_description ?? '',
    requirements: props.vacancy.requirements ?? '',
    location: props.vacancy.location ?? '',
    job_type: props.vacancy.job_type ?? '',
    number_of_positions: props.vacancy.number_of_positions ?? 1,
    application_deadline: props.vacancy.application_deadline ?? '',
    apply_url: props.vacancy.apply_url ?? '',
    application_instructions: props.vacancy.application_instructions ?? '',
    tor_file: props.vacancy.tor_file ?? '',
    related_documents: [],
    remove_related_document_ids: [],
    status: props.vacancy.status ?? 'open',
    published_at: props.vacancy.published_at
        ? String(props.vacancy.published_at).slice(0, 10)
        : '',
});

const currentRelatedDocuments = ref([...(props.vacancy.related_documents ?? [])]);

const visibleRelatedDocuments = computed(() => currentRelatedDocuments.value.filter(
    (document) => !form.remove_related_document_ids.includes(document.id),
));

function onRelatedDocumentsChange(event) {
    form.related_documents = Array.from(event.target.files || []);
}

function removeRelatedDocument(documentId) {
    if (!form.remove_related_document_ids.includes(documentId)) {
        form.remove_related_document_ids.push(documentId);
    }
}

const breadcrumbItems = [
    { title: 'Vacancies', href: '/admin/vacancies' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit vacancy" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit vacancy"
                    :description="vacancy.position_title"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/vacancies/${vacancy.id}`, { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="position_title">Position title</Label>
                        <Input
                            id="position_title"
                            v-model="form.position_title"
                            type="text"
                            required
                        />
                        <p class="text-xs text-muted-foreground">
                            The URL slug is updated automatically when you save, based on the position title.
                        </p>
                        <InputError :message="form.errors.position_title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="job_description">Job description</Label>
                        <RichTextEditor
                            id="job_description"
                            v-model="form.job_description"
                            placeholder="Describe the role, responsibilities, and benefits..."
                        />
                        <InputError :message="form.errors.job_description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="location">Location</Label>
                        <Input
                            id="location"
                            v-model="form.location"
                            type="text"
                        />
                        <InputError :message="form.errors.location" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="job_type">Job type</Label>
                        <select
                            id="job_type"
                            v-model="form.job_type"
                            :class="selectClass"
                        >
                            <option value="">Select job type</option>
                            <option value="full_time">Full time</option>
                            <option value="part_time">Part time</option>
                            <option value="contract">Contract</option>
                        </select>
                        <InputError :message="form.errors.job_type" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="number_of_positions">Number of positions</Label>
                        <Input
                            id="number_of_positions"
                            v-model.number="form.number_of_positions"
                            type="number"
                            min="1"
                        />
                        <InputError :message="form.errors.number_of_positions" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="application_deadline">Application deadline</Label>
                        <Input
                            id="application_deadline"
                            v-model="form.application_deadline"
                            type="date"
                        />
                        <InputError :message="form.errors.application_deadline" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="published_at">Published at</Label>
                        <Input
                            id="published_at"
                            v-model="form.published_at"
                            type="date"
                        />
                        <p class="text-xs text-muted-foreground">
                            Vacancies appear on the public site when published at is set and status is open.
                        </p>
                        <InputError :message="form.errors.published_at" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status">Status</Label>
                        <select
                            id="status"
                            v-model="form.status"
                            :class="selectClass"
                        >
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                        <InputError :message="form.errors.status" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="related_documents">Related documents</Label>
                        <div
                            v-if="visibleRelatedDocuments.length"
                            class="space-y-2 rounded-md border p-3"
                        >
                            <div
                                v-for="document in visibleRelatedDocuments"
                                :key="document.id"
                                class="flex flex-wrap items-center justify-between gap-2 text-sm"
                            >
                                <a
                                    :href="document.file_url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-primary underline underline-offset-2"
                                >
                                    {{ document.file_name }}
                                </a>
                                <Button type="button" variant="outline" size="sm" @click="removeRelatedDocument(document.id)">
                                    Remove
                                </Button>
                            </div>
                        </div>
                        <Input
                            id="related_documents"
                            type="file"
                            multiple
                            class="cursor-pointer"
                            @change="onRelatedDocumentsChange"
                        />
                        <p class="text-xs text-muted-foreground">
                            Upload additional related documents (PDF, DOCX, XLSX, PPTX, CSV, TXT).
                        </p>
                        <InputError :message="form.errors.related_documents" />
                        <InputError :message="form.errors['related_documents.0']" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="apply_url">Apply URL</Label>
                        <Input
                            id="apply_url"
                            v-model="form.apply_url"
                            type="text"
                        />
                        <InputError :message="form.errors.apply_url" />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button variant="outline" as-child>
                            <a :href="`/vacancy/${vacancy.slug}`" target="_blank" rel="noopener noreferrer">
                                View
                            </a>
                        </Button>
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/vacancies">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
