<script setup>
import { Layers, Shield } from 'lucide-vue-next';
import { computed, nextTick, onMounted, watch } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const props = defineProps({
    permissionGroups: {
        type: Array,
        default: () => [],
    },
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);

const groupMasterEls = new Map();

const totalPermissionSlots = computed(() =>
    props.permissionGroups.reduce((sum, g) => sum + g.permissions.length, 0),
);

const selectedCount = computed(() => props.modelValue.length);

function permissionNamesInGroup(group) {
    return group.permissions.map((p) => p.name);
}

function selectedCountInGroup(group) {
    const names = permissionNamesInGroup(group);

    return names.filter((n) => props.modelValue.includes(n)).length;
}

function setGroupMasterRef(groupKey, el) {
    if (el) {
        groupMasterEls.set(groupKey, el);
    } else {
        groupMasterEls.delete(groupKey);
    }
    nextTick(() => syncGroupMasterForKey(groupKey));
}

function syncGroupMasterForKey(groupKey) {
    const el = groupMasterEls.get(groupKey);
    if (!el) {
        return;
    }
    const group = props.permissionGroups.find((g) => g.key === groupKey);
    if (!group) {
        return;
    }
    const names = permissionNamesInGroup(group);
    const n = names.filter((x) => props.modelValue.includes(x)).length;
    el.indeterminate = n > 0 && n < names.length;
    el.checked = names.length > 0 && n === names.length;
}

function syncAllGroupMasters() {
    for (const g of props.permissionGroups) {
        syncGroupMasterForKey(g.key);
    }
}

watch(
    () => [...props.modelValue],
    () => nextTick(syncAllGroupMasters),
);

watch(
    () => props.permissionGroups,
    () => nextTick(syncAllGroupMasters),
    { deep: true },
);

onMounted(() => nextTick(syncAllGroupMasters));

function onGroupMasterChange(event, group) {
    const checked = event.target.checked;
    const names = permissionNamesInGroup(group);
    let next = [...props.modelValue];
    if (checked) {
        next = [...new Set([...next, ...names])];
    } else {
        next = next.filter((p) => !names.includes(p));
    }
    emit('update:modelValue', next);
    nextTick(syncGroupMasterForKey(group.key));
}

function isPermissionChecked(name) {
    return props.modelValue.includes(name);
}

function onPermissionChange(name, checked) {
    let next = [...props.modelValue];
    if (checked && !next.includes(name)) {
        next.push(name);
    }
    if (!checked) {
        next = next.filter((p) => p !== name);
    }
    emit('update:modelValue', next);
}

function permissionPillClass(checked) {
    return checked
        ? 'border-primary/35 bg-primary/8 text-foreground shadow-sm ring-1 ring-primary/15'
        : 'border-border/80 bg-background text-muted-foreground hover:border-border hover:bg-muted/40';
}
</script>

<template>
    <div>
        <div
            v-if="permissionGroups.length"
            class="rounded-xl border border-border/80 bg-gradient-to-b from-muted/30 to-muted/5 p-4 shadow-sm dark:from-muted/15 dark:to-muted/5 sm:p-5"
        >
            <div class="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div class="flex min-w-0 gap-3">
                    <div
                        class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary shadow-sm ring-1 ring-primary/10 dark:bg-primary/15"
                    >
                        <Shield
                            class="size-5"
                            aria-hidden="true"
                        />
                    </div>
                    <div class="min-w-0 space-y-1">
                        <div class="flex flex-wrap items-center gap-2">
                            <Label class="text-base font-semibold leading-none tracking-tight text-foreground">
                                Permissions
                            </Label>
                            <Badge
                                variant="secondary"
                                class="tabular-nums text-xs font-medium"
                            >
                                {{ selectedCount }} / {{ totalPermissionSlots }} selected
                            </Badge>
                        </div>
                        <p class="max-w-xl text-sm leading-relaxed text-muted-foreground">
                            Organized by module. Check the module row to toggle all four actions at once, or pick
                            View, Create, Update, and Delete individually.
                        </p>
                    </div>
                </div>
                <div
                    class="flex items-center gap-1.5 text-xs text-muted-foreground sm:flex-col sm:items-end sm:text-right"
                >
                    <span class="inline-flex items-center gap-1 font-medium text-foreground/80">
                        <Layers
                            class="size-3.5 opacity-70"
                            aria-hidden="true"
                        />
                        {{ permissionGroups.length }} modules
                    </span>
                </div>
            </div>

            <div
                class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            >
                <div
                    v-for="group in permissionGroups"
                    :key="group.key"
                    class="flex flex-col overflow-hidden rounded-lg border border-border/90 bg-card text-card-foreground shadow-sm transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-md dark:border-border dark:hover:border-primary/25"
                >
                    <div
                        class="flex items-center gap-2 border-b border-border/70 bg-muted/50 px-3 py-2 dark:bg-muted/30"
                    >
                        <input
                            type="checkbox"
                            class="size-3.5 shrink-0 rounded border-input text-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                            :ref="(el) => setGroupMasterRef(group.key, el)"
                            :aria-label="`Select all permissions for ${group.label}`"
                            @change="onGroupMasterChange($event, group)"
                        />
                        <span class="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                            {{ group.label }}
                        </span>
                        <Badge
                            variant="outline"
                            class="shrink-0 tabular-nums text-[10px] font-medium text-muted-foreground"
                        >
                            {{ selectedCountInGroup(group) }}/{{ group.permissions.length }}
                        </Badge>
                    </div>
                    <div class="p-2.5">
                        <div
                            class="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
                            role="group"
                            :aria-label="`Actions for ${group.label}`"
                        >
                            <label
                                v-for="perm in group.permissions"
                                :key="perm.name"
                                :class="[
                                    'flex cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-center text-xs font-medium transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
                                    permissionPillClass(isPermissionChecked(perm.name)),
                                ]"
                            >
                                <input
                                    type="checkbox"
                                    class="size-3.5 shrink-0 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-0"
                                    :checked="isPermissionChecked(perm.name)"
                                    @change="onPermissionChange(perm.name, $event.target.checked)"
                                />
                                <span class="min-w-0 select-none truncate">{{ perm.action_label }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p
            v-else
            class="rounded-lg border border-dashed border-border bg-muted/20 px-4 py-6 text-center text-sm text-muted-foreground"
        >
            No permissions have been created yet. Permissions can be added programmatically.
        </p>
    </div>
</template>
