import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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

const HomeReachItemController = { store, edit, update, destroy }

export default HomeReachItemController