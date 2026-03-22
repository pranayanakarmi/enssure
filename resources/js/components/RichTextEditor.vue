<script setup>
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TableKit } from '@tiptap/extension-table';
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
    Table2,
    Columns2,
    Rows,
    TableColumnsSplit,
    TableRowsSplit,
    Trash2,
    Combine,
    SplitSquareHorizontal,
} from 'lucide-vue-next';
import { onClickOutside } from '@vueuse/core';
import { ref, watch, onBeforeUnmount } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TABLE_GRID_SIZE = 10;
const TABLE_MAX_DIM = 30;
const tableGridCellCount = TABLE_GRID_SIZE * TABLE_GRID_SIZE;

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
        TableKit.configure({
            table: {
                resizable: true,
            },
        }),
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
                'min-h-[160px] w-full p-3 text-foreground focus:outline-none [&_p]:mb-2 [&_ul]:list-disc [&_ol]:list-decimal [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_td]:align-top [&_th]:border [&_th]:border-border [&_th]:bg-muted/50 [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold',
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

const tablePickerWrapRef = ref(null);
const showTablePicker = ref(false);
const tableHoverRow = ref(2);
const tableHoverCol = ref(2);
const tableCustomRows = ref(3);
const tableCustomCols = ref(3);
const tableWithHeaderRow = ref(true);

onClickOutside(tablePickerWrapRef, () => {
    showTablePicker.value = false;
});

function toggleTablePicker() {
    showTablePicker.value = !showTablePicker.value;
    if (showTablePicker.value) {
        tableHoverRow.value = 2;
        tableHoverCol.value = 2;
        tableCustomRows.value = 3;
        tableCustomCols.value = 3;
        tableWithHeaderRow.value = true;
    }
}

function onTableGridMouseEnter(cellIndex) {
    const r = Math.floor(cellIndex / TABLE_GRID_SIZE);
    const c = cellIndex % TABLE_GRID_SIZE;
    tableHoverRow.value = r;
    tableHoverCol.value = c;
    tableCustomRows.value = r + 1;
    tableCustomCols.value = c + 1;
}

function isTableGridCellHighlighted(cellIndex) {
    const r = Math.floor(cellIndex / TABLE_GRID_SIZE);
    const c = cellIndex % TABLE_GRID_SIZE;
    return r <= tableHoverRow.value && c <= tableHoverCol.value;
}

function onCustomDimensionInput() {
    const r = Math.min(Math.max(1, Number(tableCustomRows.value) || 1), TABLE_MAX_DIM);
    const c = Math.min(Math.max(1, Number(tableCustomCols.value) || 1), TABLE_MAX_DIM);
    tableCustomRows.value = r;
    tableCustomCols.value = c;
    tableHoverRow.value = Math.min(r, TABLE_GRID_SIZE) - 1;
    tableHoverCol.value = Math.min(c, TABLE_GRID_SIZE) - 1;
}

function performInsertTable() {
    const rows = Math.min(Math.max(1, Number(tableCustomRows.value) || 1), TABLE_MAX_DIM);
    const cols = Math.min(Math.max(1, Number(tableCustomCols.value) || 1), TABLE_MAX_DIM);
    editor.value
        ?.chain()
        .focus()
        .insertTable({
            rows,
            cols,
            withHeaderRow: tableWithHeaderRow.value && rows >= 1,
        })
        .run();
    showTablePicker.value = false;
}

function onTableGridClick(cellIndex) {
    onTableGridMouseEnter(cellIndex);
    performInsertTable();
}

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

function addColumnBefore() {
    editor.value?.chain().focus().addColumnBefore().run();
}

function addColumnAfter() {
    editor.value?.chain().focus().addColumnAfter().run();
}

function deleteColumn() {
    editor.value?.chain().focus().deleteColumn().run();
}

function addRowBefore() {
    editor.value?.chain().focus().addRowBefore().run();
}

function addRowAfter() {
    editor.value?.chain().focus().addRowAfter().run();
}

function deleteRow() {
    editor.value?.chain().focus().deleteRow().run();
}

function deleteTable() {
    editor.value?.chain().focus().deleteTable().run();
}

function mergeCells() {
    editor.value?.chain().focus().mergeCells().run();
}

