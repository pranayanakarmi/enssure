import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MenuItemController::store
 * @see app/Http/Controllers/Admin/MenuItemController.php:16
 * @route '/admin/menus/{menu}/items'
 */
export const store = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
store.url = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
store.post = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MenuItemController::store
 * @see app/Http/Controllers/Admin/MenuItemController.php:16
 * @route '/admin/menus/{menu}/items'
 */
    const storeForm = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MenuItemController::store
 * @see app/Http/Controllers/Admin/MenuItemController.php:16
 * @route '/admin/menus/{menu}/items'
 */
        storeForm.post = (args: { menu: string | number | { id: string | number } } | [menu: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const items = {
    store: Object.assign(store, store),
}

export default items