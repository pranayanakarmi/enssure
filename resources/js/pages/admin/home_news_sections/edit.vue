<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, GripVertical, ImageIcon, ArrowUp, ArrowDown, Search, CheckCircle2, AlertCircle
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeNewsSection: { type: Object, default: null },
    allNotices: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// ── Section settings ──────────────────────────────────────────────
const section = computed(() => props.homeNewsSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    cta_text: '',
    cta_url: '',
    notice_ids: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
    notice_ids: section.value.notice_ids ?? [],
});

// ── Local selected notices (for drag‑drop) ────────────────────────
const localSelectedIds = ref([...form.notice_ids]);
const selectedNotices = computed(() =>
    localSelectedIds.value.map(id => props.allNotices.find(n => n.id === id)).filter(Boolean)
);

// ── Search for available notices ─────────────────────────────────
const searchQuery = ref('');
const availableNotices = computed(() => {
    const selectedSet = new Set(localSelectedIds.value);
    let items = props.allNotices.filter(n => !selectedSet.has(n.id));
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        items = items.filter(n => n.title.toLowerCase().includes(q));
    }
    return items;
});

// ── Add / remove ─────────────────────────────────────────────────
function addNotice(notice) {
    if (localSelectedIds.value.includes(notice.id)) return;
    localSelectedIds.value = [...localSelectedIds.value, notice.id];
}
function removeNotice(noticeId) {
    localSelectedIds.value = localSelectedIds.value.filter(id => id !== noticeId);
}

// ── Arrow reordering ─────────────────────────────────────────────
function moveUp(index) {
    if (index <= 0) return;
    const newOrder = [...localSelectedIds.value];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    localSelectedIds.value = newOrder;
}
function moveDown(index) {
    if (index >= localSelectedIds.value.length - 1) return;
    const newOrder = [...localSelectedIds.value];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    localSelectedIds.value = newOrder;
}

// ── Drag & drop reordering (native) ─────────────────────────────
const dragIndex = ref(null);
const dragOverIndex = ref(null);
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
    const newOrder = [...localSelectedIds.value];
    const [moved] = newOrder.splice(dragIndex.value, 1);
    newOrder.splice(index, 0, moved);
    localSelectedIds.value = newOrder;
    dragIndex.value = null;
    dragOverIndex.value = null;
}
function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

