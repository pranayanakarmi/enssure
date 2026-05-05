<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import Footer from '@/components/guest/Footer.vue';
import Logos from '@/components/guest/Logos.vue';
import Navbar from '@/components/guest/Navbar.vue';
import TopBar from '@/components/guest/TopBar.vue';
import HomeNewsTicker from '@/components/home/HomeNewsTicker.vue';

const page = usePage();
const newsTickerItems = page.props.newsTickerItems ?? [];
</script>

<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
        />
    </Head>
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
