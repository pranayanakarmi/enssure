<script setup>
import { computed } from 'vue';

const defaultStats = [
    { icon_url: '/enssure/assets/icons/planned-events.svg', value: '308', label: 'Planned Events' },
    { icon_url: '/enssure/assets/icons/completed-events.svg', value: '35', label: 'Completed Events' },
    { icon_url: '/enssure/assets/icons/estimated-participants.svg', value: '5529', label: 'Estimated Participants' },
    { icon_url: '/enssure/assets/icons/enrolled-participants.svg', value: '1430', label: 'Enrolled Participants' },
    { icon_url: '/enssure/assets/icons/budgeted-amount.svg', value: '16.35M', label: 'Budgeted Amount (in Nrs.)' },
];

const defaultBadge = 'Coverage';
const defaultTitle = 'Reaching Across\nthe Nation';
const defaultDescription = 'The ENSSURE project is implemented in all seven provinces and 33 local governments, bringing federalised TVET services directly to communities. Our coverage map illustrates the broad and strategic reach of our Dual-VET and apprenticeship initiatives.';
const defaultMapImage = '/enssure/assets/nepal-map.svg';

const props = defineProps({
    coverageSection: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.coverageSection?.badge_text ?? defaultBadge);
const title = computed(() => props.coverageSection?.title ?? defaultTitle);
const description = computed(() => props.coverageSection?.description ?? defaultDescription);
const mapImageUrl = computed(() => props.coverageSection?.map_image_url ?? defaultMapImage);
const coverageStats = computed(() => {
    const items = props.coverageSection?.items;
    if (items && items.length > 0) {
        return items.map((item) => ({
            icon: item.icon_url,
            value: item.value,
            label: item.label,
        }));
    }
    return defaultStats.map((s) => ({ icon: s.icon_url, value: s.value, label: s.label }));
});
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
                            {{ badgeText }}
                        </span>
                    </div>
                    <h2
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4 whitespace-pre-line"
                    >
                        {{ title }}
                    </h2>
                </div>
                <div class="md:w-4/6 mt-10">
                    <p
                        v-if="description"
                        class="leading-relaxed text-gray-700"
                        v-html="description"
                    />
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
                                v-if="stat.icon"
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
                        v-if="mapImageUrl"
                        :src="mapImageUrl"
                        alt="Nepal Map"
                        class="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
