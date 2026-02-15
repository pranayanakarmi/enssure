<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    role: {
        type: Object,
        required: true,
    },
    permissions: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    name: props.role.name,
    permissions: [...(props.role.permissions || [])],
});

const breadcrumbItems = computed(() => [
    { title: 'Roles', href: '/admin/roles' },
    { title: 'Edit role', href: `/admin/roles/${props.role?.id}/edit` },
]);

function submit() {
    form.patch(`/admin/roles/${props.role.id}`);
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="`Edit ${role?.name}`" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit role"
                    :description="`Update the ${role?.name} role and its permissions`"
                />

                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                            placeholder="Role name"
                        />
                        <InputError :message="form.errors.name" />
                    </div>

                    <div v-if="permissions.length" class="grid gap-2">
                        <Label>Permissions</Label>
                        <div class="flex flex-wrap gap-4">
                            <label
                                v-for="perm in permissions"
                                :key="perm"
                                class="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    :value="perm"
                                    v-model="form.permissions"
                                    class="rounded border-sidebar-border"
                                />
                                <span class="text-sm">{{ perm }}</span>
                            </label>
                        </div>
                        <InputError :message="form.errors.permissions" />
                    </div>

                    <p v-else class="text-sm text-muted-foreground">
                        No permissions have been created yet. Permissions can be added programmatically.
                    </p>

                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Update role
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/roles">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
