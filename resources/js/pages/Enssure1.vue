<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import HomeStats from '@/components/home/HomeStats.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

// ----------------------------------------------------------------------
// Props – all dynamic, with sensible defaults for ENSSURE I
// ----------------------------------------------------------------------
const props = defineProps({
    // Hero section
    heroTitle: { type: String, default: 'ENSSURE I (2016–2022)' },
    heroImageUrl: { type: String, default: '/enssure/assets/enssure1-hero.png' },

    // Main overview section
    overviewTitle: { type: String, default: 'Laying the Foundation for Skills Development' },
    overviewBody: { type: String, default: null },
    overviewCardTitle: { type: String, default: 'First Phase\nof ENSSURE' },
    overviewImageUrl: { type: String, default: '/enssure/assets/enssure1-overview.jpg' },
    overviewBackgroundImageUrl: { type: String, default: '/enssure/assets/65b138464c2257ee992dd4572f64fbf14b41e638.png' },
    overviewCtaText: { type: String, default: 'Learn more' },
    overviewCtaUrl: { type: String, default: '#overview-details' },

    // Two‑column content section
    contentParagraph1: { type: String, default: null },
    contentParagraph2: { type: String, default: null },

    // Reach section (reused from HomeStats)
    homeReachSection: { type: Object, default: null },

    // News ticker items
    newsItems: { type: Array, default: () => [] },

    // Top stats (6 items)
    topStats: { type: Array, default: () => [] },

    // Career guidance focus data
    careerGuidance: { type: Object, default: () => ({}) },

    // Apprenticeship & skills training data
    apprenticeship: { type: Object, default: () => ({}) },

    // Workforce skill upgrading data
    workforce: { type: Object, default: () => ({}) },

    // Industry collaboration data
    industry: { type: Object, default: () => ({}) },

    // Partner logos
    partnerLogos: { type: Array, default: () => [] },

    // Technical assistance logo
    assistanceLogo: { type: String, default: '/enssure/assets/c3f97e1b17044bbdeedac32a3818731e2450a527.png' },
});

// ----------------------------------------------------------------------
// Default static data (ENSSURE I specific)
// ----------------------------------------------------------------------
const defaultTopStats = [
    { icon: 'fa-users', value: '28,500+', label: 'Youth Reached' },
    { icon: 'fa-graduation-cap', value: '1,200+', label: 'Apprentices' },
    { icon: 'fa-briefcase', value: '4,800+', label: 'OJT Enrolled' },
    { icon: 'fa-helmet-safety', value: '4,200+', label: 'Workers Trained' },
    { icon: 'fa-building', value: '750+', label: 'Companies Engaged' },
    { icon: 'fa-chalkboard-user', value: '280+', label: 'Teachers Trained' },
];

const defaultCareerGuidance = {
    totalYouthReached: 28500,
    schoolSessions: 21000,
    careerFairSessions: 7500,
    inclusionGirlsPercent: 51.2,
    inclusionDisadvantagedPercent: 68.4,
    apprenticeGuidance: 1200,
    municipalInvestmentCurrent: 'NPR 8.4M',
    municipalInvestmentPrev: 'NPR 3.6M',
    teachersTrained: 280,
    womenEducatorsPercent: 32.5,
    careerFacilitators: 12,
    localGovtPersonnel: 15,
    schools: 120,
    modelSchools: 12,
    tripartiteMous: 98,
    directPartners: 15,
};

const defaultApprenticeship = {
    dualVet: {
        enrolled: 1200,
        inTraining: 0, // completed
        graduated: 1100,
        girlsPercent: 51.2,
        disadvantagedPercent: 68.4,
    },
    ojt: {
        enrolled: 4800,
        inTraining: 0,
        graduated: 4500,
        girlsPercent: 51.2,
        disadvantagedPercent: 68.4,
    },
    skillTest: {
        passRate: 58,
        passed: 1200,
        appeared: 2070,
    },
};

