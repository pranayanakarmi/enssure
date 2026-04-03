<!-- <script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-vue-next';
import { home } from '@/routes';

const fallbackSlides = [
    { title: 'Pre-Diploma Level Industrial Trainee Training (Apprenticeship)' },
    { title: 'Advanced Industrial Training Level 2 Program' },
    { title: 'Professional Internship Program for Skilled Workers' },
];

const props = defineProps({
    slides: {
        type: Array,
        default: () => [],
    },
});

const slides = computed(() =>
    props.slides?.length ? props.slides : fallbackSlides,
);

const currentIndex = ref(0);
const currentSlide = computed(() => slides.value[currentIndex.value] ?? slides.value[0]);

function next() {
    const len = slides.value.length;
    if (len) currentIndex.value = (currentIndex.value + 1) % len;
}

function prev() {
    const len = slides.value.length;
    if (len)
        currentIndex.value = (currentIndex.value - 1 + len) % len;
}

function goTo(index) {
    currentIndex.value = index;
}
</script>

<template>
    <section
        class="w-full min-h-[50vh] sm:min-h-[60vh] lg:h-[76vh] overflow-hidden relative"
    >
        <img
            v-if="currentSlide?.image_url"
            :src="currentSlide.image_url"
            :alt="currentSlide.title || 'Hero'"
            class="w-full h-full object-cover object-top min-h-[400px]"
        />
        <img
            v-else
            src="/enssure/assets/hero-image.png"
            alt="Hero"
            class="w-full h-full object-cover object-top min-h-[400px]"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
            class="absolute -bottom-2 right-0 w-[60%] sm:w-1/2 md:w-auto max-w-[280px] sm:max-w-none"
        >
            <img
                src="/enssure/assets/how-we-are-different.png"
                alt="How We Are Different"
                class="w-full h-auto"
            />
        </div>

        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 text-white gap-4 sm:gap-0"
        >
            <div
                v-if="slides.length > 1"
                class="hidden sm:flex flex-col space-y-4 items-start justify-center order-1"
            >
                <button
                    type="button"
                    class="border p-2 rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/10 hover:text-[#B91C1C] transition-colors"
                    aria-label="Next slide"
                    @click="next"
                >
                    <ChevronRight class="w-4 h-4" />
                </button>
                <button
                    type="button"
                    class="border p-2 rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/10 hover:text-[#B91C1C] transition-colors"
                    aria-label="Previous slide"
                    @click="prev"
                >
                    <ChevronLeft class="w-4 h-4" />
                </button>
            </div>

            <div
                class="flex flex-col space-y-3 sm:space-y-4 items-center justify-center order-2 flex-1 text-center px-2"
            >
                <h1
                    v-if="currentSlide?.title"
                    class="text-xl sm:text-2xl lg:text-3xl leading-tight font-medium"
                >
                    {{ currentSlide.title }}
                </h1>
                <p
                    v-if="currentSlide?.subtitle"
                    class="text-sm sm:text-base text-white/90"
                >
                    {{ currentSlide.subtitle }}
                </p>
                <Link
                    v-if="currentSlide?.link_url"
                    :href="currentSlide.link_url"
                    class="bg-[#B91C1C] px-4 py-2 rounded-full text-white text-sm sm:text-base uppercase hover:bg-[#d11b23] transition-colors inline-flex items-center gap-1"
                >
                    {{ currentSlide.link_text || 'Learn More' }}
                    <ArrowRight class="w-4 h-4" />
                </Link>
                <Link
                    v-else
                    :href="home().url"
                    class="bg-[#B91C1C] px-4 py-2 rounded-full text-white text-sm sm:text-base uppercase hover:bg-[#d11b23] transition-colors inline-flex items-center gap-1"
                >
                    Learn More
                    <ArrowRight class="w-4 h-4" />
                </Link>
            </div>

            <div
                v-if="slides.length > 1"
                class="flex sm:hidden gap-4 order-3"
            >
                <button
                    type="button"
                    class="border p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/10"
                    aria-label="Previous"
                    @click="prev"
                >
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button
                    type="button"
                    class="border p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/10"
                    aria-label="Next"
                    @click="next"
                >
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>

            <div
                v-if="slides.length > 1"
                class="hidden sm:flex flex-col space-y-4 items-start justify-center order-3"
            >
                <button
                    v-for="(slide, idx) in slides"
                    :key="slide?.id ?? idx"
                    type="button"
                    :class="[
                        'hover:text-[#B91C1C] transition-colors',
                        idx === currentIndex ? 'text-[#B91C1C]' : '',
                    ]"
                    @click="goTo(idx)"
                >
                    {{ String(idx + 1).padStart(2, '0') }}
                </button>
            </div>
        </div>
    </section>
</template> -->

<script setup>
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { home } from '@/routes';

