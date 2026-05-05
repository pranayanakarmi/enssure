<script setup>
import { Head, Link } from '@inertiajs/vue3';
import GuestLayout from '@/layouts/GuestLayout.vue';
</script>

<template>
    <Head title="Welcome" />
    <GuestLayout>
        <div class="flex min-h-[60vh] items-center justify-center">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
                <p class="text-gray-600 mb-8">Your new Laravel + Inertia + Vue application.</p>
                <div class="flex gap-4 justify-center">
                    <Link
                        v-if="$page.props.auth?.user"
                        :href="route('dashboard')"
                        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Dashboard
                    </Link>
                    <template v-else>
                        <Link
                            :href="route('login')"
                            class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Log in
                        </Link>
                    </template>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
