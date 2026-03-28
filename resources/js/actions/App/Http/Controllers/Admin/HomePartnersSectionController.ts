import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::edit
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:14
* @route '/admin/home-partners-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-partners-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::edit
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:14
* @route '/admin/home-partners-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::edit
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:14
* @route '/admin/home-partners-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::edit
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:14
* @route '/admin/home-partners-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::update
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:33
* @route '/admin/home-partners-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-partners-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::update
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:33
* @route '/admin/home-partners-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomePartnersSectionController::update
* @see app/Http/Controllers/Admin/HomePartnersSectionController.php:33
* @route '/admin/home-partners-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const HomePartnersSectionController = { edit, update }

export default HomePartnersSectionController