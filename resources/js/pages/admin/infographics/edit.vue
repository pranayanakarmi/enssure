<script setup>
import { reorder } from '@/actions/App/Http/Controllers/Admin/InfographicItemController';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { Check, Copy, GripVertical } from 'lucide-vue-next';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    infographic: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    title: props.infographic.title ?? '',
    slug: props.infographic.slug ?? '',
});

const itemForm = useForm({
    title: '',
    sort_order: (props.infographic.items || []).length,
    image: null,
});

const localItems = ref([...(props.infographic.items || [])]);
const draggingItemId = ref(null);
const isSavingItemOrder = ref(false);

watch(
    () => props.infographic.items,
    (nextItems) => {
        localItems.value = [...(nextItems || [])];
    },
);

const breadcrumbItems = [
    { title: 'Infographics Page', href: '#' },
    { title: 'Infographics', href: '/admin/infographics' },
    { title: 'Edit', href: '#' },
];

const submitUrl = computed(() => `/admin/infographics/${props.infographic.slug}`);

const publicUrlCopied = ref(false);
let publicUrlCopyTimer = null;

const publicPageAbsoluteUrl = computed(() => {
    const slug = (form.slug ?? '').trim() || props.infographic.slug;
    if (!slug || typeof window === 'undefined') {
        return props.infographic.public_url;
    }

    return `${window.location.origin}/infographics/${slug}`;
});

async function copyPublicPageUrl() {
    const url = publicPageAbsoluteUrl.value;
    if (!url) {
        return;
    }
    try {
        await navigator.clipboard.writeText(url);
        publicUrlCopied.value = true;
        if (publicUrlCopyTimer) {
            clearTimeout(publicUrlCopyTimer);
        }
        publicUrlCopyTimer = setTimeout(() => {
            publicUrlCopied.value = false;
        }, 2000);
    } catch {
        // Clipboard may be unavailable (permissions, non-secure context).
    }
}

function addItem() {
    itemForm.post(`/admin/infographics/${props.infographic.slug}/items`, { forceFormData: true });
}

function removeItem(itemId) {
    if (confirm('Delete this infographic item?')) {
        router.delete(`/admin/infographic-items/${itemId}`);
    }
}

function onItemDragStart(itemId) {
    draggingItemId.value = itemId;
}

function onItemDragOver(event) {
    event.preventDefault();
}

function moveItemBefore(targetId) {
    if (!draggingItemId.value || draggingItemId.value === targetId) {
        return;
    }

    const items = [...localItems.value];
    const sourceIndex = items.findIndex((item) => item.id === draggingItemId.value);
    const targetIndex = items.findIndex((item) => item.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
        return;
    }

    const [moved] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, moved);

    localItems.value = items.map((item, index) => ({
        ...item,
        sort_order: index,
    }));
}

function saveItemOrder() {
    if (!localItems.value.length) {
        draggingItemId.value = null;

        return;
    }

    isSavingItemOrder.value = true;

    router.post(
        reorder.url(props.infographic.slug),
        {
            item_ids: localItems.value.map((item) => item.id),
        },
        {
            preserveScroll: true,
            onFinish: () => {
                draggingItemId.value = null;
                isSavingItemOrder.value = false;
            },
        },
    );
}

function onItemDrop(targetId) {
    moveItemBefore(targetId);
    saveItemOrder();
}

onBeforeUnmount(() => {
    if (publicUrlCopyTimer) {
        clearTimeout(publicUrlCopyTimer);
    }
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit infographic" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <form
                    class="space-y-6"
                    @submit.prevent="form.put(submitUrl)"
                >
                    <header class="">
                        <h2 class="mb-2 text-base font-medium">Edit infographic</h2>
                        <div class="grid max-w-2xl gap-2">
                            <Label for="infographic_title">Title</Label>
                            <Input
                                id="infographic_title"
                                v-model="form.title"
                                type="text"
                                required
                                class="text-base font-medium"
                                placeholder="Public name for this infographic"
                            />
                            <InputError :message="form.errors.title" />
                        </div>
                    </header>

                    <div class="grid gap-2">
                        <Label for="slug">Slug</Label>
                        <Input
                            id="slug"
                            v-model="form.slug"
                            type="text"
                            required
                            placeholder="URL segment for this infographic"
                        />
                        <div class="flex flex-wrap items-center gap-2">
                            <p class="text-xs text-muted-foreground">
                                Public URL: /infographics/{{ form.slug || infographic.slug || '…' }}
                            </p>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                                :title="publicUrlCopied ? 'Copied' : 'Copy full URL'"
                                @click="copyPublicPageUrl"
                            >
                                <Check v-if="publicUrlCopied" class="size-3.5 text-green-600" />
                                <Copy v-else class="size-3.5" />
                                <span class="ml-1">{{ publicUrlCopied ? 'Copied' : 'Copy' }}</span>
                            </Button>
                        </div>
                        <InputError :message="form.errors.slug" />
                    </div>
                    <div class="flex flex-wrap items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/infographics">Cancel</Link>
                        </Button>
                        <Button variant="outline" as-child>
                            <a :href="infographic.public_url" target="_blank" rel="noopener noreferrer">View public page</a>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Infographic list</span>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2" @submit.prevent="addItem">
                            <div>
                                <Label for="item_title">New item - Title</Label>
                                <Input id="item_title" v-model="itemForm.title" type="text" required class="mt-1" />
                                <InputError :message="itemForm.errors.title" />
                            </div>
                            <div>
                                <Label for="item_sort_order">Sort order</Label>
                                <Input id="item_sort_order" v-model.number="itemForm.sort_order" type="number" min="0" class="mt-1" />
                                <InputError :message="itemForm.errors.sort_order" />
                            </div>
                            <div class="sm:col-span-2">
                                <Label for="item_image">Image</Label>
                                <div class="mt-1 max-w-md">
                                    <input
                                        id="item_image"
                                        type="file"
                                        accept="image/*"
                                        required
                                        class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                        @change="itemForm.image = $event.target.files?.[0] || null"
                                    />
                                </div>
                                <InputError :message="itemForm.errors.image" />
                            </div>
                            <div class="sm:col-span-2">
                                <Button type="submit" variant="secondary" :disabled="itemForm.processing">Add item</Button>
                            </div>
                        </form>

                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="item in localItems"
                                :key="item.id"
                                draggable="true"
                                class="flex flex-wrap items-center justify-between gap-4 py-3"
                                @dragstart="onItemDragStart(item.id)"
                                @dragover="onItemDragOver"
                                @drop="onItemDrop(item.id)"
                            >
                                <div class="flex min-w-0 flex-1 items-center gap-3">
                                    <GripVertical
                                        class="size-4 shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing"
                                        aria-hidden="true"
                                    />
                                    <img :src="item.image_url" :alt="item.title" class="h-14 w-20 shrink-0 rounded border object-cover" />
                                    <div class="min-w-0">
                                        <p class="truncate text-sm font-medium">{{ item.title }}</p>
                                        <p class="truncate text-xs text-muted-foreground">Sort order: {{ item.sort_order }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/infographic-items/${item.id}/edit`">Edit</Link>
                                    </Button>
                                    <Button variant="destructive" size="sm" type="button" @click="removeItem(item.id)">Delete</Button>
                                </div>
                            </div>
                            <div v-if="!localItems.length" class="py-6 text-center text-sm text-muted-foreground">
                                No infographic items yet.
                            </div>
                        </div>
                        <p v-if="isSavingItemOrder" class="pt-2 text-xs text-muted-foreground">
                            Saving order…
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
