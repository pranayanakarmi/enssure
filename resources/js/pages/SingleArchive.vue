<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Calendar, Share2 } from 'lucide-vue-next';
import { computed } from 'vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    notice: {
        type: Object,
        required: true,
    },
    relatedNotices: {
        type: Array,
        default: () => [],
    },
});

const formattedDate = computed(() => {
    if (!props.notice.updated_at) return null;
    const d = new Date(props.notice.updated_at);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
});

const shareUrl = computed(() => props.notice.share_url || (typeof window !== 'undefined' ? window.location.href : ''));

const socialLinks = computed(() => {
    const url = encodeURIComponent(shareUrl.value);
    const title = encodeURIComponent(props.notice.title ?? '');
    return [
        { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}`, icon: 'F', bgClass: 'bg-[#1877F2]' },
        { name: 'X', url: `https://twitter.com/intent/tweet?url=${url}&text=${title}`, icon: 'X', bgClass: 'bg-[#1DA1F2]' },
        { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`, icon: 'in', bgClass: 'bg-[#0A66C2]' },
        { name: 'Pinterest', url: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`, icon: 'P', bgClass: 'bg-[#E60023]' },
    ];
});

async function copyShareLink() {
    try {
        await navigator.clipboard.writeText(shareUrl.value);
    } catch {
        // fallback ignored
    }
}

const defaultImage = '/enssure/assets/archive-detail-image.png';
const noticeImageUrl = computed(() => props.notice.image_url ?? defaultImage);

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];

function relatedNoticeImage(n) {
    return n.image_url ?? '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';
}
</script>

<template>
    <GuestLayout>
        <Head :title="`${notice.title} - Notices - ENSSURE`" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <header class="text-center mb-8">
                        <h1 class="text-[2.5rem] leading-tight tracking-tight text-[#101010]">
                            {{ notice.title }}
                        </h1>
                        <div
                            v-if="formattedDate"
                            class="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500 uppercase tracking-wide mt-4"
                        >
                            <div class="flex items-center gap-2">
                                <Calendar class="w-4 h-4 text-gray-400" />
                                <span class="font-bold">{{ formattedDate }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <button
                                    type="button"
                                    class="flex items-center justify-center w-8 h-8 rounded-full bg-[#06B6D4] text-white hover:opacity-90 transition-opacity"
                                    title="Copy link"
                                    @click="copyShareLink"
                                >
                                    <Share2 class="w-4 h-4" />
                                </button>
                                <a
                                    v-for="social in socialLinks"
                                    :key="social.name"
                                    :href="social.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :title="`Share on ${social.name}`"
                                    :class="['flex items-center justify-center w-8 h-8 rounded-full text-white hover:opacity-90 transition-opacity text-xs font-bold', social.bgClass]"
                                >
                                    {{ social.icon }}
                                </a>
                            </div>
                        </div>
                    </header>

                    <div class="mb-10">
                        <div class="rounded-3xl overflow-hidden border shadow-sm">
                            <img
                                :src="noticeImageUrl"
                                :alt="notice.title"
                                class="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    <div
                        v-if="notice.content"
                        class="notice-content text-xl leading-relaxed text-gray-900 prose prose-lg max-w-none [&_img]:mt-4 [&_img]:mb-6 [&_img]:rounded-lg [&_img]:block"
                        v-html="notice.content"
                    />
                </article>
            </div>
        </section>

        <section
            v-if="relatedNotices.length > 0"
            class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                    Related News
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <Link
                        v-for="n in relatedNotices"
                        :key="n.id"
                        :href="`/notices/${n.slug}`"
                        class="group cursor-pointer block"
                    >
                        <div class="relative rounded-[30px] overflow-hidden mb-6 aspect-[367/302]">
                            <img
                                :src="relatedNoticeImage(n)"
                                :alt="n.title"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight">
                            {{ n.title }}
                        </h3>
                        <span class="inline-flex items-center gap-2 hover:text-[#B91C1C] text-black uppercase font-medium hover:gap-3 transition-all">
                            Read more
                            <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                        </span>
                    </Link>
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
