<script setup>
import { usePage } from '@inertiajs/vue3';
import Footer from '@/components/guest/Footer.vue';
import Logos from '@/components/guest/Logos.vue';
import Navbar from '@/components/guest/Navbar.vue';
import TopBar from '@/components/guest/TopBar.vue';
import HomeNewsTicker from '@/components/home/HomeNewsTicker.vue';

const page = usePage();
const newsTickerItems = page.props.newsTickerItems ?? [];
</script>

<template>
    <div
        class="enssure-public min-h-screen bg-white overflow-x-hidden font-[Poppins,sans-serif]"
    >
        <TopBar />
        <Logos />
        <Navbar />
        <HomeNewsTicker :items="newsTickerItems" />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>
