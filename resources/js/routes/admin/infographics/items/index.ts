import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
* @see app/Http/Controllers/Admin/InfographicItemController.php:19
* @route '/admin/infographics/{infographic}/items/reorder'
*/
export const reorder = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/infographics/{infographic}/items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
* @see app/Http/Controllers/Admin/InfographicItemController.php:19
* @route '/admin/infographics/{infographic}/items/reorder'
*/
reorder.url = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { infographic: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            infographic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic: typeof args.infographic === 'object'
        ? args.infographic.slug
        : args.infographic,
    }

    return reorder.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
* @see app/Http/Controllers/Admin/InfographicItemController.php:19
* @route '/admin/infographics/{infographic}/items/reorder'
*/
reorder.post = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
* @see app/Http/Controllers/Admin/InfographicItemController.php:19
* @route '/admin/infographics/{infographic}/items/reorder'
*/
const reorderForm = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reorder.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
* @see app/Http/Controllers/Admin/InfographicItemController.php:19
* @route '/admin/infographics/{infographic}/items/reorder'
*/
reorderForm.post = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reorder.url(args, options),
    method: 'post',
})

reorder.form = reorderForm

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
* @see app/Http/Controllers/Admin/InfographicItemController.php:35
* @route '/admin/infographics/{infographic}/items'
*/
export const store = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/infographics/{infographic}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
* @see app/Http/Controllers/Admin/InfographicItemController.php:35
* @route '/admin/infographics/{infographic}/items'
*/
store.url = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { infographic: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            infographic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic: typeof args.infographic === 'object'
        ? args.infographic.slug
        : args.infographic,
    }

    return store.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
* @see app/Http/Controllers/Admin/InfographicItemController.php:35
* @route '/admin/infographics/{infographic}/items'
*/
store.post = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
* @see app/Http/Controllers/Admin/InfographicItemController.php:35
* @route '/admin/infographics/{infographic}/items'
*/
const storeForm = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
* @see app/Http/Controllers/Admin/InfographicItemController.php:35
* @route '/admin/infographics/{infographic}/items'
*/
storeForm.post = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const items = {
    reorder: Object.assign(reorder, reorder),
    store: Object.assign(store, store),
}

export default items