<!-- <script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeNewsSection: {
        type: Object,
        default: null,
    },
    allNotices: {
        type: Array,
        default: () => [],
    },
});

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

function isNoticeSelected(noticeId) {
    return form.notice_ids.includes(noticeId);
}

function toggleNotice(notice) {
    const ids = new Set(form.notice_ids);
    if (ids.has(notice.id)) {
        ids.delete(notice.id);
    } else {
        ids.add(notice.id);
    }
        form.notice_ids = props.allNotices
        .filter((n) => ids.has(n.id))
        .map((n) => n.id);
}

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'News section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit News section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="News section"
                    description="Edit the badge, title, description and CTA shown on the home page news block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/home-news-section')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Updates"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Latest News and Articles"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Section description..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_text">CTA button text</Label>
                        <Input
                            id="cta_text"
                            v-model="form.cta_text"
                            type="text"
                            placeholder="e.g. View all News"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /news"
                        />
                        <InputError :message="form.errors.cta_url" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label>Notices to show on home page</Label>
                            <Link
                                :href="'/admin/notices'"
                                class="text-sm text-primary hover:underline"
                            >
                                Manage notices
                            </Link>
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Select which notices appear in the home page news block. Order follows the list.
                        </p>
                        <ul class="max-h-64 space-y-2 overflow-y-auto rounded-md border border-input bg-muted/30 p-3">
                            <li
                                v-for="notice in allNotices"
                                :key="notice.id"
                                class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50"
                                @click="toggleNotice(notice)"
                            >
                                <input
                                    type="checkbox"
                                    :checked="isNoticeSelected(notice.id)"
                                    class="h-4 w-4 rounded border-input"
                                    @click.stop
                                    @change="toggleNotice(notice)"
                                />
                                <img
                                    v-if="notice.image_url"
                                    :src="notice.image_url"
                                    :alt="notice.title"
                                    class="h-10 w-14 shrink-0 rounded object-cover"
                                />
                                <span
                                    v-else
                                    class="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground"
                                >
                                    No image
                                </span>
                                <span class="min-w-0 flex-1 truncate text-sm">{{ notice.title }}</span>
                            </li>
                            <li
                                v-if="!allNotices.length"
                                class="py-4 text-center text-sm text-muted-foreground"
                            >
                                No notices yet.
                                <Link href="/admin/notices/create" class="text-primary hover:underline">Create one</Link>.
                            </li>
                        </ul>
                        <InputError :message="form.errors.notice_ids" />
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
                            <Link href="/admin">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template> -->
<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeNewsSection: {
        type: Object,
        default: null,
    },
    allNotices: {
        type: Array,
        default: () => [],
    },
});

const draggedItem = ref(null);
const draggedOverItem = ref(null);

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

function isNoticeSelected(noticeId) {
    return form.notice_ids.includes(noticeId);
}

function toggleNotice(notice) {
    const ids = new Set(form.notice_ids);
    if (ids.has(notice.id)) {
        ids.delete(notice.id);
    } else {
        ids.add(notice.id);
    }
    form.notice_ids = props.allNotices
        .filter((n) => ids.has(n.id))
        .map((n) => n.id);
}

function handleDragStart(notice) {
    draggedItem.value = notice.id;
}

function handleDragOver(notice) {
    if (isNoticeSelected(notice.id)) {
        draggedOverItem.value = notice.id;
    }
}

function handleDragEnd() {
    draggedItem.value = null;
    draggedOverItem.value = null;
}

function handleDrop(targetNotice) {
    if (draggedItem.value === null || draggedItem.value === targetNotice.id) {
        return;
    }

    if (!isNoticeSelected(draggedItem.value) || !isNoticeSelected(targetNotice.id)) {
        return;
    }

    const draggedIndex = form.notice_ids.indexOf(draggedItem.value);
    const targetIndex = form.notice_ids.indexOf(targetNotice.id);

    if (draggedIndex === -1 || targetIndex === -1) {
        return;
    }

    // Reorder the notice_ids array
    const newOrder = [...form.notice_ids];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem.value);

    form.notice_ids = newOrder;

    draggedItem.value = null;
    draggedOverItem.value = null;
}

const selectedNotices = computed(() => {
    return form.notice_ids.map(id => props.allNotices.find(n => n.id === id)).filter(Boolean);
});

