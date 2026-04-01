import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/footer-columns',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::index
* @see app/Http/Controllers/Admin/FooterColumnController.php:15
* @route '/admin/footer-columns'
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
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/footer-columns/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::create
* @see app/Http/Controllers/Admin/FooterColumnController.php:36
* @route '/admin/footer-columns/create'
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
* @see \App\Http\Controllers\Admin\FooterColumnController::store
* @see app/Http/Controllers/Admin/FooterColumnController.php:43
* @route '/admin/footer-columns'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/footer-columns',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::store
* @see app/Http/Controllers/Admin/FooterColumnController.php:43
* @route '/admin/footer-columns'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::store
* @see app/Http/Controllers/Admin/FooterColumnController.php:43
* @route '/admin/footer-columns'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::store
* @see app/Http/Controllers/Admin/FooterColumnController.php:43
* @route '/admin/footer-columns'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::store
* @see app/Http/Controllers/Admin/FooterColumnController.php:43
* @route '/admin/footer-columns'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
export const edit = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/footer-columns/{footer_column}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
edit.url = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_column: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_column: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_column: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_column: typeof args.footer_column === 'object'
        ? args.footer_column.id
        : args.footer_column,
    }

    return edit.definition.url
            .replace('{footer_column}', parsedArgs.footer_column.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
edit.get = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
edit.head = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
const editForm = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
editForm.get = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::edit
* @see app/Http/Controllers/Admin/FooterColumnController.php:60
* @route '/admin/footer-columns/{footer_column}/edit'
*/
editForm.head = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
export const update = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/footer-columns/{footer_column}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
update.url = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_column: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_column: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_column: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_column: typeof args.footer_column === 'object'
        ? args.footer_column.id
        : args.footer_column,
    }

    return update.definition.url
            .replace('{footer_column}', parsedArgs.footer_column.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
update.put = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
update.patch = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
const updateForm = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
updateForm.put = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::update
* @see app/Http/Controllers/Admin/FooterColumnController.php:81
* @route '/admin/footer-columns/{footer_column}'
*/
updateForm.patch = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FooterColumnController::destroy
* @see app/Http/Controllers/Admin/FooterColumnController.php:88
* @route '/admin/footer-columns/{footer_column}'
*/
export const destroy = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/footer-columns/{footer_column}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::destroy
* @see app/Http/Controllers/Admin/FooterColumnController.php:88
* @route '/admin/footer-columns/{footer_column}'
*/
destroy.url = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_column: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_column: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_column: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_column: typeof args.footer_column === 'object'
        ? args.footer_column.id
        : args.footer_column,
    }

    return destroy.definition.url
            .replace('{footer_column}', parsedArgs.footer_column.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::destroy
* @see app/Http/Controllers/Admin/FooterColumnController.php:88
* @route '/admin/footer-columns/{footer_column}'
*/
destroy.delete = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::destroy
* @see app/Http/Controllers/Admin/FooterColumnController.php:88
* @route '/admin/footer-columns/{footer_column}'
*/
const destroyForm = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterColumnController::destroy
* @see app/Http/Controllers/Admin/FooterColumnController.php:88
* @route '/admin/footer-columns/{footer_column}'
*/
destroyForm.delete = (args: { footer_column: number | { id: number } } | [footer_column: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const FooterColumnController = { index, create, store, edit, update, destroy }

export default FooterColumnController

destroy.form = destroyForm

const FooterColumnController = { index, create, store, edit, update, destroy }

export default FooterColumnController