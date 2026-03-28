import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import members from './members'
/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/committees',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::index
* @see app/Http/Controllers/Admin/CommitteeController.php:15
* @route '/admin/committees'
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
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/committees/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::create
* @see app/Http/Controllers/Admin/CommitteeController.php:35
* @route '/admin/committees/create'
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
* @see \App\Http\Controllers\Admin\CommitteeController::store
* @see app/Http/Controllers/Admin/CommitteeController.php:42
* @route '/admin/committees'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/committees',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeController::store
* @see app/Http/Controllers/Admin/CommitteeController.php:42
* @route '/admin/committees'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeController::store
* @see app/Http/Controllers/Admin/CommitteeController.php:42
* @route '/admin/committees'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::store
* @see app/Http/Controllers/Admin/CommitteeController.php:42
* @route '/admin/committees'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::store
* @see app/Http/Controllers/Admin/CommitteeController.php:42
* @route '/admin/committees'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
export const edit = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/committees/{committee}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
edit.url = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { committee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        committee: typeof args.committee === 'object'
        ? args.committee.id
        : args.committee,
    }

    return edit.definition.url
            .replace('{committee}', parsedArgs.committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
edit.get = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
edit.head = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
const editForm = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
editForm.get = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::edit
* @see app/Http/Controllers/Admin/CommitteeController.php:50
* @route '/admin/committees/{committee}/edit'
*/
editForm.head = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
export const update = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/committees/{committee}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
update.url = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { committee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        committee: typeof args.committee === 'object'
        ? args.committee.id
        : args.committee,
    }

    return update.definition.url
            .replace('{committee}', parsedArgs.committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
update.put = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
update.patch = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
const updateForm = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
updateForm.put = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::update
* @see app/Http/Controllers/Admin/CommitteeController.php:74
* @route '/admin/committees/{committee}'
*/
updateForm.patch = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CommitteeController::destroy
* @see app/Http/Controllers/Admin/CommitteeController.php:82
* @route '/admin/committees/{committee}'
*/
export const destroy = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/committees/{committee}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeController::destroy
* @see app/Http/Controllers/Admin/CommitteeController.php:82
* @route '/admin/committees/{committee}'
*/
destroy.url = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { committee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        committee: typeof args.committee === 'object'
        ? args.committee.id
        : args.committee,
    }

    return destroy.definition.url
            .replace('{committee}', parsedArgs.committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeController::destroy
* @see app/Http/Controllers/Admin/CommitteeController.php:82
* @route '/admin/committees/{committee}'
*/
destroy.delete = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::destroy
* @see app/Http/Controllers/Admin/CommitteeController.php:82
* @route '/admin/committees/{committee}'
*/
const destroyForm = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeController::destroy
* @see app/Http/Controllers/Admin/CommitteeController.php:82
* @route '/admin/committees/{committee}'
*/
destroyForm.delete = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const committees = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    members: Object.assign(members, members),
}

export default committees