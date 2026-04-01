<!-- <script setup>
import { computed } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { ExternalLink, FileText } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';
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
</template> -->

<script setup>
import { ref, computed } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { Eye, Printer, Download, Search, X, Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';
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

// Search and filter state
const searchQuery = ref('');
const selectedType = ref('');

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);
const pageSizeOptions = [10, 25, 50, 100];

// Compute unique document types from the actual data
const documentTypes = computed(() => {
    const types = props.reports
        .map(r => r.document_type)
        .filter(type => type != null && type !== '');
    const unique = [...new Set(types)];
    // Fallback if no types exist in data
    if (unique.length === 0) {
        return ['report', 'documents'];
    }
    return unique.sort();
});

// Filtered reports based on search and document type
const filteredReports = computed(() => {
    let filtered = props.reports;

    if (selectedType.value) {
        filtered = filtered.filter(r => r.document_type === selectedType.value);
    }

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.trim().toLowerCase();
        filtered = filtered.filter(r =>
            r.title.toLowerCase().includes(query) ||
            (r.description && r.description.toLowerCase().includes(query))
        );
    }

    return filtered;
});

// Paginated reports
const paginatedReports = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredReports.value.slice(start, end);
});

// Total pages
const totalPages = computed(() => Math.ceil(filteredReports.value.length / itemsPerPage.value));

// Reset to first page when filters change
function resetPagination() {
    currentPage.value = 1;
}

// Watch filters to reset page
watch([searchQuery, selectedType], () => {
    resetPagination();
});

// Import watch
import { watch } from 'vue';

function selectReport(id) {
    router.get(reportsIndex.url({ query: { id } }), {}, { preserveScroll: true, replace: true });
}

function viewReport(pdfUrl) {
    window.open(pdfUrl, '_blank');
}

function printReport(pdfUrl, title) {
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
        printWindow.onload = () => {
            printWindow.print();
        };
    } else {
        window.open(pdfUrl, '_blank');
    }
}

function downloadReport(pdfUrl, title) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title.replace(/[^a-z0-9]/gi, '_') + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearFilters() {
    searchQuery.value = '';
    selectedType.value = '';
}

