<script setup>
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
        return sectionItems.map((item) => ({
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
</template>
