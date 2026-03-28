import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::edit
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:14
* @route '/admin/about-page/content-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/about-page/content-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::edit
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:14
* @route '/admin/about-page/content-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::edit
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:14
* @route '/admin/about-page/content-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::edit
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:14
* @route '/admin/about-page/content-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::update
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:33
* @route '/admin/about-page/content-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/about-page/content-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::update
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:33
* @route '/admin/about-page/content-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AboutContentSectionController::update
* @see app/Http/Controllers/Admin/AboutContentSectionController.php:33
* @route '/admin/about-page/content-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const about_content_sections = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default about_content_sections