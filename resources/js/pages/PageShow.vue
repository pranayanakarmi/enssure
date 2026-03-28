<script setup>
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    page: {
        type: Object,
        required: true,
    },
});

const headTitle = computed(() => {
    const base = props.page.meta_title?.trim() || props.page.title;

    return `${base} - ENSSURE`;
});
</script>

<template>
    <GuestLayout>
        <Head :title="headTitle">
            <meta
                v-if="page.meta_description"
                name="description"
                :content="page.meta_description"
            />
        </Head>

        <section class="border-b border-[#cad0d8] bg-white py-20 lg:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <article>
                    <header class="mb-8 text-center">
                        <h1 class="text-[2.5rem] leading-tight tracking-tight text-[#101010]">
                            {{ page.title }}
                        </h1>
                    </header>

                    <div
                        v-if="page.content"
                        class="post-content prose prose-lg max-w-none text-xl leading-relaxed text-gray-900 [&_img]:mb-6 [&_img]:mt-4 [&_img]:block [&_img]:rounded-lg"
                        v-html="page.content"
                    />
                </article>
            </div>
        </section>
    </GuestLayout>
</template>
