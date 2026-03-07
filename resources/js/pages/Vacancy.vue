<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { X, Upload } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';

const showApplyModal = ref(false);
const modalVacancyTitle = ref('');

const vacancies = [
    { title: 'Vacancy announcement for Project manager', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida ex ac felis sodales mattis. Duis fringilla fringilla accumsan. Maecenas placerat at mi sit amet pulvinar.', date: '3 July 2024' },
    { title: 'Vacancy announcement for Project manager', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida ex ac felis sodales mattis...', date: '3 July 2024' },
    { title: 'Vacancy announcement for Project manager', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida ex ac felis sodales mattis...', date: '3 July 2024' },
    { title: 'Vacancy announcement for Project manager', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida ex ac felis sodales mattis...', date: '3 July 2024' },
    { title: 'Vacancy announcement for Project manager', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida ex ac felis sodales mattis...', date: '3 July 2024' },
    { title: 'Vacancy announcement for Project manager', excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida ex ac felis sodales mattis...', date: '3 July 2024' },
];

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];

function openApplyModal(title) {
    modalVacancyTitle.value = title;
    showApplyModal.value = true;
}

function closeApplyModal() {
    showApplyModal.value = false;
}
</script>

<template>
    <GuestLayout>
        <Head title="Vacancies - ENSSURE" />

        <PageHero title="Vacancies" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        v-for="(vacancy, i) in vacancies"
                        :key="i"
                        class="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col"
                    >
                        <div class="p-6 pb-4">
                            <h2 class="text-xl font-bold text-gray-900 mb-3">
                                {{ vacancy.title }}
                            </h2>
                            <p class="text-gray-600 text-sm leading-relaxed mb-6">
                                {{ vacancy.excerpt }}
                            </p>
                            <button
                                type="button"
                                class="text-red-600 font-bold text-xs tracking-widest uppercase hover:underline"
                                @click="openApplyModal(vacancy.title)"
                            >
                                Apply
                            </button>
                        </div>
                        <div class="mt-auto border-t border-gray-100 px-6 py-3">
                            <span class="text-[10px] font-bold text-gray-900 uppercase">{{ vacancy.date }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Teleport to="body">
            <div
                v-show="showApplyModal"
                class="fixed inset-0 z-[100]"
            >
                <div
                    class="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                    @click="closeApplyModal"
                />
                <div class="absolute inset-0 flex items-center justify-center p-4">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
                        <button
                            type="button"
                            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10 p-2"
                            aria-label="Close"
                            @click="closeApplyModal"
                        >
                            <X class="w-5 h-5" />
                        </button>
                        <div class="p-6 pb-0">
                            <h2 class="text-2xl font-bold text-gray-900">Apply for Position</h2>
                            <p class="text-sm text-[#B91C1C] font-medium mt-1">
                                {{ modalVacancyTitle }}
                            </p>
                        </div>
                        <form class="p-6 space-y-4" @submit.prevent>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name <span class="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    required
                                    class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number <span class="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    required
                                    class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Cover Letter</label>
                                <textarea
                                    rows="4"
                                    class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all resize-none"
                                    placeholder="Tell us why you're a good fit for this role..."
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">Upload Resume/CV <span class="text-red-500">*</span></label>
                                <div class="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#B91C1C]/40 transition-colors cursor-pointer">
                                    <Upload class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p class="text-sm text-gray-500">Click to upload or drag and drop</p>
                                    <p class="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                                </div>
                            </div>
                            <div class="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    class="flex-1 py-3 px-6 border border-gray-200 rounded-lg text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                    @click="closeApplyModal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    class="flex-1 py-3 px-6 bg-[#B91C1C] rounded-lg text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#991b1b] transition-colors"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Teleport>

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
                        <img :src="logo" alt="Partner logo" class="max-w-[190px] max-h-[80px] object-contain" />
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
                    <img src="/enssure/assets/c3f97e1b17044bbdeedac32a3818731e2450a527.png" alt="Technical Assistance By" class="h-16" />
                </div>
            </div>
        </section>

        <section class="relative py-20 h-96 overflow-hidden">
            <img src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40" />
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center">
                <div class="max-w-2xl mx-auto text-white">
                    <span class="uppercase text-[#B91C1C]">JOIN US</span>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight mb-8">
                        Build Skills, Build Futures.
                        <span class="text-[#B91C1C]">Support sustainable</span> employment today.
                    </h2>
                    <Link href="/contact" class="inline-block uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors">
                        Contact us
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
