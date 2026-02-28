<script setup>
import { computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { Head, Link, router } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    menu: {
        type: Object,
        required: true,
    },
});

/** Flatten items into tree order (parents first, then children, with depth for indent). */
function itemsInTreeOrder(items) {
    if (!items?.length) return [];
    const byParent = {};
    items.forEach((i) => {
        const key = i.parent_id == null || i.parent_id === '' ? '__root' : String(i.parent_id);
        if (!byParent[key]) byParent[key] = [];
        byParent[key].push({ ...i });
    });
    const out = [];
    function append(parentKey, depth) {
        const list = byParent[parentKey] || [];
        list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        list.forEach((item) => {
            out.push({ ...item, depth });
            append(String(item.id), depth + 1);
        });
    }
    append('__root', 0);
    return out;
}

const menuItemsTree = computed(() => itemsInTreeOrder(props.menu.items || []));

const form = useForm({
    name: props.menu.name ?? '',
    is_published: Boolean(props.menu.is_published ?? false),
    is_main_header_menu: Boolean(props.menu.is_main_header_menu ?? false),
});

function submitMenu() {
    form.put(`/admin/menus/${props.menu.id}`);
}

const itemForm = useForm({
    title: '',
    url: '',
    parent_id: '',
    target: '_self',
    order: (props.menu.items || []).length,
});

function addItem() {
    itemForm.post(`/admin/menus/${props.menu.id}/items`, {
        onSuccess: () => {
            itemForm.title = '';
            itemForm.url = '';
            itemForm.parent_id = '';
            itemForm.target = '_self';
            itemForm.order = (props.menu.items || []).length;
            itemForm.clearErrors();
        },
    });
}

function removeItem(itemId) {
    if (confirm('Remove this menu item?')) {
        router.delete(`/admin/menu-items/${itemId}`);
    }
}

const breadcrumbItems = [
    { title: 'Menus', href: '/admin/menus' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit menu" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit menu"
                    :description="menu.name"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="submitMenu()"
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
                    <div class="flex flex-wrap items-center gap-6">
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="is_published"
                                v-model="form.is_published"
                            />
                            <Label for="is_published" class="cursor-pointer font-normal">Publish</Label>
                        </div>
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="is_main_header_menu"
                                v-model="form.is_main_header_menu"
                            />
                            <Label for="is_main_header_menu" class="cursor-pointer font-normal">Main header menu</Label>
                        </div>
                    </div>
                    <InputError :message="form.errors.is_published" />
                    <InputError :message="form.errors.is_main_header_menu" />
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/menus">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Menu items</span>
                        <p class="text-sm text-muted-foreground">
                            Add links or edit and remove existing items.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form
                            class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2"
                            @submit.prevent="addItem"
                        >
                            <div class="sm:col-span-2">
                                <Label for="item_title">New item – Title</Label>
                                <Input
                                    id="item_title"
                                    v-model="itemForm.title"
                                    type="text"
                                    required
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.title" />
                            </div>
                            <div>
                                <Label for="item_url">URL</Label>
                                <Input
                                    id="item_url"
                                    v-model="itemForm.url"
                                    type="text"
                                    placeholder="/page or https://..."
                                    class="mt-1"
                                />
                                <InputError :message="itemForm.errors.url" />
                            </div>
                            <div>
                                <Label for="item_parent_id">Parent</Label>
                                <select
                                    id="item_parent_id"
                                    v-model="itemForm.parent_id"
                                    class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="">— None —</option>
                                    <option
                                        v-for="opt in (menu.parentOptions || [])"
                                        :key="opt.id"
                                        :value="opt.id"
                                    >
                                        {{ opt.title }}
                                    </option>
                                </select>
                                <InputError :message="itemForm.errors.parent_id" />
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
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    :disabled="itemForm.processing"
                                >
                                    Add item
                                </Button>
                            </div>
                        </form>

                        <div class="overflow-x-auto rounded-md border border-sidebar-border">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b border-sidebar-border bg-muted/50">
                                        <th class="px-4 py-3 text-left font-medium">Title</th>
                                        <th class="px-4 py-3 text-left font-medium">URL</th>
                                        <th class="px-4 py-3 text-left font-medium w-20">Order</th>
                                        <th class="px-4 py-3 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in menuItemsTree"
                                        :key="item.id"
                                        class="border-b border-sidebar-border last:border-0"
                                        :class="item.depth > 0 ? 'bg-muted/20' : ''"
                                    >
                                        <td class="px-4 py-3 font-medium" :style="{ paddingLeft: `${12 + item.depth * 24}px` }">
                                            <span v-if="item.depth > 0" class="text-muted-foreground/70">↳ </span>
                                            {{ item.title || item.url || '(No title)' }}
                                        </td>
                                        <td class="px-4 py-3 text-muted-foreground">
                                            {{ item.url || '—' }}
                                        </td>
                                        <td class="px-4 py-3">
                                            {{ item.order }}
                                        </td>
                                        <td class="px-4 py-3 text-right">
                                            <div class="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" as-child>
                                                    <Link :href="`/admin/menu-items/${item.id}/edit`">
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
                                v-if="!menuItemsTree.length"
                                class="py-8 text-center text-sm text-muted-foreground"
                            >
                                No items yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
