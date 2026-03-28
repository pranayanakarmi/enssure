import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:516
* @route '/infographics/{infographic}'
*/
export const show = (args: { infographic: string | number | { slug: string | number } } | [infographic: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/infographics/{infographic}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:516
* @route '/infographics/{infographic}'
*/
show.url = (args: { infographic: string | number | { slug: string | number } } | [infographic: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { infographic: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { infographic: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            infographic: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        infographic: typeof args.infographic === 'object'
        ? args.infographic.slug
        : args.infographic,
    }

    return show.definition.url
            .replace('{infographic}', parsedArgs.infographic.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see routes/web.php:516
* @route '/infographics/{infographic}'
*/
show.get = (args: { infographic: string | number | { slug: string | number } } | [infographic: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:516
* @route '/infographics/{infographic}'
*/
show.head = (args: { infographic: string | number | { slug: string | number } } | [infographic: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const infographics = {
    show: Object.assign(show, show),
}

export default infographics