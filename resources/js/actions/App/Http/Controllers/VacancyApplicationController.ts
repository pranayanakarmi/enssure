import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VacancyApplicationController::store
* @see app/Http/Controllers/VacancyApplicationController.php:12
* @route '/vacancy/{vacancy}/apply'
*/
export const store = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vacancy/{vacancy}/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VacancyApplicationController::store
* @see app/Http/Controllers/VacancyApplicationController.php:12
* @route '/vacancy/{vacancy}/apply'
*/
store.url = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{vacancy}', parsedArgs.vacancy.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacancyApplicationController::store
* @see app/Http/Controllers/VacancyApplicationController.php:12
* @route '/vacancy/{vacancy}/apply'
*/
store.post = (args: { vacancy: string | number | { slug: string | number } } | [vacancy: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const VacancyApplicationController = { store }

export default VacancyApplicationController