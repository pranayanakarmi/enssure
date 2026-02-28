<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    position_title: '',
    slug: '',
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
                    description="Add a new job vacancy"
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
                        <Label for="slug">Slug</Label>
                        <Input
                            id="slug"
                            v-model="form.slug"
                            type="text"
                        />
                        <InputError :message="form.errors.slug" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="job_description">Job description</Label>
                        <textarea
                            id="job_description"
                            v-model="form.job_description"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                        <Input
                            id="job_type"
                            v-model="form.job_type"
                            type="text"
                            placeholder="full_time, part_time, contract"
                        />
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
                        <Label for="status">Status</Label>
                        <Input
                            id="status"
                            v-model="form.status"
                            type="text"
                            placeholder="open, closed"
                        />
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
