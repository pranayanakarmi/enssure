import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/vacancy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::index
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
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
* @see \App\Http\Controllers\VacancyPageController::show
* @see app/Http/Controllers/VacancyPageController.php:39
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
* @see app/Http/Controllers/VacancyPageController.php:39
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
* @see app/Http/Controllers/VacancyPageController.php:39
* @route '/vacancy/{vacancy}'
*/
show.get = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::show
* @see app/Http/Controllers/VacancyPageController.php:39
* @route '/vacancy/{vacancy}'
*/
show.head = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VacancyPageController::show
* @see app/Http/Controllers/VacancyPageController.php:39
* @route '/vacancy/{vacancy}'
*/
const showForm = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::show
* @see app/Http/Controllers/VacancyPageController.php:39
* @route '/vacancy/{vacancy}'
*/
showForm.get = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::show
* @see app/Http/Controllers/VacancyPageController.php:39
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

const VacancyPageController = { index, show }

export default VacancyPageController