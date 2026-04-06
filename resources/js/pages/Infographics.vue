<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    infographics: {
        type: Array,
        default: () => [],
    },
});

const pageTitle = 'Infographics - ENSSURE';
</script>

<template>
    <GuestLayout>
        <Head :title="pageTitle" />

        <!-- Static hero (or you can use first infographic's banner if needed) -->
        <div class="bg-gradient-to-r from-blue-900 to-blue-700 py-16 text-center text-white">
            <h1 class="text-4xl font-bold">Infographics</h1>
            <p class="mt-2 text-lg">Visual insights into our programs and impact</p>
        </div>

        <section class="border-b border-[#cad0d8] bg-white py-16 lg:py-24">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div class="rounded-lg border border-gray-200 bg-gray-50/80 shadow-sm">
                    <div class="divide-y divide-gray-200">
                        <div v-for="item in infographics" :key="item.slug" class="flex items-center justify-between gap-4 px-5 py-4">
                            <div class="flex items-center gap-4">
                                <img v-if="item.image_url" :src="item.image_url" :alt="item.title" class="h-12 w-16 rounded object-cover" />
                                <h2 class="text-base font-semibold text-gray-900 sm:text-lg">{{ item.title }}</h2>
                            </div>
                            <Link :href="item.public_url" class="text-sm font-medium text-[#042f66] hover:underline">
                                View infographic
                            </Link>
                        </div>
                        <div v-if="!infographics.length" class="px-5 py-8 text-center text-sm text-gray-500">
                            No infographics to display yet.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
