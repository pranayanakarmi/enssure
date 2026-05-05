import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/districts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::index
* @see app/Http/Controllers/Admin/DistrictController.php:16
* @route '/admin/districts'
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
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/districts/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::create
* @see app/Http/Controllers/Admin/DistrictController.php:37
* @route '/admin/districts/create'
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
* @see \App\Http\Controllers\Admin\DistrictController::store
* @see app/Http/Controllers/Admin/DistrictController.php:48
* @route '/admin/districts'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/districts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DistrictController::store
* @see app/Http/Controllers/Admin/DistrictController.php:48
* @route '/admin/districts'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DistrictController::store
* @see app/Http/Controllers/Admin/DistrictController.php:48
* @route '/admin/districts'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::store
* @see app/Http/Controllers/Admin/DistrictController.php:48
* @route '/admin/districts'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::store
* @see app/Http/Controllers/Admin/DistrictController.php:48
* @route '/admin/districts'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
export const edit = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/districts/{district}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
edit.url = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { district: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { district: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            district: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        district: typeof args.district === 'object'
        ? args.district.id
        : args.district,
    }

    return edit.definition.url
            .replace('{district}', parsedArgs.district.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
edit.get = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
edit.head = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
const editForm = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
editForm.get = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::edit
* @see app/Http/Controllers/Admin/DistrictController.php:56
* @route '/admin/districts/{district}/edit'
*/
editForm.head = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
export const update = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/districts/{district}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
update.url = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { district: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { district: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            district: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        district: typeof args.district === 'object'
        ? args.district.id
        : args.district,
    }

    return update.definition.url
            .replace('{district}', parsedArgs.district.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
update.put = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
update.patch = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
const updateForm = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
updateForm.put = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::update
* @see app/Http/Controllers/Admin/DistrictController.php:73
* @route '/admin/districts/{district}'
*/
updateForm.patch = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\DistrictController::destroy
* @see app/Http/Controllers/Admin/DistrictController.php:81
* @route '/admin/districts/{district}'
*/
export const destroy = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/districts/{district}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\DistrictController::destroy
* @see app/Http/Controllers/Admin/DistrictController.php:81
* @route '/admin/districts/{district}'
*/
destroy.url = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { district: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { district: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            district: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        district: typeof args.district === 'object'
        ? args.district.id
        : args.district,
    }

    return destroy.definition.url
            .replace('{district}', parsedArgs.district.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DistrictController::destroy
* @see app/Http/Controllers/Admin/DistrictController.php:81
* @route '/admin/districts/{district}'
*/
destroy.delete = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::destroy
* @see app/Http/Controllers/Admin/DistrictController.php:81
* @route '/admin/districts/{district}'
*/
const destroyForm = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DistrictController::destroy
* @see app/Http/Controllers/Admin/DistrictController.php:81
* @route '/admin/districts/{district}'
*/
destroyForm.delete = (args: { district: string | number | { id: string | number } } | [district: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DistrictController = { index, create, store, edit, update, destroy }

export default DistrictController