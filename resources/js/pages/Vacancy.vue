<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import TechnicalAssistanceSection from '@/components/guest/TechnicalAssistanceSection.vue';
import VacancyApplyModal from '@/components/guest/VacancyApplyModal.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

defineProps({
    vacancies: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const flashSuccess = computed(() => page.props.flash?.success);

const showApplyModal = ref(false);
const modalVacancyTitle = ref('');
const modalVacancySlug = ref('');

function openApplyModal(vacancy) {
    modalVacancyTitle.value = vacancy.title;
    modalVacancySlug.value = vacancy.slug;
    showApplyModal.value = true;
}

const jobTypeLabels = {
    full_time: 'Full time',
    part_time: 'Part time',
    contract: 'Contract',
};

function formatJobType(value) {
    if (!value) {
        return '';
    }
    return jobTypeLabels[value] ?? value;
}
</script>

<template>
    <GuestLayout>
        <Head title="Vacancies - ENSSURE">
            <meta
                name="description"
                content="Explore current job openings and career opportunities with ENSSURE. Apply for positions supporting vocational training and sustainable employment in Nepal."
            />
        </Head>

        <PageHero title="Vacancies" />

        <section
            v-if="flashSuccess"
            class="bg-green-50 border-b border-green-100"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p class="text-sm text-green-800 text-center">
                    {{ flashSuccess }}
                </p>
            </div>
        </section>

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    v-if="!(vacancies || []).length"
                    class="text-center py-16 text-gray-600 text-sm"
                >
                    There are no open vacancies at the moment. Please check back later.
                </div>
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div
                        v-for="vacancy in vacancies"
                        :key="vacancy.id"
                        class="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col"
                    >
                        <div class="p-6 pb-4">
                            <h2 class="text-xl font-bold text-gray-900 mb-3">
                                <Link
                                    :href="`/vacancy/${vacancy.slug}`"
                                    class="hover:text-[#B91C1C] transition-colors"
                                >
                                    {{ vacancy.title }}
                                </Link>
                            </h2>
                            <p
                                v-if="vacancy.location || vacancy.job_type"
                                class="text-xs text-gray-500 mb-2"
                            >
                                <span v-if="vacancy.location">{{ vacancy.location }}</span>
                                <span v-if="vacancy.location && vacancy.job_type"> · </span>
                                <span v-if="vacancy.job_type">{{ formatJobType(vacancy.job_type) }}</span>
                            </p>
                            <p class="text-gray-600 text-sm leading-relaxed mb-6">
                                {{ vacancy.excerpt || 'View details and apply using the links below.' }}
                            </p>
                            <div class="flex flex-wrap items-center gap-4">
                                <Link
                                    :href="`/vacancy/${vacancy.slug}`"
                                    class="text-sm font-semibold text-gray-800 underline underline-offset-2 hover:text-[#B91C1C]"
                                >
                                    View details
                                </Link>
                                <button
                                    type="button"
                                    class="text-red-600 font-bold text-xs tracking-widest uppercase hover:underline"
                                    @click="openApplyModal(vacancy)"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div class="mt-auto border-t border-gray-100 px-6 py-3 flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-bold text-gray-900 uppercase">
                            <span v-if="vacancy.date">{{ vacancy.date }}</span>
                            <span v-if="vacancy.date && vacancy.application_deadline">·</span>
                            <span v-if="vacancy.application_deadline">Deadline {{ vacancy.application_deadline }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <VacancyApplyModal
            v-model="showApplyModal"
            :vacancy-title="modalVacancyTitle"
            :vacancy-slug="modalVacancySlug"
        />

        <TechnicalAssistanceSection />
    </GuestLayout>
</template>
