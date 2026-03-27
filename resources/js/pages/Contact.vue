<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import PageHero from '@/components/guest/PageHero.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const props = defineProps({
    contactFeedbackContent: {
        type: Object,
        default: () => ({
            title: '',
            description: '',
        }),
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

const partnerLogos = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];
</script>

<template>
    <GuestLayout>
        <Head title="Contact Us - ENSSURE" />

        <PageHero title="Contact Us" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex gap-5 flex-col lg:flex-row">
                    <div class="flex flex-col w-full">
                        <h1 class="text-4xl font-semibold mb-4 text-black leading-[1.1] whitespace-pre-line">
                            {{ contactFeedbackContent.title }}
                        </h1>
                        <p
                            v-if="contactFeedbackContent.description"
                            class="text-[18px] leading-relaxed text-gray-800 max-w-md"
                        >
                            {{ contactFeedbackContent.description }}
                        </p>
                    </div>

                    <form class="space-y-6 w-full" @submit.prevent="submitFeedback">
                        <p
                            v-if="flashSuccess"
                            class="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                            role="status"
                        >
                            {{ flashSuccess }}
                        </p>
                        <div>
                            <label class="block text-[15px] font-semibold mb-2 text-gray-900" for="contact-name">Full Name (Optional)</label>
                            <input
                                id="contact-name"
                                v-model="form.name"
                                type="text"
                                autocomplete="name"
                                class="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#B91C1C] bg-white"
                            />
                            <p v-if="form.errors.name" class="mt-1 text-sm text-red-600">{{ form.errors.name }}</p>
                        </div>
                        <div>
                            <label class="block text-[15px] font-semibold mb-2 text-gray-900" for="contact-email">Email</label>
                            <input
                                id="contact-email"
                                v-model="form.email"
                                type="email"
                                required
                                autocomplete="email"
                                class="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#B91C1C] bg-white"
                            />
                            <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
                        </div>
                        <div>
                            <label class="block text-[15px] font-semibold mb-2 text-gray-900" for="contact-type">Type</label>
                            <select
                                id="contact-type"
                                v-model="form.type"
                                required
                                class="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#B91C1C] bg-white"
                            >
                                <option value="feedback">Feedback</option>
                                <option value="complaint">Complaint</option>
                            </select>
                            <p v-if="form.errors.type" class="mt-1 text-sm text-red-600">{{ form.errors.type }}</p>
                        </div>
                        <div>
                            <label class="block text-[15px] font-semibold mb-2 text-gray-900" for="contact-message">Feedback/Complaint</label>
                            <textarea
                                id="contact-message"
                                v-model="form.feedback_text"
                                rows="8"
                                required
                                class="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-[#B91C1C] bg-white"
                            />
                            <p v-if="form.errors.feedback_text" class="mt-1 text-sm text-red-600">{{ form.errors.feedback_text }}</p>
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-[#A3D121] hover:bg-[#92bc1d] disabled:opacity-60 text-white font-bold py-4 uppercase tracking-widest text-sm transition-all duration-200 rounded-sm"
                            :disabled="form.processing"
                        >
                            {{ form.processing ? 'Submitting…' : 'Submit' }}
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <div class="w-full h-[500px] border-t border-gray-200">
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

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <div class="mb-6 flex justify-center">
                        <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                            <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Our Partners</span>
                        </div>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                        We work with the best Partners
                    </h2>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    <div
                        v-for="(logo, i) in partnerLogos"
                        :key="i"
                        class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors"
                    >
                        <img :src="logo" alt="Partner logo" class="max-w-[190px] max-h-[80px] object-contain" />
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 text-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                    <span class="font-semibold text-[#B91C1C] uppercase tracking-wide">Support</span>
                </div>
                <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] my-4">
                    Technical Assistance By
                </h2>
                <div class="flex justify-center">
                    <img src="/enssure/assets/c3f97e1b17044bbdeedac32a3818731e2450a527.png" alt="Technical Assistance By" class="h-16" />
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
