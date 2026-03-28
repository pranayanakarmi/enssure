import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:423
* @route '/gallery/{gallery}'
*/
export const show = (args: { gallery: string | number | { slug: string | number } } | [gallery: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/gallery/{gallery}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:423
* @route '/gallery/{gallery}'
*/
show.url = (args: { gallery: string | number | { slug: string | number } } | [gallery: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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
* @see routes/web.php:423
* @route '/gallery/{gallery}'
*/
show.get = (args: { gallery: string | number | { slug: string | number } } | [gallery: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:423
* @route '/gallery/{gallery}'
*/
show.head = (args: { gallery: string | number | { slug: string | number } } | [gallery: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const gallery = {
    show: Object.assign(show, show),
}

export default gallery