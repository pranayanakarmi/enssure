import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::index
* @see app/Http/Controllers/Admin/ImpactStoryController.php:17
* @route '/admin/impact_stories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/impact_stories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::index
* @see app/Http/Controllers/Admin/ImpactStoryController.php:17
* @route '/admin/impact_stories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::index
* @see app/Http/Controllers/Admin/ImpactStoryController.php:17
* @route '/admin/impact_stories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::index
* @see app/Http/Controllers/Admin/ImpactStoryController.php:17
* @route '/admin/impact_stories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::create
* @see app/Http/Controllers/Admin/ImpactStoryController.php:37
* @route '/admin/impact_stories/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/impact_stories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::create
* @see app/Http/Controllers/Admin/ImpactStoryController.php:37
* @route '/admin/impact_stories/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::create
* @see app/Http/Controllers/Admin/ImpactStoryController.php:37
* @route '/admin/impact_stories/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::create
* @see app/Http/Controllers/Admin/ImpactStoryController.php:37
* @route '/admin/impact_stories/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::store
* @see app/Http/Controllers/Admin/ImpactStoryController.php:44
* @route '/admin/impact_stories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/impact_stories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::store
* @see app/Http/Controllers/Admin/ImpactStoryController.php:44
* @route '/admin/impact_stories'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::store
* @see app/Http/Controllers/Admin/ImpactStoryController.php:44
* @route '/admin/impact_stories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::edit
* @see app/Http/Controllers/Admin/ImpactStoryController.php:64
* @route '/admin/impact_stories/{impact_story}/edit'
*/
export const edit = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/impact_stories/{impact_story}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::edit
* @see app/Http/Controllers/Admin/ImpactStoryController.php:64
* @route '/admin/impact_stories/{impact_story}/edit'
*/
edit.url = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { impact_story: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { impact_story: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            impact_story: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        impact_story: typeof args.impact_story === 'object'
        ? args.impact_story.id
        : args.impact_story,
    }

    return edit.definition.url
            .replace('{impact_story}', parsedArgs.impact_story.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::edit
* @see app/Http/Controllers/Admin/ImpactStoryController.php:64
* @route '/admin/impact_stories/{impact_story}/edit'
*/
edit.get = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::edit
* @see app/Http/Controllers/Admin/ImpactStoryController.php:64
* @route '/admin/impact_stories/{impact_story}/edit'
*/
edit.head = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::update
* @see app/Http/Controllers/Admin/ImpactStoryController.php:85
* @route '/admin/impact_stories/{impact_story}'
*/
export const update = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/impact_stories/{impact_story}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::update
* @see app/Http/Controllers/Admin/ImpactStoryController.php:85
* @route '/admin/impact_stories/{impact_story}'
*/
update.url = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { impact_story: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { impact_story: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            impact_story: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        impact_story: typeof args.impact_story === 'object'
        ? args.impact_story.id
        : args.impact_story,
    }

    return update.definition.url
            .replace('{impact_story}', parsedArgs.impact_story.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::update
* @see app/Http/Controllers/Admin/ImpactStoryController.php:85
* @route '/admin/impact_stories/{impact_story}'
*/
update.put = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::update
* @see app/Http/Controllers/Admin/ImpactStoryController.php:85
* @route '/admin/impact_stories/{impact_story}'
*/
update.patch = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::destroy
* @see app/Http/Controllers/Admin/ImpactStoryController.php:112
* @route '/admin/impact_stories/{impact_story}'
*/
export const destroy = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/impact_stories/{impact_story}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::destroy
* @see app/Http/Controllers/Admin/ImpactStoryController.php:112
* @route '/admin/impact_stories/{impact_story}'
*/
destroy.url = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { impact_story: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { impact_story: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            impact_story: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        impact_story: typeof args.impact_story === 'object'
        ? args.impact_story.id
        : args.impact_story,
    }

    return destroy.definition.url
            .replace('{impact_story}', parsedArgs.impact_story.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ImpactStoryController::destroy
* @see app/Http/Controllers/Admin/ImpactStoryController.php:112
* @route '/admin/impact_stories/{impact_story}'
*/
destroy.delete = (args: { impact_story: string | number | { id: string | number } } | [impact_story: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const impact_stories = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default impact_stories