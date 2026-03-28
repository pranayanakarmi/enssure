import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::login
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:47
* @route '/login'
*/
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::logout
* @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:100
* @route '/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
* @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
* @route '/register'
*/
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

/**
* @see routes/web.php:38
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:38
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see routes/web.php:38
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see routes/web.php:38
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see routes/web.php:220
* @route '/about'
*/
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:220
* @route '/about'
*/
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see routes/web.php:220
* @route '/about'
*/
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

/**
* @see routes/web.php:220
* @route '/about'
*/
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

/**
* @see routes/web.php:317
* @route '/impact-stories'
*/
export const impactStories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: impactStories.url(options),
    method: 'get',
})

impactStories.definition = {
    methods: ["get","head"],
    url: '/impact-stories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:317
* @route '/impact-stories'
*/
impactStories.url = (options?: RouteQueryOptions) => {
    return impactStories.definition.url + queryParams(options)
}

/**
* @see routes/web.php:317
* @route '/impact-stories'
*/
impactStories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: impactStories.url(options),
    method: 'get',
})

/**
* @see routes/web.php:317
* @route '/impact-stories'
*/
impactStories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: impactStories.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::contact
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ContactController::contact
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::contact
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ContactController::contact
* @see app/Http/Controllers/ContactController.php:19
* @route '/contact'
*/
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

/**
* @see routes/web.php:380
* @route '/gallery'
*/
export const gallery = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gallery.url(options),
    method: 'get',
})

gallery.definition = {
    methods: ["get","head"],
    url: '/gallery',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:380
* @route '/gallery'
*/
gallery.url = (options?: RouteQueryOptions) => {
    return gallery.definition.url + queryParams(options)
}

/**
* @see routes/web.php:380
* @route '/gallery'
*/
gallery.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gallery.url(options),
    method: 'get',
})

/**
* @see routes/web.php:380
* @route '/gallery'
*/
gallery.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gallery.url(options),
    method: 'head',
})

/**
* @see routes/web.php:439
* @route '/team'
*/
export const team = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: team.url(options),
    method: 'get',
})

team.definition = {
    methods: ["get","head"],
    url: '/team',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:439
* @route '/team'
*/
team.url = (options?: RouteQueryOptions) => {
    return team.definition.url + queryParams(options)
}

/**
* @see routes/web.php:439
* @route '/team'
*/
team.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: team.url(options),
    method: 'get',
})

/**
* @see routes/web.php:439
* @route '/team'
*/
team.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: team.url(options),
    method: 'head',
})

/**
* @see routes/web.php:487
* @route '/infographics'
*/
export const infographics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: infographics.url(options),
    method: 'get',
})

infographics.definition = {
    methods: ["get","head"],
    url: '/infographics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:487
* @route '/infographics'
*/
infographics.url = (options?: RouteQueryOptions) => {
    return infographics.definition.url + queryParams(options)
}

/**
* @see routes/web.php:487
* @route '/infographics'
*/
infographics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: infographics.url(options),
    method: 'get',
})

/**
* @see routes/web.php:487
* @route '/infographics'
*/
infographics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: infographics.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VacancyPageController::vacancy
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
export const vacancy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vacancy.url(options),
    method: 'get',
})

vacancy.definition = {
    methods: ["get","head"],
    url: '/vacancy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VacancyPageController::vacancy
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
vacancy.url = (options?: RouteQueryOptions) => {
    return vacancy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacancyPageController::vacancy
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
vacancy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vacancy.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacancyPageController::vacancy
* @see app/Http/Controllers/VacancyPageController.php:13
* @route '/vacancy'
*/
vacancy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vacancy.url(options),
    method: 'head',
})

/**
* @see routes/web.php:555
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:555
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see routes/web.php:555
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see routes/web.php:555
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

