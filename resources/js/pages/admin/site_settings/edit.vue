<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { ArrowLeft, Save, Globe, Link2, ImageIcon, X } from 'lucide-vue-next';

const props = defineProps({
    siteSetting: { type: Object, default: null },
});

const setting = computed(() => props.siteSetting ?? {
    id: null,
    facebook_url: '',
    x_url: '',
    youtube_url: '',
    header_phone_1: '',
    header_phone_2: '',
    header_fax: '',
    header_email: '',
    logo_left_url: null,
    logo_center_url: null,
    logo_right_url: null,
    footer_privacy_policy_url: '',
    footer_terms_of_service_url: '',
});

const form = useForm({
    facebook_url: setting.value.facebook_url ?? '',
    x_url: setting.value.x_url ?? '',
    youtube_url: setting.value.youtube_url ?? '',
    header_phone_1: setting.value.header_phone_1 ?? '',
    header_phone_2: setting.value.header_phone_2 ?? '',
    header_fax: setting.value.header_fax ?? '',
    header_email: setting.value.header_email ?? '',
    logo_left: null,
    logo_center: null,
    logo_right: null,
    footer_privacy_policy_url: setting.value.footer_privacy_policy_url ?? '',
    footer_terms_of_service_url: setting.value.footer_terms_of_service_url ?? '',
    _method: 'put',
});

// Logo previews
const leftPreview = ref(null);
const centerPreview = ref(null);
const rightPreview = ref(null);

function onLogoChange(field, event) {
    const file = event.target.files?.[0] || null;
    form[field] = file;
    const previewRef = field === 'logo_left' ? leftPreview : field === 'logo_center' ? centerPreview : rightPreview;
    if (previewRef.value) {
        URL.revokeObjectURL(previewRef.value);
        previewRef.value = null;
    }
    if (file) {
        previewRef.value = URL.createObjectURL(file);
    }
}
function clearLogoPreview(field) {
    const previewRef = field === 'logo_left' ? leftPreview : field === 'logo_center' ? centerPreview : rightPreview;
    if (previewRef.value) {
        URL.revokeObjectURL(previewRef.value);
        previewRef.value = null;
    }
    form[field] = null;
    const input = document.getElementById(field);
    if (input) input.value = '';
}

const leftDisplayUrl = computed(() => leftPreview.value ?? setting.value.logo_left_url);
const centerDisplayUrl = computed(() => centerPreview.value ?? setting.value.logo_center_url);
const rightDisplayUrl = computed(() => rightPreview.value ?? setting.value.logo_right_url);

onBeforeUnmount(() => {
    if (leftPreview.value) URL.revokeObjectURL(leftPreview.value);
    if (centerPreview.value) URL.revokeObjectURL(centerPreview.value);
    if (rightPreview.value) URL.revokeObjectURL(rightPreview.value);
});

