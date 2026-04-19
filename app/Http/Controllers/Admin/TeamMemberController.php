<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeamMemberRequest;
use App\Http\Requests\Admin\UpdateTeamMemberRequest;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    private function indexRouteForType(?string $type): string
    {
        return $type === 'executive_committee'
            ? 'admin.team_members.executive_index'
            : 'admin.team_members.staff_index';
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', TeamMember::class);

        $routeName = $request->route()->getName();
        $listingType = null;
        if ($routeName === 'admin.team_members.executive_index') {
            $listingType = 'executive_committee';
        } elseif ($routeName === 'admin.team_members.staff_index') {
            $listingType = 'staff';
        }

        $query = TeamMember::query();
        if ($listingType !== null) {
            $query->where('type', $listingType);
        }
        $teamMembers = $query->orderBy('order')->orderBy('name')
            ->get()
            ->map(fn (TeamMember $t) => [
                'id' => $t->id,
                'type' => $t->type,
                'name' => $t->name,
                'job_title' => $t->job_title,
                'department' => $t->department,
                'location' => $t->location,
                'order' => $t->order,
                'photo_url' => $t->photo ? Storage::disk('public')->url($t->photo) : null,
            ])
            ->values()
            ->all();

        return Inertia::render('admin/team-members/index', [
            'teamMembers' => $teamMembers,
            'listingType' => $listingType,
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorize('create', TeamMember::class);

        $type = $request->query('type');
        if (! in_array($type, ['executive_committee', 'staff'], true)) {
            $type = 'staff';
        }

        return Inertia::render('admin/team-members/create', [
            'listingType' => $type,
            'locationOptions' => TeamMember::LOCATIONS,
        ]);
    }

    public function store(StoreTeamMemberRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('team-members', 'public');
        } else {
            unset($data['photo']);
        }

        $data['social_links'] = array_filter([
            'facebook' => $data['facebook_url'] ?? null,
            'twitter' => $data['twitter_url'] ?? null,
        ]);
        unset($data['facebook_url'], $data['twitter_url']);

        TeamMember::create($data);

        $type = $request->validated('type');

        return to_route($this->indexRouteForType($type))
            ->with('success', 'Team member created successfully.');
    }

    public function edit(TeamMember $team_member): Response
    {
        $this->authorize('update', $team_member);

        $t = $team_member;

        return Inertia::render('admin/team-members/edit', [
            'teamMember' => [
                'id' => $t->id,
                'type' => $t->type ?? 'staff',
                'name' => $t->name,
                'job_title' => $t->job_title,
                'department' => $t->department,
                'location' => $t->location,
                'order' => $t->order,
                'photo' => $t->photo,
                'photo_url' => $t->photo ? Storage::disk('public')->url($t->photo) : null,
                'bio' => $t->bio,
                'qualifications' => $t->qualifications,
                'expertise' => $t->expertise,
                'social_links' => $t->social_links,
            ],
            'locationOptions' => TeamMember::LOCATIONS,
        ]);
    }

    public function update(UpdateTeamMemberRequest $request, TeamMember $team_member): RedirectResponse
    {
        $data = $request->validated();

        if ($request->boolean('remove_photo') && $team_member->photo) {
            Storage::disk('public')->delete($team_member->photo);
            $data['photo'] = null;
        } elseif ($request->hasFile('photo')) {
            if ($team_member->photo) {
                Storage::disk('public')->delete($team_member->photo);
            }
            $data['photo'] = $request->file('photo')->store('team-members', 'public');
        } else {
            unset($data['photo']);
        }

        unset($data['remove_photo']);

        $data['social_links'] = array_filter([
            'facebook' => $data['facebook_url'] ?? null,
            'twitter' => $data['twitter_url'] ?? null,
        ]);
        unset($data['facebook_url'], $data['twitter_url']);

        $team_member->update($data);

        $type = $team_member->type ?? 'staff';

        return to_route($this->indexRouteForType($type))
            ->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $team_member): RedirectResponse
    {
        $this->authorize('delete', $team_member);

        $type = $team_member->type ?? 'staff';
        $team_member->delete();

        return to_route($this->indexRouteForType($type))
            ->with('success', 'Team member deleted successfully.');
    }
}
