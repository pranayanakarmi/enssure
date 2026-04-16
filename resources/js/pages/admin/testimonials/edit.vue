<script setup>
import { useForm } from '@inertiajs/vue3';
import { Head, Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { computed, onUnmounted, ref } from 'vue';

const props = defineProps({
    testimonial: {
        type: Object,
        required: true,
    },
    courses: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    name: props.testimonial.name ?? '',
    designation: props.testimonial.designation ?? '',
    organization: props.testimonial.organization ?? '',
    image: null,
    testimonial_text: props.testimonial.testimonial_text ?? '',
    rating: props.testimonial.rating ?? null,
    course_id: props.testimonial.course_id ?? '',
    is_featured: props.testimonial.is_featured ?? false,
    is_published: Boolean(props.testimonial.is_published),
    order: props.testimonial.order ?? 0,
    _method: 'put',
});

const imagePreview = ref(null);
const existingImageUrl = ref(props.testimonial.image_url ?? null);

const publishedStateText = computed(() => {
    return form.is_published
        ? 'Published (visible on site)'
        : 'Draft (hidden from site)';
});

function onImageChange(event) {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    const file = event.target.files?.[0] ?? null;
    form.image = file;
    imagePreview.value = file ? URL.createObjectURL(file) : null;
}

function clearSelectedImage() {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
        imagePreview.value = null;
    }

    form.image = null;

    const inputElement = document.getElementById('image');
    if (inputElement) {
        inputElement.value = '';
    }
}

function submitForm() {
    form.transform((data) => ({
        ...data,
        is_published: data.is_published ? 1 : 0,
    }));

    form.post(`/admin/testimonials/${props.testimonial.id}`, {
        forceFormData: true,
        onSuccess: () => {
            form.transform((data) => data);
        },
    });
}

onUnmounted(() => {
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }
});

const breadcrumbItems = [
    { title: 'Home Page', href: '#' },
    { title: 'Testimonials', href: '/admin/testimonials' },
    { title: 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit testimonial" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Edit testimonial"
                    :description="testimonial.name"
                />

                <form
                    class="space-y-6"
                    @submit.prevent="submitForm"
                >
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            v-model="form.name"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.name" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="designation">Designation</Label>
                        <Input
                            id="designation"
                            v-model="form.designation"
                            type="text"
                        />
                        <InputError :message="form.errors.designation" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="image">Image</Label>
                        <div class="flex items-center gap-3">
                            <div class="h-14 w-14 overflow-hidden rounded-full border border-sidebar-border bg-muted">
                                <img
                                    v-if="imagePreview || existingImageUrl"
                                    :src="imagePreview || existingImageUrl"
                                    alt="Testimonial image"
                                    class="h-full w-full object-cover"
                                >
                            </div>
                            <Button
                                v-if="imagePreview"
                                type="button"
                                variant="outline"
                                size="sm"
                                @click="clearSelectedImage"
                            >
                                Remove new image
                            </Button>
                        </div>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            @change="onImageChange"
                        />
                        <InputError :message="form.errors.image" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="testimonial_text">Testimonial text</Label>
                        <textarea
                            id="testimonial_text"
                            v-model="form.testimonial_text"
                            rows="4"
                            class="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <InputError :message="form.errors.testimonial_text" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="course_id">Course</Label>
                        <select
                            id="course_id"
                            v-model="form.course_id"
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="">— None —</option>
                            <option
                                v-for="c in (courses || [])"
                                :key="c.id"
                                :value="c.id"
                            >
                                {{ c.name }}
                            </option>
                        </select>
                        <InputError :message="form.errors.course_id" />
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
                    <div class="flex flex-wrap gap-4">
                        <label class="flex items-center gap-2">
                            <input
                                v-model="form.is_featured"
                                type="checkbox"
                                class="rounded border-sidebar-border"
                            />
                            <span class="text-sm">Featured</span>
                        </label>
                        <div class="flex items-center gap-2">
                            <Checkbox
                                id="is_published"
                                v-model:checked="form.is_published"
                            />
                            <Label
                                for="is_published"
                                class="cursor-pointer text-sm font-normal"
                            >
                                {{ publishedStateText }}
                            </Label>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing">
                            Save testimonial
                        </Button>
                        <Button variant="outline" as-child>
                            <Link href="/admin/testimonials">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
