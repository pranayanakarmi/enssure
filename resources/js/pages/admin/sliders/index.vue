<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Trash2 } from 'lucide-vue-next';

const props = defineProps({
    sliders: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

// Delete modal state
const showDeleteModal = ref(false);
const sliderToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(slider) {
    sliderToDelete.value = slider;
    showDeleteModal.value = true;
}

function deleteSlider() {
    if (!sliderToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/sliders/${sliderToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            sliderToDelete.value = null;
        },
    });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Sliders', href: '/admin/sliders' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Sliders" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <!-- Header with back button and add button -->
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-center gap-3">
                        <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                            <Link href="/admin/home">
                                <ArrowLeft class="h-3.5 w-3.5" />
                                Back
                            </Link>
                        </Button>
                        <Heading
                            variant="small"
                            title="Sliders"
                            description="Manage hero sliders and their slides"
                        />
                    </div>
                    <Button as-child>
                        <Link href="/admin/sliders/create">Add slider</Link>
                    </Button>
                </div>

                <!-- Flash messages -->
                <Transition
                    enter-active-class="transition ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in"
                    leave-to-class="opacity-0"
                >
                    <div v-if="success" class="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {{ success }}
                    </div>
                </Transition>
                <Transition>
                    <div v-if="error" class="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                        {{ error }}
                    </div>
                </Transition>

                <Card>
                    <CardHeader class="sr-only">
                        <span>Slider list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="slider in (sliders || [])"
                                :key="slider.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground">
                                        {{ slider.name }}
                                    </p>
                                    <p class="truncate text-sm text-muted-foreground">
                                        {{ slider.location || '—' }} · {{ slider.items_count ?? 0 }} items
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/sliders/${slider.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        class="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        @click="confirmDelete(slider)"
                                    >
                                        <Trash2 class="h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(sliders || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No sliders yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        <!-- Delete confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete slider</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ sliderToDelete?.name }}”?<br>
                    This will also delete all its slides. This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" @click="deleteSlider" :disabled="isDeleting">
                        {{ isDeleting ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
