import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:190
* @route '/notices'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/notices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:190
* @route '/notices'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:190
* @route '/notices'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:190
* @route '/notices'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:190
* @route '/notices'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:190
* @route '/notices'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:190
* @route '/notices'
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
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
export const single = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: single.url(options),
    method: 'get',
})

single.definition = {
    methods: ["get","head"],
    url: '/notices/single-archive',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
single.url = (options?: RouteQueryOptions) => {
    return single.definition.url + queryParams(options)
}

/**
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
single.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: single.url(options),
    method: 'get',
})

/**
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
single.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: single.url(options),
    method: 'head',
})

/**
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
const singleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: single.url(options),
    method: 'get',
})

/**
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
singleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: single.url(options),
    method: 'get',
})

/**
* @see routes/web.php:191
* @route '/notices/single-archive'
*/
singleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: single.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

single.form = singleForm

const notices = {
    index: Object.assign(index, index),
    single: Object.assign(single, single),
}

export default notices