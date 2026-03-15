<script setup>
import { Head, Link, usePage, router } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    galleries: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

function deleteAlbum(gallery) {
    if (!confirm(`Delete album "${gallery.title}"? This will also remove all images in this album.`)) {
        return;
    }
    router.delete(`/admin/galleries/${gallery.id}`);
}

const breadcrumbItems = [
    { title: 'Gallery Page', href: '#' },
    { title: 'Albums', href: '/admin/galleries' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Albums" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Albums"
                        description="Manage gallery albums. Each album has a title, cover image, and images inside."
                    />
                    <Button as-child>
                        <Link href="/admin/galleries/create">Add album</Link>
                    </Button>
                </div>

                <Transition
                    enter-active-class="transition ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="success"
                        class="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                        {{ success }}
                    </p>
                </Transition>

                <Card>
                    <CardHeader class="sr-only">
                        <span>Gallery list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="g in (galleries || [])"
                                :key="g.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="flex min-w-0 flex-1 items-center gap-4">
                                    <div class="h-14 w-14 shrink-0 overflow-hidden rounded-md border bg-muted">
                                        <img
                                            v-if="g.cover_image_url"
                                            :src="g.cover_image_url"
                                            :alt="g.title"
                                            class="h-full w-full object-cover"
                                        />
                                        <div
                                            v-else
                                            class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                        >
                                            No cover
                                        </div>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="truncate font-medium text-foreground">
                                            {{ g.title }}
                                        </p>
                                        <p class="truncate text-sm text-muted-foreground">
                                            {{ g.slug }} · {{ g.images_count ?? 0 }} images
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/galleries/${g.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        class="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        @click="deleteAlbum(g)"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(galleries || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No galleries yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
