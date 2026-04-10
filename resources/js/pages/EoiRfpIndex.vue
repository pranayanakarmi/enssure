<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';
import { Calendar, MapPin, Briefcase } from 'lucide-vue-next';

const props = defineProps({
    items: Array,
    hero: Object,
});

const activeFilter = ref('all'); // 'all', 'eoi', 'rfp'

const filteredItems = computed(() => {
    if (activeFilter.value === 'all') return props.items;
    return props.items.filter(i => i.type === activeFilter.value);
});

const pageTitle = computed(() => props.hero?.title ?? 'EOI / RFP');
const metaDescription = computed(() => props.hero?.description ?? 'Browse all Expressions of Interest and Requests for Proposal.');
const pageUrl = computed(() => window.location.href);
const ogImage = computed(() => props.hero?.hero_image_url ?? null);

function formatDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function deadlineClass(deadline) {
    if (!deadline) return 'text-gray-500';
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (days <= 7) return 'text-red-600 font-semibold';
    if (days <= 14) return 'text-orange-500 font-semibold';
    return 'text-gray-500';
}

function deadlineLabel(deadline) {
    if (!deadline) return null;
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Expired';
    if (days === 0) return 'Closes today';
    if (days === 1) return 'Closes tomorrow';
    if (days <= 7) return `${days} days left`;
    return `Deadline: ${deadline}`;
}
</script>

<template>
    <GuestLayout>
        <Head>
            <title>{{ pageTitle }}</title>
            <meta name="description" :content="metaDescription" />
            <link rel="canonical" :href="pageUrl" />
            <meta property="og:title" :content="pageTitle" />
            <meta property="og:description" :content="metaDescription" />
            <meta property="og:url" :content="pageUrl" />
            <meta property="og:type" content="website" />
            <meta property="og:image" :content="ogImage" v-if="ogImage" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <PageHero :title="pageTitle" :hero-image-url="props.hero?.hero_image_url" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Header with filter tabs -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <div>
                        <div class="inline-flex items-center px-4 py-1.5 bg-[rgba(235,31,39,0.1)] rounded-full mb-3">
                            <span class="text-xs font-semibold text-[#B91C1C] uppercase tracking-wide">
                                Open Opportunities
                            </span>
                        </div>
                        <h2 class="text-3xl font-semibold text-[#101010] leading-tight">
                            {{ pageTitle }}
                        </h2>
                    </div>
                    <div class="flex gap-2 border-b border-gray-200 pb-1">
                        <button
                            @click="activeFilter = 'all'"
                            :class="['px-4 py-1.5 text-sm font-medium rounded-full transition-all', activeFilter === 'all' ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
                        >
                            All
                        </button>
                        <button
                            @click="activeFilter = 'eoi'"
                            :class="['px-4 py-1.5 text-sm font-medium rounded-full transition-all', activeFilter === 'eoi' ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
                        >
                            EOI
                        </button>
                        <button
                            @click="activeFilter = 'rfp'"
                            :class="['px-4 py-1.5 text-sm font-medium rounded-full transition-all', activeFilter === 'rfp' ? 'bg-[#B91C1C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
                        >
                            RFP
                        </button>
                    </div>
                </div>

                <!-- Count badge -->
                <div v-if="filteredItems.length" class="mb-6 flex justify-end">
                    <div class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                        <Briefcase class="w-4 h-4 text-[#B91C1C]" />
                        <span class="text-sm font-medium text-gray-700">
                            {{ filteredItems.length }} {{ filteredItems.length === 1 ? 'item' : 'items' }}
                        </span>
                    </div>
                </div>

                <!-- Empty state -->
                <div
                    v-if="filteredItems.length === 0"
                    class="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200"
                >
                    <Briefcase class="w-12 h-12 text-gray-300" />
                    <h3 class="text-lg font-semibold text-gray-500">No {{ activeFilter === 'all' ? 'items' : activeFilter.toUpperCase() }} available</h3>
                    <p class="text-sm text-gray-400 text-center max-w-sm">
                        There are no {{ activeFilter === 'all' ? 'EOIs or RFPs' : activeFilter.toUpperCase() }} at the moment. Please check back later.
                    </p>
                </div>

                <!-- Items grid – only internal links -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#B91C1C]/30 transition-all duration-300 flex flex-col overflow-hidden"
                    >
                        <div class="p-6 flex flex-col flex-1">
                            <!-- Type badge -->
                            <div class="flex items-center gap-2 mb-3">
                                <span
                                    :class="[
                                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                                        item.type === 'eoi'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-purple-100 text-purple-800'
                                    ]"
                                >
                                    {{ item.type.toUpperCase() }}
                                </span>
                            </div>

                            <!-- Title (internal link) -->
                            <h2 class="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#B91C1C] transition-colors duration-300">
                                <Link :href="`/eoi-rfp/${item.slug}`">
                                    {{ item.title }}
                                </Link>
                            </h2>

                            <!-- Location -->
                            <div
                                v-if="item.location"
                                class="flex items-center gap-1.5 text-xs text-gray-500 mb-4"
                            >
                                <MapPin class="w-3.5 h-3.5 flex-shrink-0 text-[#B91C1C]" />
                                {{ item.location }}
                            </div>

                            <!-- Description / excerpt -->
                            <p class="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                                {{ item.description || 'Click "View details" for more information.' }}
                            </p>

                            <!-- Action button – always internal detail page -->
                            <div class="mt-6">
                                <Link
                                    :href="`/eoi-rfp/${item.slug}`"
                                    class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#B91C1C] transition-colors duration-200 underline underline-offset-2"
                                >
                                    View details
                                </Link>
                            </div>
                        </div>

                        <!-- Footer with deadline -->
                        <div class="border-t border-gray-100 px-6 py-3 bg-gray-50 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <div v-if="item.deadline" class="flex items-center gap-1.5 text-xs" :class="deadlineClass(item.deadline)">
                                <Calendar class="w-3.5 h-3.5 flex-shrink-0" />
                                {{ deadlineLabel(item.deadline) }}
                            </div>
                            <div v-else class="text-xs text-gray-500 flex items-center gap-1.5">
                                <Calendar class="w-3.5 h-3.5" />
                                No deadline specified
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
