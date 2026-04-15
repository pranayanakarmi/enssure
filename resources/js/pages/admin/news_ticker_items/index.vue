<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import {
    Search, ArrowUp, ArrowDown, Trash2, Plus,
    ArrowLeft, GripVertical, Newspaper, CheckCircle2,
    ListOrdered, X
} from 'lucide-vue-next';
import { ref, computed } from 'vue';
import Heading from '@/components/Heading.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    allNotices: { type: Array, default: () => [] },
    homeNewsNoticeIds: { type: Array, default: () => [] },
    canUpdateHomeNewsNotices: { type: Boolean, default: false },
});

const homeNoticesForm = useForm({
    notice_ids: [...props.homeNewsNoticeIds],
});

const searchQuery = ref('');

const availableNotices = computed(() => {
    const selectedIds = new Set(homeNoticesForm.notice_ids);
    let notices = props.allNotices.filter(n => !selectedIds.has(n.id));
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        notices = notices.filter(n => n.title.toLowerCase().includes(q));
    }
    return notices;
});

const selectedNotices = computed(() =>
    homeNoticesForm.notice_ids
        .map(id => props.allNotices.find(n => n.id === id))
        .filter(Boolean)
);

function addNotice(notice) {
    if (homeNoticesForm.notice_ids.includes(notice.id)) return;
    homeNoticesForm.notice_ids = [...homeNoticesForm.notice_ids, notice.id];
}

function removeNotice(noticeId) {
    homeNoticesForm.notice_ids = homeNoticesForm.notice_ids.filter(id => id !== noticeId);
}

function moveUp(index) {
    if (index <= 0) return;
    const arr = [...homeNoticesForm.notice_ids];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    homeNoticesForm.notice_ids = arr;
}

function moveDown(index) {
    if (index >= homeNoticesForm.notice_ids.length - 1) return;
    const arr = [...homeNoticesForm.notice_ids];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    homeNoticesForm.notice_ids = arr;
}

// Drag & drop reordering
const dragIndex = ref(null);
const dragOverIndex = ref(null);

function onDragStart(index, event) {
    dragIndex.value = index;
    event.dataTransfer.effectAllowed = 'move';
}

function onDragOver(index, event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    dragOverIndex.value = index;
}

function onDrop(index) {
    if (dragIndex.value === null || dragIndex.value === index) return;
    const arr = [...homeNoticesForm.notice_ids];
    const [moved] = arr.splice(dragIndex.value, 1);
    arr.splice(index, 0, moved);
    homeNoticesForm.notice_ids = arr;
    dragIndex.value = null;
    dragOverIndex.value = null;
}

function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

