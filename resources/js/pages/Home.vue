<script setup>
import HomeNewsTicker from '@/components/home/HomeNewsTicker.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeStats from '@/components/home/HomeStats.vue';
import HomeAbout from '@/components/home/HomeAbout.vue';
import HomeGallery from '@/components/home/HomeGallery.vue';
import HomeImpactStories from '@/components/home/HomeImpactStories.vue';
import HomeCoverage from '@/components/home/HomeCoverage.vue';
import HomeNews from '@/components/home/HomeNews.vue';
import HomeTestimonials from '@/components/home/HomeTestimonials.vue';
import HomePartners from '@/components/home/HomePartners.vue';
import HomeSupport from '@/components/home/HomeSupport.vue';
import HomeContactCta from '@/components/home/HomeContactCta.vue';

defineProps({
    newsTickerItems: {
        type: Array,
        default: () => [],
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
});
</script>

<template>
    <div class="enssure-home">
        <HomeNewsTicker :items="newsTickerItems" />
        <HomeHero :slides="heroSlides" />
        <HomeStats :reach-section="homeReachSection ?? null" />
        <HomeAbout :about-section="homeAboutSection ?? null" />
        <HomeGallery />
        <HomeImpactStories />
        <HomeCoverage />
        <HomeNews />
        <HomeTestimonials />
        <HomePartners />
        <HomeSupport />
        <HomeContactCta />
    </div>
</template>
