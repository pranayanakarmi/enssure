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
    publication: { type: Object, required: true },
});

const form = useForm({
    title: props.publication.title ?? '',
    authors: props.publication.authors ?? '',
    publication_type: props.publication.publication_type ?? '',
});

const breadcrumbItems = [
    { title: 'Publications', href: '/admin/publications' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit publication" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit publication" :description="publication.title" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/publications/${publication.id}`)">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" required />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="authors">Authors</Label>
                        <Input id="authors" v-model="form.authors" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="publication_type">Type</Label>
                        <Input id="publication_type" v-model="form.publication_type" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/publications">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
