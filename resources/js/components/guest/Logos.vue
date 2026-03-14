<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { home } from '@/routes';

const page = usePage();

const siteSetting = computed(() => page.props.siteSetting ?? null);

const logoLeftUrl = computed(() =>
    siteSetting.value?.logo_left_url ?? '/enssure/assets/nepal-gov-logo.svg',
);
const logoCenterUrl = computed(() =>
    siteSetting.value?.logo_center_url ?? '/enssure/assets/enssure-logo.svg',
);
const logoRightUrl = computed(() =>
    siteSetting.value?.logo_right_url ?? '/enssure/assets/swiss-logo.svg',
);
</script>

<template>
    <div
        class="flex items-center justify-between gap-2 sm:gap-4 w-full mt-4 px-4 sm:px-6 lg:px-14"
    >
        <Link :href="home().url" class="focus:outline-none">
            <img
                :src="logoLeftUrl"
                alt="Government of Nepal"
                class="h-10 w-10 sm:h-14 sm:w-14 object-contain"
            />
        </Link>
        <Link :href="home().url" class="focus:outline-none">
            <img
                :src="logoCenterUrl"
                alt="ENSSURE Logo"
                class="h-8 sm:h-14 w-auto object-contain"
            />
        </Link>
        <img
            :src="logoRightUrl"
            alt="Swiss Agency for Development and Cooperation"
            class="h-8 sm:h-14 w-auto object-contain"
        />
    </div>
</template>
