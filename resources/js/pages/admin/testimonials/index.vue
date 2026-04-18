<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import {
    ArrowLeft, Save, Plus, Trash2, Edit, GripVertical, Quote,
    CheckCircle2, AlertCircle, X, User, Star
} from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    testimonials: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Local copy for drag‑drop reordering
const localItems = ref([...props.testimonials]);
watch(() => props.testimonials, (newItems) => {
    localItems.value = [...newItems];
}, { immediate: true, deep: true });


function goToCreate() {
    router.visit('/admin/testimonials/create');
}

function goToEdit(testimonial) {
    router.visit(`/admin/testimonials/${testimonial.id}/edit`);
}

// ── Delete ────────────────────────────────────────────────────────
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(item) {
    itemToDelete.value = item;
    showDeleteModal.value = true;
}

function deleteItem() {
    if (!itemToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/testimonials/${itemToDelete.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            localItems.value = localItems.value.filter(i => i.id !== itemToDelete.value.id);
        },
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            itemToDelete.value = null;
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
    const newItems = [...localItems.value];
    const [moved] = newItems.splice(dragIndex.value, 1);
    newItems.splice(index, 0, moved);
    localItems.value = newItems;
    const payload = newItems.map((item, idx) => ({ id: item.id, order: idx }));
    router.post('/admin/testimonials/reorder', { items: payload }, {
        preserveScroll: true,
        onError: () => { localItems.value = [...props.testimonials]; },
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
    { title: 'Testimonials', href: '/admin/testimonials' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Testimonials Management" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Testimonials</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage client and partner testimonials.</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" @click="goToCreate">
                    <Plus class="h-3.5 w-3.5" />Add Testimonial
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

            <!-- Testimonials grid -->
            <div v-if="localItems.length === 0" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <Quote class="h-12 w-12 text-muted-foreground/40" />
                <p class="text-sm text-muted-foreground">No testimonials yet.</p>
                <Button size="sm" @click="openCreateModal">Add your first testimonial</Button>
            </div>

            <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div
                    v-for="(item, idx) in localItems"
                    :key="item.id"
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
                    <!-- Drag handle -->
                    <div class="absolute left-2 top-2 z-10 rounded-md bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <GripVertical class="h-3.5 w-3.5 text-muted-foreground" />
                    </div>

                    <!-- Status badge (top right) -->
                    <div class="absolute right-2 top-2 z-10">
                        <Badge :variant="item.is_published ? 'default' : 'secondary'" class="text-[10px]">
                            {{ item.is_published ? 'Published' : 'Draft' }}
                        </Badge>
                    </div>

                    <div class="p-4">
                        <!-- Quote icon -->
                        <div class="mb-3 flex justify-between items-start">
                            <Quote class="h-6 w-6 text-primary/40" />
                        </div>

                        <!-- Testimonial text -->
                        <p class="text-sm text-foreground line-clamp-4 mb-4 italic">
                            “{{ item.testimonial_text }}”
                        </p>

                        <!-- Author -->
                        <div class="flex items-center gap-3 mt-3">
                            <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                                <img v-if="item.image_url" :src="item.image_url" :alt="item.name" class="h-full w-full object-cover" />
                                <div v-else class="flex h-full items-center justify-center">
                                    <User class="h-5 w-5 text-muted-foreground/40" />
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-foreground truncate">{{ item.name }}</p>
                                <p class="text-xs text-muted-foreground truncate">{{ item.designation || '—' }}</p>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="mt-4 flex items-center justify-end gap-1.5">
                            <Button size="sm" variant="outline" class="h-7 gap-1 text-xs" @click.stop="goToEdit(item)">
                                <Edit class="h-3 w-3" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10" @click.stop="confirmDelete(item)">
                                <Trash2 class="h-3 w-3" /> Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete testimonial</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ itemToDelete?.name }}”?<br>
                    This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" @click="deleteItem" :disabled="isDeleting">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>


    </AppLayout>
</template>
<style scoped>
[draggable="true"] {
    user-select: none;
}
.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
