import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::edit
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:15
* @route '/admin/home-support-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-support-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::edit
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:15
* @route '/admin/home-support-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::edit
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:15
* @route '/admin/home-support-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::edit
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:15
* @route '/admin/home-support-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::update
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:35
* @route '/admin/home-support-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-support-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::update
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:35
* @route '/admin/home-support-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeSupportSectionController::update
* @see app/Http/Controllers/Admin/HomeSupportSectionController.php:35
* @route '/admin/home-support-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const home_support_sections = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default home_support_sections