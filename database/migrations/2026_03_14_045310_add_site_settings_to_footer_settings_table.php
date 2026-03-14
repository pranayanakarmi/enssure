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
        Schema::table('footer_settings', function (Blueprint $table) {
            $table->string('header_phone_1')->nullable()->after('social_links');
            $table->string('header_phone_2')->nullable()->after('header_phone_1');
            $table->string('header_fax')->nullable()->after('header_phone_2');
            $table->string('header_email')->nullable()->after('header_fax');
            $table->string('logo_left')->nullable()->after('header_email');
            $table->string('logo_center')->nullable()->after('logo_left');
            $table->string('logo_right')->nullable()->after('logo_center');
            $table->string('footer_privacy_policy_url')->nullable()->after('logo_right');
            $table->string('footer_terms_of_service_url')->nullable()->after('footer_privacy_policy_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('footer_settings', function (Blueprint $table) {
            $table->dropColumn([
                'header_phone_1',
                'header_phone_2',
                'header_fax',
                'header_email',
                'logo_left',
                'logo_center',
                'logo_right',
                'footer_privacy_policy_url',
                'footer_terms_of_service_url',
            ]);
        });
    }
};
