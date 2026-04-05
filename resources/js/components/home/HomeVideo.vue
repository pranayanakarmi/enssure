<!-- components/home/HomeVideo.vue -->
<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { Play, X, ArrowRight } from 'lucide-vue-next';

// ── Static fallback data ───────────────────────────────────────────────────
const defaultBadge       = 'Featured Videos';
const defaultTitle       = 'Watch Our\nImpact in Action';
const defaultDescription = 'See how our programs are transforming lives and communities across Nepal.';

const defaultVideos = [
    {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title:    'Community Empowerment in Action',
        date:     '2024-03-15',
    },
    {
        videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        title:    'Policy Dialogue with Parliamentarians',
        date:     '2024-02-28',
    },
    {
        videoUrl: 'https://www.youtube.com/watch?v=RvkEz51-7B8',
        title:    'Success Stories from the Field',
        date:     '2024-01-10',
    },
];

const props = defineProps({
    videoSection: {
        type: Object,
        default: null,
    },
});

const badgeText   = computed(() => props.videoSection?.badge_text  ?? defaultBadge);
const title       = computed(() => props.videoSection?.title       ?? defaultTitle);
const description = computed(() => props.videoSection?.description ?? defaultDescription);

const videos = computed(() => {
    const sectionVideos = props.videoSection?.videos;
    if (sectionVideos?.length) {
        return sectionVideos.slice(0, 3).map(v => ({
            videoUrl:  v.video_url,
            title:     v.title,
            date:      v.date ?? null,
            thumbnail: v.thumbnail ?? null,
        }));
    }
    return defaultVideos;
});

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
    const ytId = getYouTubeId(video.videoUrl);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    const vimeoId = getVimeoId(video.videoUrl);
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

function formatDate(dateStr) {
    if (!dateStr) return null;
    try {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
        }).format(new Date(dateStr));
    } catch {
        return null;
    }
}

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

const sectionRef = ref(null);
const isVisible  = ref(false);
let observer     = null;

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                observer.disconnect();
            }
        },
        { threshold: 0.1 },
    );
    if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
    <!-- ✅ Added top border + kept bottom border and background -->
    <section
        id="video"
        ref="sectionRef"
        class="py-20 lg:py-24 bg-gray-50 border-t border-b border-[#cad0d8] overflow-hidden"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div
                class="md:flex mb-12 lg:mb-16 transition-all duration-700 ease-out"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            >
                <div class="md:w-2/6">
                    <div class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full">
                        <span class="font-semibold text-[#B91C1C] uppercase tracking-wide text-sm">
                            {{ badgeText }}
                        </span>
                    </div>
                    <h2 class="text-[2.5rem] leading-tight tracking-tight text-[#101010] max-w-md mt-4 whitespace-pre-line">
                        {{ title }}
                    </h2>
                </div>
                <div class="md:w-4/6 mt-8 md:mt-0 md:pl-10 flex items-center">
                    <p v-if="description" class="leading-relaxed text-gray-600">
                        {{ description }}
                    </p>
                </div>
            </div>

            <!-- Videos Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div
                    v-for="(video, i) in videos"
                    :key="i"
                    class="group cursor-pointer transition-all duration-700 ease-out"
                    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
                    :style="{ transitionDelay: `${i * 120}ms` }"
                    @click="openModal(video)"
                >
                    <div class="relative rounded-[30px] overflow-hidden mb-5 aspect-[367/302]">
                        <img
                            :src="getThumbnailUrl(video)"
                            :alt="video.title || 'Video thumbnail'"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            @error="(e) => { e.target.src = '/images/fallback-thumb.jpg' }"
                        />
                        <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <div class="w-14 h-14 rounded-full bg-[#B91C1C] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                                <Play class="w-7 h-7 text-white ml-1" />
                            </div>
                        </div>
                        <div
                            v-if="formatDate(video.date)"
                            class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700"
                        >
                            {{ formatDate(video.date) }}
                        </div>
                    </div>

                    <h3 class="text-lg leading-relaxed text-gray-900 mb-4 tracking-tight group-hover:text-[#B91C1C] transition-colors duration-300 line-clamp-2">
                        {{ video.title }}
                    </h3>

                    <div class="inline-flex items-center gap-2 text-black group-hover:text-[#B91C1C] uppercase font-medium text-sm transition-colors duration-300">
                        Watch now
                        <ArrowRight class="w-4 h-4 text-[#B91C1C]" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
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
                            <X class="w-6 h-6 text-white" />
                        </button>
                        <div class="relative aspect-video">
                            <iframe
                                v-if="activeVideo && isIframeUrl(activeVideo.videoUrl)"
                                :key="activeVideo.videoUrl"
                                :src="getEmbedUrl(activeVideo.videoUrl)"
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
                                <source :src="activeVideo.videoUrl" type="video/mp4" />
                            </video>
                        </div>
                        <div v-if="activeVideo" class="p-4 bg-black/80 text-white">
                            <h3 class="text-lg font-semibold">{{ activeVideo.title }}</h3>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
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
