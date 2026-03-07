import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
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
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
* @route '/admin/home-impact-stories-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
* @route '/admin/home-impact-stories-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
* @route '/admin/home-impact-stories-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
* @route '/admin/home-impact-stories-section/edit'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
* @route '/admin/home-impact-stories-section/edit'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::edit
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:14
* @route '/admin/home-impact-stories-section/edit'
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
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:39
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
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:39
* @route '/admin/home-impact-stories-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:39
* @route '/admin/home-impact-stories-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:39
* @route '/admin/home-impact-stories-section'
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
* @see \App\Http\Controllers\Admin\HomeImpactStoriesSectionController::update
* @see app/Http/Controllers/Admin/HomeImpactStoriesSectionController.php:39
* @route '/admin/home-impact-stories-section'
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

const HomeImpactStoriesSectionController = { edit, update }

export default HomeImpactStoriesSectionController