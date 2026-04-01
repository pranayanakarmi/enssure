<script setup>
import { Head, Link } from '@inertiajs/vue3';
import {
  ArrowRight, Users, GraduationCap, Briefcase, HardHat, Building,
  School, Handshake, Landmark, Scale, UserCog, TrendingUp, Award,
  BadgeCheck, Clock, UsersRound, BookOpen, FileCheck, Wrench, ChevronDown
} from 'lucide-vue-next';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

// ─────────────────────────────────────────────
// DYNAMIC DATA — replace with props/API later
// ─────────────────────────────────────────────
const projectInfo = ref({
  title: 'ENSSURE I',
  period: '2016 – 2022',
  tagline: 'Laying the Foundation for Skills Development in Nepal',
  donor: 'Government of Switzerland',
  implementer: 'Government of Nepal',
  budget: 'CHF 12.5 Million',
  provinces: 7,
  description: `The first phase of ENSSURE (Enhanced Skills for Sustainable and Rewarding Employment) was a bilateral project of the Government of Nepal and the Government of Switzerland. It established Nepal's dual-VET system, built institutional capacity, and piloted apprenticeship programmes across all seven provinces — transforming how vocational education is delivered nationwide.`,
  description2: `Key achievements include developing 33 national skill standards, training over 4,200 workers in high-demand trades, and reaching 28,500 youth through career guidance. The phase successfully embedded TVET services within federal structures, creating a scalable model that continues to shape Nepal's skills landscape.`,
});

const heroStats = ref([
  { key: 'youth', value: 28500, label: 'Youth Reached', icon: Users, color: '#B91C1C' },
  { key: 'apprentices', value: 1200, label: 'Apprentices', icon: GraduationCap, color: '#233D7E' },
  { key: 'ojt', value: 4800, label: 'OJT Enrolled', icon: Briefcase, color: '#B91C1C' },
  { key: 'workers', value: 4200, label: 'Workers Trained', icon: HardHat, color: '#233D7E' },
  { key: 'companies', value: 750, label: 'Companies Engaged', icon: Building, color: '#B91C1C' },
  { key: 'teachers', value: 280, label: 'Teachers Trained', icon: BookOpen, color: '#233D7E' },
]);

const careerGuidance = ref({
  totalYouth: 28500,
  schoolSessions: 21000,
  careerFairSessions: 7500,
  girlsPercent: 51.2,
  disadvantagedPercent: 68.4,
  teachersTrained: 280,
  womenEducatorsPercent: 32.5,
  schools: 120,
  modelSchools: 12,
  tripartiteMous: 98,
  directPartners: 15,
  municipalCurrent: 'NPR 8.4M',
  municipalPrev: 'NPR 3.6M',
  careerFacilitators: 12,
  localGovtPersonnel: 15,
});

const apprenticeship = ref({
  dualVet: { enrolled: 1200, graduated: 1100, girlsPercent: 51.2, disadvantagedPercent: 68.4 },
  ojt: { enrolled: 4800, graduated: 4500, girlsPercent: 47.3, disadvantagedPercent: 65.1 },
  skillTest: { passRate: 58, passed: 1200, appeared: 2070 },
});

const workforce = ref({
  totalTrained: 4200,
  completed: 4000,
  inTraining: 200,
  disadvantagedPercent: 65.3,
  skillAreas: ['Electrical','Construction','Plumbing','Hospitality','Healthcare','Cooking','Mechanics','ICT','Carpentry','Tailoring'],
  moreCount: 23,
});

const industry = ref({
  companiesEngaged: 750,
  apprenticesHosted: 1100,
  traineesHosted: 4500,
  tvetProvidersOriented: '4K+',
});

// ─────────────────────────────────────────────
// Animated counters for all numeric values
// ─────────────────────────────────────────────
const animatedValues = ref({});

