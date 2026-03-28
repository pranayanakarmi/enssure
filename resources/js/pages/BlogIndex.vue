<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';

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

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];
</script>

<template>
    <GuestLayout>
        <Head title="Blog - ENSSURE" />

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

        <section class="border-b border-[#cad0d8] bg-white py-20 lg:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
                    <div class="mb-6 flex justify-center">
                        <div class="inline-flex items-center justify-center rounded-full bg-[rgba(235,31,39,0.1)] px-5 py-2">
                            <span class="font-semibold uppercase tracking-wide text-[#B91C1C]">Our Partners</span>
                        </div>
                    </div>
                    <h2 class="mb-6 text-[2.5rem] leading-tight tracking-tight text-[#101010]">
                        We work with the best Partners
                    </h2>
                </div>
                <div class="mb-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    <div
                        v-for="(logo, i) in partnerLogos"
                        :key="i"
                        class="flex min-h-[186px] items-center justify-center rounded-[20px] border border-[#cad0d8] bg-white p-8 transition-colors hover:border-[#B91C1C]"
                    >
                        <img :src="logo" alt="Partner logo" class="max-h-[80px] max-w-[190px] object-contain" />
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 text-center">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="inline-flex items-center justify-center rounded-full bg-[rgba(235,31,39,0.1)] px-5 py-2">
                    <span class="font-semibold uppercase tracking-wide text-[#B91C1C]">Support</span>
                </div>
                <h2 class="my-4 text-[2.5rem] leading-tight tracking-tight text-[#101010]">
                    Technical Assistance By
                </h2>
                <div class="flex justify-center">
                    <img
                        src="/enssure/assets/c3f97e1b17044bbdeedac32a3818731e2450a527.png"
                        alt="Technical Assistance By"
                        class="h-16"
                    />
                </div>
            </div>
        </section>

        <section class="relative h-96 overflow-hidden py-20">
            <img
                src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png"
                alt=""
                class="absolute inset-0 h-full w-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40" />
            <div class="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:px-8">
                <div class="mx-auto max-w-2xl text-white">
                    <span class="uppercase text-[#B91C1C]">JOIN US</span>
                    <h2 class="mb-8 text-[2.5rem] leading-tight tracking-tight">
                        Build Skills, Build Futures.
                        <span class="text-[#B91C1C]">Support sustainable</span> employment today.
                    </h2>
                    <Link
                        href="/contact"
                        class="inline-block rounded-full bg-white px-6 py-2 uppercase text-black transition-colors hover:bg-gray-100"
                    >
                        Contact us
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
