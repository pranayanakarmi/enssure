<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';

const galleryItems = [
    { image: '/enssure/assets/4ba328d94e3aabc4ea84962c89e4e059648500b9.png', caption: 'This section provides a visual record of our activities and outcomes.' },
    { image: '/enssure/assets/f4b6e6dc6a6e52b022f16d68a04747fe0075789e.png', caption: 'Empowering communities through sustainable initiatives.' },
    { image: '/enssure/assets/2679d01e0051158b2d0a86140171d16c36165a4b.png', caption: 'Capacity development programs across regions.' },
    { image: '/enssure/assets/5cc3e75c5d213fefacf235a17717073307a489ad.png', caption: 'Collaborative workshops and engagement sessions.' },
    { image: '/enssure/assets/905f9120afe09767d6ffbebfd38246eeeadf9c6b.png', caption: 'Documenting project milestones and achievements.' },
    { image: '/enssure/assets/1b5f4275768ee47a7d16dd8b2fbc92ec696f2939.png', caption: 'Strengthening partnerships for long-term impact.' },
];

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];
</script>

<template>
    <GuestLayout>
        <Head title="Gallery - ENSSURE" />

        <PageHero title="Gallery" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                        The ENSSURE Journey in Pictures
                    </h2>
                    <p class="leading-relaxed text-gray-700 max-w-3xl mx-auto">
                        This section provides a visual record of our activities and outcomes. See the faces, places, and practical work that define the federalised TVET system we support.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        v-for="(item, i) in galleryItems"
                        :key="i"
                        class="group relative rounded-[30px] overflow-hidden aspect-square cursor-pointer"
                    >
                        <img
                            :src="item.image"
                            alt=""
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-[rgba(7,87,195,0.75)] opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                            <p class="text-white text-lg text-center px-8 leading-relaxed">
                                {{ item.caption }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div class="mb-6 flex justify-center">
                        <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                            <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Our Partners</span>
                        </div>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                        We work with the best Partners
                    </h2>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    <div
                        v-for="(logo, i) in partnerLogos"
                        :key="i"
                        class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors"
                    >
                        <img :src="logo" alt="Partner logo" class="max-w-[190px] max-h-[80px] object-contain" />
                    </div>
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
