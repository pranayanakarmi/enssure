import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/newsletters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\NewsletterController::index
 * @see app/Http/Controllers/Admin/NewsletterController.php:15
 * @route '/admin/newsletters'
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
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/newsletters/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\NewsletterController::create
 * @see app/Http/Controllers/Admin/NewsletterController.php:35
 * @route '/admin/newsletters/create'
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
* @see \App\Http\Controllers\Admin\NewsletterController::store
 * @see app/Http/Controllers/Admin/NewsletterController.php:42
 * @route '/admin/newsletters'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/newsletters',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NewsletterController::store
 * @see app/Http/Controllers/Admin/NewsletterController.php:42
 * @route '/admin/newsletters'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsletterController::store
 * @see app/Http/Controllers/Admin/NewsletterController.php:42
 * @route '/admin/newsletters'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\NewsletterController::store
 * @see app/Http/Controllers/Admin/NewsletterController.php:42
 * @route '/admin/newsletters'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\NewsletterController::store
 * @see app/Http/Controllers/Admin/NewsletterController.php:42
 * @route '/admin/newsletters'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
export const edit = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/newsletters/{newsletter}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
edit.url = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { newsletter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { newsletter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    newsletter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        newsletter: typeof args.newsletter === 'object'
                ? args.newsletter.id
                : args.newsletter,
                }

    return edit.definition.url
            .replace('{newsletter}', parsedArgs.newsletter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
edit.get = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
edit.head = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
    const editForm = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
        editForm.get = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\NewsletterController::edit
 * @see app/Http/Controllers/Admin/NewsletterController.php:50
 * @route '/admin/newsletters/{newsletter}/edit'
 */
        editForm.head = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
export const update = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/newsletters/{newsletter}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
update.url = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { newsletter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { newsletter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    newsletter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        newsletter: typeof args.newsletter === 'object'
                ? args.newsletter.id
                : args.newsletter,
                }

    return update.definition.url
            .replace('{newsletter}', parsedArgs.newsletter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
update.put = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
update.patch = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
    const updateForm = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
        updateForm.put = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\NewsletterController::update
 * @see app/Http/Controllers/Admin/NewsletterController.php:66
 * @route '/admin/newsletters/{newsletter}'
 */
        updateForm.patch = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\NewsletterController::destroy
 * @see app/Http/Controllers/Admin/NewsletterController.php:74
 * @route '/admin/newsletters/{newsletter}'
 */
export const destroy = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/newsletters/{newsletter}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\NewsletterController::destroy
 * @see app/Http/Controllers/Admin/NewsletterController.php:74
 * @route '/admin/newsletters/{newsletter}'
 */
destroy.url = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { newsletter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { newsletter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    newsletter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        newsletter: typeof args.newsletter === 'object'
                ? args.newsletter.id
                : args.newsletter,
                }

    return destroy.definition.url
            .replace('{newsletter}', parsedArgs.newsletter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NewsletterController::destroy
 * @see app/Http/Controllers/Admin/NewsletterController.php:74
 * @route '/admin/newsletters/{newsletter}'
 */
destroy.delete = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\NewsletterController::destroy
 * @see app/Http/Controllers/Admin/NewsletterController.php:74
 * @route '/admin/newsletters/{newsletter}'
 */
    const destroyForm = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\NewsletterController::destroy
 * @see app/Http/Controllers/Admin/NewsletterController.php:74
 * @route '/admin/newsletters/{newsletter}'
 */
        destroyForm.delete = (args: { newsletter: string | number | { id: string | number } } | [newsletter: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const newsletters = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default newsletters