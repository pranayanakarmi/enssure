<script setup>
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();

const siteSetting = computed(() => page.props.siteSetting ?? null);

const phone1 = computed(() => siteSetting.value?.header_phone_1 ?? '+977 1 6636073/6636191');
const phone2 = computed(() => siteSetting.value?.header_phone_2 ?? '+977 1 6632091');
const fax = computed(() => siteSetting.value?.header_fax ?? '');
const email = computed(() => siteSetting.value?.header_email ?? 'enssure.np@helvetas.org');

const socialLinks = computed(() => {
    const links = siteSetting.value?.social_links ?? [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'x', url: 'https://x.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
    ];
    return links.filter((s) => s?.url);
});

const phone1Tel = computed(() => {
    const p = phone1.value;
    const beforeSlash = p.includes('/') ? p.split('/')[0].trim() : p;
    return beforeSlash.replace(/\s/g, '');
});
const phone2Tel = computed(() => phone2.value.replace(/\s/g, ''));

const socialIcons = {
    facebook: { path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
   x: {   // 👈 make sure this exists
        path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451c0.979 0 1.771-0.773 1.771-1.729V1.729C24 0.774 23.205 0 22.225 0z',
        label: 'LinkedIn'
    },
    youtube: { path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', label: 'YouTube' },
};
</script>

<template>
    <div class="bg-[#B91C1C] py-1.5">
        <div class="px-4 sm:px-6 lg:px-12 mx-auto">
            <div
                class="flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-white text-xs sm:text-sm"
            >
                <div class="flex flex-wrap items-center gap-6">
                    <div v-if="phone1" class="flex items-center gap-2">
                        <a
                            :href="`tel:${phone1Tel}`"
                            class="hover:opacity-90 flex items-center gap-2"
                            aria-label="Phone"
                        >
                            <svg
                                class="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                                />
                            </svg>
                            <span>{{ phone1 }}</span>
                        </a> /
                        <a v-if="phone2" :href="`tel:${phone2Tel}`" class="hover:opacity-90 flex items-center"
                            aria-label="Phone alternate">
                            <span>{{ phone2 }}</span>
                        </a>
                    </div>
                    <div v-if="fax" class="flex items-center gap-2">
                        <a
                            :href="`tel:${fax}`"
                            class="hover:opacity-90"
                            aria-label="Phone alternate"
                        >
                            <svg
                                class="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                                />
                            </svg>
                        </a>
                        <span>{{ fax }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-4 sm:gap-6 lg:gap-10">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <a
                            v-for="(s, i) in socialLinks"
                            :key="i"
                            :href="s.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:opacity-90"
                            :aria-label="socialIcons[s.platform]?.label || s.platform"
                        >
                            <svg
                                v-if="socialIcons[s.platform]"
                                class="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path :d="socialIcons[s.platform].path" />
                            </svg>
                        </a>
                    </div>
                    <a
                        v-if="email"
                        :href="`mailto:${email}`"
                        class="hidden md:flex items-center gap-2 hover:opacity-90"
                    >
                        <svg
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                            />
                        </svg>
                        <span>{{ email }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
