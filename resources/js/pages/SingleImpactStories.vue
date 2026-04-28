<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Calendar, Share2 } from 'lucide-vue-next';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    // Same hero data structure as the main Impact Stories page
    impactPageHero: {
        type: Object,
        default: null,
    },
    // The full story data (title, story HTML, image, etc.)
    impactStory: {
        type: Object,
        required: true,
    },
    relatedStories: {
        type: Array,
        default: () => [],
    },
});

// Hero data – exactly as on the main page
const heroTitle = computed(() => props.impactStory.title ?? 'Impact Story');
const heroImageUrl = computed(() => props.impactPageHero?.hero_image_url ?? props.impactStory.image_url ?? null);

// Date formatting (unchanged)
const formattedDate = computed(() => {
    if (!props.impactStory.updated_at) return null;
    const d = new Date(props.impactStory.updated_at);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
});

// Share logic (unchanged)
const shareUrl = computed(() => props.impactStory.share_url || (typeof window !== 'undefined' ? window.location.href : ''));

const socialLinks = computed(() => {
    const url = encodeURIComponent(shareUrl.value);
    const title = encodeURIComponent(props.impactStory.title ?? '');
    return [
        { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: 'F', bgClass: 'bg-[#1877F2]' },
        { name: 'X', url: `https://twitter.com/intent/tweet?url=${url}&text=${title}`, icon: 'X', bgClass: 'bg-[#1DA1F2]' },
        { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, icon: 'in', bgClass: 'bg-[#0A66C2]' },
        { name: 'Pinterest', url: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`, icon: 'P', bgClass: 'bg-[#E60023]' },
    ];
});

async function copyShareLink() {
    try {
        await navigator.clipboard.writeText(shareUrl.value);
    } catch {
        // fallback ignored
    }
}

function relatedStoryImage(story) {
    return story.image_url ?? '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';
}
</script>

<template>
    <GuestLayout>
        <Head :title="`${impactStory.title} - Impact Stories - ENSSURE`" />

        <!-- PageHero using the SAME props as the main page -->
        <PageHero
            :title="heroTitle"
            :hero-image-url="heroImageUrl"
        />

        <!-- Meta bar: date + share (moved below hero)
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
            <div v-if="formattedDate" class="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500 uppercase tracking-wide">
                <div class="flex items-center gap-2">
                    <Calendar class="w-4 h-4 text-gray-400" />
                    <span class="font-bold">{{ formattedDate }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        class="flex items-center justify-center w-8 h-8 rounded-full bg-[#06B6D4] text-white hover:opacity-90 transition-opacity"
                        title="Copy link"
                        @click="copyShareLink"
                    >
                        <Share2 class="w-4 h-4" />
                    </button>
                    <a
                        v-for="social in socialLinks"
                        :key="social.name"
                        :href="social.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        :title="`Share on ${social.name}`"
                        :class="['flex items-center justify-center w-8 h-8 rounded-full text-white hover:opacity-90 transition-opacity text-xs font-bold', social.bgClass]"
                    >
                        {{ social.icon }}
                    </a>
                </div>
            </div>
        </div> -->

        <!-- Story content -->
        <section class="py-12 lg:py-16 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <div
                        v-if="impactStory.story"
                        class="impact-story-content text-xl leading-relaxed text-gray-900 prose prose-lg max-w-none [&_img]:mt-4 [&_img]:mb-6 [&_img]:rounded-lg [&_img]:block"
                        v-html="impactStory.story"
                    />
                </article>
            </div>
        </section>

        <!-- Related stories (unchanged) -->
        <section
            v-if="relatedStories.length > 0"
            class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                    Related Impact Stories
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <Link
                        v-for="story in relatedStories"
                        :key="story.id"
                        :href="`/impact-stories/${story.slug}`"
                        class="group cursor-pointer block"
                    >
                        <div class="relative rounded-[30px] overflow-hidden mb-6 aspect-[367/302]">
                            <img
                                :src="relatedStoryImage(story)"
                                :alt="story.title"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight">
                            {{ story.title }}
                        </h3>
                        <span class="inline-flex items-center gap-2 hover:text-[#B91C1C] text-black uppercase font-medium hover:gap-3 transition-all">
                            Read more
                            <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
