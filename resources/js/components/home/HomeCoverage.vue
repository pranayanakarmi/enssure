<script setup>
import {
  MapPin,
  RefreshCw,
  Users,
  Building2,
  School,
  Briefcase,
  Landmark,
  GraduationCap,
  HandCoins,
  FileCheck,
  Eye,
  TrendingUp,
} from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import NepalProvinceMapbox from '@/components/home/NepalProvinceMapbox.vue';

// ── Fallbacks ─────────────────────────────────────────────────────────────────
const defaultBadge       = 'Coverage';
const defaultTitle       = 'Reaching Across\nthe Nation';
const defaultDescription = 'The ENSSURE project is implemented in all seven provinces and 33 local governments, bringing federalised TVET services directly to communities. Our coverage map illustrates the broad and strategic reach of our Dual-VET and apprenticeship initiatives.';

// ── Stat definitions (all 11 indicators) ─────────────────────────────────────
const coverageStatDefinitions = [
  { key: 'apprentices_reached',           icon: Users,         label: 'Apprentices Reached', color: 'text-blue-600' },
  { key: 'cgsc_established',              icon: Building2,     label: 'CGSC Established',    color: 'text-emerald-600' },
  { key: 'career_guidance_units',         icon: School,        label: 'Guidance Units',      color: 'text-purple-600' },
  { key: 'career_guidance_schools',       icon: GraduationCap, label: 'Schools Covered',     color: 'text-amber-600' },
  { key: 'apprentices_placed',            icon: Briefcase,     label: 'Apprentices Placed',  color: 'text-rose-600' },
  { key: 'lg_coverage',                   icon: Landmark,      label: 'LG Coverage',         color: 'text-indigo-600' },
  { key: 'ojt_participants',              icon: Users,         label: 'OJT Participants',    color: 'text-cyan-600' },
  { key: 'workers_trained_sut',           icon: GraduationCap, label: 'Workers Trained (SUT)', color: 'text-orange-600' },
  { key: 'private_sector_coinvestment',   icon: HandCoins,     label: 'Private Co-Investment', color: 'text-green-600' },
  { key: 'government_sector_coinvestment',icon: HandCoins,     label: 'Govt Co‑Investment',  color: 'text-teal-600' },
  { key: 'policy_endorsed',               icon: FileCheck,     label: 'Policy Endorsed',     color: 'text-red-600' },
];

// Province list
const defaultProvinces = [
  { id: 'overall',        name: 'Overall Nepal',  display: 'Overall'    },
  { id: 'koshi',          name: 'Koshi',          display: 'Koshi'      },
  { id: 'madhesh',        name: 'Madhesh',        display: 'Madhesh'    },
  { id: 'bagmati',        name: 'Bagmati',        display: 'Bagmati'    },
  { id: 'gandaki',        name: 'Gandaki',        display: 'Gandaki'    },
  { id: 'lumbini',        name: 'Lumbini',        display: 'Lumbini'    },
  { id: 'karnali',        name: 'Karnali',        display: 'Karnali'    },
  { id: 'sudurpashchim',  name: 'Sudurpashchim',  display: 'SudurPaschim'      },
];

// ── Props ─────────────────────────────────────────────────────────────────────
const props = defineProps({
  coverageSection: { type: Object, default: null },
});

// ── Computed ─────────────────────────────────────────────────────────────────
const badgeText   = computed(() => props.coverageSection?.badge_text ?? defaultBadge);
const title       = computed(() => props.coverageSection?.title      ?? defaultTitle);
const description = computed(() => props.coverageSection?.description ?? defaultDescription);

