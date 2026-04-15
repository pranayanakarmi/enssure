<script setup>
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, Edit, GripVertical, Youtube,
    Calendar, Link as LinkIcon, CheckCircle2, AlertCircle, X
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    videos: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Local copy for drag‑drop reordering
const localVideos = ref([...props.videos]);
watch(() => props.videos, (newVideos) => {
    localVideos.value = [...newVideos];
}, { immediate: true, deep: true });

// ── Modal state ──────────────────────────────────────────────────
const modalOpen = ref(false);
const editingVideo = ref(null); // null = create mode, object = edit mode

// Form for create/edit (shared)
const videoForm = useForm({
    title: '',
    video_url: '',
    thumbnail: null,
    date: '',
    order: 0,
    is_active: true,
    is_hero: false,
    _method: 'post', // default to post for create
});

const thumbnailPreview = ref(null);
const existingThumbnail = ref(null);

function openCreateModal() {
    editingVideo.value = null;
    videoForm.reset();
    videoForm._method = 'post';
    thumbnailPreview.value = null;
    existingThumbnail.value = null;
    modalOpen.value = true;
}

function openEditModal(video) {
    editingVideo.value = video;
    videoForm.title = video.title;
    videoForm.video_url = video.video_url;
    videoForm.date = video.date;
    videoForm.order = video.order;
    videoForm.is_active = video.is_active;
    videoForm.is_hero = video.is_hero;
    videoForm.thumbnail = null;
    videoForm._method = 'put';
    thumbnailPreview.value = null;
    existingThumbnail.value = video.thumbnail;
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
    videoForm.reset();
    thumbnailPreview.value = null;
    existingThumbnail.value = null;
}

function onThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (file) {
        videoForm.thumbnail = file;
        const reader = new FileReader();
        reader.onload = (ev) => { thumbnailPreview.value = ev.target.result; };
        reader.readAsDataURL(file);
    } else {
        videoForm.thumbnail = null;
        thumbnailPreview.value = null;
    }
}

function saveVideo() {
    videoForm.transform((data) => ({
        ...data,
        is_active: data.is_active ? '1' : '0',
        is_hero: data.is_hero ? '1' : '0',
    }));

    if (editingVideo.value) {
        videoForm.post(`/admin/videos/${editingVideo.value.id}`, {
            forceFormData: true,
            onSuccess: () => {
                videoForm.transform((data) => data);
                closeModal();
            },
            onError: () => {
                videoForm.transform((data) => data);
            },
        });
    } else {
        videoForm.post('/admin/videos', {
            forceFormData: true,
            onSuccess: () => {
                videoForm.transform((data) => data);
                closeModal();
            },
            onError: () => {
                videoForm.transform((data) => data);
            },
        });
    }
}

// ── Delete video ──────────────────────────────────────────────────
const showDeleteModal = ref(false);
const videoToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(video) {
    videoToDelete.value = video;
    showDeleteModal.value = true;
}

function deleteVideo() {
    if (!videoToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/videos/${videoToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            videoToDelete.value = null;
        },
    });
}

