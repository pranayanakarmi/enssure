<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, ImageIcon, X, User } from 'lucide-vue-next';

const props = defineProps({
    listingType: {
        type: String,
        default: 'staff',
    },
    locationOptions: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    type: props.listingType,
    name: '',
    job_title: '',
    department: '',
    location: '',
    order: 0,
    photo: null,
    facebook_url: '',
    twitter_url: '',
});

const photoPreview = ref(null);
const photoInputRef = ref(null);

function onPhotoChange(e) {
    if (photoPreview.value) URL.revokeObjectURL(photoPreview.value);
    const file = e.target.files?.[0] || null;
    form.photo = file;
    if (file) photoPreview.value = URL.createObjectURL(file);
    else photoPreview.value = null;
}
function clearPhotoPreview() {
    if (photoPreview.value) URL.revokeObjectURL(photoPreview.value);
    photoPreview.value = null;
    form.photo = null;
    if (photoInputRef.value) photoInputRef.value.value = '';
}

onBeforeUnmount(() => {
    if (photoPreview.value) URL.revokeObjectURL(photoPreview.value);
});

const cancelHref = computed(() => props.listingType === 'executive_committee'
    ? '/admin/team_members/executive'
    : '/admin/team_members/staff');

const pageTitle = computed(() => props.listingType === 'executive_committee' ? 'Executive Committee' : 'Staff');
const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Our Team', href: '/admin/team-page' },
    { title: pageTitle.value, href: cancelHref.value },
    { title: 'Create', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Create Team Member" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link :href="cancelHref">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Create Team Member</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Add a new member to {{ pageTitle.toLowerCase() }}.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <User class="h-3.5 w-3.5" />New Member
                </div>
            </div>

            <!-- Main form card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Member Details</CardTitle>
                    <CardDescription class="text-xs">Fill in the information for the new team member.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="form.post('/admin/team_members', { forceFormData: true })">

                        <!-- Hidden type -->
                        <input type="hidden" name="type" :value="form.type" />

                        <!-- Name -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="name" class="text-xs font-medium">Name *</Label>
                            <Input id="name" v-model="form.name" class="h-9 text-sm" placeholder="e.g. John Doe" />
                            <InputError :message="form.errors.name" />
                        </div>

                        <!-- Job Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="job_title" class="text-xs font-medium">Job Title / Post</Label>
                            <Input id="job_title" v-model="form.job_title" class="h-9 text-sm" placeholder="e.g. Program Coordinator" />
                            <InputError :message="form.errors.job_title" />
                        </div>

                        <!-- Department & Location (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="department" class="text-xs font-medium">Department</Label>
                                <Input id="department" v-model="form.department" class="h-9 text-sm" placeholder="e.g. HR" />
                                <InputError :message="form.errors.department" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="location" class="text-xs font-medium">Location</Label>
                                <select id="location" v-model="form.location" class="h-9 w-full rounded-md border border-gray-300 bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                    <option value="">Select location</option>
                                    <option v-for="loc in locationOptions" :key="loc" :value="loc">{{ loc }}</option>
                                </select>
                                <InputError :message="form.errors.location" />
                            </div>
                        </div>

                        <!-- Order -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="order" class="text-xs font-medium">Order</Label>
                            <Input id="order" v-model.number="form.order" type="number" min="0" class="h-9 text-sm" />
                            <p class="text-xs text-gray-500">Smaller = higher position (appears first).</p>
                            <InputError :message="form.errors.order" />
                        </div>

                        <!-- Photo (optional) -->
                        <div class="flex flex-col gap-1.5">
                            <Label class="text-xs font-medium">Photo</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="photoPreview" class="relative">
                                    <img :src="photoPreview" alt="Preview" class="h-20 w-20 rounded-full border border-gray-200 object-cover" />
                                    <button type="button" @click="clearPhotoPreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                        <X class="h-3 w-3" />
                                    </button>
                                </div>
                                <div v-else class="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-50">
                                    <ImageIcon class="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <input
                                ref="photoInputRef"
                                type="file"
                                accept="image/*"
                                class="mt-2 block w-full max-w-md cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90"
                                @change="onPhotoChange"
                            />
                            <p class="text-xs text-gray-500">Recommended: square image, max 2MB.</p>
                            <InputError :message="form.errors.photo" />
                        </div>

                        <!-- Social links (optional – commented out; uncomment if needed) -->
                        <!--
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="facebook_url" class="text-xs font-medium">Facebook URL</Label>
                                <Input id="facebook_url" v-model="form.facebook_url" class="h-9 text-sm" placeholder="https://facebook.com/..." />
                                <InputError :message="form.errors.facebook_url" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="twitter_url" class="text-xs font-medium">X (Twitter) URL</Label>
                                <Input id="twitter_url" v-model="form.twitter_url" class="h-9 text-sm" placeholder="https://x.com/..." />
                                <InputError :message="form.errors.twitter_url" />
                            </div>
                        </div>
                        -->

                        <!-- Save button -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Creating...' : 'Create Member' }}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    </AppLayout>
</template>
