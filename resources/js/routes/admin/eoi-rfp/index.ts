import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/eoi-rfp-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:695
 * @route '/eoi-rfp-dashboard'
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
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/eoi-rfp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::index
 * @see app/Http/Controllers/Admin/EoiRfpController.php:15
 * @route '/admin/eoi-rfp'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/eoi-rfp/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::create
 * @see app/Http/Controllers/Admin/EoiRfpController.php:33
 * @route '/admin/eoi-rfp/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::store
 * @see app/Http/Controllers/Admin/EoiRfpController.php:40
 * @route '/admin/eoi-rfp'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/eoi-rfp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::store
 * @see app/Http/Controllers/Admin/EoiRfpController.php:40
 * @route '/admin/eoi-rfp'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::store
 * @see app/Http/Controllers/Admin/EoiRfpController.php:40
 * @route '/admin/eoi-rfp'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::store
 * @see app/Http/Controllers/Admin/EoiRfpController.php:40
 * @route '/admin/eoi-rfp'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::store
 * @see app/Http/Controllers/Admin/EoiRfpController.php:40
 * @route '/admin/eoi-rfp'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
export const edit = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/eoi-rfp/{eoi_rfp}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
edit.url = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eoi_rfp: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { eoi_rfp: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    eoi_rfp: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        eoi_rfp: typeof args.eoi_rfp === 'object'
                ? args.eoi_rfp.id
                : args.eoi_rfp,
                }

    return edit.definition.url
            .replace('{eoi_rfp}', parsedArgs.eoi_rfp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
edit.get = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
edit.head = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
    const editForm = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
        editForm.get = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::edit
 * @see app/Http/Controllers/Admin/EoiRfpController.php:81
 * @route '/admin/eoi-rfp/{eoi_rfp}/edit'
 */
        editForm.head = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
export const update = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/eoi-rfp/{eoi_rfp}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
update.url = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eoi_rfp: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { eoi_rfp: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    eoi_rfp: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        eoi_rfp: typeof args.eoi_rfp === 'object'
                ? args.eoi_rfp.id
                : args.eoi_rfp,
                }

    return update.definition.url
            .replace('{eoi_rfp}', parsedArgs.eoi_rfp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
update.put = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
update.patch = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
    const updateForm = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
        updateForm.put = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::update
 * @see app/Http/Controllers/Admin/EoiRfpController.php:90
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
        updateForm.patch = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\EoiRfpController::destroy
 * @see app/Http/Controllers/Admin/EoiRfpController.php:140
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
export const destroy = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/eoi-rfp/{eoi_rfp}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::destroy
 * @see app/Http/Controllers/Admin/EoiRfpController.php:140
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
destroy.url = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eoi_rfp: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { eoi_rfp: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    eoi_rfp: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        eoi_rfp: typeof args.eoi_rfp === 'object'
                ? args.eoi_rfp.id
                : args.eoi_rfp,
                }

    return destroy.definition.url
            .replace('{eoi_rfp}', parsedArgs.eoi_rfp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::destroy
 * @see app/Http/Controllers/Admin/EoiRfpController.php:140
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
destroy.delete = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::destroy
 * @see app/Http/Controllers/Admin/EoiRfpController.php:140
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
    const destroyForm = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::destroy
 * @see app/Http/Controllers/Admin/EoiRfpController.php:140
 * @route '/admin/eoi-rfp/{eoi_rfp}'
 */
        destroyForm.delete = (args: { eoi_rfp: number | { id: number } } | [eoi_rfp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\EoiRfpController::reorder
 * @see app/Http/Controllers/Admin/EoiRfpController.php:150
 * @route '/admin/eoi-rfp/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/eoi-rfp/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::reorder
 * @see app/Http/Controllers/Admin/EoiRfpController.php:150
 * @route '/admin/eoi-rfp/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EoiRfpController::reorder
 * @see app/Http/Controllers/Admin/EoiRfpController.php:150
 * @route '/admin/eoi-rfp/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\EoiRfpController::reorder
 * @see app/Http/Controllers/Admin/EoiRfpController.php:150
 * @route '/admin/eoi-rfp/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EoiRfpController::reorder
 * @see app/Http/Controllers/Admin/EoiRfpController.php:150
 * @route '/admin/eoi-rfp/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const eoiRfp = {
    dashboard: Object.assign(dashboard, dashboard),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
reorder: Object.assign(reorder, reorder),
}

export default eoiRfp