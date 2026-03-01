<?php

use App\Http\Controllers\Admin\ApplicationFormController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\BatchEnrollmentController;
use App\Http\Controllers\Admin\BeneficiaryController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommitteeController;
use App\Http\Controllers\Admin\CommitteeMemberController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\DistrictController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\EmailTemplateController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\EventRegistrationController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\GalleryImageController;
use App\Http\Controllers\Admin\HomeAboutSectionController;
use App\Http\Controllers\Admin\HomeReachItemController;
use App\Http\Controllers\Admin\HomeReachSectionController;
use App\Http\Controllers\Admin\ImpactStoryController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\NewsTickerItemController;
use App\Http\Controllers\Admin\NoticeController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProvinceController;
use App\Http\Controllers\Admin\PublicationController;
use App\Http\Controllers\Admin\RedirectController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\SliderItemController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\TrainingBatchController;
use App\Http\Controllers\Admin\TrainingProgramController;
use App\Http\Controllers\Admin\UserController;
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

    Route::resource('banners', BannerController::class);
    Route::resource('statistics', StatisticController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('partners', PartnerController::class);
    Route::resource('galleries', GalleryController::class);
    Route::post('galleries/{gallery}/images', [GalleryImageController::class, 'store'])->name('galleries.images.store');
    Route::put('gallery-images/{gallery_image}', [GalleryImageController::class, 'update'])->name('gallery-images.update');
    Route::delete('gallery-images/{gallery_image}', [GalleryImageController::class, 'destroy'])->name('gallery-images.destroy');

    Route::resource('impact_stories', ImpactStoryController::class)->except(['show']);
    Route::resource('posts', PostController::class)->except(['show']);
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('tags', TagController::class)->except(['show']);
    Route::resource('pages', PageController::class)->except(['show']);
    Route::resource('notices', NoticeController::class)->except(['show']);
    Route::resource('vacancies', VacancyController::class)->except(['show']);
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
    Route::resource('documents', DocumentController::class)->except(['show']);
    Route::resource('team_members', TeamMemberController::class)->except(['show']);
    Route::resource('events', EventController::class)->except(['show']);
    Route::post('events/{event}/registrations', [EventRegistrationController::class, 'store'])->name('events.registrations.store');
    Route::get('event-registrations/{event_registration}/edit', [EventRegistrationController::class, 'edit'])->name('event-registrations.edit');
    Route::put('event-registrations/{event_registration}', [EventRegistrationController::class, 'update'])->name('event-registrations.update');
    Route::delete('event-registrations/{event_registration}', [EventRegistrationController::class, 'destroy'])->name('event-registrations.destroy');
    Route::resource('newsletters', NewsletterController::class)->except(['show']);
    Route::resource('news_ticker_items', NewsTickerItemController::class)->except(['show']);
    Route::get('home-about-section/edit', [HomeAboutSectionController::class, 'edit'])->name('home_about_sections.edit');
    Route::put('home-about-section', [HomeAboutSectionController::class, 'update'])->name('home_about_sections.update');
    Route::get('home-reach-section/edit', [HomeReachSectionController::class, 'edit'])->name('home_reach_sections.edit');
    Route::put('home-reach-section', [HomeReachSectionController::class, 'update'])->name('home_reach_sections.update');
    Route::post('home-reach-section/items', [HomeReachItemController::class, 'store'])->name('home_reach_sections.items.store');
    Route::get('home-reach-items/{home_reach_item}/edit', [HomeReachItemController::class, 'edit'])->name('home_reach_items.edit');
    Route::put('home-reach-items/{home_reach_item}', [HomeReachItemController::class, 'update'])->name('home_reach_items.update');
    Route::delete('home-reach-items/{home_reach_item}', [HomeReachItemController::class, 'destroy'])->name('home_reach_items.destroy');
    Route::resource('faqs', FaqController::class)->except(['show']);
    Route::resource('publications', PublicationController::class)->except(['show']);
    Route::resource('contacts', ContactController::class)->except(['show']);
    Route::resource('application_forms', ApplicationFormController::class)->except(['show']);
    Route::resource('settings', SettingController::class)->except(['show']);
    Route::resource('email_templates', EmailTemplateController::class)->except(['show']);
    Route::resource('redirects', RedirectController::class)->except(['show']);
    Route::resource('media', MediaController::class)->except(['show']);
    Route::resource('feedback', FeedbackController::class)->except(['show']);
});
