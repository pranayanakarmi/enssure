<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, Tag, Type } from 'lucide-vue-next';

const props = defineProps({
    homePartnersSection: { type: Object, default: null },
});

const section = computed(() => props.homePartnersSection ?? {
    id: null,
    badge_text: '',
    title: '',
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    _method: 'put',
});

function submitForm() {
    form.put('/admin/home-partners-section');
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Partners Section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Partners Section" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Partners Section</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Edit badge and title for the partners block.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Tag class="h-3.5 w-3.5" />Section Header
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold flex items-center gap-2">
                        <Type class="h-4 w-4" /> Section Content
                    </CardTitle>
                    <CardDescription class="text-xs">Update the badge text and title for the partners section.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="submitForm">

                        <!-- Badge text -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="badge_text" class="text-xs font-medium flex items-center gap-1.5">
                                <Tag class="h-3 w-3" />Badge Text
                            </Label>
                            <Input id="badge_text" v-model="form.badge_text" class="h-9 text-sm" placeholder="e.g. Our Partners" />
                            <InputError :message="form.errors.badge_text" />
                        </div>

                        <!-- Title (textarea) -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title</Label>
                            <textarea
                                id="title"
                                v-model="form.title"
                                rows="3"
                                class="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                                placeholder="Section title (e.g. We work with the best Partners)"
                            />
                            <InputError :message="form.errors.title" />
                        </div>

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Saving…' : 'Save Changes' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
