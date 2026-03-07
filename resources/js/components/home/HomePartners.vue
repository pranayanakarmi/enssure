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
</template>
