<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    event: { type: Object, required: true },
});

const form = useForm({
    title: props.event.title ?? '',
    slug: props.event.slug ?? '',
    event_type: props.event.event_type ?? '',
    venue: props.event.venue ?? '',
});

const registrationForm = useForm({
    name: '',
    email: '',
    phone: '',
    status: 'pending',
});

function addRegistration() {
    registrationForm.post(`/admin/events/${props.event.id}/registrations`);
}

function removeRegistration(registrationId) {
    if (confirm('Remove this registration?')) {
        router.delete(`/admin/event-registrations/${registrationId}`);
    }
}

const breadcrumbItems = [
    { title: 'Events', href: '/admin/events' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit event" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit event" :description="event.title" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/events/${event.id}`)">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" required />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="event_type">Event type</Label>
                        <Input id="event_type" v-model="form.event_type" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="venue">Venue</Label>
                        <Input id="venue" v-model="form.venue" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/events">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Registrations</span>
                        <p class="text-sm text-muted-foreground">
                            Add registrations or edit and remove existing ones.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form
                            class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2"
                            @submit.prevent="addRegistration"
                        >
                            <div>
                                <Label for="reg_name">New registration – Name</Label>
                                <Input
                                    id="reg_name"
                                    v-model="registrationForm.name"
                                    type="text"
                                    required
                                    class="mt-1"
                                />
                                <InputError :message="registrationForm.errors.name" />
                            </div>
                            <div>
                                <Label for="reg_email">Email</Label>
                                <Input
                                    id="reg_email"
                                    v-model="registrationForm.email"
                                    type="email"
                                    required
                                    class="mt-1"
                                />
                                <InputError :message="registrationForm.errors.email" />
                            </div>
                            <div>
                                <Label for="reg_phone">Phone</Label>
                                <Input
                                    id="reg_phone"
                                    v-model="registrationForm.phone"
                                    type="text"
                                    class="mt-1"
                                />
                                <InputError :message="registrationForm.errors.phone" />
                            </div>
                            <div>
                                <Label for="reg_status">Status</Label>
                                <select
                                    id="reg_status"
                                    v-model="registrationForm.status"
                                    class="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <InputError :message="registrationForm.errors.status" />
                            </div>
                            <div class="sm:col-span-2">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    :disabled="registrationForm.processing"
                                >
                                    Add registration
                                </Button>
                            </div>
                        </form>

                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="r in (event.registrations || [])"
                                :key="r.id"
                                class="flex flex-wrap items-center justify-between gap-4 py-3"
                            >
                                <div>
                                    <span class="text-sm font-medium">{{ r.name }}</span>
                                    <span class="ml-2 text-xs text-muted-foreground">{{ r.email }}</span>
                                    <span v-if="r.status" class="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">{{ r.status }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/event-registrations/${r.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        @click="removeRegistration(r.id)"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(event.registrations || []).length"
                                class="py-6 text-center text-sm text-muted-foreground"
                            >
                                No registrations yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
