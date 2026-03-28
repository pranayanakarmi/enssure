import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::edit
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:15
* @route '/admin/impact-and-milestones/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/impact-and-milestones/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::edit
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:15
* @route '/admin/impact-and-milestones/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::edit
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:15
* @route '/admin/impact-and-milestones/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::edit
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:15
* @route '/admin/impact-and-milestones/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::update
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:49
* @route '/admin/impact-and-milestones'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/impact-and-milestones',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::update
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:49
* @route '/admin/impact-and-milestones'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeReachSectionController::update
* @see app/Http/Controllers/Admin/HomeReachSectionController.php:49
* @route '/admin/impact-and-milestones'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const HomeReachSectionController = { edit, update }

export default HomeReachSectionController