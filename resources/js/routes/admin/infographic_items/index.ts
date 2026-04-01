import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
export const edit = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/infographic-items/{infographic_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
edit.url = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { infographic_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            infographic_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic_item: typeof args.infographic_item === 'object'
        ? args.infographic_item.id
        : args.infographic_item,
    }

    return edit.definition.url
            .replace('{infographic_item}', parsedArgs.infographic_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
edit.get = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
edit.head = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
const editForm = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
editForm.get = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::edit
* @see app/Http/Controllers/Admin/InfographicItemController.php:46
* @route '/admin/infographic-items/{infographic_item}/edit'
*/
editForm.head = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\InfographicItemController::update
* @see app/Http/Controllers/Admin/InfographicItemController.php:66
* @route '/admin/infographic-items/{infographic_item}'
*/
export const update = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/infographic-items/{infographic_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
* @see app/Http/Controllers/Admin/InfographicItemController.php:66
* @route '/admin/infographic-items/{infographic_item}'
*/
update.url = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { infographic_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            infographic_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic_item: typeof args.infographic_item === 'object'
        ? args.infographic_item.id
        : args.infographic_item,
    }

    return update.definition.url
            .replace('{infographic_item}', parsedArgs.infographic_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
* @see app/Http/Controllers/Admin/InfographicItemController.php:66
* @route '/admin/infographic-items/{infographic_item}'
*/
update.put = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
* @see app/Http/Controllers/Admin/InfographicItemController.php:66
* @route '/admin/infographic-items/{infographic_item}'
*/
const updateForm = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::update
* @see app/Http/Controllers/Admin/InfographicItemController.php:66
* @route '/admin/infographic-items/{infographic_item}'
*/
updateForm.put = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
* @see app/Http/Controllers/Admin/InfographicItemController.php:87
* @route '/admin/infographic-items/{infographic_item}'
*/
export const destroy = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/infographic-items/{infographic_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
* @see app/Http/Controllers/Admin/InfographicItemController.php:87
* @route '/admin/infographic-items/{infographic_item}'
*/
destroy.url = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { infographic_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            infographic_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic_item: typeof args.infographic_item === 'object'
        ? args.infographic_item.id
        : args.infographic_item,
    }

    return destroy.definition.url
            .replace('{infographic_item}', parsedArgs.infographic_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
* @see app/Http/Controllers/Admin/InfographicItemController.php:87
* @route '/admin/infographic-items/{infographic_item}'
*/
destroy.delete = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
* @see app/Http/Controllers/Admin/InfographicItemController.php:87
* @route '/admin/infographic-items/{infographic_item}'
*/
const destroyForm = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\InfographicItemController::destroy
* @see app/Http/Controllers/Admin/InfographicItemController.php:87
* @route '/admin/infographic-items/{infographic_item}'
*/
destroyForm.delete = (args: { infographic_item: number | { id: number } } | [infographic_item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const infographic_items = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default infographic_items