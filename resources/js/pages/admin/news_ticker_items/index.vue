<script setup>
import HomeNewsSectionController from '@/actions/App/Http/Controllers/Admin/HomeNewsSectionController';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    allNotices: {
        type: Array,
        default: () => [],
    },
    homeNewsNoticeIds: {
        type: Array,
        default: () => [],
    },
    canUpdateHomeNewsNotices: {
        type: Boolean,
        default: false,
    },
});

const homeNoticesForm = useForm({
    notice_ids: [...props.homeNewsNoticeIds],
});

const selectedNotices = computed(() =>
    homeNoticesForm.notice_ids
        .map((id) => props.allNotices.find((n) => n.id === id))
        .filter(Boolean),
);

function addNotice(notice) {
    if (homeNoticesForm.notice_ids.includes(notice.id)) {
        return;
    }
    homeNoticesForm.notice_ids = [...homeNoticesForm.notice_ids, notice.id];
}

function removeNotice(noticeId) {
    homeNoticesForm.notice_ids = homeNoticesForm.notice_ids.filter(
        (id) => id !== noticeId,
    );
}

function toggleNotice(notice) {
    if (isNoticeSelected(notice.id)) {
        removeNotice(notice.id);
    } else {
        addNotice(notice);
    }
}

function isNoticeSelected(noticeId) {
    return homeNoticesForm.notice_ids.includes(noticeId);
}

function selectedPosition(noticeId) {
    const index = homeNoticesForm.notice_ids.indexOf(noticeId);
    return index === -1 ? null : index + 1;
}

function moveNoticeUp(index) {
    if (index <= 0) {
        return;
    }
    const next = [...homeNoticesForm.notice_ids];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    homeNoticesForm.notice_ids = next;
}

function moveNoticeDown(index) {
    if (index >= homeNoticesForm.notice_ids.length - 1) {
        return;
    }
    const next = [...homeNoticesForm.notice_ids];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    homeNoticesForm.notice_ids = next;
}

function saveHomeNewsNotices() {
    homeNoticesForm.put(HomeNewsSectionController.update.url(), {
        preserveScroll: true,
    });
}

const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);

const breadcrumbItems = [
    { title: 'News Ticker', href: '/admin/news_ticker_items' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="News Ticker" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="News Ticker"
                    description="Choose notices for the home page: they appear in the Latest News section and in the scrolling headline bar under the site header, in the order below."
                />

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
                    <CardHeader>
                        <span class="font-medium">Latest News section (home page)</span>
                        <p class="text-sm text-muted-foreground">
                            Select which notices from
                            <Link
                                href="/admin/notices"
                                class="text-primary underline hover:no-underline"
                            >
                                Notices
                            </Link>
                            appear in the home page Latest News block and in the header news ticker.
                            Order below is the order shown on the site.
                            <Link
                                v-if="canUpdateHomeNewsNotices"
                                href="/admin/home-news-section/edit"
                                class="ml-1 text-primary underline hover:no-underline"
                            >
                                Edit section title, text and CTA
                            </Link>
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <p
                            v-if="!canUpdateHomeNewsNotices"
                            class="text-sm text-muted-foreground"
                        >
                            You do not have permission to change which notices appear in this section.
                        </p>
                        <template v-else>
                            <div
                                v-if="selectedNotices.length"
                                class="space-y-3"
                            >
                                <p class="text-sm font-medium text-muted-foreground">
                                    Selected for home page (in order)
                                </p>
                                <ul class="space-y-2 rounded-md border border-sidebar-border p-3">
                                    <li
                                        v-for="(notice, index) in selectedNotices"
                                        :key="notice.id"
                                        class="flex items-center justify-between gap-4 rounded border border-transparent bg-muted/30 px-3 py-2"
                                    >
                                        <div class="flex min-w-0 flex-1 items-center gap-3">
                                            <div class="h-12 w-16 shrink-0 overflow-hidden rounded border bg-muted">
                                                <img
                                                    v-if="notice.image_url"
                                                    :src="notice.image_url"
                                                    :alt="notice.title"
                                                    class="h-full w-full object-cover"
                                                />
                                                <div
                                                    v-else
                                                    class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                                >
                                                    No image
                                                </div>
                                            </div>
                                            <span class="truncate font-medium">{{ notice.title }}</span>
                                            <span class="text-xs text-muted-foreground">#{{ index + 1 }}</span>
                                        </div>
                                        <div class="flex shrink-0 gap-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                :disabled="index === 0"
                                                @click="moveNoticeUp(index)"
                                            >
                                                Up
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                :disabled="index === selectedNotices.length - 1"
                                                @click="moveNoticeDown(index)"
                                            >
                                                Down
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                @click="removeNotice(notice.id)"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="space-y-3">
                                <p class="text-sm font-medium text-muted-foreground">
                                    All notices — click to select
                                </p>
                                <ul
                                    v-if="allNotices.length"
                                    class="space-y-2 rounded-md border border-sidebar-border p-3"
                                >
                                    <li
                                        v-for="notice in allNotices"
                                        :key="notice.id"
                                        class="flex cursor-pointer items-center gap-4 rounded border border-transparent px-3 py-2 transition-colors hover:bg-muted/50"
                                        :class="{ 'bg-primary/5 border-primary/20': isNoticeSelected(notice.id) }"
                                        @click="toggleNotice(notice)"
                                    >
                                        <input
                                            type="checkbox"
                                            :checked="isNoticeSelected(notice.id)"
                                            class="h-4 w-4 shrink-0 rounded border-input"
                                            @click.stop
                                            @change="toggleNotice(notice)"
                                        />
                                        <div class="h-12 w-16 shrink-0 overflow-hidden rounded border bg-muted">
                                            <img
                                                v-if="notice.image_url"
                                                :src="notice.image_url"
                                                :alt="notice.title"
                                                class="h-full w-full object-cover"
                                            />
                                            <div
                                                v-else
                                                class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                            >
                                                No image
                                            </div>
                                        </div>
                                        <span class="min-w-0 flex-1 truncate font-medium">{{ notice.title }}</span>
                                        <span
                                            v-if="isNoticeSelected(notice.id)"
                                            class="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary"
                                        >
                                            Selected #{{ selectedPosition(notice.id) }}
                                        </span>
                                        <span
                                            v-else
                                            class="shrink-0 text-xs text-muted-foreground"
                                        >
                                            Not selected
                                        </span>
                                    </li>
                                </ul>
                                <p
                                    v-else
                                    class="py-4 text-center text-sm text-muted-foreground"
                                >
                                    No notices yet. Create them in
                                    <Link
                                        href="/admin/notices"
                                        class="text-primary underline hover:no-underline"
                                    >
                                        Notices
                                    </Link>
                                    .
                                </p>
                                <InputError :message="homeNoticesForm.errors.notice_ids" />
                            </div>
                            <div class="flex items-center gap-4">
                                <Button
                                    type="button"
                                    :disabled="homeNoticesForm.processing"
                                    @click="saveHomeNewsNotices"
                                >
                                    Save home page news
                                </Button>
                            </div>
                        </template>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
