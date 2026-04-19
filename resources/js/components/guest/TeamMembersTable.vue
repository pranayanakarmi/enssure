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
const search = ref('');

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

const sortKey = ref('order');
const sortAsc = ref(true);
const currentPage = ref(1);
const perPage = ref(10);

const filteredMembers = computed(() => {
    let members = props.members || [];
    // Filter by location (single-select)
    if (props.showLocationColumn && selectedLocation.value !== 'All') {
        members = members.filter((member) => member.location === selectedLocation.value);
    }
    // Filter by search (name, department, job title)
    if (search.value.trim()) {
        const q = search.value.trim().toLowerCase();
        members = members.filter((member) => {
            return (
                (member.name && member.name.toLowerCase().includes(q)) ||
                (member.department && member.department.toLowerCase().includes(q)) ||
                (member.job_title && member.job_title.toLowerCase().includes(q))
            );
        });
    }
    // Sort
    members = [...members].sort((a, b) => {
        let aVal = a[sortKey.value] ?? '';
        let bVal = b[sortKey.value] ?? '';
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        if (aVal < bVal) return sortAsc.value ? -1 : 1;
        if (aVal > bVal) return sortAsc.value ? 1 : -1;
        return 0;
    });
    return members;
});

const paginatedMembers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return filteredMembers.value.slice(start, start + perPage.value);
});

const totalPages = computed(() => Math.ceil(filteredMembers.value.length / perPage.value) || 1);

function setSort(key) {
    if (sortKey.value === key) {
        sortAsc.value = !sortAsc.value;
    } else {
        sortKey.value = key;
        sortAsc.value = true;
    }
    currentPage.value = 1;
}
</script>

<template>

    <div class="space-y-4">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div class="flex-1">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search by name, department, or post..."
                    class="w-full rounded-md border border-[#cad0d8] px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                />
            </div>
            <div v-if="showLocationColumn" class="flex items-center gap-2 mt-2 md:mt-0">
                <label class="text-sm text-gray-700 font-medium">Location:</label>
                <select
                    v-model="selectedLocation"
                    class="min-w-[160px] rounded-md border border-[#cad0d8] bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                >
                    <option v-for="location in locationOptions" :key="location" :value="location">
                        {{ location }}
                    </option>
                </select>
            </div>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white shadow-lg">
        <table class="min-w-full text-left text-sm text-gray-900">
            <thead class="border-b border-[#e5e7eb] bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                <tr>
                    <th
                        scope="col"
                        class="w-14 px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 cursor-pointer select-none"
                        @click="setSort('order')"
                    >
                        S.No.
                        <span v-if="sortKey === 'order'">
                            <svg v-if="sortAsc" class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                            <svg v-else class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                    </th>
                    <th
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 cursor-pointer select-none"
                        @click="setSort('name')"
                    >
                        Name
                        <span v-if="sortKey === 'name'">
                            <svg v-if="sortAsc" class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                            <svg v-else class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                    </th>
                    <th
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 cursor-pointer select-none"
                        @click="setSort('department')"
                    >
                        Department
                        <span v-if="sortKey === 'department'">
                            <svg v-if="sortAsc" class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                            <svg v-else class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                    </th>
                    <th
                        v-if="showLocationColumn"
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 cursor-pointer select-none"
                        @click="setSort('location')"
                    >
                        Location
                        <span v-if="sortKey === 'location'">
                            <svg v-if="sortAsc" class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                            <svg v-else class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                    </th>
                    <th
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 cursor-pointer select-none"
                        @click="setSort('job_title')"
                    >
                        Post
                        <span v-if="sortKey === 'job_title'">
                            <svg v-if="sortAsc" class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
                            <svg v-else class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(member, i) in paginatedMembers"
                    :key="`${member.name}-${i}`"
                    :class="[
                        'transition-colors',
                        i % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]',
                        'hover:bg-[#f3f4f6]',
                        i === 0 && currentPage === 1 ? 'border-l-4 border-[#B91C1C] bg-[#fff7f7]' : '',
                        'rounded-xl'
                    ]"
                >
                    <td class="px-4 py-3 tabular-nums text-gray-600 font-bold">
                        {{ (currentPage - 1) * perPage + i + 1 }}
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
        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex items-center justify-between mt-4 px-2">
            <div class="text-sm text-gray-600">
                Page {{ currentPage }} of {{ totalPages }}
            </div>
            <div class="flex items-center gap-2">
                <button
                    class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    :disabled="currentPage === 1"
                    @click="currentPage = 1"
                >First</button>
                <button
                    class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                >Prev</button>
                <button
                    class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    :disabled="currentPage === totalPages"
                    @click="currentPage++"
                >Next</button>
                <button
                    class="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    :disabled="currentPage === totalPages"
                    @click="currentPage = totalPages"
                >Last</button>
            </div>
            <div class="flex items-center gap-1 text-sm">
                <label for="perPage" class="text-gray-600">Rows per page:</label>
                <select id="perPage" v-model.number="perPage" class="rounded-md border border-gray-300 px-2 py-1">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                </select>
            </div>
        </div>
    </div>
    </div>
</template>
