<script setup>
import { ChevronLeft, ChevronRight, Quote } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const AUTOPLAY_DELAY = 5500;

// ── Fallbacks ─────────────────────────────────────────────────────────────────
const defaultTestimonials = [
    {
        quote: 'The Dual-VET apprenticeship did not just teach me welding. It gave me a certified skill and the confidence to start my own business. I am now employing three others from my community, something I never imagined possible.',
        name:      'Anita Shrestha',
        role:      'Former Apprentice, Now Workshop Owner',
        image_url: null,
    },
    {
        quote: "ENSSURE's training transformed my career. The hands-on approach and industry partnership gave me skills that employers actually value.",
        name:      'Ram Kumar',
        role:      'Industrial Technician',
        image_url: null,
    },
];

const defaultBadge           = 'Testimonials';
const defaultBackgroundImage = '/enssure/assets/2679d01e0051158b2d0a86140171d16c36165a4b.png';

// Safe title parts — avoids v-html
const defaultTitleParts = [
    { text: 'Direct testimonials that showcase the real, on-the-ground impact of the ', highlight: false },
    { text: 'ENSSURE project',                                                          highlight: true  },
    { text: ' on people and the skills sector in Nepal…',                              highlight: false },
];

const defaultDescription = 'Direct testimonials that showcase the real, on-the-ground impact of the ENSSURE project on people and the skills sector in Nepal.';

// ── Props ─────────────────────────────────────────────────────────────────────
const props = defineProps({
    section: {
        type: Object,
        default: null,
    },
    testimonials: {
        type: Array,
        default: () => [],
    },
});

// ── Computed ──────────────────────────────────────────────────────────────────
const badgeText          = computed(() => props.section?.badge_text           ?? defaultBadge);
const description        = computed(() => props.section?.description          ?? defaultDescription);
const backgroundImageUrl = computed(() => props.section?.background_image_url ?? defaultBackgroundImage);

const titleParts = computed(() => {
    const raw = props.section?.title;
    if (!raw) return defaultTitleParts;
    const spanMatch = raw.match(/^(.*?)<span[^>]*>(.*?)<\/span>(.*)$/s);
    if (spanMatch) {
        return [
            { text: spanMatch[1], highlight: false },
            { text: spanMatch[2], highlight: true  },
            { text: spanMatch[3], highlight: false },
        ].filter((p) => p.text);
    }
    return [{ text: raw.replace(/<[^>]*>/g, ''), highlight: false }];
});

const testimonialList = computed(() =>
    props.testimonials?.length ? props.testimonials : defaultTestimonials,
);

const hasMultiple = computed(() => testimonialList.value.length > 1);

// ── Navigation ────────────────────────────────────────────────────────────────
const currentIndex       = ref(0);
const activeTestimonial  = computed(() => testimonialList.value[currentIndex.value] ?? testimonialList.value[0]);
let autoplayTimer        = null;

function stopAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
}

function startAutoplay() {
    stopAutoplay();
    if (!hasMultiple.value) return;
    autoplayTimer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % testimonialList.value.length;
    }, AUTOPLAY_DELAY);
}

function goToTestimonial(index) {
    currentIndex.value = index;
    startAutoplay();
}

function showPrevious() {
    currentIndex.value = (currentIndex.value - 1 + testimonialList.value.length) % testimonialList.value.length;
    startAutoplay();
}

function showNext() {
    currentIndex.value = (currentIndex.value + 1) % testimonialList.value.length;
    startAutoplay();
}

function initialsFromName(name) {
    if (!name) return 'EN';
    return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
}

// ── Watchers & lifecycle ──────────────────────────────────────────────────────
watch(testimonialList, (list) => {
    if (!list.length) { currentIndex.value = 0; stopAutoplay(); return; }
    if (currentIndex.value > list.length - 1) currentIndex.value = 0;
    startAutoplay();
}, { immediate: true });

// ── Scroll entrance ───────────────────────────────────────────────────────────
const sectionRef = ref(null);
const isVisible  = ref(false);
let observer     = null;

