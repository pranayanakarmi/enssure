import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SliderItemController::store
* @see app/Http/Controllers/Admin/SliderItemController.php:17
* @route '/admin/sliders/{slider}/items'
*/
export const store = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/sliders/{slider}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::store
* @see app/Http/Controllers/Admin/SliderItemController.php:17
* @route '/admin/sliders/{slider}/items'
*/
store.url = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{slider}', parsedArgs.slider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::store
* @see app/Http/Controllers/Admin/SliderItemController.php:17
* @route '/admin/sliders/{slider}/items'
*/
store.post = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
* @see app/Http/Controllers/Admin/SliderItemController.php:30
* @route '/admin/slider-items/{slider_item}/edit'
*/
export const edit = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/slider-items/{slider_item}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
* @see app/Http/Controllers/Admin/SliderItemController.php:30
* @route '/admin/slider-items/{slider_item}/edit'
*/
edit.url = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { slider_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            slider_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider_item: typeof args.slider_item === 'object'
        ? args.slider_item.id
        : args.slider_item,
    }

    return edit.definition.url
            .replace('{slider_item}', parsedArgs.slider_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
* @see app/Http/Controllers/Admin/SliderItemController.php:30
* @route '/admin/slider-items/{slider_item}/edit'
*/
edit.get = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\SliderItemController::edit
* @see app/Http/Controllers/Admin/SliderItemController.php:30
* @route '/admin/slider-items/{slider_item}/edit'
*/
edit.head = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SliderItemController::update
* @see app/Http/Controllers/Admin/SliderItemController.php:56
* @route '/admin/slider-items/{slider_item}'
*/
export const update = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/slider-items/{slider_item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::update
* @see app/Http/Controllers/Admin/SliderItemController.php:56
* @route '/admin/slider-items/{slider_item}'
*/
update.url = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { slider_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            slider_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider_item: typeof args.slider_item === 'object'
        ? args.slider_item.id
        : args.slider_item,
    }

    return update.definition.url
            .replace('{slider_item}', parsedArgs.slider_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::update
* @see app/Http/Controllers/Admin/SliderItemController.php:56
* @route '/admin/slider-items/{slider_item}'
*/
update.put = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
* @see app/Http/Controllers/Admin/SliderItemController.php:73
* @route '/admin/slider-items/{slider_item}'
*/
export const destroy = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/slider-items/{slider_item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
* @see app/Http/Controllers/Admin/SliderItemController.php:73
* @route '/admin/slider-items/{slider_item}'
*/
destroy.url = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slider_item: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { slider_item: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            slider_item: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        slider_item: typeof args.slider_item === 'object'
        ? args.slider_item.id
        : args.slider_item,
    }

    return destroy.definition.url
            .replace('{slider_item}', parsedArgs.slider_item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SliderItemController::destroy
* @see app/Http/Controllers/Admin/SliderItemController.php:73
* @route '/admin/slider-items/{slider_item}'
*/
destroy.delete = (args: { slider_item: string | number | { id: string | number } } | [slider_item: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SliderItemController = { store, edit, update, destroy }

export default SliderItemController