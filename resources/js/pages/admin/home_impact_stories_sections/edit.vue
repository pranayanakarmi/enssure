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
    homeImpactStoriesSection: {
        type: Object,
        default: null,
    },
    allImpactStories: {
        type: Array,
        default: () => [],
    },
});

const section = computed(() => props.homeImpactStoriesSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    cta_text: '',
    cta_url: '',
    impact_story_ids: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
    impact_story_ids: section.value.impact_story_ids ?? [],
});

function isSelected(storyId) {
    return form.impact_story_ids.includes(storyId);
}

function toggleStory(story) {
    const ids = new Set(form.impact_story_ids);
    if (ids.has(story.id)) {
        ids.delete(story.id);
    } else {
        ids.add(story.id);
    }
    form.impact_story_ids = props.allImpactStories
        .filter((s) => ids.has(s.id))
        .map((s) => s.id);
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin' },
    { title: 'Impact Stories section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Impact Stories section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Impact Stories section"
                    description="Edit the badge, title, description and CTA shown on the home page impact stories block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/home-impact-stories-section')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Impact Stories"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Transforming Skills, Changing Lives"
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
                            placeholder="e.g. View all stories"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /impact-stories"
                        />
                        <InputError :message="form.errors.cta_url" />
                    </div>
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label>Impact stories to show on home page</Label>
                            <Link
                                :href="'/admin/impact_stories'"
                                class="text-sm text-primary hover:underline"
                            >
                                Manage impact stories
                            </Link>
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Select which impact stories appear in the home page block. Order follows the list below.
                        </p>
                        <ul class="max-h-64 space-y-2 overflow-y-auto rounded-md border border-input bg-muted/30 p-3">
                            <li
                                v-for="story in allImpactStories"
                                :key="story.id"
                                class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50"
                                @click="toggleStory(story)"
                            >
                                <input
                                    type="checkbox"
                                    :checked="isSelected(story.id)"
                                    class="h-4 w-4 rounded border-input"
                                    @click.stop
                                    @change="toggleStory(story)"
                                />
                                <img
                                    v-if="story.image_url"
                                    :src="story.image_url"
                                    :alt="story.title"
                                    class="h-10 w-14 shrink-0 rounded object-cover"
                                />
                                <span
                                    v-else
                                    class="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground"
                                >
                                    No image
                                </span>
                                <span class="min-w-0 flex-1 truncate text-sm">{{ story.title }}</span>
                            </li>
                            <li
                                v-if="!allImpactStories.length"
                                class="py-4 text-center text-sm text-muted-foreground"
                            >
                                No impact stories yet.
                                <Link href="/admin/impact_stories/create" class="text-primary hover:underline">Create one</Link>.
                            </li>
                        </ul>
                        <InputError :message="form.errors.impact_story_ids" />
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
    homeImpactStoriesSection: {
        type: Object,
        default: null,
    },
    allImpactStories: {
        type: Array,
        default: () => [],
    },
});

const draggedItem = ref(null);
const draggedOverItem = ref(null);

const section = computed(() => props.homeImpactStoriesSection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    cta_text: '',
    cta_url: '',
    impact_story_ids: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
    impact_story_ids: section.value.impact_story_ids ?? [],
});

function isSelected(storyId) {
    return form.impact_story_ids.includes(storyId);
}

function toggleStory(story) {
    const ids = new Set(form.impact_story_ids);
    if (ids.has(story.id)) {
        ids.delete(story.id);
    } else {
        ids.add(story.id);
    }
    form.impact_story_ids = props.allImpactStories
        .filter((s) => ids.has(s.id))
        .map((s) => s.id);
}

function handleDragStart(story) {
    draggedItem.value = story.id;
}

function handleDragOver(story) {
    if (isSelected(story.id)) {
        draggedOverItem.value = story.id;
    }
}

function handleDragEnd() {
    draggedItem.value = null;
    draggedOverItem.value = null;
}

function handleDrop(targetStory) {
    if (draggedItem.value === null || draggedItem.value === targetStory.id) {
        return;
    }

    if (!isSelected(draggedItem.value) || !isSelected(targetStory.id)) {
        return;
    }

    const draggedIndex = form.impact_story_ids.indexOf(draggedItem.value);
    const targetIndex = form.impact_story_ids.indexOf(targetStory.id);

    if (draggedIndex === -1 || targetIndex === -1) {
        return;
    }

    // Reorder the impact_story_ids array
    const newOrder = [...form.impact_story_ids];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem.value);

    form.impact_story_ids = newOrder;

    draggedItem.value = null;
    draggedOverItem.value = null;
}

