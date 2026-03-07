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
    homeCoverageSection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.homeCoverageSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    map_image_url: null,
    items: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    map_image: null,
    _method: 'put',
});

const items = computed(() => section.value.items ?? []);

const itemForm = useForm({
    value: '',
    label: '',
    icon: null,
    order: items.value.length,
});

const itemIconPreviewUrl = ref(null);

function onItemIconChange(event) {
    if (itemIconPreviewUrl.value) {
        URL.revokeObjectURL(itemIconPreviewUrl.value);
        itemIconPreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    itemForm.icon = file;
    if (file) {
        itemIconPreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (itemIconPreviewUrl.value) {
        URL.revokeObjectURL(itemIconPreviewUrl.value);
    }
});

function submitSection() {
    form.post('/admin/home-coverage-section', {
        forceFormData: true,
    });
}

function addItem() {
    itemForm.post('/admin/home-coverage-section/items', {
        forceFormData: true,
        onSuccess: () => {
            if (itemIconPreviewUrl.value) {
                URL.revokeObjectURL(itemIconPreviewUrl.value);
                itemIconPreviewUrl.value = null;
            }
            itemForm.icon = null;
            itemForm.value = '';
            itemForm.label = '';
            itemForm.order = items.value.length;
            const input = document.getElementById('item_icon');
            if (input) {
                input.value = '';
            }
        },
    });
}

function removeItem(itemId) {
    if (confirm('Remove this coverage stat?')) {
        router.delete(`/admin/home-coverage-section-items/${itemId}`);
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Coverage section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Coverage section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Coverage section"
                    description="Edit the badge, title, description and map image shown on the home page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="submitSection"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Coverage"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Reaching Across the Nation"
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
                    <div class="grid gap-2">
                        <Label for="map_image">Map image</Label>
                        <div
                            v-if="section.map_image_url"
                            class="mb-2"
                        >
                            <img
                                :src="section.map_image_url"
                                alt="Current map"
                                class="h-32 w-auto rounded border object-contain"
                            />
                            <p class="mt-1 text-xs text-muted-foreground">
                                Current map. Choose a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="map_image"
                                type="file"
                                accept="image/*,.svg,image/svg+xml"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="form.map_image = $event.target.files?.[0] || null"
                            />
                        </div>
                        <InputError :message="form.errors.map_image" />
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
                        <span class="font-medium">Coverage stats</span>
                        <p class="text-sm text-muted-foreground">
                            Add stats with value, label and optional icon, or edit and remove existing ones.
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
                                    placeholder="e.g. 308"
                                />
                                <InputError :message="itemForm.errors.value" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="item_label">Label</Label>
                                <Input
                                    id="item_label"
                                    v-model="itemForm.label"
                                    type="text"
                                    placeholder="e.g. Planned Events"
                                />
                                <InputError :message="itemForm.errors.label" />
                            </div>
                            <div class="sm:col-span-2">
                                <Label for="item_icon">Icon (optional)</Label>
                                <div
                                    v-if="itemIconPreviewUrl"
                                    class="mb-3 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                                >
                                    <img
                                        :src="itemIconPreviewUrl"
                                        alt="Preview"
                                        class="h-10 w-10 rounded border object-contain"
                                    />
                                    <p class="text-xs text-muted-foreground">
                                        Chosen icon. Click “Add stat” to upload.
                                    </p>
                                </div>
                                <div class="max-w-md">
                                    <input
                                        id="item_icon"
                                        type="file"
                                        accept="image/*,.svg,image/svg+xml"
                                        class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                        @change="onItemIconChange"
                                    />
                                </div>
                                <InputError :message="itemForm.errors.icon" />
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
                                    Add stat
                                </Button>
                            </div>
                        </form>

                        <div class="overflow-x-auto rounded-md border border-sidebar-border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-sidebar-border bg-muted/50">
                                        <th class="px-4 py-3 text-left font-medium">Icon</th>
                                        <th class="px-4 py-3 text-left font-medium">Value</th>
                                        <th class="px-4 py-3 text-left font-medium">Label</th>
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
                                            <div class="h-10 w-10 overflow-hidden rounded border bg-muted">
                                                <img
                                                    v-if="item.icon_url"
                                                    :src="item.icon_url"
                                                    :alt="item.label || 'Stat'"
                                                    class="h-full w-full object-contain"
                                                />
                                                <div
                                                    v-else
                                                    class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                                >
                                                    —
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 font-medium">
                                            {{ item.value }}
                                        </td>
                                        <td class="px-4 py-3 text-muted-foreground">
                                            {{ item.label || '—' }}
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
                                                    <Link :href="`/admin/home-coverage-section-items/${item.id}/edit`">
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
                                No stats yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
