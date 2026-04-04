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

<!-- <script setup>
import { ref, computed } from 'vue';
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
                class="flex flex-col space-y-3 sm:space-y-4 items-start justify-center order-2 flex-1 text-left pl-6 sm:pl-10 lg:pl-16 mt-25"
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
</template> -->

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowRight, Pause, Play, X } from 'lucide-vue-next';
import { home } from '@/routes';

const AUTOPLAY_DELAY = 5000;

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

// ── Slides ────────────────────────────────────────────────────────────────────
const slides = computed(() =>
    props.slides?.length ? props.slides : fallbackSlides,
);
const hasMultiple = computed(() => slides.value.length > 1);
const currentIndex = ref(0);
const currentSlide = computed(() => slides.value[currentIndex.value] ?? slides.value[0]);
const isTransitioning = ref(false);
const progressDuration = computed(() => `${AUTOPLAY_DELAY}ms`);

// ── Navigation ────────────────────────────────────────────────────────────────
function goTo(index) {
    if (isTransitioning.value || index === currentIndex.value) return;
    isTransitioning.value = true;
    currentIndex.value = index;
    setTimeout(() => (isTransitioning.value = false), 600);
}

function next() {
    goTo((currentIndex.value + 1) % slides.value.length);
}

function prev() {
    goTo((currentIndex.value - 1 + slides.value.length) % slides.value.length);
}

// ── Autoplay ──────────────────────────────────────────────────────────────────
const isPlaying = ref(true);
let timer = null;

function startAutoplay() {
    if (!hasMultiple.value) return;
    stopAutoplay();
    timer = setInterval(next, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    clearInterval(timer);
    timer = null;
}

function togglePlay() {
    isPlaying.value = !isPlaying.value;
}

watch(isPlaying, (val) => (val ? startAutoplay() : stopAutoplay()));

// ── Video Modal ───────────────────────────────────────────────────────────────
const showVideoModal = ref(false);

function openVideo() {
    showVideoModal.value = true;
    stopAutoplay();
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    showVideoModal.value = false;
    document.body.style.overflow = '';
    if (isPlaying.value) startAutoplay();
}

// ── Keyboard ──────────────────────────────────────────────────────────────────
function onKeyDown(e) {
    if (e.key === 'Escape' && showVideoModal.value) {
        closeVideo();
        return;
    }
    if (showVideoModal.value) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
}

// ── Touch / Swipe ─────────────────────────────────────────────────────────────
const touchStartX = ref(null);

function onTouchStart(e) {
    touchStartX.value = e.touches[0].clientX;
}

function onTouchEnd(e) {
    if (touchStartX.value === null) return;
    const delta = touchStartX.value - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.value = null;
}

// ── Image Preloading ──────────────────────────────────────────────────────────
function preloadAdjacentImages() {
    if (!hasMultiple.value) return;
    const nextIdx = (currentIndex.value + 1) % slides.value.length;
    const prevIdx = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
    [nextIdx, prevIdx].forEach((idx) => {
        const url = slides.value[idx]?.image_url;
        if (url) new Image().src = url;
    });
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
    startAutoplay();
    window.addEventListener('keydown', onKeyDown);
    watch(currentIndex, preloadAdjacentImages, { immediate: true });
});

onUnmounted(() => {
    stopAutoplay();
    window.removeEventListener('keydown', onKeyDown);
    document.body.style.overflow = '';
});
</script>

