<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';

const props = defineProps({
    footerSetting: {
        type: Object,
        default: null,
    },
});

const setting = computed(() => props.footerSetting ?? {
    id: null,
    copyright_text: '',
    social_links: [],
});

const form = useForm({
    copyright_text: setting.value?.copyright_text ?? '',
    social_links: setting.value?.social_links?.length
        ? [...setting.value.social_links]
        : [
            { platform: 'facebook', url: '' },
            { platform: 'x', url: '' },
            { platform: 'youtube', url: '' },
        ],
});

function addSocialLink() {
    form.social_links.push({ platform: '', url: '' });
}

function removeSocialLink(index) {
    form.social_links.splice(index, 1);
}

const breadcrumbItems = [
    { title: 'Footer', href: '/admin/footer-columns' },
    { title: 'Footer settings', href: '#' },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Footer settings" />

        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Footer settings"
                    description="Copyright text and social links shown at the bottom of the footer."
                />

                <form
                    class="space-y-6"
                    @submit.prevent="form.put('/admin/footer-settings')"
                >
                    <div class="grid gap-2">
                        <Label for="copyright_text">Copyright text</Label>
                        <textarea
                            id="copyright_text"
                            v-model="form.copyright_text"
                            rows="2"
                            class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="© Copyright 2008 - 2026 enssure | Privacy Policy | Terms of Service"
                        />
                        <InputError :message="form.errors.copyright_text" />
                    </div>

                    <div class="grid gap-2">
                        <div class="flex items-center justify-between">
                            <Label>Social links</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                @click="addSocialLink"
                            >
                                Add
                            </Button>
                        </div>
                        <div
                            v-for="(item, index) in form.social_links"
                            :key="index"
                            class="flex flex-wrap items-end gap-2 rounded border p-2"
                        >
                            <div class="grid flex-1 gap-1">
                                <Label class="text-xs">Platform</Label>
                                <Input
                                    v-model="item.platform"
                                    placeholder="e.g. facebook, x, youtube"
                                    class="min-w-[120px]"
                                />
                            </div>
                            <div class="grid flex-1 gap-1">
                                <Label class="text-xs">URL</Label>
                                <Input
                                    v-model="item.url"
                                    type="url"
                                    placeholder="https://..."
                                />
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                @click="removeSocialLink(index)"
                            >
                                Remove
                            </Button>
                        </div>
                        <InputError :message="form.errors.social_links" />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button
                            type="submit"
                            :disabled="form.processing"
                        >
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            as-child
                        >
                            <Link href="/admin/footer-columns">Back</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </AppLayout>
</template>
