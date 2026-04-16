<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();

const footerColumns = computed(() => page.props.footerColumns ?? []);
const siteSetting = computed(() => page.props.siteSetting ?? null);

const privacyUrl = computed(() => siteSetting.value?.footer_privacy_policy_url ?? '');
const termsUrl = computed(() => siteSetting.value?.footer_terms_of_service_url ?? '');
const socialLinks = computed(() => {
    const links = siteSetting.value?.social_links ?? [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'x', url: 'https://x.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
    ];
    return links.filter((s) => s?.url);
});

const socialIcons = {
    facebook: { path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
    x: { path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451c0.979 0 1.771-0.773 1.771-1.729V1.729C24 0.774 23.205 0 22.225 0z', label: 'X' },
    youtube: { path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', label: 'YouTube' },
};
</script>

<template>
    <footer class="bg-[#101010] text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                v-if="footerColumns.length"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
            >
                <div
                    v-for="(col, colIndex) in footerColumns"
                    :key="colIndex"
                >
                    <h3
                        class="text-[#B91C1C] text-lg uppercase font-semibold mb-6"
                    >
                        {{ col.title }}
                    </h3>
                    <ul class="space-y-4">
                        <li
                            v-for="(link, linkIndex) in (col.links || [])"
                            :key="linkIndex"
                        >
                            <a
                                :href="link.url || '#'"
                                class="transition-colors"
                                :class="linkIndex === 0 ? 'hover:text-[#B91C1C]' : 'text-gray-300 hover:text-gray-300'"
                            >
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8">
                <div
                    class="flex flex-col md:flex-row items-center justify-between gap-4"
                >
                    <p class="font-thin text-sm flex flex-wrap items-center gap-x-1">
                        <span>© Copyright 2008 - {{ new Date().getFullYear() }} enssure</span>
                        <template v-if="privacyUrl || termsUrl">
                            <span> | </span>
                            <a
                                v-if="privacyUrl"
                                :href="privacyUrl"
                                class="hover:text-[#B91C1C] transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <template v-if="privacyUrl && termsUrl"> | </template>
                            <a
                                v-if="termsUrl"
                                :href="termsUrl"
                                class="hover:text-[#B91C1C] transition-colors"
                            >
                                Terms of Service
                            </a>
                        </template>
                    </p>
                    <div class="flex items-center gap-3">
                        <a
                            v-for="(s, i) in socialLinks"
                            :key="i"
                            :href="s.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-[#B91C1C] transition-colors"
                            :aria-label="socialIcons[s.platform]?.label || s.platform"
                        >
                            <svg
                                v-if="socialIcons[s.platform]"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path :d="socialIcons[s.platform].path" />
                            </svg>
                            <span v-else>{{ s.platform }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
