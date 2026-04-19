<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import TeamMembersTable from '@/components/guest/TeamMembersTable.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    teamContent: {
        type: Object,
        default: () => ({ title: 'Our Team', description: null, banner_image_url: null }),
    },
    executiveMembers: {
        type: Array,
        default: () => [],
    },
    staffMembers: {
        type: Array,
        default: () => [],
    },
});

// Only staff tab is needed
const activeTab = ref('staff');

const heroTitle = computed(() => props.teamContent?.title || 'Our Team');
const heroImageUrl = computed(() => props.teamContent?.banner_image_url || null);
const introDescription = computed(() => props.teamContent?.description
    || 'Meet our dedicated team of experts, committed to delivering innovative solutions and exceptional service to drive your success.');

const executiveMembersSorted = computed(() => {
    return [...props.executiveMembers].sort((a, b) => {
        if ((a.order ?? 0) !== (b.order ?? 0)) {
            return (a.order ?? 0) - (b.order ?? 0);
        }
        return (a.name || '').localeCompare(b.name || '');
    });
});

const staffMembersSorted = computed(() => {
    return [...props.staffMembers].sort((a, b) => {
        if ((a.order ?? 0) !== (b.order ?? 0)) {
            return (a.order ?? 0) - (b.order ?? 0);
        }
        return (a.name || '').localeCompare(b.name || '');
    });
});

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

        <PageHero :title="heroTitle" :hero-image-url="heroImageUrl" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-extrabold text-[#B91C1C] mb-2 tracking-tight">Meet Our Team</h2>
                    <p class="text-lg text-gray-700 max-w-2xl mx-auto mb-2">We are proud to introduce our dedicated staff, working together to deliver excellence and innovation.</p>
                    <!-- <p class="text-base text-gray-500 max-w-2xl mx-auto">{{ introDescription }}</p> -->
                </div>
                <div class="rounded-2xl bg-gradient-to-br from-[#fff] to-[#f8fafc] p-6 shadow-md border border-[#e5e7eb]">
                    <TeamMembersTable
                        :members="staffMembersSorted"
                        show-location-column
                        empty-message="No staff members listed yet."
                    />
                </div>
            </div>
        </section>

        <!-- <section class="py-20 text-center">
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
        </section> -->
    </GuestLayout>
</template>
