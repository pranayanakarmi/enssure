import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/redirects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/redirects/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::store
* @see app/Http/Controllers/Admin/RedirectController.php:43
* @route '/admin/redirects'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/redirects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\RedirectController::store
* @see app/Http/Controllers/Admin/RedirectController.php:43
* @route '/admin/redirects'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RedirectController::store
* @see app/Http/Controllers/Admin/RedirectController.php:43
* @route '/admin/redirects'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
export const edit = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/redirects/{redirect}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
edit.url = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redirect: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { redirect: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            redirect: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        redirect: typeof args.redirect === 'object'
        ? args.redirect.id
        : args.redirect,
    }

    return edit.definition.url
            .replace('{redirect}', parsedArgs.redirect.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
edit.get = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
edit.head = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
export const update = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/redirects/{redirect}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
update.url = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redirect: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { redirect: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            redirect: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        redirect: typeof args.redirect === 'object'
        ? args.redirect.id
        : args.redirect,
    }

    return update.definition.url
            .replace('{redirect}', parsedArgs.redirect.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
update.put = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
update.patch = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::destroy
* @see app/Http/Controllers/Admin/RedirectController.php:75
* @route '/admin/redirects/{redirect}'
*/
export const destroy = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/redirects/{redirect}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\RedirectController::destroy
* @see app/Http/Controllers/Admin/RedirectController.php:75
* @route '/admin/redirects/{redirect}'
*/
destroy.url = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { redirect: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { redirect: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            redirect: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        redirect: typeof args.redirect === 'object'
        ? args.redirect.id
        : args.redirect,
    }

    return destroy.definition.url
            .replace('{redirect}', parsedArgs.redirect.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\RedirectController::destroy
* @see app/Http/Controllers/Admin/RedirectController.php:75
* @route '/admin/redirects/{redirect}'
*/
destroy.delete = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const redirects = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default redirects