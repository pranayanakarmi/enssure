import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::reorder
 * @see app/Http/Controllers/Admin/HomeReachItemController.php:87
 * @route '/admin/impact-and-milestones-items/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/admin/impact-and-milestones-items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::reorder
 * @see app/Http/Controllers/Admin/HomeReachItemController.php:87
 * @route '/admin/impact-and-milestones-items/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachItemController::reorder
 * @see app/Http/Controllers/Admin/HomeReachItemController.php:87
 * @route '/admin/impact-and-milestones-items/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\HomeReachItemController::reorder
 * @see app/Http/Controllers/Admin/HomeReachItemController.php:87
 * @route '/admin/impact-and-milestones-items/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\HomeReachItemController::reorder
 * @see app/Http/Controllers/Admin/HomeReachItemController.php:87
 * @route '/admin/impact-and-milestones-items/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const impactAndMilestonesItems = {
    reorder: Object.assign(reorder, reorder),
}

export default impactAndMilestonesItems