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
    teamMember: { type: Object, required: true },
});

const form = useForm({
    name: props.teamMember.name ?? '',
    job_title: props.teamMember.job_title ?? '',
    department: props.teamMember.department ?? '',
    order: props.teamMember.order ?? '',
});

const breadcrumbItems = [
    { title: 'Team Members', href: '/admin/team_members' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit team member" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit team member" :description="teamMember.name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/team_members/${teamMember.id}`)">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="job_title">Job title</Label>
                        <Input id="job_title" v-model="form.job_title" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="department">Department</Label>
                        <Input id="department" v-model="form.department" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/team_members">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