const defaultWorkforce = {
    totalTrained: 4200,
    completed: 4000,
    inTraining: 200,
    disadvantagedPercent: 65.3,
    skillAreas: [
        'Electrical', 'Construction', 'Plumbing', 'Hospitality',
        'Healthcare', 'Cooking', 'Mechanics', 'ICT', 'Carpentry', 'Tailoring'
    ],
    moreCount: 23,
};

const defaultIndustry = {
    companiesEngaged: 750,
    apprenticesHosted: 1100,
    traineesHosted: 4500,
    tvetProvidersOriented: '4K+',
};

const defaultPartnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];

const defaultNewsItems = [
    'ENSSURE I concludes with 28,500 youth reached',
    'Dual‑VET model successfully piloted in 7 provinces',
    'Over 4,200 workers trained under Phase I',
    'Partnerships with 750 companies established',
];

const defaultContentP1 = "The ENSSURE I project (2016–2022) was the first phase of the Enhanced Skills for Sustainable and Rewarding Employment initiative. It focused on establishing the dual‑VET system, building institutional capacity, and piloting apprenticeship programmes across Nepal. The project laid the groundwork for the federalisation of TVET services, creating a model that could be scaled nationwide.";
const defaultContentP2 = "Key achievements include training over 4,200 workers in high‑demand trades, engaging 750+ companies as training hosts, and reaching 28,500 youth through career guidance sessions. The first phase successfully piloted dual‑VET in seven provinces, developing 33 skill standards and curricula that continue to shape Nepal's TVET sector today.";

// Computed values with fallbacks
const stats = computed(() => props.topStats.length ? props.topStats : defaultTopStats);
const career = computed(() => ({ ...defaultCareerGuidance, ...props.careerGuidance }));
const apprenticeshipData = computed(() => ({ ...defaultApprenticeship, ...props.apprenticeship }));
const workforceData = computed(() => ({ ...defaultWorkforce, ...props.workforce }));
const industryData = computed(() => ({ ...defaultIndustry, ...props.industry }));
const partnerLogosList = computed(() => props.partnerLogos.length ? props.partnerLogos : defaultPartnerLogos);
const newsList = computed(() => props.newsItems.length ? props.newsItems : defaultNewsItems);
const paragraph1 = computed(() => props.contentParagraph1 ?? defaultContentP1);
const paragraph2 = computed(() => props.contentParagraph2 ?? defaultContentP2);
</script>

