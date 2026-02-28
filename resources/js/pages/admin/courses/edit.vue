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
    course: { type: Object, required: true },
    trainingPrograms: { type: Array, default: () => [] },
});

const form = useForm({
    training_program_id: props.course.training_program_id ?? '',
    name: props.course.name ?? '',
    course_code: props.course.course_code ?? '',
    description: props.course.description ?? '',
    duration: props.course.duration ?? '',
});

const breadcrumbItems = [
    { title: 'Courses', href: '/admin/courses' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit course" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit course" :description="course.name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/courses/${course.id}`)">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="training_program_id">Program</Label>
                        <select id="training_program_id" v-model="form.training_program_id" class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option value="">—</option>
                            <option v-for="p in trainingPrograms" :key="p.id" :value="p.id">{{ p.name }}</option>
                        </select>
                        <InputError :message="form.errors.training_program_id" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="course_code">Code</Label>
                        <Input id="course_code" v-model="form.course_code" type="text" />
                        <InputError :message="form.errors.course_code" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="duration">Duration</Label>
                        <Input id="duration" v-model="form.duration" type="text" />
                        <InputError :message="form.errors.duration" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/courses">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
