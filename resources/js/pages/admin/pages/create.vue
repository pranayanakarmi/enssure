<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import CopyablePublicUrl from '@/components/CopyablePublicUrl.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { usePagePublicUrl } from '@/composables/usePagePublicUrl';

defineProps({
    pages: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    parent_id: '',
    published_at: '',
});

const { publicPageUrl } = usePagePublicUrl(form);

const breadcrumbItems = [
    { title: 'Pages', href: '/admin/pages' },
    { title: 'Create', href: '/admin/pages/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create page" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create page"
                    description="Add a new page with rich text. Published pages appear at /pages/your-slug."
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/pages')"
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
                            placeholder="Auto-generated from title if empty"
                        />
                        <InputError :message="form.errors.slug" />
                    </div>
                    <CopyablePublicUrl
                        v-if="form.published_at && publicPageUrl"
                        :url="publicPageUrl"
                        label="Public page URL"
                    />
                    <div class="grid gap-2">
                        <Label for="meta_title">Meta title (SEO)</Label>
                        <Input
                            id="meta_title"
                            v-model="form.meta_title"
                            type="text"
                            placeholder="Optional; defaults to page title in the browser tab"
                        />
                        <InputError :message="form.errors.meta_title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="meta_description">Meta description (SEO)</Label>
                        <textarea
                            id="meta_description"
                            v-model="form.meta_description"
                            rows="3"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Optional summary for search engines"
                        />
                        <InputError :message="form.errors.meta_description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="content">Content</Label>
                        <RichTextEditor
                            id="content"
                            v-model="form.content"
                            placeholder="Enter page content..."
                        />
                        <InputError :message="form.errors.content" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="parent_id">Parent</Label>
                        <select
                            id="parent_id"
                            v-model="form.parent_id"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">— None —</option>
                            <option
                                v-for="p in (pages || [])"
                                :key="p.id"
                                :value="p.id"
                            >
                                {{ p.title }}
                            </option>
                        </select>
                        <InputError :message="form.errors.parent_id" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="published_at">Published at</Label>
                        <p class="text-xs text-muted-foreground">
                            Pages only appear publicly when this is set and not in the future. Clear to save as a draft.
                        </p>
                        <Input
                            id="published_at"
                            v-model="form.published_at"
                            type="datetime-local"
                        />
                        <InputError :message="form.errors.published_at" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/pages">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
