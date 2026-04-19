<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    notice: {
        type: Object,
        default: null,
    },
});

const isOpen = ref(false);

const shouldRender = computed(() => Boolean(props.notice?.id));

function closeModal() {
    isOpen.value = false;
}

function isYouTubeUrl(url) {
    if (!url) return false;
    // Simple check for YouTube links
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

function youtubeEmbedUrl(url) {
    // Extract video ID and return embed URL
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

onMounted(() => {
    if (!props.notice?.id || typeof window === 'undefined') {
        return;
    }

    isOpen.value = true;
});
</script>

<template>
    <transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="shouldRender && isOpen"
            class="fixed inset-0 z-70 flex items-center justify-center bg-black/55 px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-label="Important notice"
            @click.self="closeModal"
        >
            <div class="flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-black/10" style="max-height: 88vh;">
                <div class="border-b border-slate-200 px-5 py-4">
                    <p class="text-xs font-semibold uppercase tracking-[0.16em] text-red-700">Important Notice</p>
                    <h2 class="mt-1 text-lg font-semibold text-slate-900">{{ notice.title }}</h2>
                </div>

                <div class="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                    <template v-if="notice.video_url && isYouTubeUrl(notice.video_url)">
                        <div class="w-full aspect-video rounded-xl overflow-hidden">
                            <iframe
                                :src="youtubeEmbedUrl(notice.video_url)"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                                class="w-full h-full"
                                :title="notice.title || 'Important Notice Video'"
                            ></iframe>
                        </div>
                    </template>
                    <img
                        v-if="notice.image_url && !(notice.video_url && isYouTubeUrl(notice.video_url))"
                        :src="notice.image_url"
                        :alt="notice.title"
                        class="h-64 w-full rounded-xl object-cover"
                    />

                    <p v-if="notice.description" class="text-sm leading-6 text-slate-700">
                        {{ notice.description }}
                    </p>
                </div>

                <div class="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
                    <button
                        type="button"
                        class="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        @click="closeModal"
                    >
                        Close
                    </button>

                    <a
                        v-if="notice.cta_url"
                        :href="notice.cta_url"
                        class="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                        @click="closeModal"
                    >
                        {{ notice.cta_text || 'Learn More' }}
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>
