<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, User, Building, X } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    contactFeedbackContent: {
        type: Object,
        default: () => ({
            title: "We'd love to hear from you",
            description: "Fill out the form and we'll get back to you within 24 hours.",
        }),
    },
    contactInfo: {
        type: Object,
        default: () => ({
            address: '',
            phone: '',
            email: '',
            hours: '',
            social_links: [],
        }),
    },
    provinceContacts: {
        type: Array,
        default: () => [
            {
                province: 'Province 1',
                name: 'Mr. Ram Prasad Koirala',
                position: 'Provincial Coordinator',
                phone: '+977 21 123456',
                email: 'province1@enssure.org.np',
            },
            {
                province: 'Province 2',
                name: 'Ms. Sita Devi Yadav',
                position: 'Provincial Coordinator',
                phone: '+977 31 234567',
                email: 'province2@enssure.org.np',
            },
            {
                province: 'Bagmati Province',
                name: 'Mr. Hari Bahadur Thapa',
                position: 'Provincial Coordinator',
                phone: '+977 1 9876543',
                email: 'bagmati@enssure.org.np',
            },
            {
                province: 'Gandaki Province',
                name: 'Ms. Ganga Poudel',
                position: 'Provincial Coordinator',
                phone: '+977 64 345678',
                email: 'gandaki@enssure.org.np',
            },
            {
                province: 'Lumbini Province',
                name: 'Mr. Krishna Adhikari',
                position: 'Provincial Coordinator',
                phone: '+977 71 456789',
                email: 'lumbini@enssure.org.np',
            },
            {
                province: 'Karnali Province',
                name: 'Ms. Radha Shahi',
                position: 'Provincial Coordinator',
                phone: '+977 83 567890',
                email: 'karnali@enssure.org.np',
            },
            {
                province: 'Sudurpashchim Province',
                name: 'Mr. Dambar Singh Rawal',
                position: 'Provincial Coordinator',
                phone: '+977 91 678901',
                email: 'sudurpashchim@enssure.org.np',
            },
        ],
    },
});

const page = usePage();
const flashSuccess = computed(() => page.props.flash?.success ?? null);

const form = useForm({
    name: '',
    email: '',
    type: 'feedback',
    feedback_text: '',
});

function submitFeedback() {
    form.post('/contact/feedback', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            form.clearErrors();
        },
    });
}

// Partner logos – replace with actual dynamic data
const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];


