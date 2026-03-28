import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::edit
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:14
* @route '/admin/gallery-page/section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/gallery-page/section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::edit
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:14
* @route '/admin/gallery-page/section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::edit
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:14
* @route '/admin/gallery-page/section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::edit
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:14
* @route '/admin/gallery-page/section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::update
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:33
* @route '/admin/gallery-page/section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/gallery-page/section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::update
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:33
* @route '/admin/gallery-page/section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalleryPageSectionController::update
* @see app/Http/Controllers/Admin/GalleryPageSectionController.php:33
* @route '/admin/gallery-page/section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const GalleryPageSectionController = { edit, update }

export default GalleryPageSectionController