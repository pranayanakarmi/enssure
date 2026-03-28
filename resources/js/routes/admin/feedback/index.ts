import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
* @see app/Http/Controllers/Admin/FeedbackController.php:13
* @route '/admin/feedback'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/feedback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
* @see app/Http/Controllers/Admin/FeedbackController.php:13
* @route '/admin/feedback'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
* @see app/Http/Controllers/Admin/FeedbackController.php:13
* @route '/admin/feedback'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FeedbackController::index
* @see app/Http/Controllers/Admin/FeedbackController.php:13
* @route '/admin/feedback'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
* @see app/Http/Controllers/Admin/FeedbackController.php:33
* @route '/admin/feedback/{feedback}'
*/
export const show = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/feedback/{feedback}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
* @see app/Http/Controllers/Admin/FeedbackController.php:33
* @route '/admin/feedback/{feedback}'
*/
show.url = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { feedback: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { feedback: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            feedback: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        feedback: typeof args.feedback === 'object'
        ? args.feedback.id
        : args.feedback,
    }

    return show.definition.url
            .replace('{feedback}', parsedArgs.feedback.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
* @see app/Http/Controllers/Admin/FeedbackController.php:33
* @route '/admin/feedback/{feedback}'
*/
show.get = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FeedbackController::show
* @see app/Http/Controllers/Admin/FeedbackController.php:33
* @route '/admin/feedback/{feedback}'
*/
show.head = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FeedbackController::destroy
* @see app/Http/Controllers/Admin/FeedbackController.php:51
* @route '/admin/feedback/{feedback}'
*/
export const destroy = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/feedback/{feedback}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FeedbackController::destroy
* @see app/Http/Controllers/Admin/FeedbackController.php:51
* @route '/admin/feedback/{feedback}'
*/
destroy.url = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { feedback: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { feedback: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            feedback: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        feedback: typeof args.feedback === 'object'
        ? args.feedback.id
        : args.feedback,
    }

    return destroy.definition.url
            .replace('{feedback}', parsedArgs.feedback.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FeedbackController::destroy
* @see app/Http/Controllers/Admin/FeedbackController.php:51
* @route '/admin/feedback/{feedback}'
*/
destroy.delete = (args: { feedback: string | number | { id: string | number } } | [feedback: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const feedback = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    destroy: Object.assign(destroy, destroy),
}

export default feedback