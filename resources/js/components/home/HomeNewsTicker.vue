<script setup>
import { Link } from '@inertiajs/vue3';
import { ChevronRight } from 'lucide-vue-next';

defineProps({
    items: {
        type: Array,
        default: () => [],
    },
});

function isInternal(url) {
    if (!url || url === '#') return false;
    return url.startsWith('/') && !url.startsWith('//');
}
</script>

<template>
    <section
        v-if="(items || []).length > 0"
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
                <template v-for="(item, i) in items" :key="`${item.id ?? i}-a`">
                    <span v-if="!item.url" class="underline mx-5 whitespace-nowrap">{{ item.title }}</span>
                    <Link
                        v-else-if="isInternal(item.url)"
                        :href="item.url"
                        class="underline mx-5 whitespace-nowrap hover:text-[#B91C1C]"
                    >
                        {{ item.title }}
                    </Link>
                    <a
                        v-else
                        :href="item.url"
                        class="underline mx-5 whitespace-nowrap hover:text-[#B91C1C]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ item.title }}
                    </a>
                </template>
                <template v-for="(item, i) in items" :key="`${item.id ?? i}-b`">
                    <span v-if="!item.url" class="underline mx-5 whitespace-nowrap">{{ item.title }}</span>
                    <Link
                        v-else-if="isInternal(item.url)"
                        :href="item.url"
                        class="underline mx-5 whitespace-nowrap hover:text-[#B91C1C]"
                    >
                        {{ item.title }}
                    </Link>
                    <a
                        v-else
                        :href="item.url"
                        class="underline mx-5 whitespace-nowrap hover:text-[#B91C1C]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ item.title }}
                    </a>
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
