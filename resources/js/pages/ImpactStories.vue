<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    impactPageHero: { type: Object, default: null },
    impactPageSection: { type: Object, default: null },
    impactStories: { type: Array, default: () => [] },
});

const heroTitle = computed(() => props.impactPageHero?.title ?? 'Impact Stories');
const heroImageUrl = computed(() => props.impactPageHero?.hero_image_url ?? null);

const sectionTitle = computed(() => props.impactPageSection?.title ?? 'Transforming Skills, Changing Lives');
const sectionDescription = computed(() => props.impactPageSection?.description ?? 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.');

const defaultStoryImage = '/enssure/assets/26a1e1d6ccdd9ce509da2ca75dc396974ab704c3.png';

const fallbackStories = [
    { id: 'fallback-1', title: 'Story of Engineer from a remote village', slug: null, image_url: '/enssure/assets/26a1e1d6ccdd9ce509da2ca75dc396974ab704c3.png' },
    { id: 'fallback-2', title: 'Deciding for Oneself', slug: null, image_url: '/enssure/assets/798478c0a856a8c9d2aeaff042d88bd9cbd9ec48.png' },
    { id: 'fallback-3', title: 'Plumbing the right way', slug: null, image_url: '/enssure/assets/4d59531f356722983d87a35c20c0354f2ffa1ce3.png' },
];

const displayStories = computed(() =>
    props.impactStories?.length > 0 ? props.impactStories : fallbackStories,
);

function storyImageUrl(story) {
    return story.image_url ?? defaultStoryImage;
}
</script>

<template>
    <GuestLayout>
        <Head title="Impact Stories - ENSSURE" />

        <PageHero
            :title="heroTitle"
            :hero-image-url="heroImageUrl"
        />

        <section id="stories" class="py-20 lg:py-24 border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="md:flex gap-8 lg:gap-12">
                    <div class="flex-1 min-w-0">
                        <div class="md:flex mb-12 lg:mb-16">
                            <div class="md:w-2/6">
                                <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md">
                                    {{ sectionTitle }}
                                </h2>
                            </div>
                            <div class="md:w-4/6">
                                <p class="leading-relaxed text-gray-700">
                                    {{ sectionDescription }}
                                </p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            <template
                                v-for="story in displayStories"
                                :key="story.id"
                            >
                                <Link
                                    v-if="story.slug"
                                    :href="`/impact-stories/${story.slug}`"
                                    class="group relative rounded-[30px] overflow-hidden aspect-[367/435] block"
                                >
                                    <img
                                        :src="storyImageUrl(story)"
                                        :alt="story.title"
                                        class="w-full h-full object-cover"
                                    />
                                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(7,87,195,0.9)]" />
                                    <div class="absolute bottom-0 left-0 right-0 p-8">
                                        <h3 class="text-white text-[1.875rem] leading-tight tracking-tight mb-6">
                                            {{ story.title }}
                                        </h3>
                                        <span class="inline-flex items-center justify-center px-7 py-2.5 bg-[#B91C1C] rounded-full text-white text-sm uppercase font-semibold group-hover:bg-[#d11b23] transition-colors">
                                            View details
                                        </span>
                                    </div>
                                </Link>
                                <div
                                    v-else
                                    class="group relative rounded-[30px] overflow-hidden aspect-[367/435]"
                                >
                                    <img
                                        :src="storyImageUrl(story)"
                                        :alt="story.title"
                                        class="w-full h-full object-cover"
                                    />
                                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(7,87,195,0.9)]" />
                                    <div class="absolute bottom-0 left-0 right-0 p-8">
                                        <h3 class="text-white text-[1.875rem] leading-tight tracking-tight mb-6">
                                            {{ story.title }}
                                        </h3>
                                        <span class="inline-flex items-center justify-center px-7 py-2.5 bg-[#B91C1C] rounded-full text-white text-sm uppercase font-semibold">
                                            View details
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section class="py-20 text-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                    <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Support</span>
                </div>
                <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] my-4">
                    Technical Assistance By
                </h2>
                <div class="flex justify-center">
                    <img src="/enssure/assets/c3f97e1b17044bbdeedac32a3818731e2450a527.png" alt="Technical Assistance By" class="h-16" />
                </div>
            </div>
        </section>

        <section class="relative py-20 h-96 overflow-hidden">
            <img src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40" />
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center">
                <div class="max-w-2xl mx-auto text-white">
                    <span class="uppercase text-[#B91C1C]">JOIN US</span>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight mb-8">
                        Build Skills, Build Futures.
                        <span class="text-[#B91C1C]">Support sustainable</span> employment today.
                    </h2>
                    <Link href="/contact" class="inline-block uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
                        Contact us
                    </Link>
                </div>
            </div>
        </section> -->
    </GuestLayout>
</template>
