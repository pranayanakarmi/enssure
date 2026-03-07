import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
export const edit = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/footer-links/{footer_link}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
edit.url = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_link: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_link: typeof args.footer_link === 'object'
        ? args.footer_link.id
        : args.footer_link,
    }

    return edit.definition.url
            .replace('{footer_link}', parsedArgs.footer_link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
edit.get = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
edit.head = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
const editForm = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
editForm.get = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::edit
* @see app/Http/Controllers/Admin/FooterLinkController.php:30
* @route '/admin/footer-links/{footer_link}/edit'
*/
editForm.head = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::update
* @see app/Http/Controllers/Admin/FooterLinkController.php:50
* @route '/admin/footer-links/{footer_link}'
*/
export const update = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/footer-links/{footer_link}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::update
* @see app/Http/Controllers/Admin/FooterLinkController.php:50
* @route '/admin/footer-links/{footer_link}'
*/
update.url = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_link: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_link: typeof args.footer_link === 'object'
        ? args.footer_link.id
        : args.footer_link,
    }

    return update.definition.url
            .replace('{footer_link}', parsedArgs.footer_link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::update
* @see app/Http/Controllers/Admin/FooterLinkController.php:50
* @route '/admin/footer-links/{footer_link}'
*/
update.put = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::update
* @see app/Http/Controllers/Admin/FooterLinkController.php:50
* @route '/admin/footer-links/{footer_link}'
*/
const updateForm = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::update
* @see app/Http/Controllers/Admin/FooterLinkController.php:50
* @route '/admin/footer-links/{footer_link}'
*/
updateForm.put = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::destroy
* @see app/Http/Controllers/Admin/FooterLinkController.php:58
* @route '/admin/footer-links/{footer_link}'
*/
export const destroy = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/footer-links/{footer_link}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::destroy
* @see app/Http/Controllers/Admin/FooterLinkController.php:58
* @route '/admin/footer-links/{footer_link}'
*/
destroy.url = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_link: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_link: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_link: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_link: typeof args.footer_link === 'object'
        ? args.footer_link.id
        : args.footer_link,
    }

    return destroy.definition.url
            .replace('{footer_link}', parsedArgs.footer_link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::destroy
* @see app/Http/Controllers/Admin/FooterLinkController.php:58
* @route '/admin/footer-links/{footer_link}'
*/
destroy.delete = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::destroy
* @see app/Http/Controllers/Admin/FooterLinkController.php:58
* @route '/admin/footer-links/{footer_link}'
*/
const destroyForm = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::destroy
* @see app/Http/Controllers/Admin/FooterLinkController.php:58
* @route '/admin/footer-links/{footer_link}'
*/
destroyForm.delete = (args: { footer_link: number | { id: number } } | [footer_link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const footer_links = {
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default footer_links