<script setup>
defineProps({
    members: {
        type: Array,
        default: () => [],
    },
    emptyMessage: {
        type: String,
        default: 'No members listed yet.',
    },
});
</script>

<template>
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
                        scope="col"
                        class="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                        Post
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr
                    v-for="(member, i) in members"
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
                    <td class="px-4 py-3 text-gray-700">
                        {{ member.job_title?.trim() ? member.job_title : '—' }}
                    </td>
                </tr>
                <tr v-if="!members.length">
                    <td
                        colspan="4"
                        class="px-4 py-10 text-center text-sm text-gray-500"
                    >
                        {{ emptyMessage }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