const unselectedNotices = computed(() => {
    return props.allNotices.filter(notice => !form.notice_ids.includes(notice.id));
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'News section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit News section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="News section"
                    description="Edit the badge, title, description and CTA shown on the home page news block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/home-news-section')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Updates"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Latest News and Articles"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Section description..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_text">CTA button text</Label>
                        <Input
                            id="cta_text"
                            v-model="form.cta_text"
                            type="text"
                            placeholder="e.g. View all News"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /news"
                        />
                        <InputError :message="form.errors.cta_url" />
                    </div>

                    <!-- Selected Notices (Draggable) -->
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label>Selected notices ({{ selectedNotices.length }})</Label>
                            <Link
                                :href="'/admin/notices'"
                                class="text-sm text-primary hover:underline"
                            >
                                Manage notices
                            </Link>
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Drag to reorder which notices appear on the home page news block.
                        </p>
                        <div class="max-h-64 overflow-y-auto rounded-md border border-input bg-muted/30 p-3">
                            <ul v-if="selectedNotices.length" class="space-y-2">
                                <li
                                    v-for="notice in selectedNotices"
                                    :key="notice.id"
                                    draggable="true"
                                    class="flex cursor-move items-center gap-3 rounded-md px-2 py-1.5 transition-all duration-150"
                                    :class="{
                                        'bg-muted/50 opacity-50': draggedItem === notice.id,
                                        'border-l-2 border-primary bg-primary/5': draggedOverItem === notice.id && draggedItem !== notice.id,
                                        'hover:bg-muted/50': draggedItem === null,
                                    }"
                                    @dragstart="handleDragStart(notice)"
                                    @dragover.prevent="handleDragOver(notice)"
                                    @dragleave="draggedOverItem = null"
                                    @drop.prevent="handleDrop(notice)"
                                    @dragend="handleDragEnd"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="true"
                                        class="h-4 w-4 rounded border-input"
                                        @click.stop="toggleNotice(notice)"
                                    />
                                    <img
                                        v-if="notice.image_url"
                                        :src="notice.image_url"
                                        :alt="notice.title"
                                        class="h-10 w-14 shrink-0 rounded object-cover"
                                    />
                                    <span
                                        v-else
                                        class="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground"
                                    >
                                        No image
                                    </span>
                                    <div class="min-w-0 flex-1">
                                        <div class="truncate text-sm font-medium">{{ notice.title }}</div>
                                        <div class="truncate text-xs text-muted-foreground">{{ notice.description }}</div>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="py-4 text-center text-sm text-muted-foreground">
                                No notices selected yet.
                            </div>
                        </div>
                        <InputError :message="form.errors.notice_ids" />
                    </div>

                    <!-- All Notices (Selectable) -->
                    <div class="grid gap-2">
                        <Label>All available notices ({{ props.allNotices.length }})</Label>
                        <p class="text-xs text-muted-foreground">
                            Check to add notices to the home page news block.
                        </p>
                        <div class="max-h-64 overflow-y-auto rounded-md border border-input bg-background p-3">
                            <ul v-if="props.allNotices.length" class="space-y-2">
                                <li
                                    v-for="notice in props.allNotices"
                                    :key="notice.id"
                                    class="flex items-center gap-3 rounded-md px-2 py-1.5 transition-all duration-150"
                                    :class="{
                                        'bg-muted/50': isNoticeSelected(notice.id),
                                        'hover:bg-muted/30': !isNoticeSelected(notice.id),
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="isNoticeSelected(notice.id)"
                                        class="h-4 w-4 rounded border-input"
                                        @change="toggleNotice(notice)"
                                    />
                                    <img
                                        v-if="notice.image_url"
                                        :src="notice.image_url"
                                        :alt="notice.title"
                                        class="h-10 w-14 shrink-0 rounded object-cover"
                                    />
                                    <span
                                        v-else
                                        class="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground"
                                    >
                                        No image
                                    </span>
                                    <div class="min-w-0 flex-1">
                                        <div class="truncate text-sm font-medium">{{ notice.title }}</div>
                                        <div class="truncate text-xs text-muted-foreground">{{ notice.description }}</div>
                                    </div>
                                    <span v-if="isNoticeSelected(notice.id)" class="text-xs font-medium text-primary">Selected</span>
                                </li>
                            </ul>
                            <div v-else class="py-4 text-center text-sm text-muted-foreground">
                                No notices available.
                                <Link href="/admin/notices/create" class="text-primary hover:underline">Create one</Link>.
                            </div>
                        </div>
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
                            <Link href="/admin">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
