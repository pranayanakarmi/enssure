<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    posts: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

const breadcrumbItems = [
    { title: 'Posts', href: '/admin/posts' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Posts" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Posts"
                        description="Drafts (no published date) are hidden from the public blog at /posts."
                    />
                    <Button as-child>
                        <Link href="/admin/posts/create">Add post</Link>
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
                        <span>Post list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="p in (posts || [])"
                                :key="p.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground">
                                        {{ p.title }}
                                    </p>
                                    <p class="truncate text-sm text-muted-foreground">
                                        {{ p.category || '—' }} · {{ p.published_at ? new Date(p.published_at).toLocaleDateString() : 'Draft' }}
                                    </p>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <Button
                                        v-if="p.published_at"
                                        variant="outline"
                                        size="sm"
                                        as-child
                                    >
                                        <Link :href="`/posts/${p.slug}`" target="_blank" rel="noopener noreferrer">
                                            View live
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/posts/${p.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(posts || []).length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No posts yet.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
