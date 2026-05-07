<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';

defineProps({
    site: {
        type: Object,
        required: true,
    },
    stats: {
        type: Array,
        default: () => [],
    },
    services: {
        type: Array,
        default: () => [],
    },
    articles: {
        type: Array,
        default: () => [],
    },
    updatedAt: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <Head title="TechNova Labs" />
    <GuestLayout>
        <div class="bg-slate-950 text-white">
            <section class="mx-auto max-w-6xl px-6 py-20">
                <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-300">
                    Technology Solutions
                </p>
                <h1 class="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                    {{ site.name }}
                </h1>
                <p class="max-w-3xl text-lg text-slate-300 md:text-xl">
                    {{ site.tagline }}
                </p>
                <div class="mt-8 flex flex-wrap gap-4">
                    <Link
                        v-if="$page.props.auth?.user"
                        :href="route('dashboard')"
                        class="rounded bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Open Dashboard
                    </Link>
                    <Link
                        v-else
                        :href="route('login')"
                        class="rounded bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Log in
                    </Link>
                    <Link
                        v-if="!$page.props.auth?.user"
                        :href="route('register')"
                        class="rounded border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white"
                    >
                        Create account
                    </Link>
                </div>
            </section>

            <section class="border-y border-slate-800 bg-slate-900/60">
                <div class="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
                    <article
                        v-for="stat in stats"
                        :key="stat.label"
                        class="rounded-xl border border-slate-800 bg-slate-900 p-6"
                    >
                        <p class="text-3xl font-bold text-cyan-300">{{ stat.value }}</p>
                        <p class="mt-2 text-sm text-slate-300">{{ stat.label }}</p>
                    </article>
                </div>
            </section>
        </div>

        <section class="mx-auto max-w-6xl px-6 py-16">
            <h2 class="mb-8 text-3xl font-bold text-slate-900">Core Services</h2>
            <div class="grid gap-6 md:grid-cols-3">
                <article
                    v-for="service in services"
                    :key="service.title"
                    class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h3 class="text-xl font-semibold text-slate-900">{{ service.title }}</h3>
                    <p class="mt-3 text-slate-600">{{ service.description }}</p>
                </article>
            </div>
        </section>

        <section class="bg-slate-50">
            <div class="mx-auto max-w-6xl px-6 py-16">
                <div class="mb-8 flex items-center justify-between gap-4">
                    <h2 class="text-3xl font-bold text-slate-900">Latest Insights</h2>
                    <p class="text-sm text-slate-500">Updated: {{ updatedAt }}</p>
                </div>
                <div class="grid gap-6 md:grid-cols-3">
                    <article
                        v-for="article in articles"
                        :key="article.title"
                        class="rounded-xl border border-slate-200 bg-white p-6"
                    >
                        <p class="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                            {{ article.category }}
                        </p>
                        <h3 class="mt-3 text-lg font-semibold text-slate-900">{{ article.title }}</h3>
                        <p class="mt-3 text-sm text-slate-500">{{ article.readTime }}</p>
                    </article>
                </div>
            </div>
        </section>

        <div class="mx-auto max-w-6xl px-6 py-14">
            <div class="rounded-2xl bg-slate-900 p-8 text-center text-white">
                <h2 class="text-2xl font-bold">Need a dynamic technology website like this?</h2>
                <p class="mx-auto mt-3 max-w-2xl text-slate-300">
                    This page is content-driven via server props, so you can keep design fixed and update text/data dynamically.
                </p>
            </div>
        </div>
    </GuestLayout>
</template>
