<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeCoverageProvinceController extends Controller
{
    /**
     * @return array<string, array{id: string, name: string, display: string, stats: array<string, string>}>
     */
    private function provinces(): array
    {
        return [
            'overall' => [
                'id' => 'overall',
                'name' => 'Overall Nepal',
                'display' => 'Overall',
                'stats' => [
                    'planned_events' => '309',
                    'completed_events' => '36',
                    'estimated_participants' => '5530',
                    'enrolled_participants' => '1430',
                    'budgeted_amount' => '16.35M',
                ],
            ],
            'koshi' => [
                'id' => 'koshi',
                'name' => 'Koshi',
                'display' => 'Province 1',
                'stats' => [
                    'planned_events' => '47',
                    'completed_events' => '6',
                    'estimated_participants' => '860',
                    'enrolled_participants' => '214',
                    'budgeted_amount' => '2.34M',
                ],
            ],
            'madhesh' => [
                'id' => 'madhesh',
                'name' => 'Madhesh',
                'display' => 'Province 2',
                'stats' => [
                    'planned_events' => '45',
                    'completed_events' => '5',
                    'estimated_participants' => '790',
                    'enrolled_participants' => '205',
                    'budgeted_amount' => '2.11M',
                ],
            ],
            'bagmati' => [
                'id' => 'bagmati',
                'name' => 'Bagmati',
                'display' => 'Province 3',
                'stats' => [
                    'planned_events' => '56',
                    'completed_events' => '8',
                    'estimated_participants' => '1015',
                    'enrolled_participants' => '280',
                    'budgeted_amount' => '3.02M',
                ],
            ],
            'gandaki' => [
                'id' => 'gandaki',
                'name' => 'Gandaki',
                'display' => 'Province 4',
                'stats' => [
                    'planned_events' => '39',
                    'completed_events' => '4',
                    'estimated_participants' => '700',
                    'enrolled_participants' => '181',
                    'budgeted_amount' => '2.08M',
                ],
            ],
            'lumbini' => [
                'id' => 'lumbini',
                'name' => 'Lumbini',
                'display' => 'Province 5',
                'stats' => [
                    'planned_events' => '52',
                    'completed_events' => '6',
                    'estimated_participants' => '940',
                    'enrolled_participants' => '248',
                    'budgeted_amount' => '2.75M',
                ],
            ],
            'karnali' => [
                'id' => 'karnali',
                'name' => 'Karnali',
                'display' => 'Province 6',
                'stats' => [
                    'planned_events' => '34',
                    'completed_events' => '3',
                    'estimated_participants' => '580',
                    'enrolled_participants' => '138',
                    'budgeted_amount' => '1.86M',
                ],
            ],
            'sudurpashchim' => [
                'id' => 'sudurpashchim',
                'name' => 'Sudurpashchim',
                'display' => 'Province 7',
                'stats' => [
                    'planned_events' => '36',
                    'completed_events' => '4',
                    'estimated_participants' => '645',
                    'enrolled_participants' => '164',
                    'budgeted_amount' => '2.19M',
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
