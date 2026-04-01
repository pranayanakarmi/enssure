<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class Enssure1Controller extends Controller
{
    /**
     * Display the ENSSURE I page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Optionally fetch data from database for the ENSSURE I page
        // $hero = Enssure1PageHero::first();
        // $stats = Enssure1Stat::orderBy('order')->get();
        // ... etc.

        return Inertia::render('Enssure1', [
            // Pass any dynamic props here if needed; otherwise rely on component defaults
        ]);
    }
}
