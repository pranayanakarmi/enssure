import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/beneficiaries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::index
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:15
 * @route '/admin/beneficiaries'
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
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/beneficiaries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::create
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:39
 * @route '/admin/beneficiaries/create'
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
* @see \App\Http\Controllers\Admin\BeneficiaryController::store
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:46
 * @route '/admin/beneficiaries'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/beneficiaries',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::store
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:46
 * @route '/admin/beneficiaries'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::store
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:46
 * @route '/admin/beneficiaries'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::store
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:46
 * @route '/admin/beneficiaries'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::store
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:46
 * @route '/admin/beneficiaries'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
export const edit = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/beneficiaries/{beneficiary}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
edit.url = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { beneficiary: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { beneficiary: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    beneficiary: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        beneficiary: typeof args.beneficiary === 'object'
                ? args.beneficiary.id
                : args.beneficiary,
                }

    return edit.definition.url
            .replace('{beneficiary}', parsedArgs.beneficiary.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
edit.get = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
edit.head = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
    const editForm = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
        editForm.get = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::edit
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:54
 * @route '/admin/beneficiaries/{beneficiary}/edit'
 */
        editForm.head = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
export const update = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/beneficiaries/{beneficiary}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
update.url = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { beneficiary: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { beneficiary: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    beneficiary: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        beneficiary: typeof args.beneficiary === 'object'
                ? args.beneficiary.id
                : args.beneficiary,
                }

    return update.definition.url
            .replace('{beneficiary}', parsedArgs.beneficiary.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
update.put = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
update.patch = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
    const updateForm = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
        updateForm.put = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::update
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:76
 * @route '/admin/beneficiaries/{beneficiary}'
 */
        updateForm.patch = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\BeneficiaryController::destroy
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:84
 * @route '/admin/beneficiaries/{beneficiary}'
 */
export const destroy = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/beneficiaries/{beneficiary}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::destroy
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:84
 * @route '/admin/beneficiaries/{beneficiary}'
 */
destroy.url = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { beneficiary: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { beneficiary: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    beneficiary: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        beneficiary: typeof args.beneficiary === 'object'
                ? args.beneficiary.id
                : args.beneficiary,
                }

    return destroy.definition.url
            .replace('{beneficiary}', parsedArgs.beneficiary.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BeneficiaryController::destroy
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:84
 * @route '/admin/beneficiaries/{beneficiary}'
 */
destroy.delete = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::destroy
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:84
 * @route '/admin/beneficiaries/{beneficiary}'
 */
    const destroyForm = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BeneficiaryController::destroy
 * @see app/Http/Controllers/Admin/BeneficiaryController.php:84
 * @route '/admin/beneficiaries/{beneficiary}'
 */
        destroyForm.delete = (args: { beneficiary: string | number | { id: string | number } } | [beneficiary: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const beneficiaries = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default beneficiaries