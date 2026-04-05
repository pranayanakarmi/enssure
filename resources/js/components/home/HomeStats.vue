<!-- <script setup>
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import { computed } from 'vue';

const fallbackBadge = 'Our Reach';
const fallbackTitle = 'Our Impact & Milestones';
const fallbackDescription =
    'From the initial spark of a career choice to the final certification of trained professionals, our milestones represent a commitment to technical excellence and workforce diversity. By integrating hands-on apprenticeship with rigorous on-the-job training, we have successfully bridged the skills gap and placed expert-ready technicians into the modern industrial sector.';

const fallbackStats = [
    { value: '2500', suffix: '+', label: 'Apprenticeship', image: '/enssure/assets/bc3db984eb1022dac4588891e81728e4bf3a4ffe.png' },
    { value: '65', suffix: '%', label: 'Impact on Career Choice', image: '/enssure/assets/53321d22ed1437b7d56b75c96ad4fd3b0515850b.png' },
    { value: '4,687', suffix: '+', label: 'Workers trained', image: '/enssure/assets/26cd438b1a03b2499d51d0b55b38d0159b66a4a0.png' },
    { value: '4420', suffix: '+', label: 'Training with OTJ', image: '/enssure/assets/f298fc73a7e26389ca46ebbe7e8ad2941f22bc80.png' },
];

const props = defineProps({
    reachSection: {
        type: Object,
        default: null,
    },
});

const stats = computed(() => {
    const items = props.reachSection?.items;
    if (!items?.length) {
        return fallbackStats;
    }
    return items.map((item) => ({
        value: item.value ?? '',
        suffix: item.suffix ?? '',
        label: item.label ?? '',
        image: item.image_url ?? item.image ?? '',
        link_url: item.link_url ?? null,
    }));
});
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
                            {{ reachSection?.badge_text ?? fallbackBadge }}
                        </span>
                    </div>
                    <h2
                        class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4"
                    >
                        {{ reachSection?.title ?? fallbackTitle }}
                    </h2>
                </div>
                <div class="md:w-4/6 mt-10">
                    <div
                        v-if="reachSection?.description"
                        class="leading-relaxed text-gray-700 prose prose-sm max-w-none"
                        v-html="reachSection.description"
                    />
                    <p
                        v-else
                        class="leading-relaxed text-gray-700"
                    >
                        {{ fallbackDescription }}
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
                            v-if="stat.image"
                            :src="stat.image"
                            :alt="stat.label"
                            class="w-32 h-32 object-contain"
                            loading="lazy"
                        />
                        <div
                            v-else
                            class="w-32 h-32 flex items-center justify-center rounded bg-gray-100 text-gray-400 text-4xl font-medium"
                        >
                            {{ stat.value }}
                        </div>
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
                        <Link
                            v-if="stat.link_url"
                            :href="stat.link_url"
                            class="group w-10 h-6 flex items-center justify-center border border-[#B91C1C] rounded-full hover:bg-[#B91C1C] hover:text-white transition-colors duration-300 cursor-pointer"
                            :target="stat.link_url.startsWith('http') ? '_blank' : undefined"
                            :rel="stat.link_url.startsWith('http') ? 'noopener noreferrer' : undefined"
                        >
                            <ArrowRight
                                class="w-4 h-4 text-[#B91C1C] group-hover:text-white"
                            />
                        </Link>
                        <div
                            v-else
                            class="group w-10 h-6 flex items-center justify-center border border-[#B91C1C] rounded-full transition-colors duration-300"
                        >
                            <ArrowRight
                                class="w-4 h-4 text-[#B91C1C]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';

// ── Fallbacks ─────────────────────────────────────────────────────────────────
const fallbackBadge = 'Our Reach';
const fallbackTitle = 'Our Impact & Milestones';
const fallbackDescription =
    'From the initial spark of a career choice to the final certification of trained professionals, our milestones represent a commitment to technical excellence and workforce diversity. By integrating hands-on apprenticeship with rigorous on-the-job training, we have successfully bridged the skills gap and placed expert-ready technicians into the modern industrial sector.';

const fallbackStats = [
    { value: '2500', suffix: '+', label: 'Apprenticeship', image: '/enssure/assets/bc3db984eb1022dac4588891e81728e4bf3a4ffe.png' },
    { value: '65',   suffix: '%', label: 'Impact on Career Choice', image: '/enssure/assets/53321d22ed1437b7d56b75c96ad4fd3b0515850b.png' },
    { value: '4687', suffix: '+', label: 'Workers Trained', image: '/enssure/assets/26cd438b1a03b2499d51d0b55b38d0159b66a4a0.png' },
    { value: '4420', suffix: '+', label: 'Training with OTJ', image: '/enssure/assets/f298fc73a7e26389ca46ebbe7e8ad2941f22bc80.png' },
];

const props = defineProps({
    reachSection: {
        type: Object,
        default: null,
    },
});

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = computed(() => {
    const items = props.reachSection?.items;
    if (!items?.length) return fallbackStats;
    return items.map((item) => ({
        value:    String(item.value ?? '').replace(/,/g, ''), // strip commas for counter
        suffix:   item.suffix  ?? '',
        label:    item.label   ?? '',
        image:    item.image_url ?? item.image ?? '',
        link_url: item.link_url ?? null,
    }));
});

// ── Number counter animation ──────────────────────────────────────────────────
const DURATION = 2000; // ms

