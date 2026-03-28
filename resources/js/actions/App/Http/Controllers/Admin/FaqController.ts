import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FaqController::index
* @see app/Http/Controllers/Admin/FaqController.php:15
* @route '/admin/faqs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FaqController::index
* @see app/Http/Controllers/Admin/FaqController.php:15
* @route '/admin/faqs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqController::index
* @see app/Http/Controllers/Admin/FaqController.php:15
* @route '/admin/faqs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::index
* @see app/Http/Controllers/Admin/FaqController.php:15
* @route '/admin/faqs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::create
* @see app/Http/Controllers/Admin/FaqController.php:36
* @route '/admin/faqs/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/faqs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FaqController::create
* @see app/Http/Controllers/Admin/FaqController.php:36
* @route '/admin/faqs/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqController::create
* @see app/Http/Controllers/Admin/FaqController.php:36
* @route '/admin/faqs/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::create
* @see app/Http/Controllers/Admin/FaqController.php:36
* @route '/admin/faqs/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::store
* @see app/Http/Controllers/Admin/FaqController.php:43
* @route '/admin/faqs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FaqController::store
* @see app/Http/Controllers/Admin/FaqController.php:43
* @route '/admin/faqs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqController::store
* @see app/Http/Controllers/Admin/FaqController.php:43
* @route '/admin/faqs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::edit
* @see app/Http/Controllers/Admin/FaqController.php:51
* @route '/admin/faqs/{faq}/edit'
*/
export const edit = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/faqs/{faq}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FaqController::edit
* @see app/Http/Controllers/Admin/FaqController.php:51
* @route '/admin/faqs/{faq}/edit'
*/
edit.url = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { faq: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            faq: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        faq: typeof args.faq === 'object'
        ? args.faq.id
        : args.faq,
    }

    return edit.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqController::edit
* @see app/Http/Controllers/Admin/FaqController.php:51
* @route '/admin/faqs/{faq}/edit'
*/
edit.get = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::edit
* @see app/Http/Controllers/Admin/FaqController.php:51
* @route '/admin/faqs/{faq}/edit'
*/
edit.head = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::update
* @see app/Http/Controllers/Admin/FaqController.php:69
* @route '/admin/faqs/{faq}'
*/
export const update = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/faqs/{faq}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\FaqController::update
* @see app/Http/Controllers/Admin/FaqController.php:69
* @route '/admin/faqs/{faq}'
*/
update.url = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { faq: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            faq: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        faq: typeof args.faq === 'object'
        ? args.faq.id
        : args.faq,
    }

    return update.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqController::update
* @see app/Http/Controllers/Admin/FaqController.php:69
* @route '/admin/faqs/{faq}'
*/
update.put = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::update
* @see app/Http/Controllers/Admin/FaqController.php:69
* @route '/admin/faqs/{faq}'
*/
update.patch = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\FaqController::destroy
* @see app/Http/Controllers/Admin/FaqController.php:77
* @route '/admin/faqs/{faq}'
*/
export const destroy = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/faqs/{faq}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FaqController::destroy
* @see app/Http/Controllers/Admin/FaqController.php:77
* @route '/admin/faqs/{faq}'
*/
destroy.url = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { faq: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            faq: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        faq: typeof args.faq === 'object'
        ? args.faq.id
        : args.faq,
    }

    return destroy.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FaqController::destroy
* @see app/Http/Controllers/Admin/FaqController.php:77
* @route '/admin/faqs/{faq}'
*/
destroy.delete = (args: { faq: string | number | { id: string | number } } | [faq: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const FaqController = { index, create, store, edit, update, destroy }

export default FaqController