import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/videos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoController::index
 * @see app/Http/Controllers/Admin/VideoController.php:13
 * @route '/admin/videos'
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
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/videos/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoController::create
 * @see app/Http/Controllers/Admin/VideoController.php:19
 * @route '/admin/videos/create'
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
* @see \App\Http\Controllers\Admin\VideoController::store
 * @see app/Http/Controllers/Admin/VideoController.php:24
 * @route '/admin/videos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/videos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::store
 * @see app/Http/Controllers/Admin/VideoController.php:24
 * @route '/admin/videos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::store
 * @see app/Http/Controllers/Admin/VideoController.php:24
 * @route '/admin/videos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::store
 * @see app/Http/Controllers/Admin/VideoController.php:24
 * @route '/admin/videos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::store
 * @see app/Http/Controllers/Admin/VideoController.php:24
 * @route '/admin/videos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
export const show = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/videos/{video}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
show.url = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    video: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        video: args.video,
                }

    return show.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
show.get = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
show.head = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
    const showForm = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
        showForm.get = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoController::show
 * @see app/Http/Controllers/Admin/VideoController.php:0
 * @route '/admin/videos/{video}'
 */
        showForm.head = (args: { video: string | number } | [video: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
export const edit = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/videos/{video}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
edit.url = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { video: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    video: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        video: typeof args.video === 'object'
                ? args.video.id
                : args.video,
                }

    return edit.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
edit.get = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
edit.head = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
    const editForm = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
        editForm.get = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoController::edit
 * @see app/Http/Controllers/Admin/VideoController.php:47
 * @route '/admin/videos/{video}/edit'
 */
        editForm.head = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
export const update = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/videos/{video}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
update.url = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { video: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    video: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        video: typeof args.video === 'object'
                ? args.video.id
                : args.video,
                }

    return update.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
update.put = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
update.patch = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
    const updateForm = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
        updateForm.put = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoController::update
 * @see app/Http/Controllers/Admin/VideoController.php:52
 * @route '/admin/videos/{video}'
 */
        updateForm.patch = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\VideoController::destroy
 * @see app/Http/Controllers/Admin/VideoController.php:81
 * @route '/admin/videos/{video}'
 */
export const destroy = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/videos/{video}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\VideoController::destroy
 * @see app/Http/Controllers/Admin/VideoController.php:81
 * @route '/admin/videos/{video}'
 */
destroy.url = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { video: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    video: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        video: typeof args.video === 'object'
                ? args.video.id
                : args.video,
                }

    return destroy.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoController::destroy
 * @see app/Http/Controllers/Admin/VideoController.php:81
 * @route '/admin/videos/{video}'
 */
destroy.delete = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\VideoController::destroy
 * @see app/Http/Controllers/Admin/VideoController.php:81
 * @route '/admin/videos/{video}'
 */
    const destroyForm = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoController::destroy
 * @see app/Http/Controllers/Admin/VideoController.php:81
 * @route '/admin/videos/{video}'
 */
        destroyForm.delete = (args: { video: number | { id: number } } | [video: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const videos = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default videos