/** Parse a raw string value to a number (strips commas, handles non-numeric) */
function parseValue(raw) {
    const n = parseFloat(String(raw).replace(/,/g, ''));
    return isNaN(n) ? null : n;
}

/** Format a number the same way the original value was formatted */
function formatNumber(n) {
    return n >= 1000 ? n.toLocaleString() : String(n);
}

const displayValues = ref(stats.value.map(() => '0'));
const sectionRef    = ref(null);
const hasAnimated   = ref(false);

function animateCounters() {
    if (hasAnimated.value) return;
    hasAnimated.value = true;

    stats.value.forEach((stat, i) => {
        const target = parseValue(stat.value);
        if (target === null) {
            displayValues.value[i] = stat.value;
            return;
        }

        const isFloat   = target % 1 !== 0;
        const decimals  = isFloat ? (String(stat.value).split('.')[1]?.length ?? 1) : 0;
        const start     = performance.now();

        function tick(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / DURATION, 1);
            // ease-out cubic
            const eased    = 1 - Math.pow(1 - progress, 3);
            const current  = eased * target;

            displayValues.value[i] = isFloat
                ? current.toFixed(decimals)
                : formatNumber(Math.floor(current));

            if (progress < 1) requestAnimationFrame(tick);
            else displayValues.value[i] = isFloat ? target.toFixed(decimals) : formatNumber(target);
        }

        requestAnimationFrame(tick);
    });
}

// ── Intersection Observer ─────────────────────────────────────────────────────
let observer = null;

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) animateCounters(); },
        { threshold: 0.25 },
    );
    if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
    <section
        ref="sectionRef"
        class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Header row -->
            <div class="md:flex">
                <div class="md:w-2/6">
                    <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">
                            {{ reachSection?.badge_text ?? fallbackBadge }}
                        </span>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4">
                        {{ reachSection?.title ?? fallbackTitle }}
                    </h2>
                </div>
                <div class="md:w-4/6 mt-10 md:mt-0 md:pl-10 flex items-center">
                    <div
                        v-if="reachSection?.description"
                        class="leading-relaxed text-gray-700 prose prose-sm max-w-none"
                        v-html="reachSection.description"
                    />
                    <p v-else class="leading-relaxed text-gray-700">
                        {{ fallbackDescription }}
                    </p>
                </div>
            </div>

            <!-- Stat cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <div
                    v-for="(stat, i) in stats"
                    :key="i"
                    class="stat-card group border border-[#D9D9D9] rounded-xl bg-white overflow-hidden"
                    :style="{ animationDelay: `${i * 100}ms` }"
                >
                    <div class="flex flex-col items-center gap-4 p-6">

                        <!-- Icon image -->
                        <div class="w-32 h-32 flex items-center justify-center">
                            <img
                                v-if="stat.image"
                                :src="stat.image"
                                :alt="stat.label"
                                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div
                                v-else
                                class="w-full h-full flex items-center justify-center rounded-full bg-red-50 text-[#B91C1C] text-4xl font-semibold"
                            >
                                {{ stat.suffix }}
                            </div>
                        </div>

                        <!-- Number + label -->
                        <div class="text-center">
                            <div class="flex items-start justify-center gap-0.5 mb-1">
                                <span class="text-5xl font-semibold text-[#101010] tracking-tight tabular-nums">
                                    {{ displayValues[i] }}
                                </span>
                                <span class="text-3xl font-semibold text-[#B91C1C] mt-1">
                                    {{ stat.suffix }}
                                </span>
                            </div>
                            <p class="text-gray-500 text-sm leading-relaxed mt-1">
                                {{ stat.label }}
                            </p>
                        </div>

                        <!-- CTA arrow -->
                        <Link
                            v-if="stat.link_url"
                            :href="stat.link_url"
                            :target="stat.link_url.startsWith('http') ? '_blank' : undefined"
                            :rel="stat.link_url.startsWith('http') ? 'noopener noreferrer' : undefined"
                            :aria-label="`Learn more about ${stat.label}`"
                            class="w-10 h-10 flex items-center justify-center border border-[#B91C1C] rounded-full hover:bg-[#B91C1C] transition-colors duration-300 group/arrow"
                        >
                            <ArrowRight class="w-4 h-4 text-[#B91C1C] group-hover/arrow:text-white transition-colors duration-300" />
                        </Link>

                        <!-- Non-linked placeholder arrow — kept subtle, non-interactive -->
                        <div
                            v-else
                            aria-hidden="true"
                            class="w-10 h-10 flex items-center justify-center border border-[#D9D9D9] rounded-full opacity-40"
                        >
                            <ArrowRight class="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <!-- Bottom accent bar on hover -->
                    <div class="h-0.5 w-0 bg-[#B91C1C] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
/* Card entrance animation */
.stat-card {
    opacity: 0;
    animation: card-in 0.5s ease forwards;
}

@keyframes card-in {
    from {
        opacity: 0;
        transform: translateY(24px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Subtle lift + shadow on hover */
.stat-card:hover {
    box-shadow: 0 12px 32px -8px rgba(185, 28, 28, 0.15), 0 4px 12px rgba(0,0,0,0.06);
    transform: translateY(-4px);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

/* Smooth transition reset */
.stat-card {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

/* Tabular numbers for clean counter animation */
.tabular-nums {
    font-variant-numeric: tabular-nums;
}
</style>
