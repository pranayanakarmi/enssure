<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Calendar, MapPin } from 'lucide-vue-next';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { show as eventShow } from '@/routes/events';

const props = defineProps({
    events: {
        type: Array,
        default: () => [],
    },
    upcomingEvents: {
        type: Array,
        default: () => [],
    },
    pastEvents: {
        type: Array,
        default: () => [],
    },
});

function formatDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return {
        day: d.toLocaleDateString('en-GB', { day: 'numeric' }),
        month: d.toLocaleDateString('en-GB', { month: 'short' }),
        year: d.toLocaleDateString('en-GB', { year: 'numeric' }),
    };
}

const hasUpcoming = computed(() => props.upcomingEvents && props.upcomingEvents.length > 0);
const hasPast = computed(() => props.pastEvents && props.pastEvents.length > 0);
</script>

<template>
    <GuestLayout>
        <Head title="Events &amp; Trainings - KMH-IHS Academics" />

        <PageHero title="Events &amp; Trainings" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <template v-if="hasUpcoming">
                    <div class="mb-12">
                        <div class="mb-8 flex items-center gap-4">
                            <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                                <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">Upcoming Events</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Link
                                v-for="event in upcomingEvents"
                                :key="event.id"
                                :href="eventShow(event).url"
                                class="group block border border-[#cad0d8] rounded-[20px] overflow-hidden hover:border-[#B91C1C] transition-colors"
                            >
                                <div class="p-6">
                                    <div class="flex items-start gap-4 mb-4">
                                        <div
                                            v-if="event.start_date"
                                            class="shrink-0 w-16 bg-[#B91C1C] text-white rounded-lg text-center py-2 px-1"
                                        >
                                            <div class="text-2xl font-bold leading-none">{{ formatDateShort(event.start_date)?.day }}</div>
                                            <div class="text-xs uppercase tracking-wide mt-1">{{ formatDateShort(event.start_date)?.month }}</div>
                                            <div class="text-xs">{{ formatDateShort(event.start_date)?.year }}</div>
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <span
                                                v-if="event.event_type"
                                                class="inline-block text-xs uppercase font-semibold text-[#B91C1C] tracking-wide mb-1"
                                            >
                                                {{ event.event_type }}
                                            </span>
                                            <h3 class="text-base font-semibold text-gray-900 leading-snug group-hover:text-[#B91C1C] transition-colors">
                                                {{ event.title }}
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="space-y-2 text-sm text-gray-600">
                                        <div v-if="event.venue" class="flex items-center gap-2">
                                            <MapPin class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                            <span>{{ event.venue }}</span>
                                        </div>
                                        <div v-if="event.start_date" class="flex items-center gap-2">
                                            <Calendar class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                            <span>{{ formatDate(event.start_date) }}</span>
                                        </div>
                                    </div>
                                    <div class="mt-4 flex items-center gap-2 text-sm font-medium text-black hover:text-[#B91C1C] transition-colors">
                                        View details
                                        <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </template>

                <template v-if="hasPast">
                    <div>
                        <div class="mb-8 flex items-center gap-4">
                            <div class="inline-flex items-center justify-center px-5 py-2 bg-gray-100 rounded-full">
                                <span class="font-semibold text-gray-600 uppercase tracking-wide text-sm">Past Events</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Link
                                v-for="event in pastEvents"
                                :key="event.id"
                                :href="eventShow(event).url"
                                class="group block border border-[#cad0d8] rounded-[20px] overflow-hidden hover:border-[#B91C1C] transition-colors opacity-80 hover:opacity-100"
                            >
                                <div class="p-6">
                                    <div class="flex items-start gap-4 mb-4">
                                        <div
                                            v-if="event.start_date"
                                            class="shrink-0 w-16 bg-gray-500 text-white rounded-lg text-center py-2 px-1"
                                        >
                                            <div class="text-2xl font-bold leading-none">{{ formatDateShort(event.start_date)?.day }}</div>
                                            <div class="text-xs uppercase tracking-wide mt-1">{{ formatDateShort(event.start_date)?.month }}</div>
                                            <div class="text-xs">{{ formatDateShort(event.start_date)?.year }}</div>
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <span
                                                v-if="event.event_type"
                                                class="inline-block text-xs uppercase font-semibold text-gray-500 tracking-wide mb-1"
                                            >
                                                {{ event.event_type }}
                                            </span>
                                            <h3 class="text-base font-semibold text-gray-700 leading-snug group-hover:text-[#B91C1C] transition-colors">
                                                {{ event.title }}
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="space-y-2 text-sm text-gray-500">
                                        <div v-if="event.venue" class="flex items-center gap-2">
                                            <MapPin class="w-4 h-4 shrink-0" />
                                            <span>{{ event.venue }}</span>
                                        </div>
                                        <div v-if="event.start_date" class="flex items-center gap-2">
                                            <Calendar class="w-4 h-4 shrink-0" />
                                            <span>{{ formatDate(event.start_date) }}</span>
                                        </div>
                                    </div>
                                    <div class="mt-4 flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-[#B91C1C] transition-colors">
                                        View details
                                        <ArrowRight class="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </template>

                <p
                    v-if="!hasUpcoming && !hasPast"
                    class="text-center text-gray-500 py-12"
                >
                    No events scheduled at this time.
                </p>
            </div>
        </section>
    </GuestLayout>
</template>
