<script setup>
import { Head, Link, router, usePage } from '@inertiajs/vue3';
import { GripVertical } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    documents: {
        type: Array,
        default: () => [],
    },
});

const page = usePage();
const success = page.props.flash?.success;

const breadcrumbItems = [
    { title: 'Documents', href: '/admin/documents' },
];

const localDocuments = ref([...(props.documents || [])]);
const draggingDocumentId = ref(null);
const isSavingOrder = ref(false);

watch(
    () => props.documents,
    (nextDocuments) => {
        localDocuments.value = [...(nextDocuments || [])];
    },
);

function onDragStart(documentId) {
    draggingDocumentId.value = documentId;
}

function onDragOver(event) {
    event.preventDefault();
}

function moveDocumentBefore(targetId) {
    if (!draggingDocumentId.value || draggingDocumentId.value === targetId) {
        return;
    }

    const items = [...localDocuments.value];
    const sourceIndex = items.findIndex((item) => item.id === draggingDocumentId.value);
    const targetIndex = items.findIndex((item) => item.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
        return;
    }

    const [moved] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, moved);

    localDocuments.value = items.map((item, index) => ({
        ...item,
        order: index,
    }));
}

function saveOrder() {
    isSavingOrder.value = true;

    router.post(
        '/admin/documents/reorder',
        {
            documents: localDocuments.value.map((item, index) => ({
                id: item.id,
                order: index,
            })),
        },
        {
            preserveScroll: true,
            onFinish: () => {
                draggingDocumentId.value = null;
                isSavingOrder.value = false;
            },
        },
    );
}

function onDrop(targetId) {
    moveDocumentBefore(targetId);
    saveOrder();
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Documents" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        variant="small"
                        title="Documents"
                        description="Manage documents"
                    />
                    <Button as-child>
                        <Link href="/admin/documents/create">Add</Link>
                    </Button>
                </div>

                <Transition
                    enter-active-class="transition ease-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="success"
                        class="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                        {{ success }}
                    </p>
                </Transition>

                <Card>
                    <CardHeader class="sr-only">
                        <span>Document list</span>
                    </CardHeader>
                    <CardContent class="p-0">
                        <div class="divide-y divide-sidebar-border">
                            <div
                                v-for="d in localDocuments"
                                :key="d.id"
                                draggable="true"
                                class="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                                @dragstart="onDragStart(d.id)"
                                @dragover="onDragOver"
                                @drop="onDrop(d.id)"
                            >
                                <div class="min-w-0 flex-1">
                                    <p class="truncate font-medium text-foreground flex items-center gap-2">
                                        <GripVertical class="size-4 text-muted-foreground" />
                                        {{ d.title }}
                                    </p>
                                    <p class="truncate text-sm text-muted-foreground">
                                        Order: {{ d.order ?? 0 }} · {{ d.document_type || '—' }} · {{ d.file_extension || '—' }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Button
                                        v-if="(d.file_extension || '').toLowerCase() === 'pdf'"
                                        variant="outline"
                                        size="sm"
                                        as-child
                                    >
                                        <Link :href="`/reports/${d.id}`" target="_blank" rel="noopener noreferrer">
                                            View
                                        </Link>
                                    </Button>
                                    <Button v-else variant="outline" size="sm" as-child>
                                        <Link :href="d.file_url" target="_blank" rel="noopener noreferrer">
                                            Open
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" as-child>
                                        <Link :href="`/admin/documents/${d.id}/edit`">
                                            Edit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div
                                v-if="!localDocuments.length"
                                class="px-6 py-12 text-center text-sm text-muted-foreground"
                            >
                                No documents yet.
                            </div>
                        </div>
                        <div v-if="isSavingOrder" class="px-6 py-3 text-xs text-muted-foreground">
                            Saving new order...
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
