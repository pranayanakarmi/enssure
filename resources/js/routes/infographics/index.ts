import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
export const show = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/infographics/{infographic}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
show.url = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
show.get = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
show.head = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
const showForm = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
showForm.get = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:600
* @route '/infographics/{infographic}'
*/
showForm.head = (args: { infographic: string | { slug: string } } | [infographic: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const infographics = {
    show: Object.assign(show, show),
}

export default infographics