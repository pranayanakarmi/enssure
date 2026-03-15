<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed, onBeforeUnmount } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    listingType: {
        type: String,
        default: 'staff',
    },
});

const form = useForm({
    type: props.listingType,
    name: '',
    job_title: '',
    department: '',
    photo: null,
    facebook_url: '',
    twitter_url: '',
});

const photoPreviewUrl = ref(null);

function onPhotoChange(event) {
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value);
        photoPreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.photo = file;
    if (file) {
        photoPreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value);
    }
});

const photoInputRef = ref(null);

function clearPhoto() {
    form.photo = null;
    if (photoPreviewUrl.value) {
        URL.revokeObjectURL(photoPreviewUrl.value);
        photoPreviewUrl.value = null;
    }
    if (photoInputRef.value) {
        photoInputRef.value.value = '';
    }
}

const cancelHref = computed(() => props.listingType === 'executive_committee'
    ? '/admin/team_members/executive'
    : '/admin/team_members/staff');

const breadcrumbItems = computed(() => [
    { title: 'Our Team', href: '#' },
    { title: props.listingType === 'executive_committee' ? 'Executive Committee' : 'Staff', href: cancelHref.value },
    { title: 'Create', href: '#' },
]);
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create team member" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading variant="small" title="Create team member" description="Add a new team member" />
                <form class="space-y-6" @submit.prevent="form.post('/admin/team_members', { forceFormData: true })">
                    <input v-model="form.type" type="hidden" name="type" />
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" type="text" required />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="job_title">Job title</Label>
                        <Input id="job_title" v-model="form.job_title" type="text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="department">Department</Label>
                        <Input id="department" v-model="form.department" type="text" />
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
                            v-if="photoPreviewUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="photoPreviewUrl"
                                alt="Photo preview"
                                class="h-32 w-32 shrink-0 rounded-full border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Selected photo. Choose another to replace.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="clearPhoto"
                                >
                                    Clear
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
                        <Button type="submit" :disabled="form.processing">Create</Button>
                        <Button variant="outline" as-child>
                            <Link :href="cancelHref">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
