<script setup>
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import { usePage } from '@inertiajs/vue3';
import { onMounted, watch } from 'vue';

defineProps({
    breadcrumbs: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

const isAdminPath = (url = '') => {
    const path = String(url || '/').split('?')[0];
    return path.startsWith('/admin');
};

const trackPageView = (url = '') => {
    if (!measurementId || typeof window.gtag !== 'function' || !isAdminPath(url)) {
        return;
    }

    const pagePath = String(url || '/').split('#')[0];

    window.gtag('config', measurementId, {
        page_path: pagePath,
    });
};

onMounted(() => {
    if (!measurementId || !isAdminPath(window.location.pathname)) {
        return;
    }

    if (!window.__adminGaInitialized) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args) {
            window.dataLayer.push(args);
        };

        window.gtag('js', new Date());
        window.gtag('config', measurementId, { send_page_view: false });
        window.__adminGaInitialized = true;
    }
});

watch(
    () => page.url,
    (url) => {
        trackPageView(url || window.location.pathname);
    },
    { immediate: true },
);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <slot />
    </AppLayout>
</template>
