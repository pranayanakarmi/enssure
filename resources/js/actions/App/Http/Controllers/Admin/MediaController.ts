import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::index
* @see app/Http/Controllers/Admin/MediaController.php:15
* @route '/admin/media'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

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
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::create
* @see app/Http/Controllers/Admin/MediaController.php:37
* @route '/admin/media/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

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
* @see \App\Http\Controllers\Admin\MediaController::store
* @see app/Http/Controllers/Admin/MediaController.php:44
* @route '/admin/media'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::store
* @see app/Http/Controllers/Admin/MediaController.php:44
* @route '/admin/media'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
const editForm = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
editForm.get = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::edit
* @see app/Http/Controllers/Admin/MediaController.php:52
* @route '/admin/media/{medium}/edit'
*/
editForm.head = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

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
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
const updateForm = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
updateForm.put = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::update
* @see app/Http/Controllers/Admin/MediaController.php:76
* @route '/admin/media/{medium}'
*/
updateForm.patch = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

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

/**
* @see \App\Http\Controllers\Admin\MediaController::destroy
* @see app/Http/Controllers/Admin/MediaController.php:84
* @route '/admin/media/{medium}'
*/
const destroyForm = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MediaController::destroy
* @see app/Http/Controllers/Admin/MediaController.php:84
* @route '/admin/media/{medium}'
*/
destroyForm.delete = (args: { medium: string | number | { id: string | number } } | [medium: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const MediaController = { index, create, store, edit, update, destroy }

export default MediaController