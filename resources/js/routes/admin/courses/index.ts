import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CourseController::index
* @see app/Http/Controllers/Admin/CourseController.php:16
* @route '/admin/courses'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CourseController::index
* @see app/Http/Controllers/Admin/CourseController.php:16
* @route '/admin/courses'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CourseController::index
* @see app/Http/Controllers/Admin/CourseController.php:16
* @route '/admin/courses'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::index
* @see app/Http/Controllers/Admin/CourseController.php:16
* @route '/admin/courses'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::create
* @see app/Http/Controllers/Admin/CourseController.php:39
* @route '/admin/courses/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/courses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CourseController::create
* @see app/Http/Controllers/Admin/CourseController.php:39
* @route '/admin/courses/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CourseController::create
* @see app/Http/Controllers/Admin/CourseController.php:39
* @route '/admin/courses/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::create
* @see app/Http/Controllers/Admin/CourseController.php:39
* @route '/admin/courses/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::store
* @see app/Http/Controllers/Admin/CourseController.php:50
* @route '/admin/courses'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/courses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CourseController::store
* @see app/Http/Controllers/Admin/CourseController.php:50
* @route '/admin/courses'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CourseController::store
* @see app/Http/Controllers/Admin/CourseController.php:50
* @route '/admin/courses'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::edit
* @see app/Http/Controllers/Admin/CourseController.php:58
* @route '/admin/courses/{course}/edit'
*/
export const edit = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/courses/{course}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CourseController::edit
* @see app/Http/Controllers/Admin/CourseController.php:58
* @route '/admin/courses/{course}/edit'
*/
edit.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { course: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            course: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        course: typeof args.course === 'object'
        ? args.course.id
        : args.course,
    }

    return edit.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CourseController::edit
* @see app/Http/Controllers/Admin/CourseController.php:58
* @route '/admin/courses/{course}/edit'
*/
edit.get = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::edit
* @see app/Http/Controllers/Admin/CourseController.php:58
* @route '/admin/courses/{course}/edit'
*/
edit.head = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::update
* @see app/Http/Controllers/Admin/CourseController.php:81
* @route '/admin/courses/{course}'
*/
export const update = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/courses/{course}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CourseController::update
* @see app/Http/Controllers/Admin/CourseController.php:81
* @route '/admin/courses/{course}'
*/
update.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { course: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            course: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        course: typeof args.course === 'object'
        ? args.course.id
        : args.course,
    }

    return update.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CourseController::update
* @see app/Http/Controllers/Admin/CourseController.php:81
* @route '/admin/courses/{course}'
*/
update.put = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::update
* @see app/Http/Controllers/Admin/CourseController.php:81
* @route '/admin/courses/{course}'
*/
update.patch = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CourseController::destroy
* @see app/Http/Controllers/Admin/CourseController.php:89
* @route '/admin/courses/{course}'
*/
export const destroy = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/courses/{course}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CourseController::destroy
* @see app/Http/Controllers/Admin/CourseController.php:89
* @route '/admin/courses/{course}'
*/
destroy.url = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { course: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            course: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        course: typeof args.course === 'object'
        ? args.course.id
        : args.course,
    }

    return destroy.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CourseController::destroy
* @see app/Http/Controllers/Admin/CourseController.php:89
* @route '/admin/courses/{course}'
*/
destroy.delete = (args: { course: string | number | { id: string | number } } | [course: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const courses = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default courses