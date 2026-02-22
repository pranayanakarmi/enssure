<script setup>
function scrollToContact() {
    const el = document.getElementById('contact');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
</script>

<template>
    <section
        id="contact"
        class="relative py-20 h-96 overflow-hidden"
    >
        <img
            src="/enssure/assets/abe0c310bdf95a63fc03463bc4d17ffa6bede19a.png"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
        />
        <div class="absolute inset-0 bg-black/40" />
        <div
            class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full flex items-center justify-center"
        >
            <div class="max-w-2xl mx-auto text-white">
                <span class="uppercase text-[#B91C1C]">JOIN US</span>
                <h2
                    class="text-[2.5rem] leading-tight tracking-tight mb-8 mt-2"
                >
                    Build Skills, Build Futures.
                    <span class="text-[#B91C1C]">Support sustainable</span>
                    employment today.
                </h2>
                <button
                    type="button"
                    class="uppercase bg-white text-black py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"
                    @click="scrollToContact"
                >
                    Contact us
                </button>
            </div>
        </div>
    </section>
</template>
