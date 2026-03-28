<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed, onBeforeUnmount, ref } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    infographic: {
        type: Object,
        required: true,
    },
    infographicItem: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.infographicItem.title ?? '',
    sort_order: props.infographicItem.sort_order ?? 0,
    image: null,
});

const imagePreviewUrl = ref(null);

function onImageChange(event) {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
        imagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.image = file;
    if (file) {
        imagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value);
    }
});

const displayImageUrl = computed(() => imagePreviewUrl.value ?? props.infographicItem.image_url);

const breadcrumbItems = [
    { title: 'Infographics', href: '/admin/infographics' },
    { title: props.infographic.label, href: `/admin/infographics/${props.infographic.slug}/edit` },
    { title: 'Edit item', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit infographic item" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit infographic item" :description="`Infographic: ${props.infographic.label}`" />

                <form class="space-y-6" @submit.prevent="form.put(`/admin/infographic-items/${infographicItem.id}`, { forceFormData: true })">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" required />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="sort_order">Sort order</Label>
                        <Input id="sort_order" v-model.number="form.sort_order" type="number" min="0" />
                        <InputError :message="form.errors.sort_order" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image</Label>
                        <div v-if="displayImageUrl" class="mb-2">
                            <img :src="displayImageUrl" alt="Preview" class="h-24 w-auto rounded border object-cover" />
                            <p class="mt-1 text-xs text-muted-foreground">Current image. Choose a new file to replace it.</p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.image" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link :href="`/admin/infographics/${props.infographic.slug}/edit`">Back to infographic</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
