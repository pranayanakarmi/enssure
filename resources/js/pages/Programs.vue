<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, BookOpen, Clock, GraduationCap } from 'lucide-vue-next';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

defineProps({
    programs: {
        type: Array,
        default: () => [],
    },
});

const levelBadgeClass = (level) => {
    const map = {
        undergraduate: 'bg-blue-100 text-blue-700',
        postgraduate: 'bg-purple-100 text-purple-700',
        diploma: 'bg-green-100 text-green-700',
        certificate: 'bg-yellow-100 text-yellow-700',
        professional: 'bg-orange-100 text-orange-700',
    };
    return map[(level || '').toLowerCase()] ?? 'bg-gray-100 text-gray-600';
};
</script>

<template>
    <GuestLayout>
        <Head title="Programs &amp; Courses - KMH-IHS Academics" />

        <PageHero title="Programs &amp; Courses" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-14">
                    <div class="mb-4 flex justify-center">
                        <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                            <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">Academic Offerings</span>
                        </div>
                    </div>
                    <h2 class="text-3xl lg:text-4xl font-semibold text-[#101010] leading-tight">
                        Informatics Programs at KMH-IHS
                    </h2>
                    <p class="mt-4 text-gray-600 leading-relaxed">
                        Explore our range of health informatics programs designed to prepare professionals for the evolving digital health landscape.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link
                        v-for="program in programs"
                        :key="program.id"
                        :href="`/programs/${program.slug}`"
                        class="group block border border-[#cad0d8] rounded-[20px] p-8 hover:border-[#B91C1C] hover:shadow-md transition-all"
                    >
                        <div class="mb-5 flex items-center justify-center w-12 h-12 bg-[rgba(235,31,39,0.1)] rounded-xl">
                            <GraduationCap class="w-6 h-6 text-[#B91C1C]" />
                        </div>

                        <div class="mb-3 flex flex-wrap gap-2">
                            <span
                                v-if="program.level"
                                class="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
                                :class="levelBadgeClass(program.level)"
                            >
                                {{ program.level }}
                            </span>
                            <span
                                v-if="program.program_type"
                                class="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[rgba(235,31,39,0.1)] text-[#B91C1C]"
                            >
                                {{ program.program_type }}
                            </span>
                        </div>

                        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-[#B91C1C] transition-colors leading-snug mb-3">
                            {{ program.name }}
                        </h3>

                        <p
                            v-if="program.description"
                            class="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3"
                        >
                            {{ program.description }}
                        </p>

                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">
                            <div v-if="program.duration" class="flex items-center gap-1.5">
                                <Clock class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                <span>{{ program.duration }}</span>
                            </div>
                            <div v-if="program.courses_count" class="flex items-center gap-1.5">
                                <BookOpen class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                <span>{{ program.courses_count }} course{{ program.courses_count !== 1 ? 's' : '' }}</span>
                            </div>
                        </div>

                        <span class="inline-flex items-center gap-2 text-sm font-medium text-black group-hover:text-[#B91C1C] transition-colors">
                            Learn more
                            <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                        </span>
                    </Link>

                    <p
                        v-if="!programs || programs.length === 0"
                        class="col-span-full text-center text-gray-500 py-12"
                    >
                        No programs listed at this time.
                    </p>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
