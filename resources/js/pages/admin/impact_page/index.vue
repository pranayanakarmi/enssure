<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { ChevronDown, ChevronsUpDown, Edit, Image, FileText, BookOpen } from 'lucide-vue-next';
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/AppLayout.vue';

const groups = [
  {
    label: 'Impact Stories Page',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-500',
    sections: [
      { title: 'Hero', description: 'Edit the hero image and title', href: '/admin/impact-page/hero/edit', icon: Image },
      { title: 'Section', description: 'Update the section title and description', href: '/admin/impact-page/section/edit', icon: FileText },
      { title: 'Impact Stories', description: 'Manage individual impact stories', href: '/admin/impact_stories', icon: BookOpen },
    ],
  },
];

const totalSections = groups.reduce((sum, g) => sum + g.sections.length, 0);

// Collapsed state – all open by default
const collapsed = ref(Object.fromEntries(groups.map(g => [g.label, false])));

function toggle(label) {
  collapsed.value[label] = !collapsed.value[label];
}

const allCollapsed = computed(() => groups.every(g => collapsed.value[g.label]));

function toggleAll() {
  const next = !allCollapsed.value;
  groups.forEach(g => { collapsed.value[g.label] = next; });
}

const breadcrumbItems = [
  { title: 'Home Page', href: '/admin/home' },
  { title: 'Impact Stories Page', href: '/admin/impact-stories-page' },
];
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbItems">
    <Head title="Impact Stories Page Management" />

    <div class="flex h-full flex-1 flex-col gap-8 overflow-x-auto p-6">

      <!-- Page header -->
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold tracking-tight text-foreground">Impact Stories Page</h1>
          <p class="mt-1 text-sm text-muted-foreground">
            Manage the hero section, page content, and individual impact stories.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Collapse all toggle -->
          <button
            type="button"
            @click="toggleAll"
            class="flex items-center gap-1.5 rounded-lg border border-sidebar-border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ChevronsUpDown class="h-3.5 w-3.5" />
            {{ allCollapsed ? 'Expand all' : 'Collapse all' }}
          </button>
          <!-- Total count pill -->
          <div class="flex items-center gap-2 rounded-xl border border-sidebar-border bg-muted/40 px-4 py-2.5 text-sm">
            <span class="font-semibold text-foreground">{{ totalSections }}</span>
            <span class="text-muted-foreground">sections</span>
          </div>
        </div>
      </div>

      <!-- Groups -->
      <div class="flex flex-col gap-6">
        <div v-for="group in groups" :key="group.label" class="flex flex-col gap-0">

          <!-- Group header / toggle button -->
          <button
            type="button"
            @click="toggle(group.label)"
            class="group/header flex w-full items-center gap-2.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span :class="['h-2 w-2 shrink-0 rounded-full', group.dot]" />
            <span
              :class="['inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', group.color]"
            >{{ group.label }}</span>
            <div class="h-px flex-1 bg-sidebar-border/60" />
            <span class="text-xs text-muted-foreground">{{ group.sections.length }} block{{ group.sections.length > 1 ? 's' : '' }}</span>
            <ChevronDown
              :class="[
                'h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-300',
                collapsed[group.label] ? '-rotate-90' : 'rotate-0'
              ]"
            />
          </button>

          <!-- Collapsible section cards -->
          <div
            class="grid-rows-[1fr] overflow-hidden transition-all duration-300 ease-in-out"
            :class="collapsed[group.label] ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'"
            :style="collapsed[group.label]
              ? 'display:grid; grid-template-rows:0fr; opacity:0;'
              : 'display:grid; grid-template-rows:1fr; opacity:1;'"
          >
            <div class="min-h-0">
              <div class="grid gap-3 pt-3 pb-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Link
                  v-for="section in group.sections"
                  :key="section.title"
                  :href="section.href"
                  class="group relative flex flex-col gap-3 rounded-xl border border-sidebar-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <!-- Icon -->
                  <div
                    :class="[
                      'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200',
                      group.color
                    ]"
                  >
                    <component :is="section.icon" class="h-4 w-4" />
                  </div>

                  <!-- Text -->
                  <div class="flex flex-1 flex-col gap-0.5">
                    <span class="text-sm font-semibold text-foreground leading-snug">{{ section.title }}</span>
                    <span class="text-xs text-muted-foreground leading-relaxed">{{ section.description }}</span>
                  </div>

                  <!-- Edit indicator -->
                  <div class="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                    <Edit class="h-3 w-3" />
                    <span>Edit</span>
                  </div>

                  <!-- Hover accent line -->
                  <div
                    :class="[
                      'absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100',
                      group.dot
                    ]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </AppLayout>
</template>
