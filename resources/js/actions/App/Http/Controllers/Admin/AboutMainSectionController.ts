import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::edit
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:15
* @route '/admin/about-page/main-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/about-page/main-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::edit
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:15
* @route '/admin/about-page/main-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::edit
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:15
* @route '/admin/about-page/main-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::edit
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:15
* @route '/admin/about-page/main-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::update
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:46
* @route '/admin/about-page/main-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/about-page/main-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::update
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:46
* @route '/admin/about-page/main-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AboutMainSectionController::update
* @see app/Http/Controllers/Admin/AboutMainSectionController.php:46
* @route '/admin/about-page/main-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const AboutMainSectionController = { edit, update }

export default AboutMainSectionController