import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PartnerController::index
* @see app/Http/Controllers/Admin/PartnerController.php:16
* @route '/admin/partners'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/partners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::index
* @see app/Http/Controllers/Admin/PartnerController.php:16
* @route '/admin/partners'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::index
* @see app/Http/Controllers/Admin/PartnerController.php:16
* @route '/admin/partners'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::index
* @see app/Http/Controllers/Admin/PartnerController.php:16
* @route '/admin/partners'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::create
* @see app/Http/Controllers/Admin/PartnerController.php:38
* @route '/admin/partners/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/partners/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::create
* @see app/Http/Controllers/Admin/PartnerController.php:38
* @route '/admin/partners/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::create
* @see app/Http/Controllers/Admin/PartnerController.php:38
* @route '/admin/partners/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::create
* @see app/Http/Controllers/Admin/PartnerController.php:38
* @route '/admin/partners/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::store
* @see app/Http/Controllers/Admin/PartnerController.php:45
* @route '/admin/partners'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/partners',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::store
* @see app/Http/Controllers/Admin/PartnerController.php:45
* @route '/admin/partners'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::store
* @see app/Http/Controllers/Admin/PartnerController.php:45
* @route '/admin/partners'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::show
* @see app/Http/Controllers/Admin/PartnerController.php:0
* @route '/admin/partners/{partner}'
*/
export const show = (args: { partner: string | number } | [partner: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/partners/{partner}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::show
* @see app/Http/Controllers/Admin/PartnerController.php:0
* @route '/admin/partners/{partner}'
*/
show.url = (args: { partner: string | number } | [partner: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partner: args }
    }

    if (Array.isArray(args)) {
        args = {
            partner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        partner: args.partner,
    }

    return show.definition.url
            .replace('{partner}', parsedArgs.partner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::show
* @see app/Http/Controllers/Admin/PartnerController.php:0
* @route '/admin/partners/{partner}'
*/
show.get = (args: { partner: string | number } | [partner: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::show
* @see app/Http/Controllers/Admin/PartnerController.php:0
* @route '/admin/partners/{partner}'
*/
show.head = (args: { partner: string | number } | [partner: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::edit
* @see app/Http/Controllers/Admin/PartnerController.php:57
* @route '/admin/partners/{partner}/edit'
*/
export const edit = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/partners/{partner}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::edit
* @see app/Http/Controllers/Admin/PartnerController.php:57
* @route '/admin/partners/{partner}/edit'
*/
edit.url = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { partner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            partner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        partner: typeof args.partner === 'object'
        ? args.partner.id
        : args.partner,
    }

    return edit.definition.url
            .replace('{partner}', parsedArgs.partner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::edit
* @see app/Http/Controllers/Admin/PartnerController.php:57
* @route '/admin/partners/{partner}/edit'
*/
edit.get = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::edit
* @see app/Http/Controllers/Admin/PartnerController.php:57
* @route '/admin/partners/{partner}/edit'
*/
edit.head = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::update
* @see app/Http/Controllers/Admin/PartnerController.php:77
* @route '/admin/partners/{partner}'
*/
export const update = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/partners/{partner}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::update
* @see app/Http/Controllers/Admin/PartnerController.php:77
* @route '/admin/partners/{partner}'
*/
update.url = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { partner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            partner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        partner: typeof args.partner === 'object'
        ? args.partner.id
        : args.partner,
    }

    return update.definition.url
            .replace('{partner}', parsedArgs.partner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::update
* @see app/Http/Controllers/Admin/PartnerController.php:77
* @route '/admin/partners/{partner}'
*/
update.put = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::update
* @see app/Http/Controllers/Admin/PartnerController.php:77
* @route '/admin/partners/{partner}'
*/
update.patch = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\PartnerController::destroy
* @see app/Http/Controllers/Admin/PartnerController.php:92
* @route '/admin/partners/{partner}'
*/
export const destroy = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/partners/{partner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PartnerController::destroy
* @see app/Http/Controllers/Admin/PartnerController.php:92
* @route '/admin/partners/{partner}'
*/
destroy.url = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { partner: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { partner: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            partner: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        partner: typeof args.partner === 'object'
        ? args.partner.id
        : args.partner,
    }

    return destroy.definition.url
            .replace('{partner}', parsedArgs.partner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PartnerController::destroy
* @see app/Http/Controllers/Admin/PartnerController.php:92
* @route '/admin/partners/{partner}'
*/
destroy.delete = (args: { partner: string | number | { id: string | number } } | [partner: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const partners = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default partners