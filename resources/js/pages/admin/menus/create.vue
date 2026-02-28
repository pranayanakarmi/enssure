<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/AppLayout.vue';

const form = useForm({
    name: '',
    is_published: true,
    is_main_header_menu: false,
});

const breadcrumbItems = [
    { title: 'Menus', href: '/admin/menus' },
    { title: 'Create', href: '/admin/menus/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create menu" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create menu"
                    description="Add a new menu"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post('/admin/menus')"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="flex flex-wrap items-center gap-6">
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="is_published"
                                :checked="form.is_published"
                                @update:checked="form.is_published = $event"
                            />
                            <Label for="is_published" class="cursor-pointer font-normal">Publish</Label>
                        </div>
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="is_main_header_menu"
                                :checked="form.is_main_header_menu"
                                @update:checked="form.is_main_header_menu = $event"
                            />
                            <Label for="is_main_header_menu" class="cursor-pointer font-normal">Main header menu</Label>
                        </div>
                    </div>
                    <InputError :message="form.errors.is_published" />
                    <InputError :message="form.errors.is_main_header_menu" />
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Create
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/menus">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
