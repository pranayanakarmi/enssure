<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, Tag, Type, GripVertical, ImageIcon, ArrowUp, ArrowDown, Trash2, Plus, Search } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeImpactStoriesSection: { type: Object, default: null },
    allImpactStories: { type: Array, default: () => [] },
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

// Search query for available stories
const searchQuery = ref('');

const availableStories = computed(() => {
    const selectedIds = new Set(form.impact_story_ids);
    let stories = props.allImpactStories.filter(s => !selectedIds.has(s.id));
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        stories = stories.filter(s => s.title.toLowerCase().includes(q));
    }
    return stories;
});

const selectedStories = computed(() =>
    form.impact_story_ids.map(id => props.allImpactStories.find(s => s.id === id)).filter(Boolean)
);

function addStory(story) {
    if (form.impact_story_ids.includes(story.id)) return;
    form.impact_story_ids = [...form.impact_story_ids, story.id];
}

function removeStory(storyId) {
    form.impact_story_ids = form.impact_story_ids.filter(id => id !== storyId);
}

// Arrow reordering
function moveUp(index) {
    if (index <= 0) return;
    const newOrder = [...form.impact_story_ids];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    form.impact_story_ids = newOrder;
}
function moveDown(index) {
    if (index >= form.impact_story_ids.length - 1) return;
    const newOrder = [...form.impact_story_ids];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    form.impact_story_ids = newOrder;
}

// Drag & drop reordering
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
    const newOrder = [...form.impact_story_ids];
    const [moved] = newOrder.splice(dragIndex.value, 1);
    newOrder.splice(index, 0, moved);
    form.impact_story_ids = newOrder;
    dragIndex.value = null;
    dragOverIndex.value = null;
}
function onDragEnd() {
    dragIndex.value = null;
    dragOverIndex.value = null;
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Impact Stories Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Impact Stories Section" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Impact Stories Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge, title, description, CTA and select stories.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <ImageIcon class="h-3.5 w-3.5" />{{ selectedStories.length }} selected
                </div>
            </div>

            <!-- Section Settings Card (same style as about.vue) -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold flex items-center gap-2">
                        <Type class="h-4 w-4" /> Section Content
                    </CardTitle>
                    <CardDescription class="text-xs">Update the text and call‑to‑action for the impact stories block.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.put('/admin/home-impact-stories-section')">

                        <!-- Badge & Title (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="badge_text" class="text-xs font-medium flex items-center gap-1.5">
                                    <Tag class="h-3 w-3" />Badge Text
                                </Label>
                                <Input id="badge_text" v-model="form.badge_text" class="h-9 text-sm" placeholder="e.g. Impact Stories" />
                                <InputError :message="form.errors.badge_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="title" class="text-xs font-medium flex items-center gap-1.5">
                                    <Type class="h-3 w-3" />Section Title
                                </Label>
                                <Input id="title" v-model="form.title" class="h-9 text-sm" placeholder="e.g. Transforming Skills, Changing Lives" />
                                <InputError :message="form.errors.title" />
                            </div>
                        </div>

                        <!-- Description (full width) -->
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

                        <!-- CTA (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_text" class="text-xs font-medium">CTA Button Text</Label>
                                <Input id="cta_text" v-model="form.cta_text" class="h-9 text-sm" placeholder="e.g. View all stories" />
                                <InputError :message="form.errors.cta_text" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="cta_url" class="text-xs font-medium">CTA Button URL</Label>
                                <Input id="cta_url" v-model="form.cta_url" class="h-9 text-sm" placeholder="/impact-stories" />
                                <InputError :message="form.errors.cta_url" />
                            </div>
                        </div>

                    </form>
                </CardContent>
            </Card>

            <!-- Two‑column story selection (same as news ticker) -->
            <div class="grid gap-5 lg:grid-cols-2">
                <!-- Left: Available Stories -->
                <Card class="flex flex-col border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-4 py-3">
                        <div class="flex items-center justify-between">
                            <CardTitle class="text-sm font-semibold">Available Stories</CardTitle>
                            <span class="text-xs text-gray-500">{{ availableStories.length }}</span>
                        </div>
                        <div class="relative mt-2">
                            <Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            <Input v-model="searchQuery" placeholder="Search stories..." class="h-8 pl-8 text-xs" />
                        </div>
                    </CardHeader>
                    <CardContent class="flex-1 overflow-y-auto p-3">
                        <div v-if="availableStories.length === 0" class="py-8 text-center text-xs text-gray-500">
                            {{ searchQuery ? 'No matching stories' : 'All stories are already selected' }}
                        </div>
                        <div v-else class="space-y-2">
                            <div
                                v-for="story in availableStories"
                                :key="story.id"
                                class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-2 transition-all hover:bg-gray-50"
                                @click="addStory(story)"
                            >
                                <div class="h-10 w-14 shrink-0 overflow-hidden rounded bg-gray-100">
                                    <img v-if="story.image_url" :src="story.image_url" :alt="story.title" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full items-center justify-center text-[10px] text-gray-400">No img</div>
                                </div>
                                <div class="flex-1 truncate text-xs font-medium">{{ story.title }}</div>
                                <Plus class="h-3.5 w-3.5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Right: Selected Stories (orderable) -->
                <Card class="flex flex-col border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-4 py-3">
                        <div class="flex items-center justify-between">
                            <CardTitle class="text-sm font-semibold">Selected for Home Page</CardTitle>
                            <span class="text-xs text-gray-500">{{ selectedStories.length }}</span>
                        </div>
                        <p class="text-xs text-gray-500">Drag the handle or use arrows to reorder.</p>
                    </CardHeader>
                    <CardContent class="flex-1 p-3">
                        <div v-if="selectedStories.length === 0" class="py-8 text-center text-xs text-gray-500">
                            No stories selected. Click any from the left panel to add.
                        </div>
                        <div class="space-y-2">
                            <div
                                v-for="(story, idx) in selectedStories"
                                :key="story.id"
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
                                <div class="cursor-grab active:cursor-grabbing text-gray-400">
                                    <GripVertical class="h-4 w-4" />
                                </div>
                                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                                    {{ idx + 1 }}
                                </span>
                                <div class="h-10 w-14 shrink-0 overflow-hidden rounded bg-gray-100">
                                    <img v-if="story.image_url" :src="story.image_url" :alt="story.title" class="h-full w-full object-cover" />
                                    <div v-else class="flex h-full items-center justify-center text-[10px] text-gray-400">No img</div>
                                </div>
                                <div class="flex-1 truncate text-xs font-medium">{{ story.title }}</div>
                                <div class="flex shrink-0 gap-0.5">
                                    <Button size="icon" variant="ghost" :disabled="idx === 0" @click="moveUp(idx)" class="h-6 w-6">
                                        <ArrowUp class="h-3 w-3" />
                                    </Button>
                                    <Button size="icon" variant="ghost" :disabled="idx === selectedStories.length - 1" @click="moveDown(idx)" class="h-6 w-6">
                                        <ArrowDown class="h-3 w-3" />
                                    </Button>
                                    <div class="mx-0.5 h-4 w-px bg-gray-200"></div>
                                    <Button size="icon" variant="ghost" @click="removeStory(story.id)" class="h-6 w-6 text-gray-500 hover:bg-red-50 hover:text-red-600">
                                        <Trash2 class="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Save button for the whole section -->
            <div class="flex justify-end">
                <Button @click="form.put('/admin/home-impact-stories-section')" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
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
