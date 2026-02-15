<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. categories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->timestamps();
        });

        // 2. tags
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // 3. pages
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('pages')->nullOnDelete();
            $table->timestamp('published_at')->nullable();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        // 4. posts
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('posts', function (Blueprint $table) {
            $table->index('published_at');
        });

        // 5. post_tag pivot
        Schema::create('post_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['post_id', 'tag_id']);
        });

        // 6. menus
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->default('header'); // header, footer, sidebar
            $table->timestamps();
        });

        // 7. menu_items
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('menu_items')->cascadeOnDelete();
            $table->string('title');
            $table->string('url')->nullable();
            $table->foreignId('post_id')->nullable()->constrained()->nullOnDelete();
            $table->string('target', 10)->default('_self'); // _self, _blank
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // 8. provinces
        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedTinyInteger('province_number')->nullable();
            $table->string('capital')->nullable();
            $table->boolean('is_covered')->default(false);
            $table->timestamps();
        });

        // 9. districts
        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('province_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();
        });

        // 10. training_programs
        Schema::create('training_programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('program_type')->nullable(); // dual_vet, training_with_ojt, workers_training, career_guidance
            $table->text('description')->nullable();
            $table->string('duration')->nullable();
            $table->string('level')->nullable();
            $table->timestamps();
        });

        // 11. courses
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('training_program_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('course_code')->nullable();
            $table->string('duration')->nullable();
            $table->text('prerequisites')->nullable();
            $table->string('syllabus_file')->nullable();
            $table->string('guideline_file')->nullable();
            $table->timestamps();
        });

        // 12. beneficiaries
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('gender', 20)->nullable(); // male, female, other
            $table->date('date_of_birth')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('province')->nullable();
            $table->string('district')->nullable();
            $table->string('municipality')->nullable();
            $table->date('completion_date')->nullable();
            $table->string('status', 20)->default('enrolled'); // enrolled, ongoing, completed, dropped
            $table->timestamps();
        });

        // 13. training_batches
        Schema::create('training_batches', function (Blueprint $table) {
            $table->id();
            $table->string('batch_name');
            $table->string('batch_code')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('training_center')->nullable();
            $table->string('instructor_name')->nullable();
            $table->unsignedInteger('max_capacity')->nullable();
            $table->unsignedInteger('current_enrollment')->default(0);
            $table->string('status', 20)->default('upcoming'); // upcoming, ongoing, completed, cancelled
            $table->text('schedule_details')->nullable();
            $table->timestamps();
        });

        // 14. batch_enrollments
        Schema::create('batch_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_id')->constrained('training_batches')->cascadeOnDelete();
            $table->foreignId('beneficiary_id')->constrained()->cascadeOnDelete();
            $table->date('enrollment_date')->nullable();
            $table->string('status', 20)->default('active'); // active, completed, dropped, transferred
            $table->decimal('completion_percentage', 5, 2)->nullable();
            $table->string('final_grade', 10)->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });

        // 15. impact_stories, notices, vacancies
        Schema::create('impact_stories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('person_name')->nullable();
            $table->string('person_title')->nullable();
            $table->string('location')->nullable();
            $table->longText('story')->nullable();
            $table->string('image')->nullable();
            $table->string('video_url')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('notice_type', 50)->nullable(); // eoi, rfp, financial_proposal, vacancy, general
            $table->longText('content')->nullable();
            $table->string('attachment')->nullable();
            $table->date('deadline_date')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('position_title');
            $table->string('slug')->unique();
            $table->longText('job_description')->nullable();
            $table->text('requirements')->nullable();
            $table->string('location')->nullable();
            $table->string('job_type', 30)->nullable(); // full_time, part_time, contract, temporary
            $table->unsignedInteger('number_of_positions')->default(1);
            $table->date('application_deadline')->nullable();
            $table->text('application_instructions')->nullable();
            $table->string('tor_file')->nullable();
            $table->string('status', 30)->default('open');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // 16. committees
        Schema::create('committees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('committee_type', 20)->nullable(); // pac, psc, pic, pcc
            $table->text('description')->nullable();
            $table->date('formation_date')->nullable();
            $table->timestamps();
        });

        // 17. committee_members
        Schema::create('committee_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('committee_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('position')->nullable();
            $table->text('bio')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // 18. documents, galleries, gallery_images, banners, partners
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('document_type', 50)->nullable(); // report, guideline, course_material, application_form, policy, other
            $table->string('file_path');
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('file_extension', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->date('event_date')->nullable();
            $table->timestamps();
        });

        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallery_id')->constrained()->cascadeOnDelete();
            $table->string('image_path');
            $table->string('caption')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_url')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->string('website_url')->nullable();
            $table->string('partner_type', 30)->nullable(); // government, development, private, technical, other
            $table->text('description')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // 19. settings
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type', 20)->default('text'); // text, textarea, boolean, number, json
            $table->string('group', 50)->default('general');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 20. contacts, application_forms
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->timestamp('replied_at')->nullable();
            $table->foreignId('replied_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('application_forms', function (Blueprint $table) {
            $table->id();
            $table->string('applicant_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('course_interest')->nullable();
            $table->json('application_data')->nullable();
            $table->json('attachments')->nullable();
            $table->string('status', 20)->default('pending'); // pending, reviewed, approved, rejected
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 21. testimonials, events, event_registrations
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('designation')->nullable();
            $table->string('organization')->nullable();
            $table->string('image')->nullable();
            $table->text('testimonial_text');
            $table->unsignedTinyInteger('rating')->nullable(); // 1-5
            $table->foreignId('course_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('description')->nullable();
            $table->string('event_type', 30)->nullable(); // training, workshop, seminar, conference, meeting, other
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->string('venue')->nullable();
            $table->text('address')->nullable();
            $table->string('organizer')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone', 20)->nullable();
            $table->boolean('registration_required')->default(false);
            $table->date('registration_deadline')->nullable();
            $table->unsignedInteger('max_participants')->nullable();
            $table->string('featured_image')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->json('additional_info')->nullable();
            $table->string('status', 20)->default('pending'); // pending, confirmed, cancelled
            $table->timestamps();
        });

        // 22. newsletters, faqs, team_members, publications, statistics
        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->longText('answer');
            $table->string('category', 100)->nullable();
            $table->unsignedInteger('views_count')->default(0);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('job_title')->nullable();
            $table->string('department')->nullable();
            $table->string('photo')->nullable();
            $table->text('bio')->nullable();
            $table->text('qualifications')->nullable();
            $table->text('expertise')->nullable();
            $table->json('social_links')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('authors')->nullable();
            $table->string('publication_type', 50)->nullable(); // research_paper, policy_brief, report, case_study, article, book
            $table->text('abstract')->nullable();
            $table->longText('content')->nullable();
            $table->date('publication_date')->nullable();
            $table->string('publisher')->nullable();
            $table->string('isbn', 50)->nullable();
            $table->string('doi', 100)->nullable();
            $table->string('file_path')->nullable();
            $table->string('cover_image')->nullable();
            $table->unsignedInteger('download_count')->default(0);
            $table->timestamps();
        });

        Schema::create('statistics', function (Blueprint $table) {
            $table->id();
            $table->string('stat_key')->unique();
            $table->string('stat_label')->nullable();
            $table->string('stat_value')->nullable();
            $table->string('stat_prefix', 10)->nullable(); // e.g. +, $
            $table->string('stat_suffix', 10)->nullable(); // e.g. %, K, M
            $table->string('icon')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // 23. feedback, translations, media, email_templates, notifications, search_logs, redirects
        Schema::create('feedback', function (Blueprint $table) {
            $table->id();
            $table->string('feedback_type', 30)->nullable(); // training, website, general
            $table->string('feedbackable_type');
            $table->unsignedBigInteger('feedbackable_id');
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->text('feedback_text');
            $table->boolean('is_public')->default(false);
            $table->foreignId('responded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('response')->nullable();
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            $table->index(['feedbackable_type', 'feedbackable_id']);
        });

        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('translatable_type');
            $table->unsignedBigInteger('translatable_id');
            $table->string('locale', 10); // en, ne
            $table->string('field_name');
            $table->text('translated_value')->nullable();
            $table->timestamps();
            $table->unique(['translatable_type', 'translatable_id', 'locale', 'field_name'], 'translations_poly_locale_field_unique');
        });

        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('path');
            $table->string('file_type', 30)->nullable(); // image, video, document, audio
            $table->string('mime_type', 100)->nullable();
            $table->unsignedBigInteger('file_size')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->string('folder')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('subject')->nullable();
            $table->longText('body')->nullable();
            $table->json('variables')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type')->nullable();
            $table->string('title')->nullable();
            $table->text('message')->nullable();
            $table->json('data')->nullable();
            $table->string('link')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });

        Schema::create('search_logs', function (Blueprint $table) {
            $table->id();
            $table->string('search_query');
            $table->unsignedInteger('results_count')->default(0);
            $table->string('ip_address', 45)->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('redirects', function (Blueprint $table) {
            $table->id();
            $table->string('old_url');
            $table->string('new_url');
            $table->unsignedSmallInteger('status_code')->default(301); // 301, 302
            $table->unsignedInteger('hit_count')->default(0);
            $table->timestamps();
            $table->unique('old_url');
        });

        // 24. sliders, slider_items
        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->nullable(); // home, about, training, etc.
            $table->timestamps();
        });

        Schema::create('slider_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('slider_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('link_url')->nullable();
            $table->string('link_text')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // 25. page_sections
        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->string('section_type', 50)->nullable(); // text, image, video, gallery, stats, etc.
            $table->string('title')->nullable();
            $table->longText('content')->nullable();
            $table->json('data')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // 26. activity_logs
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('log_name')->nullable();
            $table->text('description');
            $table->string('subject_type')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->string('causer_type')->nullable();
            $table->unsignedBigInteger('causer_id')->nullable();
            $table->json('properties')->nullable();
            $table->string('user_agent', 1024)->nullable();
            $table->timestamps();
            $table->index(['subject_type', 'subject_id']);
            $table->index(['causer_type', 'causer_id']);
        });

        // 27. seo_meta (polymorphic)
        Schema::create('seo_meta', function (Blueprint $table) {
            $table->id();
            $table->string('seoable_type');
            $table->unsignedBigInteger('seoable_id');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('twitter_card', 30)->nullable(); // summary, summary_large_image
            $table->string('canonical_url')->nullable();
            $table->timestamps();
            $table->index(['seoable_type', 'seoable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = [
            'seo_meta',
            'activity_logs',
            'page_sections',
            'slider_items',
            'sliders',
            'redirects',
            'search_logs',
            'notifications',
            'email_templates',
            'media',
            'translations',
            'feedback',
            'statistics',
            'publications',
            'team_members',
            'faqs',
            'newsletters',
            'event_registrations',
            'events',
            'testimonials',
            'application_forms',
            'contacts',
            'settings',
            'partners',
            'banners',
            'gallery_images',
            'galleries',
            'documents',
            'committee_members',
            'committees',
            'vacancies',
            'notices',
            'impact_stories',
            'batch_enrollments',
            'training_batches',
            'beneficiaries',
            'courses',
            'training_programs',
            'districts',
            'provinces',
            'menu_items',
            'menus',
            'post_tag',
            'posts',
            'pages',
            'tags',
            'categories',
        ];

        foreach ($tables as $table) {
            Schema::dropIfExists($table);
        }
    }
};
