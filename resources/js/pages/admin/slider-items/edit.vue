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
    sliderItem: {
        type: Object,
        required: true,
    },
    slider: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.sliderItem.title ?? '',
    subtitle: props.sliderItem.subtitle ?? '',
    description: props.sliderItem.description ?? '',
    image: null,
    link_url: props.sliderItem.link_url ?? '',
    link_text: props.sliderItem.link_text ?? '',
    order: props.sliderItem.order ?? 0,
    _method: 'put',
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Sliders', href: '/admin/sliders' },
    { title: props.slider.name, href: `/admin/sliders/${props.slider.id}/edit` },
    { title: 'Edit slide', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit slider item" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit slide"
                    :description="`Slider: ${slider.name}`"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post(`/admin/slider-items/${sliderItem.id}`, { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="subtitle">Subtitle</Label>
                        <Input
                            id="subtitle"
                            v-model="form.subtitle"
                            type="text"
                        />
                        <InputError :message="form.errors.subtitle" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="3"
                            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image</Label>
                        <div v-if="sliderItem.image_url" class="mb-2">
                            <img
                                :src="sliderItem.image_url"
                                alt="Current"
                                class="h-24 w-auto rounded border object-cover"
                            />
                            <p class="mt-1 text-xs text-muted-foreground">
                                Current image. Choose a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="form.image = $event.target.files?.[0] || null"
                            />
                        </div>
                        <InputError :message="form.errors.image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="link_url">Link URL</Label>
                        <Input
                            id="link_url"
                            v-model="form.link_url"
                            type="text"
                        />
                        <InputError :message="form.errors.link_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="link_text">Link text</Label>
                        <Input
                            id="link_text"
                            v-model="form.link_text"
                            type="text"
                        />
                        <InputError :message="form.errors.link_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="order">Order</Label>
                        <Input
                            id="order"
                            v-model.number="form.order"
                            type="number"
                            min="0"
                        />
                        <InputError :message="form.errors.order" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Link
                            :href="`/admin/sliders/${slider.id}/edit`"
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                            Back to slider
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
