import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MenuItemController::store
* @see app/Http/Controllers/Admin/MenuItemController.php:16
* @route '/admin/menus/{menu}/items'
*/
export const store = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/menus/{menu}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MenuItemController::store
* @see app/Http/Controllers/Admin/MenuItemController.php:16
* @route '/admin/menus/{menu}/items'
*/
store.url = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{menu}', parsedArgs.menu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuItemController::store
* @see app/Http/Controllers/Admin/MenuItemController.php:16
* @route '/admin/menus/{menu}/items'
*/
store.post = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::store
* @see app/Http/Controllers/Admin/MenuItemController.php:16
* @route '/admin/menus/{menu}/items'
*/
const storeForm = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::store
* @see app/Http/Controllers/Admin/MenuItemController.php:16
* @route '/admin/menus/{menu}/items'
*/
storeForm.post = (args: { menu: number | { id: number } } | [menu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
export const edit = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/menu-items/{menu_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
edit.url = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu_item: typeof args.menu_item === 'object'
        ? args.menu_item.id
        : args.menu_item,
    }

    return edit.definition.url
            .replace('{menu_item}', parsedArgs.menu_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
edit.get = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
edit.head = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
const editForm = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
editForm.get = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::edit
* @see app/Http/Controllers/Admin/MenuItemController.php:23
* @route '/admin/menu-items/{menu_item}/edit'
*/
editForm.head = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MenuItemController::update
* @see app/Http/Controllers/Admin/MenuItemController.php:54
* @route '/admin/menu-items/{menu_item}'
*/
export const update = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/menu-items/{menu_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\MenuItemController::update
* @see app/Http/Controllers/Admin/MenuItemController.php:54
* @route '/admin/menu-items/{menu_item}'
*/
update.url = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu_item: typeof args.menu_item === 'object'
        ? args.menu_item.id
        : args.menu_item,
    }

    return update.definition.url
            .replace('{menu_item}', parsedArgs.menu_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuItemController::update
* @see app/Http/Controllers/Admin/MenuItemController.php:54
* @route '/admin/menu-items/{menu_item}'
*/
update.put = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::update
* @see app/Http/Controllers/Admin/MenuItemController.php:54
* @route '/admin/menu-items/{menu_item}'
*/
const updateForm = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::update
* @see app/Http/Controllers/Admin/MenuItemController.php:54
* @route '/admin/menu-items/{menu_item}'
*/
updateForm.put = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\MenuItemController::destroy
* @see app/Http/Controllers/Admin/MenuItemController.php:62
* @route '/admin/menu-items/{menu_item}'
*/
export const destroy = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/menu-items/{menu_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MenuItemController::destroy
* @see app/Http/Controllers/Admin/MenuItemController.php:62
* @route '/admin/menu-items/{menu_item}'
*/
destroy.url = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { menu_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { menu_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            menu_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        menu_item: typeof args.menu_item === 'object'
        ? args.menu_item.id
        : args.menu_item,
    }

    return destroy.definition.url
            .replace('{menu_item}', parsedArgs.menu_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MenuItemController::destroy
* @see app/Http/Controllers/Admin/MenuItemController.php:62
* @route '/admin/menu-items/{menu_item}'
*/
destroy.delete = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::destroy
* @see app/Http/Controllers/Admin/MenuItemController.php:62
* @route '/admin/menu-items/{menu_item}'
*/
const destroyForm = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\MenuItemController::destroy
* @see app/Http/Controllers/Admin/MenuItemController.php:62
* @route '/admin/menu-items/{menu_item}'
*/
destroyForm.delete = (args: { menu_item: number | { id: number } } | [menu_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const MenuItemController = { store, edit, update, destroy }

export default MenuItemController