<template>
    <!-- ── Hero Section ── -->
    <section
        class="w-full min-h-[50vh] sm:min-h-[60vh] lg:h-[76vh] overflow-hidden relative"
        role="region"
        aria-label="Hero slideshow"
        @mouseenter="stopAutoplay"
        @mouseleave="isPlaying && startAutoplay()"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
    >
        <!-- Background Image with crossfade -->
        <Transition name="slide-fade" mode="out-in">
            <img
                :key="currentIndex"
                :src="currentSlide?.image_url || '/enssure/assets/hero-image.png'"
                :alt="currentSlide?.title || 'Hero'"
                class="w-full h-full object-cover object-top min-h-[400px] absolute inset-0"
            />
        </Transition>

        <!-- Dark overlay (softened for better lighting effect) -->
        <div class="absolute inset-0 bg-black/30" />

        <!-- "Little Light" effect: subtle radial glow that brightens the background -->
        <div class="absolute inset-0 pointer-events-none bg-spotlight" />

        <!-- Screen-reader live region -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
            Slide {{ currentIndex + 1 }} of {{ slides.length }}: {{ currentSlide?.title }}
        </div>

        <!-- Bottom-right promo badge — opens video modal -->
        <div class="absolute -bottom-2 right-0 w-[60%] sm:w-1/2 md:w-auto max-w-[280px] sm:max-w-none z-10">
            <button
                type="button"
                aria-label="Watch: How We Are Different"
                class="block w-full focus:outline-none"
                @click="openVideo"
            >
                <img
                    src="/enssure/assets/how-we-are-different.png"
                    alt="How We Are Different"
                    class="w-full h-auto hover:opacity-90 transition-opacity"
                />
            </button>
        </div>

        <!-- Main content row – moved lower for better visual flow -->
        <div
            class="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 text-white gap-4 sm:gap-0"
        >
            <!-- Left column: Removed up/down buttons -->

            <!-- Slide text content – moved lower with increased top margin -->
            <Transition name="content-fade" mode="out-in">
                <div
                    :key="currentIndex"
                    class="flex flex-col space-y-3 sm:space-y-4 items-start justify-center order-2 flex-1 text-left pl-6 sm:pl-10 lg:pl-16 mt-36 sm:mt-48 lg:mt-56 perspective-container"
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
                        :href="currentSlide?.link_url || home().url"
                        class="learn-more-btn inline-flex items-center gap-2"
                    >
                        {{ currentSlide?.link_text || 'Learn More' }}
                        <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </Transition>

            <!-- Mobile: Prev / Next buttons (left/right arrows) -->
            <div v-if="hasMultiple" class="flex sm:hidden gap-4 order-3">
                <button
                    type="button"
                    class="border p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/10"
                    aria-label="Previous slide"
                    @click="prev"
                >
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button
                    type="button"
                    class="border p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/10"
                    aria-label="Next slide"
                    @click="next"
                >
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>

            <!-- Desktop: Slide indicators + Play/Pause (right column) -->
            <div
                v-if="hasMultiple"
                class="hidden sm:flex flex-col space-y-3 items-center order-3"
            >
                <button
                    v-for="(slide, idx) in slides"
                    :key="slide?.id ?? idx"
                    type="button"
                    :aria-label="`Go to slide ${idx + 1}`"
                    :class="[
                        'text-sm font-mono transition-colors',
                        idx === currentIndex
                            ? 'text-[#B91C1C] font-bold'
                            : 'text-white/70 hover:text-white',
                    ]"
                    @click="goTo(idx)"
                >
                    {{ String(idx + 1).padStart(2, '0') }}
                </button>

                <button
                    type="button"
                    :aria-label="isPlaying ? 'Pause slideshow' : 'Play slideshow'"
                    class="mt-2 border p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    @click="togglePlay"
                >
                    <Pause v-if="isPlaying" class="w-3 h-3" />
                    <Play v-else class="w-3 h-3" />
                </button>
            </div>
        </div>

        <!-- Progress bar -->
        <div
            v-if="hasMultiple"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 z-10"
        >
            <div
                :key="currentIndex"
                class="h-full bg-[#B91C1C]"
                :class="{ 'animate-progress': isPlaying }"
                :style="{
                    animationDuration: progressDuration,
                    animationPlayState: isPlaying ? 'running' : 'paused',
                }"
            />
        </div>
    </section>

    <!-- ── Video Modal ── -->
    <Teleport to="body">
        <Transition name="modal-fade">
            <div
                v-if="showVideoModal"
                class="fixed inset-0 z-50 flex items-center justify-center"
                role="dialog"
                aria-modal="true"
                aria-label="Video player"
            >
                <!-- Backdrop -->
                <div
                    class="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    @click="closeVideo"
                />

                <!-- Modal box -->
                <div class="relative z-10 w-full max-w-3xl mx-4">
                    <!-- Close button -->
                    <button
                        type="button"
                        class="absolute -top-10 right-0 text-white hover:text-[#B91C1C] transition-colors flex items-center gap-1 text-sm"
                        aria-label="Close video"
                        @click="closeVideo"
                    >
                        <X class="w-5 h-5" />
                        Close
                    </button>

                    <!-- 16:9 iframe wrapper -->
                    <div class="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
                        <iframe
                            v-if="showVideoModal"
                            src="https://www.youtube.com/embed/7eUchQ72g88?autoplay=1&rel=0"
                            title="How We Are Different"
                            class="absolute inset-0 w-full h-full"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* Image crossfade */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 0.6s ease;
    position: absolute;
    inset: 0;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
}

/* Text slide-up fade */
.content-fade-enter-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
.content-fade-leave-active {
    transition: opacity 0.3s ease;
}
.content-fade-enter-from {
    opacity: 0;
    transform: translateY(12px);
}
.content-fade-leave-to {
    opacity: 0;
}

/* Modal fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

/* Progress bar */
@keyframes progress {
    from { width: 0%; }
    to   { width: 100%; }
}
.animate-progress {
    animation: progress linear forwards;
}

/* ----------------------------------------------
   "Little Light" effect: radial glow overlay
   that brightens the background image subtly
   ---------------------------------------------- */
.bg-spotlight {
    background: radial-gradient(circle at 50% 40%, rgba(255, 245, 210, 0.18) 0%, rgba(255, 235, 180, 0.08) 45%, transparent 75%);
    mix-blend-mode: overlay;
    pointer-events: none;
}

/* ----------------------------------------------
   Perspective container for 3D button effect
   ---------------------------------------------- */
.perspective-container {
    perspective: 800px;
}

/* ----------------------------------------------
   Modern 3D Button with User Perspective
   - Gradient background
   - 3D transform on hover (rotateX + translateY)
   - Dynamic shadow
   - Shine effect on hover
   ---------------------------------------------- */
.learn-more-btn {
    position: relative;
    background: linear-gradient(135deg, #b91c1c 0%, #8b1a1a 100%);
    color: white;
    padding: 0.6rem 1.8rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: translateY(0) rotateX(0deg);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;
    backdrop-filter: blur(2px);
    overflow: hidden;
}

/* 3D hover effect: lift + slight tilt from user perspective */
.learn-more-btn:hover {
    transform: translateY(-4px) rotateX(6deg);
    background: linear-gradient(135deg, #d42c2c 0%, #9e1e1e 100%);
    box-shadow: 0 18px 28px -8px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2);
    color: white;
}

/* Active / click feedback */
.learn-more-btn:active {
    transform: translateY(1px) rotateX(0deg);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: 0.05s linear;
}

/* Subtle shine pseudo-element for extra "premium" feel */
.learn-more-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-20deg);
    transition: left 0.45s ease;
    pointer-events: none;
}

.learn-more-btn:hover::before {
    left: 125%;
}

/* Adjust icon transition inside button */
.learn-more-btn .lucide-arrow-right {
    transition: transform 0.2s ease;
}

.learn-more-btn:hover .lucide-arrow-right {
    transform: translateX(4px);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 640px) {
    .learn-more-btn {
        padding: 0.5rem 1.2rem;
        font-size: 0.75rem;
    }
}
</style>
