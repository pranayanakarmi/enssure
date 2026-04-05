<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    videos: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Videos', href: '/admin/videos' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Videos" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Videos"
                        description="Manage featured videos displayed on the homepage"
                    />
                    <Button as-child>
                        <Link href="/admin/videos/create">Add video</Link>
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
                        <span>Video list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="video in (videos || [])"
                                :key="video.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center gap-2">
                                        <p class="truncate font-medium text-foreground">
                                            {{ video.title }}
                                        </p>
                                        <Badge :variant="video.is_active ? 'default' : 'secondary'">
                                            {{ video.is_active ? 'Active' : 'Inactive' }}
                                        </Badge>
                                    </div>
                                    <div class="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                        <span>Order: {{ video.order }}</span>
                                        <span>URL: {{ video.video_url }}</span>
                                        <span v-if="video.date">Date: {{ video.date }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/videos/${video.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(videos || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No videos yet. Click "Add video" to create one.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
