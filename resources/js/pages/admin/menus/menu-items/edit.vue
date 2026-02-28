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
    menuItem: {
        type: Object,
        required: true,
    },
    menu: {
        type: Object,
        required: true,
    },
    parentOptions: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    title: props.menuItem.title ?? '',
    url: props.menuItem.url ?? '',
    parent_id: props.menuItem.parent_id ?? '',
    target: props.menuItem.target ?? '_self',
    order: props.menuItem.order ?? 0,
});

const breadcrumbItems = [
    { title: 'Menus', href: '/admin/menus' },
    { title: props.menu.name, href: `/admin/menus/${props.menu.id}/edit` },
    { title: 'Edit item', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit menu item" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit menu item"
                    :description="menu.name"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/menu-items/${menuItem.id}`)"
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
                        <Label for="url">URL</Label>
                        <Input
                            id="url"
                            v-model="form.url"
                            type="text"
                            placeholder="/page or https://..."
                        />
                        <InputError :message="form.errors.url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="parent_id">Parent item</Label>
                        <select
                            id="parent_id"
                            v-model="form.parent_id"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="">— None (top level) —</option>
                            <option
                                v-for="opt in (parentOptions || [])"
                                :key="opt.id"
                                :value="opt.id"
                            >
                                {{ opt.title }}
                            </option>
                        </select>
                        <InputError :message="form.errors.parent_id" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="target">Open in</Label>
                        <select
                            id="target"
                            v-model="form.target"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="_self">Same tab</option>
                            <option value="_blank">New tab</option>
                        </select>
                        <InputError :message="form.errors.target" />
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
                            :href="`/admin/menus/${menu.id}/edit`"
                            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        >
                            Back to menu
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
