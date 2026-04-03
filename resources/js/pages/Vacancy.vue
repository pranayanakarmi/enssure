<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
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

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];

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
        <Head title="Vacancies - ENSSURE" />

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

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div class="mb-6 flex justify-center">
                        <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                            <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Our Partners</span>
                        </div>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                        We work with the best Partners
                    </h2>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    <div
                        v-for="(logo, i) in partnerLogos"
                        :key="i"
                        class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors"
                    >
                        <img
                            :src="logo"
                            alt="Partner logo"
                            class="max-w-[190px] max-h-[80px] object-contain"
                        >
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 text-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                    <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Support</span>
                </div>
                <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] my-4">
                    Technical Assistance By
                </h2>
                <div class="flex justify-center">
                    <img
                        src="/enssure/assets/c3f97e1b17044bbdeedac32a3818731e2450a527.png"
                        alt="Technical Assistance By"
                        class="h-16"
                    >
                </div>
            </div>
        </section>

        <section class="relative py-20 h-96 overflow-hidden">
            <img
                src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png"
                alt=""
                class="absolute inset-0 w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-black/40" />
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center">
                <div class="max-w-2xl mx-auto text-white">
                    <span class="uppercase text-[#B91C1C]">JOIN US</span>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight mb-8">
                        Build Skills, Build Futures.
                        <span class="text-[#B91C1C]">Support sustainable</span> employment today.
                    </h2>
                    <Link
                        href="/contact"
                        class="inline-block uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Contact us
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