// Social icon SVG paths (same as TopBar)
const socialIcons = {
    facebook: { path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', label: 'Facebook' },
    x: {
        path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451c0.979 0 1.771-0.773 1.771-1.729V1.729C24 0.774 23.205 0 22.225 0z', label: 'X' },
    youtube: { path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', label: 'YouTube' },
};
</script>

<template>
    <GuestLayout>
        <Head title="Contact Us - ENSSURE" />

        <PageHero title="Contact Us" />

        <!-- Contact section (info + form) -->
        <section class="py-16 lg:py-24 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Left column: Contact information -->
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">{{ contactFeedbackContent.title || 'Get in touch' }}</h2>
                        <p class="text-gray-600 mb-8 text-lg">{{ contactFeedbackContent.description || "We'd love to hear from you. Send us a message and we'll respond as soon as possible." }}</p>

                        <div class="space-y-6">
                            <div class="flex items-start gap-4">
                                <div class="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <MapPin class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Visit us</h3>
                                    <p class="text-gray-600">{{ contactInfo.address }}</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <Phone class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Call us</h3>
                                    <p class="text-gray-600">{{ contactInfo.phone }}</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <Mail class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Email us</h3>
                                    <p class="text-gray-600">{{ contactInfo.email }}</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <Clock class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Working hours</h3>
                                    <p class="text-gray-600">{{ contactInfo.hours }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Social links -->
                        <div class="mt-10">
                            <h3 class="font-semibold text-gray-900 mb-4">Follow us</h3>
                            <div class="flex gap-4">
                                <a
                                    v-for="(s, i) in contactInfo.social_links"
                                    :key="i"
                                    :href="s.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-gray-500 hover:text-red-600 transition"
                                    :aria-label="socialIcons[s.platform]?.label || s.platform"
                                >
                                    <svg
                                        v-if="socialIcons[s.platform]"
                                        class="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path :d="socialIcons[s.platform].path" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Right column: Contact form -->
                    <div class="bg-white rounded-2xl p-10 shadow-lg border-2 border-red-100">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>

                        <form class="space-y-6" @submit.prevent="submitFeedback">
                            <div v-if="flashSuccess" class="rounded-lg bg-green-50 p-4 text-sm text-green-800 border border-green-200">
                                {{ flashSuccess }}
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="contact-name">Full name</label>
                                <input
                                    id="contact-name"
                                    v-model="form.name"
                                    type="text"
                                    autocomplete="name"
                                    class="w-full rounded-lg border-2 border-red-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
                                />
                                <p v-if="form.errors.name" class="mt-1 text-sm text-red-600">{{ form.errors.name }}</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="contact-email">Email address *</label>
                                <input
                                    id="contact-email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    autocomplete="email"
                                    class="w-full rounded-lg border-2 border-red-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
                                />
                                <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="contact-type">Type</label>
                                <select
                                    id="contact-type"
                                    v-model="form.type"
                                    required
                                    class="w-full rounded-lg border-2 border-red-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
                                >
                                    <option value="feedback">Feedback</option>
                                    <option value="complaint">Complaint</option>
                                </select>
                                <p v-if="form.errors.type" class="mt-1 text-sm text-red-600">{{ form.errors.type }}</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="contact-message">Message *</label>
                                <textarea
                                    id="contact-message"
                                    v-model="form.feedback_text"
                                    rows="6"
                                    required
                                    class="w-full rounded-lg border-2 border-red-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
                                />
                                <p v-if="form.errors.feedback_text" class="mt-1 text-sm text-red-600">{{ form.errors.feedback_text }}</p>
                            </div>

                            <button
                                type="submit"
                                class="w-full rounded-lg bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition disabled:opacity-60"
                                :disabled="form.processing"
                            >
                                {{ form.processing ? 'Sending...' : 'Send message' }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map section -->
        <div class="w-full h-100 lg:h-112.5">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.253968214654!2d85.03825427628891!3d27.430194776342535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb498a19884d83%3A0x541201edeacfac07!2sENSSURE%20Provincial%20Office%20Hetauda!5e0!3m2!1sen!2snp!4v1772767736537!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="ENSSURE Office Map"
            />
        </div>

        <!-- Province Contacts Section – Editorial grid layout -->
        <section class="py-16 lg:py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Section header -->
                <div class="flex items-center gap-4 mb-10">
                    <div class="h-px flex-1 bg-red-200" />
                    <div class="flex items-center gap-2 px-4 py-1.5 border border-red-200 rounded-full">
                        <Building class="h-4 w-4 text-red-600" />
                        <span class="text-sm font-semibold text-red-600 uppercase tracking-widest">Provincial Offices</span>
                    </div>
                    <div class="h-px flex-1 bg-red-200" />
                </div>

                <!-- Province grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div
                        v-for="(contact, index) in provinceContacts"
                        :key="contact.province"
                        class="group relative p-6 hover:bg-red-50 transition-colors duration-200"
                    >
                        <!-- Accent bar on hover -->
                        <div class="absolute left-0 top-0 h-full w-0.5 bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />

                        <p class="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">{{ contact.province }}</p>
                        <div class="space-y-1.5">
                            <a
                                :href="`tel:${contact.phone}`"
                                class="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
                            >
                                <Phone class="h-3.5 w-3.5 shrink-0 text-gray-400 group-hover:text-red-500" />
                                <span>{{ contact.phone }}</span>
                            </a>
                            <div v-if="contact.address" class="flex items-start gap-2 text-sm text-gray-500 mt-1">
                                <MapPin class="h-3.5 w-3.5 shrink-0 text-gray-400 group-hover:text-red-500" />
                                <span>{{ contact.address }}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    </GuestLayout>
</template>
