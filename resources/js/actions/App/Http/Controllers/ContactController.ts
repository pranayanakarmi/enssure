import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::show
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:37
* @route '/contact/feedback'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/contact/feedback',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:37
* @route '/contact/feedback'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:37
* @route '/contact/feedback'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:37
* @route '/contact/feedback'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ContactController::store
* @see app/Http/Controllers/ContactController.php:37
* @route '/contact/feedback'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const ContactController = { show, store }

export default ContactController