const selectedStories = computed(() => {
    return form.impact_story_ids.map(id => props.allImpactStories.find(s => s.id === id)).filter(Boolean);
});

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin' },
    { title: 'Impact Stories section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Impact Stories section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Impact Stories section"
                    description="Edit the badge, title, description and CTA shown on the home page impact stories block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/home-impact-stories-section')"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Impact Stories"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Transforming Skills, Changing Lives"
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
                            placeholder="e.g. View all stories"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /impact-stories"
                        />
                        <InputError :message="form.errors.cta_url" />
                    </div>

                    <!-- Selected Stories (Draggable) -->
                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label>Selected impact stories ({{ selectedStories.length }})</Label>
                            <Link
                                :href="'/admin/impact_stories'"
                                class="text-sm text-primary hover:underline"
                            >
                                Manage impact stories
                            </Link>
                        </div>
                        <p class="text-xs text-muted-foreground">
                            Drag to reorder which impact stories appear on the home page block.
                        </p>
                        <div class="max-h-64 overflow-y-auto rounded-md border border-input bg-muted/30 p-3">
                            <ul v-if="selectedStories.length" class="space-y-2">
                                <li
                                    v-for="story in selectedStories"
                                    :key="story.id"
                                    draggable="true"
                                    class="flex cursor-move items-center gap-3 rounded-md px-2 py-1.5 transition-all duration-150"
                                    :class="{
                                        'bg-muted/50 opacity-50': draggedItem === story.id,
                                        'border-l-2 border-primary bg-primary/5': draggedOverItem === story.id && draggedItem !== story.id,
                                        'hover:bg-muted/50': draggedItem === null,
                                    }"
                                    @dragstart="handleDragStart(story)"
                                    @dragover.prevent="handleDragOver(story)"
                                    @dragleave="draggedOverItem = null"
                                    @drop.prevent="handleDrop(story)"
                                    @dragend="handleDragEnd"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="true"
                                        class="h-4 w-4 rounded border-input"
                                        @click.stop="toggleStory(story)"
                                    />
                                    <img
                                        v-if="story.image_url"
                                        :src="story.image_url"
                                        :alt="story.title"
                                        class="h-10 w-14 shrink-0 rounded object-cover"
                                    />
                                    <span
                                        v-else
                                        class="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground"
                                    >
                                        No image
                                    </span>
                                    <div class="min-w-0 flex-1">
                                        <div class="truncate text-sm font-medium">{{ story.title }}</div>
                                        <div class="truncate text-xs text-muted-foreground">{{ story.description }}</div>
                                    </div>
                                </li>
                            </ul>
                            <div v-else class="py-4 text-center text-sm text-muted-foreground">
                                No impact stories selected yet.
                            </div>
                        </div>
                        <InputError :message="form.errors.impact_story_ids" />
                    </div>

                    <!-- All Stories (Selectable) -->
                    <div class="grid gap-2">
                        <Label>All available impact stories ({{ props.allImpactStories.length }})</Label>
                        <p class="text-xs text-muted-foreground">
                            Check to add impact stories to the home page block.
                        </p>
                        <div class="max-h-64 overflow-y-auto rounded-md border border-input bg-background p-3">
                            <ul v-if="props.allImpactStories.length" class="space-y-2">
                                <li
                                    v-for="story in props.allImpactStories"
                                    :key="story.id"
                                    class="flex items-center gap-3 rounded-md px-2 py-1.5 transition-all duration-150"
                                    :class="{
                                        'bg-muted/50': isSelected(story.id),
                                        'hover:bg-muted/30': !isSelected(story.id),
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="isSelected(story.id)"
                                        class="h-4 w-4 rounded border-input"
                                        @change="toggleStory(story)"
                                    />
                                    <img
                                        v-if="story.image_url"
                                        :src="story.image_url"
                                        :alt="story.title"
                                        class="h-10 w-14 shrink-0 rounded object-cover"
                                    />
                                    <span
                                        v-else
                                        class="flex h-10 w-14 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground"
                                    >
                                        No image
                                    </span>
                                    <div class="min-w-0 flex-1">
                                        <div class="truncate text-sm font-medium">{{ story.title }}</div>
                                        <div class="truncate text-xs text-muted-foreground">{{ story.description }}</div>
                                    </div>
                                    <span v-if="isSelected(story.id)" class="text-xs font-medium text-primary">Selected</span>
                                </li>
                            </ul>
                            <div v-else class="py-4 text-center text-sm text-muted-foreground">
                                No impact stories available.
                                <Link href="/admin/impact_stories/create" class="text-primary hover:underline">Create one</Link>.
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
