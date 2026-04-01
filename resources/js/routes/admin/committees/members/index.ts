import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::store
* @see app/Http/Controllers/Admin/CommitteeMemberController.php:17
* @route '/admin/committees/{committee}/members'
*/
export const store = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/committees/{committee}/members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::store
* @see app/Http/Controllers/Admin/CommitteeMemberController.php:17
* @route '/admin/committees/{committee}/members'
*/
store.url = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { committee: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { committee: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            committee: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        committee: typeof args.committee === 'object'
        ? args.committee.id
        : args.committee,
    }

    return store.definition.url
            .replace('{committee}', parsedArgs.committee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::store
* @see app/Http/Controllers/Admin/CommitteeMemberController.php:17
* @route '/admin/committees/{committee}/members'
*/
store.post = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::store
* @see app/Http/Controllers/Admin/CommitteeMemberController.php:17
* @route '/admin/committees/{committee}/members'
*/
const storeForm = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::store
* @see app/Http/Controllers/Admin/CommitteeMemberController.php:17
* @route '/admin/committees/{committee}/members'
*/
storeForm.post = (args: { committee: number | { id: number } } | [committee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const members = {
    store: Object.assign(store, store),
}

export default members