<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    redirect: { type: Object, required: true },
});

const form = useForm({
    old_url: props.redirect.old_url ?? '',
    new_url: props.redirect.new_url ?? '',
    status_code: props.redirect.status_code ?? 301,
});

const breadcrumbItems = [
    { title: 'Redirects', href: '/admin/redirects' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit redirect" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit redirect" :description="redirect.old_url" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/redirects/${redirect.id}`)">
                    <div class="grid gap-2">
                        <Label for="old_url">Old URL</Label>
                        <Input id="old_url" v-model="form.old_url" type="text" required />
                        <InputError :message="form.errors.old_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="new_url">New URL</Label>
                        <Input id="new_url" v-model="form.new_url" type="text" required />
                        <InputError :message="form.errors.new_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="status_code">Status code</Label>
                        <Input id="status_code" v-model="form.status_code" type="number" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/redirects">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
