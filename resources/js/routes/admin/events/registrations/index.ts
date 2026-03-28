import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::store
* @see app/Http/Controllers/Admin/EventRegistrationController.php:16
* @route '/admin/events/{event}/registrations'
*/
export const store = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/events/{event}/registrations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::store
* @see app/Http/Controllers/Admin/EventRegistrationController.php:16
* @route '/admin/events/{event}/registrations'
*/
store.url = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { event: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            event: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        event: typeof args.event === 'object'
        ? args.event.id
        : args.event,
    }

    return store.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::store
* @see app/Http/Controllers/Admin/EventRegistrationController.php:16
* @route '/admin/events/{event}/registrations'
*/
store.post = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const registrations = {
    store: Object.assign(store, store),
}

export default registrations