<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Facebook, Twitter } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';

const activeTab = ref('executive');

const executiveMembers = [
    { name: 'Gokarna Rupaicheti', role: 'Chairperson' },
    { name: 'Dikpal Khattri', role: 'Vice Chair Person' },
    { name: 'Dikpal Khattri', role: 'Vice Chair Person' },
    { name: 'Dikpal Khattri', role: 'Vice Chair Person' },
];

const staffMembers = [
    { name: 'Ram Sharma', role: 'Project Manager' },
    { name: 'Sita Thapa', role: 'Training Coordinator' },
    { name: 'Binod Adhikari', role: 'M&E Officer' },
    { name: 'Anita Gurung', role: 'Finance Officer' },
];

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];
</script>

<template>
    <GuestLayout>
        <Head title="Our Team - ENSSURE" />

        <PageHero title="Our Team" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10">
                    <h2 class="text-lg font-medium text-gray-800 max-w-2xl mx-auto leading-relaxed">
                        Meet our dedicated team of experts, committed to delivering innovative solutions and exceptional service to drive your success.
                    </h2>
                    <div class="flex justify-center items-center space-x-6 mt-8 border-b border-gray-100">
                        <button
                            type="button"
                            :class="[
                                'pb-3 px-2 text-sm cursor-pointer transition-colors border-b-2',
                                activeTab === 'executive'
                                    ? 'text-red-600 border-red-600 font-bold'
                                    : 'text-gray-500 hover:text-gray-800 font-medium border-transparent',
                            ]"
                            @click="activeTab = 'executive'"
                        >
                            Executive Committee
                        </button>
                        <button
                            type="button"
                            :class="[
                                'pb-3 px-2 text-sm cursor-pointer transition-colors border-b-2',
                                activeTab === 'staff'
                                    ? 'text-red-600 border-red-600 font-bold'
                                    : 'text-gray-500 hover:text-gray-800 font-medium border-transparent',
                            ]"
                            @click="activeTab = 'staff'"
                        >
                            Staff
                        </button>
                    </div>
                </div>

                <div
                    v-show="activeTab === 'executive'"
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    <div
                        v-for="(member, i) in executiveMembers"
                        :key="`exec-${i}`"
                        class="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center shadow-sm"
                    >
                        <div class="w-32 h-32 bg-gray-300 rounded-full mb-6" />
                        <h3 class="text-[15px] font-bold text-gray-900 leading-tight">
                            {{ member.name }}
                        </h3>
                        <p class="text-xs text-gray-500 mt-1 mb-4 font-medium">
                            {{ member.role }}
                        </p>
                        <div class="flex space-x-4 text-blue-600">
                            <a href="#" class="hover:opacity-80" aria-label="Facebook"><Facebook class="w-4 h-4" /></a>
                            <a href="#" class="text-black hover:opacity-80" aria-label="X"><Twitter class="w-4 h-4" /></a>
                        </div>
                    </div>
                </div>

                <div
                    v-show="activeTab === 'staff'"
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    <div
                        v-for="(member, i) in staffMembers"
                        :key="`staff-${i}`"
                        class="bg-white border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center shadow-sm"
                    >
                        <div class="w-32 h-32 bg-gray-300 rounded-full mb-6" />
                        <h3 class="text-[15px] font-bold text-gray-900 leading-tight">
                            {{ member.name }}
                        </h3>
                        <p class="text-xs text-gray-500 mt-1 mb-4 font-medium">
                            {{ member.role }}
                        </p>
                        <div class="flex space-x-4 text-blue-600">
                            <a href="#" class="hover:opacity-80" aria-label="Facebook"><Facebook class="w-4 h-4" /></a>
                            <a href="#" class="text-black hover:opacity-80" aria-label="X"><Twitter class="w-4 h-4" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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
