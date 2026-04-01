import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-gallery-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::edit
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:16
* @route '/admin/home-gallery-section/edit'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::update
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:54
* @route '/admin/home-gallery-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-gallery-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::update
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:54
* @route '/admin/home-gallery-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::update
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:54
* @route '/admin/home-gallery-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::update
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:54
* @route '/admin/home-gallery-section'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\HomeGallerySectionController::update
* @see app/Http/Controllers/Admin/HomeGallerySectionController.php:54
* @route '/admin/home-gallery-section'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const HomeGallerySectionController = { edit, update }

export default HomeGallerySectionController