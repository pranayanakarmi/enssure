import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see routes/web.php:270
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
* @see routes/web.php:270
* @route '/notices'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:270
* @route '/notices'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:270
* @route '/notices'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/web.php:287
* @route '/notices/{notice}'
*/
export const show = (args: { notice: string | number | { slug: string | number } } | [notice: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/notices/{notice}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:287
* @route '/notices/{notice}'
*/
show.url = (args: { notice: string | number | { slug: string | number } } | [notice: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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
* @see routes/web.php:287
* @route '/notices/{notice}'
*/
show.get = (args: { notice: string | number | { slug: string | number } } | [notice: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see routes/web.php:287
* @route '/notices/{notice}'
*/
show.head = (args: { notice: string | number | { slug: string | number } } | [notice: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const notices = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default notices