// All numeric keys that should be animated
const numericKeys = [
  // Hero
  'youth', 'apprentices', 'ojt', 'workers', 'companies', 'teachers',
  // Career guidance
  'totalYouth', 'teachersTrained', 'schools', 'modelSchools', 'tripartiteMous',
  // Apprenticeship
  'dualVetEnrolled', 'dualVetGraduated', 'ojtEnrolled', 'ojtGraduated',
  'skillPassed', 'skillAppeared',
  // Workforce
  'workersTotal', 'workersCompleted', 'workersInTraining',
  // Industry
  'companiesEngaged', 'apprenticesHosted', 'traineesHosted'
];

// Map keys to their target values
const getTargetValue = (key) => {
  const targets = {
    youth: heroStats.value.find(s => s.key === 'youth').value,
    apprentices: heroStats.value.find(s => s.key === 'apprentices').value,
    ojt: heroStats.value.find(s => s.key === 'ojt').value,
    workers: heroStats.value.find(s => s.key === 'workers').value,
    companies: heroStats.value.find(s => s.key === 'companies').value,
    teachers: heroStats.value.find(s => s.key === 'teachers').value,
    totalYouth: careerGuidance.value.totalYouth,
    teachersTrained: careerGuidance.value.teachersTrained,
    schools: careerGuidance.value.schools,
    modelSchools: careerGuidance.value.modelSchools,
    tripartiteMous: careerGuidance.value.tripartiteMous,
    dualVetEnrolled: apprenticeship.value.dualVet.enrolled,
    dualVetGraduated: apprenticeship.value.dualVet.graduated,
    ojtEnrolled: apprenticeship.value.ojt.enrolled,
    ojtGraduated: apprenticeship.value.ojt.graduated,
    skillPassed: apprenticeship.value.skillTest.passed,
    skillAppeared: apprenticeship.value.skillTest.appeared,
    workersTotal: workforce.value.totalTrained,
    workersCompleted: workforce.value.completed,
    workersInTraining: workforce.value.inTraining,
    companiesEngaged: industry.value.companiesEngaged,
    apprenticesHosted: industry.value.apprenticesHosted,
    traineesHosted: industry.value.traineesHosted,
  };
  return targets[key] || 0;
};

function animateNumber(key, target, duration = 1500) {
  const start = performance.now();
  const startValue = 0;
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    animatedValues.value[key] = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else animatedValues.value[key] = target;
  };
  requestAnimationFrame(update);
}

