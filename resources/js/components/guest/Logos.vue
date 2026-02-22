<script setup>
import { Link } from '@inertiajs/vue3';
import { home } from '@/routes';
</script>

<template>
    <div
        class="flex items-center justify-between gap-2 sm:gap-4 w-full mt-4 px-4 sm:px-6 lg:px-14"
    >
        <Link :href="home().url" class="focus:outline-none">
            <img
                src="/enssure/assets/nepal-gov-logo.svg"
                alt="Government of Nepal"
                class="h-10 w-10 sm:h-14 sm:w-14 object-contain"
            />
        </Link>
        <Link :href="home().url" class="focus:outline-none">
            <img
                src="/enssure/assets/enssure-logo.svg"
                alt="ENSSURE Logo"
                class="h-8 sm:h-14 w-auto object-contain"
            />
        </Link>
        <img
            src="/enssure/assets/swiss-logo.svg"
            alt="Swiss Agency for Development and Cooperation"
            class="h-8 sm:h-14 w-auto object-contain"
        />
    </div>
</template>
