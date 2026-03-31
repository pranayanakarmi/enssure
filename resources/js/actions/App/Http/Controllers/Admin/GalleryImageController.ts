import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:14
* @route '/admin/galleries/{gallery}/images'
*/
export const store = (args: { gallery: number | { id: number } } | [gallery: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
store.url = (args: { gallery: number | { id: number } } | [gallery: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
store.post = (args: { gallery: number | { id: number } } | [gallery: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:14
* @route '/admin/galleries/{gallery}/images'
*/
const storeForm = (args: { gallery: number | { id: number } } | [gallery: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::store
* @see app/Http/Controllers/Admin/GalleryImageController.php:14
* @route '/admin/galleries/{gallery}/images'
*/
storeForm.post = (args: { gallery: number | { id: number } } | [gallery: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:28
* @route '/admin/gallery-images/{gallery_image}'
*/
export const update = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/gallery-images/{gallery_image}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:28
* @route '/admin/gallery-images/{gallery_image}'
*/
update.url = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gallery_image: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { gallery_image: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            gallery_image: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        gallery_image: typeof args.gallery_image === 'object'
        ? args.gallery_image.id
        : args.gallery_image,
    }

    return update.definition.url
            .replace('{gallery_image}', parsedArgs.gallery_image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:28
* @route '/admin/gallery-images/{gallery_image}'
*/
update.put = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:28
* @route '/admin/gallery-images/{gallery_image}'
*/
const updateForm = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::update
* @see app/Http/Controllers/Admin/GalleryImageController.php:28
* @route '/admin/gallery-images/{gallery_image}'
*/
updateForm.put = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:35
* @route '/admin/gallery-images/{gallery_image}'
*/
export const destroy = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/gallery-images/{gallery_image}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:35
* @route '/admin/gallery-images/{gallery_image}'
*/
destroy.url = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gallery_image: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { gallery_image: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            gallery_image: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        gallery_image: typeof args.gallery_image === 'object'
        ? args.gallery_image.id
        : args.gallery_image,
    }

    return destroy.definition.url
            .replace('{gallery_image}', parsedArgs.gallery_image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:35
* @route '/admin/gallery-images/{gallery_image}'
*/
destroy.delete = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:35
* @route '/admin/gallery-images/{gallery_image}'
*/
const destroyForm = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryImageController::destroy
* @see app/Http/Controllers/Admin/GalleryImageController.php:35
* @route '/admin/gallery-images/{gallery_image}'
*/
destroyForm.delete = (args: { gallery_image: number | { id: number } } | [gallery_image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const GalleryImageController = { store, update, destroy }

export default GalleryImageController