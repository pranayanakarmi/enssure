<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { ChevronDown, Menu, X, Search } from 'lucide-vue-next';
import { home, dashboard, login, register } from '@/routes';

const page = usePage();
const mobileNavOpen = ref(false);

const user = computed(() => page.props.auth?.user ?? null);

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
    <div
        class="relative z-50 flex items-center justify-between mt-4 sm:mt-6 lg:mt-10 px-4 sm:px-6 lg:px-12 pb-4 w-full border-b border-black/10"
    >
        <button
            type="button"
            class="lg:hidden p-2 text-black hover:text-[#B91C1C] focus:outline-none"
            aria-label="Toggle menu"
            @click="openMobileNav"
        >
            <Menu class="text-xl" />
        </button>

        <ul
            class="uppercase text-black hidden lg:flex space-x-6 xl:space-x-8"
        >
            <li>
                <Link
                    :href="home().url"
                    class="hover:text-[#B91C1C] transition-colors"
                >
                    Home
                </Link>
            </li>
            <li class="relative group cursor-pointer">
                <div class="flex items-center gap-2">
                    <span>About Us</span>
                    <ChevronDown class="w-4 h-4 text-[#B91C1C]" />
                </div>
                <ul
                    class="absolute left-0 mt-3 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100"
                >
                    <li>
                        <a
                            href="#about"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                            @click="closeMobileNav"
                        >
                            Mission
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Vision
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Team
                        </a>
                    </li>
                </ul>
            </li>
            <li class="relative group cursor-pointer">
                <div class="flex items-center gap-2">
                    <span>Key Project Components</span>
                    <ChevronDown class="w-4 h-4 text-[#B91C1C]" />
                </div>
                <ul
                    class="absolute left-0 mt-3 w-56 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100"
                >
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Component 1
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Component 2
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Component 3
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a
                    href="#stories"
                    class="hover:text-[#B91C1C] transition-colors"
                >
                    Impact Stories
                </a>
            </li>
            <li>
                <a href="#" class="hover:text-[#B91C1C] transition-colors">
                    Resource
                </a>
            </li>
            <li class="relative group cursor-pointer">
                <div class="flex items-center gap-2">
                    <span>Notices</span>
                    <ChevronDown class="w-4 h-4 text-[#B91C1C]" />
                </div>
                <ul
                    class="absolute left-0 mt-3 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100"
                >
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Latest Notices
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="block px-4 py-2 hover:text-[#B91C1C] transition-colors"
                        >
                            Announcements
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" class="hover:text-[#B91C1C] transition-colors">
                    Database
                </a>
            </li>
            <li>
                <a
                    href="#contact"
                    class="hover:text-[#B91C1C] transition-colors"
                >
                    Contact Us
                </a>
            </li>
        </ul>

        <div class="flex items-center space-x-2 sm:space-x-4 ml-auto lg:ml-0">
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
                class="hidden sm:block p-2 text-black hover:text-[#B91C1C] transition-colors"
                aria-label="Search"
            >
                <Search class="w-5 h-5" />
            </button>
        </div>
    </div>

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
                <li>
                    <Link
                        :href="home().url"
                        class="block py-2 hover:text-[#B91C1C]"
                        @click="closeMobileNav"
                    >
                        Home
                    </Link>
                </li>
                <li class="py-2">
                    <div class="flex items-center justify-between">
                        <span>About Us</span>
                        <ChevronDown class="w-4 h-4 text-[#B91C1C]" />
                    </div>
                    <ul class="mt-2 ml-4 space-y-1 text-sm">
                        <li>
                            <a
                                href="#about"
                                class="block py-1 hover:text-[#B91C1C]"
                                @click="closeMobileNav"
                            >
                                Mission
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                class="block py-1 hover:text-[#B91C1C]"
                            >
                                Vision
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                class="block py-1 hover:text-[#B91C1C]"
                            >
                                Team
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="py-2">
                    <div class="flex items-center justify-between">
                        <span>Key Project Components</span>
                        <ChevronDown class="w-4 h-4 text-[#B91C1C]" />
                    </div>
                    <ul class="mt-2 ml-4 space-y-1 text-sm">
                        <li>
                            <a href="#" class="block py-1 hover:text-[#B91C1C]">
                                Component 1
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block py-1 hover:text-[#B91C1C]">
                                Component 2
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block py-1 hover:text-[#B91C1C]">
                                Component 3
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        href="#stories"
                        class="block py-2 hover:text-[#B91C1C]"
                        @click="closeMobileNav"
                    >
                        Impact Stories
                    </a>
                </li>
                <li>
                    <a href="#" class="block py-2 hover:text-[#B91C1C]">
                        Resource
                    </a>
                </li>
                <li class="py-2">
                    <div class="flex items-center justify-between">
                        <span>Notices</span>
                        <ChevronDown class="w-4 h-4 text-[#B91C1C]" />
                    </div>
                    <ul class="mt-2 ml-4 space-y-1 text-sm">
                        <li>
                            <a href="#" class="block py-1 hover:text-[#B91C1C]">
                                Latest Notices
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block py-1 hover:text-[#B91C1C]">
                                Announcements
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="block py-2 hover:text-[#B91C1C]">
                        Database
                    </a>
                </li>
                <li>
                    <a
                        href="#contact"
                        class="block py-2 hover:text-[#B91C1C]"
                        @click="closeMobileNav"
                    >
                        Contact Us
                    </a>
                </li>
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
