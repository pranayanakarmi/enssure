<script setup>
import { Head, Link, usePage, router } from '@inertiajs/vue3';
import { ArrowLeft, Edit, Trash2, ImageIcon, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import Heading from '@/components/Heading.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    galleries: { type: Array, default: () => [] },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Delete modal state
const showDeleteModal = ref(false);
const galleryToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(gallery) {
    galleryToDelete.value = gallery;
    showDeleteModal.value = true;
}

function deleteGallery() {
    if (!galleryToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/galleries/${galleryToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            galleryToDelete.value = null;
        },
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Gallery Page', href: '/admin/gallery-page' },
    { title: 'Albums', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Albums" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/gallery-page">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Gallery Albums</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Manage photo albums and their cover images.</p>
                    </div>
                </div>
                <Button size="sm" as-child class="h-8 gap-1.5 text-xs">
                    <Link href="/admin/galleries/create">Add album</Link>
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

            <!-- Albums Table -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Albums List</CardTitle>
                    <CardDescription class="text-xs">Click Edit to modify an album or Delete to remove it.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left font-medium">Cover</th>
                                    <th class="px-4 py-3 text-left font-medium">Title</th>
                                    <th class="px-4 py-3 text-left font-medium">Slug</th>
                                    <th class="px-4 py-3 text-left font-medium">Images</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="galleries.length === 0">
                                    <td colspan="5" class="px-4 py-12 text-center text-sm text-gray-500">
                                        No albums yet. Click "Add album" to create one.
                                    </td>
                                </tr>
                                <tr
                                    v-for="g in galleries"
                                    :key="g.id"
                                    class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td class="px-4 py-3">
                                        <div class="h-12 w-20 overflow-hidden rounded bg-gray-100">
                                            <img
                                                v-if="g.cover_image_url"
                                                :src="g.cover_image_url"
                                                :alt="g.title"
                                                class="h-full w-full object-cover"
                                            />
                                            <div v-else class="flex h-full items-center justify-center text-gray-400">
                                                <ImageIcon class="h-6 w-6" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 font-medium text-gray-900">
                                        {{ g.title }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-500">
                                        {{ g.slug }}
                                    </td>
                                    <td class="px-4 py-3">
                                        <Badge variant="outline">{{ g.images_count ?? 0 }}</Badge>
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                class="h-7 gap-1 text-xs"
                                                as-child
                                            >
                                                <Link :href="`/admin/galleries/${g.id}/edit`">
                                                    <Edit class="h-3 w-3" /> Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10"
                                                @click="confirmDelete(g)"
                                            >
                                                <Trash2 class="h-3 w-3" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete album</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ galleryToDelete?.title }}”?<br>
                    This will also delete all images inside the album. This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" @click="deleteGallery" :disabled="isDeleting">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
