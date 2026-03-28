import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:16
* @route '/admin/home-impact-stories-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-impact-stories-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:16
* @route '/admin/home-impact-stories-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:16
* @route '/admin/home-impact-stories-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:16
* @route '/admin/home-impact-stories-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:56
* @route '/admin/home-impact-stories-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-impact-stories-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:56
* @route '/admin/home-impact-stories-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:56
* @route '/admin/home-impact-stories-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const HomeImpactStoriesSectionController = { edit, update }

export default HomeImpactStoriesSectionController