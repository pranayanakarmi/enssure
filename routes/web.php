<?php

use App\Http\Controllers\ContactController as PublicContactController;
use App\Http\Controllers\HomeCoverageProvinceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\VacancyApplicationController;
use App\Http\Controllers\VacancyPageController;
use App\Http\Controllers\Admin\VideoController;
use App\Models\AboutContentSection;
use App\Models\AboutMainSection;
use App\Models\AboutPageHero;
use App\Models\Gallery;
use App\Models\GalleryPageSection;
use App\Models\HomeAboutSection;
use App\Models\HomeContactCtaSection;
use App\Models\HomeCoverageSection;
use App\Models\HomeGallerySection;
use App\Models\HomeImpactStoriesSection;
use App\Models\HomeNewsSection;
use App\Models\HomePartnersSection;
use App\Models\HomeReachSection;
use App\Models\HomeSupportSection;
use App\Models\HomeTestimonialsSection;
use App\Models\ImpactPageHero;
use App\Models\ImpactPageSection;
use App\Models\ImpactStory;
use App\Models\Infographic;
use App\Models\InfographicsPageContent;
use App\Models\Notice;
use App\Models\Page;
use App\Models\PageHero;
use App\Models\Partner;
use App\Models\Post;
use App\Models\PostHero;
use App\Models\Slider;
use App\Models\TeamMember;
use App\Models\TeamPageContent;
use App\Models\Testimonial;
use App\Models\Video;
use App\Support\RichContentHtml;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $homeReachSection = HomeReachSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();
    $homeAboutSection = HomeAboutSection::first();
    $homeGallerySection = HomeGallerySection::with([
        'galleries' => fn ($q) => $q->with(['images' => fn ($iq) => $iq->orderBy('order')]),
    ])->first();
    $homeImpactStoriesSection = HomeImpactStoriesSection::with('impactStories')->first();
    $homeCoverageSection = HomeCoverageSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();
    $homeNewsSection = HomeNewsSection::with('notices')->first();
    $homeTestimonialsSection = HomeTestimonialsSection::first();
    $homePartnersSection = HomePartnersSection::first();
    $homeSupportSection = HomeSupportSection::first();
    $homeContactCtaSection = HomeContactCtaSection::first();
    $partners = Partner::orderBy('order')
        ->get()
        ->map(fn ($p) => [
            'logo_url' => $p->logo
                ? (str_starts_with($p->logo, 'http') ? $p->logo : Storage::disk('public')->url($p->logo))
                : null,
            'name' => $p->name,
            'website_url' => $p->website_url,
        ])
        ->values()
        ->all();
    $testimonials = Testimonial::where('is_published', true)
        ->orderBy('order')
        ->get()
        ->map(fn ($t) => [
            'quote' => $t->testimonial_text,
            'name' => $t->name,
            'role' => $t->designation ?? $t->organization ?? '',
            'image_url' => $t->image ? Storage::disk('public')->url($t->image) : null,
        ])
        ->values()
        ->all();

    $heroSlider = Slider::where('location', '/')
        ->with(['items' => fn ($q) => $q->orderBy('order')])
        ->first();

    $heroSlides = $heroSlider
        ? $heroSlider->items->map(fn ($i) => [
            'id' => $i->id,
            'title' => $i->title,
            'subtitle' => $i->subtitle,
            'description' => $i->description,
            'image_url' => $i->image ? Storage::disk('public')->url($i->image) : null,
            'link_url' => $i->link_url,
            'link_text' => $i->link_text,
            'order' => $i->order,
        ])->values()->all()
        : [];

                // --- NEW: Fetch videos for the video section ---
            $videosFromDb = Video::active()->take(3)->get();
            $videos = $videosFromDb->map(function ($video) {
                return [
                    'video_url' => $video->video_url,
                    'title' => $video->title,
                    'date' => $video->date?->toDateString(),
                    'thumbnail' => $video->thumbnail,
                ];
            })->toArray();

            $homeVideoSection = [
                'badge_text' => 'Featured Videos',
                'title' => "Watch Our\nImpact in Action",
                'description' => 'See how our programs are transforming lives and communities across Nepal.',
                'videos' => $videos,
            ];


    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'heroSlides' => $heroSlides,
        'homeReachSection' => $homeReachSection ? [
            'badge_text' => $homeReachSection->badge_text,
            'title' => $homeReachSection->title,
            'description' => strip_tags(
                $homeReachSection->description,
                '<p><br><strong><em><u><a><ul><ol><li><h2><h3>'
            ),
            'items' => $homeReachSection->items->map(fn ($item) => [
                'value' => $item->value,
                'suffix' => $item->suffix,
                'label' => $item->label,
                'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
                'link_url' => $item->link_url,
                'order' => $item->order,
            ])->values()->all(),
        ] : null,
        'homeAboutSection' => $homeAboutSection ? [
            'badge_text' => $homeAboutSection->badge_text,
            'title' => $homeAboutSection->title,
            'body' => $homeAboutSection->body
                ? strip_tags($homeAboutSection->body, '<p><br><strong><em><u><a><ul><ol><li><h2><h3>')
                : null,
            'card_title' => $homeAboutSection->card_title,
            'content_image_url' => $homeAboutSection->content_image
                ? Storage::disk('public')->url($homeAboutSection->content_image)
                : null,
            'background_image_url' => $homeAboutSection->background_image
                ? Storage::disk('public')->url($homeAboutSection->background_image)
                : null,
            'cta_text' => $homeAboutSection->cta_text,
            'cta_url' => $homeAboutSection->cta_url,
        ] : null,
        'homeGallerySection' => $homeGallerySection ? [
            'badge_text' => $homeGallerySection->badge_text,
            'title' => $homeGallerySection->title,
            'description' => $homeGallerySection->description,
            'cta_text' => $homeGallerySection->cta_text,
            'cta_url' => $homeGallerySection->cta_url,
            'galleries' => $homeGallerySection->galleries->map(fn ($gallery) => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'slug' => $gallery->slug,
                'description' => $gallery->description,
                'cover_image_url' => $gallery->cover_image ? Storage::disk('public')->url($gallery->cover_image) : null,
                'images' => $gallery->images->map(fn ($i) => [
                    'id' => $i->id,
                    'image_url' => $i->image_path ? Storage::disk('public')->url($i->image_path) : null,
                    'caption' => $i->caption,
                ])->values()->all(),
            ])->values()->all(),
        ] : null,
        'homeImpactStoriesSection' => $homeImpactStoriesSection ? [
            'badge_text' => $homeImpactStoriesSection->badge_text,
            'title' => $homeImpactStoriesSection->title,
            'description' => $homeImpactStoriesSection->description,
            'cta_text' => $homeImpactStoriesSection->cta_text,
            'cta_url' => $homeImpactStoriesSection->cta_url,
            'stories' => $homeImpactStoriesSection->impactStories->map(fn ($story) => [
                'id' => $story->id,
                'title' => $story->title,
                'slug' => $story->slug,
                'image_url' => $story->image ? Storage::disk('public')->url($story->image) : null,
            ])->values()->all(),
        ] : null,
        'homeCoverageSection' => $homeCoverageSection ? [
            'badge_text' => $homeCoverageSection->badge_text,
            'title' => $homeCoverageSection->title,
            'description' => $homeCoverageSection->description
                ? strip_tags($homeCoverageSection->description, '<p><br><strong><em><u><a><ul><ol><li><h2><h3>')
                : null,
            'map_image_url' => $homeCoverageSection->map_image
                ? Storage::disk('public')->url($homeCoverageSection->map_image)
                : null,
            'items' => $homeCoverageSection->items->map(fn ($item) => [
                'value' => $item->value,
                'label' => $item->label,
                'icon_url' => $item->icon ? Storage::disk('public')->url($item->icon) : null,
                'order' => $item->order,
            ])->values()->all(),
            'province_stats_endpoint_template' => route('home.coverage.provinces.show', ['provinceId' => '__provinceId__']),
        ] : null,
        'homeNewsSection' => $homeNewsSection ? [
            'badge_text' => $homeNewsSection->badge_text,
            'title' => $homeNewsSection->title,
            'description' => $homeNewsSection->description,
            'cta_text' => $homeNewsSection->cta_text,
            'cta_url' => $homeNewsSection->cta_url,
            'items' => $homeNewsSection->notices->map(fn ($notice) => [
                'title' => $notice->title,
                'image_url' => $notice->image ? Storage::disk('public')->url($notice->image) : null,
                'link_url' => '/notices/'.$notice->slug,
                'order' => $notice->pivot->order,
            ])->values()->all(),
        ] : null,
        'homeTestimonialsSection' => $homeTestimonialsSection ? [
            'badge_text' => $homeTestimonialsSection->badge_text,
            'title' => $homeTestimonialsSection->title
                ? strip_tags($homeTestimonialsSection->title, '<span><br><strong><em>')
                : null,
            'background_image_url' => $homeTestimonialsSection->background_image
                ? Storage::disk('public')->url($homeTestimonialsSection->background_image)
                : null,
        ] : null,
        'homePartnersSection' => $homePartnersSection ? [
            'badge_text' => $homePartnersSection->badge_text,
            'title' => $homePartnersSection->title,
        ] : null,
        'homeSupportSection' => $homeSupportSection ? [
            'badge_text' => $homeSupportSection->badge_text,
            'title' => $homeSupportSection->title,
            'image_url' => $homeSupportSection->image
                ? Storage::disk('public')->url($homeSupportSection->image)
                : null,
        ] : null,
        'homeContactCtaSection' => $homeContactCtaSection ? [
            'badge_text' => $homeContactCtaSection->badge_text,
            'title' => $homeContactCtaSection->title,
            'highlight_phrase' => $homeContactCtaSection->highlight_phrase,
            'button_text' => $homeContactCtaSection->button_text,
            'background_image_url' => $homeContactCtaSection->background_image
                ? Storage::disk('public')->url($homeContactCtaSection->background_image)
                : null,
        ] : null,
        'partners' => $partners,
        'testimonials' => $testimonials,
        'homeVideoSection' => $homeVideoSection,
    ]);
})->name('home');