onMounted(() => {
    startAutoplay();
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

onUnmounted(() => {
    stopAutoplay();
    observer?.disconnect();
});
</script>

<template>
    <section
        ref="sectionRef"
        class="relative overflow-hidden py-12 sm:py-14 lg:py-16"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
    >
        <!-- Background -->
        <div v-if="backgroundImageUrl" class="absolute inset-0">
            <img
                :src="backgroundImageUrl"
                alt=""
                aria-hidden="true"
                class="h-full w-full object-cover"
                loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        </div>

        <div
            class="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
            <!-- ── Header ── -->
            <div class="md:flex">
                <div class="md:w-2/6">
                    <div class="inline-flex items-center justify-center rounded-full bg-[rgba(235,31,39,0.1)] px-5 py-2">
                        <span class="font-semibold uppercase tracking-wide text-[#B91C1C] text-sm">
                            {{ badgeText }}
                        </span>
                    </div>
                    <!-- Safe title — no v-html -->
                    <h2 class="mt-4 max-w-md text-[2.5rem] leading-tight tracking-tight text-[#101010]">
                        <template v-for="(part, i) in titleParts" :key="i">
                            <span v-if="part.highlight" class="text-[#B91C1C]">{{ part.text }}</span>
                            <template v-else>{{ part.text }}</template>
                        </template>
                    </h2>
                </div>
                <div class="mt-8 flex items-center md:mt-0 md:w-4/6 md:pl-10">
                    <div
                        v-if="description"
                        class="w-full rounded-2xl border border-[#f2d7d3] bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(17,24,39,0.08)] backdrop-blur-sm"
                    >
                        <span class="mb-2 block h-1 w-14 rounded-full bg-gradient-to-r from-[#B91C1C] via-[#d74d4d] to-transparent" />
                        <p class="text-[15px] leading-7 text-gray-700">
                            {{ description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- ── Testimonial body ── -->
            <div class="relative isolate">
                <!-- Decorative card background (desktop only) -->
                <div class="card-bg absolute left-[8%] right-[8%] top-[16%] hidden h-[62%] rounded-[2.5rem] lg:block" />

                <div class="relative grid items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-10">

                    <!-- ── Avatar column ── -->
                    <div class="relative mx-auto w-full max-w-md lg:max-w-none">
                            <div
                                class="absolute inset-x-10 bottom-8 top-8 rounded-full"
                                :style="{
                                    backgroundImage: `linear-gradient(white 60%, rgba(255,255,255,0.7)), url('${backgroundImageUrl}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    boxShadow: '0 6px 24px 0 rgba(17,24,39,0.08)',
                                    opacity: 0.97,
                                }"
                            />
                        <div class="relative flex items-center justify-center px-6 py-4 sm:px-8 lg:px-0">
                            <Transition name="avatar-fade" mode="out-in">
                                <div
                                    :key="currentIndex"
                                    class="relative h-[272px] w-[272px] overflow-hidden rounded-full border-[12px] border-white bg-[#dfeaf5] shadow-[0_24px_56px_rgba(17,24,39,0.14)] sm:h-80 sm:w-80 lg:h-[352px] lg:w-[352px] xl:h-96 xl:w-96"
                                >
                                    <img
                                        v-if="activeTestimonial?.image_url"
                                        :src="activeTestimonial.image_url"
                                        :alt="activeTestimonial.name || 'Testimonial portrait'"
                                        class="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                    <div
                                        v-else
                                        class="flex h-full w-full items-center justify-center avatar-gradient text-6xl font-semibold tracking-[0.08em] text-[#24425f] sm:text-7xl"
                                    >
                                        {{ initialsFromName(activeTestimonial?.name) }}
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <!-- ── Quote card ── -->
                    <div class="relative">
                        <Transition name="testimonial-fade" mode="out-in">
                            <article
                                :key="`${activeTestimonial?.name}-${currentIndex}`"
                                class="rounded-[30px] bg-white px-6 py-6 shadow-sm sm:px-8 sm:py-8 lg:px-9 lg:py-8"
                            >
                                <div class="flex flex-col gap-6">

                                    <!-- Quote icon + desktop nav -->
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8dedd] text-[#B91C1C]">
                                            <Quote class="h-7 w-7" />
                                        </div>
                                        <div v-if="hasMultiple" class="hidden items-center gap-3 sm:flex">
                                            <button
                                                type="button"
                                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead6d2] text-[#7b5d57] transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                                                aria-label="Show previous testimonial"
                                                @click="showPrevious"
                                            >
                                                <ChevronLeft class="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead6d2] text-[#7b5d57] transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                                                aria-label="Show next testimonial"
                                                @click="showNext"
                                            >
                                                <ChevronRight class="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Quote text -->
                                    <p class="text-lg leading-8 text-[#334155] sm:text-[1.15rem] lg:text-[1.22rem] lg:leading-9">
                                        {{ activeTestimonial?.quote }}
                                    </p>

                                    <!-- Name + role -->
                                    <div class="space-y-1 border-t border-[#f2e5e1] pt-5">
                                        <h3 class="text-xl font-semibold tracking-[-0.02em] text-[#101828]">
                                            {{ activeTestimonial?.name }}
                                        </h3>
                                        <p
                                            v-if="activeTestimonial?.role"
                                            class="text-sm font-medium uppercase tracking-[0.2em] text-[#B91C1C]"
                                        >
                                            {{ activeTestimonial.role }}
                                        </p>
                                    </div>

                                    <!-- Thumbnail selectors + mobile nav -->
                                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <!-- Thumbnail pills -->
                                        <div v-if="hasMultiple" class="flex flex-wrap items-center gap-3">
                                            <button
                                                v-for="(testimonial, index) in testimonialList"
                                                :key="`${testimonial.name}-${index}`"
                                                type="button"
                                                class="group flex items-center gap-3 rounded-full border px-2.5 py-2 text-left transition-all duration-200"
                                                :class="index === currentIndex
                                                    ? 'border-[#B91C1C] bg-[#fff5f4] shadow-sm'
                                                    : 'border-[#ece7e5] bg-white hover:border-[#d7c2bd]'"
                                                :aria-label="`Show testimonial from ${testimonial.name}`"
                                                @click="goToTestimonial(index)"
                                            >
                                                <span class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#dfeaf5] text-sm font-semibold text-[#27425b]">
                                                    <img
                                                        v-if="testimonial.image_url"
                                                        :src="testimonial.image_url"
                                                        :alt="testimonial.name || 'Portrait'"
                                                        class="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                    <span v-else>{{ initialsFromName(testimonial.name) }}</span>
                                                </span>
                                            </button>
                                        </div>

                                        <!-- Mobile prev/next -->
                                        <div v-if="hasMultiple" class="flex items-center justify-between gap-3 sm:hidden">
                                            <button
                                                type="button"
                                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead6d2] text-[#7b5d57] transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                                                aria-label="Show previous testimonial"
                                                @click="showPrevious"
                                            >
                                                <ChevronLeft class="h-5 w-5" />
                                            </button>
                                            <button
                                                type="button"
                                                class="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead6d2] text-[#7b5d57] transition hover:border-[#B91C1C] hover:text-[#B91C1C]"
                                                aria-label="Show next testimonial"
                                                @click="showNext"
                                            >
                                                <ChevronRight class="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </article>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Decorative card background — extracted from inline style */
.card-bg {
    background: linear-gradient(
        135deg,
        rgba(240, 249, 255, 0.95) 0%,
        rgba(230, 245, 254, 0.90) 30%,
        rgba(216, 233, 248, 0.85) 70%,
        rgba(197, 218, 240, 0.80) 100%
    );
    border: 1px solid rgba(147, 197, 253, 0.4);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Avatar gradient */
.avatar-gradient {
    background: radial-gradient(circle at top, #ffffff 0%, #dbe8f3 42%, #b8cadc 100%);
}

/* Quote card fade */
.testimonial-fade-enter-active,
.testimonial-fade-leave-active {
    transition: opacity 260ms ease, transform 260ms ease;
}
.testimonial-fade-enter-from,
.testimonial-fade-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

/* Avatar fade */
.avatar-fade-enter-active,
.avatar-fade-leave-active {
    transition: opacity 300ms ease, transform 300ms ease;
}
.avatar-fade-enter-from,
.avatar-fade-leave-to {
    opacity: 0;
    transform: scale(0.96);
}
</style>
