<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ArrowLeft, Calendar, FileDown, ExternalLink } from 'lucide-vue-next';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    item: { type: Object, required: true },
    hero: { type: Object, default: null },
});

const page = usePage();
const flashSuccess = computed(() => page.props.flash?.success);

function formatDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

const formattedDeadline = computed(() => formatDate(props.item.deadline));
const formattedPublishedAt = computed(() => formatDate(props.item.published_at));

const metaLine = computed(() => {
    const parts = [];
    if (props.item.location) parts.push(props.item.location);
    if (formattedDeadline.value) parts.push(`Deadline: ${formattedDeadline.value}`);
    return parts.join(' · ');
});

const validExternalUrl = computed(() => {
    let url = props.item.external_url;
    if (!url || typeof url !== 'string') return null;
    url = url.trim();
    if (url === '') return null;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    try {
        new URL(url);
        return url;
    } catch {
        return null;
    }
});

const heroTitle = computed(() => props.item.title);
const heroImage = computed(() => props.hero?.hero_image_url ?? null);
</script>

<template>
    <GuestLayout>
        <Head :title="`${item.title} - EOI/RFP - ENSSURE`" />

        <section v-if="flashSuccess" class="bg-green-50 border-b border-green-100">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <p class="text-sm text-green-800 text-center">{{ flashSuccess }}</p>
            </div>
        </section>

        <PageHero :title="heroTitle" :hero-image-url="heroImage" />

        <section class="py-12 lg:py-16 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/eoi-rfp"
                    class="inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C] hover:underline mb-8"
                >
                    <ArrowLeft class="w-4 h-4" />
                    Back to opportunities
                </Link>

                <header class="mb-8">
                    <h1 class="text-3xl lg:text-[2.5rem] font-bold text-[#101010] leading-tight tracking-tight">
                        {{ item.title }}
                    </h1>
                    <p v-if="metaLine" class="mt-3 text-sm text-gray-600">{{ metaLine }}</p>
                    <div class="mt-4 flex flex-wrap gap-4 text-xs font-bold text-gray-900 uppercase tracking-wide">
                        <span v-if="formattedPublishedAt" class="inline-flex items-center gap-1.5">
                            <Calendar class="w-3.5 h-3.5 text-gray-500" />
                            Posted {{ formattedPublishedAt }}
                        </span>
                        <span v-if="formattedDeadline" class="inline-flex items-center gap-1.5">
                            <Calendar class="w-3.5 h-3.5 text-gray-500" />
                            Apply by {{ formattedDeadline }}
                        </span>
                    </div>
                </header>

                <!-- No external link above content -->

                <div
                    v-if="item.content"
                    class="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed [&_table]:text-sm [&_td]:border [&_td]:border-gray-200 [&_th]:border [&_th]:border-gray-200 [&_table]:border-collapse"
                    v-html="item.content"
                />

                <div v-if="item.documents?.length" class="mt-10">
                    <h2 class="text-lg font-bold text-gray-900 mb-3">Related documents</h2>
                    <div class="flex flex-col gap-2">
                        <a
                            v-for="doc in item.documents"
                            :key="doc.id"
                            :href="doc.file_url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-[#B91C1C] hover:text-[#B91C1C] transition-colors"
                        >
                            <FileDown class="w-4 h-4" />
                            Download {{ doc.original_name }}
                        </a>
                    </div>
                </div>

                <!-- Action buttons: red external link (if exists) + all opportunities -->
                <div class="mt-10 flex flex-wrap gap-4">
                    <a
                        v-if="validExternalUrl"
                        :href="validExternalUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 justify-center rounded-lg bg-[#B91C1C] px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#991b1b] transition-colors"
                    >
                        Apply / View details
                        <ExternalLink class="w-4 h-4" />
                    </a>
                    <Link
                        href="/eoi-rfp"
                        class="inline-flex items-center justify-center rounded-lg border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        All opportunities
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
