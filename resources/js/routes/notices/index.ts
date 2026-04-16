import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:319
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
 * @see routes/web.php:319
 * @route '/notices'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:319
 * @route '/notices'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:319
 * @route '/notices'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:319
 * @route '/notices'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:319
 * @route '/notices'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:319
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
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
export const show = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/notices/{notice}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
show.url = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notice: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { notice: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    notice: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        notice: typeof args.notice === 'object'
                ? args.notice.slug
                : args.notice,
                }

    return show.definition.url
            .replace('{notice}', parsedArgs.notice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
show.get = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
show.head = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
    const showForm = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
        showForm.get = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:340
 * @route '/notices/{notice}'
 */
        showForm.head = (args: { notice: string | { slug: string } } | [notice: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const notices = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default notices