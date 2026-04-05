import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
export const show = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/impact-stories/{impact_story}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
show.url = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { impact_story: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { impact_story: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    impact_story: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        impact_story: typeof args.impact_story === 'object'
                ? args.impact_story.slug
                : args.impact_story,
                }

    return show.definition.url
            .replace('{impact_story}', parsedArgs.impact_story.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
show.get = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
show.head = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
    const showForm = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
        showForm.get = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:459
 * @route '/impact-stories/{impact_story}'
 */
        showForm.head = (args: { impact_story: string | { slug: string } } | [impact_story: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const impactStories = {
    show: Object.assign(show, show),
}

export default impactStories