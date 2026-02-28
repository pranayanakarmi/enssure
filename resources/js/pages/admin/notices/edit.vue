<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    notice: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.notice.title ?? '',
    slug: props.notice.slug ?? '',
    notice_type: props.notice.notice_type ?? '',
    content: props.notice.content ?? '',
    attachment: props.notice.attachment ?? '',
    deadline_date: props.notice.deadline_date ?? '',
    is_featured: props.notice.is_featured ?? false,
    published_at: props.notice.published_at ? props.notice.published_at.slice(0, 10) : '',
});

const breadcrumbItems = [
    { title: 'Notices', href: '/admin/notices' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit notice" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit notice"
                    :description="notice.title"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/notices/${notice.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.title" />
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
                        <Label for="notice_type">Type</Label>
                        <Input
                            id="notice_type"
                            v-model="form.notice_type"
                            type="text"
                        />
                        <InputError :message="form.errors.notice_type" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="content">Content</Label>
                        <textarea
                            id="content"
                            v-model="form.content"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <InputError :message="form.errors.content" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="deadline_date">Deadline</Label>
                        <Input
                            id="deadline_date"
                            v-model="form.deadline_date"
                            type="date"
                        />
                        <InputError :message="form.errors.deadline_date" />
                    </div>
                    <div class="flex items-center gap-2">
                        <input
                            id="is_featured"
                            v-model="form.is_featured"
                            type="checkbox"
                            class="rounded border-sidebar-border"
                        />
                        <Label for="is_featured">Featured</Label>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/notices">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
