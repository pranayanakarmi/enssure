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
    trainingProgram: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: props.trainingProgram.name ?? '',
    slug: props.trainingProgram.slug ?? '',
    program_type: props.trainingProgram.program_type ?? '',
    description: props.trainingProgram.description ?? '',
    duration: props.trainingProgram.duration ?? '',
    level: props.trainingProgram.level ?? '',
});

const breadcrumbItems = [
    { title: 'Training Programs', href: '/admin/training_programs' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit training program" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit training program"
                    :description="trainingProgram.name"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/training_programs/${trainingProgram.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="slug">Slug</Label>
                        <Input id="slug" v-model="form.slug" type="text" />
                        <InputError :message="form.errors.slug" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="program_type">Program type</Label>
                        <Input id="program_type" v-model="form.program_type" type="text" />
                        <InputError :message="form.errors.program_type" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <Input id="description" v-model="form.description" type="text" />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="duration">Duration</Label>
                        <Input id="duration" v-model="form.duration" type="text" />
                        <InputError :message="form.errors.duration" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="level">Level</Label>
                        <Input id="level" v-model="form.level" type="text" />
                        <InputError :message="form.errors.level" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/training_programs">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
