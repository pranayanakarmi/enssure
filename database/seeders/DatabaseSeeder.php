<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            ContentPermissionsSeeder::class,
            FirstAdminSeeder::class,
            HomeAboutSectionSeeder::class,
            AboutPageHeroSeeder::class,
            GalleryPageSectionSeeder::class,
            AboutMainSectionSeeder::class,
            AboutContentSectionSeeder::class,
            ImpactPageHeroSeeder::class,
            ImpactPageSectionSeeder::class,
            HomeGallerySectionSeeder::class,
            HomeImpactStoriesSectionSeeder::class,
            HomeReachSectionSeeder::class,
            HomeReachItemSeeder::class,
            HomeCoverageSectionSeeder::class,
            HomeNewsSectionSeeder::class,
            HomeTestimonialsSectionSeeder::class,
            HomePartnersSectionSeeder::class,
            HomeSupportSectionSeeder::class,
            HomeContactCtaSectionSeeder::class,
            SliderSeeder::class,
            PartnerSeeder::class,
            TestimonialSeeder::class,
            HomeGallerySectionItemSeeder::class,
            NewsTickerItemSeeder::class,
            MenuSeeder::class,
            FooterSeeder::class,
            EventSeeder::class,
            TrainingProgramSeeder::class,
        ]);

        // User::factory(10)->create();

        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $testUser->assignRole('user');
    }
}
