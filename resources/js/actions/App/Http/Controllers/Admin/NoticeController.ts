import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NoticeController::index
* @see app/Http/Controllers/Admin/NoticeController.php:17
* @route '/admin/notices'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/notices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticeController::index
* @see app/Http/Controllers/Admin/NoticeController.php:17
* @route '/admin/notices'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticeController::index
* @see app/Http/Controllers/Admin/NoticeController.php:17
* @route '/admin/notices'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::index
* @see app/Http/Controllers/Admin/NoticeController.php:17
* @route '/admin/notices'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::create
* @see app/Http/Controllers/Admin/NoticeController.php:38
* @route '/admin/notices/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/notices/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticeController::create
* @see app/Http/Controllers/Admin/NoticeController.php:38
* @route '/admin/notices/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticeController::create
* @see app/Http/Controllers/Admin/NoticeController.php:38
* @route '/admin/notices/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::create
* @see app/Http/Controllers/Admin/NoticeController.php:38
* @route '/admin/notices/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::store
* @see app/Http/Controllers/Admin/NoticeController.php:45
* @route '/admin/notices'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/notices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NoticeController::store
* @see app/Http/Controllers/Admin/NoticeController.php:45
* @route '/admin/notices'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticeController::store
* @see app/Http/Controllers/Admin/NoticeController.php:45
* @route '/admin/notices'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::edit
* @see app/Http/Controllers/Admin/NoticeController.php:65
* @route '/admin/notices/{notice}/edit'
*/
export const edit = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/notices/{notice}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NoticeController::edit
* @see app/Http/Controllers/Admin/NoticeController.php:65
* @route '/admin/notices/{notice}/edit'
*/
edit.url = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notice: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { notice: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            notice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        notice: typeof args.notice === 'object'
        ? args.notice.id
        : args.notice,
    }

    return edit.definition.url
            .replace('{notice}', parsedArgs.notice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticeController::edit
* @see app/Http/Controllers/Admin/NoticeController.php:65
* @route '/admin/notices/{notice}/edit'
*/
edit.get = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::edit
* @see app/Http/Controllers/Admin/NoticeController.php:65
* @route '/admin/notices/{notice}/edit'
*/
edit.head = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::update
* @see app/Http/Controllers/Admin/NoticeController.php:83
* @route '/admin/notices/{notice}'
*/
export const update = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/notices/{notice}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\NoticeController::update
* @see app/Http/Controllers/Admin/NoticeController.php:83
* @route '/admin/notices/{notice}'
*/
update.url = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notice: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { notice: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            notice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        notice: typeof args.notice === 'object'
        ? args.notice.id
        : args.notice,
    }

    return update.definition.url
            .replace('{notice}', parsedArgs.notice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticeController::update
* @see app/Http/Controllers/Admin/NoticeController.php:83
* @route '/admin/notices/{notice}'
*/
update.put = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::update
* @see app/Http/Controllers/Admin/NoticeController.php:83
* @route '/admin/notices/{notice}'
*/
update.patch = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\NoticeController::destroy
* @see app/Http/Controllers/Admin/NoticeController.php:110
* @route '/admin/notices/{notice}'
*/
export const destroy = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/notices/{notice}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\NoticeController::destroy
* @see app/Http/Controllers/Admin/NoticeController.php:110
* @route '/admin/notices/{notice}'
*/
destroy.url = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notice: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { notice: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            notice: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        notice: typeof args.notice === 'object'
        ? args.notice.id
        : args.notice,
    }

    return destroy.definition.url
            .replace('{notice}', parsedArgs.notice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NoticeController::destroy
* @see app/Http/Controllers/Admin/NoticeController.php:110
* @route '/admin/notices/{notice}'
*/
destroy.delete = (args: { notice: string | number | { id: string | number } } | [notice: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const NoticeController = { index, create, store, edit, update, destroy }

export default NoticeController