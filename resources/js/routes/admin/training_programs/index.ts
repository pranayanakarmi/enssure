import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::index
* @see app/Http/Controllers/Admin/TrainingProgramController.php:15
* @route '/admin/training_programs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/training_programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::index
* @see app/Http/Controllers/Admin/TrainingProgramController.php:15
* @route '/admin/training_programs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::index
* @see app/Http/Controllers/Admin/TrainingProgramController.php:15
* @route '/admin/training_programs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::index
* @see app/Http/Controllers/Admin/TrainingProgramController.php:15
* @route '/admin/training_programs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::create
* @see app/Http/Controllers/Admin/TrainingProgramController.php:37
* @route '/admin/training_programs/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/training_programs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::create
* @see app/Http/Controllers/Admin/TrainingProgramController.php:37
* @route '/admin/training_programs/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::create
* @see app/Http/Controllers/Admin/TrainingProgramController.php:37
* @route '/admin/training_programs/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::create
* @see app/Http/Controllers/Admin/TrainingProgramController.php:37
* @route '/admin/training_programs/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::store
* @see app/Http/Controllers/Admin/TrainingProgramController.php:44
* @route '/admin/training_programs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/training_programs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::store
* @see app/Http/Controllers/Admin/TrainingProgramController.php:44
* @route '/admin/training_programs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::store
* @see app/Http/Controllers/Admin/TrainingProgramController.php:44
* @route '/admin/training_programs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::edit
* @see app/Http/Controllers/Admin/TrainingProgramController.php:52
* @route '/admin/training_programs/{training_program}/edit'
*/
export const edit = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/training_programs/{training_program}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::edit
* @see app/Http/Controllers/Admin/TrainingProgramController.php:52
* @route '/admin/training_programs/{training_program}/edit'
*/
edit.url = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_program: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training_program: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training_program: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training_program: typeof args.training_program === 'object'
        ? args.training_program.id
        : args.training_program,
    }

    return edit.definition.url
            .replace('{training_program}', parsedArgs.training_program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::edit
* @see app/Http/Controllers/Admin/TrainingProgramController.php:52
* @route '/admin/training_programs/{training_program}/edit'
*/
edit.get = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::edit
* @see app/Http/Controllers/Admin/TrainingProgramController.php:52
* @route '/admin/training_programs/{training_program}/edit'
*/
edit.head = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::update
* @see app/Http/Controllers/Admin/TrainingProgramController.php:71
* @route '/admin/training_programs/{training_program}'
*/
export const update = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/training_programs/{training_program}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::update
* @see app/Http/Controllers/Admin/TrainingProgramController.php:71
* @route '/admin/training_programs/{training_program}'
*/
update.url = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_program: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training_program: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training_program: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training_program: typeof args.training_program === 'object'
        ? args.training_program.id
        : args.training_program,
    }

    return update.definition.url
            .replace('{training_program}', parsedArgs.training_program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::update
* @see app/Http/Controllers/Admin/TrainingProgramController.php:71
* @route '/admin/training_programs/{training_program}'
*/
update.put = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::update
* @see app/Http/Controllers/Admin/TrainingProgramController.php:71
* @route '/admin/training_programs/{training_program}'
*/
update.patch = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::destroy
* @see app/Http/Controllers/Admin/TrainingProgramController.php:79
* @route '/admin/training_programs/{training_program}'
*/
export const destroy = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/training_programs/{training_program}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::destroy
* @see app/Http/Controllers/Admin/TrainingProgramController.php:79
* @route '/admin/training_programs/{training_program}'
*/
destroy.url = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { training_program: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { training_program: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            training_program: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        training_program: typeof args.training_program === 'object'
        ? args.training_program.id
        : args.training_program,
    }

    return destroy.definition.url
            .replace('{training_program}', parsedArgs.training_program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrainingProgramController::destroy
* @see app/Http/Controllers/Admin/TrainingProgramController.php:79
* @route '/admin/training_programs/{training_program}'
*/
destroy.delete = (args: { training_program: string | number | { id: string | number } } | [training_program: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const training_programs = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default training_programs