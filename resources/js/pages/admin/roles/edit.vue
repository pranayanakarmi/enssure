<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import RolePermissionGroups from '@/components/admin/RolePermissionGroups.vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    role: {
        type: Object,
        required: true,
    },
    permission_groups: {
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

                <form
                    class="space-y-8"
                    @submit.prevent="submit"
                >
                    <section class="space-y-3">
                        <div>
                            <h2 class="text-sm font-semibold text-foreground">
                                Role details
                            </h2>
                            <p class="mt-0.5 text-sm text-muted-foreground">
                                Internal name used across the admin (e.g. editor, moderator).
                            </p>
                        </div>
                        <div class="max-w-md grid gap-2">
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                v-model="form.name"
                                type="text"
                                required
                                placeholder="Role name"
                                autocomplete="off"
                            />
                            <InputError :message="form.errors.name" />
                        </div>
                    </section>

                    <Separator />

                    <section class="space-y-3">
                        <RolePermissionGroups
                            v-model="form.permissions"
                            :permission-groups="permission_groups"
                        />
                        <InputError :message="form.errors.permissions" />
                    </section>

                    <div class="flex flex-wrap items-center gap-3 border-t border-border/80 pt-6">
                        <Button
                            type="submit"
                            :disabled="form.processing"
                        >
                            Update role
                        </Button>
                        <Button
                            variant="outline"
                            as-child
                        >
                            <Link href="/admin/roles">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