// Map tiles (colorful CartoDB Voyager)
const provincesGeoJsonUrl    = computed(() => props.coverageSection?.provinces_geojson_url    ?? '/enssure/geojson/nepal-provinces.geojson');
const leafletTileLayerUrl    = computed(() => props.coverageSection?.leaflet_tile_layer_url   ?? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png');
const leafletTileAttribution = computed(() => props.coverageSection?.leaflet_tile_attribution ?? '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>');
const provinceStatsAllEndpoint = '/coverage/provinces/all';

const provinces = computed(() => {
  const dynamic = props.coverageSection?.provinces;
  if (dynamic?.length) {
    return dynamic.map((p, i) => ({
      id:      p.id      ?? `province-${i + 1}`,
      name:    p.name    ?? `Province ${i + 1}`,
      display: p.display ?? `Province ${i + 1}`,
    }));
  }
  return defaultProvinces;
});

// ── Data caching & state ─────────────────────────────────────────────────────
const statsCache = ref(new Map());
const selectedProvinceId = ref('overall');
const selectedProvinceStats = ref({});
const loadingProvinceStats = ref(false);
const loadingProvinceId = ref('');
const loadingError = ref('');
const hasInteracted = ref(false);

const selectedProvince = computed(() =>
  provinces.value.find((p) => p.id === selectedProvinceId.value) ?? provinces.value[0] ?? defaultProvinces[0]
);

const helperText = computed(() => {
  if (selectedProvinceId.value === 'overall') {
    return hasInteracted.value
      ? 'You are viewing national totals. Select a province to compare local coverage.'
      : 'Click any province on the map or from the tabs to view detailed statistics.';
  }
  return `Showing ${selectedProvince.value.name}. Use Reset to return to national totals.`;
});

const selectionAnnouncement = computed(() => `Showing statistics for ${selectedProvince.value.name}.`);

function formatStatValue(raw) {
  if (raw === undefined || raw === null || raw === '-') return '-';
  const num = Number(String(raw).replace(/,/g, ''));
  if (!isNaN(num) && num >= 1000) return num.toLocaleString();
  return String(raw);
}

const coverageStats = computed(() =>
  coverageStatDefinitions.map((def) => ({
    icon:  def.icon,
    value: formatStatValue(selectedProvinceStats.value[def.key]),
    label: def.label,
    color: def.color,
  }))
);

// Animated stats
const animatedStats = ref(coverageStats.value.map(() => '-'));
watch(coverageStats, (newStats) => {
  newStats.forEach((stat, i) => {
    const target = Number(String(stat.value).replace(/,/g, ''));
    if (isNaN(target) || stat.value === '-') {
      animatedStats.value[i] = stat.value;
      return;
    }
    const start = performance.now();
    const duration = 600;
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      animatedStats.value[i] = current >= 1000 ? current.toLocaleString() : String(current);
      if (progress < 1) requestAnimationFrame(animate);
      else animatedStats.value[i] = stat.value;
    };
    requestAnimationFrame(animate);
  });
}, { deep: true });


async function fetchAllProvinceStats() {
  try {
    const response = await fetch(provinceStatsAllEndpoint, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error();
    const data = await response.json();
    // data is an array of province objects with id and stats
    data.forEach(province => {
      statsCache.value.set(province.id, province.stats ?? {});
    });
    return data;
  } catch {
    throw new Error('Failed to fetch all stats');
  }
}

async function preloadAllStats() {
  loadingProvinceStats.value = true;
  loadingProvinceId.value = selectedProvinceId.value;
  loadingError.value = '';
  try {
    await fetchAllProvinceStats();
    if (statsCache.value.has(selectedProvinceId.value)) {
      selectedProvinceStats.value = statsCache.value.get(selectedProvinceId.value);
    }
  } catch {
    loadingError.value = 'Unable to load province statistics.';
  }
  loadingProvinceId.value = '';
  loadingProvinceStats.value = false;
}

function selectProvince(id) {
  if (id === selectedProvinceId.value) return;
  hasInteracted.value = true;
  selectedProvinceId.value = id;
  loadingError.value = '';
  if (statsCache.value.has(id)) {
    selectedProvinceStats.value = statsCache.value.get(id);
  } else {
    loadingError.value = `No stats available for ${id}.`;
  }
}

function onSelectProvinceFromMap(provinceId) {
  hasInteracted.value = true;
  selectProvince(provinceId);
}

function handleProvinceNavigation(event, currentIndex) {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;
  event.preventDefault();
  const total = provinces.value.length;
  let nextIndex = currentIndex;
  if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % total;
  if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + total) % total;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = total - 1;
  const nextProvince = provinces.value[nextIndex];
  if (nextProvince) selectProvince(nextProvince.id);
}

