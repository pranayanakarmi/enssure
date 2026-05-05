<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <section class="relative py-20 h-96 overflow-hidden">
        <img
            src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png"
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center">
            <div class="max-w-2xl mx-auto text-white">
                <span class="uppercase text-[#B91C1C]">JOIN US</span>
                <h2 class="text-[2.5rem] leading-tight tracking-tight mb-8">
                    Build Skills, Build Futures.
                    <span class="text-[#B91C1C]">Support sustainable</span> employment today.
                </h2>
                <Link
                    href="/contact"
                    class="inline-block uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                >
                    Contact us
                </Link>
            </div>
        </div>
    </section>
</template>
