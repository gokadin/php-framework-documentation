<?php

namespace Library;

use Library\Container\Container;
use Library\Http\ViewFactory;
use Library\Routing\RouteBuilder;

class Application
{
    /**
     * @var string
     */
    protected $basePath;

    /**
     * @var Container
     */
    protected $container;

    /**
     * @var mixed
     */
    private $controllerResponse;

    public function __construct()
    {
        session_write_close();

        $this->configureErrorHandling();

        $this->container = new Container();
        $this->controllerResponse = null;
        $this->basePath = __DIR__.'/../';
    }

    private function configureErrorHandling()
    {
        switch (env('APP_DEBUG'))
        {
            case 'true':
                error_reporting(E_ALL);
                break;
            default:
                error_reporting(0);
                break;
        }
    }

    public function configureContainer()
    {
        $this->container->registerInstance('app', $this);

        $containerConfiguration = null;
        switch (env('APP_ENV'))
        {
            case 'framework_testing':
                $containerConfiguration = new \Config\TestContainerConfiguration($this->container);
                break;
            default:
                $containerConfiguration = new \Config\ContainerConfiguration($this->container);
        }

        $containerConfiguration->configureContainer();
    }

    public function container()
    {
        if (is_null($this->container))
        {
            $this->container = new Container();
            $this->ConfigureContainer();
        }

        return $this->container;
    }

    public function loadRoutes()
    {
        $builder = new RouteBuilder();
        $routes = $builder->getRoutes();

        $router = $this->container->resolveInstance('router');
        $router->setRoutes($routes);
    }

    public function processRoute()
    {
        $result = $this->container->resolveInstance('router')->dispatch(
            $this->container()->resolveInstance('request'));

        $this->controllerResponse = $result;
    }

    public function sendResponse()
    {
        $this->controllerResponse->executeResponse();
    }

    public function basePath()
    {
        return $this->basePath;
    }
}

