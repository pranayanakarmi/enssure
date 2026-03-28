<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    title: '',
    slug: '',
});

const breadcrumbItems = [
    { title: 'Infographics Page', href: '#' },
    { title: 'Infographics', href: '/admin/infographics' },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create infographic" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create infographic" description="Add a new infographic section" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/infographics', { forceFormData: true })">
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="Public name for this infographic"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="slug">Slug</Label>
                        <Input
                            id="slug"
                            v-model="form.slug"
                            type="text"
                            required
                            placeholder="e.g. youth-outcomes"
                        />
                        <p class="text-xs text-muted-foreground">
                            Used in the public URL: /infographics/your-slug
                        </p>
                        <InputError :message="form.errors.slug" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/infographics">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
