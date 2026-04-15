<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { ArrowLeft, Edit, Trash2, Plus, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({ items: Array });
const page = usePage();
const success = computed(() => page.props.flash?.success ?? null);
const error = computed(() => page.props.flash?.error ?? null);

const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

function confirmDelete(item) {
    itemToDelete.value = item;
    showDeleteModal.value = true;
}
function deleteItem() {
    if (!itemToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/eoi-rfp/${itemToDelete.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
            isDeleting.value = false;
            showDeleteModal.value = false;
            itemToDelete.value = null;
        },
    });
}
function statusVariant(status) {
    switch (status) {
        case 'published': return 'default';
        case 'closed': return 'destructive';
        default: return 'secondary';
    }
}
const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'EOI-RFP', href: '/admin/eoi-rfp' },
    { title: 'Content', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="EOI / RFP Content" />

        <div class="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                    <Button variant="outline" size="sm" as-child class="h-8 gap-1.5 text-xs">
                        <Link href="/admin/home"><ArrowLeft class="h-3.5 w-3.5" />Back</Link>
                    </Button>
                    <div>
                        <h1 class="text-xl font-semibold">EOI / RFP Content</h1>
                        <p class="text-xs text-muted-foreground">Manage all Expressions of Interest and Requests for Proposal.</p>
                    </div>
                </div>
                <Button size="sm" class="h-8 gap-1.5 text-xs" as-child>
                    <Link href="/admin/eoi-rfp/create"><Plus class="h-3.5 w-3.5" /> Add</Link>
                </Button>
            </div>

            <Transition>
                <div v-if="success" class="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-50 px-4 py-2.5 text-sm text-green-800">
                    <CheckCircle2 class="h-4 w-4" /> {{ success }}
                </div>
            </Transition>
            <Transition>
                <div v-if="error" class="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5 text-sm text-red-800">
                    <AlertCircle class="h-4 w-4" /> {{ error }}
                </div>
            </Transition>

            <Card class="border-gray-200 shadow-sm">
                <CardHeader class="border-b px-5 py-4">
                    <CardTitle>Items List</CardTitle>
                    <CardDescription>Click Edit to modify or Delete to remove.</CardDescription>
                </CardHeader>
                <CardContent class="p-0">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left font-medium">Type</th>
                                    <th class="px-4 py-3 text-left font-medium">Title</th>
                                    <th class="px-4 py-3 text-left font-medium">Deadline</th>
                                    <th class="px-4 py-3 text-left font-medium">Status</th>
                                    <th class="px-4 py-3 text-left font-medium">Published At</th>
                                    <th class="px-4 py-3 text-left font-medium">Order</th>
                                    <th class="px-4 py-3 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="items.length === 0">
                                    <td colspan="7" class="px-4 py-12 text-center text-sm text-gray-500">No items yet. Click "Add" to create one.</td>
                                </tr>
                                <tr v-for="item in items" :key="item.id" class="border-b border-gray-200 hover:bg-gray-50">
                                    <td class="px-4 py-3"><Badge :variant="item.type === 'eoi' ? 'default' : 'secondary'">{{ item.type.toUpperCase() }}</Badge></td>
                                    <td class="px-4 py-3 font-medium">{{ item.title }}</td>
                                    <td class="px-4 py-3">{{ item.deadline || '—' }}</td>
                                    <td class="px-4 py-3"><Badge :variant="statusVariant(item.status)">{{ item.status }}</Badge></td>
                                    <td class="px-4 py-3">{{ item.published_at || 'Draft' }}</td>
                                    <td class="px-4 py-3">{{ item.order }}</td>
                                    <td class="px-4 py-3 text-right">
                                        <div class="flex justify-end gap-2">
                                            <Button size="sm" variant="outline" class="h-7 gap-1 text-xs" as-child>
                                                <Link :href="`/admin/eoi-rfp/${item.id}/edit`"><Edit class="h-3 w-3" /> Edit</Link>
                                            </Button>
                                            <Button size="sm" variant="ghost" class="h-7 gap-1 text-xs text-destructive hover:bg-destructive/10" @click="confirmDelete(item)"><Trash2 class="h-3 w-3" /> Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteModal = false">
            <div class="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h3 class="text-lg font-semibold">Delete item</h3>
                <p class="mt-2 text-sm text-muted-foreground">Are you sure you want to delete “{{ itemToDelete?.title }}”? This cannot be undone.</p>
                <div class="mt-6 flex justify-end gap-2">
                    <Button variant="outline" size="sm" @click="showDeleteModal = false">Cancel</Button>
                    <Button variant="destructive" size="sm" @click="deleteItem" :disabled="isDeleting">{{ isDeleting ? 'Deleting...' : 'Delete permanently' }}</Button>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
