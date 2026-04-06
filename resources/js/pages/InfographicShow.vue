<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
const props = defineProps({
    infographic: {
        type: Object,
        required: true,
    },
});

console.log('Infographic data:', props.infographic); // Debugging line to check infographic data
const pageTitle = computed(() => `${props.infographic.hero_title || props.infographic.title} - ENSSURE`);
</script>

<template>
    <GuestLayout>
        <Head :title="pageTitle" />

        <PageHero
            :title="infographic.hero_title || infographic.title"
            :hero-image-url="infographic.banner_url"
        />

        <!-- CTA Description Section -->
        <div v-if="infographic.description" class="bg-white py-12 px-4">
            <div class="mx-auto max-w-4xl">
                <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3a5c] to-[#0f2540] px-8 py-10 md:px-12 md:py-14 shadow-xl">

                    <!-- Decorative background circles -->
                    <div class="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-white/5"></div>
                    <div class="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-white/5"></div>

                    <!-- Top accent line -->
                    <div class="mb-6 h-1 w-14 rounded-full bg-[#f59e0b]"></div>

                    <!-- Description body -->
                    <div
                        class="prose prose-invert prose-lg max-w-none text-blue-100 leading-relaxed mb-8"
                        v-html="infographic.description"
                    />

                    <!-- CTA row -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                        <Link
                            :href="infographic.url || '/contact'"
                            class="inline-flex items-center gap-2 rounded-full bg-[#f59e0b] px-7 py-3 text-sm font-semibold text-[#0f2540] shadow-md transition-all duration-200 hover:bg-[#fbbf24] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:ring-offset-2 focus:ring-offset-[#0f2540]"
                        >
                            {{ infographic.cta_label || 'Learn More' }}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </Link>

                        <span
                            v-if="infographic.cta_subtext"
                            class="text-sm text-blue-300"
                        >
                            {{ infographic.cta_subtext }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Items section -->
        <section class="border-b border-[#cad0d8] bg-white pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div v-if="infographic.items && infographic.items.length" class="space-y-10">
                    <div v-for="item in infographic.items" :key="item.id">
                        <h2 class="mb-4 text-center text-lg font-bold text-gray-900 sm:text-xl">
                            {{ item.title }}
                        </h2>
                        <div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50/80 p-4 shadow-sm sm:p-6">
                            <img
                                :src="item.image_url"
                                :alt="item.alt_text || item.title"
                                class="mx-auto h-auto w-full max-w-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
                <p v-else class="text-center text-sm text-gray-500">
                    No infographic items to display yet.
                </p>
            </div>
        </section>
    </GuestLayout>
</template>
