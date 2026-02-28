<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Head, Link, router } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    slider: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: props.slider.name ?? '',
    location: props.slider.location ?? '',
});

const itemForm = useForm({
    title: '',
    subtitle: '',
    description: '',
    image: null,
    link_url: '',
    link_text: '',
    order: (props.slider.items || []).length,
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
    itemForm.post(`/admin/sliders/${props.slider.id}/items`, {
        forceFormData: true,
        onSuccess: () => {
            if (itemImagePreviewUrl.value) {
                URL.revokeObjectURL(itemImagePreviewUrl.value);
                itemImagePreviewUrl.value = null;
            }
            itemForm.image = null;
            const input = document.getElementById('item_image');
            if (input) {
                input.value = '';
            }
        },
    });
}

function removeItem(itemId) {
    if (confirm('Remove this slide?')) {
        router.delete(`/admin/slider-items/${itemId}`);
    }
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Sliders', href: '/admin/sliders' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit slider" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit slider"
                    :description="`Slider: ${slider.name}`"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/sliders/${slider.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="location">Location</Label>
                        <Input
                            id="location"
                            v-model="form.location"
                            type="text"
                        />
                        <InputError :message="form.errors.location" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save slider
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/sliders">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Slider items</span>
                        <p class="text-sm text-muted-foreground">
                            Add slides with image upload, or edit and remove existing ones.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form
                            class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2"
                            @submit.prevent="addItem"
                        >
                            <div class="sm:col-span-2">
                                <Label for="item_title">New slide – Title</Label>
                                <Input
                                    id="item_title"
                                    v-model="itemForm.title"
                                    type="text"
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.title" />
                            </div>
                            <div>
                                <Label for="item_subtitle">Subtitle</Label>
                                <Input
                                    id="item_subtitle"
                                    v-model="itemForm.subtitle"
                                    type="text"
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.subtitle" />
                            </div>
                            <div>
                                <Label for="item_order">Order</Label>
                                <Input
                                    id="item_order"
                                    v-model.number="itemForm.order"
                                    type="number"
                                    min="0"
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.order" />
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
                                        Chosen image. Click “Add slide” to upload, or pick another file.
                                    </p>
                                </div>
                                <div class="mt-1 max-w-md">
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
                                <Label for="item_link_url">Link URL</Label>
                                <Input
                                    id="item_link_url"
                                    v-model="itemForm.link_url"
                                    type="text"
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.link_url" />
                            </div>
                            <div>
                                <Label for="item_link_text">Link text</Label>
                                <Input
                                    id="item_link_text"
                                    v-model="itemForm.link_text"
                                    type="text"
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.link_text" />
                            </div>
                            <div class="sm:col-span-2">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    :disabled="itemForm.processing"
                                >
                                    Add slide
                                </Button>
                            </div>
                        </form>

                        <div class="overflow-x-auto rounded-md border border-sidebar-border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-sidebar-border bg-muted/50">
                                        <th class="px-4 py-3 text-left font-medium">Image</th>
                                        <th class="px-4 py-3 text-left font-medium">Title</th>
                                        <th class="px-4 py-3 text-left font-medium">Subtitle</th>
                                        <th class="px-4 py-3 text-left font-medium">Order</th>
                                        <th class="px-4 py-3 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in (slider.items || [])"
                                        :key="item.id"
                                        class="border-b border-sidebar-border last:border-0"
                                    >
                                        <td class="px-4 py-3">
                                            <div class="h-14 w-24 overflow-hidden rounded border bg-muted">
                                                <img
                                                    v-if="item.image_url"
                                                    :src="item.image_url"
                                                    :alt="item.title || 'Slide'"
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
                                            {{ item.title || '—' }}
                                        </td>
                                        <td class="px-4 py-3 text-muted-foreground">
                                            {{ item.subtitle || '—' }}
                                        </td>
                                        <td class="px-4 py-3">
                                            {{ item.order }}
                                        </td>
                                        <td class="px-4 py-3 text-right">
                                            <div class="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" as-child>
                                                    <Link :href="`/admin/slider-items/${item.id}/edit`">
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
                                v-if="!(slider.items || []).length"
                                class="py-8 text-center text-sm text-muted-foreground"
                            >
                                No slides yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
