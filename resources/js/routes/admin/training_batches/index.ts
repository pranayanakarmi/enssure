import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/training_batches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::index
* @see app/Http/Controllers/Admin/TrainingBatchController.php:15
* @route '/admin/training_batches'
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
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/training_batches/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::create
* @see app/Http/Controllers/Admin/TrainingBatchController.php:40
* @route '/admin/training_batches/create'
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
* @see \App\Http\Controllers\Admin\TrainingBatchController::store
* @see app/Http/Controllers/Admin/TrainingBatchController.php:47
* @route '/admin/training_batches'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/training_batches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::store
* @see app/Http/Controllers/Admin/TrainingBatchController.php:47
* @route '/admin/training_batches'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::store
* @see app/Http/Controllers/Admin/TrainingBatchController.php:47
* @route '/admin/training_batches'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::store
* @see app/Http/Controllers/Admin/TrainingBatchController.php:47
* @route '/admin/training_batches'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::store
* @see app/Http/Controllers/Admin/TrainingBatchController.php:47
* @route '/admin/training_batches'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
export const edit = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/training_batches/{training_batch}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
edit.url = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training_batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training_batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training_batch: typeof args.training_batch === 'object'
        ? args.training_batch.id
        : args.training_batch,
    }

    return edit.definition.url
            .replace('{training_batch}', parsedArgs.training_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
edit.get = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
edit.head = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
const editForm = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
editForm.get = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::edit
* @see app/Http/Controllers/Admin/TrainingBatchController.php:55
* @route '/admin/training_batches/{training_batch}/edit'
*/
editForm.head = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
export const update = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/training_batches/{training_batch}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
update.url = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training_batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training_batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training_batch: typeof args.training_batch === 'object'
        ? args.training_batch.id
        : args.training_batch,
    }

    return update.definition.url
            .replace('{training_batch}', parsedArgs.training_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
update.put = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
update.patch = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
const updateForm = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
updateForm.put = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::update
* @see app/Http/Controllers/Admin/TrainingBatchController.php:78
* @route '/admin/training_batches/{training_batch}'
*/
updateForm.patch = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TrainingBatchController::destroy
* @see app/Http/Controllers/Admin/TrainingBatchController.php:86
* @route '/admin/training_batches/{training_batch}'
*/
export const destroy = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/training_batches/{training_batch}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::destroy
* @see app/Http/Controllers/Admin/TrainingBatchController.php:86
* @route '/admin/training_batches/{training_batch}'
*/
destroy.url = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training_batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training_batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training_batch: typeof args.training_batch === 'object'
        ? args.training_batch.id
        : args.training_batch,
    }

    return destroy.definition.url
            .replace('{training_batch}', parsedArgs.training_batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::destroy
* @see app/Http/Controllers/Admin/TrainingBatchController.php:86
* @route '/admin/training_batches/{training_batch}'
*/
destroy.delete = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::destroy
* @see app/Http/Controllers/Admin/TrainingBatchController.php:86
* @route '/admin/training_batches/{training_batch}'
*/
const destroyForm = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrainingBatchController::destroy
* @see app/Http/Controllers/Admin/TrainingBatchController.php:86
* @route '/admin/training_batches/{training_batch}'
*/
destroyForm.delete = (args: { training_batch: string | number | { id: string | number } } | [training_batch: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const training_batches = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default training_batches