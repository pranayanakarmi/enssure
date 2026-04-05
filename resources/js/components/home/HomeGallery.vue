<!-- <script setup>
import { Link } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import GalleryAlbumCarouselModal from '@/components/guest/GalleryAlbumCarouselModal.vue';

const fallbackBadge = 'Gallery';
const fallbackTitle = 'The ENSSURE Journey in Pictures';
const fallbackDescription = 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.';
const fallbackCtaText = 'View all gallery';
const fallbackCtaUrl = '/gallery';

const props = defineProps({
    gallerySection: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.gallerySection?.badge_text ?? fallbackBadge);
const title = computed(() => props.gallerySection?.title ?? fallbackTitle);
const description = computed(() => props.gallerySection?.description ?? fallbackDescription);
const ctaText = computed(() => props.gallerySection?.cta_text ?? fallbackCtaText);
const ctaUrl = computed(() => props.gallerySection?.cta_url ?? fallbackCtaUrl);
const galleries = computed(() => props.gallerySection?.galleries ?? []);

const activeAlbum = ref(null);

function openAlbumCarousel(album) {
    activeAlbum.value = album;
}

function closeAlbumCarousel() {
    activeAlbum.value = null;
}
</script>

<template>
    <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                <div class="mb-6 flex justify-center">
                    <div
                        class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
                    >
                        <span
                            class="font-semibold text-[#B91C1C] uppercase tracking-wide"
                        >
                            {{ badgeText }}
                        </span>
                    </div>
                </div>
                <h2
                    class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6"
                >
                    {{ title }}
                </h2>
                <p
                    v-if="description"
                    class="leading-relaxed text-gray-700 max-w-3xl mx-auto"
                >
                    {{ description }}
                </p>
            </div>
            <div
                v-if="galleries.length"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <button
                    v-for="gallery in galleries"
                    :key="gallery.id"
                    type="button"
                    class="group relative rounded-[30px] overflow-hidden aspect-square cursor-pointer block w-full text-left border-0 p-0 bg-transparent"
                    @click="openAlbumCarousel(gallery)"
                >
                    <img
                        v-if="gallery.cover_image_url"
                        :src="gallery.cover_image_url"
                        :alt="gallery.title"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div
                        v-else
                        class="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"
                    >
                        No image
                    </div>
                    <div
                        class="absolute inset-0 bg-[rgba(7,87,195,0.75)] opacity-0 group-hover:opacity-100 transition duration-500"
                    />
                    <div
                        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 p-8"
                    >
                        <p class="text-white text-lg text-center leading-relaxed font-medium">
                            {{ gallery.title }}
                        </p>
                    </div>
                </button>
            </div>

            <GalleryAlbumCarouselModal
                :album="activeAlbum"
                @close="closeAlbumCarousel"
            />

            <div
                v-if="ctaText"
                class="flex justify-center mt-12"
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
import { Images } from 'lucide-vue-next';
import GalleryAlbumCarouselModal from '@/components/guest/GalleryAlbumCarouselModal.vue';

// ── Fallbacks ─────────────────────────────────────────────────────────────────
const fallbackBadge       = 'Gallery';
const fallbackTitle       = 'The ENSSURE Journey in Pictures';
const fallbackDescription = 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.';
const fallbackCtaText     = 'View all gallery';
const fallbackCtaUrl      = '/gallery';

const props = defineProps({
    gallerySection: {
        type: Object,
        default: null,
    },
});

// ── Computed ──────────────────────────────────────────────────────────────────
const badgeText   = computed(() => props.gallerySection?.badge_text  ?? fallbackBadge);
const title       = computed(() => props.gallerySection?.title       ?? fallbackTitle);
const description = computed(() => props.gallerySection?.description ?? fallbackDescription);
const ctaText     = computed(() => props.gallerySection?.cta_text    ?? fallbackCtaText);
const ctaUrl      = computed(() => props.gallerySection?.cta_url     ?? fallbackCtaUrl);

const galleries        = computed(() => (props.gallerySection?.galleries ?? []).slice(0, 5));
const featuredGallery  = computed(() => galleries.value[0] ?? null);
const secondaryGalleries = computed(() => galleries.value.slice(1));

// ── Modal ─────────────────────────────────────────────────────────────────────
const activeAlbum = ref(null);

function openAlbumCarousel(album) {
    activeAlbum.value = album;
}
function closeAlbumCarousel() {
    activeAlbum.value = null;
}

// ── Scroll entrance ───────────────────────────────────────────────────────────
const sectionRef   = ref(null);
const isVisible    = ref(false);
let observer       = null;

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

// ── Helpers ───────────────────────────────────────────────────────────────────
function imageCount(gallery) {
    return gallery?.images?.length ?? gallery?.images_count ?? null;
}
</script>

<template>
    <section
        ref="sectionRef"
        class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9] overflow-hidden"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- ── Header ── -->
            <div
                class="text-center max-w-4xl mx-auto mb-12 transition-all duration-700 ease-out"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
                <div class="mb-5 flex justify-center">
                    <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">
                            {{ badgeText }}
                        </span>
                    </div>
                </div>
                <h2 class="text-[2.5rem] font-normal leading-tight tracking-tight text-[#101010] mb-5">
                    {{ title }}
                </h2>
                <p v-if="description" class="leading-relaxed text-gray-500 max-w-2xl mx-auto text-sm">
                    {{ description }}
                </p>
            </div>

            <!-- ── Gallery Grid ── -->
            <div
                v-if="galleries.length"
                class="flex flex-col lg:flex-row gap-3"
            >
                <!-- Featured large tile -->
                <button
                    v-if="featuredGallery"
                    type="button"
                    class="group relative rounded-2xl overflow-hidden cursor-pointer border-0 p-0 bg-transparent flex-shrink-0 w-full lg:w-[45%] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/50 transition-all duration-700 ease-out"
                    style="aspect-ratio: 4/3;"
                    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
                    :aria-label="`Open album: ${featuredGallery.title}`"
                    @click="openAlbumCarousel(featuredGallery)"
                >
                    <img
                        v-if="featuredGallery.cover_image_url"
                        :src="featuredGallery.cover_image_url"
                        :alt="featuredGallery.title"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div
                        v-else
                        class="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-2"
                    >
                        <Images class="w-10 h-10 opacity-40" />
                        <span class="text-sm">No image</span>
                    </div>

                    <!-- Hover overlay -->
                    <div class="absolute inset-0 bg-[#0757C3]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <!-- Title + count on hover -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 z-10 gap-2">
                        <p class="text-white text-xl font-semibold text-center leading-snug">
                            {{ featuredGallery.title }}
                        </p>
                        <div
                            v-if="imageCount(featuredGallery)"
                            class="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full"
                        >
                            <Images class="w-3.5 h-3.5 text-white" />
                            <span class="text-white text-xs font-medium">
                                {{ imageCount(featuredGallery) }} photos
                            </span>
                        </div>
                    </div>

                    <!-- Always-visible image count badge (bottom-left) -->
                    <div
                        v-if="imageCount(featuredGallery)"
                        class="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full z-10 group-hover:opacity-0 transition-opacity duration-300"
                    >
                        <Images class="w-3 h-3 text-white" />
                        <span class="text-white text-xs">{{ imageCount(featuredGallery) }}</span>
                    </div>
                </button>

                <!-- Secondary 2×2 grid -->
                <div class="grid grid-cols-2 gap-3 flex-1">
                    <button
                        v-for="(gallery, idx) in secondaryGalleries"
                        :key="gallery.id ?? idx"
                        type="button"
                        class="group relative rounded-2xl overflow-hidden cursor-pointer border-0 p-0 bg-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/50 transition-all duration-700 ease-out"
                        style="aspect-ratio: 1/1;"
                        :style="{
                            aspectRatio: '1/1',
                            transitionDelay: `${(idx + 1) * 80}ms`,
                        }"
                        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
                        :aria-label="`Open album: ${gallery.title}`"
                        @click="openAlbumCarousel(gallery)"
                    >
                        <img
                            v-if="gallery.cover_image_url"
                            :src="gallery.cover_image_url"
                            :alt="gallery.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div
                            v-else
                            class="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-1"
                        >
                            <Images class="w-7 h-7 opacity-40" />
                            <span class="text-xs">No image</span>
                        </div>

                        <!-- Hover overlay -->
                        <div class="absolute inset-0 bg-[#0757C3]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <!-- Title + count on hover -->
                        <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 z-10 gap-2">
                            <p class="text-white text-sm font-semibold text-center leading-snug line-clamp-3">
                                {{ gallery.title }}
                            </p>
                            <div
                                v-if="imageCount(gallery)"
                                class="flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full"
                            >
                                <Images class="w-3 h-3 text-white" />
                                <span class="text-white text-xs font-medium">
                                    {{ imageCount(gallery) }} photos
                                </span>
                            </div>
                        </div>

                        <!-- Always-visible count badge -->
                        <div
                            v-if="imageCount(gallery)"
                            class="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full z-10 group-hover:opacity-0 transition-opacity duration-300"
                        >
                            <Images class="w-3 h-3 text-white" />
                            <span class="text-white text-xs">{{ imageCount(gallery) }}</span>
                        </div>
                    </button>

                    <!-- Empty placeholder slots — hidden cleanly -->
                    <div
                        v-for="n in Math.max(0, 4 - secondaryGalleries.length)"
                        :key="`placeholder-${n}`"
                        class="rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-300"
                        style="aspect-ratio: 1/1;"
                        aria-hidden="true"
                    >
                        <Images class="w-6 h-6" />
                        <span class="text-xs">Coming soon</span>
                    </div>
                </div>
            </div>

            <!-- ── Empty state ── -->
            <div
                v-else
                class="flex flex-col items-center justify-center h-64 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 gap-3"
            >
                <Images class="w-10 h-10 text-gray-300" />
                <p class="text-gray-400 text-sm">No gallery items yet.</p>
            </div>

            <!-- ── Modal ── -->
            <GalleryAlbumCarouselModal
                :album="activeAlbum"
                @close="closeAlbumCarousel"
            />

            <!-- ── CTA ── -->
            <div
                v-if="ctaText"
                class="flex justify-center mt-10 transition-all duration-700 ease-out delay-300"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            >
                <Link
                    :href="ctaUrl"
                    class="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#B91C1C] text-[#B91C1C] font-semibold text-sm uppercase tracking-wide hover:bg-[#B91C1C] hover:text-white transition-colors duration-300"
                >
                    {{ ctaText }}
                    <Images class="w-4 h-4" />
                </Link>
            </div>

        </div>
    </section>
</template>
