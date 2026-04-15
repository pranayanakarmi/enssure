<script setup>
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, Plus, Trash2, Edit, Link2, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    footerColumn: { type: Object, required: true },
});

const column = computed(() => props.footerColumn);
const links = computed(() => column.value?.links ?? []);

const form = useForm({
    title: column.value?.title ?? '',
    order: column.value?.order ?? 0,
    _method: 'put',
});

const linkForm = useForm({
    label: '',
    url: '#',
    order: links.value.length,
});

// Delete modal for links
const showDeleteModal = ref(false);
const linkToDelete = ref(null);
const isDeletingLink = ref(false);

function confirmDeleteLink(link) {
    linkToDelete.value = link;
    showDeleteModal.value = true;
}

function deleteLink() {
    if (!linkToDelete.value) return;
    isDeletingLink.value = true;
    router.delete(`/admin/footer-links/${linkToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeletingLink.value = false;
            showDeleteModal.value = false;
            linkToDelete.value = null;
        },
    });
}

function addLink() {
    linkForm.post(`/admin/footer-columns/${column.value.id}/links`, {
        preserveScroll: true,
        onSuccess: () => {
            linkForm.label = '';
            linkForm.url = '#';
            linkForm.order = links.value.length;
        },
    });
}

function saveColumn() {
    form.put(`/admin/footer-columns/${column.value.id}`);
}

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'Footer', href: '/admin/footer-columns' },
    { title: column.value?.title ?? 'Edit', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head :title="`Edit ${column.title}`" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

            <!-- Header with back button -->
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/footer-columns">
                            <ArrowLeft class="h-3.5 w-3.5" />Back
                        </Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold tracking-tight text-foreground">Edit Footer Column</h1>
                        <p class="text-xs text-muted-foreground mt-0.5">{{ column.title }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                    <Link2 class="h-3.5 w-3.5" />Edit Column
                </div>
            </div>

            <!-- Column Settings Card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Column Settings</CardTitle>
                    <CardDescription class="text-xs">Update the column title and order.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5">
                    <form class="flex flex-col gap-5" @submit.prevent="saveColumn">
                        <!-- Title -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="title" class="text-xs font-medium">Title *</Label>
                            <Input id="title" v-model="form.title" class="h-9 text-sm" />
                            <InputError :message="form.errors.title" />
                        </div>
                        <!-- Order -->
                        <div class="flex flex-col gap-1.5">
                            <Label for="order" class="text-xs font-medium">Order</Label>
                            <Input id="order" v-model.number="form.order" type="number" min="0" class="h-9 text-sm" />
                            <InputError :message="form.errors.order" />
                        </div>
                        <!-- Save button for column -->
                        <div class="flex justify-end border-t border-gray-200 pt-4">
                            <Button type="submit" size="sm" :disabled="form.processing" class="h-8 gap-1.5 text-xs">
                                <Save class="h-3.5 w-3.5" />
                                {{ form.processing ? 'Saving…' : 'Save Column' }}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <!-- Links Management Card -->
            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b border-gray-200 px-5 py-4">
                    <CardTitle class="text-sm font-semibold">Links</CardTitle>
                    <CardDescription class="text-xs">Manage links inside this column.</CardDescription>
                </CardHeader>
                <CardContent class="px-5 py-5 space-y-5">
                    <!-- Add link form (inline) -->
                    <form class="flex flex-wrap items-end gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4" @submit.prevent="addLink">
                        <div class="flex-1 min-w-[150px]">
                            <Label for="link_label" class="text-xs font-medium">Label *</Label>
                            <Input id="link_label" v-model="linkForm.label" class="h-9 text-sm" placeholder="e.g. About Us" required />
                            <InputError :message="linkForm.errors.label" />
                        </div>
                        <div class="flex-1 min-w-[200px]">
                            <Label for="link_url" class="text-xs font-medium">URL *</Label>
                            <Input id="link_url" v-model="linkForm.url" class="h-9 text-sm" placeholder="https://..." required />
                            <InputError :message="linkForm.errors.url" />
                        </div>
                        <div class="w-24">
                            <Label for="link_order" class="text-xs font-medium">Order</Label>
                            <Input id="link_order" v-model.number="linkForm.order" type="number" min="0" class="h-9 text-sm" />
                            <InputError :message="linkForm.errors.order" />
                        </div>
                        <Button type="submit" size="sm" :disabled="linkForm.processing" class="h-9 gap-1">
                            <Plus class="h-3.5 w-3.5" /> Add Link
                        </Button>
                    </form>

                    <!-- Links table -->
                    <div class="overflow-x-auto rounded-md border border-gray-200">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left font-medium">Label</th>
                                    <th class="px-4 py-3 text-left font-medium">URL</th>
                                    <th class="px-4 py-3 text-left font-medium">Order</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="links.length === 0">
                                    <td colspan="4" class="px-4 py-8 text-center text-sm text-gray-500">
                                        No links yet. Add one above.
                                    </td>
                                </tr>
                                <tr
                                    v-for="link in links"
                                    :key="link.id"
                                    class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td class="px-4 py-3 font-medium text-gray-900">
                                        {{ link.label }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600 truncate max-w-[250px]">
                                        {{ link.url }}
                                    </td>
                                    <td class="px-4 py-3 text-gray-600">
                                        {{ link.order }}
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button size="sm" variant="outline" class="h-7 gap-1 text-xs" as-child>
                                                <Link :href="`/admin/footer-links/${link.id}/edit`">
                                                    <Edit class="h-3 w-3" /> Edit
                                                </Link>
                                            </Button>
                                            <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10" @click="confirmDeleteLink(link)">
                                                <Trash2 class="h-3 w-3" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <!-- Delete link confirmation modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete link</h3>
                <p class="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{{ linkToDelete?.label }}”?<br>
                    This action cannot be undone.
                </p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" size="sm" @click="deleteLink" :disabled="isDeletingLink">
                        {{ isDeletingLink ? 'Deleting...' : 'Delete permanently' }}
                    </Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
