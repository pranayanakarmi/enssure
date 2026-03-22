<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    application: {
        type: Object,
        required: true,
    },
});

const page = usePage();
const success = page.props.flash?.success;

const isPdfResume = computed(() => {
    const url = props.application.resume_url || '';
    const pathOnly = url.split(/[?#]/)[0];
    return /\.pdf$/i.test(pathOnly);
});

function formatSubmitted(iso) {
    if (!iso) {
        return '—';
    }
    try {
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    } catch {
        return iso;
    }
}

function confirmDelete() {
    if (!confirm('Delete this application and its stored resume file?')) {
        return;
    }
    router.delete(`/admin/vacancy-applications/${props.application.id}`);
}

const breadcrumbItems = [
    { title: 'Vacancies', href: '/admin/vacancies' },
    { title: 'Applications', href: '/admin/vacancy-applications' },
    { title: 'Application', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="`Application · ${application.name}`" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        :title="application.name"
                        :description="`Submitted ${formatSubmitted(application.submitted_at)}`"
                    />
                    <div class="flex flex-wrap gap-2">
                        <Button variant="outline" as-child>
                            <Link href="/admin/vacancy-applications">Back to list</Link>
                        </Button>
                        <Button
                            variant="destructive"
                            type="button"
                            @click="confirmDelete"
                        >
                            Delete
                        </Button>
                    </div>
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
                        <span>Applicant</span>
                    </CardHeader>
                    <CardContent class="space-y-4 p-6">
                        <div class="grid gap-1 text-sm">
                            <span class="text-muted-foreground">Email</span>
                            <a
                                :href="`mailto:${application.email}`"
                                class="font-medium text-foreground hover:underline"
                            >{{ application.email }}</a>
                        </div>
                        <div class="grid gap-1 text-sm">
                            <span class="text-muted-foreground">Phone</span>
                            <span class="font-medium text-foreground">{{ application.phone }}</span>
                        </div>
                        <div
                            v-if="application.vacancy"
                            class="grid gap-1 text-sm"
                        >
                            <span class="text-muted-foreground">Vacancy</span>
                            <span class="font-medium text-foreground">{{ application.vacancy.title }}</span>
                            <Link
                                v-if="application.vacancy.slug"
                                :href="`/vacancy/${application.vacancy.slug}`"
                                class="text-xs text-primary underline-offset-2 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open public job page
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card v-if="application.cover_letter">
                    <CardHeader>
                        <span class="text-base font-semibold">Cover letter</span>
                    </CardHeader>
                    <CardContent class="p-6 pt-0">
                        <p class="whitespace-pre-wrap text-sm text-foreground">
                            {{ application.cover_letter }}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <span class="text-base font-semibold">Resume</span>
                    </CardHeader>
                    <CardContent class="space-y-4 p-6 pt-0">
                        <div
                            v-if="isPdfResume"
                            class="overflow-hidden rounded-lg border border-border bg-muted/20"
                        >
                            <iframe
                                :title="`Resume PDF — ${application.name}`"
                                :src="application.resume_url"
                                class="h-[min(75vh,880px)] w-full min-h-[480px] border-0"
                                loading="lazy"
                            />
                        </div>
                        <div
                            v-else
                            class="rounded-lg border border-dashed border-border bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground"
                        >
                            Inline preview is available for PDF files only. Open or download the file below to view Word documents.
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <Button
                                v-if="isPdfResume"
                                variant="outline"
                                size="sm"
                                as-child
                            >
                                <a
                                    :href="application.resume_url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open in new tab
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                as-child
                            >
                                <a
                                    :href="application.resume_url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    Download
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
