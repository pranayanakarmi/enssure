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
    statistic: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    stat_key: props.statistic.stat_key ?? '',
    stat_label: props.statistic.stat_label ?? '',
    stat_value: props.statistic.stat_value ?? '',
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Statistics', href: '/admin/statistics' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit statistic" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit statistic"
                    :description="statistic.stat_key"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/statistics/${statistic.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="stat_key">Key (unique)</Label>
                        <Input
                            id="stat_key"
                            v-model="form.stat_key"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.stat_key" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="stat_label">Label</Label>
                        <Input
                            id="stat_label"
                            v-model="form.stat_label"
                            type="text"
                        />
                        <InputError :message="form.errors.stat_label" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="stat_value">Value</Label>
                        <Input
                            id="stat_value"
                            v-model="form.stat_value"
                            type="text"
                        />
                        <InputError :message="form.errors.stat_value" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save statistic
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/statistics">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
