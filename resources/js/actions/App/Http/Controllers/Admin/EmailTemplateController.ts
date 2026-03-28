import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::index
* @see app/Http/Controllers/Admin/EmailTemplateController.php:15
* @route '/admin/email_templates'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/email_templates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::index
* @see app/Http/Controllers/Admin/EmailTemplateController.php:15
* @route '/admin/email_templates'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::index
* @see app/Http/Controllers/Admin/EmailTemplateController.php:15
* @route '/admin/email_templates'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::index
* @see app/Http/Controllers/Admin/EmailTemplateController.php:15
* @route '/admin/email_templates'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::create
* @see app/Http/Controllers/Admin/EmailTemplateController.php:36
* @route '/admin/email_templates/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/email_templates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::create
* @see app/Http/Controllers/Admin/EmailTemplateController.php:36
* @route '/admin/email_templates/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::create
* @see app/Http/Controllers/Admin/EmailTemplateController.php:36
* @route '/admin/email_templates/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::create
* @see app/Http/Controllers/Admin/EmailTemplateController.php:36
* @route '/admin/email_templates/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::store
* @see app/Http/Controllers/Admin/EmailTemplateController.php:43
* @route '/admin/email_templates'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/email_templates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::store
* @see app/Http/Controllers/Admin/EmailTemplateController.php:43
* @route '/admin/email_templates'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::store
* @see app/Http/Controllers/Admin/EmailTemplateController.php:43
* @route '/admin/email_templates'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::edit
* @see app/Http/Controllers/Admin/EmailTemplateController.php:51
* @route '/admin/email_templates/{email_template}/edit'
*/
export const edit = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/email_templates/{email_template}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::edit
* @see app/Http/Controllers/Admin/EmailTemplateController.php:51
* @route '/admin/email_templates/{email_template}/edit'
*/
edit.url = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { email_template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { email_template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            email_template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        email_template: typeof args.email_template === 'object'
        ? args.email_template.id
        : args.email_template,
    }

    return edit.definition.url
            .replace('{email_template}', parsedArgs.email_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::edit
* @see app/Http/Controllers/Admin/EmailTemplateController.php:51
* @route '/admin/email_templates/{email_template}/edit'
*/
edit.get = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::edit
* @see app/Http/Controllers/Admin/EmailTemplateController.php:51
* @route '/admin/email_templates/{email_template}/edit'
*/
edit.head = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::update
* @see app/Http/Controllers/Admin/EmailTemplateController.php:71
* @route '/admin/email_templates/{email_template}'
*/
export const update = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/email_templates/{email_template}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::update
* @see app/Http/Controllers/Admin/EmailTemplateController.php:71
* @route '/admin/email_templates/{email_template}'
*/
update.url = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { email_template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { email_template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            email_template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        email_template: typeof args.email_template === 'object'
        ? args.email_template.id
        : args.email_template,
    }

    return update.definition.url
            .replace('{email_template}', parsedArgs.email_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::update
* @see app/Http/Controllers/Admin/EmailTemplateController.php:71
* @route '/admin/email_templates/{email_template}'
*/
update.put = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::update
* @see app/Http/Controllers/Admin/EmailTemplateController.php:71
* @route '/admin/email_templates/{email_template}'
*/
update.patch = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::destroy
* @see app/Http/Controllers/Admin/EmailTemplateController.php:79
* @route '/admin/email_templates/{email_template}'
*/
export const destroy = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/email_templates/{email_template}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::destroy
* @see app/Http/Controllers/Admin/EmailTemplateController.php:79
* @route '/admin/email_templates/{email_template}'
*/
destroy.url = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { email_template: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { email_template: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            email_template: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        email_template: typeof args.email_template === 'object'
        ? args.email_template.id
        : args.email_template,
    }

    return destroy.definition.url
            .replace('{email_template}', parsedArgs.email_template.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EmailTemplateController::destroy
* @see app/Http/Controllers/Admin/EmailTemplateController.php:79
* @route '/admin/email_templates/{email_template}'
*/
destroy.delete = (args: { email_template: string | number | { id: string | number } } | [email_template: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const EmailTemplateController = { index, create, store, edit, update, destroy }

export default EmailTemplateController