// ── Drag & drop reordering ───────────────────────────────────────
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
    const newItems = [...localVideos.value];
    const [moved] = newItems.splice(dragIndex.value, 1);
    newItems.splice(index, 0, moved);
    localVideos.value = newItems;
    const payload = newItems.map((item, idx) => ({ id: item.id, order: idx }));
    router.post('/admin/videos/reorder', { items: payload }, {
        preserveScroll: true,
        onError: () => { localVideos.value = [...props.videos]; },
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
    { title: 'Videos', href: '/admin/videos' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Videos Management" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Videos</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage featured videos displayed on the homepage.</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" @click="openCreateModal">
                    <Plus class="h-3.5 w-3.5" />Add video
                </Button>
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

            <!-- Videos grid -->
            <div v-if="localVideos.length === 0" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Youtube class="h-12 w-12 text-muted-foreground/40" />
                <p class="text-sm text-muted-foreground">No videos yet.</p>
                <Button size="sm" @click="openCreateModal">Add your first video</Button>
            </div>

            <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div
                    v-for="(video, idx) in localVideos"
                    :key="video.id"
                    draggable="true"
                    @dragstart="onDragStart(idx, $event)"
                    @dragover="onDragOver(idx, $event)"
                    @drop="onDrop(idx)"
                    @dragend="onDragEnd"
                    :class="[
                        'group relative cursor-grab rounded-xl border bg-card transition-all hover:shadow-md active:cursor-grabbing',
                        dragOverIndex === idx && dragIndex !== idx ? 'border-primary/50 bg-primary/5 ring-2 ring-primary/20' : 'border-border',
                        dragIndex === idx ? 'opacity-50' : 'opacity-100'
                    ]"
                >
                    <div class="absolute left-2 top-2 z-10 rounded-md bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <GripVertical class="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div class="aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
                        <img
                            v-if="video.thumbnail"
                            :src="video.thumbnail"
                            :alt="video.title"
                            class="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div v-else class="flex h-full w-full items-center justify-center">
                            <Youtube class="h-8 w-8 text-muted-foreground/40" />
                        </div>
                    </div>
                    <div class="p-3">
                        <div class="flex items-start justify-between gap-2">
                            <h3 class="text-sm font-semibold text-foreground truncate">{{ video.title }}</h3>
                            <Badge :variant="video.is_active ? 'default' : 'secondary'" class="shrink-0 text-[10px]">
                                {{ video.is_active ? 'Active' : 'Inactive' }}
                            </Badge>
                        </div>
                        <p v-if="video.is_hero" class="mt-1 text-[11px] font-medium text-primary">Hero video</p>
                        <div class="mt-1 space-y-0.5 text-xs text-muted-foreground">
                            <div class="flex items-center gap-1">
                                <Calendar class="h-3 w-3" />
                                <span>{{ video.date || 'No date' }}</span>
                            </div>
                            <div class="flex items-center gap-1 truncate">
                                <LinkIcon class="h-3 w-3 shrink-0" />
                                <span class="truncate">{{ video.video_url }}</span>
                            </div>
                        </div>
                        <div class="mt-3 flex items-center justify-end gap-1.5">
                            <Button size="sm" variant="outline" class="h-7 gap-1 text-xs" @click="openEditModal(video)">
                                <Edit class="h-3 w-3" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10" @click.stop="confirmDelete(video)">
                                <Trash2 class="h-3 w-3" /> Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Delete confirmation modal -->
            <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
                <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                    <h3 class="text-lg font-semibold">Delete video</h3>
                    <p class="mt-2 text-sm text-muted-foreground">
                        Are you sure you want to delete “{{ videoToDelete?.title }}”?<br>
                        This action cannot be undone.
                    </p>
                    <div class="mt-6 flex justify-end gap-2">
                        <Button variant="outline" @click="showDeleteModal = false">Cancel</Button>
                        <Button variant="destructive" @click="deleteVideo" :disabled="isDeleting">
                            {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Create/Edit Modal -->
            <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeModal">
                <div class="w-full max-w-2xl rounded-lg bg-background p-6 shadow-xl">
                    <div class="flex items-center justify-between border-b border-gray-200 pb-3">
                        <h2 class="text-lg font-semibold text-foreground">
                            {{ editingVideo ? 'Edit Video' : 'Add New Video' }}
                        </h2>
                        <button type="button" @click="closeModal" class="text-gray-400 hover:text-gray-600">
                            <X class="h-5 w-5" />
                        </button>
                    </div>

                    <form class="mt-5 space-y-5" @submit.prevent="saveVideo">
                        <div class="space-y-1.5">
                            <Label for="modal_title">Title *</Label>
                            <Input id="modal_title" v-model="videoForm.title" required class="h-9 text-sm" />
                            <InputError :message="videoForm.errors.title" />
                        </div>

                        <div class="space-y-1.5">
                            <Label for="modal_video_url">Video URL *</Label>
                            <Input id="modal_video_url" v-model="videoForm.video_url" type="url" required class="h-9 text-sm" />
                            <p class="text-xs text-muted-foreground">YouTube, Vimeo, or direct MP4 link.</p>
                            <InputError :message="videoForm.errors.video_url" />
                        </div>

                        <div class="space-y-1.5">
                            <Label for="modal_thumbnail">Custom Thumbnail (optional)</Label>
                            <Input id="modal_thumbnail" type="file" accept="image/jpeg,image/png,image/jpg,image/webp" @change="onThumbnailChange" />
                            <p class="text-xs text-muted-foreground">Upload a custom thumbnail. Leave empty to auto‑generate from YouTube/Vimeo.</p>
                            <div v-if="thumbnailPreview || existingThumbnail" class="mt-2">
                                <p class="text-sm text-muted-foreground">Preview:</p>
                                <img :src="thumbnailPreview || existingThumbnail" class="h-20 w-auto rounded border mt-1 object-cover" />
                            </div>
                            <InputError :message="videoForm.errors.thumbnail" />
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="space-y-1.5">
                                <Label for="modal_date">Date</Label>
                                <Input id="modal_date" v-model="videoForm.date" type="date" class="h-9 text-sm" />
                                <InputError :message="videoForm.errors.date" />
                            </div>
                            <div class="space-y-1.5">
                                <Label for="modal_order">Order</Label>
                                <Input id="modal_order" v-model.number="videoForm.order" type="number" class="h-9 text-sm" />
                                <InputError :message="videoForm.errors.order" />
                            </div>
                        </div>

                        <div class="flex items-center space-x-2">
                            <Checkbox id="modal_is_active" v-model="videoForm.is_active" />
                            <Label for="modal_is_active">Active (show on homepage)</Label>
                        </div>

                        <div class="flex items-center space-x-2">
                            <Checkbox id="modal_is_hero" v-model="videoForm.is_hero" />
                            <Label for="modal_is_hero">Use as hero modal video</Label>
                        </div>

                        <div class="flex justify-end gap-3 border-t border-gray-200 pt-4">
                            <Button type="button" variant="outline" @click="closeModal">Cancel</Button>
                            <Button type="submit" :disabled="videoForm.processing" class="gap-1.5">
                                <Save class="h-3.5 w-3.5" />
                                {{ videoForm.processing ? 'Saving…' : (editingVideo ? 'Update Video' : 'Create Video') }}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </AppLayout>
</template>

<style scoped>
[draggable="true"] {
    user-select: none;
}
</style>
