import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:366
 * @route '/posts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/posts',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:366
 * @route '/posts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:366
 * @route '/posts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:366
 * @route '/posts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:366
 * @route '/posts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:366
 * @route '/posts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:366
 * @route '/posts'
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
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
export const show = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/posts/{published_post}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
show.url = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { published_post: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { published_post: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    published_post: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        published_post: typeof args.published_post === 'object'
                ? args.published_post.slug
                : args.published_post,
                }

    return show.definition.url
            .replace('{published_post}', parsedArgs.published_post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
show.get = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
show.head = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
    const showForm = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
        showForm.get = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:389
 * @route '/posts/{published_post}'
 */
        showForm.head = (args: { published_post: string | { slug: string } } | [published_post: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const posts = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default posts