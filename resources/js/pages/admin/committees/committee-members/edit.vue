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
    committeeMember: {
        type: Object,
        required: true,
    },
    committee: {
        type: Object,
        required: true,
    },
});

const form = useForm({
    name: props.committeeMember.name ?? '',
    position: props.committeeMember.position ?? '',
    bio: props.committeeMember.bio ?? '',
    image: null,
    order: props.committeeMember.order ?? 0,
    _method: 'put',
});

const breadcrumbItems = [
    { title: 'Committees', href: '/admin/committees' },
    { title: props.committee.name, href: `/admin/committees/${props.committee.id}/edit` },
    { title: 'Edit member', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit committee member" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit committee member"
                    :description="`Committee: ${props.committee.name}`"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.post(`/admin/committee-members/${committeeMember.id}`, { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="position">Position</Label>
                        <Input id="position" v-model="form.position" type="text" />
                        <InputError :message="form.errors.position" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="bio">Bio</Label>
                        <textarea
                            id="bio"
                            v-model="form.bio"
                            rows="4"
                            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                        <InputError :message="form.errors.bio" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image</Label>
                        <div v-if="committeeMember.image_url" class="mb-2">
                            <img
                                :src="committeeMember.image_url"
                                alt="Current"
                                class="h-24 w-auto rounded border object-cover"
                            />
                            <p class="mt-1 text-xs text-muted-foreground">
                                Current image. Choose a new file to replace.
                            </p>
                        </div>
                        <div class="max-w-md">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="form.image = $event.target.files?.[0] || null"
                            />
                        </div>
                        <InputError :message="form.errors.image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="order">Order</Label>
                        <Input
                            id="order"
                            v-model.number="form.order"
                            type="number"
                            min="0"
                        />
                        <InputError :message="form.errors.order" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save
                        </Button>
                        <Link
                            :href="`/admin/committees/${props.committee.id}/edit`"
                            class="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            Back to committee
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
