<?php

namespace App\Http\Middleware;

use Closure;
use Library\Application;
use Library\Http\Response;
use Library\Http\Request;
use Symfony\Component\Yaml\Exception\RuntimeException;

class VerifyCsrfToken
{
    protected $methodsToVerify = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function handle(Request $request, Closure $next)
    {
        if (!in_array($request->method(), $this->methodsToVerify))
        {
            return $next($request);
        }

        $token = $this->app->token();
        if ($request->isJson() && $request->header('CSRFTOKEN') != $token)
        {
            $response = new Response(Response::STATUS_BAD_REQUEST, 'CSRF token not found.');
            $response->executeResponse();
            return;
        }

        if (!$request->isJson() && $request->data('_token') != $token)
        {
            throw new RuntimeException('CSRF token mismatch.');
            return;
        }

        return $next($request);
    }
}