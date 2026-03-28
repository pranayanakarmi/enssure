import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::edit
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:15
* @route '/admin/home-about-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-about-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::edit
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:15
* @route '/admin/home-about-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::edit
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:15
* @route '/admin/home-about-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::edit
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:15
* @route '/admin/home-about-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::update
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:48
* @route '/admin/home-about-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-about-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::update
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:48
* @route '/admin/home-about-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeAboutSectionController::update
* @see app/Http/Controllers/Admin/HomeAboutSectionController.php:48
* @route '/admin/home-about-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const HomeAboutSectionController = { edit, update }

export default HomeAboutSectionController