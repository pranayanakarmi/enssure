<script setup>
import { computed } from 'vue';
import GalleryImageLightbox from '@/components/guest/GalleryImageLightbox.vue';

const props = defineProps({
    album: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close']);

const open = computed(() => props.album !== null);


const images = computed(() => {
    const list = props.album?.images;
    if (Array.isArray(list) && list.length > 0) {
        return list.filter((img) => img?.image_url);
    }
    // If no images, but cover_image_url exists, show it as a fallback image
    if (props.album?.cover_image_url) {
        return [{
            image_url: props.album.cover_image_url,
            caption: props.album.title || '',
        }];
    }
    return [];
});

const footerLinkHref = computed(() =>
    props.album?.slug ? `/gallery/${props.album.slug}` : null,
);

function onClose() {
    emit('close');
}
</script>

<template>
    <GalleryImageLightbox
        :open="open"
        :images="images"
        :initial-index="0"
        :title="album?.title ?? ''"
        :footer-link-href="footerLinkHref"
        @close="onClose"
    />
</template>