function formatDocumentType(type) {
    if (!type) return 'General';
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function getBadgeClass(type) {
    if (type === 'report') return 'bg-blue-100 text-blue-800';
    if (type === 'documents') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
}

// Pagination methods
function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function nextPage() {
    goToPage(currentPage.value + 1);
}

function prevPage() {
    goToPage(currentPage.value - 1);
}
</script>

<template>
    <GuestLayout>
        <div>
            <Head title="Reports - ENSSURE" />

            <PageHero title="Reports" />

            <section class="py-10 lg:py-16 bg-white border-b border-[#cad0d8]">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Datatable Card -->
                    <div class="overflow-hidden rounded-xl border border-[#cad0d8] bg-white shadow-sm">
                        <!-- Header with Title -->
                        <div class="px-6 py-4 border-b border-[#cad0d8] bg-gray-50">
                            <h2 class="text-xl font-semibold text-gray-900">Document Library</h2>
                            <p class="text-sm text-gray-500 mt-1">Browse, search and manage all PDF reports</p>
                        </div>

                        <!-- Search and Filter Bar -->
                        <div class="flex flex-col sm:flex-row justify-between gap-4 p-4 border-b border-[#cad0d8] bg-gray-50/50">
                            <div class="relative flex-1">
                                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    v-model="searchQuery"
                                    placeholder="Search by title or description..."
                                    class="w-full pl-9 pr-3 py-2 border border-[#cad0d8] rounded-lg focus:ring-2 focus:ring-[#B91C1C] focus:border-transparent outline-none transition bg-white"
                                />
                            </div>
                            <div class="flex gap-2">
                                <div class="relative">
                                    <Filter class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    <select
                                        v-model="selectedType"
                                        class="pl-9 pr-8 py-2 border border-[#cad0d8] rounded-lg bg-white focus:ring-2 focus:ring-[#B91C1C] focus:border-transparent outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">All Types</option>
                                        <option v-for="type in documentTypes" :key="type" :value="type">
                                            {{ formatDocumentType(type) }}
                                        </option>
                                    </select>
                                </div>
                                <button
                                    @click="clearFilters"
                                    class="inline-flex items-center gap-1 px-3 py-2 border border-[#cad0d8] rounded-lg text-gray-600 hover:bg-gray-100 transition"
                                    :disabled="!searchQuery && !selectedType"
                                    :class="{ 'opacity-50 cursor-not-allowed': !searchQuery && !selectedType }"
                                >
                                    <X class="w-4 h-4" />
                                    <span class="hidden sm:inline">Clear</span>
                                </button>
                            </div>
                        </div>

                        <!-- Results Count & Items Per Page -->
                        <div class="flex flex-wrap justify-between items-center gap-4 px-4 py-2 text-xs text-gray-500 bg-white border-b border-[#cad0d8]">
                            <div>
                                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredReports.length) }} of {{ filteredReports.length }} reports
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-gray-600">Show</span>
                                <select
                                    v-model="itemsPerPage"
                                    class="border border-[#cad0d8] rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-[#B91C1C] outline-none"
                                    @change="resetPagination"
                                >
                                    <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
                                </select>
                                <span>per page</span>
                            </div>
                        </div>

                        <!-- Table -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-[#cad0d8]">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>

                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-[#cad0d8]">
                                    <tr
                                        v-for="(report, index) in paginatedReports"
                                        :key="report.id"
                                        :class="{ 'bg-[rgba(235,31,39,0.04)]': selectedId === report.id }"
                                        class="hover:bg-gray-50 transition-colors"
                                    >
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                                        </td>
                                        <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ report.title }}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{{ report.description || '—' }}</td>
                                        <td class="px-4 py-3 text-sm">
                                            <span
                                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                                :class="getBadgeClass(report.document_type)"
                                            >
                                                {{ formatDocumentType(report.document_type) }}
                                            </span>
                                        </td>

                                        <td class="px-4 py-3 whitespace-nowrap text-sm">
                                            <div class="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    @click="viewReport(report.pdf_url)"
                                                    class="inline-flex items-center gap-1 text-gray-600 hover:text-[#B91C1C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B91C1C] focus-visible:ring-offset-2 rounded"
                                                    aria-label="View report"
                                                >
                                                    <Eye class="w-4 h-4" />
                                                    <span class="sr-only md:not-sr-only md:inline-block text-xs">View</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    @click="printReport(report.pdf_url, report.title)"
                                                    class="inline-flex items-center gap-1 text-gray-600 hover:text-[#B91C1C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B91C1C] focus-visible:ring-offset-2 rounded"
                                                    aria-label="Print report"
                                                >
                                                    <Printer class="w-4 h-4" />
                                                    <span class="sr-only md:not-sr-only md:inline-block text-xs">Print</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    @click="downloadReport(report.pdf_url, report.title)"
                                                    class="inline-flex items-center gap-1 text-gray-600 hover:text-[#B91C1C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B91C1C] focus-visible:ring-offset-2 rounded"
                                                    aria-label="Download report"
                                                >
                                                    <Download class="w-4 h-4" />
                                                    <span class="sr-only md:not-sr-only md:inline-block text-xs">Download</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="paginatedReports.length === 0">
                                        <td colspan="6" class="px-4 py-12 text-center text-sm text-gray-500">
                                            No reports match your filters.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination Controls -->
                        <div v-if="totalPages > 1" class="flex justify-between items-center gap-4 px-4 py-3 border-t border-[#cad0d8] bg-gray-50">
                            <div class="flex-1 text-sm text-gray-600">
                                Page {{ currentPage }} of {{ totalPages }}
                            </div>
                            <div class="flex gap-2">
                                <button
                                    @click="prevPage"
                                    :disabled="currentPage === 1"
                                    class="inline-flex items-center gap-1 px-3 py-1 border border-[#cad0d8] rounded-md text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft class="w-4 h-4" />
                                    Previous
                                </button>
                                <button
                                    @click="nextPage"
                                    :disabled="currentPage === totalPages"
                                    class="inline-flex items-center gap-1 px-3 py-1 border border-[#cad0d8] rounded-md text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Next
                                    <ChevronRight class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </GuestLayout>
</template>