function submitForm() {
    form.put('/admin/site-settings', { forceFormData: true });
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Site Settings', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Site Settings" />

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
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Site Settings</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">Header and footer content shown across the site.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Globe class="h-3.5 w-3.5" />Configuration
                </div>
            </div>

            <form class="space-y-5" @submit.prevent="submitForm">

                <!-- Header Card -->
                <Card class="border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-5 py-4">
                        <CardTitle class="text-sm font-semibold">Header Settings</CardTitle>
                        <CardDescription class="text-xs">Contact details and logos displayed in the header.</CardDescription>
                    </CardHeader>
                    <CardContent class="px-5 py-5 space-y-5">
                        <!-- Phone, Fax, Email (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="header_phone_1" class="text-xs font-medium">Phone 1</Label>
                                <Input id="header_phone_1" v-model="form.header_phone_1" class="h-9 text-sm" placeholder="+977 1 6636073" />
                                <InputError :message="form.errors.header_phone_1" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="header_phone_2" class="text-xs font-medium">Phone 2</Label>
                                <Input id="header_phone_2" v-model="form.header_phone_2" class="h-9 text-sm" placeholder="+977 1 6636191" />
                                <InputError :message="form.errors.header_phone_2" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="header_fax" class="text-xs font-medium">Fax</Label>
                                <Input id="header_fax" v-model="form.header_fax" class="h-9 text-sm" placeholder="+977 1 ..." />
                                <InputError :message="form.errors.header_fax" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="header_email" class="text-xs font-medium">Email</Label>
                                <Input id="header_email" v-model="form.header_email" type="email" class="h-9 text-sm" placeholder="enssure.np@helvetas.org" />
                                <InputError :message="form.errors.header_email" />
                            </div>
                        </div>

                        <!-- Logos (three columns) -->
                        <div class="grid gap-5 sm:grid-cols-3">
                            <!-- Logo Left -->
                            <div class="flex flex-col gap-1.5">
                                <Label class="text-xs font-medium">Logo Left (e.g. Government)</Label>
                                <div class="relative">
                                    <div v-if="leftDisplayUrl" class="relative inline-block">
                                        <img :src="leftDisplayUrl" alt="Logo left" class="h-16 w-16 rounded-lg border border-gray-200 object-contain p-1" />
                                        <button type="button" @click="clearLogoPreview('logo_left')" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                            <X class="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div v-else class="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                        <ImageIcon class="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <input id="logo_left" type="file" accept="image/*,.svg,image/svg+xml" class="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90" @change="onLogoChange('logo_left', $event)" />
                                <InputError :message="form.errors.logo_left" />
                            </div>
                            <!-- Logo Center -->
                            <div class="flex flex-col gap-1.5">
                                <Label class="text-xs font-medium">Logo Center (e.g. ENSSURE)</Label>
                                <div class="relative">
                                    <div v-if="centerDisplayUrl" class="relative inline-block">
                                        <img :src="centerDisplayUrl" alt="Logo center" class="h-16 w-16 rounded-lg border border-gray-200 object-contain p-1" />
                                        <button type="button" @click="clearLogoPreview('logo_center')" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                            <X class="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div v-else class="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                        <ImageIcon class="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <input id="logo_center" type="file" accept="image/*,.svg,image/svg+xml" class="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90" @change="onLogoChange('logo_center', $event)" />
                                <InputError :message="form.errors.logo_center" />
                            </div>
                            <!-- Logo Right -->
                            <div class="flex flex-col gap-1.5">
                                <Label class="text-xs font-medium">Logo Right (e.g. SDC)</Label>
                                <div class="relative">
                                    <div v-if="rightDisplayUrl" class="relative inline-block">
                                        <img :src="rightDisplayUrl" alt="Logo right" class="h-16 w-16 rounded-lg border border-gray-200 object-contain p-1" />
                                        <button type="button" @click="clearLogoPreview('logo_right')" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-red-500 hover:text-white">
                                            <X class="h-3 w-3" />
                                        </button>
                                    </div>
                                    <div v-else class="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
                                        <ImageIcon class="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                                <input id="logo_right" type="file" accept="image/*,.svg,image/svg+xml" class="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-primary/90" @change="onLogoChange('logo_right', $event)" />
                                <InputError :message="form.errors.logo_right" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Footer / Links Card -->
                <Card class="border-gray-200 shadow-sm">
                    <CardHeader class="border-b border-gray-200 px-5 py-4">
                        <CardTitle class="text-sm font-semibold flex items-center gap-2">
                            <Link2 class="h-4 w-4" /> Footer & Social Links
                        </CardTitle>
                        <CardDescription class="text-xs">Privacy policy, terms of service, and social media URLs.</CardDescription>
                    </CardHeader>
                    <CardContent class="px-5 py-5 space-y-5">
                        <!-- Privacy & Terms (two columns) -->
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="flex flex-col gap-1.5">
                                <Label for="footer_privacy_policy_url" class="text-xs font-medium">Privacy Policy URL</Label>
                                <Input id="footer_privacy_policy_url" v-model="form.footer_privacy_policy_url" class="h-9 text-sm" placeholder="https://..." />
                                <InputError :message="form.errors.footer_privacy_policy_url" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="footer_terms_of_service_url" class="text-xs font-medium">Terms of Service URL</Label>
                                <Input id="footer_terms_of_service_url" v-model="form.footer_terms_of_service_url" class="h-9 text-sm" placeholder="https://..." />
                                <InputError :message="form.errors.footer_terms_of_service_url" />
                            </div>
                        </div>

                        <!-- Social links (three columns) -->
                        <div class="grid gap-4 sm:grid-cols-3">
                            <div class="flex flex-col gap-1.5">
                                <Label for="facebook_url" class="text-xs font-medium">Facebook URL</Label>
                                <Input id="facebook_url" v-model="form.facebook_url" class="h-9 text-sm" placeholder="https://facebook.com/..." />
                                <InputError :message="form.errors.facebook_url" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="x_url" class="text-xs font-medium">LinkedIn URL</Label>
                                <Input id="x_url" v-model="form.x_url" class="h-9 text-sm" placeholder="https://linkedin.com/..." />
                                <InputError :message="form.errors.x_url" />
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <Label for="youtube_url" class="text-xs font-medium">YouTube URL</Label>
                                <Input id="youtube_url" v-model="form.youtube_url" class="h-9 text-sm" placeholder="https://youtube.com/..." />
                                <InputError :message="form.errors.youtube_url" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Save button -->
                <div class="flex justify-end">
                    <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                        <Save class="h-3.5 w-3.5" />
                        {{ form.processing ? 'Saving…' : 'Save Settings' }}
                    </Button>
                </div>

            </form>
        </div>
    </AppLayout>
</template>
