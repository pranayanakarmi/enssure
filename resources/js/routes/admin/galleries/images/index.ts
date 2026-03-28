import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:14
* @route '/admin/galleries/{gallery}/images'
*/
export const store = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/galleries/{gallery}/images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:14
* @route '/admin/galleries/{gallery}/images'
*/
store.url = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gallery: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { gallery: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            gallery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        gallery: typeof args.gallery === 'object'
        ? args.gallery.id
        : args.gallery,
    }

    return store.definition.url
            .replace('{gallery}', parsedArgs.gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:14
* @route '/admin/galleries/{gallery}/images'
*/
store.post = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const images = {
    store: Object.assign(store, store),
}

export default images