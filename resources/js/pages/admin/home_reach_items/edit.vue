<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeReachItem: {
        type: Object,
        required: true,
    },
    section: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    value: props.homeReachItem.value ?? '',
    suffix: props.homeReachItem.suffix ?? '',
    label: props.homeReachItem.label ?? '',
    image: null,
    link_url: props.homeReachItem.link_url ?? '',
    order: props.homeReachItem.order ?? 0,
    _method: 'put',
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Impact & Milestones', href: '/admin/impact-and-milestones/edit' },
    { title: 'Edit stat card', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit stat card" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit stat card"
                    description="Update value, label, image and link for this stat card."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.post(`/admin/impact-and-milestones-items/${homeReachItem.id}`, { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="value">Value</Label>
                        <Input
                            id="value"
                            v-model="form.value"
                            type="text"
                            placeholder="e.g. 2500"
                        />
                        <InputError :message="form.errors.value" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="suffix">Suffix</Label>
                        <Input
                            id="suffix"
                            v-model="form.suffix"
                            type="text"
                            placeholder="e.g. + or %"
                        />
                        <InputError :message="form.errors.suffix" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="label">Label</Label>
                        <Input
                            id="label"
                            v-model="form.label"
                            type="text"
                            placeholder="e.g. Apprenticeship"
                        />
                        <InputError :message="form.errors.label" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image</Label>
                        <div
                            v-if="homeReachItem.image_url"
                            class="mb-2"
                        >
                            <img
                                :src="homeReachItem.image_url"
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
                            placeholder="https:// or /path"
                        />
                        <InputError :message="form.errors.link_url" />
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
                            <Link href="/admin/impact-and-milestones/edit">Back to Impact & Milestones</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
