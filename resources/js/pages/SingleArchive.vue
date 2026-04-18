<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Calendar, Share2 } from 'lucide-vue-next';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    // Same hero data structure as Impact Stories page
    impactPageHero: {
        type: Object,
        default: null,
    },
    // The full notice data
    notice: {
        type: Object,
        required: true,
    },
    relatedNotices: {
        type: Array,
        default: () => [],
    },
});

// Hero title – use impactPageHero title or fallback to notice title
const heroTitle = computed(() => props.impactPageHero?.title ?? props.notice.title ?? 'Notice');
// Hero image – use impactPageHero image or fallback to null (no image)
const heroImageUrl = computed(() => props.impactPageHero?.hero_image_url ?? null);

// Date formatting
const formattedDate = computed(() => {
    if (!props.notice.updated_at) return null;
    const d = new Date(props.notice.updated_at);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
});

// Share logic (unchanged)
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

function relatedNoticeImage(notice) {
    return notice.image_url ?? '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';
}
</script>

<template>
    <GuestLayout>
        <Head :title="`${notice.title} - Notices - ENSSURE`" />

        <!-- PageHero – uses impactPageHero (same as impact stories) -->
        <PageHero
            :title="heroTitle"
            :hero-image-url="heroImageUrl"
        />

        <!-- Meta bar: date + share (below hero) -->
        <!-- <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
            <div v-if="formattedDate" class="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500 uppercase tracking-wide">
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
        </div> -->

        <!-- Notice content -->
        <section class="py-12 lg:py-16 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <div
                        v-if="notice.content"
                        class="notice-content text-xl leading-relaxed text-gray-900 prose prose-lg max-w-none [&_img]:mt-4 [&_img]:mb-6 [&_img]:rounded-lg [&_img]:block"
                        v-html="notice.content"
                    />
                </article>
            </div>
        </section>

        <!-- Related notices (styled like related stories) -->
        <section
            v-if="relatedNotices.length > 0"
            class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                    Related Notices
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
    </GuestLayout>
</template>
