<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref, computed, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import RichTextEditor from '@/components/RichTextEditor.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeReachSection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.homeReachSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    items: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
});

const items = computed(() => section.value.items ?? []);

const itemForm = useForm({
    value: '',
    suffix: '',
    label: '',
    image: null,
    link_url: '',
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
    itemForm.post('/admin/impact-and-milestones/items', {
        forceFormData: true,
        onSuccess: () => {
            if (itemImagePreviewUrl.value) {
                URL.revokeObjectURL(itemImagePreviewUrl.value);
                itemImagePreviewUrl.value = null;
            }
            itemForm.image = null;
            itemForm.value = '';
            itemForm.suffix = '';
            itemForm.label = '';
            itemForm.link_url = '';
            itemForm.order = items.value.length;
            const input = document.getElementById('item_image');
            if (input) {
                input.value = '';
            }
        },
    });
}

function removeItem(itemId) {
    if (confirm('Remove this stat card?')) {
        router.delete(`/admin/impact-and-milestones-items/${itemId}`);
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Impact & Milestones', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Impact & Milestones" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Impact & Milestones"
                    description="Edit the badge, title and description shown on the home and about pages."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/impact-and-milestones')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Our Reach"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Our Impact & Milestones"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description (rich text)</Label>
                        <RichTextEditor
                            id="description"
                            v-model="form.description"
                            placeholder="Enter description..."
                        />
                        <InputError :message="form.errors.description" />
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
                        <span class="font-medium">Stat cards</span>
                        <p class="text-sm text-muted-foreground">
                            Add stat cards with value, label, image and link, or edit and remove existing ones.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form
                            class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2"
                            @submit.prevent="addItem"
                        >
                            <div class="grid gap-2">
                                <Label for="item_value">Value</Label>
                                <Input
                                    id="item_value"
                                    v-model="itemForm.value"
                                    type="text"
                                    placeholder="e.g. 2500"
                                />
                                <InputError :message="itemForm.errors.value" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="item_suffix">Suffix</Label>
                                <Input
                                    id="item_suffix"
                                    v-model="itemForm.suffix"
                                    type="text"
                                    placeholder="e.g. + or %"
                                />
                                <InputError :message="itemForm.errors.suffix" />
                            </div>
                            <div class="sm:col-span-2">
                                <Label for="item_label">Label</Label>
                                <Input
                                    id="item_label"
                                    v-model="itemForm.label"
                                    type="text"
                                    placeholder="e.g. Apprenticeship"
                                />
                                <InputError :message="itemForm.errors.label" />
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
                                        Chosen image. Click “Add stat card” to upload.
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
                            <div class="sm:col-span-2">
                                <Label for="item_link_url">Link URL</Label>
                                <Input
                                    id="item_link_url"
                                    v-model="itemForm.link_url"
                                    type="text"
                                    placeholder="https:// or /path"
                                />
                                <InputError :message="itemForm.errors.link_url" />
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
                                    Add stat card
                                </Button>
                            </div>
                        </form>

                        <div class="overflow-x-auto rounded-md border border-sidebar-border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-sidebar-border bg-muted/50">
                                        <th class="px-4 py-3 text-left font-medium">Image</th>
                                        <th class="px-4 py-3 text-left font-medium">Value</th>
                                        <th class="px-4 py-3 text-left font-medium">Label</th>
                                        <th class="px-4 py-3 text-left font-medium">Link</th>
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
                                                    :alt="item.label || 'Stat'"
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
                                        <td class="px-4 py-3 font-medium">
                                            {{ item.value }}{{ item.suffix }}
                                        </td>
                                        <td class="px-4 py-3 text-muted-foreground">
                                            {{ item.label || '—' }}
                                        </td>
                                        <td class="px-4 py-3 truncate max-w-[120px]">
                                            {{ item.link_url || '—' }}
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
                                                    <Link :href="`/admin/impact-and-milestones-items/${item.id}/edit`">
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
                                No stat cards yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
