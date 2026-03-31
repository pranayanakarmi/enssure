import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/vacancy-applications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::index
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:14
* @route '/admin/vacancy-applications'
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
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
export const show = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/vacancy-applications/{vacancy_application}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
show.url = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy_application: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacancy_application: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacancy_application: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacancy_application: typeof args.vacancy_application === 'object'
        ? args.vacancy_application.id
        : args.vacancy_application,
    }

    return show.definition.url
            .replace('{vacancy_application}', parsedArgs.vacancy_application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
show.get = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
show.head = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
const showForm = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
showForm.get = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::show
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:40
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
showForm.head = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\VacancyApplicationController::destroy
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:65
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
export const destroy = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/vacancy-applications/{vacancy_application}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::destroy
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:65
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
destroy.url = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy_application: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacancy_application: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacancy_application: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacancy_application: typeof args.vacancy_application === 'object'
        ? args.vacancy_application.id
        : args.vacancy_application,
    }

    return destroy.definition.url
            .replace('{vacancy_application}', parsedArgs.vacancy_application.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::destroy
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:65
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
destroy.delete = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::destroy
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:65
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
const destroyForm = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VacancyApplicationController::destroy
* @see app/Http/Controllers/Admin/VacancyApplicationController.php:65
* @route '/admin/vacancy-applications/{vacancy_application}'
*/
destroyForm.delete = (args: { vacancy_application: number | { id: number } } | [vacancy_application: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const VacancyApplicationController = { index, show, destroy }

export default VacancyApplicationController