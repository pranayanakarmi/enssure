<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Calendar, Share2 } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';

const relatedNews = [
    { image: '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png', title: 'CSOs role to amendment of National Park and Wildlife', alt: 'CSOs role to amendment of National Park and Wildlife' },
    { image: '/enssure/assets/530b3c7fab16f35ace8e5b37fe032e81e91f105d.png', title: 'Policy Discussion with federal level parliament members to facilitate ..', alt: 'Policy Discussion' },
    { image: '/enssure/assets/1726bf5eb39711a9e1c2d453bcd551a0f21e7f2b.png', title: 'High Level Policy Discussion on Right to Food and Food Sovereignty Issues', alt: 'High Level Policy Discussion' },
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
        <Head title="News Detail - ENSSURE" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <header class="text-center mb-8">
                        <h1 class="text-[2.5rem] leading-tight tracking-tight text-[#101010]">
                            Helvetas and CTEVT Convene National Dialogue on
                            <br class="hidden md:block" />
                            Sustainable Skills Funding Models
                        </h1>
                        <div class="flex justify-center items-center gap-4 text-sm text-gray-500 uppercase tracking-wide mt-4">
                            <div class="flex items-center gap-2">
                                <Calendar class="w-4 h-4 text-gray-300" />
                                <span class="font-bold">3 July 2026</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <Share2 class="w-4 h-4" />
                                <div class="flex gap-2">
                                    <a href="#" class="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80 transition" aria-label="Share on Facebook">f</a>
                                    <a href="#" class="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition" aria-label="Share on Twitter">𝕏</a>
                                    <a href="#" class="w-8 h-8 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition" aria-label="Share on LinkedIn">in</a>
                                    <a href="#" class="w-8 h-8 rounded-full bg-[#bd081c] text-white flex items-center justify-center hover:opacity-80 transition" aria-label="Share on Pinterest">P</a>
                                    <a href="#" class="w-8 h-8 rounded-full bg-[#00acee] text-white flex items-center justify-center hover:opacity-80 transition" aria-label="Copy link">⎘</a>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div class="mb-10">
                        <div class="rounded-3xl overflow-hidden border shadow-sm">
                            <img
                                src="/enssure/assets/archive-detail-image.png"
                                alt="Students working on electronics"
                                class="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    <div class="text-xl leading-relaxed text-gray-900">
                        <p class="font-semibold text-gray-900">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper tincidunt metus pharetra vehicula. Duis quis odio ut justo commodo facilisis vitae dictum lorem. Integer quam orci, pulvinar ac varius id, pharetra vel nulla. Aliquam tincidunt metus at ex condimentum, a euismod risus sodales. Nulla bibendum dapibus leo eu finibus. Donec vel posuere nisl.
                        </p>
                        <p class="mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper tincidunt metus pharetra vehicula. Duis quis odio ut justo commodo facilisis vitae dictum lorem. Integer quam orci, pulvinar ac varius id, pharetra vel nulla. Aliquam tincidunt metus at ex condimentum, a euismod risus sodales. Nulla bibendum dapibus leo eu finibus. Donec vel posuere nisl.
                        </p>
                        <p class="mt-4">
                            Suspendisse nisl nisi, vehicula sit amet tortor quis, elementum luctus purus. Praesent et libero ut erat laoreet bibendum et vel arcu. Nam nunc dolor, lacinia sit amet tempor vitae, rutrum non orci. Nam et dolor cursus magna ultrices ultrices. Nunc pellentesque risus ipsum, eu congue est pretium consequat. Quisque tortor ante, posuere ut ex id, aliquet lobortis leo. Nunc vel orci id sapien blandit varius pharetra nec neque. Integer in imperdiet lorem, vel volutpat tortor. Nam facilisis mollis pharetra.
                        </p>
                        <p class="mt-4">
                            Suspendisse sit amet purus et sapien fermentum pulvinar. Maecenas felis est, lobortis vel finibus ut, laoreet quis ex. Phasellus nulla ex, aliquet sed mi vitae, commodo sollicitudin ipsum. Duis gravida sit amet leo eget accumsan. Vestibulum vulputate, sapien sed sodales luctus, mi purus euismod metus, eget euismod libero tortor sed velit. Duis ultrices nec est eget consequat. Sed ornare ultrices mauris sed pharetra. Donec a scelerisque ex, eu rutrum augue.
                        </p>
                        <p class="mt-4">
                            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed placerat ultrices nisl at tincidunt. Sed tempus odio efficitur arcu sagittis viverra. Etiam in dui accumsan, rhoncus arcu vitae, convallis turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ut luctus justo. Sed ornare eros a mi vehicula, ac bibendum purus tristique. Etiam posuere libero eget pharetra tristique. In massa massa, hendrerit eget semper non, venenatis a lectus. Nunc vitae dapibus tellus. Nullam ut arcu id turpis pulvinar dapibus sit amet et sem.
                        </p>
                    </div>
                </article>
            </div>
        </section>

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                    Related News
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <Link
                        v-for="(item, i) in relatedNews"
                        :key="i"
                        href="/notices/single-archive"
                        class="group cursor-pointer block"
                    >
                        <div class="relative rounded-[30px] overflow-hidden mb-6 aspect-[367/302]">
                            <img
                                :src="item.image"
                                :alt="item.alt"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight">
                            {{ item.title }}
                        </h3>
                        <span class="inline-flex items-center gap-2 hover:text-[#B91C1C] text-black uppercase font-medium hover:gap-3 transition-all">
                            Read more
                            <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                        </span>
                    </Link>
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
