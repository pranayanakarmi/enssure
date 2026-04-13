<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Annual Health Informatics Conference 2026',
                'slug' => 'annual-health-informatics-conference-2026',
                'description' => 'Join leading health informatics professionals, researchers, and students for our annual conference. Topics include electronic health records, clinical decision support systems, telemedicine, and AI in healthcare.',
                'event_type' => 'Conference',
                'start_date' => now()->addMonths(2)->setTime(9, 0),
                'end_date' => now()->addMonths(2)->addDays(2)->setTime(17, 0),
                'venue' => 'KMH-IHS Auditorium',
                'address' => 'Kathmandu Model Hospital, Kathmandu, Nepal',
                'organizer' => 'KMH-IHS Academics',
                'contact_person' => 'Dr. Roshan Adhikari',
                'contact_email' => 'informatics@kmh-ihs.edu.np',
                'contact_phone' => '+977-1-4234567',
                'registration_required' => true,
                'registration_deadline' => now()->addMonths(1)->addWeeks(3),
                'max_participants' => 200,
            ],
            [
                'title' => 'Workshop: Introduction to Clinical Data Management',
                'slug' => 'workshop-introduction-clinical-data-management',
                'description' => 'A hands-on workshop covering fundamentals of clinical data management, database design for health systems, and practical exercises using modern health data tools. Suitable for students and early-career professionals.',
                'event_type' => 'Workshop',
                'start_date' => now()->addWeeks(3)->setTime(10, 0),
                'end_date' => now()->addWeeks(3)->setTime(17, 0),
                'venue' => 'Computer Lab 1, IHS Campus',
                'address' => 'KMH-IHS Campus, Kathmandu',
                'organizer' => 'Department of Health Informatics',
                'contact_person' => 'Prof. Sita Devi Shrestha',
                'contact_email' => 'workshop@kmh-ihs.edu.np',
                'contact_phone' => '+977-1-4234568',
                'registration_required' => true,
                'registration_deadline' => now()->addWeeks(2)->addDays(5),
                'max_participants' => 30,
            ],
            [
                'title' => 'Seminar: Telemedicine and Digital Health Policy in Nepal',
                'slug' => 'seminar-telemedicine-digital-health-policy-nepal',
                'description' => 'An expert-led seminar exploring the current state of telemedicine regulations, digital health policy frameworks, and implementation challenges in Nepal. Open to all students and faculty.',
                'event_type' => 'Seminar',
                'start_date' => now()->addWeeks(6)->setTime(14, 0),
                'end_date' => now()->addWeeks(6)->setTime(17, 0),
                'venue' => 'Seminar Hall B, KMH-IHS',
                'address' => 'KMH-IHS Campus, Kathmandu',
                'organizer' => 'KMH-IHS Research Committee',
                'contact_person' => 'Dr. Anish Karki',
                'contact_email' => 'research@kmh-ihs.edu.np',
                'contact_phone' => '+977-1-4234569',
                'registration_required' => false,
                'max_participants' => 100,
            ],
            [
                'title' => 'Training: HL7 FHIR Standards for Health Data Exchange',
                'slug' => 'training-hl7-fhir-standards-health-data-exchange',
                'description' => 'A comprehensive training program on HL7 FHIR (Fast Healthcare Interoperability Resources) standards. Participants will learn how to implement and use FHIR for seamless health data exchange between systems.',
                'event_type' => 'Training',
                'start_date' => now()->subMonths(1)->setTime(9, 0),
                'end_date' => now()->subMonths(1)->addDays(3)->setTime(17, 0),
                'venue' => 'Online (Zoom)',
                'organizer' => 'KMH-IHS Academics',
                'contact_email' => 'informatics@kmh-ihs.edu.np',
                'registration_required' => true,
                'max_participants' => 50,
            ],
            [
                'title' => 'Guest Lecture: AI Applications in Radiology Informatics',
                'slug' => 'guest-lecture-ai-applications-radiology-informatics',
                'description' => 'Prof. Rajan Maharjan from AIIMS Delhi delivers a guest lecture on current and future applications of artificial intelligence in radiology informatics, including image analysis, diagnostic decision support, and workflow automation.',
                'event_type' => 'Guest Lecture',
                'start_date' => now()->subWeeks(2)->setTime(15, 0),
                'end_date' => now()->subWeeks(2)->setTime(17, 0),
                'venue' => 'Main Lecture Hall, KMH-IHS',
                'address' => 'KMH-IHS Campus, Kathmandu',
                'organizer' => 'KMH-IHS Academics',
                'contact_email' => 'informatics@kmh-ihs.edu.np',
                'registration_required' => false,
            ],
        ];

        foreach ($events as $data) {
            Event::firstOrCreate(
                ['slug' => $data['slug']],
                $data
            );
        }
    }
}
