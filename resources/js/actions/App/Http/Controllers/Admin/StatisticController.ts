import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StatisticController::index
* @see app/Http/Controllers/Admin/StatisticController.php:15
* @route '/admin/statistics'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::index
* @see app/Http/Controllers/Admin/StatisticController.php:15
* @route '/admin/statistics'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::index
* @see app/Http/Controllers/Admin/StatisticController.php:15
* @route '/admin/statistics'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::index
* @see app/Http/Controllers/Admin/StatisticController.php:15
* @route '/admin/statistics'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::create
* @see app/Http/Controllers/Admin/StatisticController.php:39
* @route '/admin/statistics/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/statistics/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::create
* @see app/Http/Controllers/Admin/StatisticController.php:39
* @route '/admin/statistics/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::create
* @see app/Http/Controllers/Admin/StatisticController.php:39
* @route '/admin/statistics/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::create
* @see app/Http/Controllers/Admin/StatisticController.php:39
* @route '/admin/statistics/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::store
* @see app/Http/Controllers/Admin/StatisticController.php:46
* @route '/admin/statistics'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/statistics',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::store
* @see app/Http/Controllers/Admin/StatisticController.php:46
* @route '/admin/statistics'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::store
* @see app/Http/Controllers/Admin/StatisticController.php:46
* @route '/admin/statistics'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::show
* @see app/Http/Controllers/Admin/StatisticController.php:0
* @route '/admin/statistics/{statistic}'
*/
export const show = (args: { statistic: string | number } | [statistic: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/statistics/{statistic}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::show
* @see app/Http/Controllers/Admin/StatisticController.php:0
* @route '/admin/statistics/{statistic}'
*/
show.url = (args: { statistic: string | number } | [statistic: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { statistic: args }
    }

    if (Array.isArray(args)) {
        args = {
            statistic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        statistic: args.statistic,
    }

    return show.definition.url
            .replace('{statistic}', parsedArgs.statistic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::show
* @see app/Http/Controllers/Admin/StatisticController.php:0
* @route '/admin/statistics/{statistic}'
*/
show.get = (args: { statistic: string | number } | [statistic: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::show
* @see app/Http/Controllers/Admin/StatisticController.php:0
* @route '/admin/statistics/{statistic}'
*/
show.head = (args: { statistic: string | number } | [statistic: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::edit
* @see app/Http/Controllers/Admin/StatisticController.php:54
* @route '/admin/statistics/{statistic}/edit'
*/
export const edit = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/statistics/{statistic}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::edit
* @see app/Http/Controllers/Admin/StatisticController.php:54
* @route '/admin/statistics/{statistic}/edit'
*/
edit.url = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { statistic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { statistic: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            statistic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        statistic: typeof args.statistic === 'object'
        ? args.statistic.id
        : args.statistic,
    }

    return edit.definition.url
            .replace('{statistic}', parsedArgs.statistic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::edit
* @see app/Http/Controllers/Admin/StatisticController.php:54
* @route '/admin/statistics/{statistic}/edit'
*/
edit.get = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::edit
* @see app/Http/Controllers/Admin/StatisticController.php:54
* @route '/admin/statistics/{statistic}/edit'
*/
edit.head = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::update
* @see app/Http/Controllers/Admin/StatisticController.php:73
* @route '/admin/statistics/{statistic}'
*/
export const update = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/statistics/{statistic}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::update
* @see app/Http/Controllers/Admin/StatisticController.php:73
* @route '/admin/statistics/{statistic}'
*/
update.url = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { statistic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { statistic: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            statistic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        statistic: typeof args.statistic === 'object'
        ? args.statistic.id
        : args.statistic,
    }

    return update.definition.url
            .replace('{statistic}', parsedArgs.statistic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::update
* @see app/Http/Controllers/Admin/StatisticController.php:73
* @route '/admin/statistics/{statistic}'
*/
update.put = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::update
* @see app/Http/Controllers/Admin/StatisticController.php:73
* @route '/admin/statistics/{statistic}'
*/
update.patch = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\StatisticController::destroy
* @see app/Http/Controllers/Admin/StatisticController.php:81
* @route '/admin/statistics/{statistic}'
*/
export const destroy = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/statistics/{statistic}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\StatisticController::destroy
* @see app/Http/Controllers/Admin/StatisticController.php:81
* @route '/admin/statistics/{statistic}'
*/
destroy.url = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { statistic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { statistic: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            statistic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        statistic: typeof args.statistic === 'object'
        ? args.statistic.id
        : args.statistic,
    }

    return destroy.definition.url
            .replace('{statistic}', parsedArgs.statistic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatisticController::destroy
* @see app/Http/Controllers/Admin/StatisticController.php:81
* @route '/admin/statistics/{statistic}'
*/
destroy.delete = (args: { statistic: string | number | { id: string | number } } | [statistic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const StatisticController = { index, create, store, show, edit, update, destroy }

export default StatisticController