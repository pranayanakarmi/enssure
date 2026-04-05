import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import videos from './videos'
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
import editor_images from './editor_images'
import impact_stories from './impact_stories'
import posts from './posts'
import categories from './categories'
import tags from './tags'
import pages from './pages'
import notices from './notices'
import vacancies from './vacancies'
import vacancy_applications from './vacancy_applications'
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
import team_page_content from './team_page_content'
import infographics_page_content from './infographics_page_content'
import infographics from './infographics'
import infographic_items from './infographic_items'
import contact_feedback_content from './contact_feedback_content'
import events from './events'
import eventRegistrations from './event-registrations'
import newsletters from './newsletters'
import news_ticker_items from './news_ticker_items'
import home_about_sections from './home_about_sections'
import home_impact_stories_sections from './home_impact_stories_sections'
import home_gallery_sections from './home_gallery_sections'
import home_reach_sections from './home_reach_sections'
import home_reach_items from './home_reach_items'
import home_coverage_sections from './home_coverage_sections'
import home_coverage_section_items from './home_coverage_section_items'
import home_news_sections from './home_news_sections'
import home_testimonials_sections from './home_testimonials_sections'
import home_partners_sections from './home_partners_sections'
import home_support_sections from './home_support_sections'
import home_contact_cta_sections from './home_contact_cta_sections'
import about_page_hero from './about_page_hero'
import gallery_page_section from './gallery_page_section'
import about_main_sections from './about_main_sections'
import about_content_sections from './about_content_sections'
import impact_page_hero from './impact_page_hero'
import impact_page_sections from './impact_page_sections'
import footerColumns from './footer-columns'
import footer_columns from './footer_columns'
import footer_links from './footer_links'
import site_settings from './site_settings'
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
 * @see routes/admin.php:85
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
 * @see routes/admin.php:85
 * @route '/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/admin.php:85
 * @route '/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/admin.php:85
 * @route '/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/admin.php:85
 * @route '/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/admin.php:85
 * @route '/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/admin.php:85
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
    videos: Object.assign(videos, videos),
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
editor_images: Object.assign(editor_images, editor_images),
impact_stories: Object.assign(impact_stories, impact_stories),
posts: Object.assign(posts, posts),
categories: Object.assign(categories, categories),
tags: Object.assign(tags, tags),
pages: Object.assign(pages, pages),
notices: Object.assign(notices, notices),
vacancies: Object.assign(vacancies, vacancies),
vacancy_applications: Object.assign(vacancy_applications, vacancy_applications),
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
team_page_content: Object.assign(team_page_content, team_page_content),
infographics_page_content: Object.assign(infographics_page_content, infographics_page_content),
infographics: Object.assign(infographics, infographics),
infographic_items: Object.assign(infographic_items, infographic_items),
contact_feedback_content: Object.assign(contact_feedback_content, contact_feedback_content),
events: Object.assign(events, events),
eventRegistrations: Object.assign(eventRegistrations, eventRegistrations),
newsletters: Object.assign(newsletters, newsletters),
news_ticker_items: Object.assign(news_ticker_items, news_ticker_items),
home_about_sections: Object.assign(home_about_sections, home_about_sections),
home_impact_stories_sections: Object.assign(home_impact_stories_sections, home_impact_stories_sections),
home_gallery_sections: Object.assign(home_gallery_sections, home_gallery_sections),
home_reach_sections: Object.assign(home_reach_sections, home_reach_sections),
home_reach_items: Object.assign(home_reach_items, home_reach_items),
home_coverage_sections: Object.assign(home_coverage_sections, home_coverage_sections),
home_coverage_section_items: Object.assign(home_coverage_section_items, home_coverage_section_items),
home_news_sections: Object.assign(home_news_sections, home_news_sections),
home_testimonials_sections: Object.assign(home_testimonials_sections, home_testimonials_sections),
home_partners_sections: Object.assign(home_partners_sections, home_partners_sections),
home_support_sections: Object.assign(home_support_sections, home_support_sections),
home_contact_cta_sections: Object.assign(home_contact_cta_sections, home_contact_cta_sections),
about_page_hero: Object.assign(about_page_hero, about_page_hero),
gallery_page_section: Object.assign(gallery_page_section, gallery_page_section),
about_main_sections: Object.assign(about_main_sections, about_main_sections),
about_content_sections: Object.assign(about_content_sections, about_content_sections),
impact_page_hero: Object.assign(impact_page_hero, impact_page_hero),
impact_page_sections: Object.assign(impact_page_sections, impact_page_sections),
footerColumns: Object.assign(footerColumns, footerColumns),
footer_columns: Object.assign(footer_columns, footer_columns),
footer_links: Object.assign(footer_links, footer_links),
site_settings: Object.assign(site_settings, site_settings),
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