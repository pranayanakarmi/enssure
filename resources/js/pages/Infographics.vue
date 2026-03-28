<script setup>
import { Head, Link } from '@inertiajs/vue3';
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
                <div class="rounded-lg border border-gray-200 bg-gray-50/80 shadow-sm">
                    <div class="divide-y divide-gray-200">
                        <div v-for="item in infographics" :key="item.slug" class="flex items-center justify-between gap-4 px-5 py-4">
                            <h2 class="text-base font-semibold text-gray-900 sm:text-lg">{{ item.label }}</h2>
                            <Link :href="`/infographics/${item.slug}`" class="text-sm font-medium text-[#042f66] hover:underline">
                                View infographic
                            </Link>
                        </div>
                        <div v-if="!(infographics || []).length" class="px-5 py-8 text-center text-sm text-gray-500">
                            No infographics to display yet.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
