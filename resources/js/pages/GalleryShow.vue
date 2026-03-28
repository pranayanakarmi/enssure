<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import GalleryImageLightbox from '@/components/guest/GalleryImageLightbox.vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    gallery: {
        type: Object,
        required: true,
    },
});

const gridImages = computed(() =>
    (props.gallery.images || []).filter((img) => img?.image_url),
);

const lightboxOpen = ref(false);
const lightboxInitialIndex = ref(0);

function openLightbox(index) {
    lightboxInitialIndex.value = index;
    lightboxOpen.value = true;
}

function closeLightbox() {
    lightboxOpen.value = false;
}
</script>

<template>
    <GuestLayout>
        <Head :title="`${gallery.title} - Gallery - ENSSURE`" />

        <PageHero :title="gallery.title" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-12 lg:mb-16 flex flex-col items-center gap-4">
                    <Link
                        href="/gallery"
                        class="inline-flex items-center gap-2 text-[#0757C3] hover:underline"
                    >
                        ← Back to Gallery
                    </Link>
                    <div
                        v-if="gallery.description"
                        class="text-center max-w-3xl mx-auto"
                    >
                        <p class="leading-relaxed text-gray-700">
                            {{ gallery.description }}
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <button
                        v-for="(img, i) in gridImages"
                        :key="img.id || i"
                        type="button"
                        class="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-[30px] border-0 bg-transparent p-0 text-left"
                        @click="openLightbox(i)"
                    >
                        <img
                            v-if="img.image_url"
                            :src="img.image_url"
                            :alt="img.caption || ''"
                            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-[rgba(7,87,195,0.75)] opacity-0 transition duration-500 group-hover:opacity-100" />
                        <div
                            v-if="img.caption"
                            class="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100"
                        >
                            <p class="px-8 text-center text-lg leading-relaxed text-white">
                                {{ img.caption }}
                            </p>
                        </div>
                    </button>
                </div>

                <GalleryImageLightbox
                    :open="lightboxOpen"
                    :images="gridImages"
                    :initial-index="lightboxInitialIndex"
                    :title="gallery.title"
                    @close="closeLightbox"
                />
                <div
                    v-if="!gridImages.length"
                    class="py-16 text-center text-gray-500"
                >
                    No images in this album yet.
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
