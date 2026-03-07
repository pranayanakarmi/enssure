<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';
import Home from '@/pages/Home.vue';

const props = defineProps({
    canRegister: {
        type: Boolean,
        default: true,
    },
    heroSlides: {
        type: Array,
        default: () => [],
    },
    homeReachSection: {
        type: Object,
        default: null,
    },
    homeAboutSection: {
        type: Object,
        default: null,
    },
    homeGallerySection: {
        type: Object,
        default: null,
    },
    homeImpactStoriesSection: {
        type: Object,
        default: null,
    },
    homeCoverageSection: {
        type: Object,
        default: null,
    },
    homeNewsSection: {
        type: Object,
        default: null,
    },
    homeTestimonialsSection: {
        type: Object,
        default: null,
    },
    homePartnersSection: {
        type: Object,
        default: null,
    },
    homeSupportSection: {
        type: Object,
        default: null,
    },
    homeContactCtaSection: {
        type: Object,
        default: null,
    },
    partners: {
        type: Array,
        default: () => [],
    },
    testimonials: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const newsTickerItems = page.props.newsTickerItems ?? [];
</script>

<template>
    <Head title="ENSSURE - Enhanced Skills for Sustainable and Rewarding Employment">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossorigin
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
        />
    </Head>
    <GuestLayout>
        <Home
            :news-ticker-items="newsTickerItems"
            :hero-slides="props.heroSlides ?? []"
            :home-reach-section="props.homeReachSection ?? null"
            :home-about-section="props.homeAboutSection ?? null"
            :home-gallery-section="props.homeGallerySection ?? null"
            :home-impact-stories-section="props.homeImpactStoriesSection ?? null"
            :home-coverage-section="props.homeCoverageSection ?? null"
            :home-news-section="props.homeNewsSection ?? null"
            :home-testimonials-section="props.homeTestimonialsSection ?? null"
            :home-partners-section="props.homePartnersSection ?? null"
            :home-support-section="props.homeSupportSection ?? null"
            :home-contact-cta-section="props.homeContactCtaSection ?? null"
            :partners="props.partners ?? []"
            :testimonials="props.testimonials ?? []"
        />
    </GuestLayout>
</template>
