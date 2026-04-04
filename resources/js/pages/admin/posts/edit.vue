<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { Trash2 } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import CopyablePublicUrl from '@/components/CopyablePublicUrl.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePostPublicUrl } from '@/composables/usePostPublicUrl';
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
    image: null,
    remove_image: false,
    category_id: props.post.category_id ?? '',
    published_at: props.post.published_at ? props.post.published_at.slice(0, 16) : '',
    tags: props.post.tags ?? [],
});

const { publicPostUrl } = usePostPublicUrl(form);

const imagePreviewUrl = ref(null);

function onImageChange(event) {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.image = file;
    form.remove_image = false;
    if (file) {
        imagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
    }
});

const imageDisplayUrl = computed(() => {
    if (form.remove_image) {
        return null;
    }

    return imagePreviewUrl.value ?? props.post.image_url;
});

const removeImageInputRef = ref(null);

function removeImage() {
    form.remove_image = true;
    form.image = null;
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    if (removeImageInputRef.value) {
        removeImageInputRef.value.value = '';
    }
}

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
                    @submit.prevent="form.put(`/admin/posts/${post.id}`, { forceFormData: true })"
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
                    <CopyablePublicUrl :url="publicPostUrl" />
                    <div class="grid gap-2">
                        <Label for="image">Featured image</Label>
                        <div
                            v-if="imageDisplayUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="imageDisplayUrl"
                                alt="Preview"
                                class="h-32 w-40 shrink-0 rounded border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Current or chosen image. Select a new file to replace, or remove it.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="removeImage"
                                >
                                    <Trash2 class="size-3.5" />
                                    Remove image
                                </button>
                            </div>
                        </div>
                        <div class="max-w-md">
                            <input
                                ref="removeImageInputRef"
                                id="image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.image" />
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
                        <RichTextEditor
                            id="content"
                            v-model="form.content"
                            placeholder="Enter post content..."
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
                        <p class="text-xs text-muted-foreground">
                            Clear to keep as draft. The live post URL only works when this is set and not in the future.
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
