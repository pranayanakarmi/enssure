<script setup>
import { Form, Head, Link } from '@inertiajs/vue3';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
    roles: {
        type: Array,
        default: () => [],
    },
});

const breadcrumbItems = [
    { title: 'Users', href: '/admin/users' },
    { title: 'Create user', href: '/admin/users/create' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create user" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Create user"
                    description="Add a new user and assign roles"
                />

                <Form
                    v-bind="UserController.store.form.post()"
                    class="space-y-6"
                    v-slot="{ errors, processing }"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autocomplete="name"
                            placeholder="Full name"
                        />
                        <InputError :message="errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autocomplete="email"
                            placeholder="email@example.com"
                        />
                        <InputError :message="errors.email" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autocomplete="new-password"
                            placeholder="Password"
                        />
                        <InputError :message="errors.password" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            autocomplete="new-password"
                            placeholder="Confirm password"
                        />
                        <InputError :message="errors.password_confirmation" />
                    </div>

                    <div class="grid gap-2">
                        <Label>Roles</Label>
                        <div class="flex flex-wrap gap-4">
                            <label
                                v-for="role in (roles || [])"
                                :key="role"
                                class="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    :name="'roles[]'"
                                    :value="role"
                                    class="rounded border-sidebar-border"
                                />
                                <span class="text-sm">{{ role }}</span>
                            </label>
                        </div>
                        <InputError :message="errors.roles" />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="processing">
                            Create user
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/users">Cancel</Link>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    </AppLayout>
</template>
