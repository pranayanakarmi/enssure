import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::index
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:18
* @route '/admin/news_ticker_items'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/news_ticker_items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::index
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:18
* @route '/admin/news_ticker_items'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::index
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:18
* @route '/admin/news_ticker_items'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::index
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:18
* @route '/admin/news_ticker_items'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::create
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:51
* @route '/admin/news_ticker_items/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/news_ticker_items/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::create
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:51
* @route '/admin/news_ticker_items/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::create
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:51
* @route '/admin/news_ticker_items/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::create
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:51
* @route '/admin/news_ticker_items/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::store
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:58
* @route '/admin/news_ticker_items'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/news_ticker_items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::store
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:58
* @route '/admin/news_ticker_items'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::store
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:58
* @route '/admin/news_ticker_items'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::edit
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:66
* @route '/admin/news_ticker_items/{news_ticker_item}/edit'
*/
export const edit = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/news_ticker_items/{news_ticker_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::edit
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:66
* @route '/admin/news_ticker_items/{news_ticker_item}/edit'
*/
edit.url = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { news_ticker_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { news_ticker_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            news_ticker_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        news_ticker_item: typeof args.news_ticker_item === 'object'
        ? args.news_ticker_item.id
        : args.news_ticker_item,
    }

    return edit.definition.url
            .replace('{news_ticker_item}', parsedArgs.news_ticker_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::edit
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:66
* @route '/admin/news_ticker_items/{news_ticker_item}/edit'
*/
edit.get = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::edit
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:66
* @route '/admin/news_ticker_items/{news_ticker_item}/edit'
*/
edit.head = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::update
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:83
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
export const update = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/news_ticker_items/{news_ticker_item}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::update
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:83
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
update.url = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { news_ticker_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { news_ticker_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            news_ticker_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        news_ticker_item: typeof args.news_ticker_item === 'object'
        ? args.news_ticker_item.id
        : args.news_ticker_item,
    }

    return update.definition.url
            .replace('{news_ticker_item}', parsedArgs.news_ticker_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::update
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:83
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
update.put = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::update
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:83
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
update.patch = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::destroy
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:91
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
export const destroy = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/news_ticker_items/{news_ticker_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::destroy
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:91
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
destroy.url = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { news_ticker_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { news_ticker_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            news_ticker_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        news_ticker_item: typeof args.news_ticker_item === 'object'
        ? args.news_ticker_item.id
        : args.news_ticker_item,
    }

    return destroy.definition.url
            .replace('{news_ticker_item}', parsedArgs.news_ticker_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsTickerItemController::destroy
* @see app/Http/Controllers/Admin/NewsTickerItemController.php:91
* @route '/admin/news_ticker_items/{news_ticker_item}'
*/
destroy.delete = (args: { news_ticker_item: string | number | { id: string | number } } | [news_ticker_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const news_ticker_items = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default news_ticker_items