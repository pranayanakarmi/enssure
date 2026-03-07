<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, computed, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeGallerySection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.homeGallerySection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    cta_text: '',
    cta_url: '',
    items: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
});

const items = computed(() => section.value.items ?? []);

const itemForm = useForm({
    text: '',
    image: null,
    order: items.value.length,
});

const itemImagePreviewUrl = ref(null);

function onItemImageChange(event) {
    if (itemImagePreviewUrl.value) {
        URL.revokeObjectURL(itemImagePreviewUrl.value);
        itemImagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    itemForm.image = file;
    if (file) {
        itemImagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (itemImagePreviewUrl.value) {
        URL.revokeObjectURL(itemImagePreviewUrl.value);
    }
});

function addItem() {
    itemForm.post('/admin/home-gallery-section/items', {
        forceFormData: true,
        onSuccess: () => {
            if (itemImagePreviewUrl.value) {
                URL.revokeObjectURL(itemImagePreviewUrl.value);
                itemImagePreviewUrl.value = null;
            }
            itemForm.image = null;
            itemForm.text = '';
            itemForm.order = items.value.length;
            const input = document.getElementById('item_image');
            if (input) {
                input.value = '';
            }
        },
    });
}

function removeItem(itemId) {
    if (confirm('Remove this gallery item?')) {
        router.delete(`/admin/home-gallery-section-items/${itemId}`);
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin' },
    { title: 'Gallery section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Gallery section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Gallery section"
                    description="Edit the badge, title, description and CTA shown on the home page gallery block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/home-gallery-section')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Gallery"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. The ENSSURE Journey in Pictures"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Section description..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_text">CTA button text</Label>
                        <Input
                            id="cta_text"
                            v-model="form.cta_text"
                            type="text"
                            placeholder="e.g. View all gallery"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /galleries"
                        />
                        <InputError :message="form.errors.cta_url" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button
                            type="submit"
                            :disabled="form.processing"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            as-child
                        >
                            <Link href="/admin">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Gallery items</span>
                        <p class="text-sm text-muted-foreground">
                            Add gallery items with image and caption text, or edit and remove existing ones.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form
                            class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2"
                            @submit.prevent="addItem"
                        >
                            <div class="sm:col-span-2">
                                <Label for="item_text">Caption text</Label>
                                <Input
                                    id="item_text"
                                    v-model="itemForm.text"
                                    type="text"
                                    placeholder="e.g. This section provides a visual record..."
                                />
                                <InputError :message="itemForm.errors.text" />
                            </div>
                            <div class="sm:col-span-2">
                                <Label for="item_image">Image</Label>
                                <div
                                    v-if="itemImagePreviewUrl"
                                    class="mb-3 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                                >
                                    <img
                                        :src="itemImagePreviewUrl"
                                        alt="Preview"
                                        class="h-24 w-40 rounded border object-cover"
                                    />
                                    <p class="text-xs text-muted-foreground">
                                        Chosen image. Click “Add gallery item” to upload.
                                    </p>
                                </div>
                                <div class="max-w-md">
                                    <input
                                        id="item_image"
                                        type="file"
                                        accept="image/*"
                                        class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                        @change="onItemImageChange"
                                    />
                                </div>
                                <InputError :message="itemForm.errors.image" />
                            </div>
                            <div>
                                <Label for="item_order">Order</Label>
                                <Input
                                    id="item_order"
                                    v-model.number="itemForm.order"
                                    type="number"
                                    min="0"
                                />
                                <InputError :message="itemForm.errors.order" />
                            </div>
                            <div class="flex items-end">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    :disabled="itemForm.processing"
                                >
                                    Add gallery item
                                </Button>
                            </div>
                        </form>

                        <div class="overflow-x-auto rounded-md border border-sidebar-border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-sidebar-border bg-muted/50">
                                        <th class="px-4 py-3 text-left font-medium">Image</th>
                                        <th class="px-4 py-3 text-left font-medium">Text</th>
                                        <th class="px-4 py-3 text-left font-medium">Order</th>
                                        <th class="px-4 py-3 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in items"
                                        :key="item.id"
                                        class="border-b border-sidebar-border last:border-0"
                                    >
                                        <td class="px-4 py-3">
                                            <div class="h-14 w-24 overflow-hidden rounded border bg-muted">
                                                <img
                                                    v-if="item.image_url"
                                                    :src="item.image_url"
                                                    alt=""
                                                    class="h-full w-full object-cover"
                                                />
                                                <div
                                                    v-else
                                                    class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                                >
                                                    No image
                                                </div>
                                            </div>
                                        </td>
                                        <td class="max-w-[200px] truncate px-4 py-3 text-muted-foreground">
                                            {{ item.text || '—' }}
                                        </td>
                                        <td class="px-4 py-3">
                                            {{ item.order }}
                                        </td>
                                        <td class="px-4 py-3 text-right">
                                            <div class="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    as-child
                                                >
                                                    <Link :href="`/admin/home-gallery-section-items/${item.id}/edit`">
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    type="button"
                                                    @click="removeItem(item.id)"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div
                                v-if="!items.length"
                                class="py-8 text-center text-sm text-muted-foreground"
                            >
                                No gallery items yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
