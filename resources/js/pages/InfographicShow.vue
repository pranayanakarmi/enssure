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
    infographic: {
        type: Object,
        required: true,
    },
});

const heroTitle = computed(() => props.infographic?.label ?? 'Infographic');
const heroImageUrl = computed(() => props.pageContent?.banner_image_url ?? null);
const pageHeadTitle = computed(() => `${props.infographic?.label ?? 'Infographic'} - ENSSURE`);
</script>

<template>
    <GuestLayout>
        <Head :title="pageHeadTitle" />

        <PageHero :title="heroTitle" :hero-image-url="heroImageUrl" />

        <section class="border-b border-[#cad0d8] bg-white py-16 lg:py-24">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div class="space-y-10">
                    <div v-for="item in (infographic.items || [])" :key="item.id">
                        <h2 class="mb-4 text-center text-lg font-bold text-gray-900 sm:text-xl">
                            {{ item.title }}
                        </h2>
                        <div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 p-4 shadow-sm sm:p-6">
                            <img :src="item.image_url" :alt="item.title" class="mx-auto h-auto w-full max-w-full object-contain" loading="lazy" />
                        </div>
                    </div>
                    <p v-if="!(infographic.items || []).length" class="text-center text-sm text-gray-500">
                        No infographic items to display yet.
                    </p>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
