import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/footer-settings/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::edit
* @see app/Http/Controllers/Admin/FooterSettingController.php:14
* @route '/admin/footer-settings/edit'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::update
* @see app/Http/Controllers/Admin/FooterSettingController.php:37
* @route '/admin/footer-settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/footer-settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::update
* @see app/Http/Controllers/Admin/FooterSettingController.php:37
* @route '/admin/footer-settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::update
* @see app/Http/Controllers/Admin/FooterSettingController.php:37
* @route '/admin/footer-settings'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FooterSettingController::update
* @see app/Http/Controllers/Admin/FooterSettingController.php:37
* @route '/admin/footer-settings'
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
* @see \App\Http\Controllers\Admin\FooterSettingController::update
* @see app/Http/Controllers/Admin/FooterSettingController.php:37
* @route '/admin/footer-settings'
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

const FooterSettingController = { edit, update }

export default FooterSettingController