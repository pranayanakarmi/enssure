<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    title: '',
    url: '',
    order: 0,
    is_published: true,
});

const breadcrumbItems = [
    { title: 'News Ticker', href: '/admin/news_ticker_items' },
    { title: 'Create', href: '/admin/news_ticker_items/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create news ticker item" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create ticker item" description="Add a news ticker headline" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/news_ticker_items')">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input id="title" v-model="form.title" type="text" required />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="url">URL (optional)</Label>
                        <Input id="url" v-model="form.url" type="url" placeholder="https://..." />
                        <InputError :message="form.errors.url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="order">Order</Label>
                        <Input id="order" v-model.number="form.order" type="number" min="0" />
                        <InputError :message="form.errors.order" />
                    </div>
                    <div class="flex items-center gap-2">
                        <Checkbox id="is_published" v-model:checked="form.is_published" />
                        <Label for="is_published" class="text-sm font-normal">Published</Label>
                    </div>
                    <InputError :message="form.errors.is_published" />
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/news_ticker_items">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
