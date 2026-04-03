<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const page = usePage();
const isHovered = ref(false);

const siteSetting = computed(() => page.props.siteSetting ?? null);

const logoCenterUrl = computed(() =>
    siteSetting.value?.logo_center_url ?? '/enssure/assets/enssure-logo.svg',
);
</script>

<template>
    <div
        class="flex items-center justify-center w-full p-4 rounded-lg transition-all duration-300 cursor-pointer relative group"
        :class="[
            isHovered
                ? 'bg-sidebar-primary/20 shadow-lg'
                : 'bg-transparent hover:bg-sidebar-primary/10'
        ]"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <div class="relative">
            <img
                :src="logoCenterUrl"
                alt="ENSSURE Logo Admin Panel"
                class="h-auto w-full max-w-[8rem] object-contain transition-transform duration-300"
                :class="isHovered ? 'scale-110' : 'scale-100'"
            />

        </div>
    </div>
</template>