// Scroll entrance
const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(async () => {
  await preloadAllStats();
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section
    id="coverage"
    ref="sectionRef"
    class="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div
        class="md:flex md:items-end justify-between mb-8 lg:mb-12 transition-all duration-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <div class="md:w-1/2">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full border border-red-100">
            <TrendingUp class="w-3.5 h-3.5 text-red-600" />
            <span class="font-semibold text-red-700 uppercase tracking-wide text-xs">{{ badgeText }}</span>
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mt-3 leading-tight whitespace-pre-line">{{ title }}</h2>
        </div>
        <div class="md:w-1/2 mt-4 md:mt-0 md:pl-8">
          <p class="text-gray-500 text-sm leading-relaxed" v-html="description"></p>
        </div>
      </div>

      <!-- Province pills (tabs) -->
      <div
        role="tablist"
        aria-label="Province coverage filters"
        class="flex flex-nowrap md:flex-wrap gap-2 mb-6 overflow-x-auto pb-2 transition-all duration-700 delay-100"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <button
          v-for="(province, index) in provinces"
          :key="province.id"
          role="tab"
          :aria-selected="selectedProvinceId === province.id"
          :aria-pressed="selectedProvinceId === province.id"
          :tabindex="selectedProvinceId === province.id ? 0 : -1"
          @click="selectProvince(province.id)"
          @keydown="handleProvinceNavigation($event, index)"
          class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap"
          :class="[
            selectedProvinceId === province.id
              ? 'bg-red-600 text-white shadow-md shadow-red-200 scale-105'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600 hover:shadow-sm',
            loadingProvinceId === province.id ? 'opacity-75 cursor-wait' : 'cursor-pointer'
          ]"
        >
          {{ province.display }}
        </button>
      </div>

      <!-- Glassmorphism side‑by‑side card (stats left, map right) -->
      <div
        class="flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-2xl border border-white/50 transition-all duration-700 delay-200"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <!-- Stats panel (40% width) - keeps glass background -->
        <div class="lg:w-2/5 bg-white/60 backdrop-blur-sm p-5 lg:p-6 border-r border-white/40">
          <div class="flex items-center gap-2 mb-5">
            <MapPin class="w-4 h-4 text-red-500" />
            <span class="text-sm font-bold text-gray-700">{{ selectedProvince.name }}</span>
            <span
              v-if="selectedProvinceId !== 'overall'"
              class="ml-auto inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 border border-red-100"
            >
              Selected Province
            </span>
          </div>

          <p class="sr-only" aria-live="polite">{{ selectionAnnouncement }}</p>

          <div v-if="loadingProvinceStats && !statsCache.has(selectedProvinceId)" class="flex justify-center py-8" aria-live="polite">
            <RefreshCw class="w-5 h-5 animate-spin text-red-500" />
          </div>
          <div v-else-if="loadingProvinceId === selectedProvinceId" class="rounded-xl border border-red-100 bg-red-50/50 px-3 py-2 text-xs text-red-700 mb-4 flex items-center gap-2" aria-live="polite">
            <RefreshCw class="w-3.5 h-3.5 animate-spin" />
            Updating statistics for {{ selectedProvince.name }}...
          </div>
          <div v-else-if="loadingError" class="text-center py-6 text-red-500 text-sm">
            {{ loadingError }}
            <button @click="preloadAllStats" class="block mx-auto mt-2 text-red-600 underline">Retry</button>
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="(stat, idx) in coverageStats"
              :key="idx"
              class="flex items-start gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors group"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50 group-hover:bg-red-100 transition-colors">
                <component :is="stat.icon" :class="['w-4 h-4', stat.color || 'text-red-600']" />
              </div>
              <div class="flex-1">
                <div class="text-xl font-bold text-gray-800 leading-tight tabular-nums">{{ animatedStats[idx] }}</div>
                <div class="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map panel (60% width) – NO background, fully transparent -->
        <div class="lg:w-3/5 p-4 flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Eye class="w-3.5 h-3.5 text-gray-500" />
              Interactive Map
            </h3>
            <button
              v-if="selectedProvinceId !== 'overall'"
              @click="selectProvince('overall')"
              class="text-xs flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:border-red-300 hover:text-red-600 transition"
            >
              <RefreshCw class="w-3 h-3" /> Reset
            </button>
          </div>
          <div class="rounded-xl overflow-hidden shadow-inner border border-gray-200 h-64 sm:h-80 md:h-96">
            <NepalProvinceMapbox
              :key="selectedProvinceId"
              :selected-province-id="selectedProvinceId"
              :geo-json-url="provincesGeoJsonUrl"
              :tile-layer-url="leafletTileLayerUrl"
              :tile-attribution="leafletTileAttribution"
              @select-province="onSelectProvinceFromMap"
            />
          </div>
          <p class="text-[11px] text-gray-500 mt-3 text-center leading-relaxed">{{ helperText }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
.flex-nowrap::-webkit-scrollbar {
  height: 4px;
}
.flex-nowrap::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.flex-nowrap::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>
