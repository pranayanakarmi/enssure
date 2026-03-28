import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/media',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/media/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::store
* @see app/Http/Controllers/Admin/MediaController.php:44
* @route '/admin/media'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/media',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MediaController::store
* @see app/Http/Controllers/Admin/MediaController.php:44
* @route '/admin/media'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MediaController::store
* @see app/Http/Controllers/Admin/MediaController.php:44
* @route '/admin/media'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
export const edit = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/media/{medium}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
edit.url = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medium: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { medium: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            medium: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medium: typeof args.medium === 'object'
        ? args.medium.id
        : args.medium,
    }

    return edit.definition.url
            .replace('{medium}', parsedArgs.medium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
edit.get = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
edit.head = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
export const update = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/media/{medium}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
update.url = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medium: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { medium: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            medium: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medium: typeof args.medium === 'object'
        ? args.medium.id
        : args.medium,
    }

    return update.definition.url
            .replace('{medium}', parsedArgs.medium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
update.put = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
update.patch = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::destroy
* @see app/Http/Controllers/Admin/MediaController.php:84
* @route '/admin/media/{medium}'
*/
export const destroy = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/media/{medium}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MediaController::destroy
* @see app/Http/Controllers/Admin/MediaController.php:84
* @route '/admin/media/{medium}'
*/
destroy.url = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { medium: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { medium: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            medium: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        medium: typeof args.medium === 'object'
        ? args.medium.id
        : args.medium,
    }

    return destroy.definition.url
            .replace('{medium}', parsedArgs.medium.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MediaController::destroy
* @see app/Http/Controllers/Admin/MediaController.php:84
* @route '/admin/media/{medium}'
*/
destroy.delete = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const media = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default media