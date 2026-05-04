<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import PageHero from '@/components/guest/PageHero.vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    videos: {
        type: Array,
        default: () => [],
    },
});

const activeVideo = ref(null);
const isModalOpen = ref(false);

function openModal(video) {
    activeVideo.value = video;
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    isModalOpen.value = false;
    setTimeout(() => {
        if (!isModalOpen.value) activeVideo.value = null;
    }, 200);
    document.body.style.overflow = '';
}

function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?#]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

function getVimeoId(url) {
    if (!url) return null;
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

function getThumbnailUrl(video) {
    if (video.thumbnail) return video.thumbnail;
    const ytId = getYouTubeId(video.video_url);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    const vimeoId = getVimeoId(video.video_url);
    if (vimeoId) return `https://vumbnail.com/${vimeoId}.jpg`;
    return '/images/video-placeholder.jpg';
}

function getEmbedUrl(url) {
    if (!url) return '';
    const ytId = getYouTubeId(url);
    if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    const vimeoId = getVimeoId(url);
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    return url;
}

function isIframeUrl(url) {
    return !!(getYouTubeId(url) || getVimeoId(url));
}
</script>

<template>
    <GuestLayout>
        <Head title="Videos - ENSSURE" />
        <PageHero title="Videos" />
        <section class="py-20 lg:py-24 bg-white border-b border-[#D9D9D9]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6">
                        All Videos
                    </h2>
                    <p class="leading-relaxed text-gray-700 max-w-3xl mx-auto">
                        Explore our collection of videos showcasing our impact, events, and stories.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        v-for="(video, i) in videos"
                        :key="video.id || i"
                        class="group relative rounded-[30px] overflow-hidden aspect-square cursor-pointer block w-full text-left border-0 p-0 bg-transparent"
                        @click="openModal(video)"
                    >
                        <img
                            :src="getThumbnailUrl(video)"
                            :alt="video.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-[rgba(7,87,195,0.75)] opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                            <p class="text-white text-lg text-center px-8 leading-relaxed font-medium">
                                {{ video.title }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="!videos.length" class="py-16 text-center text-gray-500">
                    No videos yet.
                </div>
            </div>
        </section>
        <Teleport to="body">
            <Transition name="modal-fade">
                <div
                    v-if="isModalOpen"
                    class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    @click.self="closeModal"
                >
                    <div class="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            @click="closeModal"
                            class="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                        >
                            <span class="text-white">&times;</span>
                        </button>
                        <div class="relative aspect-video">
                            <iframe
                                v-if="activeVideo && isIframeUrl(activeVideo.video_url)"
                                :key="activeVideo.video_url"
                                :src="getEmbedUrl(activeVideo.video_url)"
                                class="absolute inset-0 w-full h-full"
                                frameborder="0"
                                allow="autoplay; fullscreen"
                                allowfullscreen
                            ></iframe>
                            <video
                                v-else-if="activeVideo"
                                controls
                                autoplay
                                class="absolute inset-0 w-full h-full"
                            >
                                <source :src="activeVideo.video_url" type="video/mp4" />
                            </video>
                        </div>
                        <div v-if="activeVideo" class="p-4 bg-black/80 text-white">
                            <h3 class="text-lg font-semibold">{{ activeVideo.title }}</h3>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </GuestLayout>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
    transition: transform 0.25s ease;
}
.modal-fade-enter-from .relative,
.modal-fade-leave-to .relative {
    transform: scale(0.95);
}
</style>
