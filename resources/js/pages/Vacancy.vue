<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { MapPin, Clock, Calendar, Briefcase, CheckCircle } from 'lucide-vue-next';

defineProps({
    vacancies: {
        type: Array,
        default: () => [],
    },
});

const page         = usePage();
const flashSuccess = computed(() => page.props.flash?.success);

const jobTypeLabels = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    contract:  'Contract',
};

function formatJobType(value) {
    if (!value) return null;
    return jobTypeLabels[value] ?? value;
}

// Deadline urgency color
function deadlineClass(deadline) {
    if (!deadline) return 'text-gray-500';
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (days <= 7)  return 'text-red-600 font-semibold';
    if (days <= 14) return 'text-orange-500 font-semibold';
    return 'text-gray-500';
}

function deadlineLabel(deadline) {
    if (!deadline) return null;
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0)  return 'Expired';
    if (days === 0) return 'Closes today';
    if (days === 1) return 'Closes tomorrow';
    if (days <= 7)  return `${days} days left`;
    return `Deadline: ${deadline}`;
}
</script>

<template>
    <GuestLayout>
        <Head title="Vacancies - ENSSURE" />

        <PageHero title="Vacancies" />

        <!-- ── Flash success ── -->
        <Transition name="flash-fade">
            <section
                v-if="flashSuccess"
                class="bg-green-50 border-b border-green-200"
            >
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-2">
                    <CheckCircle class="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p class="text-sm text-green-800">{{ flashSuccess }}</p>
                </div>
            </section>
        </Transition>

        <!-- ── Vacancies list ── -->
        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Section label -->
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <div class="inline-flex items-center px-4 py-1.5 bg-[rgba(235,31,39,0.1)] rounded-full mb-3">
                            <span class="text-xs font-semibold text-[#B91C1C] uppercase tracking-wide">
                                Open Positions
                            </span>
                        </div>
                        <h2 class="text-3xl font-semibold text-[#101010] leading-tight">
                            Join Our Team
                        </h2>
                    </div>
                    <div
                        v-if="vacancies?.length"
                        class="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2"
                    >
                        <Briefcase class="w-4 h-4 text-[#B91C1C]" />
                        <span class="text-sm font-medium text-gray-700">
                            {{ vacancies.length }} open {{ vacancies.length === 1 ? 'position' : 'positions' }}
                        </span>
                    </div>
                </div>

                <!-- ── Empty state ── -->
                <div
                    v-if="!(vacancies || []).length"
                    class="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200"
                >
                    <Briefcase class="w-12 h-12 text-gray-300" />
                    <h3 class="text-lg font-semibold text-gray-500">No open vacancies</h3>
                    <p class="text-sm text-gray-400 text-center max-w-sm">
                        There are no open positions at the moment. Please check back later.
                    </p>
                </div>

                <!-- ── Vacancy cards ── -->
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div
                        v-for="vacancy in vacancies"
                        :key="vacancy.id"
                        class="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#B91C1C]/30 transition-all duration-300 flex flex-col overflow-hidden"
                    >
                        <!-- Card body -->
                        <div class="p-6 flex flex-col flex-1">

                            <!-- Job type badge -->
                            <div class="flex items-center gap-2 mb-3">
                                <span
                                    v-if="formatJobType(vacancy.job_type)"
                                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(235,31,39,0.08)] text-[#B91C1C]"
                                >
                                    {{ formatJobType(vacancy.job_type) }}
                                </span>
                            </div>

                            <!-- Title -->
                            <h2 class="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#B91C1C] transition-colors duration-300">
                                <Link :href="`/vacancy/${vacancy.slug}`">
                                    {{ vacancy.title }}
                                </Link>
                            </h2>

                            <!-- Meta: location -->
                            <div
                                v-if="vacancy.location"
                                class="flex items-center gap-1.5 text-xs text-gray-500 mb-4"
                            >
                                <MapPin class="w-3.5 h-3.5 flex-shrink-0 text-[#B91C1C]" />
                                {{ vacancy.location }}
                            </div>

                            <!-- Excerpt -->
                            <p class="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
                                {{ vacancy.excerpt || 'View details using the link below.' }}
                            </p>

                            <!-- Actions -->
                            <div class="flex flex-wrap items-center gap-3 mt-6">
                                <!-- View details only -->
                                <Link
                                    :href="`/vacancy/${vacancy.slug}`"
                                    class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#B91C1C] transition-colors duration-200 underline underline-offset-2"
                                >
                                    View details
                                </Link>
                            </div>
                        </div>

                        <!-- Card footer -->
                        <div class="border-t border-gray-100 px-6 py-3 bg-gray-50 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <!-- Posted date -->
                            <div
                                v-if="vacancy.date"
                                class="flex items-center gap-1.5 text-xs text-gray-500"
                            >
                                <Calendar class="w-3.5 h-3.5 flex-shrink-0" />
                                Posted: {{ vacancy.date }}
                            </div>

                            <!-- Deadline -->
                            <div
                                v-if="vacancy.application_deadline"
                                class="flex items-center gap-1.5 text-xs"
                                :class="deadlineClass(vacancy.application_deadline)"
                            >
                                <Clock class="w-3.5 h-3.5 flex-shrink-0" />
                                {{ deadlineLabel(vacancy.application_deadline) }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </GuestLayout>
</template>

<style scoped>
.flash-fade-enter-active,
.flash-fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.flash-fade-enter-from,
.flash-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
