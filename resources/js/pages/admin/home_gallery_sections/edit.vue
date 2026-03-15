<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import HomeGallerySectionController from '@/actions/App/Http/Controllers/Admin/HomeGallerySectionController';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    homeGallerySection: {
        type: Object,
        default: null,
    },
    galleries: {
        type: Array,
        default: () => [],
    },
});

const section = computed(() => props.homeGallerySection ?? {
    id: null,
    badge_text: '',
    title: '',
    description: '',
    cta_text: '',
    cta_url: '',
    gallery_ids: [],
});

const form = useForm({
    badge_text: section.value.badge_text ?? '',
    title: section.value.title ?? '',
    description: section.value.description ?? '',
    cta_text: section.value.cta_text ?? '',
    cta_url: section.value.cta_url ?? '',
    gallery_ids: section.value.gallery_ids ?? [],
});

const selectedGalleries = computed(() =>
    form.gallery_ids
        .map((id) => props.galleries.find((g) => g.id === id))
        .filter(Boolean),
);

function addGallery(gallery) {
    if (form.gallery_ids.includes(gallery.id)) return;
    form.gallery_ids = [...form.gallery_ids, gallery.id];
}

function removeGallery(galleryId) {
    form.gallery_ids = form.gallery_ids.filter((id) => id !== galleryId);
}

function toggleGallery(gallery) {
    if (isSelected(gallery.id)) {
        removeGallery(gallery.id);
    } else {
        addGallery(gallery);
    }
}

function isSelected(galleryId) {
    return form.gallery_ids.includes(galleryId);
}

function selectedPosition(galleryId) {
    const index = form.gallery_ids.indexOf(galleryId);
    return index === -1 ? null : index + 1;
}

function moveUp(index) {
    if (index <= 0) return;
    const next = [...form.gallery_ids];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    form.gallery_ids = next;
}

function moveDown(index) {
    if (index >= form.gallery_ids.length - 1) return;
    const next = [...form.gallery_ids];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    form.gallery_ids = next;
}

const page = usePage();
const successMessage = computed(() => page.props.flash?.success ?? null);

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin' },
    { title: 'Gallery section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit Gallery section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div
                v-if="successMessage"
                class="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
                {{ successMessage }}
            </div>
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Gallery section"
                    description="Edit the badge, title, description and CTA shown on the home page gallery block."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put(HomeGallerySectionController.update.url())"
                >
                    <div class="grid gap-2">
                        <Label for="badge_text">Badge text</Label>
                        <Input
                            id="badge_text"
                            v-model="form.badge_text"
                            type="text"
                            placeholder="e.g. Gallery"
                        />
                        <InputError :message="form.errors.badge_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="title">Title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            placeholder="e.g. The ENSSURE Journey in Pictures"
                        />
                        <InputError :message="form.errors.title" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="description">Description</Label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="4"
                            class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Section description..."
                        />
                        <InputError :message="form.errors.description" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_text">CTA button text</Label>
                        <Input
                            id="cta_text"
                            v-model="form.cta_text"
                            type="text"
                            placeholder="e.g. View all gallery"
                        />
                        <InputError :message="form.errors.cta_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="cta_url">CTA button URL</Label>
                        <Input
                            id="cta_url"
                            v-model="form.cta_url"
                            type="text"
                            placeholder="e.g. # or /galleries"
                        />
                        <InputError :message="form.errors.cta_url" />
                    </div>

                    <Card>
                        <CardHeader>
                            <span class="font-medium">Gallery albums</span>
                            <p class="text-sm text-muted-foreground">
                                Select which gallery albums from
                                <Link
                                    href="/admin/galleries"
                                    class="text-primary underline hover:no-underline"
                                >
                                    Galleries
                                </Link>
                                to display on the home page. Order determines display order.
                            </p>
                        </CardHeader>
                        <CardContent class="space-y-6 p-6">
                            <div
                                v-if="selectedGalleries.length"
                                class="space-y-3"
                            >
                                <p class="text-sm font-medium text-muted-foreground">
                                    Selected for home page (in order)
                                </p>
                                <ul class="space-y-2 rounded-md border border-sidebar-border p-3">
                                    <li
                                        v-for="(gallery, index) in selectedGalleries"
                                        :key="gallery.id"
                                        class="flex items-center justify-between gap-4 rounded border border-transparent bg-muted/30 px-3 py-2"
                                    >
                                        <div class="flex min-w-0 flex-1 items-center gap-3">
                                            <div class="h-12 w-16 shrink-0 overflow-hidden rounded border bg-muted">
                                                <img
                                                    v-if="gallery.cover_image_url"
                                                    :src="gallery.cover_image_url"
                                                    :alt="gallery.title"
                                                    class="h-full w-full object-cover"
                                                />
                                                <div
                                                    v-else
                                                    class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                                >
                                                    No image
                                                </div>
                                            </div>
                                            <span class="truncate font-medium">{{ gallery.title }}</span>
                                            <span class="text-xs text-muted-foreground">#{{ index + 1 }}</span>
                                        </div>
                                        <div class="flex shrink-0 gap-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                :disabled="index === 0"
                                                @click="moveUp(index)"
                                            >
                                                Up
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                :disabled="index === selectedGalleries.length - 1"
                                                @click="moveDown(index)"
                                            >
                                                Down
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                @click="removeGallery(gallery.id)"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="space-y-3">
                                <p class="text-sm font-medium text-muted-foreground">
                                    Select albums to show on the home page
                                </p>
                                <ul
                                    v-if="galleries.length"
                                    class="space-y-2 rounded-md border border-sidebar-border p-3"
                                >
                                    <li
                                        v-for="gallery in galleries"
                                        :key="gallery.id"
                                        class="flex cursor-pointer items-center gap-4 rounded border border-transparent px-3 py-2 transition-colors hover:bg-muted/50"
                                        :class="{ 'bg-primary/5 border-primary/20': isSelected(gallery.id) }"
                                        @click="toggleGallery(gallery)"
                                    >
                                        <input
                                            type="checkbox"
                                            :checked="isSelected(gallery.id)"
                                            class="h-4 w-4 shrink-0 rounded border-input"
                                            @click.stop
                                            @change="toggleGallery(gallery)"
                                        />
                                        <div class="h-12 w-16 shrink-0 overflow-hidden rounded border bg-muted">
                                            <img
                                                v-if="gallery.cover_image_url"
                                                :src="gallery.cover_image_url"
                                                :alt="gallery.title"
                                                class="h-full w-full object-cover"
                                            />
                                            <div
                                                v-else
                                                class="flex h-full w-full items-center justify-center text-xs text-muted-foreground"
                                            >
                                                No image
                                            </div>
                                        </div>
                                        <span class="min-w-0 flex-1 truncate font-medium">{{ gallery.title }}</span>
                                        <span
                                            v-if="isSelected(gallery.id)"
                                            class="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary"
                                        >
                                            Selected #{{ selectedPosition(gallery.id) }}
                                        </span>
                                        <span
                                            v-else
                                            class="shrink-0 text-xs text-muted-foreground"
                                        >
                                            Not selected
                                        </span>
                                    </li>
                                </ul>
                                <p
                                    v-else
                                    class="py-4 text-center text-sm text-muted-foreground"
                                >
                                    No gallery albums yet. Create albums in
                                    <Link
                                        href="/admin/galleries"
                                        class="text-primary underline hover:no-underline"
                                    >
                                        Galleries
                                    </Link>
                                    .
                                </p>
                                <InputError :message="form.errors.gallery_ids" />
                            </div>
                        </CardContent>
                    </Card>

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
