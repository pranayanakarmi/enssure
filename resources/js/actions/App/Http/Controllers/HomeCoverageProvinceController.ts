import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
export const all = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

all.definition = {
    methods: ["get","head"],
    url: '/coverage/provinces/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
all.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
all.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: all.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
    const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: all.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
        allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeCoverageProvinceController::all
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:13
 * @route '/coverage/provinces/all'
 */
        allForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    all.form = allForm
/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
export const show = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/coverage/provinces/{provinceId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
show.url = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provinceId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    provinceId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        provinceId: args.provinceId,
                }

    return show.definition.url
            .replace('{provinceId}', parsedArgs.provinceId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
show.get = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
show.head = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
    const showForm = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
        showForm.get = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeCoverageProvinceController::show
 * @see app/Http/Controllers/HomeCoverageProvinceController.php:172
 * @route '/coverage/provinces/{provinceId}'
 */
        showForm.head = (args: { provinceId: string | number } | [provinceId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const HomeCoverageProvinceController = { all, show }

export default HomeCoverageProvinceController