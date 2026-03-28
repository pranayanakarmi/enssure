import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProvinceController::index
* @see app/Http/Controllers/Admin/ProvinceController.php:15
* @route '/admin/provinces'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProvinceController::index
* @see app/Http/Controllers/Admin/ProvinceController.php:15
* @route '/admin/provinces'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProvinceController::index
* @see app/Http/Controllers/Admin/ProvinceController.php:15
* @route '/admin/provinces'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::index
* @see app/Http/Controllers/Admin/ProvinceController.php:15
* @route '/admin/provinces'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::create
* @see app/Http/Controllers/Admin/ProvinceController.php:36
* @route '/admin/provinces/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/provinces/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProvinceController::create
* @see app/Http/Controllers/Admin/ProvinceController.php:36
* @route '/admin/provinces/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProvinceController::create
* @see app/Http/Controllers/Admin/ProvinceController.php:36
* @route '/admin/provinces/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::create
* @see app/Http/Controllers/Admin/ProvinceController.php:36
* @route '/admin/provinces/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::store
* @see app/Http/Controllers/Admin/ProvinceController.php:43
* @route '/admin/provinces'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/provinces',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProvinceController::store
* @see app/Http/Controllers/Admin/ProvinceController.php:43
* @route '/admin/provinces'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProvinceController::store
* @see app/Http/Controllers/Admin/ProvinceController.php:43
* @route '/admin/provinces'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::edit
* @see app/Http/Controllers/Admin/ProvinceController.php:51
* @route '/admin/provinces/{province}/edit'
*/
export const edit = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/provinces/{province}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProvinceController::edit
* @see app/Http/Controllers/Admin/ProvinceController.php:51
* @route '/admin/provinces/{province}/edit'
*/
edit.url = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { province: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            province: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        province: typeof args.province === 'object'
        ? args.province.id
        : args.province,
    }

    return edit.definition.url
            .replace('{province}', parsedArgs.province.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProvinceController::edit
* @see app/Http/Controllers/Admin/ProvinceController.php:51
* @route '/admin/provinces/{province}/edit'
*/
edit.get = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::edit
* @see app/Http/Controllers/Admin/ProvinceController.php:51
* @route '/admin/provinces/{province}/edit'
*/
edit.head = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::update
* @see app/Http/Controllers/Admin/ProvinceController.php:68
* @route '/admin/provinces/{province}'
*/
export const update = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/provinces/{province}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ProvinceController::update
* @see app/Http/Controllers/Admin/ProvinceController.php:68
* @route '/admin/provinces/{province}'
*/
update.url = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { province: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            province: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        province: typeof args.province === 'object'
        ? args.province.id
        : args.province,
    }

    return update.definition.url
            .replace('{province}', parsedArgs.province.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProvinceController::update
* @see app/Http/Controllers/Admin/ProvinceController.php:68
* @route '/admin/provinces/{province}'
*/
update.put = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::update
* @see app/Http/Controllers/Admin/ProvinceController.php:68
* @route '/admin/provinces/{province}'
*/
update.patch = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ProvinceController::destroy
* @see app/Http/Controllers/Admin/ProvinceController.php:76
* @route '/admin/provinces/{province}'
*/
export const destroy = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/provinces/{province}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProvinceController::destroy
* @see app/Http/Controllers/Admin/ProvinceController.php:76
* @route '/admin/provinces/{province}'
*/
destroy.url = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { province: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            province: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        province: typeof args.province === 'object'
        ? args.province.id
        : args.province,
    }

    return destroy.definition.url
            .replace('{province}', parsedArgs.province.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProvinceController::destroy
* @see app/Http/Controllers/Admin/ProvinceController.php:76
* @route '/admin/provinces/{province}'
*/
destroy.delete = (args: { province: string | number | { id: string | number } } | [province: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const provinces = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default provinces