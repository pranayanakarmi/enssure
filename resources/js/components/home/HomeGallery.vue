<script setup>
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

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
                <Link
                    v-for="gallery in galleries"
                    :key="gallery.id"
                    :href="`/gallery/${gallery.slug}`"
                    class="group relative rounded-[30px] overflow-hidden aspect-square cursor-pointer block"
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
                </Link>
            </div>
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
</template>
