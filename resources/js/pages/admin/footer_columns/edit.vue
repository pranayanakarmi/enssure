<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    footerColumn: {
        type: Object,
        required: true,
    },
});

const column = computed(() => props.footerColumn);
const links = computed(() => column.value?.links ?? []);

const form = useForm({
    title: column.value?.title ?? '',
    order: column.value?.order ?? 0,
});

const linkForm = useForm({
    label: '',
    url: '#',
    order: links.value.length,
});

function addLink() {
    linkForm.post(`/admin/footer-columns/${column.value.id}/links`, {
        onSuccess: () => {
            linkForm.label = '';
            linkForm.url = '#';
            linkForm.order = links.value.length;
        },
    });
}

function removeLink(linkId) {
    if (confirm('Remove this link?')) {
        router.delete(`/admin/footer-links/${linkId}`);
    }
}

const breadcrumbItems = [
    { title: 'Footer', href: '/admin/footer-columns' },
    { title: 'Footer columns', href: '/admin/footer-columns' },
    { title: column.value?.title ?? 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="`Edit ${column.title}`" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    :title="`Edit: ${column.title}`"
                    description="Update column title and manage links."
                />

                <form
                    class="space-y-4"
                    @submit.prevent="form.put(`/admin/footer-columns/${column.id}`)"
                >
                    <div class="grid gap-2">
                        <Label for="title">Column title</Label>
                        <Input
                            id="title"
                            v-model="form.title"
                            type="text"
                            required
                        />
                        <InputError :message="form.errors.title" />
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
                    <Button
                        type="submit"
                        :disabled="form.processing"
                    >
                        Save column
                    </Button>
                </form>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between">
                        <span>Links</span>
                        <div class="flex gap-2">
                            <Input
                                v-model="linkForm.label"
                                placeholder="Label"
                                class="max-w-[140px]"
                            />
                            <Input
                                v-model="linkForm.url"
                                placeholder="URL"
                                class="max-w-[200px]"
                            />
                            <Button
                                type="button"
                                size="sm"
                                :disabled="!linkForm.label || linkForm.processing"
                                @click="addLink"
                            >
                                Add link
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="link in links"
                                :key="link.id"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-3"
                            >
                                <div>
                                    <p class="font-medium">
                                        {{ link.label }}
                                    </p>
                                    <p class="text-sm text-muted-foreground">
                                        {{ link.url }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        as-child
                                    >
                                        <Link :href="`/admin/footer-links/${link.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        @click="removeLink(link.id)"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!links.length"
                                class="px-6 py-8 text-center text-sm text-muted-foreground"
                            >
                                No links. Add one above.
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button
                    variant="outline"
                    as-child
                >
                    <Link href="/admin/footer-columns">Back to columns</Link>
                </Button>
            </div>
        </div>
    </AppLayout>
</template>
