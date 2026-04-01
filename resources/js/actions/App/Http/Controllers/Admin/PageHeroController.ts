import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/pages/hero/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PageHeroController::edit
 * @see app/Http/Controllers/Admin/PageHeroController.php:15
 * @route '/admin/pages/hero/edit'
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
* @see \App\Http\Controllers\Admin\PageHeroController::update
 * @see app/Http/Controllers/Admin/PageHeroController.php:33
 * @route '/admin/pages/hero'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/pages/hero',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PageHeroController::update
 * @see app/Http/Controllers/Admin/PageHeroController.php:33
 * @route '/admin/pages/hero'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageHeroController::update
 * @see app/Http/Controllers/Admin/PageHeroController.php:33
 * @route '/admin/pages/hero'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\PageHeroController::update
 * @see app/Http/Controllers/Admin/PageHeroController.php:33
 * @route '/admin/pages/hero'
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
* @see \App\Http\Controllers\Admin\PageHeroController::update
 * @see app/Http/Controllers/Admin/PageHeroController.php:33
 * @route '/admin/pages/hero'
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
const PageHeroController = { edit, update }

export default PageHeroController