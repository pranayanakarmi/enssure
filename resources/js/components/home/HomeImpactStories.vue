<!-- <script setup>
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
const stories = computed(() => {
    const sectionStories = props.storiesSection?.stories;
    if (sectionStories && sectionStories.length > 0) {
        return sectionStories
            .slice(0, 3) // ← Limits to only 3 items
            .map((s) => ({
                image: s.image_url ?? '',
                title: s.title,
                slug: s.slug,
            }));
    }
    return fallbackStories.map((s) => ({ ...s, slug: null }));
});
// const stories = computed(() => {
//     const sectionStories = props.storiesSection?.stories;
//     if (sectionStories && sectionStories.length > 0) {
//         return sectionStories.map((s) => ({
//             image: s.image_url ?? '',
//             title: s.title,
//             slug: s.slug,
//         }));
//     }
//     return fallbackStories.map((s) => ({ ...s, slug: null }));
// });
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
                        <Link
                            v-if="story.slug"
                            :href="`/impact-stories/${story.slug}`"
                            class="inline-flex items-center justify-center px-7 py-2.5 bg-[#B91C1C] rounded-full text-white text-sm uppercase font-semibold hover:bg-[#d11b23] transition-colors"
                        >
                            View details
                        </Link>
                        <span
                            v-else
                            class="inline-flex items-center justify-center px-7 py-2.5 bg-[#B91C1C] rounded-full text-white text-sm uppercase font-semibold"
                        >
                            View details
                        </span>
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
</template> -->
<script setup>
import { Link } from '@inertiajs/vue3';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { ArrowRight, BookOpen } from 'lucide-vue-next';

// ── Fallbacks ─────────────────────────────────────────────────────────────────
const fallbackBadge       = 'Impact Stories';
const fallbackTitle       = 'Transforming Skills,\nChanging Lives';
const fallbackDescription = 'See how practical apprenticeship training turns potential into progress. Each story highlights a journey of personal growth, showcasing the real-world benefits of a federalized and employer-responsive TVET system.';
const fallbackCtaText     = 'View all stories';
const fallbackCtaUrl      = '/impact-stories';
const fallbackStories     = [
    { image: '/enssure/assets/26a1e1d6ccdd9ce509da2ca75dc396974ab704c3.png', title: 'Story of Engineer from a remote village', slug: null },
    { image: '/enssure/assets/798478c0a856a8c9d2aeaff042d88bd9cbd9ec48.png', title: 'Deciding for Oneself', slug: null },
    { image: '/enssure/assets/4d59531f356722983d87a35c20c0354f2ffa1ce3.png', title: 'Plumbing the right way', slug: null },
];

const props = defineProps({
    storiesSection: {
        type: Object,
        default: null,
    },
});

// ── Computed ──────────────────────────────────────────────────────────────────
const badgeText   = computed(() => props.storiesSection?.badge_text  ?? fallbackBadge);
const title       = computed(() => props.storiesSection?.title       ?? fallbackTitle);
const description = computed(() => props.storiesSection?.description ?? fallbackDescription);
const ctaText     = computed(() => props.storiesSection?.cta_text    ?? fallbackCtaText);
const ctaUrl      = computed(() => props.storiesSection?.cta_url     ?? fallbackCtaUrl);

// Safely split title on \n — no v-html needed
const titleLines = computed(() => title.value.split('\n'));

const stories = computed(() => {
    const sectionStories = props.storiesSection?.stories;
    if (sectionStories?.length) {
        return sectionStories.slice(0, 3).map((s) => ({
            image: s.image_url ?? '',
            title: s.title,
            slug:  s.slug ?? null,
        }));
    }
    return fallbackStories;
});

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
        id="stories"
        ref="sectionRef"
        class="py-20 lg:py-24 border-b border-[#D9D9D9] overflow-hidden"
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
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4">
                        <!-- Safe multiline title without v-html -->
                        <template v-for="(line, i) in titleLines" :key="i">
                            {{ line }}<br v-if="i < titleLines.length - 1" />
                        </template>
                    </h2>
                </div>
                <div class="md:w-4/6 mt-8 md:mt-0 md:pl-10 flex items-center">
                    <p v-if="description" class="leading-relaxed text-gray-600">
                        {{ description }}
                    </p>
                </div>
            </div>

            <!-- ── Story Cards ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div
                    v-for="(story, i) in stories"
                    :key="i"
                    class="group relative rounded-[30px] overflow-hidden aspect-[367/435] transition-all duration-700 ease-out"
                    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
                    :style="{ transitionDelay: `${i * 120}ms` }"
                >
                    <!-- Story image -->
                    <img
                        v-if="story.image"
                        :src="story.image"
                        :alt="story.title"
                        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

                    <!-- Fallback when no image -->
                    <div
                        v-else
                        class="w-full h-full bg-gradient-to-br from-[#233D7E] to-[#0757C3] flex items-center justify-center"
                    >
                        <BookOpen class="w-16 h-16 text-white/30" />
                    </div>

                    <!-- Gradient overlay — deepens on hover -->
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[rgba(7,87,195,0.85)] transition-all duration-500 group-hover:to-[rgba(7,87,195,0.95)]"
                    />

                    <!-- Hover: subtle top shimmer -->
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <!-- Card content -->
                    <div class="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500 group-hover:-translate-y-2">
                        <h3 class="text-white text-[1.6rem] leading-tight tracking-tight mb-6">
                            {{ story.title }}
                        </h3>

                        <!-- Linked CTA -->
                        <Link
                            v-if="story.slug"
                            :href="`/impact-stories/${story.slug}`"
                            class="story-cta-btn"
                            :aria-label="`Read story: ${story.title}`"
                        >
                            View Story
                            <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>

                        <!-- No slug: show nothing (fallback stories are decorative) -->
                    </div>
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

<style scoped>
.story-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.5rem;
    background-color: #B91C1C;
    border-radius: 9999px;
    color: white;
    font-size: 0.875rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.03em;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.story-cta-btn:hover {
    background-color: #991b1b;
    transform: scale(1.03);
}
</style>
