<script setup>
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Pagination, Autoplay];
const isClient = ref(false);

const defaultTestimonials = [
    {
        quote: '"The Dual-VET apprenticeship didn\'t just teach me welding—it gave me a certified skill and the confidence to start my own business. I\'m now employing three others from my community, something I never imagined possible."',
        name: 'Anita Shrestha',
        role: 'Former Apprentice, Now Workshop Owner',
    },
    {
        quote: '"ENSSURE\'s training transformed my career. The hands-on approach and industry partnership gave me skills that employers actually value."',
        name: 'Ram Kumar',
        role: 'Industrial Technician',
    },
];

const defaultBadge = 'Testimonials';
const defaultTitle = 'Direct testimonials that showcase the real, on-the-ground impact of the <span class="text-[#B91C1C]">ENSSURE project</span> on people and the skills sector in Nepal...';
const defaultBackgroundImage = '/enssure/assets/2679d01e0051158b2d0a86140171d16c36165a4b.png';

const props = defineProps({
    section: {
        type: Object,
        default: null,
    },
    testimonials: {
        type: Array,
        default: () => [],
    },
});

const badgeText = computed(() => props.section?.badge_text ?? defaultBadge);
const title = computed(() => props.section?.title ?? defaultTitle);
const backgroundImageUrl = computed(() => props.section?.background_image_url ?? defaultBackgroundImage);
const testimonialList = computed(() => {
    const list = props.testimonials && props.testimonials.length > 0
        ? props.testimonials
        : defaultTestimonials;
    return list;
});

onMounted(() => {
    isClient.value = true;
});
</script>

<template>
    <section class="py-12 sm:py-16 lg:py-20 relative">
        <img
            v-if="backgroundImageUrl"
            :src="backgroundImageUrl"
            alt=""
            class="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
        />
        <div class="absolute inset-0 bg-black/60" />
        <div
            class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8"
        >
            <div class="text-white flex-1">
                <img
                    src="/enssure/assets/icons/testimonials.svg"
                    alt=""
                    class="mb-4 h-8 sm:h-auto"
                />
                <span class="uppercase text-[#B91C1C] font-semibold">
                    {{ badgeText }}
                </span>
                <h2
                    v-if="title"
                    class="text-xl sm:text-2xl lg:text-[2.5rem] leading-tight tracking-tight mb-6 lg:mb-8 mt-2"
                    v-html="title"
                />
            </div>
            <div class="flex items-center flex-shrink-0">
                <img
                    src="/enssure/assets/8a968377964be91f2bd29d0597a3fcfd9483f50d.png"
                    alt=""
                    class="h-12 sm:h-[71px] w-auto relative z-30"
                    loading="lazy"
                />
                <img
                    src="/enssure/assets/72b567cf937106743c05f243bbd0b21acc3ad182.png"
                    alt=""
                    class="h-12 sm:h-[71px] w-auto object-contain -ml-4 sm:-ml-6 relative z-20"
                    loading="lazy"
                />
                <img
                    src="/enssure/assets/0440fe7adc00877dd1eb545bc41dd28b30deb21e.png"
                    alt=""
                    class="h-12 sm:h-[71px] w-auto object-contain -ml-4 sm:-ml-6 relative z-10"
                    loading="lazy"
                />
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
                :loop="testimonialList.length > 1"
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
                    v-for="(t, i) in testimonialList"
                    :key="i"
                >
                    <div
                        class="bg-white shadow-lg rounded-xl space-y-4 sm:space-y-5 px-5 sm:px-6 pb-5 pt-14 relative flex-1 flex flex-col min-h-[280px]"
                    >
                        <p
                            class="italic text-[#000000] font-semibold text-center text-sm sm:text-base flex-1"
                        >
                            {{ t.quote }}
                        </p>
                        <p class="font-semibold text-center">
                            {{ t.name }}
                        </p>
                        <p
                            v-if="t.role"
                            class="text-xs italic text-center text-[#333333]"
                        >
                            {{ t.role }}
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>
