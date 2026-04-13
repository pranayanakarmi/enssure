<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Clock, Users, Mail, Phone, User } from 'lucide-vue-next';
import { computed } from 'vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { index as eventsIndex, show as eventShow } from '@/routes/events';

const props = defineProps({
    event: {
        type: Object,
        required: true,
    },
    relatedEvents: {
        type: Array,
        default: () => [],
    },
});

function formatDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const isUpcoming = computed(() => {
    if (!props.event.start_date) return false;
    return new Date(props.event.start_date) > new Date();
});
</script>

<template>
    <GuestLayout>
        <Head :title="`${event.title} - Events - KMH-IHS Academics`" />

        <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-8">
                    <Link
                        :href="eventsIndex().url"
                        class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#B91C1C] transition-colors"
                    >
                        <ArrowLeft class="w-4 h-4" />
                        Back to Events
                    </Link>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div class="lg:col-span-2">
                        <div class="mb-6">
                            <span
                                v-if="event.event_type"
                                class="inline-block text-sm uppercase font-semibold tracking-wide mb-3 px-3 py-1 rounded-full"
                                :class="isUpcoming ? 'text-[#B91C1C] bg-[rgba(235,31,39,0.1)]' : 'text-gray-500 bg-gray-100'"
                            >
                                {{ event.event_type }}
                            </span>
                            <h1 class="text-3xl lg:text-4xl font-semibold text-[#101010] leading-tight">
                                {{ event.title }}
                            </h1>
                        </div>

                        <div
                            v-if="event.description"
                            class="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                            v-html="event.description"
                        />
                    </div>

                    <aside class="space-y-6">
                        <div class="border border-[#cad0d8] rounded-2xl p-6">
                            <h2 class="font-semibold text-gray-900 text-lg mb-4">Event Details</h2>
                            <dl class="space-y-4">
                                <div v-if="event.start_date" class="flex items-start gap-3">
                                    <Calendar class="w-5 h-5 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Date</dt>
                                        <dd class="text-sm text-gray-800">
                                            {{ formatDate(event.start_date) }}
                                            <template v-if="event.end_date && event.end_date !== event.start_date">
                                                – {{ formatDate(event.end_date) }}
                                            </template>
                                        </dd>
                                    </div>
                                </div>
                                <div v-if="event.venue" class="flex items-start gap-3">
                                    <MapPin class="w-5 h-5 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Venue</dt>
                                        <dd class="text-sm text-gray-800">
                                            {{ event.venue }}
                                            <span v-if="event.address" class="block text-gray-500">{{ event.address }}</span>
                                        </dd>
                                    </div>
                                </div>
                                <div v-if="event.organizer" class="flex items-start gap-3">
                                    <User class="w-5 h-5 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Organizer</dt>
                                        <dd class="text-sm text-gray-800">{{ event.organizer }}</dd>
                                    </div>
                                </div>
                                <div v-if="event.registration_required && event.registration_deadline" class="flex items-start gap-3">
                                    <Clock class="w-5 h-5 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Registration Deadline</dt>
                                        <dd class="text-sm text-gray-800">{{ formatDate(event.registration_deadline) }}</dd>
                                    </div>
                                </div>
                                <div v-if="event.max_participants" class="flex items-start gap-3">
                                    <Users class="w-5 h-5 text-[#B91C1C] mt-0.5 shrink-0" />
                                    <div>
                                        <dt class="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-0.5">Capacity</dt>
                                        <dd class="text-sm text-gray-800">{{ event.max_participants }} participants</dd>
                                    </div>
                                </div>
                            </dl>
                        </div>

                        <div
                            v-if="event.contact_person || event.contact_email || event.contact_phone"
                            class="border border-[#cad0d8] rounded-2xl p-6"
                        >
                            <h2 class="font-semibold text-gray-900 text-lg mb-4">Contact</h2>
                            <dl class="space-y-3">
                                <div v-if="event.contact_person" class="flex items-center gap-3">
                                    <User class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                    <dd class="text-sm text-gray-800">{{ event.contact_person }}</dd>
                                </div>
                                <div v-if="event.contact_email" class="flex items-center gap-3">
                                    <Mail class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                    <a
                                        :href="`mailto:${event.contact_email}`"
                                        class="text-sm text-gray-800 hover:text-[#B91C1C] transition-colors"
                                    >
                                        {{ event.contact_email }}
                                    </a>
                                </div>
                                <div v-if="event.contact_phone" class="flex items-center gap-3">
                                    <Phone class="w-4 h-4 text-[#B91C1C] shrink-0" />
                                    <a
                                        :href="`tel:${event.contact_phone}`"
                                        class="text-sm text-gray-800 hover:text-[#B91C1C] transition-colors"
                                    >
                                        {{ event.contact_phone }}
                                    </a>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <section v-if="relatedEvents.length > 0" class="py-20 lg:py-24 bg-gray-50 border-b border-[#cad0d8]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-10">
                    <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full mb-4">
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">More Events</span>
                    </div>
                    <h2 class="text-2xl font-semibold text-[#101010]">Other Events &amp; Trainings</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link
                        v-for="e in relatedEvents"
                        :key="e.id"
                        :href="eventShow(e).url"
                        class="group block border border-[#cad0d8] rounded-2xl p-6 bg-white hover:border-[#B91C1C] transition-colors"
                    >
                        <div class="flex items-center gap-2 mb-2">
                            <Calendar class="w-4 h-4 text-[#B91C1C]" />
                            <span class="text-sm text-gray-500">{{ formatDate(e.start_date) }}</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 group-hover:text-[#B91C1C] transition-colors leading-snug mb-3">
                            {{ e.title }}
                        </h3>
                        <span class="inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C]">
                            View details <ArrowRight class="w-4 h-4" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    </GuestLayout>
</template>
