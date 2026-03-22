<script setup>
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    pageContent: {
        type: Object,
        default: () => ({
            title: 'Infographics',
            banner_image_url: null,
        }),
    },
    infographics: {
        type: Array,
        default: () => [],
    },
});

const heroTitle = computed(() => props.pageContent?.title ?? 'Infographics');
const heroImageUrl = computed(() => props.pageContent?.banner_image_url ?? null);
const pageHeadTitle = computed(() => `${heroTitle.value} - ENSSURE`);
</script>

<template>
    <GuestLayout>
        <Head :title="pageHeadTitle" />

        <PageHero :title="heroTitle" :hero-image-url="heroImageUrl" />

        <section class="border-b border-[#cad0d8] bg-white py-16 lg:py-24">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div
                    v-for="item in infographics"
                    :key="item.id"
                    class="mb-16 last:mb-0"
                >
                    <h2 class="mb-6 text-center text-xl font-bold text-gray-900 sm:text-2xl">
                        {{ item.title }}
                    </h2>
                    <div
                        class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 p-4 shadow-sm sm:p-6"
                    >
                        <img
                            :src="item.image_url"
                            :alt="item.title"
                            class="mx-auto h-auto w-full max-w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                </div>
                <p
                    v-if="!(infographics || []).length"
                    class="text-center text-sm text-muted-foreground"
                >
                    No infographics to display yet.
                </p>
            </div>
        </section>
    </GuestLayout>
</template>
