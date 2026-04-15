import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/eoi-rfp',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:687
 * @route '/eoi-rfp'
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
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
export const show = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/eoi-rfp/{eoi_rfp}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
show.url = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eoi_rfp: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { eoi_rfp: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    eoi_rfp: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        eoi_rfp: typeof args.eoi_rfp === 'object'
                ? args.eoi_rfp.slug
                : args.eoi_rfp,
                }

    return show.definition.url
            .replace('{eoi_rfp}', parsedArgs.eoi_rfp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
show.get = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
show.head = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
    const showForm = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
        showForm.get = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:701
 * @route '/eoi-rfp/{eoi_rfp}'
 */
        showForm.head = (args: { eoi_rfp: string | number | { slug: string | number } } | [eoi_rfp: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const eoiRfp = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default eoiRfp