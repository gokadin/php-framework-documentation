<?php

namespace App\Http\Requests;

use App\Domain\Authentication\Authenticator;
use App\Domain\Models\Users\User;

abstract class AuthenticatedRequest extends Request
{
    /**
     * @var User
     */
    protected $user;

    public function __construct(Authenticator $authenticator)
    {
        parent::__construct();

        $this->user = $authenticator->user();
    }
}