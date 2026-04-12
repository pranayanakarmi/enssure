<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowRight } from 'lucide-vue-next';

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
        class="py-12 lg:py-16 border-b border-[#D9D9D9] overflow-hidden"
    >
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
            <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#233D7E] to-[#0f2540] px-6 py-8 shadow-xl md:px-10 md:py-10">

                <!-- Decorative circles -->
                <div class="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/5" />
                <div class="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-white/5" />
                <div class="pointer-events-none absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-[#B91C1C]/10" />

                <!-- Top accent line -->
                <div class="mb-5 h-1 w-12 rounded-full bg-[#B91C1C]" />

                <!-- Content -->
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <!-- Left: text -->
                    <div class="max-w-2xl">
                        <h2 class="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                            Your Career.
                            <span class="bg-gradient-to-r from-[#f87171] to-[#B91C1C] bg-clip-text text-transparent">
                                Our Guidance.
                            </span>
                        </h2>
                        <p class="text-sm text-blue-200 leading-relaxed">
                            Nepal's official career platform — gain clarity and discover the right path
                            from education to employment, free for every student.
                        </p>
                    </div>

                    <!-- Right: CTA -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
                            <a
                            href="http://cgs.moest.gov.np/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group inline-flex items-center gap-2 rounded-full bg-[#B91C1C] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#991b1b] hover:shadow-lg hover:shadow-[#B91C1C]/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B91C1C] focus:ring-offset-2 focus:ring-offset-[#233D7E]"
                            >
                            Explore cgs.moest.gov.np
                            <ArrowRight class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
