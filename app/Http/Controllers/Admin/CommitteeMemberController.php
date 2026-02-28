<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCommitteeMemberRequest;
use App\Http\Requests\Admin\UpdateCommitteeMemberRequest;
use App\Models\Committee;
use App\Models\CommitteeMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CommitteeMemberController extends Controller
{
    public function store(StoreCommitteeMemberRequest $request, Committee $committee): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('committee-members', 'public');
        } else {
            unset($data['image']);
        }
        $committee->members()->create($data);

        return back()->with('success', 'Committee member added.');
    }

    public function edit(CommitteeMember $committee_member): Response
    {
        $this->authorize('update', $committee_member);

        $committee_member->load('committee');

        return Inertia::render('admin/committees/committee-members/edit', [
            'committeeMember' => [
                'id' => $committee_member->id,
                'committee_id' => $committee_member->committee_id,
                'name' => $committee_member->name,
                'position' => $committee_member->position,
                'bio' => $committee_member->bio,
                'image' => $committee_member->image,
                'image_url' => $committee_member->image ? Storage::disk('public')->url($committee_member->image) : null,
                'order' => $committee_member->order,
            ],
            'committee' => [
                'id' => $committee_member->committee->id,
                'name' => $committee_member->committee->name,
            ],
        ]);
    }

    public function update(UpdateCommitteeMemberRequest $request, CommitteeMember $committee_member): RedirectResponse
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            if ($committee_member->image) {
                Storage::disk('public')->delete($committee_member->image);
            }
            $data['image'] = $request->file('image')->store('committee-members', 'public');
        } else {
            unset($data['image']);
        }
        $committee_member->update($data);

        return redirect()->route('admin.committees.edit', $committee_member->committee_id)
            ->with('success', 'Committee member updated.');
    }

    public function destroy(CommitteeMember $committee_member): RedirectResponse
    {
        $this->authorize('delete', $committee_member);

        if ($committee_member->image) {
            Storage::disk('public')->delete($committee_member->image);
        }
        $committee_id = $committee_member->committee_id;
        $committee_member->delete();

        return redirect()->route('admin.committees.edit', $committee_id)
            ->with('success', 'Committee member deleted.');
    }
}