// ── Save all changes (section + selected notices) ────────────────
function saveAll() {
    // Update the form's notice_ids with the current order
    form.notice_ids = localSelectedIds.value;
    form.put('/admin/home-news-section', {
        preserveScroll: true,
        onSuccess: () => {
            // Flash message handled by backend
        },
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'News Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit News Section" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">News Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge, title, description, CTA and select news notices.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <ImageIcon class="h-3.5 w-3.5" />{{ selectedNotices.length }} selected
                </div>
            </div>

            <!-- Flash messages -->
            <Transition>
                <div v-if="success" class="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-50 px-4 py-2.5 text-sm text-green-800">
                    <CheckCircle2 class="h-4 w-4" /> {{ success }}
                </div>
            </Transition>
            <Transition>
                <div v-if="error" class="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5 text-sm text-red-800">
                    <AlertCircle class="h-4 w-4" /> {{ error }}
                </div>
            </Transition>

            <!-- Section Settings Card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Section Content</CardTitle>
                    <CardDescription class="text-xs">Update badge, title, description and call‑to‑action.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="saveAll">
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="badge_text" class="text-xs font-medium">Badge Text</Label>
                                <Input id="badge_text" v-model="form.badge_text" class="h-9 text-sm" placeholder="e.g. Updates" />
                                <InputError :message="form.errors.badge_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="title" class="text-xs font-medium">Section Title</Label>
                                <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="e.g. Latest News and Articles" />
                                <InputError :message="form.errors.title" />
                            </div>
                        </div>

                        <div class="flex flex-col gap-1.5">
                            <Label for="description" class="text-xs font-medium">Description</Label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="3"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Section description..."
                            />
                            <InputError :message="form.errors.description" />
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_text" class="text-xs font-medium">CTA Button Text</Label>
                                <Input id="cta_text" v-model="form.cta_text" class="h-9 text-sm" placeholder="e.g. View all News" />
                                <InputError :message="form.errors.cta_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_url" class="text-xs font-medium">CTA Button URL</Label>
                                <Input id="cta_url" v-model="form.cta_url" class="h-9 text-sm" placeholder="/notices" />
                                <InputError :message="form.errors.cta_url" />
                            </div>
                        </div>

                        <!-- Save button for settings (inside card) – optional, we have a global save at bottom -->
                    </form>
                </CardContent>
            </Card>

            <!-- Two‑panel notice selection (like news ticker) -->
            <div class="grid gap-5 lg:grid-cols-2">
                <!-- Left: Available Notices -->
                <Card class="flex flex-col border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-4 py-3">
                        <div class="flex items-center justify-between">
                            <CardTitle class="text-sm font-semibold">Available Notices</CardTitle>
                            <span class="text-xs text-gray-500">{{ availableNotices.length }}</span>
                        </div>
                        <div class="relative mt-2">
                            <Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            <Input v-model="searchQuery" placeholder="Search notices..." class="h-8 pl-8 text-xs" />
                        </div>
                    </CardHeader>
                    <CardContent class="flex-1 overflow-y-auto p-3">
                        <div v-if="availableNotices.length === 0" class="py-8 text-center text-xs text-gray-500">
                            {{ searchQuery ? 'No matching notices' : 'All notices are already selected' }}
                        </div>
                        <div v-else class="space-y-2">
                            <div
                                v-for="notice in availableNotices"
                                :key="notice.id"
                                class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-2 transition-all hover:bg-gray-50"
                                @click="addNotice(notice)"
                            >
                                <div class="h-10 w-14 shrink-0 overflow-hidden rounded bg-gray-100">
                                    <img v-if="notice.image_url" :src="notice.image_url" :alt="notice.title" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full items-center justify-center text-[10px] text-gray-400">No img</div>
                                </div>
                                <div class="flex-1 truncate text-xs font-medium">{{ notice.title }}</div>
                                <Plus class="h-3.5 w-3.5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Right: Selected Notices (orderable) -->
                <Card class="flex flex-col border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-4 py-3">
                        <div class="flex items-center justify-between">
                            <CardTitle class="text-sm font-semibold">Selected for Home Page</CardTitle>
                            <span class="text-xs text-gray-500">{{ selectedNotices.length }}</span>
                        </div>
                        <p class="text-xs text-gray-500">Drag the handle or use arrows to reorder.</p>
                    </CardHeader>
                    <CardContent class="flex-1 p-3">
                        <div v-if="selectedNotices.length === 0" class="py-8 text-center text-xs text-gray-500">
                            No notices selected. Click any from the left panel to add.
                        </div>
                        <div class="space-y-2">
                            <div
                                v-for="(notice, idx) in selectedNotices"
                                :key="notice.id"
                                draggable="true"
                                @dragstart="onDragStart(idx, $event)"
                                @dragover="onDragOver(idx, $event)"
                                @drop="onDrop(idx)"
                                @dragend="onDragEnd"
                                :class="[
                                    'flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 transition-all',
                                    dragOverIndex === idx && dragIndex !== idx ? 'border-primary bg-primary/5 ring-1 ring-primary' : '',
                                    dragIndex === idx ? 'opacity-50' : ''
                                ]"
                            >
                                <!-- Drag handle -->
                                <div class="cursor-grab active:cursor-grabbing text-gray-400">
                                    <GripVertical class="h-4 w-4" />
                                </div>

                                <!-- Position badge -->
                                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                                    {{ idx + 1 }}
                                </span>

                                <!-- Thumbnail -->
                                <div class="h-10 w-14 shrink-0 overflow-hidden rounded bg-gray-100">
                                    <img v-if="notice.image_url" :src="notice.image_url" :alt="notice.title" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full items-center justify-center text-[10px] text-gray-400">No img</div>
                                </div>

                                <!-- Title -->
                                <div class="flex-1 truncate text-xs font-medium">{{ notice.title }}</div>

                                <!-- Action buttons -->
                                <div class="flex shrink-0 gap-0.5">
                                    <Button size="icon" variant="ghost" :disabled="idx === 0" @click="moveUp(idx)" class="h-6 w-6">
                                        <ArrowUp class="h-3 w-3" />
                                    </Button>
                                    <Button size="icon" variant="ghost" :disabled="idx === selectedNotices.length - 1" @click="moveDown(idx)" class="h-6 w-6">
                                        <ArrowDown class="h-3 w-3" />
                                    </Button>
                                    <div class="mx-0.5 h-4 w-px bg-gray-200"></div>
                                    <Button size="icon" variant="ghost" @click="removeNotice(notice.id)" class="h-6 w-6 text-gray-500 hover:bg-red-50 hover:text-red-600">
                                        <Trash2 class="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Global Save button -->
            <div class="flex justify-end">
                <Button @click="saveAll" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                    <Save class="h-3.5 w-3.5" />
                    {{ form.processing ? 'Saving…' : 'Save All Changes' }}
                </Button>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
[draggable="true"] {
    user-select: none;
}
</style>
