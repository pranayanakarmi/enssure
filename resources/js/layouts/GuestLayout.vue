<script setup>
import TopBar from '@/components/guest/TopBar.vue';
import Logos from '@/components/guest/Logos.vue';
import Navbar from '@/components/guest/Navbar.vue';
import Footer from '@/components/guest/Footer.vue';
</script>

<template>
    <div
        class="enssure-public min-h-screen bg-white overflow-x-hidden font-[Poppins,sans-serif]"
    >
        <TopBar />
        <Logos />
        <Navbar />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>
