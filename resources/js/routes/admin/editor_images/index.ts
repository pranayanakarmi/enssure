import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EditorImageUploadController::__invoke
* @see app/Http/Controllers/Admin/EditorImageUploadController.php:13
* @route '/admin/editor-images'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/editor-images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EditorImageUploadController::__invoke
* @see app/Http/Controllers/Admin/EditorImageUploadController.php:13
* @route '/admin/editor-images'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EditorImageUploadController::__invoke
* @see app/Http/Controllers/Admin/EditorImageUploadController.php:13
* @route '/admin/editor-images'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const editor_images = {
    store: Object.assign(store, store),
}

export default editor_images