function saveOrder() {
    homeNoticesForm.put('/admin/home-news-section', { preserveScroll: true });
}

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'News Section', href: '/admin/home-news-section/edit' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Home News Section" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-6">

            <!-- Page header -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />
                            Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Home Page – News Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">
                            Pick and order notices for the Latest News block and ticker.
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <!-- Stats pills -->
                    <div class="hidden sm:flex items-center gap-2">
                        <div class="flex items-center gap-1.5 rounded-lg border border-sidebar-border bg-muted/40 px-3 py-1.5 text-xs">
                            <Newspaper class="h-3.5 w-3.5 text-muted-foreground" />
                            <span class="text-muted-foreground">Available:</span>
                            <span class="font-semibold text-foreground">{{ availableNotices.length }}</span>
                        </div>
                        <div class="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs">
                            <ListOrdered class="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                            <span class="text-blue-600 dark:text-blue-400">Selected:</span>
                            <span class="font-semibold text-blue-700 dark:text-blue-300">{{ selectedNotices.length }}</span>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        :disabled="homeNoticesForm.processing"
                        @click="saveOrder"
                        class="h-8 gap-1.5 text-xs"
                    >
                        <CheckCircle2 class="h-3.5 w-3.5" />
                        {{ homeNoticesForm.processing ? 'Saving…' : 'Save Order' }}
                    </Button>
                </div>
            </div>

            <!-- Flash -->
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                leave-active-class="transition-all duration-200 ease-in"
                leave-to-class="opacity-0 -translate-y-1"
            >
                <div
                    v-if="success"
                    class="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-50 px-4 py-2.5 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
                >
                    <CheckCircle2 class="h-4 w-4 shrink-0" />
                    {{ success }}
                </div>
            </Transition>

            <!-- Two-column panel -->
            <div class="grid flex-1 gap-4 lg:grid-cols-2">

                <!-- ── Available Notices ── -->
                <Card class="flex flex-col overflow-hidden border-sidebar-border">
                    <CardHeader class="shrink-0 border-b border-sidebar-border px-4 py-3">
                        <div class="flex items-center justify-between">
                            <CardTitle class="text-sm font-semibold">Available Notices</CardTitle>
                            <Badge variant="secondary" class="text-xs">{{ availableNotices.length }}</Badge>
                        </div>
                        <!-- Search -->
                        <div class="relative mt-2">
                            <Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                v-model="searchQuery"
                                placeholder="Search notices…"
                                class="h-8 pl-8 pr-8 text-xs"
                            />
                            <button
                                v-if="searchQuery"
                                @click="searchQuery = ''"
                                class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X class="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </CardHeader>

                    <CardContent class="flex-1 overflow-y-auto p-3">
                        <div
                            v-if="availableNotices.length === 0"
                            class="flex flex-col items-center justify-center gap-2 py-12 text-center"
                        >
                            <Newspaper class="h-8 w-8 text-muted-foreground/40" />
                            <p class="text-xs text-muted-foreground">
                                {{ searchQuery ? 'No notices match your search.' : 'All notices have been selected.' }}
                            </p>
                        </div>

                        <div v-else class="space-y-1.5">
                            <button
                                v-for="notice in availableNotices"
                                :key="notice.id"
                                type="button"
                                @click="addNotice(notice)"
                                class="group flex w-full items-center gap-3 rounded-lg border border-sidebar-border bg-card p-2.5 text-left transition-all duration-150 hover:border-foreground/20 hover:bg-muted/50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <!-- Thumbnail -->
                                <div class="h-10 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                                    <img
                                        v-if="notice.image_url"
                                        :src="notice.image_url"
                                        :alt="notice.title"
                                        class="h-full w-full object-cover"
                                    />
                                    <div v-else class="flex h-full items-center justify-center">
                                        <Newspaper class="h-4 w-4 text-muted-foreground/40" />
                                    </div>
                                </div>
                                <!-- Title -->
                                <span class="flex-1 truncate text-xs font-medium text-foreground">{{ notice.title }}</span>
                                <!-- Add icon -->
                                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sidebar-border bg-muted text-muted-foreground transition-colors group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    <Plus class="h-3 w-3" />
                                </span>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <!-- ── Selected Notices ── -->
                <Card class="flex flex-col overflow-hidden border-sidebar-border">
                    <CardHeader class="shrink-0 border-b border-sidebar-border px-4 py-3">
                        <div class="flex items-center justify-between">
                            <CardTitle class="text-sm font-semibold">Selected for Home Page</CardTitle>
                            <Badge class="text-xs">{{ selectedNotices.length }}</Badge>
                        </div>
                        <p class="mt-1 text-xs text-muted-foreground">
                            Drag rows or use arrows to reorder. Click
                            <Trash2 class="inline h-3 w-3 align-[-1px]" /> to remove.
                        </p>
                    </CardHeader>

                    <CardContent class="flex-1 overflow-y-auto p-3">
                        <div
                            v-if="selectedNotices.length === 0"
                            class="flex flex-col items-center justify-center gap-2 py-12 text-center"
                        >
                            <ListOrdered class="h-8 w-8 text-muted-foreground/40" />
                            <p class="text-xs text-muted-foreground">
                                No notices selected yet.<br />Click any notice on the left to add it.
                            </p>
                        </div>

                        <div v-else class="space-y-1.5">
                            <div
                                v-for="(notice, idx) in selectedNotices"
                                :key="notice.id"
                                draggable="true"
                                @dragstart="onDragStart(idx, $event)"
                                @dragover="onDragOver(idx, $event)"
                                @drop="onDrop(idx)"
                                @dragend="onDragEnd"
                                :class="[
                                    'group flex items-center gap-2.5 rounded-lg border bg-card p-2.5 shadow-sm transition-all duration-150',
                                    dragOverIndex === idx && dragIndex !== idx
                                        ? 'border-blue-500/50 bg-blue-500/5 shadow-md'
                                        : 'border-sidebar-border hover:border-foreground/20 hover:shadow-sm',
                                    dragIndex === idx ? 'opacity-50' : 'opacity-100',
                                ]"
                            >
                                <!-- Drag handle -->
                                <GripVertical class="h-4 w-4 shrink-0 cursor-grab text-muted-foreground/50 group-hover:text-muted-foreground active:cursor-grabbing" />

                                <!-- Position badge -->
                                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                                    {{ idx + 1 }}
                                </span>

                                <!-- Thumbnail -->
                                <div class="h-10 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                                    <img
                                        v-if="notice.image_url"
                                        :src="notice.image_url"
                                        :alt="notice.title"
                                        class="h-full w-full object-cover"
                                    />
                                    <div v-else class="flex h-full items-center justify-center">
                                        <Newspaper class="h-4 w-4 text-muted-foreground/40" />
                                    </div>
                                </div>

                                <!-- Title -->
                                <span class="flex-1 truncate text-xs font-medium text-foreground">{{ notice.title }}</span>

                                <!-- Controls -->
                                <div class="flex shrink-0 items-center gap-0.5">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        :disabled="idx === 0"
                                        @click="moveUp(idx)"
                                        class="h-6 w-6 text-muted-foreground hover:text-foreground disabled:opacity-30"
                                    >
                                        <ArrowUp class="h-3 w-3" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        :disabled="idx === selectedNotices.length - 1"
                                        @click="moveDown(idx)"
                                        class="h-6 w-6 text-muted-foreground hover:text-foreground disabled:opacity-30"
                                    >
                                        <ArrowDown class="h-3 w-3" />
                                    </Button>
                                    <div class="mx-0.5 h-4 w-px bg-sidebar-border" />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        @click="removeNotice(notice.id)"
                                        class="h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                    >
                                        <Trash2 class="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    </AppLayout>
</template>
