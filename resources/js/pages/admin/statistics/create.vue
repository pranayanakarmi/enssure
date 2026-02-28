<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    stat_key: '',
    stat_label: '',
    stat_value: '',
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Statistics', href: '/admin/statistics' },
    { title: 'Create', href: '/admin/statistics/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create statistic" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create statistic"
                    description="Add a new statistic counter"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/statistics')"
                >
                    <div class="grid gap-2">
                        <Label for="stat_key">Key (unique)</Label>
                        <Input
                            id="stat_key"
                            v-model="form.stat_key"
                            type="text"
                            required
                            placeholder="e.g. total_beneficiaries"
                        />
                        <InputError :message="form.errors.stat_key" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="stat_label">Label</Label>
                        <Input
                            id="stat_label"
                            v-model="form.stat_label"
                            type="text"
                            placeholder="Display label"
                        />
                        <InputError :message="form.errors.stat_label" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="stat_value">Value</Label>
                        <Input
                            id="stat_value"
                            v-model="form.stat_value"
                            type="text"
                            placeholder="e.g. 1000 or 50+"
                        />
                        <InputError :message="form.errors.stat_value" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create statistic
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/statistics">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
