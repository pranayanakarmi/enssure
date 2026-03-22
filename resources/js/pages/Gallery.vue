<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import GalleryAlbumCarouselModal from '@/components/guest/GalleryAlbumCarouselModal.vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    galleryPageSection: {
        type: Object,
        default: null,
    },
    albums: {
        type: Array,
        default: () => [],
    },
    partners: {
        type: Array,
        default: () => [],
    },
});

const sectionTitle = computed(() => props.galleryPageSection?.title ?? 'The ENSSURE Journey in Pictures');
const sectionDescription = computed(
    () => props.galleryPageSection?.description
        ?? 'This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.',
);

const activeAlbum = ref(null);

function openAlbumCarousel(album) {
    activeAlbum.value = album;
}

function closeAlbumCarousel() {
    activeAlbum.value = null;
}
</script>

<template>
    <GuestLayout>
        <Head title="Gallery - ENSSURE" />

        <PageHero title="Gallery" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                        {{ sectionTitle }}
                    </h2>
                    <p class="leading-relaxed text-gray-700 max-w-3xl mx-auto">
                        {{ sectionDescription }}
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <button
                        v-for="(album, i) in albums"
                        :key="album.slug || i"
                        type="button"
                        class="group relative rounded-[30px] overflow-hidden aspect-square cursor-pointer block w-full text-left border-0 p-0 bg-transparent"
                        @click="openAlbumCarousel(album)"
                    >
                        <img
                            v-if="album.cover_image_url"
                            :src="album.cover_image_url"
                            :alt="album.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                            v-else
                            class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
                        >
                            No cover
                        </div>
                        <div class="absolute inset-0 bg-[rgba(7,87,195,0.75)] opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                            <p class="text-white text-lg text-center px-8 leading-relaxed font-medium">
                                {{ album.title }}
                            </p>
                            <p
                                v-if="album.images_count !== undefined"
                                class="absolute bottom-8 left-0 right-0 text-white/90 text-sm text-center"
                            >
                                {{ album.images_count }} image{{ album.images_count !== 1 ? 's' : '' }}
                            </p>
                        </div>
                    </button>
                </div>

                <GalleryAlbumCarouselModal
                    :album="activeAlbum"
                    @close="closeAlbumCarousel"
                />
                <div
                    v-if="!albums.length"
                    class="py-16 text-center text-gray-500"
                >
                    No albums yet.
                </div>
            </div>
        </section>

        <section class="py-20 text-center">
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
        </section>
    </GuestLayout>
</template>
