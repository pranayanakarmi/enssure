import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import users from './users'
import roles from './roles'
import sliders from './sliders'
import sliderItems from './slider-items'
import banners from './banners'
import statistics from './statistics'
import testimonials from './testimonials'
import partners from './partners'
import galleries from './galleries'
import galleryImages from './gallery-images'
import impact_stories from './impact_stories'
import posts from './posts'
import categories from './categories'
import tags from './tags'
import pages from './pages'
import notices from './notices'
import vacancies from './vacancies'
import menus from './menus'
import menuItems from './menu-items'
import training_programs from './training_programs'
import courses from './courses'
import training_batches from './training_batches'
import beneficiaries from './beneficiaries'
import batch_enrollments from './batch_enrollments'
import committees from './committees'
import committeeMembers from './committee-members'
import provinces from './provinces'
import districts from './districts'
import documents from './documents'
import team_members from './team_members'
import events from './events'
import eventRegistrations from './event-registrations'
import newsletters from './newsletters'
import faqs from './faqs'
import publications from './publications'
import contacts from './contacts'
import application_forms from './application_forms'
import settings from './settings'
import email_templates from './email_templates'
import redirects from './redirects'
import media from './media'
import feedback from './feedback'
/**
* @see routes/admin.php:54
* @route '/admin'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/admin.php:54
* @route '/admin'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/admin.php:54
* @route '/admin'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/admin.php:54
* @route '/admin'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see routes/admin.php:54
* @route '/admin'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/admin.php:54
* @route '/admin'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see routes/admin.php:54
* @route '/admin'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

const admin = {
    index: Object.assign(index, index),
    users: Object.assign(users, users),
    roles: Object.assign(roles, roles),
    sliders: Object.assign(sliders, sliders),
    sliderItems: Object.assign(sliderItems, sliderItems),
    banners: Object.assign(banners, banners),
    statistics: Object.assign(statistics, statistics),
    testimonials: Object.assign(testimonials, testimonials),
    partners: Object.assign(partners, partners),
    galleries: Object.assign(galleries, galleries),
    galleryImages: Object.assign(galleryImages, galleryImages),
    impact_stories: Object.assign(impact_stories, impact_stories),
    posts: Object.assign(posts, posts),
    categories: Object.assign(categories, categories),
    tags: Object.assign(tags, tags),
    pages: Object.assign(pages, pages),
    notices: Object.assign(notices, notices),
    vacancies: Object.assign(vacancies, vacancies),
    menus: Object.assign(menus, menus),
    menuItems: Object.assign(menuItems, menuItems),
    training_programs: Object.assign(training_programs, training_programs),
    courses: Object.assign(courses, courses),
    training_batches: Object.assign(training_batches, training_batches),
    beneficiaries: Object.assign(beneficiaries, beneficiaries),
    batch_enrollments: Object.assign(batch_enrollments, batch_enrollments),
    committees: Object.assign(committees, committees),
    committeeMembers: Object.assign(committeeMembers, committeeMembers),
    provinces: Object.assign(provinces, provinces),
    districts: Object.assign(districts, districts),
    documents: Object.assign(documents, documents),
    team_members: Object.assign(team_members, team_members),
    events: Object.assign(events, events),
    eventRegistrations: Object.assign(eventRegistrations, eventRegistrations),
    newsletters: Object.assign(newsletters, newsletters),
    faqs: Object.assign(faqs, faqs),
    publications: Object.assign(publications, publications),
    contacts: Object.assign(contacts, contacts),
    application_forms: Object.assign(application_forms, application_forms),
    settings: Object.assign(settings, settings),
    email_templates: Object.assign(email_templates, email_templates),
    redirects: Object.assign(redirects, redirects),
    media: Object.assign(media, media),
    feedback: Object.assign(feedback, feedback),
}

export default admin