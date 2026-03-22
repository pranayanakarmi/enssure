<script setup>
import { useForm } from '@inertiajs/vue3';
import { X, Upload, FileText } from 'lucide-vue-next';
import { ref, watch, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    vacancyTitle: {
        type: String,
        default: '',
    },
    vacancySlug: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const fileInputRef = ref(null);
const resumeFileName = ref('');
const resumeClientError = ref('');
const isDragging = ref(false);

const MAX_BYTES = 5 * 1024 * 1024;

const form = useForm({
    name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: null,
});

const applyUrl = computed(() => (props.vacancySlug ? `/vacancy/${props.vacancySlug}/apply` : ''));

function resetFileUi() {
    resumeFileName.value = '';
    resumeClientError.value = '';
    form.resume = null;
    if (fileInputRef.value) {
        fileInputRef.value.value = '';
    }
}

function close() {
    emit('update:modelValue', false);
    form.reset();
    form.clearErrors();
    resetFileUi();
}

watch(
    () => props.modelValue,
    (open) => {
        if (!open) {
            form.reset();
            form.clearErrors();
            resetFileUi();
        }
    },
);

function validateAndAssignFile(file) {
    resumeClientError.value = '';
    if (!file) {
        return;
    }
    if (file.size > MAX_BYTES) {
        resumeClientError.value = 'File must be 5MB or smaller.';
        form.resume = null;
        resumeFileName.value = '';
        return;
    }
    const name = file.name || '';
    if (!/\.(pdf|doc|docx)$/i.test(name)) {
        resumeClientError.value = 'Please upload a PDF, DOC, or DOCX file.';
        form.resume = null;
        resumeFileName.value = '';
        return;
    }
    form.resume = file;
    resumeFileName.value = name;
}

function onFileInputChange(event) {
    const file = event.target.files?.[0];
    validateAndAssignFile(file);
}

function openFilePicker() {
    fileInputRef.value?.click();
}

function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    isDragging.value = true;
}

function onDragLeave() {
    isDragging.value = false;
}

function onDrop(event) {
    event.preventDefault();
    isDragging.value = false;
    const file = event.dataTransfer?.files?.[0];
    validateAndAssignFile(file);
}

function removeResume() {
    resetFileUi();
}

function submitApplication() {
    if (!props.vacancySlug) {
        return;
    }
    resumeClientError.value = '';
    if (!form.resume) {
        resumeClientError.value = 'Please attach your resume.';
        return;
    }
    form.post(applyUrl.value, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            close();
        },
    });
}

const displayError = computed(() => resumeClientError.value || form.errors.resume || '');
</script>

<template>
    <Teleport to="body">
        <div
            v-show="modelValue"
            class="fixed inset-0 z-[100]"
        >
            <div
                class="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
                @click="close"
            />
            <div class="absolute inset-0 flex items-center justify-center p-4">
                <div
                    class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="'vacancy-apply-title'"
                    @click.stop
                >
                    <button
                        type="button"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10 p-2"
                        aria-label="Close"
                        @click="close"
                    >
                        <X class="w-5 h-5" />
                    </button>
                    <div class="p-6 pb-0">
                        <h2
                            id="vacancy-apply-title"
                            class="text-2xl font-bold text-gray-900"
                        >
                            Apply for position
                        </h2>
                        <p class="text-sm text-[#B91C1C] font-medium mt-1">
                            {{ vacancyTitle }}
                        </p>
                    </div>
                    <form
                        class="p-6 space-y-4"
                        @submit.prevent="submitApplication"
                    >
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Full name <span class="text-red-500">*</span></label>
                            <input
                                v-model="form.name"
                                type="text"
                                required
                                autocomplete="name"
                                class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all"
                                placeholder="Enter your full name"
                            />
                            <p
                                v-if="form.errors.name"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ form.errors.name }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                            <input
                                v-model="form.email"
                                type="email"
                                required
                                autocomplete="email"
                                class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all"
                                placeholder="Enter your email address"
                            />
                            <p
                                v-if="form.errors.email"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ form.errors.email }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Phone number <span class="text-red-500">*</span></label>
                            <input
                                v-model="form.phone"
                                type="tel"
                                required
                                autocomplete="tel"
                                class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all"
                                placeholder="Enter your phone number"
                            />
                            <p
                                v-if="form.errors.phone"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ form.errors.phone }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Cover letter</label>
                            <textarea
                                v-model="form.cover_letter"
                                rows="4"
                                class="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/30 focus:border-[#B91C1C] bg-gray-50/30 transition-all resize-none"
                                placeholder="Tell us why you're a good fit for this role..."
                            />
                            <p
                                v-if="form.errors.cover_letter"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ form.errors.cover_letter }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Upload resume/CV <span class="text-red-500">*</span></label>
                            <input
                                ref="fileInputRef"
                                type="file"
                                class="sr-only"
                                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                @change="onFileInputChange"
                            >
                            <button
                                type="button"
                                class="w-full border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer"
                                :class="[
                                    isDragging
                                        ? 'border-[#B91C1C] bg-red-50/50'
                                        : displayError
                                            ? 'border-red-300 bg-red-50/30'
                                            : 'border-gray-200 hover:border-[#B91C1C]/40',
                                ]"
                                @click="openFilePicker"
                                @keydown.enter.prevent="openFilePicker"
                                @dragover="onDragOver"
                                @dragleave="onDragLeave"
                                @drop="onDrop"
                            >
                                <Upload class="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium text-[#B91C1C]">Click to upload</span>
                                    or drag and drop
                                </p>
                                <p class="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                            </button>
                            <div
                                v-if="resumeFileName"
                                class="mt-2 flex items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800"
                            >
                                <span class="flex min-w-0 items-center gap-2">
                                    <FileText class="h-4 w-4 shrink-0 text-gray-500" />
                                    <span class="truncate">{{ resumeFileName }}</span>
                                </span>
                                <button
                                    type="button"
                                    class="shrink-0 text-xs font-semibold uppercase text-[#B91C1C] hover:underline"
                                    @click="removeResume"
                                >
                                    Remove
                                </button>
                            </div>
                            <p
                                v-if="displayError"
                                class="mt-1 text-xs text-red-600"
                            >
                                {{ displayError }}
                            </p>
                        </div>
                        <div class="flex gap-3 pt-2">
                            <button
                                type="button"
                                class="flex-1 py-3 px-6 border border-gray-200 rounded-lg text-gray-700 font-semibold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                @click="close"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                class="flex-1 py-3 px-6 bg-[#B91C1C] rounded-lg text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#991b1b] transition-colors disabled:opacity-60"
                                :disabled="form.processing"
                            >
                                Submit application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Teleport>
</template>
