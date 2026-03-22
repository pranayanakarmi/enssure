<script setup>
import { Link } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const props = defineProps({
    album: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close']);

const currentIndex = ref(0);

const dialogOpen = computed(() => props.album !== null);

function onDialogOpenChange(open) {
    if (!open) {
        emit('close');
    }
}

const images = computed(() => {
    const list = props.album?.images;
    if (!Array.isArray(list)) {
        return [];
    }
    return list.filter((img) => img?.image_url);
});

const currentImage = computed(() => images.value[currentIndex.value] ?? null);

watch(
    () => props.album,
    () => {
        currentIndex.value = 0;
    },
);

function goNext() {
    if (images.value.length === 0) {
        return;
    }
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

function goPrev() {
    if (images.value.length === 0) {
        return;
    }
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
}

function onKeydown(event) {
    if (!props.album) {
        return;
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

onMounted(() => {
    window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
    <Dialog :open="dialogOpen" @update:open="onDialogOpenChange">
        <DialogContent
            class="w-[min(100vw-2rem,56rem)] max-h-[90vh] overflow-y-auto p-0 gap-0 sm:max-w-[56rem]"
        >
            <DialogHeader class="sr-only">
                <DialogTitle>{{ album?.title ?? 'Album' }}</DialogTitle>
            </DialogHeader>

            <div v-if="album" class="flex flex-col">
                <div class="border-b border-border px-6 py-4 text-center sm:text-left">
                    <h2 class="text-lg font-semibold text-[#101010]">
                        {{ album.title }}
                    </h2>
                    <p
                        v-if="album.description"
                        class="mt-1 text-sm text-muted-foreground line-clamp-2"
                    >
                        {{ album.description }}
                    </p>
                </div>

                <div
                    v-if="images.length"
                    class="relative bg-black/5"
                >
                    <div class="flex min-h-[200px] max-h-[min(70vh,720px)] items-center justify-center p-4 sm:p-6">
                        <img
                            v-if="currentImage?.image_url"
                            :src="currentImage.image_url"
                            :alt="currentImage.caption || album.title"
                            class="max-h-[min(70vh,720px)] w-full object-contain"
                        />
                    </div>

                    <button
                        v-if="images.length > 1"
                        type="button"
                        class="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0757C3] shadow-md ring-1 ring-black/5 transition hover:bg-white"
                        aria-label="Previous image"
                        @click="goPrev"
                    >
                        <ChevronLeft class="size-6" />
                    </button>
                    <button
                        v-if="images.length > 1"
                        type="button"
                        class="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0757C3] shadow-md ring-1 ring-black/5 transition hover:bg-white"
                        aria-label="Next image"
                        @click="goNext"
                    >
                        <ChevronRight class="size-6" />
                    </button>

                    <div
                        v-if="images.length > 1"
                        class="absolute bottom-3 left-0 right-0 text-center text-sm font-medium text-[#101010]"
                    >
                        {{ currentIndex + 1 }} / {{ images.length }}
                    </div>
                </div>

                <div
                    v-if="currentImage?.caption"
                    class="border-t border-border px-6 py-3 text-center text-sm text-gray-700"
                >
                    {{ currentImage.caption }}
                </div>

                <div
                    v-if="!images.length"
                    class="px-6 py-12 text-center text-muted-foreground"
                >
                    No images in this album yet.
                </div>

                <div
                    v-if="album.slug"
                    class="flex justify-center border-t border-border px-6 py-4"
                >
                    <Link
                        :href="`/gallery/${album.slug}`"
                        class="text-sm font-medium text-[#0757C3] hover:underline"
                        @click="emit('close')"
                    >
                        Open full album page
                    </Link>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
