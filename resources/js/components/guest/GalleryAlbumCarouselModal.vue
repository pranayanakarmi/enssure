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
    if (!Array.isArray(list)) {
        return [];
    }

    return list.filter((img) => img?.image_url);
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
