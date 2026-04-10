import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/eoi-rfp/hero',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::edit
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:16
 * @route '/admin/eoi-rfp/hero'
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
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::update
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:27
 * @route '/admin/eoi-rfp/hero'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/eoi-rfp/hero',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::update
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:27
 * @route '/admin/eoi-rfp/hero'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::update
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:27
 * @route '/admin/eoi-rfp/hero'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::update
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:27
 * @route '/admin/eoi-rfp/hero'
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
* @see \App\Http\Controllers\Admin\EoiRfpPageHeroController::update
 * @see app/Http/Controllers/Admin/EoiRfpPageHeroController.php:27
 * @route '/admin/eoi-rfp/hero'
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
const EoiRfpPageHeroController = { edit, update }

export default EoiRfpPageHeroController