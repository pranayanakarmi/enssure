<script setup>
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import {
    Bold,
    Code,
    ImageIcon,
    Italic,
    Link2,
    List,
    ListOrdered,
    Quote,
    Redo2,
    SquareCode,
    Strikethrough,
    Undo2,
    Minus,
    Heading2,
    Heading3,
    RemoveFormatting,
    Pilcrow,
} from 'lucide-vue-next';
import { ref, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Start typing...',
    },
    uploadUrl: {
        type: String,
        default: '/admin/editor-images',
    },
});

const emit = defineEmits(['update:modelValue']);

function getCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

const imageInputRef = ref(null);

const editor = useEditor({
    content: props.modelValue || '',
    extensions: [
        StarterKit,
        Image.configure({
            HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' },
        }),
        Link.configure({
            openOnClick: false,
            HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' },
        }),
        Placeholder.configure({
            placeholder: props.placeholder,
        }),
    ],
    editorProps: {
        attributes: {
            class:
                'min-h-[160px] w-full p-3 text-foreground focus:outline-none [&_p]:mb-2 [&_ul]:list-disc [&_ol]:list-decimal [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold',
        },
    },
    onUpdate: ({ editor: e }) => {
        emit('update:modelValue', e.getHTML());
    },
    onTransaction: () => {
        toolbarUpdate.value += 1;
    },
});

const toolbarUpdate = ref(0);

watch(
    () => props.modelValue,
    (value) => {
        if (editor.value && value !== editor.value.getHTML()) {
            editor.value.commands.setContent(value || '', false);
        }
    },
);

function toggleBold() {
    editor.value?.chain().focus().toggleBold().run();
}

function toggleItalic() {
    editor.value?.chain().focus().toggleItalic().run();
}

function toggleStrike() {
    editor.value?.chain().focus().toggleStrike().run();
}

function toggleBulletList() {
    editor.value?.chain().focus().toggleBulletList().run();
}

function toggleOrderedList() {
    editor.value?.chain().focus().toggleOrderedList().run();
}

function setHeading(level) {
    editor.value?.chain().focus().toggleHeading({ level }).run();
}

function toggleBlockquote() {
    editor.value?.chain().focus().toggleBlockquote().run();
}

function toggleCode() {
    editor.value?.chain().focus().toggleCode().run();
}

function setCodeBlock() {
    editor.value?.chain().focus().toggleCodeBlock().run();
}

function setHorizontalRule() {
    editor.value?.chain().focus().setHorizontalRule().run();
}

function undo() {
    editor.value?.chain().focus().undo().run();
}

function redo() {
    editor.value?.chain().focus().redo().run();
}

function setLink() {
    const previous = editor.value?.getAttributes('link').href;
    const url = window.prompt('URL', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
        editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
    }
    const href = url.startsWith('http') ? url : `https://${url}`;
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href }).run();
}

function triggerImageUpload() {
    imageInputRef.value?.click();
}

async function onImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file || !editor.value) return;
    event.target.value = '';

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(props.uploadUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-XSRF-TOKEN': getCsrfToken() ?? '',
            },
            body: formData,
            credentials: 'same-origin',
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || 'Upload failed');
        }

        const { url } = await response.json();
        editor.value.chain().focus().setImage({ src: url }).run();
    } catch (err) {
        alert(err.message || 'Failed to upload image');
    }
}

function setParagraph() {
    editor.value?.chain().focus().setParagraph().run();
}

function clearFormatting() {
    editor.value?.chain().focus().clearNodes().unsetAllMarks().run();
}

onBeforeUnmount(() => {
    editor.value?.destroy();
});
</script>

