import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MenuController::index
* @see app/Http/Controllers/Admin/MenuController.php:15
* @route '/admin/menus'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/menus',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::index
* @see app/Http/Controllers/Admin/MenuController.php:15
* @route '/admin/menus'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::index
* @see app/Http/Controllers/Admin/MenuController.php:15
* @route '/admin/menus'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::index
* @see app/Http/Controllers/Admin/MenuController.php:15
* @route '/admin/menus'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::create
* @see app/Http/Controllers/Admin/MenuController.php:37
* @route '/admin/menus/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/menus/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::create
* @see app/Http/Controllers/Admin/MenuController.php:37
* @route '/admin/menus/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::create
* @see app/Http/Controllers/Admin/MenuController.php:37
* @route '/admin/menus/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::create
* @see app/Http/Controllers/Admin/MenuController.php:37
* @route '/admin/menus/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::store
* @see app/Http/Controllers/Admin/MenuController.php:44
* @route '/admin/menus'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/menus',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::store
* @see app/Http/Controllers/Admin/MenuController.php:44
* @route '/admin/menus'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::store
* @see app/Http/Controllers/Admin/MenuController.php:44
* @route '/admin/menus'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::edit
* @see app/Http/Controllers/Admin/MenuController.php:52
* @route '/admin/menus/{menu}/edit'
*/
export const edit = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/menus/{menu}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::edit
* @see app/Http/Controllers/Admin/MenuController.php:52
* @route '/admin/menus/{menu}/edit'
*/
edit.url = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return edit.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::edit
* @see app/Http/Controllers/Admin/MenuController.php:52
* @route '/admin/menus/{menu}/edit'
*/
edit.get = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::edit
* @see app/Http/Controllers/Admin/MenuController.php:52
* @route '/admin/menus/{menu}/edit'
*/
edit.head = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::update
* @see app/Http/Controllers/Admin/MenuController.php:77
* @route '/admin/menus/{menu}'
*/
export const update = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/menus/{menu}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::update
* @see app/Http/Controllers/Admin/MenuController.php:77
* @route '/admin/menus/{menu}'
*/
update.url = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return update.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::update
* @see app/Http/Controllers/Admin/MenuController.php:77
* @route '/admin/menus/{menu}'
*/
update.put = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::update
* @see app/Http/Controllers/Admin/MenuController.php:77
* @route '/admin/menus/{menu}'
*/
update.patch = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\MenuController::destroy
* @see app/Http/Controllers/Admin/MenuController.php:114
* @route '/admin/menus/{menu}'
*/
export const destroy = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/menus/{menu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MenuController::destroy
* @see app/Http/Controllers/Admin/MenuController.php:114
* @route '/admin/menus/{menu}'
*/
destroy.url = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu: typeof args.menu === 'object'
        ? args.menu.id
        : args.menu,
    }

    return destroy.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuController::destroy
* @see app/Http/Controllers/Admin/MenuController.php:114
* @route '/admin/menus/{menu}'
*/
destroy.delete = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MenuController = { index, create, store, edit, update, destroy }

export default MenuController