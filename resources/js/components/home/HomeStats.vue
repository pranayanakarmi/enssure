<script setup>
import { ArrowRight } from 'lucide-vue-next';

const stats = [
    {
        value: '2500',
        suffix: '+',
        label: 'Apprenticeship',
        image: '/enssure/assets/bc3db984eb1022dac4588891e81728e4bf3a4ffe.png',
    },
    {
        value: '65',
        suffix: '%',
        label: 'Impact on Career Choice',
        image: '/enssure/assets/53321d22ed1437b7d56b75c96ad4fd3b0515850b.png',
    },
    {
        value: '4,687',
        suffix: '+',
        label: 'Workers trained',
        image: '/enssure/assets/26cd438b1a03b2499d51d0b55b38d0159b66a4a0.png',
    },
    {
        value: '4420',
        suffix: '+',
        label: 'Training with OTJ',
        image: '/enssure/assets/f298fc73a7e26389ca46ebbe7e8ad2941f22bc80.png',
    },
];
</script>

<template>
    <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="md:flex">
                <div class="md:w-2/6">
                    <div
                        class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
                    >
                        <span
                            class="font-semibold text-[#B91C1C] uppercase tracking-wide"
                        >
                            Our Reach
                        </span>
                    </div>
                    <h2
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4"
                    >
                        Our Impact & <br class="hidden md:block" />
                        Milestones
                    </h2>
                </div>
                <div class="md:w-4/6 mt-10">
                    <p class="leading-relaxed text-gray-700">
                        From the initial spark of a career choice to the final
                        certification of trained professionals, our milestones
                        represent a commitment to technical excellence and
                        workforce diversity. By integrating hands-on
                        apprenticeship with rigorous on-the-job training, we have
                        successfully bridged the skills gap and placed
                        expert-ready technicians into the modern industrial
                        sector.
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                <div
                    v-for="(stat, i) in stats"
                    :key="i"
                    class="stat-card border border-[#D9D9D9] rounded-xl bg-white"
                >
                    <div class="flex flex-col items-center gap-4 p-6">
                        <img
                            :src="stat.image"
                            :alt="stat.label"
                            class="w-32 h-32 object-contain"
                            loading="lazy"
                        />
                        <div class="text-center">
                            <div
                                class="flex items-start justify-center gap-1 mb-2"
                            >
                                <span
                                    class="text-5xl font-medium text-[#101010] tracking-tight"
                                >
                                    {{ stat.value }}
                                </span>
                                <span
                                    class="text-5xl font-medium text-[#101010]"
                                >
                                    {{ stat.suffix }}
                                </span>
                            </div>
                            <p class="text-gray-800 leading-relaxed">
                                {{ stat.label }}
                            </p>
                        </div>
                        <div
                            class="group w-10 h-6 flex items-center justify-center border border-[#B91C1C] rounded-full hover:bg-[#B91C1C] hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                            <ArrowRight
                                class="w-4 h-4 text-[#B91C1C] group-hover:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
