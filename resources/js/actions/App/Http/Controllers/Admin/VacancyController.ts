import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VacancyController::index
* @see app/Http/Controllers/Admin/VacancyController.php:17
* @route '/admin/vacancies'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/vacancies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VacancyController::index
* @see app/Http/Controllers/Admin/VacancyController.php:17
* @route '/admin/vacancies'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyController::index
* @see app/Http/Controllers/Admin/VacancyController.php:17
* @route '/admin/vacancies'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::index
* @see app/Http/Controllers/Admin/VacancyController.php:17
* @route '/admin/vacancies'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::create
* @see app/Http/Controllers/Admin/VacancyController.php:41
* @route '/admin/vacancies/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/vacancies/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VacancyController::create
* @see app/Http/Controllers/Admin/VacancyController.php:41
* @route '/admin/vacancies/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyController::create
* @see app/Http/Controllers/Admin/VacancyController.php:41
* @route '/admin/vacancies/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::create
* @see app/Http/Controllers/Admin/VacancyController.php:41
* @route '/admin/vacancies/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::store
* @see app/Http/Controllers/Admin/VacancyController.php:48
* @route '/admin/vacancies'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/vacancies',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VacancyController::store
* @see app/Http/Controllers/Admin/VacancyController.php:48
* @route '/admin/vacancies'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyController::store
* @see app/Http/Controllers/Admin/VacancyController.php:48
* @route '/admin/vacancies'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::edit
* @see app/Http/Controllers/Admin/VacancyController.php:63
* @route '/admin/vacancies/{vacancy}/edit'
*/
export const edit = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/vacancies/{vacancy}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VacancyController::edit
* @see app/Http/Controllers/Admin/VacancyController.php:63
* @route '/admin/vacancies/{vacancy}/edit'
*/
edit.url = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacancy: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacancy: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacancy: typeof args.vacancy === 'object'
        ? args.vacancy.id
        : args.vacancy,
    }

    return edit.definition.url
            .replace('{vacancy}', parsedArgs.vacancy.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyController::edit
* @see app/Http/Controllers/Admin/VacancyController.php:63
* @route '/admin/vacancies/{vacancy}/edit'
*/
edit.get = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::edit
* @see app/Http/Controllers/Admin/VacancyController.php:63
* @route '/admin/vacancies/{vacancy}/edit'
*/
edit.head = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::update
* @see app/Http/Controllers/Admin/VacancyController.php:94
* @route '/admin/vacancies/{vacancy}'
*/
export const update = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/vacancies/{vacancy}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\VacancyController::update
* @see app/Http/Controllers/Admin/VacancyController.php:94
* @route '/admin/vacancies/{vacancy}'
*/
update.url = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacancy: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacancy: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacancy: typeof args.vacancy === 'object'
        ? args.vacancy.id
        : args.vacancy,
    }

    return update.definition.url
            .replace('{vacancy}', parsedArgs.vacancy.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyController::update
* @see app/Http/Controllers/Admin/VacancyController.php:94
* @route '/admin/vacancies/{vacancy}'
*/
update.put = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::update
* @see app/Http/Controllers/Admin/VacancyController.php:94
* @route '/admin/vacancies/{vacancy}'
*/
update.patch = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\VacancyController::destroy
* @see app/Http/Controllers/Admin/VacancyController.php:111
* @route '/admin/vacancies/{vacancy}'
*/
export const destroy = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/vacancies/{vacancy}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\VacancyController::destroy
* @see app/Http/Controllers/Admin/VacancyController.php:111
* @route '/admin/vacancies/{vacancy}'
*/
destroy.url = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacancy: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacancy: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacancy: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacancy: typeof args.vacancy === 'object'
        ? args.vacancy.id
        : args.vacancy,
    }

    return destroy.definition.url
            .replace('{vacancy}', parsedArgs.vacancy.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VacancyController::destroy
* @see app/Http/Controllers/Admin/VacancyController.php:111
* @route '/admin/vacancies/{vacancy}'
*/
destroy.delete = (args: { vacancy: string | number | { id: string | number } } | [vacancy: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const VacancyController = { index, create, store, edit, update, destroy }

export default VacancyController