Route::get('coverage/provinces/{provinceId}', [HomeCoverageProvinceController::class, 'show'])
    ->name('home.coverage.provinces.show');

Route::get('about', function () {
    $hero = AboutPageHero::first();
    $mainSection = AboutMainSection::first();
    $contentSection = AboutContentSection::first();
    $homeReachSection = HomeReachSection::with(['items' => fn ($q) => $q->orderBy('order')])->first();

    return Inertia::render('About', [
        'aboutPageHero' => $hero ? [
            'title' => $hero->title,
            'hero_image_url' => $hero->hero_image
                ? Storage::disk('public')->url($hero->hero_image)
                : null,
        ] : null,
        'aboutMainSection' => $mainSection ? [
            'title' => $mainSection->title,
            'body' => $mainSection->body
                ? strip_tags($mainSection->body, '<p><br><strong><em><u><a><ul><ol><li><h2><h3>')
                : null,
            'card_title' => $mainSection->card_title,
            'content_image_url' => $mainSection->content_image
                ? Storage::disk('public')->url($mainSection->content_image)
                : null,
            'background_image_url' => $mainSection->background_image
                ? Storage::disk('public')->url($mainSection->background_image)
                : null,
            'cta_text' => $mainSection->cta_text,
            'cta_url' => $mainSection->cta_url,
        ] : null,
        'aboutContentSection' => $contentSection ? [
            'paragraph_1' => $contentSection->paragraph_1,
            'paragraph_2' => $contentSection->paragraph_2,
        ] : null,
        'homeReachSection' => $homeReachSection ? [
            'badge_text' => $homeReachSection->badge_text,
            'title' => $homeReachSection->title,
            'description' => strip_tags(
                $homeReachSection->description,
                '<p><br><strong><em><u><a><ul><ol><li><h2><h3>'
            ),
            'items' => $homeReachSection->items->map(fn ($item) => [
                'value' => $item->value,
                'suffix' => $item->suffix,
                'label' => $item->label,
                'image_url' => $item->image ? Storage::disk('public')->url($item->image) : null,
                'link_url' => $item->link_url,
                'order' => $item->order,
            ])->values()->all(),
        ] : null,
    ]);
})->name('about');
Route::get('notices', function () {
    $notices = Notice::query()
        ->orderByDesc('created_at')
        ->get()
        ->map(fn (Notice $n) => [
            'id' => $n->id,
            'title' => $n->title,
            'slug' => $n->slug,
            'image_url' => $n->image ? Storage::disk('public')->url($n->image) : null,
        ])
        ->values()
        ->all();

    return Inertia::render('Archive', [
        'notices' => $notices,
    ]);
})->name('notices.index');
Route::get('notices/{notice:slug}', function (Notice $notice) {
    $notice->load([]);

    return Inertia::render('SingleArchive', [
        'notice' => [
            'id' => $notice->id,
            'title' => $notice->title,
            'slug' => $notice->slug,
            'updated_at' => $notice->updated_at?->toISOString(),
            'share_url' => url()->route('notices.show', ['notice' => $notice->slug]),
            'content' => RichContentHtml::sanitize($notice->content),
            'image_url' => $notice->image ? Storage::disk('public')->url($notice->image) : null,
        ],
        'relatedNotices' => Notice::query()
            ->where('id', '!=', $notice->id)
            ->orderByDesc('created_at')
            ->limit(3)
            ->get()
            ->map(fn (Notice $n) => [
                'id' => $n->id,
                'title' => $n->title,
                'slug' => $n->slug,
                'image_url' => $n->image ? Storage::disk('public')->url($n->image) : null,
            ])
            ->values()
            ->all(),
    ]);
})->name('notices.show');
Route::get('posts', function () {
    $posts = Post::query()
        ->published()
        ->with(['category:id,name'])
        ->orderByDesc('published_at')
        ->orderByDesc('created_at')
        ->get()
        ->map(fn (Post $p) => [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'excerpt' => $p->excerpt,
            'image_url' => $p->image ? Storage::disk('public')->url($p->image) : null,
            'published_at' => $p->published_at?->toISOString(),
            'category' => $p->category?->name,
        ])
        ->values()
        ->all();

    return Inertia::render('BlogIndex', [
        'posts' => $posts,
    ]);
})->name('posts.index');
Route::get('posts/{published_post:slug}', function (Post $published_post) {
    $published_post->load(['category:id,name', 'tags:id,name']);
    $postHero = PostHero::first();

    return Inertia::render('BlogShow', [
        'post' => [
            'id' => $published_post->id,
            'title' => $published_post->title,
            'slug' => $published_post->slug,
            'excerpt' => $published_post->excerpt,
            'published_at' => $published_post->published_at?->toISOString(),
            'share_url' => url()->route('posts.show', ['published_post' => $published_post->slug]),
            'content' => RichContentHtml::sanitize($published_post->content),
            'image_url' => $published_post->image ? Storage::disk('public')->url($published_post->image) : null,
            'category' => $published_post->category?->name,
            'tags' => $published_post->tags->pluck('name')->values()->all(),
        ],
        'relatedPosts' => Post::query()
            ->published()
            ->where('id', '!=', $published_post->id)
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->limit(3)
            ->get()
            ->map(fn (Post $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'image_url' => $p->image ? Storage::disk('public')->url($p->image) : null,
            ])
            ->values()
            ->all(),
        'postHero' => [
            'hero_image_url' => $postHero?->hero_image
                ? Storage::disk('public')->url($postHero->hero_image)
                : null,
        ],
    ]);
})->name('posts.show');
Route::get('pages/{published_page:slug}', function (Page $published_page) {
    $pageHero = PageHero::first();

    return Inertia::render('PageShow', [
        'page' => [
            'title' => $published_page->title,
            'slug' => $published_page->slug,
            'meta_title' => $published_page->meta_title,
            'meta_description' => $published_page->meta_description,
            'published_at' => $published_page->published_at?->toISOString(),
            'content' => RichContentHtml::sanitize($published_page->content),
            'share_url' => url()->route('pages.show', ['published_page' => $published_page->slug]),
        ],
        'pageHero' => [
            'hero_image_url' => $pageHero?->hero_image
                ? Storage::disk('public')->url($pageHero->hero_image)
                : null,
        ],
    ]);
})->name('pages.show');
Route::get('impact-stories', function () {
    $hero = ImpactPageHero::first();
    $section = ImpactPageSection::first();
    $stories = ImpactStory::query()
        ->orderByDesc('created_at')
        ->get()
        ->map(fn (ImpactStory $s) => [
            'id' => $s->id,
            'title' => $s->title,
            'slug' => $s->slug,
            'image_url' => $s->image ? Storage::disk('public')->url($s->image) : null,
        ])
        ->values()
        ->all();

    return Inertia::render('ImpactStories', [
        'impactPageHero' => $hero ? [
            'title' => $hero->title,
            'hero_image_url' => $hero->hero_image
                ? Storage::disk('public')->url($hero->hero_image)
                : null,
        ] : null,
        'impactPageSection' => $section ? [
            'title' => $section->title,
            'description' => $section->description,
        ] : null,
        'impactStories' => $stories,
    ]);
})->name('impact-stories');
Route::get('impact-stories/{impact_story:slug}', function (ImpactStory $impact_story) {
    $impact_story->load([]);

    return Inertia::render('SingleImpactStories', [
        'impactStory' => [
            'id' => $impact_story->id,
            'title' => $impact_story->title,
            'slug' => $impact_story->slug,
            'updated_at' => $impact_story->updated_at?->toISOString(),
            'share_url' => url()->route('impact-stories.show', ['impact_story' => $impact_story->slug]),
            'story' => RichContentHtml::sanitize($impact_story->story),
            'image_url' => $impact_story->image ? Storage::disk('public')->url($impact_story->image) : null,
        ],
        'relatedStories' => ImpactStory::query()
            ->where('id', '!=', $impact_story->id)
            ->orderByDesc('created_at')
            ->limit(3)
            ->get()
            ->map(fn (ImpactStory $s) => [
                'id' => $s->id,
                'title' => $s->title,
                'slug' => $s->slug,
                'image_url' => $s->image ? Storage::disk('public')->url($s->image) : null,
            ])
            ->values()
            ->all(),
    ]);
})->name('impact-stories.show');
Route::get('contact', [PublicContactController::class, 'show'])->name('contact');
Route::post('contact/feedback', [PublicContactController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.feedback.store');
Route::get('gallery', function () {
    $section = GalleryPageSection::first();
    $albums = Gallery::query()
        ->with(['images' => fn ($q) => $q->orderBy('order')])
        ->withCount('images')
        ->orderByDesc('created_at')
        ->get()
        ->map(fn (Gallery $g) => [
            'title' => $g->title,
            'slug' => $g->slug,
            'description' => $g->description,
            'images_count' => $g->images_count,
            'cover_image_url' => $g->cover_image
                ? Storage::disk('public')->url($g->cover_image)
                : null,
            'images' => $g->images->map(fn ($i) => [
                'id' => $i->id,
                'image_url' => $i->image_path ? Storage::disk('public')->url($i->image_path) : null,
                'caption' => $i->caption,
            ])->values()->all(),
        ])
        ->values()
        ->all();
    $partners = Partner::orderBy('order')
        ->get()
        ->map(fn ($p) => [
            'name' => $p->name,
            'logo_url' => $p->logo
                ? (str_starts_with($p->logo, 'http') ? $p->logo : Storage::disk('public')->url($p->logo))
                : null,
        ])
        ->values()
        ->all();

    return Inertia::render('Gallery', [
        'galleryPageSection' => $section ? [
            'title' => $section->title,
            'description' => $section->description,
        ] : null,
        'albums' => $albums,
        'partners' => $partners,
    ]);
})->name('gallery');
Route::get('gallery/{gallery:slug}', function (Gallery $gallery) {
    $gallery->load(['images' => fn ($q) => $q->orderBy('order')]);

    return Inertia::render('GalleryShow', [
        'gallery' => [
            'title' => $gallery->title,
            'slug' => $gallery->slug,
            'description' => $gallery->description,
            'images' => $gallery->images->map(fn ($i) => [
                'id' => $i->id,
                'image_url' => $i->image_path ? Storage::disk('public')->url($i->image_path) : null,
                'caption' => $i->caption,
            ])->values()->all(),
        ],
    ]);
})->name('gallery.show');
Route::get('team', function () {
    $content = TeamPageContent::first();
    $teamContent = $content ? [
        'title' => $content->title ?? 'Our Team',
        'description' => $content->description,
        'banner_image_url' => $content->banner_image
            ? Storage::disk('public')->url($content->banner_image)
            : null,
    ] : [
        'title' => 'Our Team',
        'description' => null,
        'banner_image_url' => null,
    ];

    $executiveMembers = TeamMember::where('type', 'executive_committee')
        ->orderBy('name')
        ->get()
        ->map(fn (TeamMember $t) => [
            'name' => $t->name,
            'department' => $t->department,
            'location' => $t->location,
            'job_title' => $t->job_title,
            'photo_url' => $t->photo ? Storage::disk('public')->url($t->photo) : null,
            'social_links' => $t->social_links ?? [],
        ])
        ->values()
        ->all();

    $staffMembers = TeamMember::where('type', 'staff')
        ->orderBy('name')
        ->get()
        ->map(fn (TeamMember $t) => [
            'name' => $t->name,
            'department' => $t->department,
            'location' => $t->location,
            'job_title' => $t->job_title,
            'photo_url' => $t->photo ? Storage::disk('public')->url($t->photo) : null,
            'social_links' => $t->social_links ?? [],
        ])
        ->values()
        ->all();

    return Inertia::render('Team', [
        'teamContent' => $teamContent,
        'executiveMembers' => $executiveMembers,
        'staffMembers' => $staffMembers,
    ]);
})->name('team');
Route::get('infographics', function () {
    $content = InfographicsPageContent::first();
    $pageContent = $content ? [
        'title' => $content->title ?? 'Infographics',
        'banner_image_url' => $content->banner_image
            ? Storage::disk('public')->url($content->banner_image)
            : null,
    ] : [
        'title' => 'Infographics',
        'banner_image_url' => null,
    ];

    $infographics = Infographic::query()
        ->orderBy('slug')
        ->orderBy('id')
        ->get()
        ->map(fn (Infographic $row) => [
            'id' => $row->id,
            'slug' => $row->slug,
            'label' => $row->displayLabel(),
        ])
        ->values()
        ->all();

    return Inertia::render('Infographics', [
        'pageContent' => $pageContent,
        'infographics' => $infographics,
    ]);
})->name('infographics');
Route::get('infographics/{infographic:slug}', function (Infographic $infographic) {
    $content = InfographicsPageContent::first();
    $pageContent = $content ? [
        'title' => $content->title ?? 'Infographics',
        'banner_image_url' => $content->banner_image
            ? Storage::disk('public')->url($content->banner_image)
            : null,
    ] : [
        'title' => 'Infographics',
        'banner_image_url' => null,
    ];

    $infographic->load(['items' => fn ($query) => $query->orderBy('sort_order')->orderBy('id')]);

    return Inertia::render('InfographicShow', [
        'pageContent' => $pageContent,
        'infographic' => [
            'id' => $infographic->id,
            'slug' => $infographic->slug,
            'label' => $infographic->displayLabel(),
            'items' => $infographic->items->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'sort_order' => $item->sort_order,
                'image_url' => Storage::disk('public')->url($item->image),
            ])->values()->all(),
        ],
    ]);
})->name('infographics.show');
Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
Route::get('reports/{document}', [ReportController::class, 'show'])
    ->whereNumber('document')
    ->name('reports.show');
Route::get('vacancy', [VacancyPageController::class, 'index'])->name('vacancy');
Route::get('vacancy/{vacancy:slug}', [VacancyPageController::class, 'show'])->name('vacancy.show');
Route::post('vacancy/{vacancy:slug}/apply', [VacancyApplicationController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('vacancy.apply');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('enssure-i', function () {
    return Inertia::render('Enssure1');
})->name('enssure1');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('videos', VideoController::class);
});



require __DIR__.'/settings.php';
