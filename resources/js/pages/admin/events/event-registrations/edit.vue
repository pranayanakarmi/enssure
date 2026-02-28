<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    eventRegistration: {
        type: Object,
        required: true,
    },
    event: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: props.eventRegistration.name ?? '',
    email: props.eventRegistration.email ?? '',
    phone: props.eventRegistration.phone ?? '',
    status: props.eventRegistration.status ?? 'pending',
});

const breadcrumbItems = [
    { title: 'Events', href: '/admin/events' },
    { title: props.event.title, href: `/admin/events/${props.event.id}/edit` },
    { title: 'Edit registration', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit event registration" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit event registration"
                    :description="`Event: ${event.title}`"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/event-registrations/${eventRegistration.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" v-model="form.email" type="email" required />
                        <InputError :message="form.errors.email" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="phone">Phone</Label>
                        <Input id="phone" v-model="form.phone" type="text" />
                        <InputError :message="form.errors.phone" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status">Status</Label>
                        <select
                            id="status"
                            v-model="form.status"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <InputError :message="form.errors.status" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Link
                            :href="`/admin/events/${event.id}/edit`"
                            class="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            Back to event
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
