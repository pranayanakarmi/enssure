<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();

const footerColumns = computed(() => page.props.footerColumns ?? []);
const footerSetting = computed(() => page.props.footerSetting ?? null);

const copyrightText = computed(() => footerSetting.value?.copyright_text ?? '© Copyright 2008 - 2026 enssure | Privacy Policy | Terms of Service');
const socialLinks = computed(() => {
    const links = footerSetting.value?.social_links ?? [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'x', url: 'https://x.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
    ];
    return links.filter((s) => s?.url);
});

const socialIcons = {
    facebook: { path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
    x: { path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', label: 'X' },
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
                    <p class="font-thin text-sm">
                        {{ copyrightText }}
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
