<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    heroImageUrl: {
        type: String,
        default: null,
    },
});

const heroSrc = computed(() => props.heroImageUrl || '/enssure/assets/hero-image.png');
</script>

<template>
    <section class="w-full h-96 overflow-hidden relative">
        <img
            :src="heroSrc"
            alt="Hero"
            class="w-full h-full object-cover object-top"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
            class="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white"
        >
            <h1 class="text-xl sm:text-2xl lg:text-3xl leading-tight mb-4">
                {{ title }}
            </h1>
        </div>
    </section>
</template>
