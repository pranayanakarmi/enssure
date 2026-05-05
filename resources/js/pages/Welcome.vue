<script setup>
import { Head } from '@inertiajs/vue3';
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
    homeVideoSection: {           // <-- ADD THIS
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

</script>

<template>
    <Head title="ENSSURE - Enhanced Skills for Sustainable and Rewarding Employment">
        <meta
            name="description"
            content="ENSSURE is a bilateral project of the Government of Nepal and the Government of Switzerland enhancing skills for sustainable and rewarding employment through TVET."
        />
        <meta property="og:title" content="ENSSURE - Enhanced Skills for Sustainable and Rewarding Employment" />
        <meta
            property="og:description"
            content="ENSSURE enhances vocational skills and supports sustainable employment across Nepal through Dual-VET apprenticeships and federalized TVET programs."
        />
    </Head>
    <GuestLayout>
        <Home
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
            :home-video-section="props.homeVideoSection ?? null"
            :partners="props.partners ?? []"
            :testimonials="props.testimonials ?? []"
        />
    </GuestLayout>
</template>
