import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/impact-and-milestones/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::store
* @see app/Http/Controllers/Admin/HomeReachItemController.php:17
* @route '/admin/impact-and-milestones/items'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const items = {
    store: Object.assign(store, store),
}

export default items