<template>
    <GuestLayout>
        <Head title="ENSSURE I - ENSSURE" />

        <!-- Hero section -->
        <PageHero
            :title="heroTitle"
            :hero-image-url="heroImageUrl"
        />

        <!-- Main overview section (similar to about.vue) -->
        <section id="overview" class="py-20 lg:py-24 relative overflow-hidden">
            <div class="absolute inset-0">
                <img
                    :src="overviewBackgroundImageUrl"
                    alt=""
                    class="w-full h-full object-cover opacity-30"
                />
                <div class="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent" />
                <div class="absolute inset-0 backdrop-blur-[10px] bg-white/40" />
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div class="relative">
                        <div class="absolute -rotate-[4deg] bg-[#233D7E] rounded-[30px] w-full aspect-[507/690]" />
                        <div class="relative rounded-[30px] overflow-hidden aspect-[507/690]">
                            <img
                                :src="overviewImageUrl"
                                alt="ENSSURE I Overview"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="absolute w-80 bottom-0 right-0 bg-[#B91C1C] rounded-tl-[40px] rounded-br-[30px] p-8">
                            <h3 class="text-white text-2xl leading-tight tracking-tight whitespace-pre-line">
                                {{ overviewCardTitle }}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-8">
                            {{ overviewTitle }}
                        </h2>
                        <p
                            v-if="overviewBody"
                            class="text-xl leading-relaxed text-gray-900 mb-8"
                            v-html="overviewBody"
                        />
                        <p v-else class="text-xl leading-relaxed text-gray-900 mb-8">
                            <span>The first phase of ENSSURE (2016–2022) was a </span>
                            <span class="font-bold">bilateral project of the Government of Nepal</span>
                            <span>
                                and the Government of Switzerland. It established the foundation for Nepal's TVET transformation, piloting dual‑VET programmes, developing skill standards, and building capacity at federal, provincial, and local levels.
                            </span>
                        </p>
                        <Link
                            :href="overviewCtaUrl"
                            class="inline-flex items-center gap-2 text-gray-900 uppercase font-medium hover:gap-3 transition-all group"
                        >
                            {{ overviewCtaText }}
                            <ArrowRight class="w-5 h-4 group-hover:translate-x-1 transition-transform text-[#B91C1C]" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <!-- Two‑column content section -->
        <section id="overview-details" class="mt-10 pb-10 border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-10 leading-relaxed text-gray-700">
                <p class="whitespace-pre-line">{{ paragraph1 }}</p>
                <p>{{ paragraph2 }}</p>
            </div>
        </section>

        <!-- Reusable stats component (if reachSection data is passed) -->
        <HomeStats :reach-section="homeReachSection" />

        <!-- Top Stats Bar (6 columns) -->
        <section class="py-10 bg-white border-y border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                    <div v-for="stat in stats" :key="stat.label" class="stat-card flex flex-col items-center gap-2 py-4">
                        <div class="w-14 h-14 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center">
                            <i :class="['fa-solid', stat.icon, 'text-[#B91C1C] text-xl']"></i>
                        </div>
                        <span class="text-2xl font-semibold text-[#101010]">{{ stat.value }}</span>
                        <span class="text-xs text-[#515151] leading-tight">{{ stat.label }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Career Guidance Focus -->
        <section id="career-guidance" class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-semibold text-[#101010] mb-1">Career Guidance Focus</h2>
                <p class="text-sm text-[#515151] mb-10">School sessions, career fairs, teacher training, and capacity building</p>

                <!-- Row 1 -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <!-- Total Youth Reached -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-5">
                            <i class="fa-solid fa-users text-[#B91C1C]"></i>
                        </div>
                        <div class="text-4xl font-semibold text-[#101010] mb-1">{{ career.totalYouthReached.toLocaleString() }}</div>
                        <div class="font-medium text-[#101010] text-sm mb-1">Total Youth Reached</div>
                        <div class="text-xs text-[#515151] mb-6">Schools and career fairs combined</div>
                        <div class="grid grid-cols-2 gap-4 pt-5 border-t border-[#F0F0F0]">
                            <div>
                                <div class="text-xl font-semibold text-[#101010]">{{ career.schoolSessions.toLocaleString() }}</div>
                                <div class="text-xs text-[#515151]">School Sessions</div>
                            </div>
                            <div>
                                <div class="text-xl font-semibold text-[#101010]">{{ career.careerFairSessions.toLocaleString() }}</div>
                                <div class="text-xs text-[#515151]">Career Fair Sessions</div>
                            </div>
                        </div>
                    </div>

                    <!-- Inclusion & Equity -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-5">
                            <i class="fa-solid fa-scale-balanced text-[#B91C1C]"></i>
                        </div>
                        <div class="font-medium text-[#101010] mb-1">Inclusion &amp; Equity</div>
                        <div class="text-xs text-[#515151] mb-5">Demographic breakdown</div>
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-1.5">
                                <span class="text-[#515151]">Girls</span>
                                <span class="font-semibold text-[#101010]">{{ career.inclusionGirlsPercent }}%</span>
                            </div>
                            <div class="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                                <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: career.inclusionGirlsPercent + '%' }"></div>
                            </div>
                        </div>
                        <div class="mb-6">
                            <div class="flex justify-between text-sm mb-1.5">
                                <span class="text-[#515151]">Disadvantaged Groups</span>
                                <span class="font-semibold text-[#101010]">{{ career.inclusionDisadvantagedPercent }}%</span>
                            </div>
                            <div class="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                                <div class="h-full bg-[#233D7E] rounded-full" :style="{ width: career.inclusionDisadvantagedPercent + '%' }"></div>
                            </div>
                        </div>
                        <div class="pt-5 border-t border-[#F0F0F0]">
                            <div class="text-xl font-semibold text-[#101010]">{{ career.apprenticeGuidance.toLocaleString() }}</div>
                            <div class="text-xs text-[#515151]">Apprentice Guidance</div>
                        </div>
                    </div>

                    <!-- Municipal Investment -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-5">
                            <i class="fa-solid fa-landmark text-[#B91C1C]"></i>
                        </div>
                        <div class="font-medium text-[#101010] mb-6">Municipal Investment</div>
                        <div class="space-y-3">
                            <div class="bg-[#F8FBFC] rounded-xl p-4 border border-[#E5EEF8]">
                                <div class="text-2xl font-semibold text-[#B91C1C]">{{ career.municipalInvestmentCurrent }}</div>
                                <div class="text-xs text-[#515151] mt-1">23 municipalities · FY 2020/21</div>
                            </div>
                            <div class="bg-[#F8FBFC] rounded-xl p-4 border border-[#E5EEF8]">
                                <div class="text-2xl font-semibold text-[#101010]">{{ career.municipalInvestmentPrev }}</div>
                                <div class="text-xs text-[#515151] mt-1">FY 2019/20</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row 2 -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Teachers Trained -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-6 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
                            <i class="fa-solid fa-chalkboard-user text-[#B91C1C]"></i>
                        </div>
                        <div class="text-3xl font-semibold text-[#101010] mb-1">{{ career.teachersTrained.toLocaleString() }}</div>
                        <div class="font-medium text-[#101010] text-sm mb-1">Teachers Trained</div>
                        <div class="text-xs text-[#515151] mb-4">Career guidance educators</div>
                        <div class="pt-4 border-t border-[#F0F0F0]">
                            <div class="flex justify-between text-xs mb-1.5">
                                <span class="text-[#515151]">Women Educators</span>
                                <span class="font-semibold text-[#101010]">{{ career.womenEducatorsPercent }}%</span>
                            </div>
                            <div class="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: career.womenEducatorsPercent + '%' }"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Capacity Build -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-6 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
                            <i class="fa-solid fa-people-group text-[#B91C1C]"></i>
                        </div>
                        <div class="font-medium text-[#101010] text-sm mb-1">Capacity Build</div>
                        <div class="text-xs text-[#515151] mb-4">Facilitators and Government Staff</div>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center text-sm py-2 border-b border-[#F0F0F0]">
                                <span class="text-[#515151]">Career Facilitators</span>
                                <span class="font-semibold text-[#101010]">{{ career.careerFacilitators }}</span>
                            </div>
                            <div class="flex justify-between items-center text-sm py-2 border-b border-[#F0F0F0]">
                                <span class="text-[#515151]">Local Govt. Personnel</span>
                                <span class="font-semibold text-[#101010]">{{ career.localGovtPersonnel }}</span>
                            </div>
                            <div class="flex items-center justify-between text-sm pt-2">
                                <span class="text-[#515151]">96‑hr Worker Training</span>
                                <span class="px-2 py-0.5 bg-[rgba(235,31,39,0.1)] text-[#B91C1C] text-xs font-semibold rounded-full">Model</span>
                            </div>
                        </div>
                    </div>

                    <!-- School Coverage -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-6 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
                            <i class="fa-solid fa-school text-[#B91C1C]"></i>
                        </div>
                        <div class="font-medium text-[#101010] text-sm mb-4">School Coverage</div>
                        <div class="grid grid-cols-2 gap-3 mb-4">
                            <div class="bg-[#F8FBFC] rounded-xl p-3 text-center">
                                <div class="text-2xl font-semibold text-[#101010]">{{ career.schools }}</div>
                                <div class="text-xs text-[#515151]">Schools</div>
                            </div>
                            <div class="bg-[#F8FBFC] rounded-xl p-3 text-center">
                                <div class="text-2xl font-semibold text-[#101010]">{{ career.modelSchools }}</div>
                                <div class="text-xs text-[#515151]">Model Schools</div>
                            </div>
                        </div>
                        <p class="text-xs text-[#515151] leading-relaxed">Pioneering career guidance in schools across 7 provinces.</p>
                    </div>

                    <!-- Tripartite MOUs -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-6 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
                            <i class="fa-solid fa-handshake text-[#B91C1C]"></i>
                        </div>
                        <div class="space-y-5">
                            <div>
                                <div class="text-3xl font-semibold text-[#B91C1C]">{{ career.tripartiteMous }}</div>
                                <div class="font-medium text-[#101010] text-sm mt-1">Tripartite MOUs</div>
                            </div>
                            <div class="pt-4 border-t border-[#F0F0F0]">
                                <div class="text-3xl font-semibold text-[#101010]">{{ career.directPartners }}</div>
                                <div class="font-medium text-[#101010] text-sm mt-1">Direct Partners</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Apprenticeship & Skills Training -->
        <section class="py-20 lg:py-24 bg-[#F8FBFC] border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-semibold text-[#101010] mb-1">Apprenticeship &amp; Skills Training</h2>
                <p class="text-sm text-[#515151] mb-10">Pioneering dual‑VET and OJT programmes in Nepal</p>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Dual-VET -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
                            <i class="fa-solid fa-person-digging text-[#B91C1C]"></i>
                        </div>
                        <h3 class="font-semibold text-[#101010] mb-1">Dual-VET Apprenticeship</h3>
                        <p class="text-xs text-[#515151] mb-6">Workplace‑integrated learning pathway</p>
                        <div class="space-y-1 mb-6">
                            <div class="flex justify-between items-center py-3 border-b border-[#F0F0F0]">
                                <span class="text-sm text-[#515151]">Total Enrolled</span>
                                <span class="text-xl font-semibold text-[#101010]">{{ apprenticeshipData.dualVet.enrolled.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b border-[#F0F0F0]">
                                <span class="text-sm text-[#515151]">Graduated</span>
                                <span class="text-xl font-semibold text-[#101010]">{{ apprenticeshipData.dualVet.graduated.toLocaleString() }}</span>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div>
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="text-[#515151]">Girls</span>
                                    <span class="font-semibold text-[#101010]">{{ apprenticeshipData.dualVet.girlsPercent }}%</span>
                                </div>
                                <div class="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: apprenticeshipData.dualVet.girlsPercent + '%' }"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="text-[#515151]">Disadvantaged Groups</span>
                                    <span class="font-semibold text-[#101010]">{{ apprenticeshipData.dualVet.disadvantagedPercent }}%</span>
                                </div>
                                <div class="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#233D7E] rounded-full" :style="{ width: apprenticeshipData.dualVet.disadvantagedPercent + '%' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- OJT Short Course -->
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
                            <i class="fa-solid fa-screwdriver-wrench text-[#B91C1C]"></i>
                        </div>
                        <h3 class="font-semibold text-[#101010] mb-1">Short Course Training (OJT)</h3>
                        <p class="text-xs text-[#515151] mb-6">On‑the‑job training pathway</p>
                        <div class="space-y-1 mb-6">
                            <div class="flex justify-between items-center py-3 border-b border-[#F0F0F0]">
                                <span class="text-sm text-[#515151]">Total Enrolled</span>
                                <span class="text-xl font-semibold text-[#101010]">{{ apprenticeshipData.ojt.enrolled.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b border-[#F0F0F0]">
                                <span class="text-sm text-[#515151]">Graduated</span>
                                <span class="text-xl font-semibold text-[#101010]">{{ apprenticeshipData.ojt.graduated.toLocaleString() }}</span>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div>
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="text-[#515151]">Girls</span>
                                    <span class="font-semibold text-[#101010]">{{ apprenticeshipData.ojt.girlsPercent }}%</span>
                                </div>
                                <div class="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: apprenticeshipData.ojt.girlsPercent + '%' }"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="text-[#515151]">Disadvantaged Groups</span>
                                    <span class="font-semibold text-[#101010]">{{ apprenticeshipData.ojt.disadvantagedPercent }}%</span>
                                </div>
                                <div class="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div class="h-full bg-[#233D7E] rounded-full" :style="{ width: apprenticeshipData.ojt.disadvantagedPercent + '%' }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Skill Test Results - now matches the other cards -->
<div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
    <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-4">
        <i class="fa-solid fa-clipboard-check text-[#B91C1C]"></i>
    </div>
    <h3 class="font-semibold text-[#101010] mb-1">Skill Test Results</h3>
    <p class="text-xs text-[#515151] mb-6">National competency assessments (Phase I)</p>

    <div class="mb-6">
        <div class="flex justify-between text-sm mb-1.5">
            <span class="text-[#515151]">Pass Rate</span>
            <span class="font-semibold text-[#101010]">{{ apprenticeshipData.skillTest.passRate }}%</span>
        </div>
        <div class="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: apprenticeshipData.skillTest.passRate + '%' }"></div>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-4 pt-5 border-t border-[#F0F0F0]">
        <div>
            <div class="text-xl font-semibold text-[#101010]">{{ apprenticeshipData.skillTest.passed.toLocaleString() }}</div>
            <div class="text-xs text-[#515151]">Passed</div>
        </div>
        <div>
            <div class="text-xl font-semibold text-[#101010]">{{ apprenticeshipData.skillTest.appeared.toLocaleString() }}</div>
            <div class="text-xs text-[#515151]">Appeared</div>
        </div>
    </div>
</div>


                </div>
            </div>
        </section>

        <!-- Workforce Skill Upgrading -->
        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-semibold text-[#101010] mb-1">Workforce Skill Upgrading</h2>
                <p class="text-sm text-[#515151] mb-10">{{ workforceData.totalTrained.toLocaleString() }} workers trained across {{ workforceData.skillAreas.length + workforceData.moreCount }} technical skill areas</p>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-5">
                            <i class="fa-solid fa-helmet-safety text-[#B91C1C]"></i>
                        </div>
                        <div class="text-5xl font-semibold text-[#101010] mb-1">{{ workforceData.totalTrained.toLocaleString() }}</div>
                        <div class="text-sm text-[#515151] mb-6">Workers Trained · Total workers</div>
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-[#F8FBFC] rounded-xl p-4">
                                <div class="text-2xl font-semibold text-[#101010]">{{ workforceData.completed.toLocaleString() }}</div>
                                <div class="text-xs text-[#515151] mt-1">Completed</div>
                            </div>
                            <div class="bg-[#F8FBFC] rounded-xl p-4">
                                <div class="text-2xl font-semibold text-[#101010]">{{ workforceData.inTraining.toLocaleString() }}</div>
                                <div class="text-xs text-[#515151] mt-1">Currently in Training</div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-1.5">
                                <span class="text-[#515151]">Disadvantaged Groups</span>
                                <span class="font-semibold text-[#101010]">{{ workforceData.disadvantagedPercent }}%</span>
                            </div>
                            <div class="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                                <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: workforceData.disadvantagedPercent + '%' }"></div>
                            </div>
                        </div>
                    </div>

                    <div class="group bg-white rounded-[20px] border border-[#D9D9D9] p-8 hover:border-[#B91C1C] transition-colors">
                        <div class="w-10 h-10 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mb-5">
                            <i class="fa-solid fa-list-check text-[#B91C1C]"></i>
                        </div>
                        <div class="text-3xl font-semibold text-[#101010] mb-1">{{ workforceData.skillAreas.length + workforceData.moreCount }} Technical Skill Areas</div>
                        <div class="text-xs text-[#515151] mb-6">Covering diverse trade and service sectors</div>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in workforceData.skillAreas" :key="skill"
                                class="px-3 py-1.5 bg-[rgba(235,31,39,0.08)] text-[#B91C1C] text-xs font-medium rounded-full">
                                {{ skill }}
                            </span>
                            <span class="px-3 py-1.5 bg-[#101010] text-white text-xs font-medium rounded-full">
                                + {{ workforceData.moreCount }} more
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Industry Collaboration & Trainer Capacity -->
        <section class="py-20 lg:py-24 bg-[#F8FBFC] border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-semibold text-[#101010] mb-1">Industry Collaboration &amp; Trainer Capacity</h2>
                <p class="text-sm text-[#515151] mb-10">Companies as training hosts; instructors and TVET providers strengthened</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="stat-card bg-white rounded-[20px] border border-[#D9D9D9] p-8 text-center hover:border-[#B91C1C] transition-colors">
                        <div class="w-14 h-14 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mx-auto mb-4">
                            <i class="fa-solid fa-building text-[#B91C1C] text-xl"></i>
                        </div>
                        <div class="text-4xl font-semibold text-[#101010] mb-1">{{ industryData.companiesEngaged.toLocaleString() }}</div>
                        <div class="text-sm text-[#515151]">Companies Engaged</div>
                        <div class="mt-4 w-8 h-0.5 bg-[#B91C1C] mx-auto rounded-full"></div>
                    </div>

                    <div class="stat-card bg-white rounded-[20px] border border-[#D9D9D9] p-8 text-center hover:border-[#B91C1C] transition-colors">
                        <div class="w-14 h-14 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mx-auto mb-4">
                            <i class="fa-solid fa-user-tie text-[#B91C1C] text-xl"></i>
                        </div>
                        <div class="text-4xl font-semibold text-[#101010] mb-1">{{ industryData.apprenticesHosted.toLocaleString() }}</div>
                        <div class="text-sm text-[#515151]">Apprentices Hosted</div>
                        <div class="mt-4 w-8 h-0.5 bg-[#B91C1C] mx-auto rounded-full"></div>
                    </div>

                    <div class="stat-card bg-white rounded-[20px] border border-[#D9D9D9] p-8 text-center hover:border-[#B91C1C] transition-colors">
                        <div class="w-14 h-14 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mx-auto mb-4">
                            <i class="fa-solid fa-people-carry-box text-[#B91C1C] text-xl"></i>
                        </div>
                        <div class="text-4xl font-semibold text-[#101010] mb-1">{{ industryData.traineesHosted.toLocaleString() }}</div>
                        <div class="text-sm text-[#515151]">Trainees Hosted</div>
                        <div class="mt-4 w-8 h-0.5 bg-[#B91C1C] mx-auto rounded-full"></div>
                    </div>

                    <div class="stat-card bg-white rounded-[20px] border border-[#D9D9D9] p-8 text-center hover:border-[#B91C1C] transition-colors">
                        <div class="w-14 h-14 rounded-full bg-[rgba(235,31,39,0.08)] flex items-center justify-center mx-auto mb-4">
                            <i class="fa-solid fa-school-flag text-[#B91C1C] text-xl"></i>
                        </div>
                        <div class="text-4xl font-semibold text-[#101010] mb-1">{{ industryData.tvetProvidersOriented }}</div>
                        <div class="text-sm text-[#515151]">TVET Providers Oriented</div>
                        <div class="mt-4 w-8 h-0.5 bg-[#B91C1C] mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partners Section -->
        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div class="mb-6 flex justify-center">
                        <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                            <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Our Partners</span>
                        </div>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">We work with the best Partners</h2>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    <div v-for="logo in partnerLogosList" :key="logo"
                        class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors">
                        <img :src="logo" alt="Partner logo" class="max-w-[190px] max-h-[80px] object-contain" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Technical Assistance By -->
        <section class="py-20 text-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                    <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Support</span>
                </div>
                <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] my-4">Technical Assistance By</h2>
                <div class="flex justify-center">
                    <img :src="assistanceLogo" alt="Technical Assistance By" class="h-16" />
                </div>
            </div>
        </section>

        <!-- Contact CTA -->
        <section id="contact" class="relative py-20 h-96 overflow-hidden">
            <img
                src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png"
                alt=""
                class="absolute inset-0 w-full h-full object-cover"
            />
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
