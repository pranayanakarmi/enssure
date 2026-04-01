import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VacancyApplicationController::store
* @see app/Http/Controllers/VacancyApplicationController.php:12
* @route '/vacancy/{vacancy}/apply'
*/
export const store = (args: { vacancy: string | { slug: string } } | [vacancy: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
store.url = (args: { vacancy: string | { slug: string } } | [vacancy: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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
store.post = (args: { vacancy: string | { slug: string } } | [vacancy: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacancyApplicationController::store
* @see app/Http/Controllers/VacancyApplicationController.php:12
* @route '/vacancy/{vacancy}/apply'
*/
const storeForm = (args: { vacancy: string | { slug: string } } | [vacancy: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacancyApplicationController::store
* @see app/Http/Controllers/VacancyApplicationController.php:12
* @route '/vacancy/{vacancy}/apply'
*/
storeForm.post = (args: { vacancy: string | { slug: string } } | [vacancy: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const VacancyApplicationController = { store }

export default VacancyApplicationController