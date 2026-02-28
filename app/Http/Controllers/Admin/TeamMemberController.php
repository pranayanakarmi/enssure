<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeamMemberRequest;
use App\Http\Requests\Admin\UpdateTeamMemberRequest;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', TeamMember::class);

        $teamMembers = TeamMember::orderBy('order')
            ->orderBy('name')
            ->get()
            ->map(fn (TeamMember $t) => [
                'id' => $t->id,
                'name' => $t->name,
                'job_title' => $t->job_title,
                'department' => $t->department,
                'order' => $t->order,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/team-members/index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', TeamMember::class);

        return Inertia::render('admin/team-members/create');
    }

    public function store(StoreTeamMemberRequest $request): RedirectResponse
    {
        TeamMember::create($request->validated());

        return to_route('admin.team_members.index')
            ->with('success', 'Team member created successfully.');
    }

    public function edit(TeamMember $team_member): Response
    {
        $this->authorize('update', $team_member);

        $t = $team_member;

        return Inertia::render('admin/team-members/edit', [
            'teamMember' => [
                'id' => $t->id,
                'name' => $t->name,
                'job_title' => $t->job_title,
                'department' => $t->department,
                'photo' => $t->photo,
                'bio' => $t->bio,
                'qualifications' => $t->qualifications,
                'expertise' => $t->expertise,
                'social_links' => $t->social_links,
                'order' => $t->order,
            ],
        ]);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $team_member): RedirectResponse
    {
        $team_member->update($request->validated());

        return to_route('admin.team_members.index')
            ->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $team_member): RedirectResponse
    {
        $this->authorize('delete', $team_member);

        $team_member->delete();

        return to_route('admin.team_members.index')
            ->with('success', 'Team member deleted successfully.');
    }
}
