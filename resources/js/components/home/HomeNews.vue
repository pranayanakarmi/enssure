<!-- <script setup>
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import { computed } from 'vue';

const defaultItems = [
    { image: '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png', title: 'CSOs role to amendment of National Park and Wildlife', link_url: '#' },
    { image: '/enssure/assets/530b3c7fab16f35ace8e5b37fe032e81e91f105d.png', title: 'Policy Discussion with federal level parliament members to facilitate ..', link_url: '#' },
    { image: '/enssure/assets/1726bf5eb39711a9e1c2d453bcd551a0f21e7f2b.png', title: 'High Level Policy Discussion on Right to Food and Food Sovereignty Issues', link_url: '#' },
];

const defaultBadge = 'Updates';
const defaultTitle = 'Latest News\nand Articles';
const defaultDescription = 'Keeping you informed on the latest developments and insights from the world of skills and employment in Nepal. Our articles dive into trends, success stories, and analysis of the evolving TVET sector.';
const defaultCtaText = 'View all News';
const defaultCtaUrl = '#';
const placeholderImage = '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';

const props = defineProps({
    newsSection: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.newsSection?.badge_text ?? defaultBadge);
const title = computed(() => props.newsSection?.title ?? defaultTitle);
const description = computed(() => props.newsSection?.description ?? defaultDescription);
const ctaText = computed(() => props.newsSection?.cta_text ?? defaultCtaText);
const ctaUrl = computed(() => props.newsSection?.cta_url ?? defaultCtaUrl);
const items = computed(() => {
    const sectionItems = props.newsSection?.items;
    if (sectionItems && sectionItems.length > 0) {
        return sectionItems
        .slice(0, 3) // ← Limits to only 3 items
            .map((item) => ({
                image: item.image_url || placeholderImage,
                title: item.title,
                link_url: item.link_url || '#',
            }));
    }
    return defaultItems;
});
</script>

<template>
    <section id="news" class="py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="md:flex mb-12 lg:mb-16">
                <div class="md:w-2/6">
                    <div
                        class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
                    >
                        <span
                            class="font-semibold text-[#B91C1C] uppercase tracking-wide"
                        >
                            {{ badgeText }}
                        </span>
                    </div>
                    <h2
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4 whitespace-pre-line"
                    >
                        {{ title }}
                    </h2>
                </div>
                <div class="md:w-4/6 mt-10">
                    <p
                        v-if="description"
                        class="leading-relaxed text-gray-700"
                    >
                        {{ description }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div
                    v-for="(item, i) in items"
                    :key="i"
                    class="group cursor-pointer"
                >
                    <div
                        class="relative rounded-[30px] overflow-hidden mb-6 aspect-[367/302]"
                    >
                        <img
                            :src="item.image"
                            :alt="item.title || 'News'"
                            class="w-full h-full object-cover transition-transform group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <h3
                        class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight"
                    >
                        {{ item.title }}
                    </h3>
                    <Link
                        :href="item.link_url"
                        class="inline-flex items-center gap-2 hover:text-[#B91C1C] text-black uppercase font-medium hover:gap-3 transition-all"
                    >
                        Read more
                        <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                    </Link>
                </div>
            </div>
            <div class="flex justify-center">
                <Link
                    :href="ctaUrl"
                    class="primary-button-outline"
                >
                    {{ ctaText }}
                </Link>
            </div>
        </div>
    </section>
</template> -->

<script setup>
import { Link } from '@inertiajs/vue3';
import { ArrowRight, Newspaper } from 'lucide-vue-next';
import { computed, ref, onMounted, onUnmounted } from 'vue';

// ── Fallbacks ─────────────────────────────────────────────────────────────────
const defaultBadge       = 'Updates';
const defaultTitle       = 'Latest News\nand Articles';
const defaultDescription = 'Keeping you informed on the latest developments and insights from the world of skills and employment in Nepal. Our articles dive into trends, success stories, and analysis of the evolving TVET sector.';
const defaultCtaText     = 'View all News';
const defaultCtaUrl      = '/notices';
const placeholderImage   = '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';

const defaultItems = [
    { image: '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png', title: 'CSOs role to amendment of National Park and Wildlife', link_url: '#' },
    { image: '/enssure/assets/530b3c7fab16f35ace8e5b37fe032e81e91f105d.png', title: 'Policy Discussion with federal level parliament members to facilitate', link_url: '#' },
    { image: '/enssure/assets/1726bf5eb39711a9e1c2d453bcd551a0f21e7f2b.png', title: 'High Level Policy Discussion on Right to Food and Food Sovereignty Issues', link_url: '#' },
];

// ── Props ─────────────────────────────────────────────────────────────────────
const props = defineProps({
    newsSection: {
        type: Object,
        default: null,
    },
});

// ── Computed ──────────────────────────────────────────────────────────────────
const badgeText   = computed(() => props.newsSection?.badge_text  ?? defaultBadge);
const title       = computed(() => props.newsSection?.title       ?? defaultTitle);
const description = computed(() => props.newsSection?.description ?? defaultDescription);
const ctaText     = computed(() => props.newsSection?.cta_text    ?? defaultCtaText);
const ctaUrl      = computed(() => props.newsSection?.cta_url     ?? defaultCtaUrl);

const items = computed(() => {
    const sectionItems = props.newsSection?.items;
    if (sectionItems?.length) {
        return sectionItems.slice(0, 3).map((item) => ({
            image:    item.image_url || placeholderImage,
            title:    item.title,
            link_url: item.link_url || '#',
            date:     item.date ?? item.published_at ?? null,
        }));
    }
    return defaultItems.map((item) => ({ ...item, date: null }));
});

// ── Date formatting ───────────────────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return null;
    try {
        return new Intl.DateTimeFormat('en-US', {
            year: 'month', month: 'short', day: 'numeric',
        }).format(new Date(dateStr));
    } catch {
        return null;
    }
}

// ── Scroll entrance ───────────────────────────────────────────────────────────
const sectionRef = ref(null);
const isVisible  = ref(false);
let observer     = null;

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                observer.disconnect();
            }
        },
        { threshold: 0.1 },
    );
    if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
    <section
        id="news"
        ref="sectionRef"
        class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9] overflow-hidden"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Header ── -->
            <div
                class="md:flex mb-12 lg:mb-16 transition-all duration-700 ease-out"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
                <div class="md:w-2/6">
                    <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">
                            {{ badgeText }}
                        </span>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4 whitespace-pre-line">
                        {{ title }}
                    </h2>
                </div>
                <div class="md:w-4/6 mt-8 md:mt-0 md:pl-10 flex items-center">
                    <p v-if="description" class="leading-relaxed text-gray-600">
                        {{ description }}
                    </p>
                </div>
            </div>

            <!-- ── News Cards ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Link
                    v-for="(item, i) in items"
                    :key="i"
                    :href="item.link_url"
                    class="group flex flex-col focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/40 rounded-[30px] transition-all duration-700 ease-out"
                    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
                    :style="{ transitionDelay: `${i * 120}ms` }"
                >
                    <!-- Image -->
                    <div class="relative rounded-[30px] overflow-hidden mb-5 aspect-[367/302] flex-shrink-0">
                        <img
                            :src="item.image"
                            :alt="item.title || 'News'"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />

                        <!-- Hover overlay -->
                        <div
                            class="absolute inset-0 bg-[#B91C1C]/0 group-hover:bg-[#B91C1C]/20 transition-colors duration-500"
                        />

                        <!-- Date badge -->
                        <div
                            v-if="formatDate(item.date)"
                            class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                        >
                            {{ formatDate(item.date) }}
                        </div>
                    </div>

                    <!-- Text -->
                    <div class="flex flex-col flex-1">
                        <h3 class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight group-hover:text-[#B91C1C] transition-colors duration-300 line-clamp-3">
                            {{ item.title }}
                        </h3>

                        <!-- Read more — purely visual, parent Link handles navigation -->
                        <div class="mt-auto inline-flex items-center gap-2 text-black group-hover:text-[#B91C1C] uppercase font-semibold text-sm transition-colors duration-300">
                            Read more
                            <span class="inline-flex items-center justify-center w-7 h-7 rounded-full border border-current transition-colors duration-300 group-hover:bg-[#B91C1C] group-hover:border-[#B91C1C]">
                                <ArrowRight class="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-white" />
                            </span>
                        </div>
                    </div>
                </Link>

                <!-- Empty state if no items -->
                <div
                    v-if="!items.length"
                    class="col-span-3 flex flex-col items-center justify-center h-48 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 gap-3"
                >
                    <Newspaper class="w-10 h-10 text-gray-300" />
                    <p class="text-gray-400 text-sm">No news items yet.</p>
                </div>
            </div>

            <!-- ── CTA ── -->
            <div
                v-if="ctaText"
                class="flex justify-center transition-all duration-700 ease-out delay-300"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                <Link
                    :href="ctaUrl"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#B91C1C] text-[#B91C1C] font-semibold text-sm uppercase tracking-wide hover:bg-[#B91C1C] hover:text-white transition-colors duration-300"
                >
                    {{ ctaText }}
                    <ArrowRight class="w-4 h-4" />
                </Link>
            </div>

        </div>
    </section>
</template>
