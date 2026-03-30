import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
export const edit = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/committee-members/{committee_member}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
edit.url = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { committee_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    committee_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        committee_member: typeof args.committee_member === 'object'
                ? args.committee_member.id
                : args.committee_member,
                }

    return edit.definition.url
            .replace('{committee_member}', parsedArgs.committee_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
edit.get = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
edit.head = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
    const editForm = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
        editForm.get = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::edit
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:30
 * @route '/admin/committee-members/{committee_member}/edit'
 */
        editForm.head = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CommitteeMemberController::update
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:54
 * @route '/admin/committee-members/{committee_member}'
 */
export const update = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/committee-members/{committee_member}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::update
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:54
 * @route '/admin/committee-members/{committee_member}'
 */
update.url = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { committee_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    committee_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        committee_member: typeof args.committee_member === 'object'
                ? args.committee_member.id
                : args.committee_member,
                }

    return update.definition.url
            .replace('{committee_member}', parsedArgs.committee_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::update
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:54
 * @route '/admin/committee-members/{committee_member}'
 */
update.put = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::update
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:54
 * @route '/admin/committee-members/{committee_member}'
 */
    const updateForm = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::update
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:54
 * @route '/admin/committee-members/{committee_member}'
 */
        updateForm.put = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CommitteeMemberController::destroy
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:71
 * @route '/admin/committee-members/{committee_member}'
 */
export const destroy = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/committee-members/{committee_member}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::destroy
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:71
 * @route '/admin/committee-members/{committee_member}'
 */
destroy.url = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee_member: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { committee_member: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    committee_member: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        committee_member: typeof args.committee_member === 'object'
                ? args.committee_member.id
                : args.committee_member,
                }

    return destroy.definition.url
            .replace('{committee_member}', parsedArgs.committee_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::destroy
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:71
 * @route '/admin/committee-members/{committee_member}'
 */
destroy.delete = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::destroy
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:71
 * @route '/admin/committee-members/{committee_member}'
 */
    const destroyForm = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::destroy
 * @see app/Http/Controllers/Admin/CommitteeMemberController.php:71
 * @route '/admin/committee-members/{committee_member}'
 */
        destroyForm.delete = (args: { committee_member: number | { id: number } } | [committee_member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const committeeMembers = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default committeeMembers