const fallbackSlides = [
    { title: 'Pre-Diploma Level Industrial Trainee Training (Apprenticeship)' },
    { title: 'Advanced Industrial Training Level 2 Program' },
    { title: 'Professional Internship Program for Skilled Workers' },
];

const props = defineProps({
    slides: {
        type: Array,
        default: () => [],
    },
});

const slides = computed(() =>
    props.slides?.length ? props.slides : fallbackSlides,
);

const currentIndex = ref(0);
const currentSlide = computed(() => slides.value[currentIndex.value] ?? slides.value[0]);

function next() {
    const len = slides.value.length;
    if (len) currentIndex.value = (currentIndex.value + 1) % len;
}

function prev() {
    const len = slides.value.length;
    if (len)
        currentIndex.value = (currentIndex.value - 1 + len) % len;
}

function goTo(index) {
    currentIndex.value = index;
}
</script>

<template>
    <section
        class="w-full min-h-[50vh] sm:min-h-[60vh] lg:h-[76vh] overflow-hidden relative"
    >
        <img
            v-if="currentSlide?.image_url"
            :src="currentSlide.image_url"
            :alt="currentSlide.title || 'Hero'"
            class="w-full h-full object-cover object-top min-h-[400px]"
        />
        <img
            v-else
            src="/enssure/assets/hero-image.png"
            alt="Hero"
            class="w-full h-full object-cover object-top min-h-[400px]"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
            class="absolute -bottom-2 right-0 w-[60%] sm:w-1/2 md:w-auto max-w-[280px] sm:max-w-none"
        >
            <a href="https://www.youtube.com/watch?v=7eUchQ72g88" target="_blank" rel="noopener noreferrer">
            <img
                src="/enssure/assets/how-we-are-different.png"
                alt="How We Are Different"
                class="w-full h-auto"
            />
            </a>
        </div>

        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 text-white gap-4 sm:gap-0"
        >
            <div
                v-if="slides.length > 1"
                class="hidden sm:flex flex-col space-y-4 items-start justify-center order-1"
            >
                <button
                    type="button"
                    class="border p-2 rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/10 hover:text-[#B91C1C] transition-colors"
                    aria-label="Next slide"
                    @click="next"
                >
                    <ChevronRight class="w-4 h-4" />
                </button>
                <button
                    type="button"
                    class="border p-2 rounded-full h-8 w-8 flex items-center justify-center hover:bg-white/10 hover:text-[#B91C1C] transition-colors"
                    aria-label="Previous slide"
                    @click="prev"
                >
                    <ChevronLeft class="w-4 h-4" />
                </button>
            </div>

            <div
                class="flex flex-col space-y-3 sm:space-y-4 items-start justify-center order-2 flex-1 text-left pl-6 sm:pl-10 lg:pl-16"
            >
                <h1
                    v-if="currentSlide?.title"
                    class="text-2xl sm:text-3xl lg:text-5xl leading-tight font-semibold max-w-sm sm:max-w-md lg:max-w-2xl"
                >
                    {{ currentSlide.title }}
                </h1>
                <p
                    v-if="currentSlide?.subtitle"
                    class="text-sm sm:text-base text-white/90"
                >
                    {{ currentSlide.subtitle }}
                </p>
                <Link
                    v-if="currentSlide?.link_url"
                    :href="currentSlide.link_url"
                    class="bg-[#B91C1C] px-4 py-2 rounded-full text-white text-sm sm:text-base uppercase hover:bg-[#d11b23] transition-colors inline-flex items-center gap-1"
                >
                    {{ currentSlide.link_text || 'Learn More' }}
                    <ArrowRight class="w-4 h-4" />
                </Link>
                <Link
                    v-else
                    :href="home().url"
                    class="bg-[#B91C1C] px-4 py-2 rounded-full text-white text-sm sm:text-base uppercase hover:bg-[#d11b23] transition-colors inline-flex items-center gap-1"
                >
                    Learn More
                    <ArrowRight class="w-4 h-4" />
                </Link>
            </div>

            <div
                v-if="slides.length > 1"
                class="flex sm:hidden gap-4 order-3"
            >
                <button
                    type="button"
                    class="border p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/10"
                    aria-label="Previous"
                    @click="prev"
                >
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button
                    type="button"
                    class="border p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/10"
                    aria-label="Next"
                    @click="next"
                >
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>

            <div
                v-if="slides.length > 1"
                class="hidden sm:flex flex-col space-y-4 items-start justify-center order-3"
            >
                <button
                    v-for="(slide, idx) in slides"
                    :key="slide?.id ?? idx"
                    type="button"
                    :class="[
                        'hover:text-[#B91C1C] transition-colors',
                        idx === currentIndex ? 'text-[#B91C1C]' : '',
                    ]"
                    @click="goTo(idx)"
                >
                    {{ String(idx + 1).padStart(2, '0') }}
                </button>
            </div>
        </div>
    </section>
</template>
