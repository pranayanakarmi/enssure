<script setup>
import { Head } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';
import Home from '@/pages/Home.vue';

defineProps({
    canRegister: {
        type: Boolean,
        default: true,
    },
});
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
        <Home />
    </GuestLayout>
</template>
