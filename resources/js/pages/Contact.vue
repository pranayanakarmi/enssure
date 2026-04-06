<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, User, Building, X } from 'lucide-vue-next';

const props = defineProps({
    contactFeedbackContent: {
        type: Object,
        default: () => ({
            title: 'We’d love to hear from you',
            description: 'Fill out the form and we’ll get back to you within 24 hours.',
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

// Contact information
const contactInfo = {
    address: 'ENSSURE Provincial Office, Hetauda, Nepal',
    phone: '+977 1 1234567',
    email: 'info@enssure.org.np',
    hours: 'Mon - Fri: 9:00 AM – 5:00 PM',
    social: {
        facebook: 'https://facebook.com/enssure',
        twitter: 'https://twitter.com/enssure',
        linkedin: 'https://linkedin.com/company/enssure',
        instagram: 'https://instagram.com/enssure',
    },
};

// Modal state for province contacts
const selectedProvince = ref(null);

function openProvinceModal(province) {
    selectedProvince.value = province;
}

function closeProvinceModal() {
    selectedProvince.value = null;
}
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
                        <p class="text-gray-600 mb-8 text-lg">{{ contactFeedbackContent.description || 'We’d love to hear from you. Send us a message and we’ll respond as soon as possible.' }}</p>

                        <div class="space-y-6">
                            <div class="flex items-start gap-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <MapPin class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Visit us</h3>
                                    <p class="text-gray-600">{{ contactInfo.address }}</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <Phone class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Call us</h3>
                                    <p class="text-gray-600">{{ contactInfo.phone }}</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <Mail class="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Email us</h3>
                                    <p class="text-gray-600">{{ contactInfo.email }}</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
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
                                <a :href="contactInfo.social.facebook" target="_blank" class="text-gray-500 hover:text-red-600 transition">
                                    <Facebook class="h-5 w-5" />
                                </a>
                                <a :href="contactInfo.social.twitter" target="_blank" class="text-gray-500 hover:text-red-600 transition">
                                    <Twitter class="h-5 w-5" />
                                </a>
                                <a :href="contactInfo.social.linkedin" target="_blank" class="text-gray-500 hover:text-red-600 transition">
                                    <Linkedin class="h-5 w-5" />
                                </a>
                                <a :href="contactInfo.social.instagram" target="_blank" class="text-gray-500 hover:text-red-600 transition">
                                    <Instagram class="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Right column: Contact form -->
                    <div class="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
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
                                    class="w-full rounded-lg border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
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
                                    class="w-full rounded-lg border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
                                />
                                <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="contact-type">Type</label>
                                <select
                                    id="contact-type"
                                    v-model="form.type"
                                    required
                                    class="w-full rounded-lg border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
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
                                    class="w-full rounded-lg border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:ring-red-500"
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
        <div class="w-full h-[400px] lg:h-[450px]">
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

        <!-- Province Contacts Section – Horizontal scrollable cards + Modal -->
        <section class="py-16 lg:py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <div class="inline-flex items-center justify-center px-4 py-1.5 bg-red-50 rounded-full mb-4">
                        <span class="text-sm font-semibold text-red-600 uppercase tracking-wide">Province Contacts</span>
                    </div>
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900">Reach out to our provincial teams</h2>
                    <p class="text-gray-600 mt-4 max-w-2xl mx-auto">Click on any province card to view contact details.</p>
                </div>

                <!-- Horizontal scrollable row -->
                <div class="overflow-x-auto pb-4">
                    <div class="flex gap-4 justify-start">
                        <div
                            v-for="contact in provinceContacts"
                            :key="contact.province"
                            class="flex-shrink-0 w-48 bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition"
                            @click="openProvinceModal(contact)"
                        >
                            <div class="flex flex-col items-center text-center">
                                <div class="bg-red-100 p-2 rounded-full mb-2">
                                    <Building class="h-5 w-5 text-red-600" />
                                </div>
                                <h3 class="font-semibold text-gray-900 text-sm">{{ contact.province }}</h3>
                                <p class="text-xs text-gray-500 mt-1">Click for details</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal for selected province -->
                <div
                    v-if="selectedProvince"
                    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    @click.self="closeProvinceModal"
                >
                    <div class="bg-white rounded-xl max-w-md w-full p-6 relative">
                        <button
                            @click="closeProvinceModal"
                            class="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <X class="h-5 w-5" />
                        </button>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="bg-red-100 p-2 rounded-lg">
                                <Building class="h-6 w-6 text-red-600" />
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">{{ selectedProvince.province }}</h3>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <User class="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p class="font-medium text-gray-900">{{ selectedProvince.name }}</p>
                                    <p class="text-sm text-gray-500">{{ selectedProvince.position }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <Phone class="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <a :href="`tel:${selectedProvince.phone}`" class="text-gray-600 hover:text-red-600 text-sm">{{ selectedProvince.phone }}</a>
                            </div>
                            <div class="flex items-center gap-3">
                                <Mail class="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <a :href="`mailto:${selectedProvince.email}`" class="text-gray-600 hover:text-red-600 text-sm break-all">{{ selectedProvince.email }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </GuestLayout>
</template>
