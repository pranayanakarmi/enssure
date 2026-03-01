<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ChevronDown, Menu, X, Search } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { home, dashboard, login, register } from '@/routes';

const page = usePage();
const mobileNavOpen = ref(false);

const user = computed(() => page.props.auth?.user ?? null);
const mainMenu = computed(() => page.props.mainMenu ?? []);

function isInternal(href) {
    if (!href || href === '#') return false;
    return href.startsWith('/') && !href.startsWith('//');
}

function openMobileNav() {
    mobileNavOpen.value = true;
    if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileNav() {
    mobileNavOpen.value = false;
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }
}
</script>

<template>
    <header
        class="relative z-50 border-b border-black/10 bg-white"
        role="banner"
    >
        <div
            class="flex items-center justify-between gap-4 mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 lg:px-12 py-4 w-full max-w-[1600px] mx-auto"
        >
            <button
                type="button"
                class="lg:hidden p-2 -m-2 text-black hover:text-[#B91C1C] focus:outline-none rounded-md"
                aria-label="Toggle menu"
                @click="openMobileNav"
            >
                <Menu class="w-6 h-6" aria-hidden="true" />
            </button>

            <nav
                class="hidden lg:block flex-1 min-w-0"
                aria-label="Main navigation"
            >
                <ul
                    class="flex flex-wrap items-center gap-x-6 gap-y-1 xl:gap-x-8 uppercase text-black text-sm font-medium tracking-wide"
                >
            <template v-if="mainMenu.length > 0">
                <template v-for="(item, idx) in mainMenu" :key="idx">
                    <li v-if="item.children?.length" class="relative group cursor-pointer whitespace-nowrap">
                        <div class="flex items-center gap-1.5">
                            <Link
                                v-if="isInternal(item.href)"
                                :href="item.href"
                                class="hover:text-[#B91C1C] transition-colors"
                                :target="item.target || '_self'"
                            >
                                {{ item.title }}
                            </Link>
                            <a
                                v-else
                                :href="item.href"
                                class="hover:text-[#B91C1C] transition-colors"
                                :target="item.target || '_self'"
                                :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
                            >
                                {{ item.title }}
                            </a>
                            <ChevronDown class="w-4 h-4 text-[#B91C1C] shrink-0" aria-hidden="true" />
                        </div>
                        <ul
                            class="absolute left-0 mt-3 w-48 min-w-max bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100"
                        >
                            <li v-for="(child, cIdx) in item.children" :key="cIdx">
                                <Link
                                    v-if="isInternal(child.href)"
                                    :href="child.href"
                                    class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                                    :target="child.target || '_self'"
                                >
                                    {{ child.title }}
                                </Link>
                                <a
                                    v-else
                                    :href="child.href"
                                    class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                                    :target="child.target || '_self'"
                                    :rel="child.target === '_blank' ? 'noopener noreferrer' : undefined"
                                >
                                    {{ child.title }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li v-else class="whitespace-nowrap">
                        <Link
                            v-if="isInternal(item.href)"
                            :href="item.href"
                            class="hover:text-[#B91C1C] transition-colors"
                            :target="item.target || '_self'"
                        >
                            {{ item.title }}
                        </Link>
                        <a
                            v-else
                            :href="item.href"
                            class="hover:text-[#B91C1C] transition-colors"
                            :target="item.target || '_self'"
                            :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
                        >
                            {{ item.title }}
                        </a>
                    </li>
                </template>
            </template>
            <template v-else>
                <li>
                    <Link
                        :href="home().url"
                        class="hover:text-[#B91C1C] transition-colors"
                    >
                        Home
                    </Link>
                </li>
            </template>
                </ul>
            </nav>

            <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link
                v-if="user"
                :href="dashboard().url"
                class="bg-[#B91C1C] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-base uppercase hover:bg-[#d11b23] transition-colors"
            >
                Dashboard
            </Link>
            <template v-else>
            <Link
                :href="home().url"
                class="bg-[#B91C1C] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white text-xs sm:text-base uppercase hover:bg-[#d11b23] transition-colors"
            >
                Enssure
            </Link>
            </template>
            <button
                type="button"
                class="hidden sm:block p-2 -m-2 text-black hover:text-[#B91C1C] transition-colors rounded-md"
                aria-label="Search"
            >
                <Search class="w-5 h-5" aria-hidden="true" />
            </button>
            </div>
        </div>
    </header>

    <!-- Mobile Nav Overlay -->
    <div
        :class="[
            'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden',
            mobileNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
        ]"
        aria-hidden="true"
        @click="closeMobileNav"
    />

    <!-- Mobile Nav Menu -->
    <nav
        :class="[
            'fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-white shadow-xl z-50 transition-transform duration-300 lg:hidden overflow-y-auto',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
        aria-label="Mobile navigation"
    >
        <div class="p-6 pt-16 relative">
            <button
                type="button"
                class="absolute top-4 right-4 p-2 text-black hover:text-[#B91C1C]"
                aria-label="Close menu"
                @click="closeMobileNav"
            >
                <X class="text-xl" />
            </button>
            <ul class="uppercase text-black space-y-4">
                <template v-if="mainMenu.length > 0">
                    <template v-for="(item, idx) in mainMenu" :key="idx">
                        <li v-if="item.children?.length" class="py-2">
                            <div class="flex items-center justify-between gap-2">
                                <Link
                                    v-if="isInternal(item.href)"
                                    :href="item.href"
                                    class="block py-2 hover:text-[#B91C1C] flex-1"
                                    :target="item.target || '_self'"
                                    @click="closeMobileNav"
                                >
                                    {{ item.title }}
                                </Link>
                                <a
                                    v-else
                                    :href="item.href"
                                    class="block py-2 hover:text-[#B91C1C] flex-1"
                                    :target="item.target || '_self'"
                                    :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
                                    @click="closeMobileNav"
                                >
                                    {{ item.title }}
                                </a>
                                <ChevronDown class="w-4 h-4 text-[#B91C1C] shrink-0" aria-hidden="true" />
                            </div>
                            <ul class="mt-2 ml-4 space-y-1 text-sm">
                                <li v-for="(child, cIdx) in item.children" :key="cIdx">
                                    <Link
                                        v-if="isInternal(child.href)"
                                        :href="child.href"
                                        class="block py-1 hover:text-[#B91C1C]"
                                        :target="child.target || '_self'"
                                        @click="closeMobileNav"
                                    >
                                        {{ child.title }}
                                    </Link>
                                    <a
                                        v-else
                                        :href="child.href"
                                        class="block py-1 hover:text-[#B91C1C]"
                                        :target="child.target || '_self'"
                                        :rel="child.target === '_blank' ? 'noopener noreferrer' : undefined"
                                        @click="closeMobileNav"
                                    >
                                        {{ child.title }}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li v-else>
                            <Link
                                v-if="isInternal(item.href)"
                                :href="item.href"
                                class="block py-2 hover:text-[#B91C1C]"
                                :target="item.target || '_self'"
                                @click="closeMobileNav"
                            >
                                {{ item.title }}
                            </Link>
                            <a
                                v-else
                                :href="item.href"
                                class="block py-2 hover:text-[#B91C1C]"
                                :target="item.target || '_self'"
                                :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
                                @click="closeMobileNav"
                            >
                                {{ item.title }}
                            </a>
                        </li>
                    </template>
                </template>
                <template v-else>
                    <li>
                        <Link
                            :href="home().url"
                            class="block py-2 hover:text-[#B91C1C]"
                            @click="closeMobileNav"
                        >
                            Home
                        </Link>
                    </li>
                </template>
                <li v-if="user" class="pt-4">
                    <Link
                        :href="dashboard().url"
                        class="block py-2 text-[#B91C1C] font-semibold"
                        @click="closeMobileNav"
                    >
                        Dashboard
                    </Link>
                </li>
                <template v-else>
                    <li class="pt-4">
                        <Link
                            :href="login().url"
                            class="block py-2 hover:text-[#B91C1C]"
                            @click="closeMobileNav"
                        >
                            Log in
                        </Link>
                    </li>
                    <li>
                        <Link
                            :href="register().url"
                            class="block py-2 hover:text-[#B91C1C]"
                            @click="closeMobileNav"
                        >
                            Register
                        </Link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>
