import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
* @see app/Http/Controllers/Admin/TestimonialController.php:17
* @route '/admin/testimonials'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
* @see app/Http/Controllers/Admin/TestimonialController.php:17
* @route '/admin/testimonials'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
* @see app/Http/Controllers/Admin/TestimonialController.php:17
* @route '/admin/testimonials'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::index
* @see app/Http/Controllers/Admin/TestimonialController.php:17
* @route '/admin/testimonials'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
* @see app/Http/Controllers/Admin/TestimonialController.php:42
* @route '/admin/testimonials/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
* @see app/Http/Controllers/Admin/TestimonialController.php:42
* @route '/admin/testimonials/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
* @see app/Http/Controllers/Admin/TestimonialController.php:42
* @route '/admin/testimonials/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::create
* @see app/Http/Controllers/Admin/TestimonialController.php:42
* @route '/admin/testimonials/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::store
* @see app/Http/Controllers/Admin/TestimonialController.php:51
* @route '/admin/testimonials'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/testimonials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::store
* @see app/Http/Controllers/Admin/TestimonialController.php:51
* @route '/admin/testimonials'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::store
* @see app/Http/Controllers/Admin/TestimonialController.php:51
* @route '/admin/testimonials'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::show
* @see app/Http/Controllers/Admin/TestimonialController.php:0
* @route '/admin/testimonials/{testimonial}'
*/
export const show = (args: { testimonial: string | number } | [testimonial: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials/{testimonial}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::show
* @see app/Http/Controllers/Admin/TestimonialController.php:0
* @route '/admin/testimonials/{testimonial}'
*/
show.url = (args: { testimonial: string | number } | [testimonial: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

    if (Array.isArray(args)) {
        args = {
            testimonial: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        testimonial: args.testimonial,
    }

    return show.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::show
* @see app/Http/Controllers/Admin/TestimonialController.php:0
* @route '/admin/testimonials/{testimonial}'
*/
show.get = (args: { testimonial: string | number } | [testimonial: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::show
* @see app/Http/Controllers/Admin/TestimonialController.php:0
* @route '/admin/testimonials/{testimonial}'
*/
show.head = (args: { testimonial: string | number } | [testimonial: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
* @see app/Http/Controllers/Admin/TestimonialController.php:59
* @route '/admin/testimonials/{testimonial}/edit'
*/
export const edit = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/testimonials/{testimonial}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
* @see app/Http/Controllers/Admin/TestimonialController.php:59
* @route '/admin/testimonials/{testimonial}/edit'
*/
edit.url = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { testimonial: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            testimonial: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        testimonial: typeof args.testimonial === 'object'
        ? args.testimonial.id
        : args.testimonial,
    }

    return edit.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
* @see app/Http/Controllers/Admin/TestimonialController.php:59
* @route '/admin/testimonials/{testimonial}/edit'
*/
edit.get = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::edit
* @see app/Http/Controllers/Admin/TestimonialController.php:59
* @route '/admin/testimonials/{testimonial}/edit'
*/
edit.head = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::update
* @see app/Http/Controllers/Admin/TestimonialController.php:81
* @route '/admin/testimonials/{testimonial}'
*/
export const update = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/testimonials/{testimonial}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::update
* @see app/Http/Controllers/Admin/TestimonialController.php:81
* @route '/admin/testimonials/{testimonial}'
*/
update.url = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { testimonial: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            testimonial: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        testimonial: typeof args.testimonial === 'object'
        ? args.testimonial.id
        : args.testimonial,
    }

    return update.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::update
* @see app/Http/Controllers/Admin/TestimonialController.php:81
* @route '/admin/testimonials/{testimonial}'
*/
update.put = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::update
* @see app/Http/Controllers/Admin/TestimonialController.php:81
* @route '/admin/testimonials/{testimonial}'
*/
update.patch = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
* @see app/Http/Controllers/Admin/TestimonialController.php:89
* @route '/admin/testimonials/{testimonial}'
*/
export const destroy = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/testimonials/{testimonial}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
* @see app/Http/Controllers/Admin/TestimonialController.php:89
* @route '/admin/testimonials/{testimonial}'
*/
destroy.url = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { testimonial: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { testimonial: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            testimonial: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        testimonial: typeof args.testimonial === 'object'
        ? args.testimonial.id
        : args.testimonial,
    }

    return destroy.definition.url
            .replace('{testimonial}', parsedArgs.testimonial.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TestimonialController::destroy
* @see app/Http/Controllers/Admin/TestimonialController.php:89
* @route '/admin/testimonials/{testimonial}'
*/
destroy.delete = (args: { testimonial: string | number | { id: string | number } } | [testimonial: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const testimonials = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default testimonials