<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeCoverageSectionItem: {
        type: Object,
        required: true,
    },
    section: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    value: props.homeCoverageSectionItem.value ?? '',
    label: props.homeCoverageSectionItem.label ?? '',
    icon: null,
    order: props.homeCoverageSectionItem.order ?? 0,
    _method: 'put',
});

function submitForm() {
    form.post(`/admin/home-coverage-section-items/${props.homeCoverageSectionItem.id}`, {
        forceFormData: true,
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Coverage section', href: '/admin/home-coverage-section/edit' },
    { title: 'Edit stat', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit coverage stat" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit coverage stat"
                    description="Update value, label and icon for this stat."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="submitForm"
                >
                    <div class="grid gap-2">
                        <Label for="value">Value</Label>
                        <Input
                            id="value"
                            v-model="form.value"
                            type="text"
                            placeholder="e.g. 308"
                        />
                        <InputError :message="form.errors.value" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="label">Label</Label>
                        <Input
                            id="label"
                            v-model="form.label"
                            type="text"
                            placeholder="e.g. Planned Events"
                        />
                        <InputError :message="form.errors.label" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="icon">Icon (optional)</Label>
                        <div
                            v-if="homeCoverageSectionItem.icon_url"
                            class="mb-2"
                        >
                            <img
                                :src="homeCoverageSectionItem.icon_url"
                                alt="Current icon"
                                class="h-10 w-10 rounded border object-contain"
                            />
                            <p class="mt-1 text-xs text-muted-foreground">
                                Current icon. Choose a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="icon"
                                type="file"
                                accept="image/*,.svg,image/svg+xml"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="form.icon = $event.target.files?.[0] || null"
                            />
                        </div>
                        <InputError :message="form.errors.icon" />
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
                            <Link href="/admin/home-coverage-section/edit">Back to Coverage section</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
