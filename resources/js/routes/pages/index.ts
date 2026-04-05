import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
export const show = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/pages/{published_page}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
show.url = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { published_page: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { published_page: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    published_page: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        published_page: typeof args.published_page === 'object'
                ? args.published_page.slug
                : args.published_page,
                }

    return show.definition.url
            .replace('{published_page}', parsedArgs.published_page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
show.get = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
show.head = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
    const showForm = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
        showForm.get = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:410
 * @route '/pages/{published_page}'
 */
        showForm.head = (args: { published_page: string | { slug: string } } | [published_page: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const pages = {
    show: Object.assign(show, show),
}

export default pages