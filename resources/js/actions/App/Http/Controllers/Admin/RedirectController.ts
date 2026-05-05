import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::index
* @see app/Http/Controllers/Admin/RedirectController.php:15
* @route '/admin/redirects'
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
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::create
* @see app/Http/Controllers/Admin/RedirectController.php:36
* @route '/admin/redirects/create'
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
* @see \App\Http\Controllers\Admin\RedirectController::store
* @see app/Http/Controllers/Admin/RedirectController.php:43
* @route '/admin/redirects'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::store
* @see app/Http/Controllers/Admin/RedirectController.php:43
* @route '/admin/redirects'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

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
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
const editForm = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
editForm.get = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::edit
* @see app/Http/Controllers/Admin/RedirectController.php:51
* @route '/admin/redirects/{redirect}/edit'
*/
editForm.head = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
const updateForm = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
updateForm.put = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::update
* @see app/Http/Controllers/Admin/RedirectController.php:67
* @route '/admin/redirects/{redirect}'
*/
updateForm.patch = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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

/**
* @see \App\Http\Controllers\Admin\RedirectController::destroy
* @see app/Http/Controllers/Admin/RedirectController.php:75
* @route '/admin/redirects/{redirect}'
*/
const destroyForm = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\RedirectController::destroy
* @see app/Http/Controllers/Admin/RedirectController.php:75
* @route '/admin/redirects/{redirect}'
*/
destroyForm.delete = (args: { redirect: string | number | { id: string | number } } | [redirect: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const RedirectController = { index, create, store, edit, update, destroy }

export default RedirectController