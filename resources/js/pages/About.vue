<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';
import 'swiper/css';
import 'swiper/css/pagination';

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

const stats = [
    { value: '2500', suffix: '+', label: 'Apprenticeship', image: '/enssure/assets/bc3db984eb1022dac4588891e81728e4bf3a4ffe.png' },
    { value: '65', suffix: '%', label: 'Impact on Career Choice', image: '/enssure/assets/53321d22ed1437b7d56b75c96ad4fd3b0515850b.png' },
    { value: '4,687', suffix: '+', label: 'Workers trained', image: '/enssure/assets/26cd438b1a03b2499d51d0b55b38d0159b66a4a0.png' },
    { value: '4420', suffix: '+', label: 'Training with OTJ', image: '/enssure/assets/f298fc73a7e26389ca46ebbe7e8ad2941f22bc80.png' },
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

        <PageHero title="About Us" />

        <section id="about" class="py-20 lg:py-24 relative overflow-hidden">
            <div class="absolute inset-0">
                <img
                    src="/enssure/assets/65b138464c2257ee992dd4572f64fbf14b41e638.png"
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
                                src="/enssure/assets/aboutus.png"
                                alt="Skill Upgrading Training"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="absolute w-80 bottom-0 right-0 bg-[#B91C1C] rounded-tl-[40px] rounded-br-[30px] p-8">
                            <h3 class="text-white text-2xl leading-tight tracking-tight">
                                Skill Upgrading<br />
                                Training for Workers
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-8">
                            Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)
                        </h2>
                        <p class="text-xl leading-relaxed text-gray-900 mb-8">
                            <span>Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE) project is a </span>
                            <span class="font-bold">bilateral project of the Government of Nepal</span>
                            <span>
                                (GoN) and the Government of Switzerland. The first phase of the project, which started on 20 January 2016 is concluding on 15 July 2022. The second phase of the project is concurrently being implemented from 10 September 2021 and it will be implemented till 15 July 2025.
                            </span>
                        </p>
                        <button
                            type="button"
                            class="inline-flex items-center gap-2 text-gray-900 uppercase font-medium hover:gap-3 transition-all group"
                        >
                            Explore more
                            <ArrowRight class="w-5 h-4 group-hover:translate-x-1 transition-transform text-[#B91C1C]" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section class="mt-10 pb-10 border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-10 leading-relaxed text-gray-700">
                <p>
                    The ENSSURE project is implemented by CTEVT at the federal level; Koshi Province, Madhesh Province, Bagmati Province, Gandaki Province, Lumbini Province, Karnali Province, Sudurpashchim Province and 33 Local Governments within those provinces. Helvetas Nepal provides Technical Assistance to all three tiers of the government and assures the quality of the programme.
                    <br /><br />
                    ENSSURE will contribute to Nepal's ongoing TVET sector federalisation process. It will support the Provincial and Local Governments in the implementation of Dual-VET apprenticeships and training with on-the-job training, to better respond to employers' requirements and workers' aspirations.
                </p>
                <p>
                    The procurement and implementation of Dual-VET apprenticeships and training with OJT will be done through Province and Local government respectively with technical support from Helvetas Nepal. The project aims to institutionalise these TVET services so that Provincial and Local Governments can deliver on their TVET responsibilities systematically and sustainably beyond the project's lifespan.
                </p>
            </div>
        </section>

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="md:flex">
                    <div class="md:w-2/6">
                        <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md">
                            Our Impact & <br class="hidden md:block" />
                            Milestones
                        </h2>
                    </div>
                    <div class="md:w-4/6 mt-10">
                        <p class="leading-relaxed text-gray-700">
                            From the initial spark of a career choice to the final certification of trained professionals, our milestones represent a commitment to technical excellence and workforce diversity. By integrating hands-on apprenticeship with rigorous on-the-job training, we have successfully bridged the skills gap and placed expert-ready technicians into the modern industrial sector.
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div
                        v-for="(stat, i) in stats"
                        :key="i"
                        class="stat-card"
                    >
                        <div class="flex flex-col items-center gap-4 p-6">
                            <div class="relative">
                                <img
                                    :src="stat.image"
                                    alt=""
                                    class="w-32 h-32 object-contain"
                                />
                            </div>
                            <div class="text-center">
                                <div class="flex items-start justify-center gap-1 mb-2">
                                    <span class="text-5xl font-medium text-[#101010] tracking-tight">{{ stat.value }}</span>
                                    <span class="text-5xl font-medium text-[#101010]">{{ stat.suffix }}</span>
                                </div>
                                <p class="text-gray-800 leading-relaxed">{{ stat.label }}</p>
                            </div>
                            <div class="group w-10 h-6 flex items-center justify-center border border-[#B91C1C] rounded-full hover:bg-[#B91C1C] hover:text-white transition-colors duration-300 cursor-pointer">
                                <ArrowRight class="w-4 h-4 text-[#B91C1C] group-hover:text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 sm:py-16 lg:py-20 relative">
            <img
                src="/enssure/assets/2679d01e0051158b2d0a86140171d16c36165a4b.png"
                alt=""
                class="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div class="absolute inset-0 bg-black/40" />
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
                <div class="text-white flex-1">
                    <img
                        src="/enssure/assets/icons/testimonials.svg"
                        alt=""
                        class="mb-4 h-8 sm:h-auto"
                    />
                    <span class="uppercase text-[#B91C1C] font-semibold">Testimonials</span>
                    <h2 class="text-xl sm:text-2xl lg:text-[2.5rem] leading-tight tracking-tight mb-6 lg:mb-8 mt-2">
                        Direct testimonials that showcase the real, on-the-ground impact of the <span class="text-[#B91C1C]">ENSSURE project</span> on people and the skills sector in Nepal...
                    </h2>
                </div>
                <div class="flex items-center flex-shrink-0">
                    <img src="/enssure/assets/8a968377964be91f2bd29d0597a3fcfd9483f50d.png" alt="" class="h-12 sm:h-[71px] w-auto relative z-30" />
                    <img src="/enssure/assets/72b567cf937106743c05f243bbd0b21acc3ad182.png" alt="" class="h-12 sm:h-[71px] w-auto object-contain -ml-4 sm:-ml-6 relative z-20" />
                    <img src="/enssure/assets/0440fe7adc00877dd1eb545bc41dd28b30deb21e.png" alt="" class="h-12 sm:h-[71px] w-auto object-contain -ml-4 sm:-ml-6 relative z-10" />
                </div>
            </div>
        </section>

        <section class="-mt-8 sm:-mt-12 lg:-mt-14 pb-16 sm:pb-20">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Swiper
                    v-if="isClient"
                    class="testimonial-swiper"
                    :modules="modules"
                    :slides-per-view="1"
                    :space-between="24"
                    :loop="true"
                    :grab-cursor="true"
                    :autoplay="{ delay: 5000, disableOnInteraction: false }"
                    :pagination="{ clickable: true }"
                    :breakpoints="{
                        640: { slidesPerView: 2, spaceBetween: 24 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 2, spaceBetween: 24 },
                    }"
                >
                    <SwiperSlide
                        v-for="(t, i) in testimonials"
                        :key="i"
                    >
                        <div class="bg-white shadow-lg rounded-xl space-y-4 sm:space-y-5 px-5 sm:px-6 pb-5 pt-14 relative flex-1 flex flex-col min-h-[280px]">
                            <p class="italic text-[#515151] font-thin text-center text-sm sm:text-base flex-1">
                                "{{ t.quote }}"
                            </p>
                            <p class="font-semibold text-center">{{ t.name }}</p>
                            <p class="text-xs italic text-center text-[#515151]">{{ t.role }}</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
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

        <section id="contact" class="relative py-20 h-96 overflow-hidden">
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
        </section>
    </GuestLayout>
</template>
