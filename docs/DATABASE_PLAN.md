# ENSSURE Database Schema Plan (from Excel + PDF)

**Sources:** [enssure_database_complete.xlsx](/Users/raja/Downloads/enssure_database_complete.xlsx), [Index1.pdf](/Users/raja/Downloads/Index1.pdf)

This plan defines the full database structure for the dynamic ENSSURE website. The Excel workbook is the **authoritative source** for table and column definitions; the PDF describes the homepage content that must be dynamic.

---

## 1. Table inventory (from Excel)

**Sheets:** Database Overview, Enhanced Tables, Feature Summary, users, pages, posts, categories, impact_stories, notices, vacancies, training_programs, courses, beneficiaries, Additional Tables, Relationships, Implementation Notes.

### Core (already or to extend)
- **users** – Existing Laravel table; Excel adds `role` (admin, editor, viewer), `is_active` (boolean). Project already uses Spatie Permission (roles), so consider aligning `role` or keeping role-only via Spatie.
- **pages** – Static/CMS pages: title, content, meta_title, meta_description, parent_id, published_at, updated_by, deleted_at.
- **posts** – Blog/news: title, excerpt, content, image, category_id, slug, author, published_at, deleted_at.
- **categories** – name, slug, description, parent_id (self).

### Content & impact
- **impact_stories** – title, slug, person_name, person_title, location, story, image, video_url, published_at, order, deleted_at.
- **notices** – title, slug, notice_type (eoi, rfp, financial_proposal, vacancy, general), content, attachment, deadline_date, is_featured, published_at, deleted_at.
- **vacancies** – position_title, job_description, requirements, location, job_type, number_of_positions, application_deadline, application_instructions, tor_file, status, published_at, deleted_at.

### Training
- **training_programs** – name, slug, program_type (dual_vet, training_with_ojt, workers_training, career_guidance), description, duration, level.
- **courses** – training_program_id (FK), name, description, course_code, duration, prerequisites, syllabus_file, guideline_file.
- **beneficiaries** – full_name, gender, date_of_birth, contact_number, province, district, municipality, completion_date, status (enrolled, ongoing, completed, dropped).
- **training_batches** – batch_name, batch_code, start_date, end_date, training_center, instructor_name, max_capacity, current_enrollment, status (upcoming, ongoing, completed, cancelled), schedule_details.
- **batch_enrollments** – batch_id (FK), beneficiary_id (FK), enrollment_date, status (active, completed, dropped, transferred), completion_percentage, final_grade, remarks.

### Additional (from “Additional Tables” sheet)
- **committees** – name, committee_type (pac, psc, pic, pcc), description, formation_date.
- **committee_members** – committee_id (FK), name, position, bio, image, order.
- **documents** – title, description, document_type (report, guideline, course_material, application_form, policy, other), file_path, file_size, file_extension.
- **galleries** – title, description, event_date, slug.
- **gallery_images** – gallery_id (FK), image_path, caption, order.
- **banners** – title, subtitle, description, image_path, button_text, button_url, order, is_active (homepage hero).
- **partners** – name, logo, website_url, partner_type (government, development, private, technical, other), description, order.
- **provinces** – name, province_number, capital, is_covered.
- **districts** – province_id (FK), name.
- **contacts** – name, email, subject, message, replied_at, replied_by.
- **application_forms** – applicant_name, email, phone, address, course_interest, application_data (json), attachments (json), status (pending, reviewed, approved, rejected), reviewed_by, reviewed_at, notes.
- **settings** – key (unique), value (text), type (text, textarea, boolean, number, json), group (default: general), description.
- **menus** – name, location (header, footer, sidebar).
- **menu_items** – menu_id (FK), parent_id (FK self, nullable), title, url, post_id (nullable FK), target (_self, _blank), order.
- **activity_logs** – log_name, description, subject_type, subject_id, causer_type, causer_id, properties (json), user_agent.
- **seo_meta** – polymorphic: seoable_type, seoable_id, meta_title, meta_description, meta_keywords, og_*, twitter_card, canonical_url.
- **tags** – name, slug.
- **post_tag** – post_id (FK), tag_id (FK), created_at (pivot).

### Enhanced (from “Enhanced Tables” sheet)
- **testimonials** – name, designation, organization, image, testimonial_text, rating (1–5), course_id (nullable FK), is_featured, is_published, order.
- **events** – title, slug, description, event_type, start_date, end_date, venue, address, organizer, contact_person, contact_email, contact_phone, registration_required, registration_deadline, max_participants, featured_image, created_by (FK users), deleted_at.
- **event_registrations** – event_id (FK), name, email, phone, additional_info (json), status (pending, confirmed, cancelled).
- **newsletters** – email, name, is_active, verified_at, unsubscribed_at.
- **faqs** – question, answer, category, views_count, order.
- **team_members** – name, job_title, department, photo, bio, qualifications, expertise, social_links (json), order.
- **publications** – title, authors, publication_type, abstract, content, publication_date, publisher, isbn, doi, file_path, cover_image, download_count.
- **statistics** – stat_key, stat_label, stat_value, stat_prefix, stat_suffix, icon, is_visible, order (homepage counters).
- **feedback** – feedback_type, feedbackable_type, feedbackable_id (polymorphic), name, email, feedback_text, is_public, responded_by, response, responded_at.
- **translations** – translatable_type, translatable_id, locale (en, ne), field_name, translated_value; UNIQUE(translatable_type, translatable_id, locale, field_name).
- **media** – file_name, path, file_type, mime_type, file_size, alt_text, title, description, width, height, folder, uploaded_by (FK users).
- **email_templates** – name, slug, subject, body, variables (json), description, is_active.
- **notifications** – user_id (FK), type, title, message, data (json), link, is_read, read_at, created_at.
- **search_logs** – search_query, results_count, ip_address, user_id (nullable), created_at.
- **redirects** – old_url, new_url, status_code (301/302), hit_count.
- **sliders** – name, location (home, about, training, etc.).
- **slider_items** – slider_id (FK), title, subtitle, description, image, link_url, link_text, order.
- **page_sections** – page_id (FK), section_type, title, content, data (json), is_visible, order.

