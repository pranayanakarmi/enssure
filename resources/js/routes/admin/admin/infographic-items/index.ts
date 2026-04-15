import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
 * @see app/Http/Controllers/Admin/InfographicItemController.php:17
 * @route '/admin/infographics/{infographic}/items'
 */
export const store = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/infographics/{infographic}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
 * @see app/Http/Controllers/Admin/InfographicItemController.php:17
 * @route '/admin/infographics/{infographic}/items'
 */
store.url = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
 * @see app/Http/Controllers/Admin/InfographicItemController.php:17
 * @route '/admin/infographics/{infographic}/items'
 */
store.post = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
 * @see app/Http/Controllers/Admin/InfographicItemController.php:17
 * @route '/admin/infographics/{infographic}/items'
 */
    const storeForm = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicItemController::store
 * @see app/Http/Controllers/Admin/InfographicItemController.php:17
 * @route '/admin/infographics/{infographic}/items'
 */
        storeForm.post = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
 * @see app/Http/Controllers/Admin/InfographicItemController.php:26
 * @route '/admin/infographic-items/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/infographic-items/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
 * @see app/Http/Controllers/Admin/InfographicItemController.php:26
 * @route '/admin/infographic-items/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
 * @see app/Http/Controllers/Admin/InfographicItemController.php:26
 * @route '/admin/infographic-items/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
 * @see app/Http/Controllers/Admin/InfographicItemController.php:26
 * @route '/admin/infographic-items/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
 * @see app/Http/Controllers/Admin/InfographicItemController.php:26
 * @route '/admin/infographic-items/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
 * @see app/Http/Controllers/Admin/InfographicItemController.php:38
 * @route '/admin/infographic-items/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/infographic-items/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
 * @see app/Http/Controllers/Admin/InfographicItemController.php:38
 * @route '/admin/infographic-items/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
 * @see app/Http/Controllers/Admin/InfographicItemController.php:38
 * @route '/admin/infographic-items/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
 * @see app/Http/Controllers/Admin/InfographicItemController.php:38
 * @route '/admin/infographic-items/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
 * @see app/Http/Controllers/Admin/InfographicItemController.php:38
 * @route '/admin/infographic-items/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
 * @see app/Http/Controllers/Admin/InfographicItemController.php:46
 * @route '/admin/infographics/{infographic}/items/reorder'
 */
export const reorder = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/infographics/{infographic}/items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
 * @see app/Http/Controllers/Admin/InfographicItemController.php:46
 * @route '/admin/infographics/{infographic}/items/reorder'
 */
reorder.url = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reorder.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
 * @see app/Http/Controllers/Admin/InfographicItemController.php:46
 * @route '/admin/infographics/{infographic}/items/reorder'
 */
reorder.post = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
 * @see app/Http/Controllers/Admin/InfographicItemController.php:46
 * @route '/admin/infographics/{infographic}/items/reorder'
 */
    const reorderForm = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicItemController::reorder
 * @see app/Http/Controllers/Admin/InfographicItemController.php:46
 * @route '/admin/infographics/{infographic}/items/reorder'
 */
        reorderForm.post = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(args, options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const infographicItems = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
reorder: Object.assign(reorder, reorder),
}

export default infographicItems