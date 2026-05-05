import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::index
* @see app/Http/Controllers/Admin/SettingController.php:15
* @route '/admin/settings'
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
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/settings/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::create
* @see app/Http/Controllers/Admin/SettingController.php:37
* @route '/admin/settings/create'
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
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:44
* @route '/admin/settings'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:44
* @route '/admin/settings'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:44
* @route '/admin/settings'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:44
* @route '/admin/settings'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::store
* @see app/Http/Controllers/Admin/SettingController.php:44
* @route '/admin/settings'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
export const edit = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/settings/{setting}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
edit.url = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { setting: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { setting: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            setting: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        setting: typeof args.setting === 'object'
        ? args.setting.id
        : args.setting,
    }

    return edit.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
edit.get = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
edit.head = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
const editForm = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
editForm.get = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::edit
* @see app/Http/Controllers/Admin/SettingController.php:52
* @route '/admin/settings/{setting}/edit'
*/
editForm.head = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
export const update = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/settings/{setting}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
update.url = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { setting: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { setting: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            setting: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        setting: typeof args.setting === 'object'
        ? args.setting.id
        : args.setting,
    }

    return update.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
update.put = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
update.patch = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
const updateForm = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
updateForm.put = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::update
* @see app/Http/Controllers/Admin/SettingController.php:70
* @route '/admin/settings/{setting}'
*/
updateForm.patch = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:78
* @route '/admin/settings/{setting}'
*/
export const destroy = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/settings/{setting}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:78
* @route '/admin/settings/{setting}'
*/
destroy.url = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { setting: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { setting: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            setting: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        setting: typeof args.setting === 'object'
        ? args.setting.id
        : args.setting,
    }

    return destroy.definition.url
            .replace('{setting}', parsedArgs.setting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:78
* @route '/admin/settings/{setting}'
*/
destroy.delete = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:78
* @route '/admin/settings/{setting}'
*/
const destroyForm = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SettingController::destroy
* @see app/Http/Controllers/Admin/SettingController.php:78
* @route '/admin/settings/{setting}'
*/
destroyForm.delete = (args: { setting: string | number | { id: string | number } } | [setting: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const settings = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default settings