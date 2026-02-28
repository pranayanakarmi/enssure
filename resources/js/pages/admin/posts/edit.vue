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
    post: {
        type: Object,
        required: true,
    },
    categories: {
        type: Array,
        default: () => [],
    },
    tags: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    title: props.post.title ?? '',
    slug: props.post.slug ?? '',
    excerpt: props.post.excerpt ?? '',
    content: props.post.content ?? '',
    image: props.post.image ?? '',
    category_id: props.post.category_id ?? '',
    published_at: props.post.published_at ? props.post.published_at.slice(0, 16) : '',
    tags: props.post.tags ?? [],
});

const breadcrumbItems = [
    { title: 'Posts', href: '/admin/posts' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit post" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit post"
                    :description="post.title"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/posts/${post.id}`)"
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
                        <Label for="excerpt">Excerpt</Label>
                        <textarea
                            id="excerpt"
                            v-model="form.excerpt"
                            rows="2"
                            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <InputError :message="form.errors.excerpt" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="content">Content</Label>
                        <textarea
                            id="content"
                            v-model="form.content"
                            rows="6"
                            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <InputError :message="form.errors.content" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="category_id">Category</Label>
                        <select
                            id="category_id"
                            v-model="form.category_id"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">— None —</option>
                            <option
                                v-for="c in (categories || [])"
                                :key="c.id"
                                :value="c.id"
                            >
                                {{ c.name }}
                            </option>
                        </select>
                        <InputError :message="form.errors.category_id" />
                    </div>
                    <div class="grid gap-2">
                        <Label>Tags</Label>
                        <div class="flex flex-wrap gap-2">
                            <label
                                v-for="t in (tags || [])"
                                :key="t.id"
                                class="flex items-center gap-2"
                            >
                                <input
                                    v-model="form.tags"
                                    type="checkbox"
                                    :value="t.id"
                                    class="rounded border-sidebar-border"
                                />
                                <span class="text-sm">{{ t.name }}</span>
                            </label>
                        </div>
                        <InputError :message="form.errors.tags" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="published_at">Published at</Label>
                        <Input
                            id="published_at"
                            v-model="form.published_at"
                            type="datetime-local"
                        />
                        <InputError :message="form.errors.published_at" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/posts">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
