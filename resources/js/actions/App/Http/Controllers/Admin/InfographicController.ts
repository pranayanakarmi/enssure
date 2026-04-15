import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/infographics/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InfographicController::dashboard
 * @see app/Http/Controllers/Admin/InfographicController.php:17
 * @route '/admin/infographics/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Admin\InfographicController::store
 * @see app/Http/Controllers/Admin/InfographicController.php:50
 * @route '/admin/infographics'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/infographics',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::store
 * @see app/Http/Controllers/Admin/InfographicController.php:50
 * @route '/admin/infographics'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::store
 * @see app/Http/Controllers/Admin/InfographicController.php:50
 * @route '/admin/infographics'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicController::store
 * @see app/Http/Controllers/Admin/InfographicController.php:50
 * @route '/admin/infographics'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicController::store
 * @see app/Http/Controllers/Admin/InfographicController.php:50
 * @route '/admin/infographics'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\InfographicController::update
 * @see app/Http/Controllers/Admin/InfographicController.php:75
 * @route '/admin/infographics/{infographic}'
 */
export const update = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/infographics/{infographic}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
 * @see app/Http/Controllers/Admin/InfographicController.php:75
 * @route '/admin/infographics/{infographic}'
 */
update.url = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { infographic: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    infographic: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        infographic: typeof args.infographic === 'object'
                ? args.infographic.id
                : args.infographic,
                }

    return update.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
 * @see app/Http/Controllers/Admin/InfographicController.php:75
 * @route '/admin/infographics/{infographic}'
 */
update.put = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicController::update
 * @see app/Http/Controllers/Admin/InfographicController.php:75
 * @route '/admin/infographics/{infographic}'
 */
    const updateForm = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicController::update
 * @see app/Http/Controllers/Admin/InfographicController.php:75
 * @route '/admin/infographics/{infographic}'
 */
        updateForm.put = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
 * @see app/Http/Controllers/Admin/InfographicController.php:108
 * @route '/admin/infographics/{infographic}'
 */
export const destroy = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/infographics/{infographic}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
 * @see app/Http/Controllers/Admin/InfographicController.php:108
 * @route '/admin/infographics/{infographic}'
 */
destroy.url = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { infographic: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    infographic: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        infographic: typeof args.infographic === 'object'
                ? args.infographic.id
                : args.infographic,
                }

    return destroy.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
 * @see app/Http/Controllers/Admin/InfographicController.php:108
 * @route '/admin/infographics/{infographic}'
 */
destroy.delete = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
 * @see app/Http/Controllers/Admin/InfographicController.php:108
 * @route '/admin/infographics/{infographic}'
 */
    const destroyForm = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
 * @see app/Http/Controllers/Admin/InfographicController.php:108
 * @route '/admin/infographics/{infographic}'
 */
        destroyForm.delete = (args: { infographic: string | number | { id: string | number } } | [infographic: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\InfographicController::reorder
 * @see app/Http/Controllers/Admin/InfographicController.php:120
 * @route '/admin/infographics/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/infographics/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::reorder
 * @see app/Http/Controllers/Admin/InfographicController.php:120
 * @route '/admin/infographics/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::reorder
 * @see app/Http/Controllers/Admin/InfographicController.php:120
 * @route '/admin/infographics/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicController::reorder
 * @see app/Http/Controllers/Admin/InfographicController.php:120
 * @route '/admin/infographics/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicController::reorder
 * @see app/Http/Controllers/Admin/InfographicController.php:120
 * @route '/admin/infographics/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const InfographicController = { dashboard, store, update, destroy, reorder }

export default InfographicController