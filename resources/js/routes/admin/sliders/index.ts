import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import items from './items'
/**
* @see \App\Http\Controllers\Admin\SliderController::index
* @see app/Http/Controllers/Admin/SliderController.php:16
* @route '/admin/sliders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sliders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::index
* @see app/Http/Controllers/Admin/SliderController.php:16
* @route '/admin/sliders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::index
* @see app/Http/Controllers/Admin/SliderController.php:16
* @route '/admin/sliders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::index
* @see app/Http/Controllers/Admin/SliderController.php:16
* @route '/admin/sliders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::create
* @see app/Http/Controllers/Admin/SliderController.php:37
* @route '/admin/sliders/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/sliders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::create
* @see app/Http/Controllers/Admin/SliderController.php:37
* @route '/admin/sliders/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::create
* @see app/Http/Controllers/Admin/SliderController.php:37
* @route '/admin/sliders/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::create
* @see app/Http/Controllers/Admin/SliderController.php:37
* @route '/admin/sliders/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::store
* @see app/Http/Controllers/Admin/SliderController.php:44
* @route '/admin/sliders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/sliders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::store
* @see app/Http/Controllers/Admin/SliderController.php:44
* @route '/admin/sliders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::store
* @see app/Http/Controllers/Admin/SliderController.php:44
* @route '/admin/sliders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::show
* @see app/Http/Controllers/Admin/SliderController.php:0
* @route '/admin/sliders/{slider}'
*/
export const show = (args: { slider: string | number } | [slider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/sliders/{slider}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::show
* @see app/Http/Controllers/Admin/SliderController.php:0
* @route '/admin/sliders/{slider}'
*/
show.url = (args: { slider: string | number } | [slider: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider: args }
    }

    if (Array.isArray(args)) {
        args = {
            slider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider: args.slider,
    }

    return show.definition.url
            .replace('{slider}', parsedArgs.slider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::show
* @see app/Http/Controllers/Admin/SliderController.php:0
* @route '/admin/sliders/{slider}'
*/
show.get = (args: { slider: string | number } | [slider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::show
* @see app/Http/Controllers/Admin/SliderController.php:0
* @route '/admin/sliders/{slider}'
*/
show.head = (args: { slider: string | number } | [slider: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::edit
* @see app/Http/Controllers/Admin/SliderController.php:52
* @route '/admin/sliders/{slider}/edit'
*/
export const edit = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/sliders/{slider}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::edit
* @see app/Http/Controllers/Admin/SliderController.php:52
* @route '/admin/sliders/{slider}/edit'
*/
edit.url = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { slider: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            slider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider: typeof args.slider === 'object'
        ? args.slider.id
        : args.slider,
    }

    return edit.definition.url
            .replace('{slider}', parsedArgs.slider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::edit
* @see app/Http/Controllers/Admin/SliderController.php:52
* @route '/admin/sliders/{slider}/edit'
*/
edit.get = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::edit
* @see app/Http/Controllers/Admin/SliderController.php:52
* @route '/admin/sliders/{slider}/edit'
*/
edit.head = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::update
* @see app/Http/Controllers/Admin/SliderController.php:78
* @route '/admin/sliders/{slider}'
*/
export const update = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/sliders/{slider}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::update
* @see app/Http/Controllers/Admin/SliderController.php:78
* @route '/admin/sliders/{slider}'
*/
update.url = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { slider: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            slider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider: typeof args.slider === 'object'
        ? args.slider.id
        : args.slider,
    }

    return update.definition.url
            .replace('{slider}', parsedArgs.slider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::update
* @see app/Http/Controllers/Admin/SliderController.php:78
* @route '/admin/sliders/{slider}'
*/
update.put = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::update
* @see app/Http/Controllers/Admin/SliderController.php:78
* @route '/admin/sliders/{slider}'
*/
update.patch = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\SliderController::destroy
* @see app/Http/Controllers/Admin/SliderController.php:86
* @route '/admin/sliders/{slider}'
*/
export const destroy = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/sliders/{slider}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SliderController::destroy
* @see app/Http/Controllers/Admin/SliderController.php:86
* @route '/admin/sliders/{slider}'
*/
destroy.url = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { slider: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            slider: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider: typeof args.slider === 'object'
        ? args.slider.id
        : args.slider,
    }

    return destroy.definition.url
            .replace('{slider}', parsedArgs.slider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderController::destroy
* @see app/Http/Controllers/Admin/SliderController.php:86
* @route '/admin/sliders/{slider}'
*/
destroy.delete = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const sliders = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    items: Object.assign(items, items),
}

export default sliders