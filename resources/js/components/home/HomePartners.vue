<!-- <script setup>
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
        .map((p) => ({ logo_url: p.logo_url, name: p.name }))
);
</script>

<template>
    <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
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
            </div>
            <div
                v-if="partnerLogos.length"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
            >
                <div
                    v-for="(partner, i) in partnerLogos"
                    :key="i"
                    class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors"
                >
                    <img
                        :src="partner.logo_url"
                        :alt="partner.name || 'Partner logo'"
                        class="max-w-[190px] max-h-[80px] object-contain"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </section>
</template> -->

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
        .map((p) => ({ logo_url: p.logo_url, name: p.name }))
);

// Use grid only when 4 or fewer, else use scrolling marquee
const useMarquee = computed(() => partnerLogos.value.length > 4);
</script>

<template>
    <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
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
                <div
                    v-for="(partner, i) in partnerLogos"
                    :key="i"
                    class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors"
                >
                    <img
                        :src="partner.logo_url"
                        :alt="partner.name || 'Partner logo'"
                        class="max-w-[190px] max-h-[80px] object-contain"
                        loading="lazy"
                    />
                </div>
            </div>

            <!-- Infinite marquee: 5+ partners -->
            <div
                v-else-if="partnerLogos.length && useMarquee"
                class="relative overflow-hidden mb-12"
            >
                <!-- Left fade -->
                <div class="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <!-- Right fade -->
                <div class="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

                <div class="flex gap-6 marquee-track">
                    <!-- Render twice for seamless loop -->
                    <template v-for="pass in 2" :key="pass">
                        <div
                            v-for="(partner, i) in partnerLogos"
                            :key="`${pass}-${i}`"
                            class="flex-shrink-0 bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] w-[260px] hover:border-[#B91C1C] transition-colors"
                        >
                            <img
                                :src="partner.logo_url"
                                :alt="partner.name || 'Partner logo'"
                                class="max-w-[190px] max-h-[80px] object-contain"
                                loading="lazy"
                            />
                        </div>
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
