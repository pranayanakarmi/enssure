import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php
 * @route '/programs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/programs',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php
 * @route '/programs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/web.php
 * @route '/programs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/web.php
 * @route '/programs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php
 * @route '/programs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php
 * @route '/programs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php
 * @route '/programs'
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
 * @see routes/web.php
 * @route '/programs/{training_program}'
 */
export const show = (args: { training_program: string | { slug: string } } | [training_program: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/programs/{training_program}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php
 * @route '/programs/{training_program}'
 */
show.url = (args: { training_program: string | { slug: string } } | [training_program: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { training_program: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    training_program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        training_program: typeof args.training_program === 'object'
                ? args.training_program.slug
                : args.training_program,
                }

    return show.definition.url
            .replace('{training_program}', parsedArgs.training_program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php
 * @route '/programs/{training_program}'
 */
show.get = (args: { training_program: string | { slug: string } } | [training_program: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

const programs = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default programs
