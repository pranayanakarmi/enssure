<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link, router } from '@inertiajs/vue3';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, ImageIcon, Layers } from 'lucide-vue-next';
import { ref, onBeforeUnmount, watch } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    slider: { type: Object, required: true },
});

// Slider settings form (compact)
const form = useForm({
    name: props.slider.name ?? '',
    location: props.slider.location ?? '',
});

// Add slide form
const newSlideOpen = ref(false);
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

function onItemImageChange(e) {
    if (itemImagePreviewUrl.value) URL.revokeObjectURL(itemImagePreviewUrl.value);
    const file = e.target.files?.[0] || null;
    itemForm.image = file;
    if (file) itemImagePreviewUrl.value = URL.createObjectURL(file);
}
onBeforeUnmount(() => {
    if (itemImagePreviewUrl.value) URL.revokeObjectURL(itemImagePreviewUrl.value);
});

function addItem() {
    itemForm.post(`/admin/sliders/${props.slider.id}/items`, {
        forceFormData: true,
        onSuccess: () => {
            if (itemImagePreviewUrl.value) URL.revokeObjectURL(itemImagePreviewUrl.value);
            itemForm.reset();
            itemForm.order = (props.slider.items || []).length;
            newSlideOpen.value = false;
            document.getElementById('item_image').value = '';
        },
    });
}

// Remove slide
function removeItem(itemId) {
    if (confirm('Remove this slide?')) {
        router.delete(`/admin/slider-items/${itemId}`, {
            preserveScroll: true,
            onSuccess: () => {
                localItems.value = localItems.value.filter(i => i.id !== itemId);
            },
        });
    }
}

// Drag & drop reordering (native)
const dragIndex = ref(null);
const dragOverIndex = ref(null);
const localItems = ref([...(props.slider.items || [])]);

watch(() => props.slider.items, (newItems) => {
    if (newItems) localItems.value = [...newItems];
}, { immediate: true, deep: true });

