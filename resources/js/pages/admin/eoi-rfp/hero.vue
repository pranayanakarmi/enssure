<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Save, ImageIcon, X } from 'lucide-vue-next';
import { ref, computed, onBeforeUnmount } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({ hero: Object });
const form = useForm({
    title: props.hero?.title ?? '',
    description: props.hero?.description ?? '',
    hero_image: null,
    remove_hero_image: false,
    _method: 'put',
});

const imagePreview = ref(null);
const currentImageUrl = props.hero?.hero_image_url ?? null;
const imageInputRef = ref(null);

function onImageChange(e) {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    const file = e.target.files?.[0] || null;
    form.hero_image = file;
    form.remove_hero_image = false;
    if (file) imagePreview.value = URL.createObjectURL(file);
    else imagePreview.value = null;
}
function clearImagePreview() {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = null;
    form.hero_image = null;
    form.remove_hero_image = true;
    if (imageInputRef.value) imageInputRef.value.value = '';
}
const displayImageUrl = computed(() => {
    if (form.remove_hero_image) return null;
    return imagePreview.value ?? currentImageUrl;
});
onBeforeUnmount(() => { if (imagePreview.value) URL.revokeObjectURL(imagePreview.value); });
function submitForm() { form.post('/admin/eoi-rfp/hero', { forceFormData: true }); }

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'EOI-RFP', href: '/admin/eoi-rfp' },
    { title: 'Hero', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="EOI / RFP Hero" />
        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">
            <div class="flex items-center gap-3">
                <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                    <Link href="/admin/eoi-rfp"><ArrowLeft class="h-3.5 w-3.5" />Back</Link>
                </Button>
                <div><h1 class="text-xl font-semibold">Hero Settings</h1><p class="text-xs text-muted-foreground">Edit title, description and background image for the EOI / RFP listing page.</p></div>
            </div>
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b px-5 py-4"><CardTitle>Hero</CardTitle><CardDescription>Update the hero section.</CardDescription></CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="space-y-5" @submit.prevent="submitForm">
                        <div><Label>Title</Label><input v-model="form.title" class="h-9 w-full rounded border px-3" /><InputError :message="form.errors.title" /></div>
                        <div><Label>Description (SEO)</Label><textarea v-model="form.description" rows="3" class="w-full rounded border p-2 text-sm"></textarea><InputError :message="form.errors.description" /></div>
                        <div>
                            <Label>Background Image</Label>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="displayImageUrl" class="relative"><img :src="displayImageUrl" class="h-32 w-48 rounded-lg border object-cover" /><button type="button" @click="clearImagePreview" class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm hover:bg-red-500 hover:text-white"><X class="h-3 w-3" /></button></div>
                                <div v-else class="flex h-32 w-48 items-center justify-center rounded-lg border-dashed bg-gray-50"><ImageIcon class="h-6 w-6 text-gray-400" /></div>
                            </div>
                            <input ref="imageInputRef" type="file" accept="image/*" class="mt-2 block w-full max-w-md cursor-pointer rounded-md border px-3 py-2 text-sm" @change="onImageChange" />
                            <InputError :message="form.errors.hero_image" />
                        </div>
                        <div class="flex justify-end border-t pt-4"><Button type="submit" size="sm" :disabled="form.processing"><Save class="h-3.5 w-3.5 mr-1" />Save Changes</Button></div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
