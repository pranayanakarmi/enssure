import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/site-settings/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::edit
* @see app/Http/Controllers/Admin/SiteSettingController.php:15
* @route '/admin/site-settings/edit'
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
* @see \App\Http\Controllers\Admin\SiteSettingController::update
* @see app/Http/Controllers/Admin/SiteSettingController.php:54
* @route '/admin/site-settings'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/site-settings',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::update
* @see app/Http/Controllers/Admin/SiteSettingController.php:54
* @route '/admin/site-settings'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::update
* @see app/Http/Controllers/Admin/SiteSettingController.php:54
* @route '/admin/site-settings'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SiteSettingController::update
* @see app/Http/Controllers/Admin/SiteSettingController.php:54
* @route '/admin/site-settings'
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
* @see \App\Http\Controllers\Admin\SiteSettingController::update
* @see app/Http/Controllers/Admin/SiteSettingController.php:54
* @route '/admin/site-settings'
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

const SiteSettingController = { edit, update }

export default SiteSettingController