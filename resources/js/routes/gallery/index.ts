import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
export const show = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/gallery/{gallery}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
show.url = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { gallery: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { gallery: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            gallery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        gallery: typeof args.gallery === 'object'
        ? args.gallery.slug
        : args.gallery,
    }

    return show.definition.url
            .replace('{gallery}', parsedArgs.gallery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
show.get = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
show.head = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
const showForm = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
showForm.get = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:405
* @route '/gallery/{gallery}'
*/
showForm.head = (args: { gallery: string | { slug: string } } | [gallery: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const gallery = {
    show: Object.assign(show, show),
}

export default gallery