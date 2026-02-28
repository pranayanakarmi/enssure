<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

abstract class ContentPolicyBase
{
    abstract protected function resourceName(): string;

    public function viewAny(User $user): bool
    {
        return $user->can('view '.$this->resourceName());
    }

    public function view(User $user, Model $model): bool
    {
        return $user->can('view '.$this->resourceName());
    }

    public function create(User $user): bool
    {
        return $user->can('create '.$this->resourceName());
    }

    public function update(User $user, Model $model): bool
    {
        return $user->can('update '.$this->resourceName());
    }

    public function delete(User $user, Model $model): bool
    {
        return $user->can('delete '.$this->resourceName());
    }

    public function restore(User $user, Model $model): bool
    {
        return $user->can('update '.$this->resourceName());
    }

    public function forceDelete(User $user, Model $model): bool
    {
        return $user->can('delete '.$this->resourceName());
    }
}
