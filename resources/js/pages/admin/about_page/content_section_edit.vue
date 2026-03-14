<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    aboutContentSection: {
        type: Object,
        default: null,
    },
});

const section = computed(() => props.aboutContentSection ?? {
    id: null,
    paragraph_1: '',
    paragraph_2: '',
});

const form = useForm({
    paragraph_1: section.value.paragraph_1 ?? '',
    paragraph_2: section.value.paragraph_2 ?? '',
});

const breadcrumbItems = [
    { title: 'About Page', href: '#' },
    { title: 'Content section', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Edit About Page Content Section" />
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="About Page Content Section"
                    description="Edit the two-paragraph content block below the main about section on the About page."
                />
                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/about-page/content-section')"
                >
                    <div class="grid gap-2">
                        <Label for="paragraph_1">First paragraph (left column)</Label>
                        <textarea
                            id="paragraph_1"
                            v-model="form.paragraph_1"
                            rows="6"
                            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="First paragraph text..."
                        />
                        <InputError :message="form.errors.paragraph_1" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="paragraph_2">Second paragraph (right column)</Label>
                        <textarea
                            id="paragraph_2"
                            v-model="form.paragraph_2"
                            rows="6"
                            class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Second paragraph text..."
                        />
                        <InputError :message="form.errors.paragraph_2" />
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
