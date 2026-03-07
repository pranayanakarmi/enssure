<script setup>
import { computed } from 'vue';

const props = defineProps({
    section: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.section?.badge_text ?? 'Support');
const title = computed(() => props.section?.title ?? 'Technical Assistance By');
const imageUrl = computed(() => props.section?.image_url ?? null);
</script>

<template>
    <section class="py-20 text-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
            >
                <span
                    class="font-semibold text-[#B91C1C] uppercase tracking-wide"
                >
                    {{ badgeText }}
                </span>
            </div>
            <h2
                class="text-[2.5rem] leading-tight tracking-tight text-[#101010] my-4"
            >
                {{ title }}
            </h2>
            <div
                v-if="imageUrl"
                class="flex justify-center"
            >
                <img
                    :src="imageUrl"
                    :alt="title"
                    class="h-16 object-contain"
                    loading="lazy"
                />
            </div>
        </div>
    </section>
</template>
