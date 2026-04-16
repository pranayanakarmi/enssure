import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import videos from './videos'
import eoiRfp from './eoi-rfp'
import users from './users'
import roles from './roles'
import activity_logs from './activity_logs'
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
import important_popups from './important_popups'
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
import document_types from './document_types'
import team_members from './team_members'
import team_page_content from './team_page_content'
import infographics from './infographics'
import admin from './admin'
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
import impactAndMilestonesItems from './impact-and-milestones-items'
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
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/admin/home',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\HomeController::home
 * @see app/Http/Controllers/Admin/HomeController.php:10
 * @route '/admin/home'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
export const galleryPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: galleryPage.url(options),
    method: 'get',
})

galleryPage.definition = {
    methods: ["get","head"],
    url: '/gallery-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
galleryPage.url = (options?: RouteQueryOptions) => {
    return galleryPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
galleryPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: galleryPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
galleryPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: galleryPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
    const galleryPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: galleryPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
        galleryPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: galleryPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:662
 * @route '/gallery-page'
 */
        galleryPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: galleryPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    galleryPage.form = galleryPageForm
/**
 * @see routes/web.php:666
 * @route '/about-page'
 */
export const aboutPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aboutPage.url(options),
    method: 'get',
})

aboutPage.definition = {
    methods: ["get","head"],
    url: '/about-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:666
 * @route '/about-page'
 */
aboutPage.url = (options?: RouteQueryOptions) => {
    return aboutPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:666
 * @route '/about-page'
 */
aboutPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aboutPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:666
 * @route '/about-page'
 */
aboutPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: aboutPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:666
 * @route '/about-page'
 */
    const aboutPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: aboutPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:666
 * @route '/about-page'
 */
        aboutPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: aboutPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:666
 * @route '/about-page'
 */
        aboutPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: aboutPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    aboutPage.form = aboutPageForm
/**
 * @see routes/web.php:670
 * @route '/team-page'
 */
export const teamPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: teamPage.url(options),
    method: 'get',
})

teamPage.definition = {
    methods: ["get","head"],
    url: '/team-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:670
 * @route '/team-page'
 */
teamPage.url = (options?: RouteQueryOptions) => {
    return teamPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:670
 * @route '/team-page'
 */
teamPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: teamPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:670
 * @route '/team-page'
 */
teamPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: teamPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:670
 * @route '/team-page'
 */
    const teamPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: teamPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:670
 * @route '/team-page'
 */
        teamPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: teamPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:670
 * @route '/team-page'
 */
        teamPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: teamPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    teamPage.form = teamPageForm
/**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
export const impactStoriesPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: impactStoriesPage.url(options),
    method: 'get',
})

impactStoriesPage.definition = {
    methods: ["get","head"],
    url: '/impact-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
impactStoriesPage.url = (options?: RouteQueryOptions) => {
    return impactStoriesPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
impactStoriesPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: impactStoriesPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
impactStoriesPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: impactStoriesPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
    const impactStoriesPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: impactStoriesPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
        impactStoriesPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: impactStoriesPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:674
 * @route '/impact-page'
 */
        impactStoriesPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: impactStoriesPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    impactStoriesPage.form = impactStoriesPageForm
/**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
export const pagesPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pagesPage.url(options),
    method: 'get',
})

pagesPage.definition = {
    methods: ["get","head"],
    url: '/pages-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
pagesPage.url = (options?: RouteQueryOptions) => {
    return pagesPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
pagesPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pagesPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
pagesPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pagesPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
    const pagesPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pagesPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
        pagesPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pagesPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:678
 * @route '/pages-page'
 */
        pagesPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pagesPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pagesPage.form = pagesPageForm
/**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
export const contactPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contactPage.url(options),
    method: 'get',
})

contactPage.definition = {
    methods: ["get","head"],
    url: '/contact-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
contactPage.url = (options?: RouteQueryOptions) => {
    return contactPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
contactPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contactPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
contactPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contactPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
    const contactPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contactPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
        contactPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contactPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:682
 * @route '/contact-page'
 */
        contactPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contactPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contactPage.form = contactPageForm
/**
 * @see routes/web.php:686
 * @route '/system-page'
 */
export const systemPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemPage.url(options),
    method: 'get',
})

systemPage.definition = {
    methods: ["get","head"],
    url: '/system-page',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:686
 * @route '/system-page'
 */
systemPage.url = (options?: RouteQueryOptions) => {
    return systemPage.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:686
 * @route '/system-page'
 */
systemPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemPage.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:686
 * @route '/system-page'
 */
systemPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systemPage.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:686
 * @route '/system-page'
 */
    const systemPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: systemPage.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:686
 * @route '/system-page'
 */
        systemPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systemPage.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:686
 * @route '/system-page'
 */
        systemPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systemPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    systemPage.form = systemPageForm
/**
 * @see routes/admin.php:90
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
 * @see routes/admin.php:90
 * @route '/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see routes/admin.php:90
 * @route '/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see routes/admin.php:90
 * @route '/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see routes/admin.php:90
 * @route '/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see routes/admin.php:90
 * @route '/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see routes/admin.php:90
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
const adminNamespace = {
    videos: Object.assign(videos, videos),
home: Object.assign(home, home),
galleryPage: Object.assign(galleryPage, galleryPage),
aboutPage: Object.assign(aboutPage, aboutPage),
teamPage: Object.assign(teamPage, teamPage),
impactStoriesPage: Object.assign(impactStoriesPage, impactStoriesPage),
pagesPage: Object.assign(pagesPage, pagesPage),
contactPage: Object.assign(contactPage, contactPage),
systemPage: Object.assign(systemPage, systemPage),
eoiRfp: Object.assign(eoiRfp, eoiRfp),
index: Object.assign(index, index),
users: Object.assign(users, users),
roles: Object.assign(roles, roles),
activity_logs: Object.assign(activity_logs, activity_logs),
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
important_popups: Object.assign(important_popups, important_popups),
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
document_types: Object.assign(document_types, document_types),
team_members: Object.assign(team_members, team_members),
team_page_content: Object.assign(team_page_content, team_page_content),
infographics: Object.assign(infographics, infographics),
admin: Object.assign(admin, admin),
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
impactAndMilestonesItems: Object.assign(impactAndMilestonesItems, impactAndMilestonesItems),
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

export default adminNamespace