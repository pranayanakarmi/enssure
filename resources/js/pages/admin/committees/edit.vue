<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { useForm } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    committee: { type: Object, required: true },
});

const form = useForm({
    name: props.committee.name ?? '',
    committee_type: props.committee.committee_type ?? '',
    description: props.committee.description ?? '',
    formation_date: props.committee.formation_date ?? '',
});

const memberForm = useForm({
    name: '',
    position: '',
    bio: '',
    image: null,
    order: (props.committee.members || []).length,
});

function addMember() {
    memberForm.post(`/admin/committees/${props.committee.id}/members`, { forceFormData: true });
}

function removeMember(memberId) {
    if (confirm('Remove this committee member?')) {
        router.delete(`/admin/committee-members/${memberId}`);
    }
}

const breadcrumbItems = [
    { title: 'Committees', href: '/admin/committees' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit committee" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit committee" :description="committee.name" />
                <form class="space-y-6" @submit.prevent="form.put(`/admin/committees/${committee.id}`)">
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="committee_type">Type</Label>
                        <Input id="committee_type" v-model="form.committee_type" type="text" />
                        <InputError :message="form.errors.committee_type" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <Input id="description" v-model="form.description" type="text" />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="formation_date">Formation date</Label>
                        <Input id="formation_date" v-model="form.formation_date" type="date" />
                        <InputError :message="form.errors.formation_date" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/committees">Back</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <span class="font-medium">Committee members</span>
                        <p class="text-sm text-muted-foreground">
                            Add members or edit and remove existing ones.
                        </p>
                    </CardHeader>
                    <CardContent class="space-y-6 p-6">
                        <form
                            class="grid gap-4 rounded-lg border border-sidebar-border p-4 sm:grid-cols-2"
                            @submit.prevent="addMember"
                        >
                            <div>
                                <Label for="member_name">New member – Name</Label>
                                <Input
                                    id="member_name"
                                    v-model="memberForm.name"
                                    type="text"
                                    required
                                    class="mt-1"
                                />
                                <InputError :message="memberForm.errors.name" />
                            </div>
                            <div>
                                <Label for="member_position">Position</Label>
                                <Input
                                    id="member_position"
                                    v-model="memberForm.position"
                                    type="text"
                                    class="mt-1"
                                />
                                <InputError :message="memberForm.errors.position" />
                            </div>
                            <div class="sm:col-span-2">
                                <Label for="member_bio">Bio</Label>
                                <textarea
                                    id="member_bio"
                                    v-model="memberForm.bio"
                                    rows="2"
                                    class="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                                <InputError :message="memberForm.errors.bio" />
                            </div>
                            <div>
                                <Label for="member_image">Image</Label>
                                <div class="mt-1 max-w-md">
                                    <input
                                        id="member_image"
                                        type="file"
                                        accept="image/*"
                                        class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                        @change="memberForm.image = $event.target.files?.[0] || null"
                                    />
                                </div>
                                <InputError :message="memberForm.errors.image" />
                            </div>
                            <div>
                                <Label for="member_order">Order</Label>
                                <Input
                                    id="member_order"
                                    v-model.number="memberForm.order"
                                    type="number"
                                    min="0"
                                    class="mt-1"
                                />
                                <InputError :message="memberForm.errors.order" />
                            </div>
                            <div class="sm:col-span-2">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    :disabled="memberForm.processing"
                                >
                                    Add member
                                </Button>
                            </div>
                        </form>

                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="m in (committee.members || [])"
                                :key="m.id"
                                class="flex flex-wrap items-center justify-between gap-4 py-3"
                            >
                                <span class="text-sm font-medium">{{ m.name }}</span>
                                <span v-if="m.position" class="text-xs text-muted-foreground">{{ m.position }}</span>
                                <div class="flex items-center gap-2">
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/committee-members/${m.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        @click="removeMember(m.id)"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!(committee.members || []).length"
                                class="py-6 text-center text-sm text-muted-foreground"
                            >
                                No members yet. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