// IntersectionObserver to start animations when elements appear
let observers = [];
onMounted(() => {
  const elements = document.querySelectorAll('[data-stat-key]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const key = entry.target.getAttribute('data-stat-key');
        if (key && !animatedValues.value[key]) {
          animateNumber(key, getTargetValue(key));
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
  observers.push(observer);
});

onUnmounted(() => {
  observers.forEach(obs => obs.disconnect());
});
</script>

<template>
  <GuestLayout>
    <Head title="ENSSURE I – Project Summary" />

    <!-- ══════════════════════════════════════════════════
         CINEMATIC HERO (light version)
    ══════════════════════════════════════════════════ -->
    <section class="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
      <!-- Background with subtle overlay -->
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
             class="w-full h-full object-cover" alt="" />
        <div class="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/20" />
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B91C1C] via-[#ef4444] to-[#B91C1C]" />
      </div>

      <!-- Floating period badge (light) -->
      <div class="absolute top-10 right-10 hidden lg:flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-[#B91C1C]/40 bg-white/80 backdrop-blur-sm shadow-lg">
        <span class="text-gray-500 text-xs uppercase tracking-widest">Phase</span>
        <span class="text-gray-900 text-4xl font-black leading-none">I</span>
        <span class="text-gray-500 text-xs">2016–2022</span>
      </div>

      <!-- Hero content -->
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
        <div class="max-w-4xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="h-px w-12 bg-[#B91C1C]" />
            <span class="text-[#B91C1C] uppercase tracking-[0.3em] text-sm font-semibold">ENSSURE I · 2016–2022</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[0.9] tracking-tight mb-6">
            LAYING<br/>
            <span class="text-[#B91C1C]">THE</span><br/>
            FOUNDATION
          </h1>
          <p class="text-lg text-gray-600 max-w-2xl leading-relaxed mb-10">
            {{ projectInfo.description.split('.')[0] }}.
          </p>
          <!-- Meta pills (light) -->
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 rounded-full border border-gray-300 bg-white/80 text-gray-700 text-sm shadow-sm">🇨🇭 Swiss Development Cooperation</span>
            <span class="px-4 py-2 rounded-full border border-gray-300 bg-white/80 text-gray-700 text-sm shadow-sm">🇳🇵 Government of Nepal</span>
            <span class="px-4 py-2 rounded-full border border-[#B91C1C]/40 bg-[#B91C1C]/10 text-gray-800 text-sm font-semibold">{{ projectInfo.budget }}</span>
            <span class="px-4 py-2 rounded-full border border-gray-300 bg-white/80 text-gray-700 text-sm shadow-sm">7 Provinces</span>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <ChevronDown class="w-5 h-5 text-gray-400" />
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         ANIMATED MEGA STATS BAR (light)
    ══════════════════════════════════════════════════ -->
    <section class="bg-white border-y border-gray-200 py-0">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-gray-200">
        <div v-for="(stat, i) in heroStats" :key="stat.label"
             class="flex flex-col items-center justify-center py-10 px-4 text-center group hover:bg-gray-50 transition-colors cursor-default">
          <div class="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
               :style="{ background: stat.color + '22' }">
            <component :is="stat.icon" class="w-5 h-5" :style="{ color: stat.color }" />
          </div>
          <div class="text-2xl font-black text-gray-900 tabular-nums"
               :data-stat-key="stat.key">
            {{ animatedValues[stat.key]?.toLocaleString() || '0' }}
          </div>
          <div class="text-xs text-gray-500 uppercase tracking-wider mt-1">{{ stat.label }}</div>
          <div class="w-6 h-0.5 mt-3 rounded-full" :style="{ background: stat.color }" />
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         PROJECT ABOUT — EDITORIAL TWO-COLUMN (light)
    ══════════════════════════════════════════════════ -->
    <section class="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <!-- Left: image stack -->
          <div class="lg:col-span-5 relative">
            <div class="relative">
              <div class="absolute -inset-4 bg-[#233D7E]/5 rounded-3xl -rotate-2" />
              <div class="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl">
                <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                     class="w-full h-full object-cover" alt="ENSSURE I" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <div class="text-white/70 text-xs uppercase tracking-widest mb-1">Duration</div>
                  <div class="text-white text-3xl font-black">6 Years</div>
                  <div class="text-white/60">2016 → 2022</div>
                </div>
              </div>
              <!-- Floating stat card (light) -->
              <div class="absolute -right-6 top-12 bg-[#B91C1C] rounded-2xl p-5 shadow-xl hidden lg:block">
                <div class="text-white/80 text-xs uppercase tracking-widest">Provinces</div>
                <div class="text-white text-5xl font-black leading-none mt-1">7</div>
              </div>
              <div class="absolute -bottom-6 -left-6 bg-[#233D7E] rounded-2xl p-5 shadow-xl hidden lg:block">
                <div class="text-white/80 text-xs">Skill Standards</div>
                <div class="text-white text-3xl font-black">33</div>
              </div>
            </div>
          </div>

          <!-- Right: text -->
          <div class="lg:col-span-7 lg:pt-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-[#B91C1C] flex items-center justify-center">
                <span class="text-white text-xs font-black">I</span>
              </div>
              <span class="text-[#B91C1C] font-semibold uppercase tracking-widest text-sm">Phase I Overview</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-8">
              Nepal's TVET<br/><span class="text-[#B91C1C]">Transformation</span><br/>Begins
            </h2>
            <div class="space-y-5 text-gray-600 leading-relaxed text-base">
              <p>{{ projectInfo.description }}</p>
              <p>{{ projectInfo.description2 }}</p>
            </div>

            <!-- Key milestones timeline (light) -->
            <div class="mt-10 relative">
              <div class="absolute top-5 left-0 right-0 h-px bg-gray-200" />
              <div class="grid grid-cols-4 gap-2 relative">
                <div v-for="(milestone, i) in [
                  { year: '2016', label: 'Project Launch' },
                  { year: '2018', label: 'Dual-VET Pilot' },
                  { year: '2020', label: '33 Standards Set' },
                  { year: '2022', label: 'Phase Complete' }
                ]" :key="i" class="flex flex-col items-center pt-2">
                  <div class="w-3 h-3 rounded-full bg-[#B91C1C] border-2 border-white shadow-sm mb-3 z-10" />
                  <div class="text-[#B91C1C] font-black text-sm">{{ milestone.year }}</div>
                  <div class="text-xs text-gray-500 text-center mt-1 leading-tight">{{ milestone.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         CAREER GUIDANCE — LIGHT INFOGRAPHIC SECTION
    ══════════════════════════════════════════════════ -->
    <section class="py-24 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-0.5 bg-[#B91C1C]" />
              <span class="text-[#B91C1C] uppercase tracking-widest text-sm font-semibold">Focus Area 01</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">Career<br/><span class="text-[#B91C1C]">Guidance</span></h2>
          </div>
          <p class="text-gray-500 max-w-sm leading-relaxed">School sessions, career fairs, teacher training and local government capacity building across 7 provinces.</p>
        </div>

        <!-- Big number centrepiece -->
        <div class="relative mb-12">
          <div class="text-center py-16 rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden relative">
            <div class="relative z-10">
              <div class="text-4xl lg:text-7xl font-black leading-none text-gray-900 tabular-nums"
                   data-stat-key="totalYouth">
                {{ animatedValues.totalYouth?.toLocaleString() || '0' }}
              </div>
              <div class="text-[#B91C1C] uppercase tracking-[0.4em] text-sm font-semibold mt-2">Total Youth Reached</div>
              <div class="flex items-center justify-center gap-8 mt-8">
                <div class="text-center">
                  <div class="text-2xl font-black text-gray-900">{{ careerGuidance.schoolSessions.toLocaleString() }}</div>
                  <div class="text-gray-500 text-xs uppercase tracking-wider mt-1">School Sessions</div>
                </div>
                <div class="w-px h-12 bg-gray-200" />
                <div class="text-center">
                  <div class="text-2xl font-black text-gray-900">{{ careerGuidance.careerFairSessions.toLocaleString() }}</div>
                  <div class="text-gray-500 text-xs uppercase tracking-wider mt-1">Career Fair Sessions</div>
                </div>
                <div class="w-px h-12 bg-gray-200" />
                <div class="text-center">
                  <div class="text-2xl font-black text-gray-900"
                       data-stat-key="tripartiteMous">
                    {{ animatedValues.tripartiteMous?.toLocaleString() || '0' }}
                  </div>
                  <div class="text-gray-500 text-xs uppercase tracking-wider mt-1">Tripartite MOUs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4-col cards row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Inclusion bars -->
          <div class="rounded-2xl border border-gray-200 bg-white p-6 col-span-1 sm:col-span-2 shadow-sm">
            <div class="text-gray-500 text-xs uppercase tracking-widest mb-5">Inclusion & Equity</div>
            <div class="space-y-5">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600 text-sm">Girls Participation</span>
                  <span class="text-gray-900 font-black">{{ careerGuidance.girlsPercent }}%</span>
                </div>
                <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-[#B91C1C] to-[#ef4444] rounded-full"
                       :style="{ width: careerGuidance.girlsPercent + '%' }" />
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600 text-sm">Disadvantaged Groups</span>
                  <span class="text-gray-900 font-black">{{ careerGuidance.disadvantagedPercent }}%</span>
                </div>
                <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-[#233D7E] to-[#3b5bdb] rounded-full"
                       :style="{ width: careerGuidance.disadvantagedPercent + '%' }" />
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600 text-sm">Women Educators</span>
                  <span class="text-gray-900 font-black">{{ careerGuidance.womenEducatorsPercent }}%</span>
                </div>
                <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-[#B91C1C]/60 to-[#B91C1C] rounded-full"
                       :style="{ width: careerGuidance.womenEducatorsPercent + '%' }" />
                </div>
              </div>
            </div>
          </div>

          <!-- Teachers -->
          <div class="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-sm">
            <div class="text-gray-500 text-xs uppercase tracking-widest mb-4">Teachers Trained</div>
            <div class="text-6xl font-black text-gray-900 leading-none tabular-nums"
                 data-stat-key="teachersTrained">
              {{ animatedValues.teachersTrained?.toLocaleString() || '0' }}
            </div>
            <div class="mt-4 flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-[#B91C1C]" />
              <span class="text-gray-500 text-xs">Career guidance educators</span>
            </div>
          </div>

          <!-- Schools -->
          <div class="rounded-2xl border border-[#B91C1C]/30 bg-[#B91C1C]/5 p-6 flex flex-col justify-between shadow-sm">
            <div class="text-[#B91C1C] text-xs uppercase tracking-widest mb-4">School Coverage</div>
            <div class="flex gap-4 items-end">
              <div>
                <div class="text-5xl font-black text-gray-900 leading-none tabular-nums"
                     data-stat-key="schools">
                  {{ animatedValues.schools?.toLocaleString() || '0' }}
                </div>
                <div class="text-gray-500 text-xs mt-1">Total Schools</div>
              </div>
              <div class="pb-2">
                <div class="text-3xl font-black text-[#B91C1C] tabular-nums"
                     data-stat-key="modelSchools">
                  {{ animatedValues.modelSchools?.toLocaleString() || '0' }}
                </div>
                <div class="text-gray-500 text-xs mt-1">Model Schools</div>
              </div>
            </div>
            <div class="mt-4">
              <School class="w-5 h-5 text-[#B91C1C]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         APPRENTICESHIP — LIGHT SPLIT INFOGRAPHIC
    ══════════════════════════════════════════════════ -->
    <section class="py-24 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-0.5 bg-[#233D7E]" />
              <span class="text-[#233D7E] uppercase tracking-widest text-sm font-semibold">Focus Area 02</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">Apprenticeship<br/><span class="text-[#233D7E]">& Skills Training</span></h2>
          </div>
          <p class="text-gray-500 max-w-sm leading-relaxed">Pioneering Nepal's first dual-VET and OJT programmes — school + workplace integrated learning.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Dual VET — large card (light) -->
          <div class="lg:col-span-1 rounded-3xl bg-[#233D7E] p-8 text-white relative overflow-hidden shadow-lg">
            <div class="relative z-10">
              <BadgeCheck class="w-8 h-8 mb-6 text-white/70" />
              <div class="text-white/60 text-xs uppercase tracking-widest mb-2">Dual-VET Apprenticeship</div>
              <div class="text-6xl font-black leading-none mb-1 tabular-nums"
                   data-stat-key="dualVetEnrolled">
                {{ animatedValues.dualVetEnrolled?.toLocaleString() || '0' }}
              </div>
              <div class="text-white/60 text-sm mb-8">Total Enrolled</div>

              <div class="flex gap-6 mb-8 pb-8 border-b border-white/20">
                <div>
                  <div class="text-3xl font-black tabular-nums"
                       data-stat-key="dualVetGraduated">
                    {{ animatedValues.dualVetGraduated?.toLocaleString() || '0' }}
                  </div>
                  <div class="text-white/50 text-xs mt-1">Graduated</div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span class="text-white/60">Girls</span>
                    <span class="font-bold">{{ apprenticeship.dualVet.girlsPercent }}%</span>
                  </div>
                  <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div class="h-full bg-white rounded-full" :style="{ width: apprenticeship.dualVet.girlsPercent + '%' }" />
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span class="text-white/60">Disadvantaged</span>
                    <span class="font-bold">{{ apprenticeship.dualVet.disadvantagedPercent }}%</span>
                  </div>
                  <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: apprenticeship.dualVet.disadvantagedPercent + '%' }" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right column: OJT + Skill Test (light) -->
          <div class="lg:col-span-2 grid grid-rows-2 gap-6">
            <!-- OJT Card -->
            <div class="rounded-3xl border border-gray-200 bg-white p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div class="relative z-10 flex flex-col sm:flex-row gap-8 items-start">
                <div class="flex-shrink-0">
                  <Wrench class="w-8 h-8 text-[#233D7E] mb-4" />
                  <div class="text-gray-500 text-xs uppercase tracking-widest mb-1">Short Course OJT</div>
                  <div class="text-5xl font-black text-gray-900 leading-none tabular-nums"
                       data-stat-key="ojtEnrolled">
                    {{ animatedValues.ojtEnrolled?.toLocaleString() || '0' }}
                  </div>
                  <div class="text-gray-500 text-sm mt-1">Enrolled</div>
                </div>
                <div class="flex-1 space-y-4 pt-1">
                  <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <span class="text-gray-600 text-sm">Graduated</span>
                    <span class="text-2xl font-black text-gray-900 tabular-nums"
                          data-stat-key="ojtGraduated">
                      {{ animatedValues.ojtGraduated?.toLocaleString() || '0' }}
                    </span>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-gray-600">Girls Participation</span>
                      <span class="font-bold text-gray-900">{{ apprenticeship.ojt.girlsPercent }}%</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-[#B91C1C] rounded-full" :style="{ width: apprenticeship.ojt.girlsPercent + '%' }" />
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-gray-600">Disadvantaged Groups</span>
                      <span class="font-bold text-gray-900">{{ apprenticeship.ojt.disadvantagedPercent }}%</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div class="h-full bg-[#233D7E] rounded-full" :style="{ width: apprenticeship.ojt.disadvantagedPercent + '%' }" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skill Test Card (light) -->
            <div class="rounded-3xl bg-gray-900 p-8 relative overflow-hidden shadow-lg">
              <div class="relative z-10 flex flex-col sm:flex-row gap-8 items-center">
                <!-- Radial gauge -->
                <div class="relative flex-shrink-0 w-32 h-32">
                  <svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="10" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#B91C1C" stroke-width="10"
                            stroke-dasharray="263.9"
                            :stroke-dashoffset="263.9 * (1 - apprenticeship.skillTest.passRate/100)"
                            stroke-linecap="round" />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <div class="text-xl font-black text-white">{{ apprenticeship.skillTest.passRate }}%</div>
                    <div class="text-white/40 text-xs">Pass Rate</div>
                  </div>
                </div>
                <div>
                  <FileCheck class="w-6 h-6 text-[#B91C1C] mb-3" />
                  <div class="text-white/50 text-xs uppercase tracking-widest mb-1">Skill Test Results</div>
                  <div class="flex gap-8 mt-2">
                    <div>
                      <div class="text-3xl font-black text-white tabular-nums"
                           data-stat-key="skillPassed">
                        {{ animatedValues.skillPassed?.toLocaleString() || '0' }}
                      </div>
                      <div class="text-white/40 text-xs mt-1">Passed</div>
                    </div>
                    <div>
                      <div class="text-3xl font-black text-white/60 tabular-nums"
                           data-stat-key="skillAppeared">
                        {{ animatedValues.skillAppeared?.toLocaleString() || '0' }}
                      </div>
                      <div class="text-white/40 text-xs mt-1">Appeared</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════
         WORKFORCE UPSKILLING — LIGHT SECTION
    ══════════════════════════════════════════════════ -->
    <section class="py-24 bg-gray-50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Left numbers -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-0.5 bg-[#B91C1C]" />
              <span class="text-[#B91C1C] uppercase tracking-widest text-sm font-semibold">Focus Area 03</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-8">
              Workforce<br/><span class="text-[#B91C1C]">Skill Upgrading</span>
            </h2>

            <!-- Giant stat -->
            <div class="relative rounded-3xl border border-gray-200 bg-white p-8 mb-6 overflow-hidden shadow-sm">
              <div class="absolute top-0 left-0 w-1.5 h-full bg-[#B91C1C] rounded-r-full" />
              <div class="text-5xl lg:text-7xl font-black text-gray-900 leading-none tabular-nums"
                   data-stat-key="workersTotal">
                {{ animatedValues.workersTotal?.toLocaleString() || '0' }}
              </div>
              <div class="text-[#B91C1C] uppercase tracking-widest text-sm font-semibold">Workers Trained</div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="text-3xl font-black text-gray-900 tabular-nums"
                     data-stat-key="workersCompleted">
                  {{ animatedValues.workersCompleted?.toLocaleString() || '0' }}
                </div>
                <div class="text-gray-500 text-xs mt-1 uppercase tracking-wider">Completed</div>
              </div>
              <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="text-3xl font-black text-gray-900 tabular-nums"
                     data-stat-key="workersInTraining">
                  {{ animatedValues.workersInTraining?.toLocaleString() || '0' }}
                </div>
                <div class="text-gray-500 text-xs mt-1 uppercase tracking-wider">In Training</div>
              </div>
            </div>

            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div class="flex justify-between mb-3">
                <span class="text-gray-600 text-sm">Disadvantaged Groups</span>
                <span class="text-gray-900 font-black">{{ workforce.disadvantagedPercent }}%</span>
              </div>
              <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#B91C1C] to-[#ef4444] rounded-full"
                     :style="{ width: workforce.disadvantagedPercent + '%' }" />
              </div>
            </div>
          </div>

          <!-- Right: Skills cloud / tags -->
          <div class="flex flex-col justify-center">
            <div class="text-gray-500 text-xs uppercase tracking-widest mb-6">
              {{ workforce.skillAreas.length + workforce.moreCount }} Technical Skill Areas
            </div>
            <div class="flex flex-wrap gap-3">
              <span v-for="skill in workforce.skillAreas" :key="skill"
                    class="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:border-[#B91C1C] hover:text-[#B91C1C] transition-all cursor-default shadow-sm">
                {{ skill }}
              </span>
              <span class="px-4 py-2 rounded-full text-sm font-semibold bg-[#B91C1C] text-white shadow-sm">
                +{{ workforce.moreCount }} more
              </span>
            </div>

            <!-- Decorative grid lines (light) -->
            <div class="mt-12 grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div v-for="(item, i) in [
                { val: '33', lbl: 'Skill Standards' },
                { val: '7', lbl: 'Provinces' },
                { val: '96h', lbl: 'Worker Training' }
              ]" :key="i" class="bg-white p-6 text-center hover:bg-gray-50 transition-colors">
                <div class="text-2xl font-black text-gray-900">{{ item.val }}</div>
                <div class="text-gray-500 text-xs mt-1">{{ item.lbl }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


<!-- ══════════════════════════════════════════════════
     INDUSTRY COLLABORATION — RED ACCENTS TO MATCH OTHER FOCUS AREAS
══════════════════════════════════════════════════ -->
<section class="py-24 bg-white relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Two‑column header (red line) -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-0.5 bg-[#B91C1C]" />
          <span class="text-[#B91C1C] uppercase tracking-widest text-sm font-semibold">Focus Area 04</span>
        </div>
        <h2 class="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
          Industry Collaboration<br/><span class="text-[#B91C1C]">&amp; Partnerships</span>
        </h2>
      </div>
      <p class="text-gray-500 max-w-sm leading-relaxed">
        Building public-private networks, fostering employer ownership, and embedding TVET into local economic development.
      </p>
    </div>

    <!-- Main cards row (red accents) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Companies engaged (red border and background) -->
      <div class="rounded-2xl border border-[#B91C1C]/30 bg-[#B91C1C]/5 p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div class="text-[#B91C1C] text-xs uppercase tracking-widest mb-4">Private Sector Reach</div>
          <div class="text-5xl font-black text-gray-900 leading-none tabular-nums"
               data-stat-key="companiesEngaged">
            {{ animatedValues.companiesEngaged?.toLocaleString() || '0' }}
          </div>
          <div class="text-gray-500 text-sm mt-2">Companies engaged</div>
        </div>
        <div class="mt-6">
          <Building class="w-6 h-6 text-[#B91C1C]" />
        </div>
      </div>

      <!-- Apprentices hosted (red icons) -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="text-gray-500 text-xs uppercase tracking-widest mb-4">Hosted Learners</div>
        <div class="flex items-baseline gap-4">
          <div>
            <div class="text-4xl font-black text-gray-900 tabular-nums"
                 data-stat-key="apprenticesHosted">
              {{ animatedValues.apprenticesHosted?.toLocaleString() || '0' }}
            </div>
            <div class="text-gray-500 text-sm mt-1">Apprentices</div>
          </div>
          <div class="w-px h-12 bg-gray-200" />
          <div>
            <div class="text-4xl font-black text-gray-900 tabular-nums"
                 data-stat-key="traineesHosted">
              {{ animatedValues.traineesHosted?.toLocaleString() || '0' }}
            </div>
            <div class="text-gray-500 text-sm mt-1">OJT trainees</div>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <GraduationCap class="w-5 h-5 text-[#B91C1C]" />
          <UsersRound class="w-5 h-5 text-[#B91C1C]" />
        </div>
      </div>

      <!-- TVET providers oriented (red icon) -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="text-gray-500 text-xs uppercase tracking-widest mb-4">Capacity Building</div>
        <div class="text-5xl font-black text-gray-900 leading-none">
          {{ industry.tvetProvidersOriented }}
        </div>
        <div class="text-gray-500 text-sm mt-2">TVET providers oriented</div>
        <div class="mt-6">
          <School class="w-6 h-6 text-[#B91C1C]" />
        </div>
      </div>
    </div>

    <!-- Second row: Municipal investment + Local governance (red accents) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <!-- Municipal investment growth (red icon background) -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B91C1C]/10 flex items-center justify-center">
          <Landmark class="w-6 h-6 text-[#B91C1C]" />
        </div>
        <div class="flex-1">
          <div class="text-gray-500 text-xs uppercase tracking-widest mb-2">Municipal Investment Growth</div>
          <div class="text-gray-900 text-lg font-semibold">23 Municipalities · FY 2020/21</div>
          <div class="flex items-center gap-4 mt-3">
            <div class="text-center">
              <div class="text-gray-400 text-xs">FY 2019/20</div>
              <div class="text-xl font-black text-gray-600">{{ careerGuidance.municipalPrev }}</div>
            </div>
            <div class="flex items-center gap-2">
              <div class="h-px w-8 bg-gray-300" />
              <TrendingUp class="w-4 h-4 text-[#B91C1C]" />
              <div class="h-px w-8 bg-gray-300" />
            </div>
            <div class="text-center">
              <div class="text-[#B91C1C] text-xs">FY 2020/21</div>
              <div class="text-2xl font-black text-gray-900">{{ careerGuidance.municipalCurrent }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Local governance strengthened (red icon background) -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B91C1C]/10 flex items-center justify-center">
          <UserCog class="w-6 h-6 text-[#B91C1C]" />
        </div>
        <div>
          <div class="text-gray-500 text-xs uppercase tracking-widest mb-2">Local Governance Strengthened</div>
          <div class="flex gap-6">
            <div>
              <span class="text-3xl font-black text-gray-900">{{ careerGuidance.careerFacilitators }}</span>
              <span class="text-gray-500 text-sm ml-1">career facilitators</span>
            </div>
            <div class="w-px h-10 bg-gray-200" />
            <div>
              <span class="text-3xl font-black text-gray-900">{{ careerGuidance.localGovtPersonnel }}</span>
              <span class="text-gray-500 text-sm ml-1">local govt personnel</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tripartite MOUs (red accent) -->
    <div class="mt-12 pt-6 border-t border-gray-200 text-center">
      <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 border border-gray-200">
        <Handshake class="w-5 h-5 text-[#B91C1C]" />
        <span class="text-gray-600 text-sm">{{ careerGuidance.tripartiteMous }} tripartite MOUs signed</span>
        <span class="text-gray-400 text-xs">(school‑industry‑government)</span>
      </div>
    </div>
  </div>
</section>



  </GuestLayout>
</template>

<style scoped>
/* Smooth progress bars on mount */
.h-full { transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
</style>
