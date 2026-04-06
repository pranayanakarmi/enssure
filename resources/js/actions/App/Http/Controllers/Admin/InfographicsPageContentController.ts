import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InfographicsPageContentController::update
 * @see app/Http/Controllers/Admin/InfographicsPageContentController.php:36
 * @route '/admin/infographics-page/content'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/infographics-page/content',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\InfographicsPageContentController::update
 * @see app/Http/Controllers/Admin/InfographicsPageContentController.php:36
 * @route '/admin/infographics-page/content'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InfographicsPageContentController::update
 * @see app/Http/Controllers/Admin/InfographicsPageContentController.php:36
 * @route '/admin/infographics-page/content'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\InfographicsPageContentController::update
 * @see app/Http/Controllers/Admin/InfographicsPageContentController.php:36
 * @route '/admin/infographics-page/content'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InfographicsPageContentController::update
 * @see app/Http/Controllers/Admin/InfographicsPageContentController.php:36
 * @route '/admin/infographics-page/content'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const InfographicsPageContentController = { update }

export default InfographicsPageContentController