function splitCell() {
    editor.value?.chain().focus().splitCell().run();
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
                <span
                    class="mx-0.5 h-4 w-px bg-border"
                    aria-hidden="true"
                />
                <div
                    ref="tablePickerWrapRef"
                    class="relative inline-flex"
                >
                    <button
                        type="button"
                        :class="[
                            'rounded p-1.5 transition-colors hover:bg-muted',
                            showTablePicker ? 'bg-muted text-foreground' : 'text-muted-foreground',
                        ]"
                        title="Insert table"
                        aria-haspopup="dialog"
                        :aria-expanded="showTablePicker"
                        @click="toggleTablePicker"
                    >
                        <Table2 class="h-4 w-4" />
                    </button>
                    <div
                        v-show="showTablePicker"
                        class="absolute left-0 top-full z-[200] mt-1 w-[min(100vw-2rem,20rem)] rounded-md border border-border bg-popover p-3 shadow-md"
                        role="dialog"
                        aria-label="Insert table"
                        @click.stop
                    >
                        <p class="mb-1 text-xs font-medium text-foreground">
                            Insert table
                        </p>
                        <p class="mb-2 text-xs text-muted-foreground">
                            Hover or click the grid (up to {{ TABLE_GRID_SIZE }}×{{ TABLE_GRID_SIZE }}), or set rows and columns (up to {{ TABLE_MAX_DIM }} each).
                        </p>
                        <div
                            class="mb-2 grid w-fit gap-0.5"
                            :style="{
                                gridTemplateColumns: `repeat(${TABLE_GRID_SIZE}, minmax(0, 1fr))`,
                            }"
                            role="grid"
                        >
                            <button
                                v-for="i in tableGridCellCount"
                                :key="i"
                                type="button"
                                class="h-3 w-3 rounded-sm border border-border transition-colors"
                                :class="
                                    isTableGridCellHighlighted(i - 1)
                                        ? 'border-primary bg-primary'
                                        : 'bg-muted/50 hover:bg-muted'
                                "
                                :aria-label="`Table ${Math.floor((i - 1) / TABLE_GRID_SIZE) + 1} by ${((i - 1) % TABLE_GRID_SIZE) + 1}`"
                                @mouseenter="onTableGridMouseEnter(i - 1)"
                                @click="onTableGridClick(i - 1)"
                            />
                        </div>
                        <p class="mb-3 text-center text-xs font-medium tabular-nums text-muted-foreground">
                            {{ tableCustomRows }} × {{ tableCustomCols }}
                        </p>
                        <div class="flex gap-3">
                            <div class="grid flex-1 gap-1.5">
                                <Label
                                    for="table-insert-rows"
                                    class="text-xs"
                                >Rows</Label>
                                <Input
                                    id="table-insert-rows"
                                    v-model.number="tableCustomRows"
                                    type="number"
                                    min="1"
                                    :max="TABLE_MAX_DIM"
                                    class="h-9"
                                    @input="onCustomDimensionInput"
                                />
                            </div>
                            <div class="grid flex-1 gap-1.5">
                                <Label
                                    for="table-insert-cols"
                                    class="text-xs"
                                >Columns</Label>
                                <Input
                                    id="table-insert-cols"
                                    v-model.number="tableCustomCols"
                                    type="number"
                                    min="1"
                                    :max="TABLE_MAX_DIM"
                                    class="h-9"
                                    @input="onCustomDimensionInput"
                                />
                            </div>
                        </div>
                        <label class="mt-3 flex cursor-pointer items-center gap-2 text-sm">
                            <input
                                v-model="tableWithHeaderRow"
                                type="checkbox"
                                class="rounded border-input"
                            />
                            <span>Include header row</span>
                        </label>
                        <div class="mt-3 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                @click="showTablePicker = false"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                @click="performInsertTable"
                            >
                                Insert
                            </Button>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().addColumnBefore() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Add column before"
                    :disabled="!editor.can().addColumnBefore()"
                    @click="addColumnBefore"
                >
                    <Columns2 class="h-4 w-4 rotate-180" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().addColumnAfter() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Add column after"
                    :disabled="!editor.can().addColumnAfter()"
                    @click="addColumnAfter"
                >
                    <Columns2 class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().deleteColumn() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Delete column"
                    :disabled="!editor.can().deleteColumn()"
                    @click="deleteColumn"
                >
                    <TableColumnsSplit class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().addRowBefore() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Add row before"
                    :disabled="!editor.can().addRowBefore()"
                    @click="addRowBefore"
                >
                    <Rows class="h-4 w-4 rotate-180" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().addRowAfter() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Add row after"
                    :disabled="!editor.can().addRowAfter()"
                    @click="addRowAfter"
                >
                    <Rows class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().deleteRow() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Delete row"
                    :disabled="!editor.can().deleteRow()"
                    @click="deleteRow"
                >
                    <TableRowsSplit class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().mergeCells() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Merge cells"
                    :disabled="!editor.can().mergeCells()"
                    @click="mergeCells"
                >
                    <Combine class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().splitCell() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Split cell"
                    :disabled="!editor.can().splitCell()"
                    @click="splitCell"
                >
                    <SplitSquareHorizontal class="h-4 w-4" />
                </button>
                <button
                    type="button"
                    :class="[
                        'rounded p-1.5 transition-colors hover:bg-muted',
                        !editor.can().deleteTable() ? 'cursor-not-allowed opacity-50' : 'text-muted-foreground hover:text-foreground',
                    ]"
                    title="Delete table"
                    :disabled="!editor.can().deleteTable()"
                    @click="deleteTable"
                >
                    <Trash2 class="h-4 w-4" />
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

.rich-text-editor-content :deep(.tableWrapper) {
    margin: 0.5rem 0;
    overflow-x: auto;
}
</style>
