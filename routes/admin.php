<?php

use App\Http\Controllers\Admin\AboutContentSectionController;
use App\Http\Controllers\Admin\AboutMainSectionController;
use App\Http\Controllers\Admin\AboutPageHeroController;
use App\Http\Controllers\Admin\ApplicationFormController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\BatchEnrollmentController;
use App\Http\Controllers\Admin\BeneficiaryController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommitteeController;
use App\Http\Controllers\Admin\CommitteeMemberController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\ContactFeedbackContentController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\DistrictController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\EditorImageUploadController;
use App\Http\Controllers\Admin\EmailTemplateController;
use App\Http\Controllers\Admin\EoiRfpController;
use App\Http\Controllers\Admin\EoiRfpPageHeroController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\EventRegistrationController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\FooterColumnController;
use App\Http\Controllers\Admin\FooterLinkController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\GalleryImageController;
use App\Http\Controllers\Admin\GalleryPageSectionController;
use App\Http\Controllers\Admin\HomeAboutSectionController;
use App\Http\Controllers\Admin\HomeContactCtaSectionController;
use App\Http\Controllers\Admin\HomeCoverageSectionController;
use App\Http\Controllers\Admin\HomeCoverageSectionItemController;
use App\Http\Controllers\Admin\HomeGallerySectionController;
use App\Http\Controllers\Admin\HomeImpactStoriesSectionController;
use App\Http\Controllers\Admin\HomeNewsSectionController;
use App\Http\Controllers\Admin\HomePartnersSectionController;
use App\Http\Controllers\Admin\HomeReachItemController;
use App\Http\Controllers\Admin\HomeReachSectionController;
use App\Http\Controllers\Admin\HomeSupportSectionController;
use App\Http\Controllers\Admin\HomeTestimonialsSectionController;
use App\Http\Controllers\Admin\ImpactPageHeroController;
use App\Http\Controllers\Admin\ImpactPageSectionController;
use App\Http\Controllers\Admin\ImpactStoryController;
use App\Http\Controllers\Admin\ImportantPopupController;
use App\Http\Controllers\Admin\InfographicController;
use App\Http\Controllers\Admin\InfographicItemController;
use App\Http\Controllers\Admin\InfographicsPageContentController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\NewsTickerItemController;
use App\Http\Controllers\Admin\NoticeController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PageHeroController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PostHeroController;
use App\Http\Controllers\Admin\ProvinceController;
use App\Http\Controllers\Admin\PublicationController;
use App\Http\Controllers\Admin\RedirectController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\SliderItemController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TeamPageContentController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TrainingBatchController;
use App\Http\Controllers\Admin\TrainingProgramController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VacancyApplicationController;
use App\Http\Controllers\Admin\VacancyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin routes (role: admin|super_admin)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:admin|super_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn () => redirect()->route('dashboard'))->name('index');
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class)->except(['show']);

    // Home Page
    Route::resource('sliders', SliderController::class);
    Route::post('sliders/{slider}/items', [SliderItemController::class, 'store'])->name('sliders.items.store');
    Route::get('slider-items/{slider_item}/edit', [SliderItemController::class, 'edit'])->name('slider-items.edit');
    Route::put('slider-items/{slider_item}', [SliderItemController::class, 'update'])->name('slider-items.update');
    Route::delete('slider-items/{slider_item}', [SliderItemController::class, 'destroy'])->name('slider-items.destroy');
    Route::post('slider-items/reorder', [SliderItemController::class, 'reorder'])->name('slider-items.reorder');

    Route::resource('banners', BannerController::class);
    Route::resource('statistics', StatisticController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('partners', PartnerController::class);
    Route::resource('galleries', GalleryController::class);
    Route::post('galleries/{gallery}/images', [GalleryImageController::class, 'store'])->name('galleries.images.store');
    Route::put('gallery-images/{gallery_image}', [GalleryImageController::class, 'update'])->name('gallery-images.update');
    Route::delete('gallery-images/{gallery_image}', [GalleryImageController::class, 'destroy'])->name('gallery-images.destroy');

    Route::post('editor-images', EditorImageUploadController::class)->name('editor_images.store');
    Route::resource('impact_stories', ImpactStoryController::class)->except(['show']);
    Route::get('posts/hero/edit', [PostHeroController::class, 'edit'])->name('posts.hero.edit');
    Route::put('posts/hero', [PostHeroController::class, 'update'])->name('posts.hero.update');
    Route::resource('posts', PostController::class)->except(['show']);
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('tags', TagController::class)->except(['show']);
    Route::get('pages/hero/edit', [PageHeroController::class, 'edit'])->name('pages.hero.edit');
    Route::put('pages/hero', [PageHeroController::class, 'update'])->name('pages.hero.update');
    Route::resource('pages', PageController::class)->except(['show']);
    Route::resource('notices', NoticeController::class)->except(['show']);
    Route::resource('important-popups', ImportantPopupController::class)
        ->parameters(['important-popups' => 'important_popup'])
        ->names('important_popups')
        ->except(['show']);
    Route::resource('vacancies', VacancyController::class)->except(['show']);
    Route::get('vacancy-applications', [VacancyApplicationController::class, 'index'])->name('vacancy_applications.index');
    Route::get('vacancy-applications/{vacancy_application}', [VacancyApplicationController::class, 'show'])->name('vacancy_applications.show');
    Route::delete('vacancy-applications/{vacancy_application}', [VacancyApplicationController::class, 'destroy'])->name('vacancy_applications.destroy');
    Route::resource('menus', MenuController::class)->except(['show']);
    Route::post('menus/{menu}/items', [MenuItemController::class, 'store'])->name('menus.items.store');
    Route::get('menu-items/{menu_item}/edit', [MenuItemController::class, 'edit'])->name('menu-items.edit');
    Route::put('menu-items/{menu_item}', [MenuItemController::class, 'update'])->name('menu-items.update');
    Route::delete('menu-items/{menu_item}', [MenuItemController::class, 'destroy'])->name('menu-items.destroy');

    Route::resource('training_programs', TrainingProgramController::class)->except(['show']);
    Route::resource('courses', CourseController::class)->except(['show']);
    Route::resource('training_batches', TrainingBatchController::class)->except(['show']);
    Route::resource('beneficiaries', BeneficiaryController::class)->except(['show']);
    Route::resource('batch_enrollments', BatchEnrollmentController::class)->except(['show']);

    Route::resource('committees', CommitteeController::class)->except(['show']);
    Route::post('committees/{committee}/members', [CommitteeMemberController::class, 'store'])->name('committees.members.store');
    Route::get('committee-members/{committee_member}/edit', [CommitteeMemberController::class, 'edit'])->name('committee-members.edit');
    Route::put('committee-members/{committee_member}', [CommitteeMemberController::class, 'update'])->name('committee-members.update');
    Route::delete('committee-members/{committee_member}', [CommitteeMemberController::class, 'destroy'])->name('committee-members.destroy');
    Route::resource('provinces', ProvinceController::class)->except(['show']);
    Route::resource('districts', DistrictController::class)->except(['show']);
    Route::post('documents/reorder', [DocumentController::class, 'reorder'])->name('documents.reorder');
    Route::resource('documents', DocumentController::class)->except(['show']);
    Route::get('team_members/executive', [TeamMemberController::class, 'index'])->name('team_members.executive_index');
    Route::get('team_members/staff', [TeamMemberController::class, 'index'])->name('team_members.staff_index');
    Route::resource('team_members', TeamMemberController::class)->except(['show']);
    Route::get('team-page/content/edit', [TeamPageContentController::class, 'edit'])->name('team_page_content.edit');
    Route::put('team-page/content', [TeamPageContentController::class, 'update'])->name('team_page_content.update');

    Route::get('/infographics/dashboard', [InfographicController::class, 'dashboard'])->name('infographics.dashboard');
    // Infographic CRUD
    Route::post('/infographics', [InfographicController::class, 'store'])->name('admin.infographics.store');
    Route::put('/infographics/{infographic}', [InfographicController::class, 'update'])->name('admin.infographics.update');
    Route::delete('/infographics/{infographic}', [InfographicController::class, 'destroy'])->name('admin.infographics.destroy');
    Route::post('/infographics/reorder', [InfographicController::class, 'reorder'])->name('admin.infographics.reorder');
    // Item CRUD + reorder
    Route::post('/infographics/{infographic}/items', [InfographicItemController::class, 'store'])->name('admin.infographic-items.store');
    Route::put('/infographic-items/{id}', [InfographicItemController::class, 'update'])->name('admin.infographic-items.update');
    Route::delete('/infographic-items/{id}', [InfographicItemController::class, 'destroy'])->name('admin.infographic-items.destroy');
    Route::post('/infographics/{infographic}/items/reorder', [InfographicItemController::class, 'reorder'])->name('admin.infographic-items.reorder');
    // Page content (listing page hero)
    Route::put('/infographics-page/content', [InfographicsPageContentController::class, 'update'])->name('admin.infographics-page.update');

    Route::get('contact-feedback-content/edit', [ContactFeedbackContentController::class, 'edit'])->name('contact_feedback_content.edit');
    Route::put('contact-feedback-content', [ContactFeedbackContentController::class, 'update'])->name('contact_feedback_content.update');
    Route::resource('events', EventController::class)->except(['show']);
    Route::post('events/{event}/registrations', [EventRegistrationController::class, 'store'])->name('events.registrations.store');
    Route::get('event-registrations/{event_registration}/edit', [EventRegistrationController::class, 'edit'])->name('event-registrations.edit');
    Route::put('event-registrations/{event_registration}', [EventRegistrationController::class, 'update'])->name('event-registrations.update');
    Route::delete('event-registrations/{event_registration}', [EventRegistrationController::class, 'destroy'])->name('event-registrations.destroy');
    Route::resource('newsletters', NewsletterController::class)->except(['show']);
    Route::resource('news_ticker_items', NewsTickerItemController::class)->except(['show']);
    Route::get('home-about-section/edit', [HomeAboutSectionController::class, 'edit'])->name('home_about_sections.edit');
    Route::put('home-about-section', [HomeAboutSectionController::class, 'update'])->name('home_about_sections.update');
    Route::get('home-impact-stories-section/edit', [HomeImpactStoriesSectionController::class, 'edit'])->name('home_impact_stories_sections.edit');
    Route::put('home-impact-stories-section', [HomeImpactStoriesSectionController::class, 'update'])->name('home_impact_stories_sections.update');
    Route::get('home-gallery-section/edit', [HomeGallerySectionController::class, 'edit'])->name('home_gallery_sections.edit');
    Route::put('home-gallery-section', [HomeGallerySectionController::class, 'update'])->name('home_gallery_sections.update');
    Route::get('impact-and-milestones/edit', [HomeReachSectionController::class, 'edit'])->name('home_reach_sections.edit');
    Route::put('impact-and-milestones', [HomeReachSectionController::class, 'update'])->name('home_reach_sections.update');
    Route::post('impact-and-milestones/items', [HomeReachItemController::class, 'store'])->name('home_reach_sections.items.store');
    Route::get('impact-and-milestones-items/{home_reach_item}/edit', [HomeReachItemController::class, 'edit'])->name('home_reach_items.edit');
    Route::put('impact-and-milestones-items/{home_reach_item}', [HomeReachItemController::class, 'update'])->name('home_reach_items.update');
    Route::delete('impact-and-milestones-items/{home_reach_item}', [HomeReachItemController::class, 'destroy'])->name('home_reach_items.destroy');
    Route::post('impact-and-milestones-items/reorder', [HomeReachItemController::class, 'reorder'])->name('impact-and-milestones-items.reorder');
    Route::get('home-coverage-section/edit', [HomeCoverageSectionController::class, 'edit'])->name('home_coverage_sections.edit');
    Route::put('home-coverage-section', [HomeCoverageSectionController::class, 'update'])->name('home_coverage_sections.update');
    Route::post('home-coverage-section/items', [HomeCoverageSectionItemController::class, 'store'])->name('home_coverage_sections.items.store');
    Route::get('home-coverage-section-items/{home_coverage_section_item}/edit', [HomeCoverageSectionItemController::class, 'edit'])->name('home_coverage_section_items.edit');
    Route::put('home-coverage-section-items/{home_coverage_section_item}', [HomeCoverageSectionItemController::class, 'update'])->name('home_coverage_section_items.update');
    Route::delete('home-coverage-section-items/{home_coverage_section_item}', [HomeCoverageSectionItemController::class, 'destroy'])->name('home_coverage_section_items.destroy');
    Route::get('home-news-section/edit', [HomeNewsSectionController::class, 'edit'])->name('home_news_sections.edit');
    Route::put('home-news-section', [HomeNewsSectionController::class, 'update'])->name('home_news_sections.update');
    Route::get('home-testimonials-section/edit', [HomeTestimonialsSectionController::class, 'edit'])->name('home_testimonials_sections.edit');
    Route::put('home-testimonials-section', [HomeTestimonialsSectionController::class, 'update'])->name('home_testimonials_sections.update');
    Route::post('testimonials/reorder', [TestimonialController::class, 'reorder'])->name('testimonials.reorder');
    Route::get('home-partners-section/edit', [HomePartnersSectionController::class, 'edit'])->name('home_partners_sections.edit');
    Route::put('home-partners-section', [HomePartnersSectionController::class, 'update'])->name('home_partners_sections.update');
    Route::post('partners/reorder', [PartnerController::class, 'reorder'])->name('partners.reorder');
    Route::get('home-support-section/edit', [HomeSupportSectionController::class, 'edit'])->name('home_support_sections.edit');
    Route::put('home-support-section', [HomeSupportSectionController::class, 'update'])->name('home_support_sections.update');
    Route::get('home-contact-cta-section/edit', [HomeContactCtaSectionController::class, 'edit'])->name('home_contact_cta_sections.edit');
    Route::put('home-contact-cta-section', [HomeContactCtaSectionController::class, 'update'])->name('home_contact_cta_sections.update');
    Route::get('about-page/hero/edit', [AboutPageHeroController::class, 'edit'])->name('about_page_hero.edit');
    Route::put('about-page/hero', [AboutPageHeroController::class, 'update'])->name('about_page_hero.update');

    Route::get('gallery-page/section/edit', [GalleryPageSectionController::class, 'edit'])->name('gallery_page_section.edit');
    Route::put('gallery-page/section', [GalleryPageSectionController::class, 'update'])->name('gallery_page_section.update');
    Route::get('about-page/main-section/edit', [AboutMainSectionController::class, 'edit'])->name('about_main_sections.edit');
    Route::put('about-page/main-section', [AboutMainSectionController::class, 'update'])->name('about_main_sections.update');
    Route::get('about-page/content-section/edit', [AboutContentSectionController::class, 'edit'])->name('about_content_sections.edit');
    Route::put('about-page/content-section', [AboutContentSectionController::class, 'update'])->name('about_content_sections.update');
    Route::get('impact-page/hero/edit', [ImpactPageHeroController::class, 'edit'])->name('impact_page_hero.edit');
    Route::put('impact-page/hero', [ImpactPageHeroController::class, 'update'])->name('impact_page_hero.update');
    Route::get('impact-page/section/edit', [ImpactPageSectionController::class, 'edit'])->name('impact_page_sections.edit');
    Route::put('impact-page/section', [ImpactPageSectionController::class, 'update'])->name('impact_page_sections.update');
    Route::resource('footer-columns', FooterColumnController::class)->parameters(['footer-columns' => 'footer_column'])->except(['show']);
    Route::post('footer-columns/{footer_column}/links', [FooterLinkController::class, 'store'])->name('footer_columns.links.store');
    Route::get('footer-links/{footer_link}/edit', [FooterLinkController::class, 'edit'])->name('footer_links.edit');
    Route::put('footer-links/{footer_link}', [FooterLinkController::class, 'update'])->name('footer_links.update');
    Route::delete('footer-links/{footer_link}', [FooterLinkController::class, 'destroy'])->name('footer_links.destroy');
    Route::get('site-settings/edit', [SiteSettingController::class, 'edit'])->name('site_settings.edit');
    Route::put('site-settings', [SiteSettingController::class, 'update'])->name('site_settings.update');
    Route::resource('faqs', FaqController::class)->except(['show']);
    Route::resource('publications', PublicationController::class)->except(['show']);
    Route::resource('contacts', ContactController::class)->except(['show']);
    Route::resource('application_forms', ApplicationFormController::class)->except(['show']);
    Route::resource('settings', SettingController::class)->except(['show']);
    Route::resource('email_templates', EmailTemplateController::class)->except(['show']);
    Route::resource('redirects', RedirectController::class)->except(['show']);
    Route::resource('media', MediaController::class)->except(['show']);
    Route::resource('feedback', FeedbackController::class)->only(['index', 'show', 'destroy']);

    // Hero for the combined listing page (one hero for both types)
    Route::get('eoi-rfp/hero', [EoiRfpPageHeroController::class, 'edit'])->name('admin.eoi-rfp.hero.edit');
    Route::put('eoi-rfp/hero', [EoiRfpPageHeroController::class, 'update'])->name('admin.eoi-rfp.hero.update');

    // Content management (items)
    Route::resource('eoi-rfp', EoiRfpController::class)->except(['show']);
    Route::post('eoi-rfp/reorder', [EoiRfpController::class, 'reorder'])->name('eoi-rfp.reorder');

});
