import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalleryController::index
* @see app/Http/Controllers/Admin/GalleryController.php:17
* @route '/admin/galleries'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/galleries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::index
* @see app/Http/Controllers/Admin/GalleryController.php:17
* @route '/admin/galleries'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::index
* @see app/Http/Controllers/Admin/GalleryController.php:17
* @route '/admin/galleries'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::index
* @see app/Http/Controllers/Admin/GalleryController.php:17
* @route '/admin/galleries'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::create
* @see app/Http/Controllers/Admin/GalleryController.php:41
* @route '/admin/galleries/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/galleries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::create
* @see app/Http/Controllers/Admin/GalleryController.php:41
* @route '/admin/galleries/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::create
* @see app/Http/Controllers/Admin/GalleryController.php:41
* @route '/admin/galleries/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::create
* @see app/Http/Controllers/Admin/GalleryController.php:41
* @route '/admin/galleries/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::store
* @see app/Http/Controllers/Admin/GalleryController.php:48
* @route '/admin/galleries'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/galleries',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::store
* @see app/Http/Controllers/Admin/GalleryController.php:48
* @route '/admin/galleries'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::store
* @see app/Http/Controllers/Admin/GalleryController.php:48
* @route '/admin/galleries'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::show
* @see app/Http/Controllers/Admin/GalleryController.php:0
* @route '/admin/galleries/{gallery}'
*/
export const show = (args: { gallery: string | number } | [gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/galleries/{gallery}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::show
* @see app/Http/Controllers/Admin/GalleryController.php:0
* @route '/admin/galleries/{gallery}'
*/
show.url = (args: { gallery: string | number } | [gallery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gallery: args }
    }

    if (Array.isArray(args)) {
        args = {
            gallery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        gallery: args.gallery,
    }

    return show.definition.url
            .replace('{gallery}', parsedArgs.gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::show
* @see app/Http/Controllers/Admin/GalleryController.php:0
* @route '/admin/galleries/{gallery}'
*/
show.get = (args: { gallery: string | number } | [gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::show
* @see app/Http/Controllers/Admin/GalleryController.php:0
* @route '/admin/galleries/{gallery}'
*/
show.head = (args: { gallery: string | number } | [gallery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::edit
* @see app/Http/Controllers/Admin/GalleryController.php:66
* @route '/admin/galleries/{gallery}/edit'
*/
export const edit = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/galleries/{gallery}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::edit
* @see app/Http/Controllers/Admin/GalleryController.php:66
* @route '/admin/galleries/{gallery}/edit'
*/
edit.url = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{gallery}', parsedArgs.gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::edit
* @see app/Http/Controllers/Admin/GalleryController.php:66
* @route '/admin/galleries/{gallery}/edit'
*/
edit.get = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::edit
* @see app/Http/Controllers/Admin/GalleryController.php:66
* @route '/admin/galleries/{gallery}/edit'
*/
edit.head = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::update
* @see app/Http/Controllers/Admin/GalleryController.php:94
* @route '/admin/galleries/{gallery}'
*/
export const update = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/galleries/{gallery}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::update
* @see app/Http/Controllers/Admin/GalleryController.php:94
* @route '/admin/galleries/{gallery}'
*/
update.url = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{gallery}', parsedArgs.gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::update
* @see app/Http/Controllers/Admin/GalleryController.php:94
* @route '/admin/galleries/{gallery}'
*/
update.put = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::update
* @see app/Http/Controllers/Admin/GalleryController.php:94
* @route '/admin/galleries/{gallery}'
*/
update.patch = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\GalleryController::destroy
* @see app/Http/Controllers/Admin/GalleryController.php:142
* @route '/admin/galleries/{gallery}'
*/
export const destroy = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/galleries/{gallery}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GalleryController::destroy
* @see app/Http/Controllers/Admin/GalleryController.php:142
* @route '/admin/galleries/{gallery}'
*/
destroy.url = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{gallery}', parsedArgs.gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryController::destroy
* @see app/Http/Controllers/Admin/GalleryController.php:142
* @route '/admin/galleries/{gallery}'
*/
destroy.delete = (args: { gallery: string | number | { id: string | number } } | [gallery: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const GalleryController = { index, create, store, show, edit, update, destroy }

export default GalleryController