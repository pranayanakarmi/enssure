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
    key: '',
    value: '',
    type: '',
    group: '',
});

const breadcrumbItems = [
    { title: 'Settings', href: '/admin/settings' },
    { title: 'Create', href: '/admin/settings/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create setting" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create setting" description="Add a new setting" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/settings')">
                    <div class="grid gap-2">
                        <Label for="key">Key</Label>
                        <Input id="key" v-model="form.key" type="text" required />
                        <InputError :message="form.errors.key" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="value">Value</Label>
                        <Input id="value" v-model="form.value" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="group">Group</Label>
                        <Input id="group" v-model="form.group" type="text" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/settings">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
