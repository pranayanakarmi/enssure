import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
export const edit = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/slider-items/{slider_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
edit.url = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slider_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    slider_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slider_item: typeof args.slider_item === 'object'
                ? args.slider_item.id
                : args.slider_item,
                }

    return edit.definition.url
            .replace('{slider_item}', parsedArgs.slider_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
edit.get = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
edit.head = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
    const editForm = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
        editForm.get = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
 * @see app/Http/Controllers/Admin/SliderItemController.php:31
 * @route '/admin/slider-items/{slider_item}/edit'
 */
        editForm.head = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\SliderItemController::update
 * @see app/Http/Controllers/Admin/SliderItemController.php:57
 * @route '/admin/slider-items/{slider_item}'
 */
export const update = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/slider-items/{slider_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::update
 * @see app/Http/Controllers/Admin/SliderItemController.php:57
 * @route '/admin/slider-items/{slider_item}'
 */
update.url = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slider_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    slider_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slider_item: typeof args.slider_item === 'object'
                ? args.slider_item.id
                : args.slider_item,
                }

    return update.definition.url
            .replace('{slider_item}', parsedArgs.slider_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::update
 * @see app/Http/Controllers/Admin/SliderItemController.php:57
 * @route '/admin/slider-items/{slider_item}'
 */
update.put = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\SliderItemController::update
 * @see app/Http/Controllers/Admin/SliderItemController.php:57
 * @route '/admin/slider-items/{slider_item}'
 */
    const updateForm = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SliderItemController::update
 * @see app/Http/Controllers/Admin/SliderItemController.php:57
 * @route '/admin/slider-items/{slider_item}'
 */
        updateForm.put = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
 * @see app/Http/Controllers/Admin/SliderItemController.php:74
 * @route '/admin/slider-items/{slider_item}'
 */
export const destroy = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/slider-items/{slider_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
 * @see app/Http/Controllers/Admin/SliderItemController.php:74
 * @route '/admin/slider-items/{slider_item}'
 */
destroy.url = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider_item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slider_item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    slider_item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slider_item: typeof args.slider_item === 'object'
                ? args.slider_item.id
                : args.slider_item,
                }

    return destroy.definition.url
            .replace('{slider_item}', parsedArgs.slider_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
 * @see app/Http/Controllers/Admin/SliderItemController.php:74
 * @route '/admin/slider-items/{slider_item}'
 */
destroy.delete = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
 * @see app/Http/Controllers/Admin/SliderItemController.php:74
 * @route '/admin/slider-items/{slider_item}'
 */
    const destroyForm = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
 * @see app/Http/Controllers/Admin/SliderItemController.php:74
 * @route '/admin/slider-items/{slider_item}'
 */
        destroyForm.delete = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SliderItemController::reorder
 * @see app/Http/Controllers/Admin/SliderItemController.php:88
 * @route '/admin/slider-items/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/slider-items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::reorder
 * @see app/Http/Controllers/Admin/SliderItemController.php:88
 * @route '/admin/slider-items/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::reorder
 * @see app/Http/Controllers/Admin/SliderItemController.php:88
 * @route '/admin/slider-items/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SliderItemController::reorder
 * @see app/Http/Controllers/Admin/SliderItemController.php:88
 * @route '/admin/slider-items/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SliderItemController::reorder
 * @see app/Http/Controllers/Admin/SliderItemController.php:88
 * @route '/admin/slider-items/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const sliderItems = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
reorder: Object.assign(reorder, reorder),
}

export default sliderItems