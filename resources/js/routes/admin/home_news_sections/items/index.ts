import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionItemController::store
* @see app/Http/Controllers/Admin/HomeNewsSectionItemController.php:17
* @route '/admin/home-news-section/items'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/home-news-section/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionItemController::store
* @see app/Http/Controllers/Admin/HomeNewsSectionItemController.php:17
* @route '/admin/home-news-section/items'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionItemController::store
* @see app/Http/Controllers/Admin/HomeNewsSectionItemController.php:17
* @route '/admin/home-news-section/items'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionItemController::store
* @see app/Http/Controllers/Admin/HomeNewsSectionItemController.php:17
* @route '/admin/home-news-section/items'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionItemController::store
* @see app/Http/Controllers/Admin/HomeNewsSectionItemController.php:17
* @route '/admin/home-news-section/items'
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