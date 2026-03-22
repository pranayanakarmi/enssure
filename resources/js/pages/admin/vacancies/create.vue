<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm';

const form = useForm({
    position_title: '',
    job_description: '',
    requirements: '',
    location: '',
    job_type: '',
    number_of_positions: 1,
    application_deadline: '',
    application_instructions: '',
    tor_file: '',
    status: 'open',
    published_at: '',
});

const breadcrumbItems = [
    { title: 'Vacancies', href: '/admin/vacancies' },
    { title: 'Create', href: '/admin/vacancies/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create vacancy" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create vacancy"
                    description="Add a new job vacancy. The URL slug is generated automatically from the position title."
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/vacancies')"
                >
                    <div class="grid gap-2">
                        <Label for="position_title">Position title</Label>
                        <Input
                            id="position_title"
                            v-model="form.position_title"
                            type="text"
                            required
                        />
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
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/vacancies">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
