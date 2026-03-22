import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/infographics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::index
* @see app/Http/Controllers/Admin/InfographicController.php:16
* @route '/admin/infographics'
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
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/infographics/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::create
* @see app/Http/Controllers/Admin/InfographicController.php:38
* @route '/admin/infographics/create'
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
* @see \App\Http\Controllers\Admin\InfographicController::store
* @see app/Http/Controllers/Admin/InfographicController.php:45
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
* @see app/Http/Controllers/Admin/InfographicController.php:45
* @route '/admin/infographics'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::store
* @see app/Http/Controllers/Admin/InfographicController.php:45
* @route '/admin/infographics'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::store
* @see app/Http/Controllers/Admin/InfographicController.php:45
* @route '/admin/infographics'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::store
* @see app/Http/Controllers/Admin/InfographicController.php:45
* @route '/admin/infographics'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
export const edit = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/infographics/{infographic}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
edit.url = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
edit.get = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
edit.head = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
const editForm = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
editForm.get = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:57
* @route '/admin/infographics/{infographic}/edit'
*/
editForm.head = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
export const update = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/infographics/{infographic}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
update.url = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
update.put = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
update.patch = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
const updateForm = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
updateForm.put = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:71
* @route '/admin/infographics/{infographic}'
*/
updateForm.patch = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InfographicController::destroy
* @see app/Http/Controllers/Admin/InfographicController.php:89
* @route '/admin/infographics/{infographic}'
*/
export const destroy = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/infographics/{infographic}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
* @see app/Http/Controllers/Admin/InfographicController.php:89
* @route '/admin/infographics/{infographic}'
*/
destroy.url = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/Admin/InfographicController.php:89
* @route '/admin/infographics/{infographic}'
*/
destroy.delete = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
* @see app/Http/Controllers/Admin/InfographicController.php:89
* @route '/admin/infographics/{infographic}'
*/
const destroyForm = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:89
* @route '/admin/infographics/{infographic}'
*/
destroyForm.delete = (args: { infographic: number | { id: number } } | [infographic: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const infographics = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default infographics