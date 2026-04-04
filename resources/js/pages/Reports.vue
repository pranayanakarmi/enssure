<script setup>
import { ref, computed, watch } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { Eye, Printer, Download, Search, X, Filter, ChevronLeft, ChevronRight, FileText, Grid3X3, List } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
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

// Search and filter state
const searchQuery = ref('');
const selectedType = ref('');

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(12);
const pageSizeOptions = [12, 24, 36, 48];

// Modal state
const modalOpen = ref(false);
const selectedReport = ref(null);

// Compute unique document types with counts
const documentTypesWithCount = computed(() => {
    const typeMap = new Map();
    props.reports.forEach(report => {
        const type = report.document_type || 'general';
        typeMap.set(type, (typeMap.get(type) || 0) + 1);
    });
    const types = Array.from(typeMap.entries()).map(([type, count]) => ({
        type,
        count,
        label: formatDocumentType(type)
    }));
    return types.sort((a, b) => a.label.localeCompare(b.label));
});

// Filtered reports based on search and document type
const filteredReports = computed(() => {
    let filtered = props.reports;

    if (selectedType.value) {
        filtered = filtered.filter(r => (r.document_type || 'general') === selectedType.value);
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

// Page numbers for pagination
const pageNumbers = computed(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages.value; i++) {
        if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
            range.push(i);
        }
    }

    range.forEach((i) => {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    });

    return rangeWithDots;
});

// Reset to first page when filters change
function resetPagination() {
    currentPage.value = 1;
}

// Watch filters to reset page
watch([searchQuery, selectedType], () => {
    resetPagination();
});

function openModal(report) {
    selectedReport.value = report;
    modalOpen.value = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOpen.value = false;
    selectedReport.value = null;
    document.body.style.overflow = '';
}

