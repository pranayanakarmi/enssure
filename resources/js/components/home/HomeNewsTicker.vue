<script setup>
import { ChevronRight } from 'lucide-vue-next';

const headlines = [
    'Lighting the village and his life',
    'Story of guardianless chef',
    'Good things come to those who learns skills',
    'Lessons on hard work and determination from',
];
</script>

<template>
    <section
        class="flex items-center justify-center text-lg border-t border-black/10"
    >
        <div
            class="whitespace-nowrap bg-[#B91C1C] px-4 py-2 text-white uppercase relative flex-shrink-0"
        >
            Latest News
            <ChevronRight
                class="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B91C1C] bg-white rounded-sm"
            />
        </div>
        <div class="flex-1 min-w-0 overflow-hidden">
            <div class="ticker-wrap flex italic text-sm text-[#515151] w-max">
                <template v-for="(headline, i) in headlines" :key="i">
                    <span class="underline mx-5 whitespace-nowrap">{{
                        headline
                    }}</span>
                </template>
                <template v-for="(headline, i) in headlines" :key="`dup-${i}`">
                    <span class="underline mx-5 whitespace-nowrap">{{
                        headline
                    }}</span>
                </template>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ticker-wrap {
    animation: ticker 30s linear infinite;
}
@keyframes ticker {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>
