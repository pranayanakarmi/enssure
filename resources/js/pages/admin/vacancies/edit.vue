<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Save, Briefcase, Eye } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const selectClass = 'h-9 w-full rounded-md border border-gray-300 bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary';

const props = defineProps({
    vacancy: { type: Object, required: true },
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
    published_at: props.vacancy.published_at ? String(props.vacancy.published_at).slice(0, 10) : '',
});

const currentRelatedDocuments = ref([...(props.vacancy.related_documents ?? [])]);
const visibleRelatedDocuments = computed(() => currentRelatedDocuments.value.filter(
    (doc) => !form.remove_related_document_ids.includes(doc.id),
));

function onRelatedDocumentsChange(event) {
    form.related_documents = Array.from(event.target.files || []);
}

function removeRelatedDocument(docId) {
    if (!form.remove_related_document_ids.includes(docId)) {
        form.remove_related_document_ids.push(docId);
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Vacancies', href: '/admin/vacancies' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Vacancy" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/vacancies">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Edit Vacancy</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ vacancy.position_title }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Briefcase class="h-3.5 w-3.5" />Edit Vacancy
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Vacancy Details</CardTitle>
                    <CardDescription class="text-xs">Update the job vacancy information.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.put(`/admin/vacancies/${vacancy.id}`, { forceFormData: true })">

                        <!-- Position Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="position_title" class="text-xs font-medium">Position Title *</Label>
                            <Input id="position_title" v-model="form.position_title" class="h-9 text-sm" />
                            <p class="text-xs text-gray-500">The URL slug is updated automatically when you save, based on the position title.</p>
                            <InputError :message="form.errors.position_title" />
                        </div>

                        <!-- Job Description (Rich Text) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="job_description" class="text-xs font-medium">Job Description</Label>
                            <RichTextEditor id="job_description" v-model="form.job_description" placeholder="Describe the role, responsibilities, and benefits..." />
                            <InputError :message="form.errors.job_description" />
                        </div>

                        <!-- Location & Job Type -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="location" class="text-xs font-medium">Location</Label>
                                <Input id="location" v-model="form.location" class="h-9 text-sm" />
                                <InputError :message="form.errors.location" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="job_type" class="text-xs font-medium">Job Type</Label>
                                <select id="job_type" v-model="form.job_type" :class="selectClass">
                                    <option value="">Select job type</option>
                                    <option value="full_time">Full time</option>
                                    <option value="part_time">Part time</option>
                                    <option value="contract">Contract</option>
                                </select>
                                <InputError :message="form.errors.job_type" />
                            </div>
                        </div>

                        <!-- Number of Positions & Application Deadline -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="number_of_positions" class="text-xs font-medium">Number of Positions</Label>
                                <Input id="number_of_positions" v-model.number="form.number_of_positions" type="number" min="1" class="h-9 text-sm" />
                                <InputError :message="form.errors.number_of_positions" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="application_deadline" class="text-xs font-medium">Application Deadline</Label>
                                <Input id="application_deadline" v-model="form.application_deadline" type="date" class="h-9 text-sm" />
                                <InputError :message="form.errors.application_deadline" />
                            </div>
                        </div>

                        <!-- Published At & Status -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="published_at" class="text-xs font-medium">Published At</Label>
                                <Input id="published_at" v-model="form.published_at" type="date" class="h-9 text-sm" />
                                <p class="text-xs text-gray-500">Vacancies appear on the public site when published at is set and status is open.</p>
                                <InputError :message="form.errors.published_at" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="status" class="text-xs font-medium">Status</Label>
                                <select id="status" v-model="form.status" :class="selectClass">
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                                <InputError :message="form.errors.status" />
                            </div>
                        </div>

                        <!-- Related Documents -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Related Documents</Label>
                            <div v-if="visibleRelatedDocuments.length" class="space-y-2 rounded-md border border-gray-200 p-3">
                                <div v-for="doc in visibleRelatedDocuments" :key="doc.id" class="flex flex-wrap items-center justify-between gap-2 text-sm">
                                    <a :href="doc.file_url" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2">
                                        {{ doc.file_name }}
                                    </a>
                                    <Button type="button" variant="outline" size="sm" @click="removeRelatedDocument(doc.id)" class="h-7 text-xs">Remove</Button>
                                </div>
                            </div>
                            <input
                                id="related_documents"
                                type="file"
                                multiple
                                class="block w-full cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onRelatedDocumentsChange"
                            />
                            <p class="text-xs text-gray-500">Upload additional related documents (PDF, DOCX, XLSX, PPTX, CSV, TXT).</p>
                            <InputError :message="form.errors.related_documents" />
                            <InputError :message="form.errors['related_documents.0']" />
                        </div>

                        <!-- Apply URL -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="apply_url" class="text-xs font-medium">Apply URL</Label>
                            <Input id="apply_url" v-model="form.apply_url" class="h-9 text-sm" placeholder="https://example.com/apply" />
                            <InputError :message="form.errors.apply_url" />
                        </div>

                        <!-- Form Actions -->
                        <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                            <Button size="sm" variant="outline" as-child>
                                <a :href="`/vacancy/${vacancy.slug}`" target="_blank" rel="noopener noreferrer">
                                    <Eye class="h-3.5 w-3.5 mr-1" /> View
                                </a>
                            </Button>
                            <Button type="submit" size="sm" :disabled="form.processing" class="gap-1.5">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Saving…' : 'Save Changes' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