---

## 2. Relationship summary

- **categories** → posts (category_id)
- **users** → posts (author), pages (updated_by), events (created_by), media (uploaded_by), notifications, application_forms (reviewed_by), feedback (responded_by)
- **pages** → pages (parent_id), page_sections (page_id)
- **menus** → menu_items (menu_id)
- **menu_items** → menu_items (parent_id), posts (post_id optional)
- **training_programs** → courses (training_program_id)
- **courses** → testimonials (course_id optional)
- **committees** → committee_members (committee_id)
- **galleries** → gallery_images (gallery_id)
- **sliders** → slider_items (slider_id)
- **provinces** → districts (province_id)
- **events** → event_registrations (event_id)
- **training_batches** → batch_enrollments (batch_id)
- **beneficiaries** → batch_enrollments (beneficiary_id)
- **posts** ↔ **tags** (post_tag pivot)
- **seo_meta** – polymorphic (pages, posts, etc.)

---

## 3. Migration strategy

- **Do not recreate `users`** – Use existing migration; add columns (e.g. `role`, `is_active`) via a separate migration if needed and only if not fully covered by Spatie.
- **Order migrations by dependency** (parents before children):
  1. categories  
  2. tags  
  3. pages (parent_id self-reference ok)  
  4. posts (needs categories)  
  5. post_tag (needs posts, tags)  
  6. menus  
  7. menu_items (needs menus)  
  8. provinces  
  9. districts (needs provinces)  
  10. training_programs  
  11. courses (needs training_programs)  
  12. beneficiaries  
  13. training_batches  
  14. batch_enrollments (needs training_batches, beneficiaries)  
  15. impact_stories, notices, vacancies  
  16. committees  
  17. committee_members (needs committees)  
  18. documents, galleries, gallery_images (needs galleries), banners, partners  
  19. settings  
  20. contacts, application_forms  
  21. testimonials (optional course_id), events (needs users), event_registrations (needs events)  
  22. newsletters, faqs, team_members, publications, statistics  
  23. feedback, translations, media (needs users), email_templates, notifications (needs users), search_logs, redirects  
  24. sliders, slider_items (needs sliders)  
  25. page_sections (needs pages)  
  26. activity_logs  
  27. seo_meta (polymorphic, no FK to specific tables)

- **Conventions:** `id`, `timestamps()`, soft deletes where specified (`deleted_at`), indexes on slug/email/FKs/created_at/is_published. Use `utf8mb4_unicode_ci`. Store file paths only; use Laravel Storage for files.

---

## 4. Mapping to PDF “dynamic homepage”

- **Logo / header contact** → `settings` (e.g. site_logo, phone_primary, phone_secondary, email) or dedicated `site_settings` if preferred.
- **Menu** → `menus` (location: header) + `menu_items`.
- **Banner / hero** → `banners` (title, subtitle, image, button text/url, order).
- **About / key components / coverage / milestones / join CTA** → `page_sections` for homepage (page_id = homepage) or `content_blocks` keyed by section (if not using pages).
- **Impact stories** → `impact_stories`.
- **News** → `posts` (category: news) or dedicated `news_articles`; Excel uses **posts**.
- **Partners** → `partners`.
- **Testimonials** → `testimonials`.
- **Footer links** → `menus` (location: footer) + `menu_items`, or footer_link_groups + footer_links; Excel uses **menus** + **menu_items** (location = footer).
- **Gallery** → `galleries` + `gallery_images`.
- **Stats (2500+ Apprenticeship, etc.)** → `statistics`.
- **Events summary / budget** → `settings` or a single-row `homepage_stats` table; Excel has **events** and **statistics**, so use `statistics` for key figures and optionally `events` aggregates or settings for budget.

No separate “content_blocks” or “footer_link_groups” table is required if we use **pages** + **page_sections** for homepage content and **menus** + **menu_items** for footer.

---

## 5. Deliverables

1. **Single migration file** (or multiple per group above) that create all tables from the Excel schema, in dependency order, **excluding** the existing `users` table (and optionally adding columns to `users` in a small migration).
2. **Indexes:** unique on slug/email/settings.key; index on foreign keys, published_at, is_active, order/sort_order where used in listing.
3. **Optional:** Seeders for provinces, districts, default menu (header/footer), default settings, and one homepage page with sections.

---

## 6. Implementation notes (from Excel)

- Database: MySQL/MariaDB or PostgreSQL; charset `utf8mb4`, collation `utf8mb4_unicode_ci`.
- Soft deletes: pages, posts, impact_stories, notices, vacancies, events.
- Use Laravel `timestamps()` and `foreignId()->constrained()->cascadeOnDelete()` (or `nullOnDelete`) as appropriate.
- Enums: define in migration where applicable (e.g. notice_type, job_type, event_type).
- User roles: project uses Spatie Permission; align Excel “role” with Spatie or keep role only in Spatie.
- File storage: store paths only; use Laravel Storage.
- Slugs: auto-generate from title (e.g. `Str::slug()` in model or observer).

This plan is the basis for generating the Laravel migration file(s).
