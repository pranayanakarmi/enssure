<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import PageHero from '@/components/guest/PageHero.vue';
import TechnicalAssistanceSection from '@/components/guest/TechnicalAssistanceSection.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    notices: {
        type: Array,
        default: () => [],
    },
});

const defaultImage = '/enssure/assets/8e0e987593b1e142069ba13aa37750b56e49a006.png';

function noticeImageUrl(notice) {
    return notice.image_url ?? defaultImage;
}
</script>

<template>
    <GuestLayout>
        <Head title="News & Notices - ENSSURE">
            <meta
                name="description"
                content="Stay updated with the latest news, announcements and notices from ENSSURE about vocational training programs and employment initiatives in Nepal."
            />
        </Head>

        <PageHero title="News and Notice Page" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <Link
                        v-for="notice in notices"
                        :key="notice.id"
                        :href="`/notices/${notice.slug}`"
                        class="group cursor-pointer block"
                    >
                        <div class="relative rounded-[30px] overflow-hidden mb-6 aspect-[367/302]">
                            <img
                                :src="noticeImageUrl(notice)"
                                :alt="notice.title"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                        <h3 class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight">
                            {{ notice.title }}
                        </h3>
                        <span class="inline-flex items-center gap-2 hover:text-[#B91C1C] text-black uppercase font-medium hover:gap-3 transition-all">
                            Read more
                            <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                        </span>
                    </Link>
                    <p
                        v-if="!notices || notices.length === 0"
                        class="col-span-full text-center text-gray-500 py-12"
                    >
                        No notices yet.
                    </p>
                </div>
            </div>
        </section>

        <TechnicalAssistanceSection />
    </GuestLayout>
</template>
