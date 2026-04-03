<script setup>
import { Head, router } from '@inertiajs/vue3';
import { ExternalLink, FileText } from 'lucide-vue-next';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { index as reportsIndex } from '@/routes/reports';

const props = defineProps({
    reports: {
        type: Array,
        default: () => [],
    },
    selectedId: {
        type: Number,
        default: null,
    },
});

const selectedReport = computed(() => {
    if (props.selectedId == null || !props.reports?.length) {
        return null;
    }
    return props.reports.find((r) => r.id === props.selectedId) ?? null;
});

function selectReport(id) {
    router.get(reportsIndex.url({ query: { id } }), {}, { preserveScroll: true, replace: true });
}
</script>

<template>
    <GuestLayout>
        <div>
            <Head title="Reports - ENSSURE" />

            <PageHero title="Reports" />

            <section class="py-10 lg:py-16 bg-white border-b border-[#cad0d8]">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        class="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-stretch lg:min-h-[calc(100vh-14rem)]"
                    >
                        <aside
                            class="w-full lg:w-80 shrink-0 lg:max-w-[20rem]"
                            aria-label="Reports navigation"
                        >
                            <nav aria-label="Document list">
                                <ul
                                    class="divide-y divide-[#cad0d8] border border-[#cad0d8] rounded-[20px] overflow-hidden bg-white lg:rounded-r-none lg:border-r-0"
                                >
                                    <li v-for="report in reports" :key="report.id">
                                        <button
                                            type="button"
                                            class="w-full text-left flex items-start gap-3 px-4 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B91C1C] focus-visible:ring-offset-2"
                                            :class="
                                                selectedId === report.id
                                                    ? 'bg-[rgba(235,31,39,0.08)] text-[#B91C1C]'
                                                    : 'hover:bg-gray-50 text-gray-900'
                                            "
                                            @click="selectReport(report.id)"
                                        >
                                            <FileText
                                                class="w-5 h-5 shrink-0 mt-0.5 text-[#B91C1C]"
                                                aria-hidden="true"
                                            />
                                            <span class="text-sm sm:text-base font-medium leading-snug">
                                                {{ report.title }}
                                            </span>
                                        </button>
                                    </li>
                                    <li
                                        v-if="!reports || reports.length === 0"
                                        class="px-4 py-12 text-center text-sm text-gray-500"
                                    >
                                        No reports available yet.
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        <div
                            class="flex-1 flex flex-col min-h-0 border border-[#cad0d8] rounded-[20px] overflow-hidden bg-[#f4f5f7] lg:rounded-l-none lg:border-l-0"
                        >
                            <template v-if="selectedReport">
                                <div
                                    class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white border-b border-[#cad0d8] shrink-0"
                                >
                                    <h2 class="text-base sm:text-lg font-medium text-gray-900 truncate min-w-0 pr-2">
                                        {{ selectedReport.title }}
                                    </h2>
                                    <a
                                        :href="selectedReport.pdf_url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium uppercase tracking-wide text-[#B91C1C] hover:underline shrink-0"
                                    >
                                        <ExternalLink class="w-4 h-4" aria-hidden="true" />
                                        Open in new tab
                                    </a>
                                </div>
                                <div class="flex-1 min-h-[50vh] lg:min-h-0 p-3 sm:p-4 flex flex-col">
                                    <iframe
                                        :title="selectedReport.title"
                                        :src="selectedReport.pdf_url"
                                        class="w-full flex-1 min-h-[420px] rounded-lg border border-[#cad0d8] bg-white shadow-sm"
                                    />
                                </div>
                            </template>
                            <div
                                v-else
                                class="flex flex-1 items-center justify-center px-6 py-20 text-center text-gray-500 text-sm"
                            >
                                Select a document from the list to view it here.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </GuestLayout>
</template>
