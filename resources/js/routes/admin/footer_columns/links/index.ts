import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FooterLinkController::store
* @see app/Http/Controllers/Admin/FooterLinkController.php:16
* @route '/admin/footer-columns/{footer_column}/links'
*/
export const store = (args: { footer_column: string | number | { id: string | number } } | [footer_column: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/footer-columns/{footer_column}/links',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::store
* @see app/Http/Controllers/Admin/FooterLinkController.php:16
* @route '/admin/footer-columns/{footer_column}/links'
*/
store.url = (args: { footer_column: string | number | { id: string | number } } | [footer_column: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer_column: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { footer_column: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            footer_column: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        footer_column: typeof args.footer_column === 'object'
        ? args.footer_column.id
        : args.footer_column,
    }

    return store.definition.url
            .replace('{footer_column}', parsedArgs.footer_column.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::store
* @see app/Http/Controllers/Admin/FooterLinkController.php:16
* @route '/admin/footer-columns/{footer_column}/links'
*/
store.post = (args: { footer_column: string | number | { id: string | number } } | [footer_column: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::store
* @see app/Http/Controllers/Admin/FooterLinkController.php:16
* @route '/admin/footer-columns/{footer_column}/links'
*/
const storeForm = (args: { footer_column: string | number | { id: string | number } } | [footer_column: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FooterLinkController::store
* @see app/Http/Controllers/Admin/FooterLinkController.php:16
* @route '/admin/footer-columns/{footer_column}/links'
*/
storeForm.post = (args: { footer_column: string | number | { id: string | number } } | [footer_column: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const links = {
    store: Object.assign(store, store),
}

export default links