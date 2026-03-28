import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::edit
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:15
* @route '/admin/about-page/hero/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/about-page/hero/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::edit
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:15
* @route '/admin/about-page/hero/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::edit
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:15
* @route '/admin/about-page/hero/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::edit
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:15
* @route '/admin/about-page/hero/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::update
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:36
* @route '/admin/about-page/hero'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/about-page/hero',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::update
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:36
* @route '/admin/about-page/hero'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AboutPageHeroController::update
* @see app/Http/Controllers/Admin/AboutPageHeroController.php:36
* @route '/admin/about-page/hero'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const about_page_hero = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
}

export default about_page_hero