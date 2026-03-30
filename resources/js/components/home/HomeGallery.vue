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
import { computed, ref } from 'vue';
import GalleryAlbumCarouselModal from '@/components/guest/GalleryAlbumCarouselModal.vue';

const fallbackBadge = 'Gallery';
const fallbackTitle = 'The ENSSURE Journey in Pictures';
const fallbackDescription =
    'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.';
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

const galleries = computed(() => (props.gallerySection?.galleries ?? []).slice(0, 5));
const featuredGallery = computed(() => galleries.value[0] ?? null);
const secondaryGalleries = computed(() => galleries.value.slice(1));

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

            <!-- Header -->
            <div class="text-center max-w-4xl mx-auto mb-12">
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
                <p v-if="description" class="leading-relaxed text-gray-600 max-w-2xl mx-auto text-sm">
                    {{ description }}
                </p>
            </div>

            <!-- Gallery Grid -->
            <div v-if="galleries.length" class="flex flex-col lg:flex-row gap-3">

                <!-- Featured / Latest — left large tile -->
                <button
                    v-if="featuredGallery"
                    type="button"
                    class="group relative rounded-2xl overflow-hidden cursor-pointer border-0 p-0 bg-transparent flex-shrink-0 w-full lg:w-[45%]"
                    style="aspect-ratio: 4/3;"
                    @click="openAlbumCarousel(featuredGallery)"
                >
                    <img
                        v-if="featuredGallery.cover_image_url"
                        :src="featuredGallery.cover_image_url"
                        :alt="featuredGallery.title"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        No image
                    </div>
                    <div class="absolute inset-0 bg-[rgba(7,87,195,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6 z-10">
                        <p class="text-white text-lg font-semibold text-center leading-snug">{{ featuredGallery.title }}</p>
                    </div>
                </button>

                <!-- Secondary 2x2 grid — right side -->
                <div class="grid grid-cols-2 gap-3 flex-1">
                    <button
                        v-for="gallery in secondaryGalleries"
                        :key="gallery.id"
                        type="button"
                        class="group relative rounded-2xl overflow-hidden cursor-pointer border-0 p-0 bg-transparent"
                        style="aspect-ratio: 1/1;"
                        @click="openAlbumCarousel(gallery)"
                    >
                        <img
                            v-if="gallery.cover_image_url"
                            :src="gallery.cover_image_url"
                            :alt="gallery.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                            No image
                        </div>
                        <div class="absolute inset-0 bg-[rgba(7,87,195,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-4 z-10">
                            <p class="text-white text-sm font-semibold text-center leading-snug line-clamp-3">{{ gallery.title }}</p>
                        </div>
                    </button>

                    <!-- Empty placeholder slots -->
                    <div
                        v-for="n in Math.max(0, 4 - secondaryGalleries.length)"
                        :key="`placeholder-${n}`"
                        class="rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200"
                        style="aspect-ratio: 1/1;"
                    />
                </div>
            </div>

            <!-- Empty state -->
            <div
                v-else
                class="flex items-center justify-center h-64 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200"
            >
                <p class="text-gray-400 text-sm">No gallery items yet.</p>
            </div>

            <GalleryAlbumCarouselModal :album="activeAlbum" @close="closeAlbumCarousel" />

            <!-- CTA -->
            <div v-if="ctaText" class="flex justify-center mt-10">
                <Link :href="ctaUrl" class="primary-button-outline">
                    {{ ctaText }}
                </Link>
            </div>
        </div>
    </section>
</template>
