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
        />
    </GuestLayout>
</template>
