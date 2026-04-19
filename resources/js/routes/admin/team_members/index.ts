import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
export const executive_index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: executive_index.url(options),
    method: 'get',
})

executive_index.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/executive',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
executive_index.url = (options?: RouteQueryOptions) => {
    return executive_index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
executive_index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: executive_index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
executive_index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: executive_index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
    const executive_indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: executive_index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
        executive_indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: executive_index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::executive_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/executive'
 */
        executive_indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: executive_index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    executive_index.form = executive_indexForm
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
export const staff_index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: staff_index.url(options),
    method: 'get',
})

staff_index.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/staff',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
staff_index.url = (options?: RouteQueryOptions) => {
    return staff_index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
staff_index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: staff_index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
staff_index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: staff_index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
    const staff_indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: staff_index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
        staff_indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: staff_index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::staff_index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members/staff'
 */
        staff_indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: staff_index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    staff_index.form = staff_indexForm
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/team_members',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
 * @see app/Http/Controllers/Admin/TeamMemberController.php:24
 * @route '/admin/team_members'
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
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
 * @see app/Http/Controllers/Admin/TeamMemberController.php:61
 * @route '/admin/team_members/create'
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
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:76
 * @route '/admin/team_members'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/team_members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:76
 * @route '/admin/team_members'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:76
 * @route '/admin/team_members'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:76
 * @route '/admin/team_members'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
 * @see app/Http/Controllers/Admin/TeamMemberController.php:76
 * @route '/admin/team_members'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
export const edit = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/{team_member}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
edit.url = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return edit.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
edit.get = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
edit.head = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
    const editForm = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
        editForm.get = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
 * @see app/Http/Controllers/Admin/TeamMemberController.php:100
 * @route '/admin/team_members/{team_member}/edit'
 */
        editForm.head = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
export const update = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/team_members/{team_member}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
update.url = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return update.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
update.put = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
update.patch = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
    const updateForm = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
        updateForm.put = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
 * @see app/Http/Controllers/Admin/TeamMemberController.php:126
 * @route '/admin/team_members/{team_member}'
 */
        updateForm.patch = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:158
 * @route '/admin/team_members/{team_member}'
 */
export const destroy = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/team_members/{team_member}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:158
 * @route '/admin/team_members/{team_member}'
 */
destroy.url = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { team_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    team_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        team_member: typeof args.team_member === 'object'
                ? args.team_member.id
                : args.team_member,
                }

    return destroy.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:158
 * @route '/admin/team_members/{team_member}'
 */
destroy.delete = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:158
 * @route '/admin/team_members/{team_member}'
 */
    const destroyForm = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
 * @see app/Http/Controllers/Admin/TeamMemberController.php:158
 * @route '/admin/team_members/{team_member}'
 */
        destroyForm.delete = (args: { team_member: number | { id: number } } | [team_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const team_members = {
    executive_index: Object.assign(executive_index, executive_index),
staff_index: Object.assign(staff_index, staff_index),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default team_members