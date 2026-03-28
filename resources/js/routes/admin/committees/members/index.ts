import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CommitteeMemberController::store
* @see app/Http/Controllers/Admin/CommitteeMemberController.php:17
* @route '/admin/committees/{committee}/members'
*/
export const store = (args: { committee: string | number | { id: string | number } } | [committee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
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
store.url = (args: { committee: string | number | { id: string | number } } | [committee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
store.post = (args: { committee: string | number | { id: string | number } } | [committee: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

const members = {
    store: Object.assign(store, store),
}

export default members