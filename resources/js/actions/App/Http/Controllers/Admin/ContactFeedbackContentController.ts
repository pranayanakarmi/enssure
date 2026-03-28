import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::edit
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:14
* @route '/admin/contact-feedback-content/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/contact-feedback-content/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::edit
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:14
* @route '/admin/contact-feedback-content/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::edit
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:14
* @route '/admin/contact-feedback-content/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::edit
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:14
* @route '/admin/contact-feedback-content/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::update
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:33
* @route '/admin/contact-feedback-content'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/contact-feedback-content',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::update
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:33
* @route '/admin/contact-feedback-content'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactFeedbackContentController::update
* @see app/Http/Controllers/Admin/ContactFeedbackContentController.php:33
* @route '/admin/contact-feedback-content'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

const ContactFeedbackContentController = { edit, update }

export default ContactFeedbackContentController