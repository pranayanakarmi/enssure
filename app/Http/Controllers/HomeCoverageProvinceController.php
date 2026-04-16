<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeCoverageProvinceController extends Controller
{
        /**
         * Return all provinces' stats in one response.
         */
        public function all(Request $request): JsonResponse
        {
            $provinces = $this->provinces();
            // Return as a numerically indexed array for frontend convenience
            return response()->json(array_values($provinces));
        }
    /**
     * @return array<string, array{id: string, name: string, display: string, stats: array<string, int|string>}>
     */
    private function provinces(): array
    {
        return [
            'overall' => [
                'id' => 'overall',
                'name' => 'Overall Nepal',
                'display' => 'Overall',
                'stats' => [
                    'apprentices_reached' => 6984,
                    'cgsc_established' => 7,
                    'career_guidance_units' => 23,
                    'career_guidance_schools' => 1217,
                    'apprentices_placed' => 2038,
                    'lg_coverage' => 80,
                    'ojt_participants' => 4368,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'koshi' => [
                'id' => 'koshi',
                'name' => 'Koshi',
                'display' => 'Koshi',
                'stats' => [
                    'apprentices_reached' => 1749,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 10,
                    'career_guidance_schools' => 285,
                    'apprentices_placed' => 612,
                    'lg_coverage' => 12,
                    'ojt_participants' => 1586,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'madhesh' => [
                'id' => 'madhesh',
                'name' => 'Madhesh',
                'display' => 'Madhesh',
                'stats' => [
                    'apprentices_reached' => 280,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 0,
                    'career_guidance_schools' => 53,
                    'apprentices_placed' => 64,
                    'lg_coverage' => 15,
                    'ojt_participants' => 0,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'bagmati' => [
                'id' => 'bagmati',
                'name' => 'Bagmati',
                'display' => 'Bagmati',
                'stats' => [
                    'apprentices_reached' => 1987,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 8,
                    'career_guidance_schools' => 290,
                    'apprentices_placed' => 609,
                    'lg_coverage' => 10,
                    'ojt_participants' => 1513,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'gandaki' => [
                'id' => 'gandaki',
                'name' => 'Gandaki',
                'display' => 'Gandaki',
                'stats' => [
                    'apprentices_reached' => 348,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 0,
                    'career_guidance_schools' => 159,
                    'apprentices_placed' => 53,
                    'lg_coverage' => 12,
                    'ojt_participants' => 0,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'lumbini' => [
                'id' => 'lumbini',
                'name' => 'Lumbini',
                'display' => 'Lumbini',
                'stats' => [
                    'apprentices_reached' => 1930,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 5,
                    'career_guidance_schools' => 300,
                    'apprentices_placed' => 560,
                    'lg_coverage' => 11,
                    'ojt_participants' => 1269,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'karnali' => [
                'id' => 'karnali',
                'name' => 'Karnali',
                'display' => 'Karnali',
                'stats' => [
                    'apprentices_reached' => 280,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 0,
                    'career_guidance_schools' => 75,
                    'apprentices_placed' => 49,
                    'lg_coverage' => 9,
                    'ojt_participants' => 0,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
            'sudurpashchim' => [
                'id' => 'sudurpashchim',
                'name' => 'Sudurpashchim',
                'display' => 'Sudur',
                'stats' => [
                    'apprentices_reached' => 410,
                    'cgsc_established' => 1,
                    'career_guidance_units' => 0,
                    'career_guidance_schools' => 55,
                    'apprentices_placed' => 91,
                    'lg_coverage' => 11,
                    'ojt_participants' => 0,
                    'workers_trained_sut' => 0,
                    'private_sector_coinvestment' => 0,
                    'government_sector_coinvestment' => 0,
                    'policy_endorsed' => 0,
                ],
            ],
        ];
    }

    public function show(Request $request, string $provinceId): JsonResponse
    {
        $province = $this->provinces()[$provinceId] ?? null;

        if ($province === null) {
            return response()->json([
                'message' => 'Province coverage not found.',
            ], 404);
        }

        return response()->json($province);
    }
}
