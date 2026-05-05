<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import JoinUsCtaSection from '@/components/guest/JoinUsCtaSection.vue';
import PageHero from '@/components/guest/PageHero.vue';
import TechnicalAssistanceSection from '@/components/guest/TechnicalAssistanceSection.vue';
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

const activeTab = ref('executive');

const heroTitle = computed(() => props.teamContent?.title || 'Our Team');
const heroImageUrl = computed(() => props.teamContent?.banner_image_url || null);
const introDescription = computed(() => props.teamContent?.description
    || 'Meet our dedicated team of experts, committed to delivering innovative solutions and exceptional service to drive your success.');
</script>

<template>
    <GuestLayout>
        <Head title="Our Team - ENSSURE">
            <meta
                name="description"
                content="Meet the ENSSURE team — executive committee members and staff dedicated to supporting vocational training and sustainable employment across Nepal."
            />
        </Head>

        <PageHero :title="heroTitle" :hero-image-url="heroImageUrl" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-10">
                    <h2 class="text-lg font-medium text-gray-800 max-w-2xl mx-auto leading-relaxed">
                        {{ introDescription }}
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

                <TeamMembersTable
                    v-show="activeTab === 'executive'"
                    :members="executiveMembers"
                    show-location-column
                    empty-message="No executive committee members listed yet."
                />
                <TeamMembersTable
                    v-show="activeTab === 'staff'"
                    :members="staffMembers"
                    show-location-column
                    empty-message="No staff members listed yet."
                />
            </div>
        </section>

        <TechnicalAssistanceSection />
        <JoinUsCtaSection />
    </GuestLayout>
</template>
