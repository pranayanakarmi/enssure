import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
export const show = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/vacancy/{vacancy}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
show.url = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { vacancy: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    vacancy: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vacancy: typeof args.vacancy === 'object'
                ? args.vacancy.slug
                : args.vacancy,
                }

    return show.definition.url
            .replace('{vacancy}', parsedArgs.vacancy.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
show.get = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
show.head = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
    const showForm = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
        showForm.get = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\VacancyPageController::show
 * @see app/Http/Controllers/VacancyPageController.php:40
 * @route '/vacancy/{vacancy}'
 */
        showForm.head = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\VacancyApplicationController::apply
 * @see app/Http/Controllers/VacancyApplicationController.php:12
 * @route '/vacancy/{vacancy}/apply'
 */
export const apply = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

apply.definition = {
    methods: ["post"],
    url: '/vacancy/{vacancy}/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VacancyApplicationController::apply
 * @see app/Http/Controllers/VacancyApplicationController.php:12
 * @route '/vacancy/{vacancy}/apply'
 */
apply.url = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { vacancy: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    vacancy: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        vacancy: typeof args.vacancy === 'object'
                ? args.vacancy.slug
                : args.vacancy,
                }

    return apply.definition.url
            .replace('{vacancy}', parsedArgs.vacancy.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacancyApplicationController::apply
 * @see app/Http/Controllers/VacancyApplicationController.php:12
 * @route '/vacancy/{vacancy}/apply'
 */
apply.post = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\VacancyApplicationController::apply
 * @see app/Http/Controllers/VacancyApplicationController.php:12
 * @route '/vacancy/{vacancy}/apply'
 */
    const applyForm = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: apply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\VacancyApplicationController::apply
 * @see app/Http/Controllers/VacancyApplicationController.php:12
 * @route '/vacancy/{vacancy}/apply'
 */
        applyForm.post = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: apply.url(args, options),
            method: 'post',
        })
    
    apply.form = applyForm
const vacancy = {
    show: Object.assign(show, show),
apply: Object.assign(apply, apply),
}

export default vacancy