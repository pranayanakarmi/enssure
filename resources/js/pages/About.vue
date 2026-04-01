<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted, ref } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import HomeStats from '@/components/home/HomeStats.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps({
    aboutPageHero: { type: Object, default: null },
    aboutMainSection: { type: Object, default: null },
    aboutContentSection: { type: Object, default: null },
    homeReachSection: { type: Object, default: null },
});

const heroTitle = computed(() => props.aboutPageHero?.title ?? 'About Us');
const heroImageUrl = computed(() => props.aboutPageHero?.hero_image_url ?? null);

const mainTitle = computed(() => props.aboutMainSection?.title ?? 'Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)');
const mainBody = computed(() => props.aboutMainSection?.body ?? null);
const mainCardTitle = computed(() => props.aboutMainSection?.card_title ?? 'Skill Upgrading\nTraining for Workers');
const mainContentImageUrl = computed(() => props.aboutMainSection?.content_image_url ?? '/enssure/assets/aboutus.png');
const mainBackgroundImageUrl = computed(() => props.aboutMainSection?.background_image_url ?? '/enssure/assets/65b138464c2257ee992dd4572f64fbf14b41e638.png');
const mainCtaText = computed(() => props.aboutMainSection?.cta_text ?? 'Explore more');
const mainCtaUrl = computed(() => props.aboutMainSection?.cta_url ?? '#');

const defaultContentP1 = "The ENSSURE project is implemented by CTEVT at the federal level; Koshi Province, Madhesh Province, Bagmati Province, Gandaki Province, Lumbini Province, Karnali Province, Sudurpashchim Province and 33 Local Governments within those provinces. Helvetas Nepal provides Technical Assistance to all three tiers of the government and assures the quality of the programme.\n\nENSSURE will contribute to Nepal's ongoing TVET sector federalisation process. It will support the Provincial and Local Governments in the implementation of Dual-VET apprenticeships and training with on-the-job training, to better respond to employers' requirements and workers' aspirations.";
const defaultContentP2 = "The procurement and implementation of Dual-VET apprenticeships and training with OJT will be done through Province and Local government respectively with technical support from Helvetas Nepal. The project aims to institutionalise these TVET services so that Provincial and Local Governments can deliver on their TVET responsibilities systematically and sustainably beyond the project's lifespan.";
const contentParagraph1 = computed(() => props.aboutContentSection?.paragraph_1 ?? defaultContentP1);
const contentParagraph2 = computed(() => props.aboutContentSection?.paragraph_2 ?? defaultContentP2);

const modules = [Pagination, Autoplay];
const isClient = ref(false);

const testimonials = [
    {
        quote: "The Dual-VET apprenticeship didn't just teach me welding—it gave me a certified skill and the confidence to start my own business. I'm now employing three others from my community, something I never imagined possible.",
        name: 'Anita Shrestha',
        role: 'Former Apprentice, Now Workshop Owner',
    },
    {
        quote: "The Dual-VET apprenticeship didn't just teach me welding—it gave me a certified skill and the confidence to start my own business. I'm now employing three others from my community, something I never imagined possible.",
        name: 'Anita Shrestha',
        role: 'Former Apprentice, Now Workshop Owner',
    },
    {
        quote: "ENSSURE's training transformed my career. The hands-on approach and industry partnership gave me skills that employers actually value.",
        name: 'Ram Kumar',
        role: 'Industrial Technician',
    },
];

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];

onMounted(() => {
    isClient.value = true;
});
</script>

<template>
    <GuestLayout>
        <Head title="About Us - ENSSURE" />

        <PageHero
            :title="heroTitle"
            :hero-image-url="heroImageUrl"
        />

        <section id="about" class="py-20 lg:py-24 relative overflow-hidden">
            <div class="absolute inset-0">
                <img
                    :src="mainBackgroundImageUrl"
                    alt=""
                    class="w-full h-full object-cover opacity-30"
                />
                <div class="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent" />
                <div class="absolute inset-0 backdrop-blur-[10px] bg-white/40" />
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div class="relative">
                        <div class="absolute -rotate-[4deg] bg-[#233D7E] rounded-[30px] w-full aspect-[507/690]" />
                        <div class="relative rounded-[30px] overflow-hidden aspect-[507/690]">
                            <img
                                :src="mainContentImageUrl"
                                alt="Skill Upgrading Training"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="absolute w-80 bottom-0 right-0 bg-[#B91C1C] rounded-tl-[40px] rounded-br-[30px] p-8">
                            <h3 class="text-white text-2xl leading-tight tracking-tight whitespace-pre-line">
                                {{ mainCardTitle }}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-8">
                            {{ mainTitle }}
                        </h2>
                        <p
                            v-if="mainBody"
                            class="text-xl leading-relaxed text-gray-900 mb-8"
                            v-html="mainBody"
                        />
                        <p
                            v-else
                            class="text-xl leading-relaxed text-gray-900 mb-8"
                        >
                            <span>Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE) project is a </span>
                            <span class="font-bold">bilateral project of the Government of Nepal</span>
                            <span>
                                (GoN) and the Government of Switzerland. The first phase of the project, which started on 20 January 2016 is concluding on 15 July 2022. The second phase of the project is concurrently being implemented from 10 September 2021 and it will be implemented till 15 July 2025.
                            </span>
                        </p>
                        <!-- <Link
                            :href="mainCtaUrl"
                            class="inline-flex items-center gap-2 text-gray-900 uppercase font-medium hover:gap-3 transition-all group"
                        >
                            {{ mainCtaText }}
                            <ArrowRight class="w-5 h-4 group-hover:translate-x-1 transition-transform text-[#B91C1C]" />
                        </Link> -->
                    </div>
                </div>
            </div>
        </section>

        <section class="mt-10 pb-10 border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-10 leading-relaxed text-gray-700">
                <p class="whitespace-pre-line">
                    {{ contentParagraph1 }}
                </p>
                <p>{{ contentParagraph2 }}</p>
            </div>
        </section>

        <!-- <HomeStats :reach-section="props.homeReachSection ?? null" /> -->

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

        <!-- <section id="contact" class="relative py-20 h-96 overflow-hidden">
            <img
                src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png"
                alt=""
                class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40" />
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center">
                <div class="max-w-2xl mx-auto text-white">
                    <span class="uppercase text-[#B91C1C]">JOIN US</span>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight mb-8">
                        Build Skills, Build Futures.
                        <span class="text-[#B91C1C]">Support sustainable</span> employment today.
                    </h2>
                    <Link
                        href="/contact"
                        class="inline-block uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Contact us
                    </Link>
                </div>
            </div>
        </section> -->
    </GuestLayout>
</template>