function onDragStart(index, e) {
    dragIndex.value = index;
    e.dataTransfer.effectAllowed = 'move';
}
function onDragOver(index, e) {
    e.preventDefault();
    dragOverIndex.value = index;
}
function onDrop(index) {
    if (dragIndex.value === null || dragIndex.value === index) return;
    const newItems = [...localItems.value];
    const [moved] = newItems.splice(dragIndex.value, 1);
    newItems.splice(index, 0, moved);
    localItems.value = newItems;
    const payload = newItems.map((item, idx) => ({ id: item.id, order: idx }));
    router.post('/admin/slider-items/reorder', { items: payload }, {
        preserveScroll: true,
        onError: () => { localItems.value = [...(props.slider.items || [])]; },
    });
    dragIndex.value = null;
    dragOverIndex.value = null;
}
function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Sliders', href: '/admin/sliders' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Slider" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Edit Slider</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ slider.name }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-sidebar-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
                    <Layers class="h-3.5 w-3.5" />
                    {{ localItems.length }} slide{{ localItems.length !== 1 ? 's' : '' }}
                </div>
            </div>

            <!-- Compact Slider Settings bar -->
            <div class="rounded-lg border border-sidebar-border bg-card">
                <div class="flex items-center justify-between border-b border-sidebar-border px-4 py-2">
                    <div class="flex items-center gap-2">
                        <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Slider Settings</span>
                    </div>
                    <form @submit.prevent="form.put(`/admin/sliders/${slider.id}`)" class="flex items-center gap-3">
                        <div class="flex items-center gap-2">
                            <Label for="name" class="text-xs font-medium">Name</Label>
                            <Input id="name" v-model="form.name" type="text" required class="h-7 w-40 text-xs" />
                        </div>
                        <div class="flex items-center gap-2">
                            <Label for="location" class="text-xs font-medium">Location</Label>
                            <Input id="location" v-model="form.location" type="text" class="h-7 w-32 text-xs" />
                        </div>
                        <Button type="submit" size="sm" :disabled="form.processing" class="h-7 gap-1 text-xs px-3">
                            <Save class="h-3 w-3" />
                            {{ form.processing ? 'Saving…' : 'Save' }}
                        </Button>
                    </form>
                </div>
                <InputError :message="form.errors.name" class="px-4 py-1 text-xs" />
                <InputError :message="form.errors.location" class="px-4 py-1 text-xs" />
            </div>

            <!-- Slides Management Card -->
            <Card class="border-sidebar-border shadow-sm">
                <CardHeader class="border-b border-sidebar-border px-5 py-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <CardTitle class="text-sm font-semibold">Slides</CardTitle>
                            <CardDescription class="text-xs mt-0.5">
                                Drag the <GripVertical class="inline h-3 w-3 align-[-2px]" /> handle to reorder. Click <strong>Edit</strong> to modify slide content.
                            </CardDescription>
                        </div>
                        <Button type="button" size="sm" variant="outline" class="h-8 gap-1.5 text-xs" @click="newSlideOpen = !newSlideOpen">
                            <Plus class="h-3.5 w-3.5" />
                            {{ newSlideOpen ? 'Cancel' : 'Add Slide' }}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent class="p-0">

                    <!-- Add slide form (collapsible) -->
                    <div v-if="newSlideOpen" class="border-b border-sidebar-border bg-muted/30 p-5">
                        <form class="grid gap-4 sm:grid-cols-2" @submit.prevent="addItem">
                            <div class="sm:col-span-2">
                                <Label for="item_title">Title</Label>
                                <Input id="item_title" v-model="itemForm.title" class="mt-1 h-9 text-sm" />
                                <InputError :message="itemForm.errors.title" />
                            </div>
                            <div>
                                <Label for="item_subtitle">Subtitle</Label>
                                <Input id="item_subtitle" v-model="itemForm.subtitle" class="mt-1 h-9 text-sm" />
                                <InputError :message="itemForm.errors.subtitle" />
                            </div>
                            <div>
                                <Label for="item_order">Order</Label>
                                <Input id="item_order" v-model.number="itemForm.order" type="number" min="0" class="mt-1 h-9 text-sm" />
                                <InputError :message="itemForm.errors.order" />
                            </div>
                            <div class="sm:col-span-2">
                                <Label for="item_image">Image</Label>
                                <div v-if="itemImagePreviewUrl" class="mb-2">
                                    <img :src="itemImagePreviewUrl" alt="Preview" class="h-24 w-40 rounded border object-cover" />
                                </div>
                                <input id="item_image" type="file" accept="image/*" @change="onItemImageChange" class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm" />
                                <InputError :message="itemForm.errors.image" />
                            </div>
                            <div>
                                <Label for="item_link_url">Link URL</Label>
                                <Input id="item_link_url" v-model="itemForm.link_url" class="mt-1 h-9 text-sm" />
                                <InputError :message="itemForm.errors.link_url" />
                            </div>
                            <div>
                                <Label for="item_link_text">Link text</Label>
                                <Input id="item_link_text" v-model="itemForm.link_text" class="mt-1 h-9 text-sm" />
                                <InputError :message="itemForm.errors.link_text" />
                            </div>
                            <div class="sm:col-span-2 flex gap-2 pt-2">
                                <Button type="submit" variant="secondary" size="sm" :disabled="itemForm.processing">Add Slide</Button>
                                <Button type="button" variant="ghost" size="sm" @click="newSlideOpen = false">Cancel</Button>
                            </div>
                        </form>
                    </div>

                    <!-- Slides list with drag & drop -->
                    <div class="divide-y divide-sidebar-border">
                        <div v-if="localItems.length === 0" class="py-12 text-center text-sm text-muted-foreground">No slides yet. Click "Add Slide" to create one.</div>
                        <div
                            v-for="(item, idx) in localItems"
                            :key="item.id"
                            draggable="true"
                            @dragstart="onDragStart(idx, $event)"
                            @dragover="onDragOver(idx, $event)"
                            @drop="onDrop(idx)"
                            @dragend="onDragEnd"
                            :class="[
                                'flex items-center gap-3 px-5 py-3 transition-colors',
                                dragOverIndex === idx && dragIndex !== idx ? 'bg-blue-500/5 ring-1 ring-blue-500/30' : '',
                                'hover:bg-muted/30'
                            ]"
                        >
                            <!-- Drag handle -->
                            <div class="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-muted-foreground">
                                <GripVertical class="h-4 w-4" />
                            </div>

                            <!-- Thumbnail -->
                            <div class="h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-sidebar-border bg-muted">
                                <img v-if="item.image_url" :src="item.image_url" class="h-full w-full object-cover" />
                                <div v-else class="flex h-full items-center justify-center">
                                    <ImageIcon class="h-4 w-4 text-muted-foreground/30" />
                                </div>
                            </div>

                            <!-- Info -->
                            <div class="flex-1 min-w-0">
                                <p class="truncate text-sm font-medium text-foreground">{{ item.title || 'Untitled' }}</p>
                                <p class="truncate text-xs text-muted-foreground">{{ item.subtitle || 'No subtitle' }}</p>
                                <div class="mt-1 flex flex-wrap gap-1">
                                    <span class="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                        Order: {{ item.order }}
                                    </span>
                                    <span v-if="item.link_url" class="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                        Has link
                                    </span>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex shrink-0 gap-2">
                                <Button variant="outline" size="sm" as-child class="h-7 text-xs">
                                    <Link :href="`/admin/slider-items/${item.id}/edit`">Edit</Link>
                                </Button>
                                <Button variant="ghost" size="sm" class="h-7 w-7 p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" @click="removeItem(item.id)">
                                    <Trash2 class="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>

<style scoped>
[draggable="true"] {
    user-select: none;
}
</style>
