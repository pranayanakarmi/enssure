import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/impact-and-milestones/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
export const edit = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/impact-and-milestones-items/{home_reach_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
edit.url = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { home_reach_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { home_reach_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            home_reach_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        home_reach_item: typeof args.home_reach_item === 'object'
        ? args.home_reach_item.id
        : args.home_reach_item,
    }

    return edit.definition.url
            .replace('{home_reach_item}', parsedArgs.home_reach_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
edit.get = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
edit.head = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
const editForm = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
editForm.get = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::edit
* @see app/Http/Controllers/Admin/HomeReachItemController.php:34
* @route '/admin/impact-and-milestones-items/{home_reach_item}/edit'
*/
editForm.head = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\HomeReachItemController::update
* @see app/Http/Controllers/Admin/HomeReachItemController.php:57
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
export const update = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/impact-and-milestones-items/{home_reach_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::update
* @see app/Http/Controllers/Admin/HomeReachItemController.php:57
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
update.url = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { home_reach_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { home_reach_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            home_reach_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        home_reach_item: typeof args.home_reach_item === 'object'
        ? args.home_reach_item.id
        : args.home_reach_item,
    }

    return update.definition.url
            .replace('{home_reach_item}', parsedArgs.home_reach_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::update
* @see app/Http/Controllers/Admin/HomeReachItemController.php:57
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
update.put = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::update
* @see app/Http/Controllers/Admin/HomeReachItemController.php:57
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
const updateForm = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::update
* @see app/Http/Controllers/Admin/HomeReachItemController.php:57
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
updateForm.put = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\HomeReachItemController::destroy
* @see app/Http/Controllers/Admin/HomeReachItemController.php:74
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
export const destroy = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/impact-and-milestones-items/{home_reach_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::destroy
* @see app/Http/Controllers/Admin/HomeReachItemController.php:74
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
destroy.url = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { home_reach_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { home_reach_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            home_reach_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        home_reach_item: typeof args.home_reach_item === 'object'
        ? args.home_reach_item.id
        : args.home_reach_item,
    }

    return destroy.definition.url
            .replace('{home_reach_item}', parsedArgs.home_reach_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::destroy
* @see app/Http/Controllers/Admin/HomeReachItemController.php:74
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
destroy.delete = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::destroy
* @see app/Http/Controllers/Admin/HomeReachItemController.php:74
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
const destroyForm = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::destroy
* @see app/Http/Controllers/Admin/HomeReachItemController.php:74
* @route '/admin/impact-and-milestones-items/{home_reach_item}'
*/
destroyForm.delete = (args: { home_reach_item: string | number | { id: string | number } } | [home_reach_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const HomeReachItemController = { store, edit, update, destroy }

export default HomeReachItemController