import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import items from './items'
/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::edit
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:15
* @route '/admin/home-coverage-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-coverage-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::edit
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:15
* @route '/admin/home-coverage-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::edit
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:15
* @route '/admin/home-coverage-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::edit
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:15
* @route '/admin/home-coverage-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::update
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:48
* @route '/admin/home-coverage-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-coverage-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::update
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:48
* @route '/admin/home-coverage-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeCoverageSectionController::update
* @see app/Http/Controllers/Admin/HomeCoverageSectionController.php:48
* @route '/admin/home-coverage-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const home_coverage_sections = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    items: Object.assign(items, items),
}

export default home_coverage_sections