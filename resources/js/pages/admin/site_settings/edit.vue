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
    siteSetting: {
        type: Object,
        default: null,
    },
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
    facebook_url: setting.value?.facebook_url ?? '',
    x_url: setting.value?.x_url ?? '',
    youtube_url: setting.value?.youtube_url ?? '',
    header_phone_1: setting.value?.header_phone_1 ?? '',
    header_phone_2: setting.value?.header_phone_2 ?? '',
    header_fax: setting.value?.header_fax ?? '',
    header_email: setting.value?.header_email ?? '',
    logo_left: null,
    logo_center: null,
    logo_right: null,
    footer_privacy_policy_url: setting.value?.footer_privacy_policy_url ?? '',
    footer_terms_of_service_url: setting.value?.footer_terms_of_service_url ?? '',
});

const logoLeftPreview = ref(null);
const logoCenterPreview = ref(null);
const logoRightPreview = ref(null);

function onLogoChange(field, event) {
    const file = event.target.files?.[0] || null;
    form[field] = file;
    const previewRef = field === 'logo_left' ? logoLeftPreview : field === 'logo_center' ? logoCenterPreview : logoRightPreview;
    if (previewRef.value) {
        URL.revokeObjectURL(previewRef.value);
        previewRef.value = null;
    }
    if (file) {
        previewRef.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (logoLeftPreview.value) URL.revokeObjectURL(logoLeftPreview.value);
    if (logoCenterPreview.value) URL.revokeObjectURL(logoCenterPreview.value);
    if (logoRightPreview.value) URL.revokeObjectURL(logoRightPreview.value);
});

const logoLeftDisplay = computed(() =>
    logoLeftPreview.value ?? setting.value?.logo_left_url,
);
const logoCenterDisplay = computed(() =>
    logoCenterPreview.value ?? setting.value?.logo_center_url,
);
const logoRightDisplay = computed(() =>
    logoRightPreview.value ?? setting.value?.logo_right_url,
);

const breadcrumbItems = [
    { title: 'Footer', href: '/admin/footer-columns' },
    { title: 'Site settings', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Site settings" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-8">
                <Heading
                    variant="small"
                    title="Site settings"
                    description="Header and footer content shown across the site."
                />

                <form
                    class="space-y-8"
                    @submit.prevent="form.put('/admin/site-settings', { forceFormData: true })"
                >
                    <div class="space-y-6 rounded-lg border border-sidebar-border p-6">
                        <h3 class="text-base font-semibold">Header</h3>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="header_phone_1">Phone 1</Label>
                                <Input
                                    id="header_phone_1"
                                    v-model="form.header_phone_1"
                                    type="text"
                                    placeholder="+977 1 6636073/6636191"
                                />
                                <InputError :message="form.errors.header_phone_1" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="header_phone_2">Phone 2</Label>
                                <Input
                                    id="header_phone_2"
                                    v-model="form.header_phone_2"
                                    type="text"
                                    placeholder="+977 1 6632091"
                                />
                                <InputError :message="form.errors.header_phone_2" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="header_fax">Fax</Label>
                                <Input
                                    id="header_fax"
                                    v-model="form.header_fax"
                                    type="text"
                                    placeholder="+977 1 ..."
                                />
                                <InputError :message="form.errors.header_fax" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="header_email">Email</Label>
                                <Input
                                    id="header_email"
                                    v-model="form.header_email"
                                    type="email"
                                    placeholder="enssure.np@helvetas.org"
                                />
                                <InputError :message="form.errors.header_email" />
                            </div>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-3">
                            <div class="grid gap-2">
                                <Label>Logo left (e.g. Government)</Label>
                                <div
                                    v-if="logoLeftDisplay"
                                    class="mb-2 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                                >
                                    <img
                                        :src="logoLeftDisplay"
                                        alt="Logo left preview"
                                        class="h-16 w-16 rounded border object-contain"
                                    />
                                    <p class="text-xs text-muted-foreground">
                                        Select a new file to replace.
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*,.svg,image/svg+xml"
                                    class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                    @change="onLogoChange('logo_left', $event)"
                                />
                                <InputError :message="form.errors.logo_left" />
                            </div>
                            <div class="grid gap-2">
                                <Label>Logo center (e.g. ENSSURE)</Label>
                                <div
                                    v-if="logoCenterDisplay"
                                    class="mb-2 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                                >
                                    <img
                                        :src="logoCenterDisplay"
                                        alt="Logo center preview"
                                        class="h-16 w-16 rounded border object-contain"
                                    />
                                    <p class="text-xs text-muted-foreground">
                                        Select a new file to replace.
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*,.svg,image/svg+xml"
                                    class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                    @change="onLogoChange('logo_center', $event)"
                                />
                                <InputError :message="form.errors.logo_center" />
                            </div>
                            <div class="grid gap-2">
                                <Label>Logo right (e.g. SDC)</Label>
                                <div
                                    v-if="logoRightDisplay"
                                    class="mb-2 flex items-start gap-3 rounded-md border border-sidebar-border bg-muted/30 p-3"
                                >
                                    <img
                                        :src="logoRightDisplay"
                                        alt="Logo right preview"
                                        class="h-16 w-16 rounded border object-contain"
                                    />
                                    <p class="text-xs text-muted-foreground">
                                        Select a new file to replace.
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*,.svg,image/svg+xml"
                                    class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                    @change="onLogoChange('logo_right', $event)"
                                />
                                <InputError :message="form.errors.logo_right" />
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6 rounded-lg border border-sidebar-border p-6">
                        <h3 class="text-base font-semibold">Links</h3>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="footer_privacy_policy_url">Privacy Policy URL</Label>
                                <Input
                                    id="footer_privacy_policy_url"
                                    v-model="form.footer_privacy_policy_url"
                                    type="text"
                                    placeholder="https://..."
                                />
                                <InputError :message="form.errors.footer_privacy_policy_url" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="footer_terms_of_service_url">Terms of Service URL</Label>
                                <Input
                                    id="footer_terms_of_service_url"
                                    v-model="form.footer_terms_of_service_url"
                                    type="text"
                                    placeholder="https://..."
                                />
                                <InputError :message="form.errors.footer_terms_of_service_url" />
                            </div>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-3">
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
                                <Label for="x_url">Linked In URL</Label>
                                <Input
                                    id="x_url"
                                    v-model="form.x_url"
                                    type="url"
                                    placeholder="https://linkedin.com/..."
                                />
                                <InputError :message="form.errors.x_url" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="youtube_url">YouTube URL</Label>
                                <Input
                                    id="youtube_url"
                                    v-model="form.youtube_url"
                                    type="url"
                                    placeholder="https://youtube.com/..."
                                />
                                <InputError :message="form.errors.youtube_url" />
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button
                            type="submit"
                            :disabled="form.processing"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            as-child
                        >
                            <Link href="/admin/footer-columns">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
