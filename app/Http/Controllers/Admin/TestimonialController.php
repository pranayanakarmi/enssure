<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Models\Course;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Testimonial::class);

        $testimonials = Testimonial::with('course:id,name')
            ->orderBy('order')
            ->get()
            ->map(fn (Testimonial $t) => [
                'id' => $t->id,
                'name' => $t->name,
                'designation' => $t->designation,
                'organization' => $t->organization,
                'testimonial_text' => Str::limit($t->testimonial_text, 60),
                'order' => $t->order,
                'is_featured' => $t->is_featured,
                'is_published' => $t->is_published,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/testimonials/index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Testimonial::class);

        return Inertia::render('admin/testimonials/create', [
            'courses' => Course::orderBy('name')->get(['id', 'name'])->map(fn ($c) => ['id' => $c->id, 'name' => $c->name])->values()->all(),
        ]);
    }

    public function store(StoreTestimonialRequest $request): RedirectResponse
    {
        Testimonial::create($request->validated());

        return to_route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial): Response
    {
        $this->authorize('update', $testimonial);

        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => [
                'id' => $testimonial->id,
                'name' => $testimonial->name,
                'designation' => $testimonial->designation,
                'organization' => $testimonial->organization,
                'image' => $testimonial->image,
                'testimonial_text' => $testimonial->testimonial_text,
                'rating' => $testimonial->rating,
                'course_id' => $testimonial->course_id,
                'is_featured' => $testimonial->is_featured,
                'is_published' => $testimonial->is_published,
                'order' => $testimonial->order,
            ],
            'courses' => Course::orderBy('name')->get(['id', 'name'])->map(fn ($c) => ['id' => $c->id, 'name' => $c->name])->values()->all(),
        ]);
    }

    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update($request->validated());

        return to_route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->authorize('delete', $testimonial);

        $testimonial->delete();

        return to_route('admin.testimonials.index')
            ->with('success', 'Testimonial deleted successfully.');
    }

    public function reorder(Request $request)
{
    $request->validate([
        'items' => 'required|array',
        'items.*.id' => 'required|exists:testimonials,id',
        'items.*.order' => 'required|integer|min:0',
    ]);
    foreach ($request->input('items') as $item) {
        Testimonial::where('id', $item['id'])->update(['order' => $item['order']]);
    }
    return back()->with('success', 'Testimonials reordered successfully.');
}
}
