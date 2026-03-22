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

const props = defineProps({
    infographicsPageContent: {
        type: Object,
        default: null,
    },
});

const content = computed(() => props.infographicsPageContent ?? {
    id: null,
    title: '',
    banner_image_url: null,
});

const form = useForm({
    title: content.value.title ?? '',
    banner_image: null,
    remove_banner_image: false,
});

const bannerImagePreviewUrl = ref(null);

function onBannerImageChange(event) {
    if (bannerImagePreviewUrl.value) {
        URL.revokeObjectURL(bannerImagePreviewUrl.value);
        bannerImagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.banner_image = file;
    form.remove_banner_image = false;
    if (file) {
        bannerImagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (bannerImagePreviewUrl.value) {
        URL.revokeObjectURL(bannerImagePreviewUrl.value);
    }
});

const bannerImageDisplayUrl = computed(() => {
    if (form.remove_banner_image) return null;
    return bannerImagePreviewUrl.value ?? content.value.banner_image_url;
});

const bannerImageInputRef = ref(null);

function removeBannerImage() {
    form.remove_banner_image = true;
    form.banner_image = null;
    if (bannerImagePreviewUrl.value) {
        URL.revokeObjectURL(bannerImagePreviewUrl.value);
        bannerImagePreviewUrl.value = null;
    }
    if (bannerImageInputRef.value) {
        bannerImageInputRef.value.value = '';
    }
}

const breadcrumbItems = [
    { title: 'Infographics Page', href: '#' },
    { title: 'Page / Hero', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Infographics Page" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Infographics page hero"
                    description="Edit the banner title and background image shown on the Infographics page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/infographics-page/content', { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. Dual VET Apprenticeship: A WIN–WIN–WIN Model"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="banner_image">Banner background image</Label>
                        <div
                            v-if="bannerImageDisplayUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="bannerImageDisplayUrl"
                                alt="Banner preview"
                                class="h-32 w-40 shrink-0 rounded border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Current or chosen image. Select a new file to replace, or remove it.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="removeBannerImage"
                                >
                                    <Trash2 class="size-3.5" />
                                    Remove image
                                </button>
                            </div>
                        </div>
                        <div class="max-w-md">
                            <input
                                ref="bannerImageInputRef"
                                id="banner_image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onBannerImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.banner_image" />
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
                            <Link href="/admin">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
