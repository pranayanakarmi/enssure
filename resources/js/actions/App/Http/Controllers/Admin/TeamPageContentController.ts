import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/team-page/content/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TeamPageContentController::edit
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:15
 * @route '/admin/team-page/content/edit'
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
* @see \App\Http\Controllers\Admin\TeamPageContentController::update
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:38
 * @route '/admin/team-page/content'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/team-page/content',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TeamPageContentController::update
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:38
 * @route '/admin/team-page/content'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamPageContentController::update
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:38
 * @route '/admin/team-page/content'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TeamPageContentController::update
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:38
 * @route '/admin/team-page/content'
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
* @see \App\Http\Controllers\Admin\TeamPageContentController::update
 * @see app/Http/Controllers/Admin/TeamPageContentController.php:38
 * @route '/admin/team-page/content'
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
const TeamPageContentController = { edit, update }

export default TeamPageContentController