function viewReportInNewTab(pdfUrl) {
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

function setTypeFilter(type) {
    selectedType.value = type === 'all' ? '' : type;
}

function formatDocumentType(type) {
    if (!type || type === 'general') return 'General';
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function getBadgeClass(type) {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-medium';
    const typeLower = (type || 'general').toLowerCase();

    const styles = {
        report: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
        documents: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
        general: 'bg-gray-50 text-gray-600 ring-1 ring-gray-500/20',
        annual: 'bg-purple-50 text-purple-700 ring-1 ring-purple-600/20',
        financial: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
        technical: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20',
    };

    return `${base} ${styles[typeLower] || styles.general}`;
}

function getTypeIcon(type) {
    const typeLower = (type || 'general').toLowerCase();
    const icons = {
        report: '📊',
        documents: '📄',
        annual: '📅',
        financial: '💰',
        technical: '⚙️',
        general: '📁'
    };
    return icons[typeLower] || icons.general;
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

// Handle ESC key to close modal
watch(modalOpen, (isOpen) => {
    if (isOpen) {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }
});

// Cleanup on unmount
import { onBeforeUnmount } from 'vue';
onBeforeUnmount(() => {
    document.body.style.overflow = '';
});
</script>

<template>
    <GuestLayout>
        <div>
            <Head title="Document Repository - ENSSURE" />

            <PageHero title="Document Repository" />

            <section class="py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <!-- Document Repository Header -->
                    <div class="mb-8 text-center">
                        <!-- <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Document Library
                        </h1> -->
                        <p class="mt-2 text-lg text-gray-600">
                            Browse, search and access all your important documents
                        </p>
                    </div>

                    <!-- Search and Filter Section - Modern & Attractive -->
                    <div class="mb-8 space-y-5">
                        <!-- Search Bar with Enhanced Design -->
                        <div class="relative max-w-2xl mx-auto">
                            <div class="relative group">
                                <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200" />
                                <input
                                    type="text"
                                    v-model="searchQuery"
                                    placeholder="Search by title, description or keywords..."
                                    class="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                                />
                                <button
                                    v-if="searchQuery"
                                    @click="searchQuery = ''"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Filter Chips - Modern Pill Design with Counts -->
                        <div class="flex flex-wrap items-center justify-center gap-2.5">
                            <button
                                @click="setTypeFilter('all')"
                                :class="[
                                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                                    selectedType === ''
                                        ? 'bg-red-600 text-white shadow-md shadow-red-200'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                ]"
                            >
                                All Documents
                                <span class="ml-1.5 text-xs font-normal opacity-80">
                                    ({{ filteredReports.length }})
                                </span>
                            </button>
                            <button
                                v-for="type in documentTypesWithCount"
                                :key="type.type"
                                @click="setTypeFilter(type.type)"
                                :class="[
                                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                                    selectedType === type.type
                                        ? 'bg-red-600 text-white shadow-md shadow-red-200'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                ]"
                            >
                                <span>{{ type.label }}</span>
                                <span class="text-xs font-normal opacity-80">({{ type.count }})</span>
                            </button>
                            <button
                                v-if="searchQuery || selectedType"
                                @click="clearFilters"
                                class="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 flex items-center gap-1"
                            >
                                <X class="w-3.5 h-3.5" />
                                Clear
                            </button>
                        </div>
                    </div>

                    <!-- Results Stats & Items Per Page -->
                    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
                        <div class="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                            <span class="font-medium text-gray-700">{{ filteredReports.length }}</span> documents found
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-sm text-gray-500">Show</span>
                            <select
                                v-model="itemsPerPage"
                                class="border border-gray-200 rounded-xl px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
                                @change="resetPagination"
                            >
                                <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
                            </select>
                            <span class="text-sm text-gray-500">per page</span>
                        </div>
                    </div>

                    <!-- Card Grid - Modern Block Layout -->
                    <div v-if="paginatedReports.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div
                            v-for="report in paginatedReports"
                            :key="report.id"
                            :class="[
                                'group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden',
                                selectedId === report.id ? 'ring-2 ring-red-500 ring-offset-2' : 'hover:border-gray-200'
                            ]"
                            @click="openModal(report)"
                        >
                            <!-- Card Header with Icon -->
                            <div class="absolute top-3 right-3 z-10">
                                <span
                                    :class="getBadgeClass(report.document_type)"
                                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-white/90"
                                >
                                    <span>{{ getTypeIcon(report.document_type) }}</span>
                                    {{ formatDocumentType(report.document_type) }}
                                </span>
                            </div>

                            <!-- Document Icon Area -->
                            <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex justify-center">
                                <div class="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <FileText class="w-8 h-8 text-red-600" />
                                </div>
                            </div>

                            <!-- Card Content -->
                            <div class="p-5">
                                <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {{ report.title }}
                                </h3>
                                <p class="text-sm text-gray-500 line-clamp-3 mb-4">
                                    {{ report.description || 'No description available' }}
                                </p>

                                <!-- Action Buttons -->
                                <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div class="flex items-center gap-1">
                                        <button
                                            @click.stop="openModal(report)"
                                            class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                            title="View Document"
                                        >
                                            <Eye class="w-4.5 h-4.5" />
                                        </button>
                                        <button
                                            @click.stop="printReport(report.pdf_url, report.title)"
                                            class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                            title="Print"
                                        >
                                            <Printer class="w-4.5 h-4.5" />
                                        </button>
                                        <button
                                            @click.stop="downloadReport(report.pdf_url, report.title)"
                                            class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                            title="Download"
                                        >
                                            <Download class="w-4.5 h-4.5" />
                                        </button>
                                    </div>
                                    <span class="text-xs text-gray-400">
                                        PDF
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-else class="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText class="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                        <p class="text-gray-500">Try adjusting your search or filter criteria</p>
                        <button
                            @click="clearFilters"
                            class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                        >
                            <X class="w-4 h-4" />
                            Clear all filters
                        </button>
                    </div>

                    <!-- Enhanced Pagination -->
                    <div v-if="totalPages > 1" class="mt-10 flex justify-center">
                        <nav class="flex items-center gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                            <button
                                @click="prevPage"
                                :disabled="currentPage === 1"
                                class="px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft class="w-5 h-5" />
                            </button>

                            <div class="flex items-center gap-1">
                                <button
                                    v-for="page in pageNumbers"
                                    :key="page"
                                    @click="typeof page === 'number' ? goToPage(page) : null"
                                    :class="[
                                        'min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all',
                                        currentPage === page
                                            ? 'bg-red-600 text-white shadow-sm'
                                            : page === '...'
                                                ? 'text-gray-400 cursor-default'
                                                : 'text-gray-600 hover:bg-gray-100'
                                    ]"
                                    :disabled="page === '...'"
                                >
                                    {{ page }}
                                </button>
                            </div>

                            <button
                                @click="nextPage"
                                :disabled="currentPage === totalPages"
                                class="px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight class="w-5 h-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </section>
        </div>

        <!-- Modern Modal Popup with PDF Preview -->
        <Teleport to="body">
            <div
                v-if="modalOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                @click.self="closeModal"
            >
                <!-- Backdrop with blur effect -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"></div>

                <!-- Modal Content -->
                <div class="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-lg font-semibold text-gray-900 truncate">
                                {{ selectedReport?.title }}
                            </h3>
                            <div class="flex items-center gap-2 mt-1">
                                <span :class="getBadgeClass(selectedReport?.document_type)" class="inline-flex items-center gap-1 text-xs">
                                    {{ getTypeIcon(selectedReport?.document_type) }}
                                    {{ formatDocumentType(selectedReport?.document_type) }}
                                </span>
                                <span class="text-xs text-gray-400">PDF Document</span>
                            </div>
                        </div>
                        <button
                            @click="closeModal"
                            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- PDF Preview Area -->
                    <div class="p-4 bg-gray-50">
                        <div class="bg-white rounded-xl overflow-hidden shadow-inner">
                            <iframe
                                :src="selectedReport?.pdf_url"
                                class="w-full h-[60vh] min-h-[400px]"
                                frameborder="0"
                                title="PDF Preview"
                            ></iframe>
                        </div>
                    </div>

                    <!-- Modal Footer with Actions -->
                    <div class="flex items-center justify-between gap-3 p-5 border-t border-gray-100 bg-white">
                        <div class="flex items-center gap-2">
                            <button
                                @click="printReport(selectedReport?.pdf_url, selectedReport?.title)"
                                class="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                            >
                                <Printer class="w-4 h-4" />
                                <span class="text-sm font-medium">Print</span>
                            </button>
                            <button
                                @click="downloadReport(selectedReport?.pdf_url, selectedReport?.title)"
                                class="inline-flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm"
                            >
                                <Download class="w-4 h-4" />
                                <span class="text-sm font-medium">Download</span>
                            </button>
                        </div>
                        <button
                            @click="viewReportInNewTab(selectedReport?.pdf_url)"
                            class="inline-flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                            <Eye class="w-4 h-4" />
                            <span class="text-sm">Open in new tab</span>
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </GuestLayout>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.2s ease-out;
}
</style>
