import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PublicationController::index
* @see app/Http/Controllers/Admin/PublicationController.php:15
* @route '/admin/publications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/publications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PublicationController::index
* @see app/Http/Controllers/Admin/PublicationController.php:15
* @route '/admin/publications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PublicationController::index
* @see app/Http/Controllers/Admin/PublicationController.php:15
* @route '/admin/publications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::index
* @see app/Http/Controllers/Admin/PublicationController.php:15
* @route '/admin/publications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::create
* @see app/Http/Controllers/Admin/PublicationController.php:36
* @route '/admin/publications/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/publications/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PublicationController::create
* @see app/Http/Controllers/Admin/PublicationController.php:36
* @route '/admin/publications/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PublicationController::create
* @see app/Http/Controllers/Admin/PublicationController.php:36
* @route '/admin/publications/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::create
* @see app/Http/Controllers/Admin/PublicationController.php:36
* @route '/admin/publications/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::store
* @see app/Http/Controllers/Admin/PublicationController.php:43
* @route '/admin/publications'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/publications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PublicationController::store
* @see app/Http/Controllers/Admin/PublicationController.php:43
* @route '/admin/publications'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PublicationController::store
* @see app/Http/Controllers/Admin/PublicationController.php:43
* @route '/admin/publications'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::edit
* @see app/Http/Controllers/Admin/PublicationController.php:51
* @route '/admin/publications/{publication}/edit'
*/
export const edit = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/publications/{publication}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PublicationController::edit
* @see app/Http/Controllers/Admin/PublicationController.php:51
* @route '/admin/publications/{publication}/edit'
*/
edit.url = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { publication: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            publication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        publication: typeof args.publication === 'object'
        ? args.publication.id
        : args.publication,
    }

    return edit.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PublicationController::edit
* @see app/Http/Controllers/Admin/PublicationController.php:51
* @route '/admin/publications/{publication}/edit'
*/
edit.get = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::edit
* @see app/Http/Controllers/Admin/PublicationController.php:51
* @route '/admin/publications/{publication}/edit'
*/
edit.head = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::update
* @see app/Http/Controllers/Admin/PublicationController.php:75
* @route '/admin/publications/{publication}'
*/
export const update = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/publications/{publication}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PublicationController::update
* @see app/Http/Controllers/Admin/PublicationController.php:75
* @route '/admin/publications/{publication}'
*/
update.url = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { publication: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            publication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        publication: typeof args.publication === 'object'
        ? args.publication.id
        : args.publication,
    }

    return update.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PublicationController::update
* @see app/Http/Controllers/Admin/PublicationController.php:75
* @route '/admin/publications/{publication}'
*/
update.put = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::update
* @see app/Http/Controllers/Admin/PublicationController.php:75
* @route '/admin/publications/{publication}'
*/
update.patch = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\PublicationController::destroy
* @see app/Http/Controllers/Admin/PublicationController.php:83
* @route '/admin/publications/{publication}'
*/
export const destroy = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/publications/{publication}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PublicationController::destroy
* @see app/Http/Controllers/Admin/PublicationController.php:83
* @route '/admin/publications/{publication}'
*/
destroy.url = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publication: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { publication: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            publication: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        publication: typeof args.publication === 'object'
        ? args.publication.id
        : args.publication,
    }

    return destroy.definition.url
            .replace('{publication}', parsedArgs.publication.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PublicationController::destroy
* @see app/Http/Controllers/Admin/PublicationController.php:83
* @route '/admin/publications/{publication}'
*/
destroy.delete = (args: { publication: string | number | { id: string | number } } | [publication: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const PublicationController = { index, create, store, edit, update, destroy }

export default PublicationController