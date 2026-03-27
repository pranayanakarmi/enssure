<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { Trash2 } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm';

const props = defineProps({
    teamMember: { type: Object, required: true },
    locationOptions: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    type: props.teamMember.type ?? 'staff',
    name: props.teamMember.name ?? '',
    job_title: props.teamMember.job_title ?? '',
    department: props.teamMember.department ?? '',
    location: props.teamMember.location ?? '',
    photo: null,
    remove_photo: false,
    facebook_url: props.teamMember.social_links?.facebook ?? '',
    twitter_url: props.teamMember.social_links?.twitter ?? '',
});

const photoPreviewUrl = ref(null);

function onPhotoChange(event) {
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value);
        photoPreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.photo = file;
    form.remove_photo = false;
    if (file) {
        photoPreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value);
    }
});

const photoDisplayUrl = computed(() => {
    if (form.remove_photo) return null;
    return photoPreviewUrl.value ?? props.teamMember.photo_url ?? null;
});

const photoInputRef = ref(null);

function removePhoto() {
    form.remove_photo = true;
    form.photo = null;
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value);
        photoPreviewUrl.value = null;
    }
    if (photoInputRef.value) {
        photoInputRef.value.value = '';
    }
}

const backHref = computed(() => (props.teamMember.type === 'executive_committee'
    ? '/admin/team_members/executive'
    : '/admin/team_members/staff'));

const listTitle = computed(() => (props.teamMember.type === 'executive_committee'
    ? 'Executive Committee'
    : 'Staff'));

const breadcrumbItems = computed(() => [
    { title: 'Our Team', href: '#' },
    { title: listTitle.value, href: backHref.value },
    { title: 'Edit', href: '#' },
]);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit team member" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Edit team member" :description="teamMember.name" />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put(`/admin/team_members/${teamMember.id}`, { forceFormData: true })"
                >
                    <input v-model="form.type" type="hidden" name="type" />
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="job_title">Job title / Post</Label>
                        <Input id="job_title" v-model="form.job_title" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="department">Department</Label>
                        <Input id="department" v-model="form.department" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="location">Location</Label>
                        <select id="location" v-model="form.location" :class="selectClass">
                            <option value="">Select location</option>
                            <option v-for="locationOption in locationOptions" :key="locationOption" :value="locationOption">
                                {{ locationOption }}
                            </option>
                        </select>
                        <InputError :message="form.errors.location" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="facebook_url">Facebook URL</Label>
                        <Input
                            id="facebook_url"
                            v-model="form.facebook_url"
                            type="url"
                            placeholder="https://facebook.com/..."
                        />
                        <InputError :message="form.errors.facebook_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="twitter_url">X (Twitter) URL</Label>
                        <Input
                            id="twitter_url"
                            v-model="form.twitter_url"
                            type="url"
                            placeholder="https://x.com/..."
                        />
                        <InputError :message="form.errors.twitter_url" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="photo">Photo</Label>
                        <div
                            v-if="photoDisplayUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="photoDisplayUrl"
                                alt="Photo preview"
                                class="h-32 w-32 shrink-0 rounded-full border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Current or chosen photo. Select a new file to replace, or remove it.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="removePhoto"
                                >
                                    <Trash2 class="size-3.5" />
                                    Remove photo
                                </button>
                            </div>
                        </div>
                        <div class="max-w-md">
                            <input
                                ref="photoInputRef"
                                id="photo"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onPhotoChange"
                            />
                        </div>
                        <InputError :message="form.errors.photo" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">Save</Button>
                        <Button variant="outline" as-child>
                            <Link :href="backHref">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
