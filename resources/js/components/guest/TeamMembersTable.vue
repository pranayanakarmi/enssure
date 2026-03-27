<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    members: {
        type: Array,
        default: () => [],
    },
    emptyMessage: {
        type: String,
        default: 'No members listed yet.',
    },
    showLocationColumn: {
        type: Boolean,
        default: false,
    },
});

const selectedLocation = ref('All');

const locationOptions = computed(() => {
    if (!props.showLocationColumn) {
        return [];
    }

    const uniqueLocations = Array.from(
        new Set(
            (props.members || [])
                .map((member) => member.location?.trim())
                .filter((location) => Boolean(location)),
        ),
    );

    return ['All', ...uniqueLocations];
});

const filteredMembers = computed(() => {
    if (!props.showLocationColumn || selectedLocation.value === 'All') {
        return props.members || [];
    }

    return (props.members || []).filter((member) => member.location === selectedLocation.value);
});
</script>

<template>
    <div class="space-y-4">
        <div v-if="showLocationColumn" class="flex items-center justify-end">
            <select
                v-model="selectedLocation"
                class="h-10 rounded-md border border-[#cad0d8] bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
            >
                <option v-for="location in locationOptions" :key="location" :value="location">
                    {{ location }}
                </option>
            </select>
        </div>

        <div class="overflow-x-auto rounded-lg border border-[#cad0d8] bg-white shadow-sm">
        <table class="min-w-full text-left text-sm text-gray-900">
            <thead class="border-b border-[#cad0d8] bg-[#fafafa]">
                <tr>
                    <th
                        scope="col"
                        class="w-14 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                        S.No.
                    </th>
                    <th
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                        Department
                    </th>
                    <th
                        v-if="showLocationColumn"
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                        Location
                    </th>
                    <th
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                        Post
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr
                    v-for="(member, i) in filteredMembers"
                    :key="`${member.name}-${i}`"
                    class="transition-colors hover:bg-gray-50/90"
                >
                    <td class="px-4 py-3 tabular-nums text-gray-600">
                        {{ i + 1 }}
                    </td>
                    <td class="px-4 py-3 font-semibold text-gray-900">
                        {{ member.name }}
                    </td>
                    <td class="px-4 py-3 text-gray-700">
                        {{ member.department?.trim() ? member.department : '—' }}
                    </td>
                    <td v-if="showLocationColumn" class="px-4 py-3 text-gray-700">
                        {{ member.location?.trim() ? member.location : '—' }}
                    </td>
                    <td class="px-4 py-3 text-gray-700">
                        {{ member.job_title?.trim() ? member.job_title : '—' }}
                    </td>
                </tr>
                <tr v-if="!filteredMembers.length">
                    <td
                        :colspan="showLocationColumn ? 5 : 4"
                        class="px-4 py-10 text-center text-sm text-gray-500"
                    >
                        {{ emptyMessage }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
