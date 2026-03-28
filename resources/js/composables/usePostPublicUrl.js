import { computed } from 'vue';

function slugify(text) {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * @param {{ slug?: string, title?: string }} form Inertia useForm() (reactive).
 */
export function usePostPublicUrl(form) {
    const effectiveSlug = computed(() => {
        const s = (form.slug ?? '').trim();
        if (s) {
            return s;
        }

        return slugify(form.title ?? '');
    });

    const publicPostUrl = computed(() => {
        const slug = effectiveSlug.value;
        if (!slug) {
            return '';
        }
        const origin = typeof window !== 'undefined' ? window.location.origin : '';

        return origin ? `${origin}/posts/${slug}` : `/posts/${slug}`;
    });

    return { publicPostUrl };
}
