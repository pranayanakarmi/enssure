import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/application_forms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::index
* @see app/Http/Controllers/Admin/ApplicationFormController.php:15
* @route '/admin/application_forms'
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
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/application_forms/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::create
* @see app/Http/Controllers/Admin/ApplicationFormController.php:37
* @route '/admin/application_forms/create'
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
* @see \App\Http\Controllers\Admin\ApplicationFormController::store
* @see app/Http/Controllers/Admin/ApplicationFormController.php:44
* @route '/admin/application_forms'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/application_forms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::store
* @see app/Http/Controllers/Admin/ApplicationFormController.php:44
* @route '/admin/application_forms'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::store
* @see app/Http/Controllers/Admin/ApplicationFormController.php:44
* @route '/admin/application_forms'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::store
* @see app/Http/Controllers/Admin/ApplicationFormController.php:44
* @route '/admin/application_forms'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::store
* @see app/Http/Controllers/Admin/ApplicationFormController.php:44
* @route '/admin/application_forms'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
export const edit = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/application_forms/{application_form}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
edit.url = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application_form: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { application_form: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            application_form: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        application_form: typeof args.application_form === 'object'
        ? args.application_form.id
        : args.application_form,
    }

    return edit.definition.url
            .replace('{application_form}', parsedArgs.application_form.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
edit.get = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
edit.head = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
const editForm = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
editForm.get = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::edit
* @see app/Http/Controllers/Admin/ApplicationFormController.php:52
* @route '/admin/application_forms/{application_form}/edit'
*/
editForm.head = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
export const update = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/application_forms/{application_form}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
update.url = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application_form: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { application_form: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            application_form: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        application_form: typeof args.application_form === 'object'
        ? args.application_form.id
        : args.application_form,
    }

    return update.definition.url
            .replace('{application_form}', parsedArgs.application_form.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
update.put = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
update.patch = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
const updateForm = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
updateForm.put = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::update
* @see app/Http/Controllers/Admin/ApplicationFormController.php:72
* @route '/admin/application_forms/{application_form}'
*/
updateForm.patch = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ApplicationFormController::destroy
* @see app/Http/Controllers/Admin/ApplicationFormController.php:80
* @route '/admin/application_forms/{application_form}'
*/
export const destroy = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/application_forms/{application_form}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::destroy
* @see app/Http/Controllers/Admin/ApplicationFormController.php:80
* @route '/admin/application_forms/{application_form}'
*/
destroy.url = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { application_form: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { application_form: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            application_form: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        application_form: typeof args.application_form === 'object'
        ? args.application_form.id
        : args.application_form,
    }

    return destroy.definition.url
            .replace('{application_form}', parsedArgs.application_form.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::destroy
* @see app/Http/Controllers/Admin/ApplicationFormController.php:80
* @route '/admin/application_forms/{application_form}'
*/
destroy.delete = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::destroy
* @see app/Http/Controllers/Admin/ApplicationFormController.php:80
* @route '/admin/application_forms/{application_form}'
*/
const destroyForm = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ApplicationFormController::destroy
* @see app/Http/Controllers/Admin/ApplicationFormController.php:80
* @route '/admin/application_forms/{application_form}'
*/
destroyForm.delete = (args: { application_form: number | { id: number } } | [application_form: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const application_forms = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default application_forms