<template>
    <div
        class="min-h-[180px] rounded-md border border-input bg-background text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
    >
        <div
            v-if="!editor"
            class="flex min-h-[160px] items-center p-3 text-muted-foreground"
        >
            Loading editor...
        </div>
        <template v-else>
            <div
                class="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 px-1 py-1"
                role="toolbar"
                aria-label="Formatting options"
                :data-state="toolbarUpdate"
            >
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('bold') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Bold"
                    @click="toggleBold"
                >
                    <Bold class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('italic') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Italic"
                    @click="toggleItalic"
                >
                    <Italic class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('strike') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Strikethrough"
                    @click="toggleStrike"
                >
                    <Strikethrough class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('code') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Inline code"
                    @click="toggleCode"
                >
                    <Code class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('link') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Insert link"
                    @click="setLink"
                >
                    <Link2 class="h-4 w-4" />
                </button>
                <input
                    ref="imageInputRef"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    class="hidden"
                    @change="onImageUpload"
                />
                <button
                    type="button"
                    class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                    title="Insert image"
                    @click="triggerImageUpload"
                >
                    <ImageIcon class="h-4 w-4" />
                </button>
                <span
                    class="mx-0.5 h-4 w-px bg-border"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('heading', { level: 2 }) ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Heading 2"
                    @click="setHeading(2)"
                >
                    <Heading2 class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('heading', { level: 3 }) ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Heading 3"
                    @click="setHeading(3)"
                >
                    <Heading3 class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('blockquote') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Quote"
                    @click="toggleBlockquote"
                >
                    <Quote class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('codeBlock') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Code block"
                    @click="setCodeBlock"
                >
                    <SquareCode class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                    title="Horizontal rule"
                    @click="setHorizontalRule"
                >
                    <Minus class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.isActive('heading') && !editor.isActive('blockquote') && !editor.isActive('codeBlock') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Paragraph"
                    @click="setParagraph"
                >
                    <Pilcrow class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted"
                    title="Clear formatting"
                    @click="clearFormatting"
                >
                    <RemoveFormatting class="h-4 w-4" />
                </button>
                <span
                    class="mx-0.5 h-4 w-px bg-border"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().undo() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Undo"
                    :disabled="!editor.can().undo()"
                    @click="undo"
                >
                    <Undo2 class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().redo() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Redo"
                    :disabled="!editor.can().redo()"
                    @click="redo"
                >
                    <Redo2 class="h-4 w-4" />
                </button>
                <span
                    class="mx-0.5 h-4 w-px bg-border"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('bulletList') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Bullet list"
                    @click="toggleBulletList"
                >
                    <List class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        editor.isActive('orderedList') ? 'bg-muted text-foreground' : 'text-muted-foreground',
                    ]"
                    title="Numbered list"
                    @click="toggleOrderedList"
                >
                    <ListOrdered class="h-4 w-4" />
                </button>
            </div>
            <EditorContent
                :editor="editor"
                class="rich-text-editor-content"
            />
        </template>
    </div>
</template>

<style scoped>
.rich-text-editor-content :deep(.tiptap) {
    min-height: 160px;
    outline: none;
}

.rich-text-editor-content :deep(.tiptap.is-editor-empty:first-child::before) {
    color: var(--muted-foreground);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

.rich-text-editor-content :deep(.tiptap blockquote) {
    border-left: 3px solid var(--border);
    margin: 0.5rem 0;
    padding-left: 1rem;
    color: var(--muted-foreground);
}

.rich-text-editor-content :deep(.tiptap pre) {
    background: var(--muted);
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
    overflow-x: auto;
    margin: 0.5rem 0;
}

.rich-text-editor-content :deep(.tiptap code) {
    font-size: 0.875em;
}

.rich-text-editor-content :deep(.tiptap pre code) {
    background: none;
    padding: 0;
}

.rich-text-editor-content :deep(.tiptap hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 0.75rem 0;
}

.rich-text-editor-content :deep(.tiptap a) {
    color: hsl(var(--primary));
    text-decoration: underline;
    cursor: pointer;
}

.rich-text-editor-content :deep(.tiptap a:hover) {
    text-decoration-thickness: 2px;
}

.rich-text-editor-content :deep(.tiptap img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
}
</style>
