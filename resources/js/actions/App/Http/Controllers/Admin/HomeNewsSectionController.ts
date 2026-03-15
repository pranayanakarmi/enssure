import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/home-news-section/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::edit
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:16
* @route '/admin/home-news-section/edit'
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
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::update
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:56
* @route '/admin/home-news-section'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/home-news-section',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::update
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:56
* @route '/admin/home-news-section'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::update
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:56
* @route '/admin/home-news-section'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::update
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:56
* @route '/admin/home-news-section'
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
* @see \App\Http\Controllers\Admin\HomeNewsSectionController::update
* @see app/Http/Controllers/Admin/HomeNewsSectionController.php:56
* @route '/admin/home-news-section'
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

const HomeNewsSectionController = { edit, update }

export default HomeNewsSectionController