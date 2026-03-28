import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::index
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:17
* @route '/admin/batch_enrollments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/batch_enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::index
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:17
* @route '/admin/batch_enrollments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::index
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:17
* @route '/admin/batch_enrollments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::index
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:17
* @route '/admin/batch_enrollments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::create
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:42
* @route '/admin/batch_enrollments/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/batch_enrollments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::create
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:42
* @route '/admin/batch_enrollments/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::create
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:42
* @route '/admin/batch_enrollments/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::create
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:42
* @route '/admin/batch_enrollments/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::store
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:55
* @route '/admin/batch_enrollments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/batch_enrollments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::store
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:55
* @route '/admin/batch_enrollments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::store
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:55
* @route '/admin/batch_enrollments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::edit
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:63
* @route '/admin/batch_enrollments/{batch_enrollment}/edit'
*/
export const edit = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/batch_enrollments/{batch_enrollment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::edit
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:63
* @route '/admin/batch_enrollments/{batch_enrollment}/edit'
*/
edit.url = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch_enrollment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch_enrollment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch_enrollment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch_enrollment: typeof args.batch_enrollment === 'object'
        ? args.batch_enrollment.id
        : args.batch_enrollment,
    }

    return edit.definition.url
            .replace('{batch_enrollment}', parsedArgs.batch_enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::edit
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:63
* @route '/admin/batch_enrollments/{batch_enrollment}/edit'
*/
edit.get = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::edit
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:63
* @route '/admin/batch_enrollments/{batch_enrollment}/edit'
*/
edit.head = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::update
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:87
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
export const update = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/batch_enrollments/{batch_enrollment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::update
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:87
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
update.url = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch_enrollment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch_enrollment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch_enrollment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch_enrollment: typeof args.batch_enrollment === 'object'
        ? args.batch_enrollment.id
        : args.batch_enrollment,
    }

    return update.definition.url
            .replace('{batch_enrollment}', parsedArgs.batch_enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::update
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:87
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
update.put = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::update
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:87
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
update.patch = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::destroy
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:95
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
export const destroy = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/batch_enrollments/{batch_enrollment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::destroy
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:95
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
destroy.url = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch_enrollment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch_enrollment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch_enrollment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch_enrollment: typeof args.batch_enrollment === 'object'
        ? args.batch_enrollment.id
        : args.batch_enrollment,
    }

    return destroy.definition.url
            .replace('{batch_enrollment}', parsedArgs.batch_enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BatchEnrollmentController::destroy
* @see app/Http/Controllers/Admin/BatchEnrollmentController.php:95
* @route '/admin/batch_enrollments/{batch_enrollment}'
*/
destroy.delete = (args: { batch_enrollment: string | number | { id: string | number } } | [batch_enrollment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const BatchEnrollmentController = { index, create, store, edit, update, destroy }

export default BatchEnrollmentController