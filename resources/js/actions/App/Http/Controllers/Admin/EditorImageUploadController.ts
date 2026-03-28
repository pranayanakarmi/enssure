import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EditorImageUploadController::__invoke
* @see app/Http/Controllers/Admin/EditorImageUploadController.php:13
* @route '/admin/editor-images'
*/
const EditorImageUploadController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: EditorImageUploadController.url(options),
    method: 'post',
})

EditorImageUploadController.definition = {
    methods: ["post"],
    url: '/admin/editor-images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EditorImageUploadController::__invoke
* @see app/Http/Controllers/Admin/EditorImageUploadController.php:13
* @route '/admin/editor-images'
*/
EditorImageUploadController.url = (options?: RouteQueryOptions) => {
    return EditorImageUploadController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EditorImageUploadController::__invoke
* @see app/Http/Controllers/Admin/EditorImageUploadController.php:13
* @route '/admin/editor-images'
*/
EditorImageUploadController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: EditorImageUploadController.url(options),
    method: 'post',
})

export default EditorImageUploadController