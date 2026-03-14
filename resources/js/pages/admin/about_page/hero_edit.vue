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
    aboutPageHero: {
        type: Object,
        default: null,
    },
});

const hero = computed(() => props.aboutPageHero ?? {
    id: null,
    title: '',
    hero_image_url: null,
});

const form = useForm({
    title: hero.value.title ?? '',
    hero_image: null,
    remove_hero_image: false,
});

const heroImagePreviewUrl = ref(null);

function onHeroImageChange(event) {
    if (heroImagePreviewUrl.value) {
        URL.revokeObjectURL(heroImagePreviewUrl.value);
        heroImagePreviewUrl.value = null;
    }
    const file = event.target.files?.[0] || null;
    form.hero_image = file;
    form.remove_hero_image = false;
    if (file) {
        heroImagePreviewUrl.value = URL.createObjectURL(file);
    }
}

onBeforeUnmount(() => {
    if (heroImagePreviewUrl.value) {
        URL.revokeObjectURL(heroImagePreviewUrl.value);
    }
});

const heroImageDisplayUrl = computed(() => {
    if (form.remove_hero_image) return null;
    return heroImagePreviewUrl.value ?? hero.value.hero_image_url;
});

const heroImageInputRef = ref(null);

function removeHeroImage() {
    form.remove_hero_image = true;
    form.hero_image = null;
    if (heroImagePreviewUrl.value) {
        URL.revokeObjectURL(heroImagePreviewUrl.value);
        heroImagePreviewUrl.value = null;
    }
    if (heroImageInputRef.value) {
        heroImageInputRef.value.value = '';
    }
}

const breadcrumbItems = [
    { title: 'About Page', href: '#' },
    { title: 'Hero', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit About Page Hero" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="About Page Hero"
                    description="Edit the hero title and background image shown at the top of the About page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/about-page/hero', { forceFormData: true })"
                >
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. About Us"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="hero_image">Hero background image</Label>
                        <div
                            v-if="heroImageDisplayUrl"
                            class="mb-3 flex flex-wrap items-start gap-4 rounded-md border border-sidebar-border bg-muted/30 p-4"
                        >
                            <img
                                :src="heroImageDisplayUrl"
                                alt="Hero preview"
                                class="h-32 w-40 shrink-0 rounded border object-cover"
                            />
                            <div class="flex min-w-0 flex-1 flex-col gap-3">
                                <p class="text-xs text-muted-foreground">
                                    Current or chosen image. Select a new file to replace, or remove it.
                                </p>
                                <button
                                    type="button"
                                    class="inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    @click="removeHeroImage"
                                >
                                    <Trash2 class="size-3.5" />
                                    Remove image
                                </button>
                            </div>
                        </div>
                        <div class="max-w-md">
                            <input
                                ref="heroImageInputRef"
                                id="hero_image"
                                type="file"
                                accept="image/*"
                                class="block w-full cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                                @change="onHeroImageChange"
                            />
                        </div>
                        <InputError :message="form.errors.hero_image" />
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
