<script setup>
const partners = [
    '/enssure/assets/ac6be776c5bec31df9cf5f1bed529200ddb74c1a.png',
    '/enssure/assets/1bfd5b6a208521619b06244790669dd636449742.png',
    '/enssure/assets/ebbe48ec5c80c20d972673da35584cdc422ccc68.png',
    '/enssure/assets/d7c2ac1e901bc7bac7279f1006a3053183752132.png',
];
</script>

<template>
    <section class="py-20 lg:py-24 bg-white border-b border-[#cad0d8]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
                <div class="mb-6 flex justify-center">
                    <div
                        class="inline-flex items-center justify-center px-5 py-2 bg-[rgba(235,31,39,0.1)] rounded-full"
                    >
                        <span
                            class="font-semibold text-[#B91C1C] uppercase tracking-wide"
                        >
                            Our Partners
                        </span>
                    </div>
                </div>
                <h2
                    class="text-[2.5rem] leading-tight tracking-tight text-[#101010] mb-6"
                >
                    We work with the best Partners
                </h2>
            </div>
            <div
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
            >
                <div
                    v-for="(logo, i) in partners"
                    :key="i"
                    class="bg-white border border-[#cad0d8] rounded-[20px] p-8 flex items-center justify-center min-h-[186px] hover:border-[#B91C1C] transition-colors"
                >
                    <img
                        :src="logo"
                        alt="Partner logo"
                        class="max-w-[190px] max-h-[80px] object-contain"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
