<?php

namespace App\Domain\Services;

use App\Domain\Authentication\Authenticator;
use App\Domain\Models\Users\User;
use Library\Events\EventManager;
use Library\Http\Response;
use Library\Log\Log;
use Library\Transformer\Transformer;

class LoginService extends AuthenticatedService
{
    public function __construct(EventManager $eventManager, Transformer $transformer, Log $log,
                                Authenticator $authenticator)
    {
        parent::__construct($eventManager, $transformer, $log, $authenticator);
    }

    public function currentUser(): Response
    {
        return new Response(Response::STATUS_OK, [
            'currentUser' => $this->transformer->of(User::class)->transform($this->authenticator->user())
        ]);
    }

    public function login($email, $password): Response
    {
        try
        {
            $password = md5($password);

            $token = $this->authenticator->login($email, $password);
            if ($token)
            {
                $this->log->info('User logged in. Email: '.$email);
                return new Response(Response::STATUS_OK, [
                    'token' => $token
                ]);
            }

            return new Response(Response::STATUS_BAD_REQUEST, 'Incorrect login.');
        }
        catch (\Exception $e)
        {
            $this->log->error($e->getMessage());
            return new Response(Response::STATUS_BAD_REQUEST, 'An error occured while loggin in.');
        }
    }
}