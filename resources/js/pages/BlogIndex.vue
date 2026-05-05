<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import JoinUsCtaSection from '@/components/guest/JoinUsCtaSection.vue';
import PageHero from '@/components/guest/PageHero.vue';
import PartnersSection from '@/components/guest/PartnersSection.vue';
import TechnicalAssistanceSection from '@/components/guest/TechnicalAssistanceSection.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

defineProps({
    posts: {
        type: Array,
        default: () => [],
    },
});

const defaultImage = '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';

function postImageUrl(post) {
    return post.image_url ?? defaultImage;
}
</script>

<template>
    <GuestLayout>
        <Head title="Blog - ENSSURE">
            <meta
                name="description"
                content="Read the latest news, articles and stories from ENSSURE about vocational training, apprenticeships, and employment across Nepal."
            />
        </Head>

        <PageHero title="Blog" />

        <section class="border-b border-[#cad0d8] bg-white py-20 lg:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        v-for="post in posts"
                        :key="post.id"
                        :href="`/posts/${post.slug}`"
                        class="group block cursor-pointer"
                    >
                        <div class="relative mb-6 aspect-[367/302] overflow-hidden rounded-[30px]">
                            <img
                                :src="postImageUrl(post)"
                                :alt="post.title"
                                class="h-full w-full object-cover transition-transform group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                        <p
                            v-if="post.category"
                            class="mb-1 text-xs font-semibold uppercase tracking-wide text-[#B91C1C]"
                        >
                            {{ post.category }}
                        </p>
                        <h3 class="mb-2 text-lg leading-relaxed tracking-tight text-gray-900">
                            {{ post.title }}
                        </h3>
                        <p
                            v-if="post.excerpt"
                            class="mb-4 line-clamp-2 text-sm text-gray-600"
                        >
                            {{ post.excerpt }}
                        </p>
                        <span
                            class="inline-flex items-center gap-2 font-medium uppercase text-black transition-all hover:gap-3 hover:text-[#B91C1C]"
                        >
                            Read more
                            <ArrowRight class="h-4 w-4 text-[#B91C1C]" />
                        </span>
                    </Link>
                    <p
                        v-if="!posts || posts.length === 0"
                        class="col-span-full py-12 text-center text-gray-500"
                    >
                        No posts yet.
                    </p>
                </div>
            </div>
        </section>

        <PartnersSection />
        <TechnicalAssistanceSection />
        <JoinUsCtaSection />
    </GuestLayout>
</template>
