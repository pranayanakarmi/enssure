<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    title: '',
    slug: '',
    event_type: '',
    start_date: '',
    end_date: '',
    venue: '',
});

const breadcrumbItems = [
    { title: 'Events', href: '/admin/events' },
    { title: 'Create', href: '/admin/events/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create event" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create event" description="Add a new event" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/events')">
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
                        <Label for="start_date">Start date</Label>
                        <Input id="start_date" v-model="form.start_date" type="datetime-local" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="venue">Venue</Label>
                        <Input id="venue" v-model="form.venue" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/events">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
