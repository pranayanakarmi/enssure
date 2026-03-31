<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
    selectedProvinceId: {
        type: String,
        required: true,
    },
    geoJsonUrl: {
        type: String,
        default: '/enssure/geojson/nepal-provinces.geojson',
    },
    tileLayerUrl: {
        type: String,
        default: import.meta.env.VITE_LEAFLET_TILE_LAYER_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    tileAttribution: {
        type: String,
        default: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
});

const emit = defineEmits(['select-province']);

const mapContainerEl = ref(null);
const mapInitFailed = ref(false);

let map = null;
let provinceLayer = null;
let provinceLabelLayer = null;
const provinceLayersById = {};
const provinceDisplayNames = {
    koshi: 'Koshi',
    madhesh: 'Madhesh',
    bagmati: 'Bagmati',
    gandaki: 'Gandaki',
    lumbini: 'Lumbini',
    karnali: 'Karnali',
    sudurpashchim: 'Sudurpashchim',
};
const defaultLabelOffset = { x: -10, y: 0 };
const provinceLabelOffsets = {
    koshi: { x: -8, y: 0 },
    madhesh: { x: -35, y: -10 },
    bagmati: { x: -15, y: -10 },
    gandaki: { x: -20, y: -10 },
    lumbini: { x: -10, y: 0 },
    karnali: { x: -30, y: 0 },
    sudurpashchim: { x: -55, y: -10 },
};

function clearHighlight() {
    if (!provinceLayer) {
        return;
    }

    provinceLayer.eachLayer((layer) => {
        layer.setStyle({
            fillColor: '#D8E4EE',
            fillOpacity: 0.42,
            weight: 1.25,
            color: '#233D7E',
        });
    });
}

function applyHighlight(provinceId) {
    if (!provinceLayer) {
        return;
    }

    clearHighlight();

    if (provinceId === 'overall') {
        return;
    }

    const allowed = ['koshi', 'madhesh', 'bagmati', 'gandaki', 'lumbini', 'karnali', 'sudurpashchim'];

    if (!allowed.includes(provinceId)) {
        return;
    }

    const targetLayer = provinceLayersById[provinceId];

    if (targetLayer) {
        targetLayer.setStyle({
            fillColor: '#B91C1C',
            fillOpacity: 0.55,
            weight: 1.5,
            color: '#233D7E',
        });
    }
}

function syncHighlightFromProps() {
    applyHighlight(props.selectedProvinceId);
}

async function mountProvinceLayer() {
    if (!map) {
        return;
    }

    try {
        const response = await fetch(props.geoJsonUrl);

        if (!response.ok) {
            throw new Error('Failed to load provinces GeoJSON');
        }

        const geoJson = await response.json();

        if (provinceLayer) {
            map.removeLayer(provinceLayer);
        }

        Object.keys(provinceLayersById).forEach((provinceId) => {
            delete provinceLayersById[provinceId];
        });

        provinceLayer = L.geoJSON(geoJson, {
            style: {
                fillColor: '#D8E4EE',
                fillOpacity: 0.42,
                color: '#233D7E',
                weight: 1.25,
            },
            onEachFeature: (feature, layer) => {
                const provinceId = feature?.properties?.id;

                if (!provinceId) {
                    return;
                }

                provinceLayersById[provinceId] = layer;

                layer.on('mouseover', () => {
                    layer.getElement()?.classList.add('cursor-pointer');
                });

                layer.on('click', () => {
                    emit('select-province', provinceId);
                });
            },
        }).addTo(map);

        if (provinceLabelLayer) {
            map.removeLayer(provinceLabelLayer);
        }

        provinceLabelLayer = L.layerGroup().addTo(map);

        provinceLayer.eachLayer((layer) => {
            const provinceId = layer.feature?.properties?.id;
            const provinceName = provinceDisplayNames[provinceId];

            if (!provinceId || !provinceName) {
                return;
            }

            const labelLatLng = layer.getBounds().getCenter();
            const labelOffset = provinceLabelOffsets[provinceId] ?? defaultLabelOffset;
            const marker = L.marker(labelLatLng, {
                interactive: false,
                icon: L.divIcon({
                    className: 'province-label-chip',
                    html: `<span style="transform: translate(${labelOffset.x}px, ${labelOffset.y}px);">${provinceName}</span>`,
                    iconSize: null,
                }),
            });

            marker.addTo(provinceLabelLayer);
        });

        const bounds = provinceLayer.getBounds();

        if (bounds.isValid()) {
            const fittedBounds = bounds.pad(0.14);

            map.fitBounds(fittedBounds, { padding: [14, 14], maxZoom: 8.6 });
            map.setMaxBounds(fittedBounds.pad(0.08));
        }

        syncHighlightFromProps();
    } catch {
        mapInitFailed.value = true;
    }
}

onMounted(async () => {
    try {
        map = L.map(mapContainerEl.value, {
            zoomControl: true,
            attributionControl: false,
            scrollWheelZoom: false,
            dragging: true,
            maxBoundsViscosity: 1.0,
            minZoom: 7
        });

        map.setView([28.35, 84.12], 7);

        await mountProvinceLayer();
        // Ensure Leaflet recalculates viewport after layout settles.
        setTimeout(() => {
            map?.invalidateSize();
        }, 80);
    } catch {
        mapInitFailed.value = true;
    }
});

watch(
    () => props.selectedProvinceId,
    () => {
        syncHighlightFromProps();
    },
);

watch(
    () => props.geoJsonUrl,
    async () => {
        await mountProvinceLayer();
    },
);

onBeforeUnmount(() => {
    if (map) {
        map.remove();
        map = null;
    }

    provinceLayer = null;
    provinceLabelLayer = null;
});
</script>

<template>
    <div class="relative">
        <div
            v-if="mapInitFailed"
            class="flex min-h-[320px] items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm font-medium text-red-900"
        >
            The Nepal province map could not be loaded. Please try again.
        </div>

        <div
            v-else
            ref="mapContainerEl"
            class="h-[465px] w-full overflow-hidden rounded-xl border border-[#DCE4EA] bg-[#EFF5F9]"
            role="presentation"
        />
    </div>
</template>

<style scoped>
:deep(.province-label-chip) {
    transform: translate(-50%, -50%);
}

:deep(.province-label-chip span) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid #23428a;
    background-color: rgba(255, 255, 255, 0.93);
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    color: #1f3d83;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
</style>
