<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\TrainingProgram;
use Illuminate\Database\Seeder;

class TrainingProgramSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            [
                'name' => 'Bachelor of Science in Health Informatics',
                'slug' => 'bsc-health-informatics',
                'program_type' => 'Degree',
                'description' => 'A four-year undergraduate program that combines healthcare, information technology, and data science to prepare students for careers in health information management, clinical informatics, and digital health systems. Graduates are equipped to design, implement, and manage health information systems that improve patient care and organizational efficiency.',
                'duration' => '4 Years',
                'level' => 'Undergraduate',
                'courses' => [
                    [
                        'name' => 'Introduction to Health Informatics',
                        'course_code' => 'HI-101',
                        'description' => 'Foundational concepts in health informatics, including history, scope, and application areas.',
                        'duration' => '1 Semester',
                    ],
                    [
                        'name' => 'Health Information Systems',
                        'course_code' => 'HI-201',
                        'description' => 'Design and management of electronic health record systems and hospital information systems.',
                        'duration' => '1 Semester',
                    ],
                    [
                        'name' => 'Clinical Data Management',
                        'course_code' => 'HI-202',
                        'description' => 'Principles and practices for managing clinical data, data quality, and data governance.',
                        'duration' => '1 Semester',
                    ],
                    [
                        'name' => 'Health Data Analytics',
                        'course_code' => 'HI-301',
                        'description' => 'Statistical methods and tools for analyzing health data to support clinical and administrative decisions.',
                        'duration' => '1 Semester',
                    ],
                ],
            ],
            [
                'name' => 'Master of Science in Clinical Informatics',
                'slug' => 'msc-clinical-informatics',
                'program_type' => 'Degree',
                'description' => 'A two-year postgraduate program focused on the application of informatics in clinical settings. Students develop expertise in clinical decision support, interoperability standards, and health data analytics. Designed for healthcare professionals seeking to leverage information technology to improve clinical workflows and patient outcomes.',
                'duration' => '2 Years',
                'level' => 'Postgraduate',
                'courses' => [
                    [
                        'name' => 'Advanced Health Information Systems',
                        'course_code' => 'CI-501',
                        'description' => 'Advanced topics in EHR architecture, interoperability, and standards (HL7, FHIR, SNOMED CT).',
                        'duration' => '1 Semester',
                    ],
                    [
                        'name' => 'Clinical Decision Support Systems',
                        'course_code' => 'CI-502',
                        'description' => 'Design and evaluation of clinical decision support tools integrated into health information systems.',
                        'duration' => '1 Semester',
                    ],
                    [
                        'name' => 'Research Methods in Health Informatics',
                        'course_code' => 'CI-601',
                        'description' => 'Research design, methodologies, and ethics applied to health informatics research projects.',
                        'duration' => '1 Semester',
                    ],
                ],
            ],
            [
                'name' => 'Postgraduate Diploma in Health Data Science',
                'slug' => 'pgd-health-data-science',
                'program_type' => 'Diploma',
                'description' => 'A one-year intensive diploma program bridging the gap between healthcare and data science. Participants learn machine learning, big data tools, and statistical analysis techniques applied to health datasets. Suitable for graduates from health or computer science backgrounds.',
                'duration' => '1 Year',
                'level' => 'Postgraduate',
                'courses' => [
                    [
                        'name' => 'Python for Health Data Analysis',
                        'course_code' => 'HDS-401',
                        'description' => 'Programming with Python for data wrangling, visualization, and analysis in health contexts.',
                        'duration' => '1 Semester',
                    ],
                    [
                        'name' => 'Machine Learning in Healthcare',
                        'course_code' => 'HDS-402',
                        'description' => 'Application of machine learning algorithms to health prediction, diagnosis, and risk stratification.',
                        'duration' => '1 Semester',
                    ],
                ],
            ],
            [
                'name' => 'Certificate Course in Telemedicine',
                'slug' => 'certificate-telemedicine',
                'program_type' => 'Certificate',
                'description' => 'A short-term certificate course covering the fundamentals of telemedicine, digital consultation platforms, remote patient monitoring, and legal/ethical considerations. Designed for practicing clinicians and healthcare administrators.',
                'duration' => '3 Months',
                'level' => 'Certificate',
                'courses' => [
                    [
                        'name' => 'Foundations of Telemedicine',
                        'course_code' => 'TM-101',
                        'description' => 'Overview of telemedicine technologies, platforms, and best practices.',
                        'duration' => '6 Weeks',
                    ],
                    [
                        'name' => 'Legal and Ethical Aspects of Digital Health',
                        'course_code' => 'TM-102',
                        'description' => 'Regulatory frameworks, patient consent, privacy, and ethical guidelines in digital health.',
                        'duration' => '6 Weeks',
                    ],
                ],
            ],
            [
                'name' => 'Professional Certificate in Health IT Management',
                'slug' => 'professional-certificate-health-it-management',
                'program_type' => 'Certificate',
                'description' => 'A professional development program for healthcare managers and IT professionals responsible for managing health information technology infrastructure, projects, and teams. Covers project management, vendor evaluation, and change management in healthcare settings.',
                'duration' => '6 Months',
                'level' => 'Professional',
                'courses' => [
                    [
                        'name' => 'Healthcare IT Project Management',
                        'course_code' => 'HITM-201',
                        'description' => 'Applying project management methodologies (Agile, PMBOK) to healthcare IT projects.',
                        'duration' => '2 Months',
                    ],
                    [
                        'name' => 'Health Information Security and Compliance',
                        'course_code' => 'HITM-202',
                        'description' => 'Cybersecurity fundamentals, HIPAA compliance, and data protection in health systems.',
                        'duration' => '2 Months',
                    ],
                    [
                        'name' => 'EHR Implementation and Optimization',
                        'course_code' => 'HITM-203',
                        'description' => 'Planning, implementing, and optimizing electronic health record systems in clinical environments.',
                        'duration' => '2 Months',
                    ],
                ],
            ],
        ];

        foreach ($programs as $programData) {
            $courses = $programData['courses'] ?? [];
            unset($programData['courses']);

            $program = TrainingProgram::firstOrCreate(
                ['slug' => $programData['slug']],
                $programData
            );

            foreach ($courses as $courseData) {
                Course::firstOrCreate(
                    [
                        'training_program_id' => $program->id,
                        'course_code' => $courseData['course_code'],
                    ],
                    array_merge($courseData, ['training_program_id' => $program->id])
                );
            }
        }
    }
}
