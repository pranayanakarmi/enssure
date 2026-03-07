<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    footerLink: {
        type: Object,
        required: true,
    },
    footerColumn: {
        type: Object,
        required: true,
    },
});

const link = computed(() => props.footerLink);
const column = computed(() => props.footerColumn);

const form = useForm({
    label: link.value?.label ?? '',
    url: link.value?.url ?? '#',
    order: link.value?.order ?? 0,
});


const breadcrumbItems = [
    { title: 'Footer', href: '/admin/footer-columns' },
    { title: 'Footer columns', href: '/admin/footer-columns' },
    { title: column.value?.title, href: `/admin/footer-columns/${column.value?.id}/edit` },
    { title: 'Edit link', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit footer link" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit footer link"
                    :description="`Column: ${column.title}`"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/footer-links/${link.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="label">Label</Label>
                        <Input
                            id="label"
                            v-model="form.label"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.label" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="url">URL</Label>
                        <Input
                            id="url"
                            v-model="form.url"
                            type="text"
                            placeholder="#"
                        />
                        <InputError :message="form.errors.url" />
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
                            <Link :href="`/admin/footer-columns/${column.id}/edit`">Back to column</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
