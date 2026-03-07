<script setup>
import { computed } from 'vue';

const props = defineProps({
    section: {
        type: Object,
        default: null,
    },
});

function scrollToContact() {
    const el = document.getElementById('contact');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

const badgeText = computed(() => props.section?.badge_text ?? 'JOIN US');
const title = computed(() => props.section?.title ?? 'Build Skills, Build Futures. Support sustainable employment today.');
const highlightPhrase = computed(() => props.section?.highlight_phrase ?? 'Support sustainable');
const buttonText = computed(() => props.section?.button_text ?? 'Contact us');
const backgroundImageUrl = computed(() => props.section?.background_image_url ?? null);

const titleParts = computed(() => {
    const t = title.value;
    const h = highlightPhrase.value;
    if (!h || !t.includes(h)) {
        return { before: t, highlight: '', after: '' };
    }
    const i = t.indexOf(h);
    return {
        before: t.slice(0, i),
        highlight: h,
        after: t.slice(i + h.length),
    };
});
</script>

<template>
    <section
        id="contact"
        class="relative py-20 h-96 overflow-hidden"
    >
        <img
            v-if="backgroundImageUrl"
            :src="backgroundImageUrl"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
            class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center"
        >
            <div class="max-w-2xl mx-auto text-white">
                <span class="uppercase text-[#B91C1C]">{{ badgeText }}</span>
                <h2
                    class="text-[2.5rem] leading-tight tracking-tight mb-8 mt-2"
                >
                    {{ titleParts.before }}
                    <span
                        v-if="titleParts.highlight"
                        class="text-[#B91C1C]"
                    >{{ titleParts.highlight }}</span>
                    {{ titleParts.after }}
                </h2>
                <button
                    type="button"
                    class="uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                    @click="scrollToContact"
                >
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </section>
</template>
