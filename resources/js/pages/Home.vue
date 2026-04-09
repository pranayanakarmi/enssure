<script setup>
import HomeAbout from '@/components/home/HomeAbout.vue';
import HomeContactCta from '@/components/home/HomeContactCta.vue';
import HomeCoverage from '@/components/home/HomeCoverage.vue';
import HomeCtaCard from '@/components/home/HomeCtaCard.vue';
import HomeGallery from '@/components/home/HomeGallery.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeImpactStories from '@/components/home/HomeImpactStories.vue';
import HomeNews from '@/components/home/HomeNews.vue';
import HomePartners from '@/components/home/HomePartners.vue';
import HomeStats from '@/components/home/HomeStats.vue';
import HomeSupport from '@/components/home/HomeSupport.vue';
import HomeTestimonials from '@/components/home/HomeTestimonials.vue';
import HomeVideo from '@/components/home/HomeVideo.vue'

defineProps({
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
     homeVideoSection: {
        type: Object,
        default: null,
    },
});
</script>

<template>
    <div class="enssure-home">
        <HomeHero :slides="heroSlides" />
        <HomeStats :reach-section="homeReachSection ?? null" />
        <HomeCtaCard />
        <HomeAbout :about-section="homeAboutSection ?? null" />
        <HomeGallery :gallery-section="homeGallerySection ?? null" />
        <HomeImpactStories :stories-section="homeImpactStoriesSection ?? null" />
        <HomeCoverage :coverage-section="homeCoverageSection ?? null" />
        <HomeNews :news-section="homeNewsSection ?? null" />
        <HomeVideo :video-section="homeVideoSection ?? null" />
        <HomeTestimonials
            :section="homeTestimonialsSection ?? null"
            :testimonials="testimonials ?? []"
        />
        <HomePartners
            :section="homePartnersSection ?? null"
            :partners="partners ?? []"
        />
        <HomeSupport :section="homeSupportSection ?? null" />
        <HomeContactCta :section="homeContactCtaSection ?? null" />

    </div>
</template>
