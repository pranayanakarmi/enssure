<script setup>
import { Check, Copy } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const props = defineProps({
    url: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: 'Public page URL',
    },
});

const copied = ref(false);
let copyResetTimer = null;

async function copyUrl() {
    if (!props.url) {
        return;
    }
    try {
        await navigator.clipboard.writeText(props.url);
        copied.value = true;
        if (copyResetTimer) {
            clearTimeout(copyResetTimer);
        }
        copyResetTimer = setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch {
        // Clipboard may be unavailable (permissions, non-secure context).
    }
}
</script>

<template>
    <div class="grid gap-2">
        <Label>{{ label }}</Label>
        <div class="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <Input
                readonly
                tabindex="-1"
                class="min-w-0 font-mono text-sm"
                :model-value="url"
                :placeholder="
                    url ? '' : 'Set a slug or title to preview the public link'
                "
            />
            <Button
                type="button"
                variant="outline"
                class="shrink-0 sm:w-auto"
                :disabled="!url"
                @click="copyUrl"
            >
                <Check v-if="copied" class="size-4 text-green-600" />
                <Copy v-else class="size-4" />
                <span class="ml-2">{{ copied ? 'Copied' : 'Copy URL' }}</span>
            </Button>
        </div>
        <p v-if="!url" class="text-xs text-muted-foreground">
            The live page uses your slug, or an auto-generated slug from the title
            if the slug is left empty when saving.
        </p>
    </div>
</template>
