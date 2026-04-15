<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { Edit, ImageIcon, FileText } from 'lucide-vue-next';
import AppLayout from '@/layouts/AppLayout.vue';

const breadcrumbItems = [
    { title: 'Home Page', href: '/admin/home' },
    { title: 'EOI / RFP', href: '/admin/eoi-rfp-dashboard' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="EOI / RFP Management" />

        <div class="flex h-full flex-1 flex-col gap-8 overflow-x-auto p-6">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-semibold tracking-tight text-foreground">EOI / RFP</h1>
                    <p class="mt-1 text-sm text-muted-foreground">
                        Manage hero settings and content items.
                    </p>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <!-- Hero Card -->
                <Link
                    href="/admin/eoi-rfp/hero"
                    class="group relative flex flex-col gap-3 rounded-xl border border-sidebar-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-purple-600">
                        <ImageIcon class="h-4 w-4" />
                    </div>
                    <div class="flex flex-1 flex-col gap-0.5">
                        <span class="text-sm font-semibold text-foreground leading-snug">Hero</span>
                        <span class="text-xs text-muted-foreground leading-relaxed">Edit page title, description and background image</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                        <Edit class="h-3 w-3" />
                        <span>Edit</span>
                    </div>
                    <div class="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-purple-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>

                <!-- Content Card -->
                <Link
                    href="/admin/eoi-rfp"
                    class="group relative flex flex-col gap-3 rounded-xl border border-sidebar-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600">
                        <FileText class="h-4 w-4" />
                    </div>
                    <div class="flex flex-1 flex-col gap-0.5">
                        <span class="text-sm font-semibold text-foreground leading-snug">Content</span>
                        <span class="text-xs text-muted-foreground leading-relaxed">Manage EOI and RFP items (create, edit, delete)</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                        <Edit class="h-3 w-3" />
                        <span>Manage</span>
                    </div>
                    <div class="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-blue-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
            </div>
        </div>
    </AppLayout>
</template>
