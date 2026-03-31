<script setup>
import { computed, onMounted, ref } from 'vue';
import NepalProvinceMapbox from '@/components/home/NepalProvinceMapbox.vue';

const defaultBadge = 'Coverage';
const defaultTitle = 'Reaching Across\nthe Nation';
const defaultDescription = 'The ENSSURE project is implemented in all seven provinces and 33 local governments, bringing federalised TVET services directly to communities. Our coverage map illustrates the broad and strategic reach of our Dual-VET and apprenticeship initiatives.';
const coverageStatDefinitions = [
    { key: 'planned_events', icon: '/enssure/assets/icons/planned-events.svg', label: 'Planned Events' },
    { key: 'completed_events', icon: '/enssure/assets/icons/completed-events.svg', label: 'Completed Events' },
    { key: 'estimated_participants', icon: '/enssure/assets/icons/estimated-participants.svg', label: 'Estimated Participants' },
    { key: 'enrolled_participants', icon: '/enssure/assets/icons/enrolled-participants.svg', label: 'Enrolled Participants' },
    { key: 'budgeted_amount', icon: '/enssure/assets/icons/budgeted-amount.svg', label: 'Budgeted Amount (in Nrs.)' },
];
const defaultProvinces = [
    { id: 'overall', name: 'Overall Nepal', display: 'Overall' },
    { id: 'koshi', name: 'Koshi', display: 'Province 1' },
    { id: 'madhesh', name: 'Madhesh', display: 'Province 2' },
    { id: 'bagmati', name: 'Bagmati', display: 'Province 3' },
    { id: 'gandaki', name: 'Gandaki', display: 'Province 4' },
    { id: 'lumbini', name: 'Lumbini', display: 'Province 5' },
    { id: 'karnali', name: 'Karnali', display: 'Province 6' },
    { id: 'sudurpashchim', name: 'Sudurpashchim', display: 'Province 7' },
];

const props = defineProps({
    coverageSection: {
        type: Object,
        default: null,
    },
});

const badgeText = computed(() => props.coverageSection?.badge_text ?? defaultBadge);
const title = computed(() => props.coverageSection?.title ?? defaultTitle);
const description = computed(() => props.coverageSection?.description ?? defaultDescription);
const provincesGeoJsonUrl = computed(() => props.coverageSection?.provinces_geojson_url ?? '/enssure/geojson/nepal-provinces.geojson');
const leafletTileLayerUrl = computed(() => props.coverageSection?.leaflet_tile_layer_url ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png');
const leafletTileAttribution = computed(
    () => props.coverageSection?.leaflet_tile_attribution ?? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
);
const provinceStatsEndpointTemplate = computed(() => props.coverageSection?.province_stats_endpoint_template ?? '/coverage/provinces/__provinceId__');

const provinces = computed(() => {
    const dynamicProvinces = props.coverageSection?.provinces;

    if (dynamicProvinces && dynamicProvinces.length > 0) {
        return dynamicProvinces.map((province, index) => ({
            id: province.id ?? `province-${index + 1}`,
            name: province.name ?? `Province ${index + 1}`,
            display: province.display ?? `Province ${index + 1}`,
        }));
    }

    return defaultProvinces;
});

const selectedProvinceId = ref('overall');
const selectedProvinceStats = ref({});
const loadingProvinceStats = ref(false);
const loadingProvinceStatsError = ref('');
const activeFetchRequestId = ref(0);

const selectedProvince = computed(() => {
    const foundProvince = provinces.value.find((province) => province.id === selectedProvinceId.value);

    if (foundProvince) {
        return foundProvince;
    }

    return provinces.value[0] ?? defaultProvinces[0];
});

const coverageStats = computed(() => {
    return coverageStatDefinitions.map((statDefinition) => ({
        icon: statDefinition.icon,
        value: selectedProvinceStats.value[statDefinition.key] ?? '-',
        label: statDefinition.label,
    }));
});

function provinceStatsUrl(provinceId) {
    return provinceStatsEndpointTemplate.value.replace('__provinceId__', provinceId);
}

async function fetchProvinceCoverage(provinceId) {
    const requestId = activeFetchRequestId.value + 1;
    activeFetchRequestId.value = requestId;
    loadingProvinceStats.value = true;
    loadingProvinceStatsError.value = '';

    try {
        const response = await fetch(provinceStatsUrl(provinceId), {
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to load coverage stats');
        }

        const provinceData = await response.json();

        if (requestId !== activeFetchRequestId.value) {
            return;
        }

        selectedProvinceId.value = provinceData.id ?? provinceId;
        selectedProvinceStats.value = provinceData.stats && typeof provinceData.stats === 'object' ? provinceData.stats : {};
    } catch {
        if (requestId !== activeFetchRequestId.value) {
            return;
        }

        loadingProvinceStatsError.value = 'Unable to load province stats. Please try again.';
    } finally {
        if (requestId === activeFetchRequestId.value) {
            loadingProvinceStats.value = false;
        }
    }
}

function onSelectProvinceFromMap(provinceId) {
    selectedProvinceId.value = provinceId;
    fetchProvinceCoverage(provinceId);
}

onMounted(() => {
    fetchProvinceCoverage(selectedProvinceId.value);
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
                    <div
                        v-if="loadingProvinceStats"
                        class="flex w-full items-center justify-center gap-3 py-10 text-sm font-medium text-[#515151]"
                    >
                        <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#DCE4EA] border-t-[#B91C1C]" />
                        Loading coverage stats...
                    </div>
                    <p
                        v-else-if="loadingProvinceStatsError"
                        class="w-full py-10 text-sm font-medium text-red-700"
                    >
                        {{ loadingProvinceStatsError }}
                    </p>
                    <ul v-else class="space-y-5">
                        <li
                            v-for="(stat, i) in coverageStats"
                            :key="i"
                            class="flex items-center gap-5"
                        >
                            <img
                                v-if="stat.icon"
                                :src="stat.icon"
                                :alt="stat.label"
                                class="w-10 h-10 flex-shrink-0 object-contain"
                            />
                            <div class="flex min-w-0 flex-col">
                                <h2 class="block text-xl font-semibold leading-tight text-[#101010]">
                                    {{ stat.value }}
                                </h2>
                                <span class="mt-0.5 block text-xs text-[#515151]">
                                    {{ stat.label }}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="md:w-4/6 bg-white p-5 border rounded-xl">
                    <div class="flex items-center justify-between gap-4 mb-5">
                        <h3 class="text-lg font-semibold text-[#101010]">
                            {{ selectedProvince.name }}
                        </h3>
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md border border-[#B91C1C]/20 bg-[#B91C1C]/5 px-3 py-1.5 text-xs font-semibold text-[#B91C1C] transition hover:bg-[#B91C1C]/10"
                            :disabled="loadingProvinceStats"
                            @click="onSelectProvinceFromMap('overall')"
                        >
                            Show overall country
                        </button>
                    </div>
                    <NepalProvinceMapbox
                        :selected-province-id="selectedProvinceId"
                        :geo-json-url="provincesGeoJsonUrl"
                        :tile-layer-url="leafletTileLayerUrl"
                        :tile-attribution="leafletTileAttribution"
                        @select-province="onSelectProvinceFromMap"
                    />
                    <p class="mt-3 text-xs text-[#6A7179]">
                        Click a province on the map to view its coverage statistics.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
