<?php

namespace App\Http\Middleware;

use App\Domain\Authentication\Authenticator;
use App\Repositories\UserRepository;
use Library\Http\Response;
use Library\Routing\Router;
use Library\Http\Request;
use Closure;

class VerifyAuthentication
{
    /**
     * @var Authenticator
     */
    protected $authenticator;

    /**
     * @var Router
     */
    protected $router;

    public function __construct(Authenticator $authenticator, Router $router)
    {
        $this->authenticator = $authenticator;
        $this->router = $router;
    }

    public function handle(Request $request, Closure $next)
    {
        if (!$request->isJson() || is_null($request->header('Authorization')) ||
            !$this->authenticator->processAuthorization($request->header('Authorization')))
        {
            $response = new Response(Response::STATUS_UNAUTHORIZED);
            $response->executeResponse();
            return;
        }

        return $next($request);
    }
}