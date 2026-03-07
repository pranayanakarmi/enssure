<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const fallbackBadge = 'Impact Stories';
const fallbackTitle = 'Transforming Skills,\nChanging Lives';
const fallbackDescription = 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.';
const fallbackCtaText = 'View all stories';
const fallbackCtaUrl = '#';
const fallbackStories = [
    { image: '/enssure/assets/26a1e1d6ccdd9ce509da2ca75dc396974ab704c3.png', title: 'Story of Engineer from a remote village' },
    { image: '/enssure/assets/798478c0a856a8c9d2aeaff042d88bd9cbd9ec48.png', title: 'Deciding for Oneself' },
    { image: '/enssure/assets/4d59531f356722983d87a35c20c0354f2ffa1ce3.png', title: 'Plumbing the right way' },
];

const props = defineProps({
    storiesSection: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.storiesSection?.badge_text ?? fallbackBadge);
const title = computed(() => props.storiesSection?.title ?? fallbackTitle);
const description = computed(() => props.storiesSection?.description ?? fallbackDescription);
const ctaText = computed(() => props.storiesSection?.cta_text ?? fallbackCtaText);
const ctaUrl = computed(() => props.storiesSection?.cta_url ?? fallbackCtaUrl);
const stories = computed(() => fallbackStories);
</script>

<template>
    <section
        id="stories"
        class="py-20 lg:py-24 border-b border-[#D9D9D9]"
    >
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
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4"
                    >
                        <span v-html="title.replace(/\n/g, '<br />')" />
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
                    v-for="(story, i) in stories"
                    :key="i"
                    class="group relative rounded-[30px] overflow-hidden aspect-[367/435]"
                >
                    <img
                        :src="story.image"
                        :alt="story.title"
                        class="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(7,87,195,0.9)]"
                    />
                    <div class="absolute bottom-0 left-0 right-0 p-8">
                        <h3
                            class="text-white text-[1.875rem] leading-tight tracking-tight mb-6"
                        >
                            {{ story.title }}
                        </h3>
                        <button
                            type="button"
                            class="inline-flex items-center justify-center px-7 py-2.5 bg-[#B91C1C] rounded-full text-white text-sm uppercase font-semibold hover:bg-[#d11b23] transition-colors"
                        >
                            View details
                        </button>
                    </div>
                </div>
            </div>
            <div
                v-if="ctaText"
                class="flex justify-center"
            >
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
