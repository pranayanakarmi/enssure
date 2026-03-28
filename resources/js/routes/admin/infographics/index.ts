import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import items from './items'
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
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
export const edit = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/infographics/{infographic}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
edit.url = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { infographic: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            infographic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic: typeof args.infographic === 'object'
        ? args.infographic.slug
        : args.infographic,
    }

    return edit.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
edit.get = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
edit.head = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
const editForm = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
editForm.get = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::edit
* @see app/Http/Controllers/Admin/InfographicController.php:58
* @route '/admin/infographics/{infographic}/edit'
*/
editForm.head = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
export const update = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/infographics/{infographic}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
update.url = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { infographic: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            infographic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic: typeof args.infographic === 'object'
        ? args.infographic.slug
        : args.infographic,
    }

    return update.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
update.put = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
update.patch = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::update
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
const updateForm = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
updateForm.put = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:80
* @route '/admin/infographics/{infographic}'
*/
updateForm.patch = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:93
* @route '/admin/infographics/{infographic}'
*/
export const destroy = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/infographics/{infographic}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
* @see app/Http/Controllers/Admin/InfographicController.php:93
* @route '/admin/infographics/{infographic}'
*/
destroy.url = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { infographic: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            infographic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic: typeof args.infographic === 'object'
        ? args.infographic.slug
        : args.infographic,
    }

    return destroy.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
* @see app/Http/Controllers/Admin/InfographicController.php:93
* @route '/admin/infographics/{infographic}'
*/
destroy.delete = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\InfographicController::destroy
* @see app/Http/Controllers/Admin/InfographicController.php:93
* @route '/admin/infographics/{infographic}'
*/
const destroyForm = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Admin/InfographicController.php:93
* @route '/admin/infographics/{infographic}'
*/
destroyForm.delete = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    items: Object.assign(items, items),
}

export default infographics