<script setup>
//
</script>

<template>
    <div class="min-h-screen bg-white">
        <header class="border-b border-gray-200 px-6 py-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <span class="text-xl font-semibold text-gray-900">My App</span>
            </div>
        </header>
        <main>
            <slot />
        </main>
        <footer class="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
            &copy; {{ new Date().getFullYear() }} My App
        </footer>
    </div>
</template>
