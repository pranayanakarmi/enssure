import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::edit
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:15
* @route '/admin/home-testimonials-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-testimonials-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::edit
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:15
* @route '/admin/home-testimonials-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::edit
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:15
* @route '/admin/home-testimonials-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::edit
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:15
* @route '/admin/home-testimonials-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::update
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:37
* @route '/admin/home-testimonials-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-testimonials-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::update
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:37
* @route '/admin/home-testimonials-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeTestimonialsSectionController::update
* @see app/Http/Controllers/Admin/HomeTestimonialsSectionController.php:37
* @route '/admin/home-testimonials-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const HomeTestimonialsSectionController = { edit, update }

export default HomeTestimonialsSectionController