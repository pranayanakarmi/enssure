<script setup>
const coverageStats = [
    {
        icon: '/enssure/assets/icons/planned-events.svg',
        value: '308',
        label: 'Planned Events',
    },
    {
        icon: '/enssure/assets/icons/completed-events.svg',
        value: '35',
        label: 'Completed Events',
    },
    {
        icon: '/enssure/assets/icons/estimated-participants.svg',
        value: '5529',
        label: 'Estimated Participants',
    },
    {
        icon: '/enssure/assets/icons/enrolled-participants.svg',
        value: '1430',
        label: 'Enrolled Participants',
    },
    {
        icon: '/enssure/assets/icons/budgeted-amount.svg',
        value: '16.35M',
        label: 'Budgeted Amount (in Nrs.)',
    },
];
</script>

<template>
    <section id="coverage" class="py-20 lg:py-24 bg-[#F8FBFC]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="md:flex mb-12 lg:mb-16">
                <div class="md:w-2/6">
                    <div
                        class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
                    >
                        <span
                            class="font-semibold text-[#B91C1C] uppercase tracking-wide"
                        >
                            Coverage
                        </span>
                    </div>
                    <h2
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4"
                    >
                        Reaching Across
                        <br class="hidden md:block" />
                        the Nation
                    </h2>
                </div>
                <div class="md:w-4/6 mt-10">
                    <p class="leading-relaxed text-gray-700">
                        The ENSSURE project is implemented in all seven
                        provinces and 33 local governments, bringing federalised
                        TVET services directly to communities. Our coverage map
                        illustrates the broad and strategic reach of our Dual-VET
                        and apprenticeship initiatives.
                    </p>
                </div>
            </div>
            <div class="md:flex">
                <div
                    class="md:w-2/6 bg-white p-10 border-y border-l rounded-tl-xl rounded-bl-xl my-5 flex flex-col items-start justify-center"
                >
                    <ul class="space-y-5">
                        <li
                            v-for="(stat, i) in coverageStats"
                            :key="i"
                            class="flex space-x-5"
                        >
                            <img
                                :src="stat.icon"
                                :alt="stat.label"
                                class="w-10 h-10 object-contain flex-shrink-0"
                            />
                            <div>
                                <h2 class="text-xl font-semibold">
                                    {{ stat.value }}
                                </h2>
                                <span class="text-[#515151] text-xs">
                                    {{ stat.label }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="md:w-4/6 bg-white p-10 border rounded-xl">
                    <img
                        src="/enssure/assets/nepal-map.svg"
                        alt="Nepal Map"
                        class="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
