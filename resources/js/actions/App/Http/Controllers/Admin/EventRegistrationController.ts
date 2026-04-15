import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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

    /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::store
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:16
 * @route '/admin/events/{event}/registrations'
 */
    const storeForm = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::store
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:16
 * @route '/admin/events/{event}/registrations'
 */
        storeForm.post = (args: { event: string | number | { id: string | number } } | [event: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
export const edit = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/event-registrations/{event_registration}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
edit.url = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event_registration: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event_registration: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event_registration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event_registration: typeof args.event_registration === 'object'
                ? args.event_registration.id
                : args.event_registration,
                }

    return edit.definition.url
            .replace('{event_registration}', parsedArgs.event_registration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
edit.get = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
edit.head = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
    const editForm = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
        editForm.get = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::edit
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:23
 * @route '/admin/event-registrations/{event_registration}/edit'
 */
        editForm.head = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EventRegistrationController::update
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:46
 * @route '/admin/event-registrations/{event_registration}'
 */
export const update = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/event-registrations/{event_registration}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::update
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:46
 * @route '/admin/event-registrations/{event_registration}'
 */
update.url = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event_registration: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event_registration: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event_registration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event_registration: typeof args.event_registration === 'object'
                ? args.event_registration.id
                : args.event_registration,
                }

    return update.definition.url
            .replace('{event_registration}', parsedArgs.event_registration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::update
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:46
 * @route '/admin/event-registrations/{event_registration}'
 */
update.put = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::update
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:46
 * @route '/admin/event-registrations/{event_registration}'
 */
    const updateForm = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::update
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:46
 * @route '/admin/event-registrations/{event_registration}'
 */
        updateForm.put = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\EventRegistrationController::destroy
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:54
 * @route '/admin/event-registrations/{event_registration}'
 */
export const destroy = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/event-registrations/{event_registration}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::destroy
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:54
 * @route '/admin/event-registrations/{event_registration}'
 */
destroy.url = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event_registration: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event_registration: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event_registration: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event_registration: typeof args.event_registration === 'object'
                ? args.event_registration.id
                : args.event_registration,
                }

    return destroy.definition.url
            .replace('{event_registration}', parsedArgs.event_registration.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EventRegistrationController::destroy
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:54
 * @route '/admin/event-registrations/{event_registration}'
 */
destroy.delete = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::destroy
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:54
 * @route '/admin/event-registrations/{event_registration}'
 */
    const destroyForm = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\EventRegistrationController::destroy
 * @see app/Http/Controllers/Admin/EventRegistrationController.php:54
 * @route '/admin/event-registrations/{event_registration}'
 */
        destroyForm.delete = (args: { event_registration: string | number | { id: string | number } } | [event_registration: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const EventRegistrationController = { store, edit, update, destroy }

export default EventRegistrationController