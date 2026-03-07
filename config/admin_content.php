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
        'home_news_section_items',
        'home_testimonials_sections',
        'home_partners_sections',
        'home_support_sections',
        'home_contact_cta_sections',
        'footer_columns',
        'footer_links',
        'footer_settings',
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
                ['title' => 'Sliders', 'href' => 'admin.sliders.index', 'permission_resource' => 'sliders'],
                ['title' => 'Banners', 'href' => 'admin.banners.index', 'permission_resource' => 'banners'],
                ['title' => 'Statistics', 'href' => 'admin.statistics.index', 'permission_resource' => 'statistics'],
                ['title' => 'Testimonials', 'href' => 'admin.testimonials.index', 'permission_resource' => 'testimonials'],
                ['title' => 'Testimonials section', 'href' => 'admin.home_testimonials_sections.edit', 'permission_resource' => 'home_testimonials_sections'],
                ['title' => 'Partners', 'href' => 'admin.partners.index', 'permission_resource' => 'partners'],
                ['title' => 'Partners section', 'href' => 'admin.home_partners_sections.edit', 'permission_resource' => 'home_partners_sections'],
                ['title' => 'Support section', 'href' => 'admin.home_support_sections.edit', 'permission_resource' => 'home_support_sections'],
                ['title' => 'Contact CTA section', 'href' => 'admin.home_contact_cta_sections.edit', 'permission_resource' => 'home_contact_cta_sections'],
                // ['title' => 'Galleries', 'href' => 'admin.galleries.index', 'permission_resource' => 'galleries'],
                ['title' => 'News Ticker', 'href' => 'admin.news_ticker_items.index', 'permission_resource' => 'news_ticker_items'],
                ['title' => 'About section', 'href' => 'admin.home_about_sections.edit', 'permission_resource' => 'home_about_sections'],
                ['title' => 'Impact Stories section', 'href' => 'admin.home_impact_stories_sections.edit', 'permission_resource' => 'home_impact_stories_sections'],
                ['title' => 'Gallery section', 'href' => 'admin.home_gallery_sections.edit', 'permission_resource' => 'home_gallery_sections'],
                ['title' => 'Our Reach', 'href' => 'admin.home_reach_sections.edit', 'permission_resource' => 'home_reach_sections'],
                ['title' => 'Coverage section', 'href' => 'admin.home_coverage_sections.edit', 'permission_resource' => 'home_coverage_sections'],
                ['title' => 'News section', 'href' => 'admin.home_news_sections.edit', 'permission_resource' => 'home_news_sections'],
            ],
        ],
        [
            'title' => 'Footer',
            'icon' => 'PanelBottom',
            'permission_resource' => null,
            'children' => [
                ['title' => 'Footer columns', 'href' => 'admin.footer-columns.index', 'permission_resource' => 'footer_columns'],
                ['title' => 'Footer settings', 'href' => 'admin.footer_settings.edit', 'permission_resource' => 'footer_settings'],
            ],
        ],
        // [
        //     'title' => 'Impact Stories',
        //     'href' => 'admin.impact_stories.index',
        //     'icon' => 'BookOpen',
        //     'permission_resource' => 'impact_stories',
        // ],
        // [
        //     'title' => 'Posts',
        //     'href' => 'admin.posts.index',
        //     'icon' => 'FileText',
        //     'permission_resource' => 'posts',
        // ],
        // [
        //     'title' => 'Categories',
        //     'href' => 'admin.categories.index',
        //     'icon' => 'Folder',
        //     'permission_resource' => 'categories',
        // ],
        // [
        //     'title' => 'Tags',
        //     'href' => 'admin.tags.index',
        //     'icon' => 'Tag',
        //     'permission_resource' => 'tags',
        // ],
        // [
        //     'title' => 'Pages',
        //     'href' => 'admin.pages.index',
        //     'icon' => 'File',
        //     'permission_resource' => 'pages',
        // ],
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
        // [
        //     'title' => 'System',
        //     'icon' => 'Settings',
        //     'permission_resource' => null,
        //     'children' => [
        //         ['title' => 'Settings', 'href' => 'admin.settings.index', 'permission_resource' => 'settings'],
        //         ['title' => 'Email Templates', 'href' => 'admin.email_templates.index', 'permission_resource' => 'email_templates'],
        //         ['title' => 'Redirects', 'href' => 'admin.redirects.index', 'permission_resource' => 'redirects'],
        //         ['title' => 'Media', 'href' => 'admin.media.index', 'permission_resource' => 'media'],
        //         ['title' => 'Feedback', 'href' => 'admin.feedback.index', 'permission_resource' => 'feedback'],
        //     ],
        // ],
    ],

];
