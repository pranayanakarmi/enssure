<script setup>
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next';
import { computed, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    images: {
        type: Array,
        default: () => [],
    },
    initialIndex: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        default: '',
    },
    footerLinkHref: {
        type: String,
        default: null,
    },
    footerLinkLabel: {
        type: String,
        default: 'Open full album page',
    },
});

const emit = defineEmits(['close']);

const currentIndex = ref(0);

const validImages = computed(() => {
    const list = props.images;
    if (!Array.isArray(list)) {
        return [];
    }

    return list.filter((img) => img?.image_url);
});

const currentImage = computed(() => validImages.value[currentIndex.value] ?? null);

function clampIndex(index) {
    const n = validImages.value.length;
    if (n === 0) {
        return 0;
    }

    return Math.max(0, Math.min(index, n - 1));
}

function goNext() {
    if (validImages.value.length === 0) {
        return;
    }
    currentIndex.value = (currentIndex.value + 1) % validImages.value.length;
}

function goPrev() {
    if (validImages.value.length === 0) {
        return;
    }
    currentIndex.value = (currentIndex.value - 1 + validImages.value.length) % validImages.value.length;
}

function close() {
    emit('close');
}

function onKeydown(event) {
    if (!props.open) {
        return;
    }
    if (event.key === 'Escape') {
        event.preventDefault();
        close();
    }
    if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
    }
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
    }
}

watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) {
            currentIndex.value = clampIndex(props.initialIndex);
            window.addEventListener('keydown', onKeydown);
            document.body.style.overflow = 'hidden';
        } else {
            window.removeEventListener('keydown', onKeydown);
            document.body.style.overflow = '';
        }
    },
);

watch(
    () => props.initialIndex,
    (index) => {
        if (props.open) {
            currentIndex.value = clampIndex(index);
        }
    },
);

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
    document.body.style.overflow = '';
});
</script>

<template>
    <Teleport to="body">
        <div
            v-if="open"
            class="fixed inset-0 z-[200] flex flex-col bg-black/95 text-white"
            role="dialog"
            aria-modal="true"
            :aria-label="title || 'Image gallery'"
        >
            <div class="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
                <p class="min-w-0 truncate text-sm font-medium sm:text-base">
                    {{ title || 'Gallery' }}
                </p>
                <button
                    type="button"
                    class="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Close"
                    @click="close"
                >
                    <X class="size-5" />
                </button>
            </div>

            <div class="relative flex min-h-0 flex-1 items-center justify-center">
                <template v-if="validImages.length">
                    <button
                        v-if="validImages.length > 1"
                        type="button"
                        class="absolute left-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0757C3] shadow-lg ring-1 ring-black/10 transition hover:bg-white/95 sm:left-4 sm:size-12"
                        aria-label="Previous image"
                        @click="goPrev"
                    >
                        <ChevronLeft class="size-7 sm:size-8" />
                    </button>
                    <button
                        v-if="validImages.length > 1"
                        type="button"
                        class="absolute right-2 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0757C3] shadow-lg ring-1 ring-black/10 transition hover:bg-white/95 sm:right-4 sm:size-12"
                        aria-label="Next image"
                        @click="goNext"
                    >
                        <ChevronRight class="size-7 sm:size-8" />
                    </button>

                    <div class="flex max-h-full w-full flex-col items-center justify-center px-4 py-4 sm:px-20 sm:py-8">
                        <img
                            v-if="currentImage?.image_url"
                            :src="currentImage.image_url"
                            :alt="currentImage.caption || title || 'Gallery image'"
                            class="max-h-[calc(100dvh-12rem)] max-w-full object-contain"
                        />
                        <p
                            v-if="validImages.length > 1"
                            class="mt-4 text-sm text-white/80"
                        >
                            {{ currentIndex + 1 }} / {{ validImages.length }}
                        </p>
                    </div>
                </template>

                <p
                    v-else
                    class="px-6 text-center text-sm text-white/70"
                >
                    No images to display.
                </p>
            </div>

            <div
                v-if="currentImage?.caption"
                class="shrink-0 border-t border-white/10 px-4 py-3 text-center text-sm text-white/90 sm:px-6"
            >
                {{ currentImage.caption }}
            </div>

            <div
                v-if="footerLinkHref"
                class="flex shrink-0 justify-center border-t border-white/10 px-4 py-3 sm:px-6"
            >
                <Link
                    :href="footerLinkHref"
                    class="text-sm font-medium text-[#7eb6ff] hover:underline"
                    @click="close"
                >
                    {{ footerLinkLabel }}
                </Link>
            </div>
        </div>
    </Teleport>
</template>
