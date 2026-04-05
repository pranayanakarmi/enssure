<script setup>
import { computed } from 'vue';

const props = defineProps({
    section: {
        type: Object,
        default: null,
    },
    partners: {
        type: Array,
        default: () => [],
    },
});

const badgeText = computed(() => props.section?.badge_text ?? 'Our Partners');
const title = computed(() => props.section?.title ?? 'We work with the best Partners');

const partnerLogos = computed(() =>
    (props.partners || [])
        .filter((p) => p.logo_url)
        .map((p) => ({
            logo_url: p.logo_url,
            name: p.name,
            website_url: p.website_url,
        }))
);

const useMarquee = computed(() => partnerLogos.value.length > 4);
</script>

<template>
    <section class="py-20 lg:py-24 bg-white border-t border-b border-[#cad0d8]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                <div class="mb-6 flex justify-center">
                    <div
                        class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
                    >
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">
                            {{ badgeText }}
                        </span>
                    </div>
                </div>
                <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                    {{ title }}
                </h2>
            </div>

            <!-- Static grid: 4 or fewer partners -->
            <div
                v-if="partnerLogos.length && !useMarquee"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
            >
                <template v-for="(partner, i) in partnerLogos" :key="i">
                    <!-- Clickable card when website_url exists -->
                    <a
                        v-if="partner.website_url"
                        :href="partner.website_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="relative bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors group cursor-pointer block"
                    >
                        <img
                            :src="partner.logo_url"
                            :alt="partner.name || 'Partner logo'"
                            class="max-w-[190px] max-h-[80px] object-contain"
                            loading="lazy"
                        />
                        <div
                            class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#B91C1C] text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                        >
                            Visit site →
                        </div>
                    </a>
                    <!-- Non-clickable card when no website_url -->
                    <div
                        v-else
                        class="relative bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] group"
                    >
                        <img
                            :src="partner.logo_url"
                            :alt="partner.name || 'Partner logo'"
                            class="max-w-[190px] max-h-[80px] object-contain"
                            loading="lazy"
                        />
                        <div
                            class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                        >
                            No site
                        </div>
                    </div>
                </template>
            </div>

            <!-- Infinite marquee: 5+ partners -->
            <div
                v-else-if="partnerLogos.length && useMarquee"
                class="relative overflow-hidden mb-12"
            >
                <div class="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div class="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

                <div class="flex gap-6 marquee-track">
                    <template v-for="pass in 2" :key="pass">
                        <template v-for="(partner, i) in partnerLogos" :key="`${pass}-${i}`">
                            <a
                                v-if="partner.website_url"
                                :href="partner.website_url"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="relative flex-shrink-0 bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] w-[260px] hover:border-[#B91C1C] transition-colors group cursor-pointer block"
                            >
                                <img
                                    :src="partner.logo_url"
                                    :alt="partner.name || 'Partner logo'"
                                    class="max-w-[190px] max-h-[80px] object-contain"
                                    loading="lazy"
                                />
                                <div
                                    class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#B91C1C] text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                                >
                                    Visit site →
                                </div>
                            </a>
                            <div
                                v-else
                                class="relative flex-shrink-0 bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] w-[260px] group"
                            >
                                <img
                                    :src="partner.logo_url"
                                    :alt="partner.name || 'Partner logo'"
                                    class="max-w-[190px] max-h-[80px] object-contain"
                                    loading="lazy"
                                />
                                <div
                                    class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                                >
                                    No site
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.marquee-track {
    width: max-content;
    animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
    animation-play-state: paused;
}

@keyframes marquee-scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>
