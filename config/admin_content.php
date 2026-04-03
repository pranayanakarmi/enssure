<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Content resources (for permissions: view X, create X, update X, delete X)
    |--------------------------------------------------------------------------
    */
    'resources' => [
        'categories',
        'tags',
        'pages',
        'posts',
        'post_hero',
        'menus',
        'menu_items',
        'provinces',
        'districts',
        'training_programs',
        'courses',
        'beneficiaries',
        'training_batches',
        'batch_enrollments',
        'impact_stories',
        'notices',
        'vacancies',
        'vacancy_applications',
        'committees',
        'committee_members',
        'documents',
        'galleries',
        'gallery_images',
        'banners',
        'partners',
        'statistics',
        'sliders',
        'slider_items',
        'testimonials',
        'settings',
        'contacts',
        'contact_feedback_content',
        'application_forms',
        'team_members',
        'events',
        'event_registrations',
        'newsletters',
        'news_ticker_items',
        'home_about_sections',
        'home_impact_stories_sections',
        'home_gallery_sections',
        'home_gallery_section_items',
        'home_reach_sections',
        'home_reach_items',
        'home_coverage_sections',
        'home_coverage_section_items',
        'home_news_sections',
        'home_testimonials_sections',
        'home_partners_sections',
        'home_support_sections',
        'home_contact_cta_sections',
        'about_page_hero',
        'team_page_content',
        'infographics',
        'infographics_page_content',
        'gallery_page_section',
        'about_main_sections',
        'about_content_sections',
        'impact_page_hero',
        'impact_page_sections',
        'page_hero',
        'footer_columns',
        'footer_links',
        'site_settings',
        'faqs',
        'publications',
        'feedback',
        'translations',
        'media',
        'email_templates',
        'redirects',
    ],

    /*
    |--------------------------------------------------------------------------
    | Permission names (generated from resources: view/create/update/delete)
    |--------------------------------------------------------------------------
    */
    'actions' => ['view', 'create', 'update', 'delete'],

    /*
    |--------------------------------------------------------------------------
    | Admin menu structure (sidebar)
    |--------------------------------------------------------------------------
    | Each item: title, permission_resource (must have at least one action), href (route name), icon (optional).
    | Children: only shown if user has permission for that resource.
    | Home Page group shows sub-items for sliders, banners, statistics, testimonials, partners, galleries.
    */
    'menu' => [
        [
            'title' => 'Dashboard',
            'href' => 'dashboard',
            'icon' => 'LayoutGrid',
            'permission_resource' => null,
        ],
        [
            'title' => 'Users',
            'href' => 'admin.users.index',
            'icon' => 'Users',
            'permission_resource' => null,
            'role_only' => ['admin', 'super_admin'],
        ],
        [
            'title' => 'Roles',
            'href' => 'admin.roles.index',
            'icon' => 'Shield',
            'permission_resource' => null,
            'role_only' => ['admin', 'super_admin'],
        ],
        [
            'title' => 'Menus',
            'href' => 'admin.menus.index',
            'icon' => 'Menu',
            'permission_resource' => 'menus',
        ],
        [
            'title' => 'Home Page',
            'icon' => 'Home',
            'permission_resource' => null,
            'children' => [
                ['title' => 'News Ticker', 'href' => 'admin.news_ticker_items.index', 'permission_resource' => 'news_ticker_items'],
                ['title' => 'Sliders', 'href' => 'admin.sliders.index', 'permission_resource' => 'sliders'],
                // ['title' => 'Banners', 'href' => 'admin.banners.index', 'permission_resource' => 'banners'],
                //['title' => 'Statistics', 'href' => 'admin.statistics.index', 'permission_resource' => 'statistics'],
                ['title' => 'Our Impact & Milestones','href' => 'admin.home_reach_sections.edit','permission_resource' => 'home_reach_sections',],
                ['title' => 'About section', 'href' => 'admin.home_about_sections.edit', 'permission_resource' => 'home_about_sections'],
                ['title' => 'Gallery section', 'href' => 'admin.home_gallery_sections.edit', 'permission_resource' => 'home_gallery_sections'],
                ['title' => 'Impact Stories section', 'href' => 'admin.home_impact_stories_sections.edit', 'permission_resource' => 'home_impact_stories_sections'],
                ['title' => 'Coverage section', 'href' => 'admin.home_coverage_sections.edit', 'permission_resource' => 'home_coverage_sections'],
                ['title' => 'News section', 'href' => 'admin.home_news_sections.edit', 'permission_resource' => 'home_news_sections'],

                ['title' => 'Testimonials', 'href' => 'admin.testimonials.index', 'permission_resource' => 'testimonials'],
                ['title' => 'Testimonials section', 'href' => 'admin.home_testimonials_sections.edit', 'permission_resource' => 'home_testimonials_sections'],
                ['title' => 'Partners', 'href' => 'admin.partners.index', 'permission_resource' => 'partners'],
                ['title' => 'Partners section', 'href' => 'admin.home_partners_sections.edit', 'permission_resource' => 'home_partners_sections'],
                ['title' => 'Support section', 'href' => 'admin.home_support_sections.edit', 'permission_resource' => 'home_support_sections'],
                ['title' => 'Contact CTA section', 'href' => 'admin.home_contact_cta_sections.edit', 'permission_resource' => 'home_contact_cta_sections'],
                // ['title' => 'Galleries', 'href' => 'admin.galleries.index', 'permission_resource' => 'galleries'],






            ],
        ],

        [
            'title' => 'Gallery Page',
            'icon' => 'Images',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Title & text', 'href' => 'admin.gallery_page_section.edit', 'permission_resource' => 'gallery_page_section'],
                ['title' => 'Albums', 'href' => 'admin.galleries.index', 'permission_resource' => 'galleries'],
            ],
        ],
        [
            'title' => 'About Page',
            'icon' => 'FileText',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Hero', 'href' => 'admin.about_page_hero.edit', 'permission_resource' => 'about_page_hero'],
                ['title' => 'Main section', 'href' => 'admin.about_main_sections.edit', 'permission_resource' => 'about_main_sections'],
                ['title' => 'Content section', 'href' => 'admin.about_content_sections.edit', 'permission_resource' => 'about_content_sections'],
            ],
        ],
        [
            'title' => 'Our Team',
            'icon' => 'UsersRound',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Content', 'href' => 'admin.team_page_content.edit', 'permission_resource' => 'team_page_content'],
                ['title' => 'Executive Committee', 'href' => 'admin.team_members.executive_index', 'permission_resource' => 'team_members'],
                ['title' => 'Staff', 'href' => 'admin.team_members.staff_index', 'permission_resource' => 'team_members'],
            ],
        ],
        [
            'title' => 'Infographics Page',
            'icon' => 'FileText',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Page / Hero', 'href' => 'admin.infographics_page_content.edit', 'permission_resource' => 'infographics_page_content'],
                ['title' => 'Infographics', 'href' => 'admin.infographics.index', 'permission_resource' => 'infographics'],
            ],
        ],
        [
            'title' => 'Impact Stories Page',
            'icon' => 'BookOpen',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Hero', 'href' => 'admin.impact_page_hero.edit', 'permission_resource' => 'impact_page_hero'],
                ['title' => 'Section', 'href' => 'admin.impact_page_sections.edit', 'permission_resource' => 'impact_page_sections'],
                ['title' => 'Impact Stories', 'href' => 'admin.impact_stories.index', 'permission_resource' => 'impact_stories'],
            ],
        ],
        [
            'title' => 'Posts',
            'icon' => 'FileText',
            'permission_resource' => null,
            'children' => [
                ['title' => 'All posts', 'href' => 'admin.posts.index', 'permission_resource' => 'posts'],
                ['title' => 'Hero background', 'href' => 'admin.posts.hero.edit', 'permission_resource' => 'post_hero'],
                ['title' => 'Categories', 'href' => 'admin.categories.index', 'permission_resource' => 'categories'],
                ['title' => 'Tags', 'href' => 'admin.tags.index', 'permission_resource' => 'tags'],
            ],
        ],
        [
            'title' => 'Pages',
            'icon' => 'File',
            'permission_resource' => null,
            'children' => [
                ['title' => 'All pages', 'href' => 'admin.pages.index', 'permission_resource' => 'pages'],
                ['title' => 'Hero background', 'href' => 'admin.pages.hero.edit', 'permission_resource' => 'page_hero'],
            ],
        ],
        [
            'title' => 'News and Articles',
            'href' => 'admin.notices.index',
            'icon' => 'Newspaper',
            'permission_resource' => 'notices',
        ],
        [
            'title' => 'Reports',
            'href' => 'admin.documents.index',
            'icon' => 'FileStack',
            'permission_resource' => 'documents',
        ],
        [
            'title' => 'Vacancies',
            'icon' => 'Briefcase',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Job listings', 'href' => 'admin.vacancies.index', 'permission_resource' => 'vacancies'],
                ['title' => 'Applications', 'href' => 'admin.vacancy_applications.index', 'permission_resource' => 'vacancy_applications'],
            ],
        ],
        [
            'title' => 'Contact us',
            'icon' => 'Mail',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Contact Us page', 'href' => 'admin.contact_feedback_content.edit', 'permission_resource' => 'contact_feedback_content'],
                ['title' => 'Feedback submissions', 'href' => 'admin.feedback.index', 'permission_resource' => 'feedback'],
            ],
        ],
        [
            'title' => 'Footer',
            'icon' => 'PanelBottom',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Footer columns', 'href' => 'admin.footer-columns.index', 'permission_resource' => 'footer_columns'],
            ],
        ],
        [
            'title' => 'Site settings',
            'href' => 'admin.site_settings.edit',
            'permission_resource' => 'site_settings',
        ],

        // [
        //     'title' => 'Notices',
        //     'href' => 'admin.notices.index',
        //     'icon' => 'Bell',
        //     'permission_resource' => 'notices',
        // ],
        // [
        //     'title' => 'Vacancies',
        //     'href' => 'admin.vacancies.index',
        //     'icon' => 'Briefcase',
        //     'permission_resource' => 'vacancies',
        // ],
        // [
        //     'title' => 'Training',
        //     'icon' => 'GraduationCap',
        //     'permission_resource' => null,
        //     'children' => [
        //         ['title' => 'Programs', 'href' => 'admin.training_programs.index', 'permission_resource' => 'training_programs'],
        //         ['title' => 'Courses', 'href' => 'admin.courses.index', 'permission_resource' => 'courses'],
        //         ['title' => 'Batches', 'href' => 'admin.training_batches.index', 'permission_resource' => 'training_batches'],
        //         ['title' => 'Beneficiaries', 'href' => 'admin.beneficiaries.index', 'permission_resource' => 'beneficiaries'],
        //         ['title' => 'Enrollments', 'href' => 'admin.batch_enrollments.index', 'permission_resource' => 'batch_enrollments'],
        //     ],
        // ],
        // [
        //     'title' => 'Committees',
        //     'href' => 'admin.committees.index',
        //     'icon' => 'UsersRound',
        //     'permission_resource' => 'committees',
        // ],
        // [
        //     'title' => 'Location',
        //     'icon' => 'MapPin',
        //     'permission_resource' => null,
        //     'children' => [
        //         ['title' => 'Provinces', 'href' => 'admin.provinces.index', 'permission_resource' => 'provinces'],
        //         ['title' => 'Districts', 'href' => 'admin.districts.index', 'permission_resource' => 'districts'],
        //     ],
        // ],
        // [
        //     'title' => 'Documents',
        //     'href' => 'admin.documents.index',
        //     'icon' => 'FileStack',
        //     'permission_resource' => 'documents',
        // ],
        // [
        //     'title' => 'Team Members',
        //     'href' => 'admin.team_members.index',
        //     'icon' => 'UserCircle',
        //     'permission_resource' => 'team_members',
        // ],
        // [
        //     'title' => 'Events',
        //     'href' => 'admin.events.index',
        //     'icon' => 'Calendar',
        //     'permission_resource' => 'events',
        // ],
        // [
        //     'title' => 'Newsletters',
        //     'href' => 'admin.newsletters.index',
        //     'icon' => 'Mail',
        //     'permission_resource' => 'newsletters',
        // ],
        // [
        //     'title' => 'FAQs',
        //     'href' => 'admin.faqs.index',
        //     'icon' => 'HelpCircle',
        //     'permission_resource' => 'faqs',
        // ],
        // [
        //     'title' => 'Publications',
        //     'href' => 'admin.publications.index',
        //     'icon' => 'BookMarked',
        //     'permission_resource' => 'publications',
        // ],
        // [
        //     'title' => 'Inbox',
        //     'icon' => 'Inbox',
        //     'permission_resource' => null,
        //     'children' => [
        //         ['title' => 'Contacts', 'href' => 'admin.contacts.index', 'permission_resource' => 'contacts'],
        //         ['title' => 'Application Forms', 'href' => 'admin.application_forms.index', 'permission_resource' => 'application_forms'],
        //     ],
        // ],
        [
            'title' => 'System',
            'icon' => 'Settings',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Settings', 'href' => 'admin.settings.index', 'permission_resource' => 'settings'],
                ['title' => 'Email Templates', 'href' => 'admin.email_templates.index', 'permission_resource' => 'email_templates'],
                ['title' => 'Redirects', 'href' => 'admin.redirects.index', 'permission_resource' => 'redirects'],
                ['title' => 'Media', 'href' => 'admin.media.index', 'permission_resource' => 'media'],
            ],
        ],
    ],

];
