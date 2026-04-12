<script setup>
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import { computed } from 'vue';

const fallbackBadge = 'About us';
const fallbackTitle = 'Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE)';
const fallbackBody = 'Enhanced Skills for Sustainable and Rewarding Employment (ENSSURE) project is a bilateral project of the Government of Nepal (GoN) and the Government of Switzerland. The first phase of the project, which started on 20 January 2016 is concluding on 15 July 2022. The second phase of the project is concurrently being implemented from 10 September 2021 and it will be implemented till 15 July 2025.';
const fallbackCardTitle = 'Skill Upgrading Training for Workers';
const fallbackBackgroundImage = '/enssure/assets/65b138464c2257ee992dd4572f64fbf14b41e638.png';
const fallbackContentImage = '/enssure/assets/92e5701fdd7940bbc54c42d3a4d3ffaef9c4abec.png';
const fallbackCtaText = 'Explore more';
const fallbackCtaUrl = '#';

const props = defineProps({
    aboutSection: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.aboutSection?.badge_text ?? fallbackBadge);
const title = computed(() => props.aboutSection?.title ?? fallbackTitle);
const body = computed(() => props.aboutSection?.body ?? fallbackBody);
const cardTitle = computed(() => props.aboutSection?.card_title ?? fallbackCardTitle);
const backgroundImageUrl = computed(() => props.aboutSection?.background_image_url ?? fallbackBackgroundImage);
const contentImageUrl = computed(() => props.aboutSection?.content_image_url ?? fallbackContentImage);
const ctaText = computed(() => props.aboutSection?.cta_text ?? fallbackCtaText);
const ctaUrl = computed(() => props.aboutSection?.cta_url ?? fallbackCtaUrl);
</script>

<template>
    <section
        id="about"
        class="relative py-20 overflow-hidden lg:py-24"
    >
        <div class="absolute inset-0">
            <img
                v-if="backgroundImageUrl"
                :src="backgroundImageUrl"
                alt=""
                class="object-cover w-full h-full opacity-30"
                loading="lazy"
            />
            <div
                class="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent"
            />
            <div class="absolute inset-0 backdrop-blur-[10px] bg-white/40" />
        </div>
        <div class="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div class="relative">
                    <div
                        class="absolute -rotate-[4deg] bg-[#233D7E] rounded-[30px] w-full aspect-[507/690]"
                    />
                    <div
                        class="relative rounded-[30px] overflow-hidden aspect-[507/690]"
                    >
                        <img
                            v-if="contentImageUrl"
                            :src="contentImageUrl"
                            alt="Skill Upgrading Training"
                            class="object-cover w-full h-full"
                            loading="lazy"
                        />
                    </div>
                    <div
                        v-if="cardTitle"
                        class="absolute w-80 bottom-0 right-0 bg-[#B91C1C] rounded-tl-[40px] rounded-br-[30px] p-8"
                    >
                        <h3
                            class="text-2xl leading-tight tracking-tight text-white"
                        >
                            <span v-html="cardTitle.replace(/\n/g, '<br />')" />
                        </h3>
                    </div>
                </div>
                <div>
                    <div class="mb-8">
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
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-8"
                    >
                        {{ title }}
                    </h2>
                    <div
                        class="mb-8 text-xl leading-relaxed prose prose-lg text-gray-900 max-w-none"
                        v-html="body"
                    />
                    <Link
                        v-if="ctaText"
                        :href="ctaUrl"
                        class="inline-flex items-center gap-2 font-medium text-gray-900 uppercase transition-all hover:gap-3 group"
                    >
                        {{ ctaText }}
                        <ArrowRight
                            class="w-5 h-4 group-hover:translate-x-1 transition-transform text-[#B91C1C]"
                        />
                    </Link>
                </div>
            </div>
        </div>
    </section>
</template>
