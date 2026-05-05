<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Calendar, Share2 } from 'lucide-vue-next';
import { computed } from 'vue';
import JoinUsCtaSection from '@/components/guest/JoinUsCtaSection.vue';
import PageHero from '@/components/guest/PageHero.vue';
import PartnersSection from '@/components/guest/PartnersSection.vue';
import TechnicalAssistanceSection from '@/components/guest/TechnicalAssistanceSection.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
    relatedPosts: {
        type: Array,
        default: () => [],
    },
    postHero: {
        type: Object,
        default: null,
    },
});

const formattedDate = computed(() => {
    if (!props.post.published_at) {
        return null;
    }
    const d = new Date(props.post.published_at);

    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
});

const shareUrl = computed(() => props.post.share_url || (typeof window !== 'undefined' ? window.location.href : ''));

const socialLinks = computed(() => {
    const url = encodeURIComponent(shareUrl.value);
    const title = encodeURIComponent(props.post.title ?? '');

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
const postImageUrl = computed(() => props.post.image_url ?? defaultImage);

function relatedPostImage(p) {
    return p.image_url ?? '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';
}

const metaLine = computed(() => {
    const parts = [];
    if (props.post.category) {
        parts.push(props.post.category);
    }
    if (props.post.tags?.length) {
        parts.push(props.post.tags.join(' · '));
    }

    return parts.join(' — ');
});
</script>

<template>
    <GuestLayout>
        <Head :title="`${post.title} - Blog - ENSSURE`">
            <meta
                v-if="post.excerpt"
                name="description"
                :content="post.excerpt"
            />
            <meta property="og:title" :content="`${post.title} - ENSSURE`" />
            <meta
                v-if="post.excerpt"
                property="og:description"
                :content="post.excerpt"
            />
            <meta
                v-if="post.image_url"
                property="og:image"
                :content="post.image_url"
            />
        </Head>

        <PageHero
            :title="post.title"
            :hero-image-url="postHero?.hero_image_url ?? null"
        />

        <section class="border-b border-[#cad0d8] bg-white py-20 lg:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <article>
                    <header class="mb-8 text-center">
                        <p
                            v-if="metaLine"
                            class="text-sm text-gray-600"
                        >
                            {{ metaLine }}
                        </p>
                        <p
                            v-if="post.excerpt"
                            class="mx-auto mt-4 max-w-3xl text-lg text-gray-600"
                        >
                            {{ post.excerpt }}
                        </p>
                        <div
                            v-if="formattedDate"
                            class="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm uppercase tracking-wide text-gray-500"
                        >
                            <div class="flex items-center gap-2">
                                <Calendar class="h-4 w-4 text-gray-400" />
                                <span class="font-bold">{{ formattedDate }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <button
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-full bg-[#06B6D4] text-white transition-opacity hover:opacity-90"
                                    title="Copy link"
                                    @click="copyShareLink"
                                >
                                    <Share2 class="h-4 w-4" />
                                </button>
                                <a
                                    v-for="social in socialLinks"
                                    :key="social.name"
                                    :href="social.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :title="`Share on ${social.name}`"
                                    :class="['flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90', social.bgClass]"
                                >
                                    {{ social.icon }}
                                </a>
                            </div>
                        </div>
                    </header>

                    <div
                        v-if="post.image_url"
                        class="mx-auto mb-10 max-w-4xl overflow-hidden rounded-2xl"
                    >
                        <img
                            :src="postImageUrl"
                            :alt="post.title"
                            class="h-auto w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div
                        v-if="post.content"
                        class="post-content prose prose-lg max-w-none text-xl leading-relaxed text-gray-900 [&_img]:mb-6 [&_img]:mt-4 [&_img]:block [&_img]:rounded-lg"
                        v-html="post.content"
                    />
                </article>
            </div>
        </section>

        <section
            v-if="relatedPosts.length > 0"
            class="border-b border-[#cad0d8] bg-white py-20 lg:py-24"
        >
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 class="mb-6 text-3xl leading-tight text-gray-900 md:text-4xl">
                    Related posts
                </h2>
                <div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        v-for="p in relatedPosts"
                        :key="p.id"
                        :href="`/posts/${p.slug}`"
                        class="group block cursor-pointer"
                    >
                        <div class="relative mb-6 aspect-[367/302] overflow-hidden rounded-[30px]">
                            <img
                                :src="relatedPostImage(p)"
                                :alt="p.title"
                                class="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h3 class="mb-4 text-lg leading-relaxed tracking-tight text-gray-900">
                            {{ p.title }}
                        </h3>
                        <span
                            class="inline-flex items-center gap-2 font-medium uppercase text-black transition-all hover:gap-3 hover:text-[#B91C1C]"
                        >
                            Read more
                            <ArrowRight class="h-4 w-4 text-[#B91C1C]" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>

        <PartnersSection />
        <TechnicalAssistanceSection />
        <JoinUsCtaSection />
    </GuestLayout>
</template>
