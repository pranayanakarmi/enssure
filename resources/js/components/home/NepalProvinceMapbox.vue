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

// Color palette for default province fills (soft, thematic)
const provinceBaseColors = {
    koshi: '#FDE8E8',   // very light red
    madhesh: '#FEF3E8', // light orange
    bagmati: '#E8F0FE', // light blue
    gandaki: '#E8FEE8', // light green
    lumbini: '#FEE8F0', // light pink
    karnali: '#F0E8FE', // light purple
    sudurpashchim: '#E8FEF0', // light mint
};

function getDefaultStyle(provinceId) {
    return {
        fillColor: provinceBaseColors[provinceId] || '#F0F2F5',
        fillOpacity: 0.7,
        weight: 1.2,
        color: '#4B5563',      // dark gray border (matches dark theme)
        opacity: 0.8,
        dashArray: null,
    };
}

function getHighlightStyle() {
    return {
        fillColor: '#B91C1C',   // theme red
        fillOpacity: 0.85,
        weight: 2.5,
        color: '#FFFFFF',       // white border for contrast
        opacity: 1,
        dashArray: null,
    };
}

function getHoverStyle() {
    return {
        weight: 2,
        color: '#B91C1C',
        opacity: 1,
    };
}

function clearHighlight() {
    if (!provinceLayer) return;
    provinceLayer.eachLayer((layer) => {
        const provinceId = layer.feature?.properties?.id;
        if (provinceId) {
            layer.setStyle(getDefaultStyle(provinceId));
        }
    });
}

function applyHighlight(provinceId) {
    if (!provinceLayer) return;
    clearHighlight();
    if (provinceId === 'overall') return;
    const targetLayer = provinceLayersById[provinceId];
    if (targetLayer) {
        targetLayer.setStyle(getHighlightStyle());
        targetLayer.bringToFront();
    }
}

function syncHighlightFromProps() {
    applyHighlight(props.selectedProvinceId);
}

async function mountProvinceLayer() {
    if (!map) return;

    try {
        const response = await fetch(props.geoJsonUrl);
        if (!response.ok) throw new Error('Failed to load GeoJSON');
        const geoJson = await response.json();

        if (provinceLayer) map.removeLayer(provinceLayer);
        Object.keys(provinceLayersById).forEach(id => delete provinceLayersById[id]);

        provinceLayer = L.geoJSON(geoJson, {
            style: (feature) => {
                const provinceId = feature?.properties?.id;
                return getDefaultStyle(provinceId);
            },
            onEachFeature: (feature, layer) => {
                const provinceId = feature?.properties?.id;
                if (!provinceId) return;
                provinceLayersById[provinceId] = layer;

                layer.on('mouseover', () => {
                    if (provinceId !== props.selectedProvinceId) {
                        layer.setStyle(getHoverStyle());
                    }
                    layer.getElement()?.classList.add('cursor-pointer');
                });
                layer.on('mouseout', () => {
                    if (provinceId !== props.selectedProvinceId) {
                        layer.setStyle(getDefaultStyle(provinceId));
                    } else {
                        layer.setStyle(getHighlightStyle());
                    }
                });
                layer.on('click', () => {
                    emit('select-province', provinceId);
                });
            },
        }).addTo(map);

        // Add labels
        if (provinceLabelLayer) map.removeLayer(provinceLabelLayer);
        provinceLabelLayer = L.layerGroup().addTo(map);

        provinceLayer.eachLayer((layer) => {
            const provinceId = layer.feature?.properties?.id;
            const provinceName = provinceDisplayNames[provinceId];
            if (!provinceId || !provinceName) return;

            const labelLatLng = layer.getBounds().getCenter();
            const offset = provinceLabelOffsets[provinceId] ?? defaultLabelOffset;
            const marker = L.marker(labelLatLng, {
                interactive: false,
                icon: L.divIcon({
                    className: 'province-label-chip',
                    html: `<span style="transform: translate(${offset.x}px, ${offset.y}px);">${provinceName}</span>`,
                    iconSize: null,
                }),
            });
            marker.addTo(provinceLabelLayer);
        });

        const bounds = provinceLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds.pad(0.14), { padding: [10, 10], maxZoom: 8 });
            map.setMaxBounds(bounds.pad(0.08));
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
            minZoom: 6.499,
        });
        map.setView([28.35, 84.12], 6.49);
        await mountProvinceLayer();
        // Ensure map fills container after mounting
        setTimeout(() => map?.invalidateSize(), 80);
    } catch {
        mapInitFailed.value = true;
    }
});

watch(() => props.selectedProvinceId, () => syncHighlightFromProps());
watch(() => props.geoJsonUrl, async () => await mountProvinceLayer());

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
    <div class="relative w-full h-full">
        <div
            v-if="mapInitFailed"
            class="flex min-h-[320px] items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm font-medium text-red-900"
        >
            The Nepal province map could not be loaded. Please try again.
        </div>
        <div
            v-else
            ref="mapContainerEl"
            class="h-full w-full overflow-hidden rounded-xl border-2 border-gray-700 shadow-md"
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
    border: 1px solid #B91C1C;
    background-color: rgba(255, 255, 255, 0.96);
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    color: #B91C1C;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(2px);
    transition: all 0.2s ease;
}
:deep(.province-label-chip span):hover {
    background-color: #B91C1C;
    color: white;
    border-color: white;
}
</style>
