import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/executive'
*/
const index4e80eda8e3b6d70a36423da92ca0ef62 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4e80eda8e3b6d70a36423da92ca0ef62.url(options),
    method: 'get',
})

index4e80eda8e3b6d70a36423da92ca0ef62.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/executive',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/executive'
*/
index4e80eda8e3b6d70a36423da92ca0ef62.url = (options?: RouteQueryOptions) => {
    return index4e80eda8e3b6d70a36423da92ca0ef62.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/executive'
*/
index4e80eda8e3b6d70a36423da92ca0ef62.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4e80eda8e3b6d70a36423da92ca0ef62.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/executive'
*/
index4e80eda8e3b6d70a36423da92ca0ef62.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4e80eda8e3b6d70a36423da92ca0ef62.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/staff'
*/
const index46fe1a0905d7f508dd4b75eafc6b62f3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46fe1a0905d7f508dd4b75eafc6b62f3.url(options),
    method: 'get',
})

index46fe1a0905d7f508dd4b75eafc6b62f3.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/staff',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/staff'
*/
index46fe1a0905d7f508dd4b75eafc6b62f3.url = (options?: RouteQueryOptions) => {
    return index46fe1a0905d7f508dd4b75eafc6b62f3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/staff'
*/
index46fe1a0905d7f508dd4b75eafc6b62f3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46fe1a0905d7f508dd4b75eafc6b62f3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members/staff'
*/
index46fe1a0905d7f508dd4b75eafc6b62f3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index46fe1a0905d7f508dd4b75eafc6b62f3.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members'
*/
const index13bf69aaf27bd16e9e23590665deedaf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index13bf69aaf27bd16e9e23590665deedaf.url(options),
    method: 'get',
})

index13bf69aaf27bd16e9e23590665deedaf.definition = {
    methods: ["get","head"],
    url: '/admin/team_members',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members'
*/
index13bf69aaf27bd16e9e23590665deedaf.url = (options?: RouteQueryOptions) => {
    return index13bf69aaf27bd16e9e23590665deedaf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members'
*/
index13bf69aaf27bd16e9e23590665deedaf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index13bf69aaf27bd16e9e23590665deedaf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::index
* @see app/Http/Controllers/Admin/TeamMemberController.php:24
* @route '/admin/team_members'
*/
index13bf69aaf27bd16e9e23590665deedaf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index13bf69aaf27bd16e9e23590665deedaf.url(options),
    method: 'head',
})

export const index = {
    '/admin/team_members/executive': index4e80eda8e3b6d70a36423da92ca0ef62,
    '/admin/team_members/staff': index46fe1a0905d7f508dd4b75eafc6b62f3,
    '/admin/team_members': index13bf69aaf27bd16e9e23590665deedaf,
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
* @see app/Http/Controllers/Admin/TeamMemberController.php:60
* @route '/admin/team_members/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
* @see app/Http/Controllers/Admin/TeamMemberController.php:60
* @route '/admin/team_members/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
* @see app/Http/Controllers/Admin/TeamMemberController.php:60
* @route '/admin/team_members/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::create
* @see app/Http/Controllers/Admin/TeamMemberController.php:60
* @route '/admin/team_members/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
* @see app/Http/Controllers/Admin/TeamMemberController.php:75
* @route '/admin/team_members'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/team_members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
* @see app/Http/Controllers/Admin/TeamMemberController.php:75
* @route '/admin/team_members'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::store
* @see app/Http/Controllers/Admin/TeamMemberController.php:75
* @route '/admin/team_members'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
* @see app/Http/Controllers/Admin/TeamMemberController.php:99
* @route '/admin/team_members/{team_member}/edit'
*/
export const edit = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/team_members/{team_member}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
* @see app/Http/Controllers/Admin/TeamMemberController.php:99
* @route '/admin/team_members/{team_member}/edit'
*/
edit.url = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { team_member: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            team_member: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        team_member: typeof args.team_member === 'object'
        ? args.team_member.id
        : args.team_member,
    }

    return edit.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
* @see app/Http/Controllers/Admin/TeamMemberController.php:99
* @route '/admin/team_members/{team_member}/edit'
*/
edit.get = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::edit
* @see app/Http/Controllers/Admin/TeamMemberController.php:99
* @route '/admin/team_members/{team_member}/edit'
*/
edit.head = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
* @see app/Http/Controllers/Admin/TeamMemberController.php:124
* @route '/admin/team_members/{team_member}'
*/
export const update = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/team_members/{team_member}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
* @see app/Http/Controllers/Admin/TeamMemberController.php:124
* @route '/admin/team_members/{team_member}'
*/
update.url = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { team_member: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            team_member: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        team_member: typeof args.team_member === 'object'
        ? args.team_member.id
        : args.team_member,
    }

    return update.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
* @see app/Http/Controllers/Admin/TeamMemberController.php:124
* @route '/admin/team_members/{team_member}'
*/
update.put = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::update
* @see app/Http/Controllers/Admin/TeamMemberController.php:124
* @route '/admin/team_members/{team_member}'
*/
update.patch = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
* @see app/Http/Controllers/Admin/TeamMemberController.php:156
* @route '/admin/team_members/{team_member}'
*/
export const destroy = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/team_members/{team_member}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
* @see app/Http/Controllers/Admin/TeamMemberController.php:156
* @route '/admin/team_members/{team_member}'
*/
destroy.url = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { team_member: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { team_member: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            team_member: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        team_member: typeof args.team_member === 'object'
        ? args.team_member.id
        : args.team_member,
    }

    return destroy.definition.url
            .replace('{team_member}', parsedArgs.team_member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TeamMemberController::destroy
* @see app/Http/Controllers/Admin/TeamMemberController.php:156
* @route '/admin/team_members/{team_member}'
*/
destroy.delete = (args: { team_member: string | number | { id: string | number } } | [team_member: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const TeamMemberController = { index, create, store, edit, update, destroy }

export default TeamMemberController