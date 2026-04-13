<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, ArrowRight, BookOpen, Clock, GraduationCap, FileText } from 'lucide-vue-next';
import { computed } from 'vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { index as programsIndex, show as programShow } from '@/routes/programs';

const props = defineProps({
    program: {
        type: Object,
        required: true,
    },
    relatedPrograms: {
        type: Array,
        default: () => [],
    },
});

const levelBadgeClass = computed(() => {
    const map = {
        undergraduate: 'bg-blue-100 text-blue-700',
        postgraduate: 'bg-purple-100 text-purple-700',
        diploma: 'bg-green-100 text-green-700',
        certificate: 'bg-yellow-100 text-yellow-700',
        professional: 'bg-orange-100 text-orange-700',
    };
    return map[(props.program.level || '').toLowerCase()] ?? 'bg-gray-100 text-gray-600';
});
</script>

<template>
    <GuestLayout>
        <Head :title="`${program.name} - Programs - KMH-IHS Academics`" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-8">
                    <Link
                        :href="programsIndex().url"
                        class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#B91C1C] transition-colors"
                    >
                        <ArrowLeft class="w-4 h-4" />
                        Back to Programs
                    </Link>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div class="lg:col-span-2">
                        <div class="mb-6">
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span
                                    v-if="program.level"
                                    class="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
                                    :class="levelBadgeClass"
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
                            <h1 class="text-3xl lg:text-4xl font-semibold text-[#101010] leading-tight">
                                {{ program.name }}
                            </h1>
                        </div>

                        <div
                            v-if="program.description"
                            class="prose prose-gray max-w-none text-gray-700 leading-relaxed mb-10"
                        >
                            <p>{{ program.description }}</p>
                        </div>

                        <div v-if="program.courses && program.courses.length > 0">
                            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen class="w-5 h-5 text-[#B91C1C]" />
                                Courses
                            </h2>
                            <div class="space-y-4">
                                <div
                                    v-for="course in program.courses"
                                    :key="course.id"
                                    class="border border-[#cad0d8] rounded-xl p-5 hover:border-[#B91C1C] transition-colors"
                                >
                                    <div class="flex items-start justify-between gap-4">
                                        <div class="min-w-0 flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <span v-if="course.course_code" class="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                    {{ course.course_code }}
                                                </span>
                                            </div>
                                            <h3 class="font-semibold text-gray-900">{{ course.name }}</h3>
                                            <p v-if="course.description" class="mt-1 text-sm text-gray-600 leading-relaxed line-clamp-2">
                                                {{ course.description }}
                                            </p>
                                        </div>
                                        <div class="shrink-0 flex flex-col items-end gap-2">
                                            <div v-if="course.duration" class="flex items-center gap-1 text-sm text-gray-500">
                                                <Clock class="w-3.5 h-3.5" />
                                                <span>{{ course.duration }}</span>
                                            </div>
                                            <a
                                                v-if="course.syllabus_url"
                                                :href="course.syllabus_url"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="inline-flex items-center gap-1 text-xs text-[#B91C1C] hover:underline"
                                            >
                                                <FileText class="w-3.5 h-3.5" />
                                                Syllabus
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside class="space-y-6">
                        <div class="border border-[#cad0d8] rounded-2xl p-6">
                            <h2 class="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                <GraduationCap class="w-5 h-5 text-[#B91C1C]" />
                                Program Overview
                            </h2>
                            <dl class="space-y-4">
                                <div v-if="program.level">
                                    <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Level</dt>
                                    <dd class="text-sm text-gray-800 font-medium">{{ program.level }}</dd>
                                </div>
                                <div v-if="program.program_type">
                                    <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Type</dt>
                                    <dd class="text-sm text-gray-800">{{ program.program_type }}</dd>
                                </div>
                                <div v-if="program.duration" class="flex items-start gap-2">
                                    <Clock class="w-4 h-4 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Duration</dt>
                                        <dd class="text-sm text-gray-800">{{ program.duration }}</dd>
                                    </div>
                                </div>
                                <div v-if="program.courses && program.courses.length > 0" class="flex items-start gap-2">
                                    <BookOpen class="w-4 h-4 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Courses</dt>
                                        <dd class="text-sm text-gray-800">{{ program.courses.length }} course{{ program.courses.length !== 1 ? 's' : '' }}</dd>
                                    </div>
                                </div>
                            </dl>
                            <div class="mt-6">
                                <Link
                                    href="/contact"
                                    class="w-full block text-center bg-[#B91C1C] hover:bg-[#d11b23] text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
                                >
                                    Enquire Now
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <section v-if="relatedPrograms.length > 0" class="py-20 lg:py-24 bg-gray-50 border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10">
                    <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full mb-4">
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">Explore More</span>
                    </div>
                    <h2 class="text-2xl font-semibold text-[#101010]">Other Programs</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link
                        v-for="p in relatedPrograms"
                        :key="p.id"
                        :href="programShow(p).url"
                        class="group block border border-[#cad0d8] rounded-2xl p-6 bg-white hover:border-[#B91C1C] transition-colors"
                    >
                        <div class="flex items-center gap-2 mb-3">
                            <GraduationCap class="w-4 h-4 text-[#B91C1C]" />
                            <span v-if="p.level" class="text-xs font-semibold text-gray-500 uppercase tracking-wide">{{ p.level }}</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 group-hover:text-[#B91C1C] transition-colors leading-snug mb-3">
                            {{ p.name }}
                        </h3>
                        <span class="inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C]">
                            Learn more <ArrowRight class="w-4 h-4" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
