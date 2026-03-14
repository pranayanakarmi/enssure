<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('facebook_url')->nullable()->after('footer_terms_of_service_url');
            $table->string('x_url')->nullable()->after('facebook_url');
            $table->string('youtube_url')->nullable()->after('x_url');
        });

        $rows = DB::table('site_settings')->get();
        foreach ($rows as $row) {
            $socialLinks = $row->social_links ? json_decode($row->social_links, true) : [];
            $facebookUrl = null;
            $xUrl = null;
            $youtubeUrl = null;
            if (is_array($socialLinks)) {
                foreach ($socialLinks as $link) {
                    $platform = $link['platform'] ?? '';
                    $url = $link['url'] ?? '';
                    if ($platform === 'facebook') {
                        $facebookUrl = $url ?: null;
                    } elseif ($platform === 'x') {
                        $xUrl = $url ?: null;
                    } elseif ($platform === 'youtube') {
                        $youtubeUrl = $url ?: null;
                    }
                }
            }
            DB::table('site_settings')->where('id', $row->id)->update([
                'facebook_url' => $facebookUrl,
                'x_url' => $xUrl,
                'youtube_url' => $youtubeUrl,
            ]);
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('social_links');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->json('social_links')->nullable()->after('id');
        });

        $rows = DB::table('site_settings')->get();
        foreach ($rows as $row) {
            $socialLinks = array_filter([
                ['platform' => 'facebook', 'url' => $row->facebook_url ?? ''],
                ['platform' => 'x', 'url' => $row->x_url ?? ''],
                ['platform' => 'youtube', 'url' => $row->youtube_url ?? ''],
            ], fn ($l) => ! empty($l['url']));
            DB::table('site_settings')->where('id', $row->id)->update([
                'social_links' => json_encode(array_values($socialLinks)),
            ]);
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['facebook_url', 'x_url', 'youtube_url']);
        });
    }
};
