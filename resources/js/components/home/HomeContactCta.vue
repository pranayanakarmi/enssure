<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';

const props = defineProps({
    section: {
        type: Object,
        default: null,
    },
});

const badgeText          = computed(() => props.section?.badge_text          ?? 'JOIN US');
const title              = computed(() => props.section?.title               ?? 'Build Skills, Build Futures. Support sustainable employment today.');
const highlightPhrase    = computed(() => props.section?.highlight_phrase    ?? 'Support sustainable');
const buttonText         = computed(() => props.section?.button_text         ?? 'Contact us');
const backgroundImageUrl = computed(() => props.section?.background_image_url ?? null);

// ── Safe title split — no v-html ──────────────────────────────────────────────
const titleParts = computed(() => {
    const t = title.value;
    const h = highlightPhrase.value;
    if (!h || !t.includes(h)) {
        return { before: t, highlight: '', after: '' };
    }
    const i = t.indexOf(h);
    return {
        before:    t.slice(0, i),
        highlight: h,
        after:     t.slice(i + h.length),
    };
});

// ── Scroll entrance ───────────────────────────────────────────────────────────
const sectionRef = ref(null);
const isVisible  = ref(false);
let observer     = null;

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                observer.disconnect();
            }
        },
        { threshold: 0.2 },
    );
    if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
    <section
        ref="sectionRef"
        class="relative py-24 sm:py-32 overflow-hidden"
    >
        <!-- Background image -->
        <img
            v-if="backgroundImageUrl"
            :src="backgroundImageUrl"
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/50" />

        <!-- Content -->
        <div
            class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
            <div class="max-w-3xl mx-auto text-white">

                <!-- Badge -->
                <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.15)] rounded-full mb-4">
                    <span class="font-semibold text-[#f87171] uppercase tracking-wide text-sm">
                        {{ badgeText }}
                    </span>
                </div>

                <!-- Title -->
                <h2 class="text-3xl sm:text-[2.5rem] leading-tight tracking-tight mb-8 mt-2">
                    {{ titleParts.before }}
                    <span
                        v-if="titleParts.highlight"
                        class="text-[#f87171]"
                    >{{ titleParts.highlight }}</span>
                    {{ titleParts.after }}
                </h2>

                <!-- CTA button -->
                <Link
                    href="/contact"
                    class="group inline-flex items-center gap-2 bg-white text-[#101010] font-semibold uppercase text-sm px-7 py-3 rounded-full hover:bg-[#B91C1C] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#B91C1C]/30"
                >
                    {{ buttonText }}
                    <ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

            </div>
        </div>

        <!-- Decorative bottom wave -->
        <div class="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg
                viewBox="0 0 1440 40"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                class="w-full h-8 sm:h-10 fill-white"
                aria-hidden="true"
            >
                <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
            </svg>
        </div>
    </section>
</template>
