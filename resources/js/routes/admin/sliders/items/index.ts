import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SliderItemController::store
 * @see app/Http/Controllers/Admin/SliderItemController.php:18
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
 * @see app/Http/Controllers/Admin/SliderItemController.php:18
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
 * @see app/Http/Controllers/Admin/SliderItemController.php:18
 * @route '/admin/sliders/{slider}/items'
 */
store.post = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SliderItemController::store
 * @see app/Http/Controllers/Admin/SliderItemController.php:18
 * @route '/admin/sliders/{slider}/items'
 */
    const storeForm = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SliderItemController::store
 * @see app/Http/Controllers/Admin/SliderItemController.php:18
 * @route '/admin/sliders/{slider}/items'
 */
        storeForm.post = (args: { slider: string | number | { id: string | number } } | [slider: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const items = {
    store: Object.assign(store, store),
}

export default items