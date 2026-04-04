<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ArrowLeft, Calendar, FileDown } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import VacancyApplyModal from '@/components/guest/VacancyApplyModal.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    vacancy: {
        type: Object,
        required: true,
    },
});

const page = usePage();
const flashSuccess = computed(() => page.props.flash?.success);

const showApplyModal = ref(false);

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

const metaLine = computed(() => {
    const parts = [];
    if (props.vacancy.location) {
        parts.push(props.vacancy.location);
    }
    if (props.vacancy.job_type) {
        parts.push(formatJobType(props.vacancy.job_type));
    }
    if (props.vacancy.number_of_positions > 1) {
        parts.push(`${props.vacancy.number_of_positions} positions`);
    }
    return parts.join(' · ');
});
</script>

<template>
    <GuestLayout>
        <Head :title="`${vacancy.title} - Vacancies - ENSSURE`" />

        <section
            v-if="flashSuccess"
            class="bg-green-50 border-b border-green-100"
        >
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p class="text-sm text-green-800 text-center">
                    {{ flashSuccess }}
                </p>
            </div>
        </section>

        <section class="py-12 lg:py-16 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/vacancy"
                    class="inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C] hover:underline mb-8"
                >
                    <ArrowLeft class="w-4 h-4" />
                    Back to vacancies
                </Link>

                <header class="mb-8">
                    <h1 class="text-3xl lg:text-[2.5rem] font-bold text-[#101010] leading-tight tracking-tight">
                        {{ vacancy.title }}
                    </h1>
                    <p
                        v-if="metaLine"
                        class="mt-3 text-sm text-gray-600"
                    >
                        {{ metaLine }}
                    </p>
                    <div
                        class="mt-4 flex flex-wrap gap-4 text-xs font-bold text-gray-900 uppercase tracking-wide"
                    >
                        <span
                            v-if="vacancy.published_at"
                            class="inline-flex items-center gap-1.5"
                        >
                            <Calendar class="w-3.5 h-3.5 text-gray-500" />
                            Posted {{ vacancy.published_at }}
                        </span>
                        <span v-if="vacancy.application_deadline">
                            Apply by {{ vacancy.application_deadline }}
                        </span>
                    </div>
                </header>

                <div
                    v-if="vacancy.tor_file_url"
                    class="mb-8"
                >
                    <a
                        :href="vacancy.tor_file_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors"
                    >
                        <FileDown class="w-4 h-4" />
                        Download terms of reference
                    </a>
                </div>

                <div
                    v-if="vacancy.job_description_html"
                    class="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed [&_table]:text-sm [&_td]:border [&_td]:border-gray-200 [&_th]:border [&_th]:border-gray-200 [&_table]:border-collapse"
                    v-html="vacancy.job_description_html"
                />

                <div
                    v-if="vacancy.requirements_html"
                    class="mt-10"
                >
                    <h2 class="text-lg font-bold text-gray-900 mb-3">
                        Requirements
                    </h2>
                    <div
                        class="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed [&_table]:text-sm [&_td]:border [&_td]:border-gray-200 [&_th]:border [&_th]:border-gray-200 [&_table]:border-collapse"
                        v-html="vacancy.requirements_html"
                    />
                </div>

                <div
                    v-if="vacancy.application_instructions_html"
                    class="mt-10"
                >
                    <h2 class="text-lg font-bold text-gray-900 mb-3">
                        How to apply
                    </h2>
                    <div
                        class="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed [&_table]:text-sm [&_td]:border [&_td]:border-gray-200 [&_th]:border [&_th]:border-gray-200 [&_table]:border-collapse"
                        v-html="vacancy.application_instructions_html"
                    />
                </div>

                <div
                    v-if="vacancy.related_documents?.length"
                    class="mt-10"
                >
                    <h2 class="text-lg font-bold text-gray-900 mb-3">
                        Related documents
                    </h2>
                    <div class="flex flex-col gap-2">
                        <a
                            v-for="document in vacancy.related_documents"
                            :key="document.id"
                            :href="document.file_url"
                            :download="document.file_name || 'related-document.pdf'"
                            class="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors"
                        >
                            <FileDown class="w-4 h-4" />
                            Download {{ document.file_name }}
                        </a>
                    </div>
                </div>

                <div class="mt-10 flex flex-wrap gap-4">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-lg bg-[#B91C1C] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#991b1b] transition-colors"
                        @click="showApplyModal = true"
                    >
                        Apply now
                    </button>
                    <Link
                        href="/vacancy"
                        class="inline-flex items-center justify-center rounded-lg border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        All vacancies
                    </Link>
                </div>
            </div>
        </section>

        <VacancyApplyModal
            v-model="showApplyModal"
            :vacancy-title="vacancy.title"
            :vacancy-slug="vacancy.slug"
        />
    </GuestLayout>
</template>
