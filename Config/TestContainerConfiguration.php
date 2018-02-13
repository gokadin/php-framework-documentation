<?php

namespace Config;

use Library\Container\ContainerConfiguration;
use Library\Events\EventManager;
use Library\Http\Request;
use Library\Log\Log;
use Library\Queue\Queue;
use Library\Routing\Router;
use Library\Session\Session;
use Library\Transformer\Transformer;
use Library\Validation\Validator;

class TestContainerConfiguration extends ContainerConfiguration
{
    public function configureContainer()
    {
        $this->container->registerInstance('request', new Request());
        $this->container->registerInstance('log', new Log());
        $this->container->registerInstance('session', new Session());
        $queue = new Queue(['use' => 'sync']);
        $this->container->registerInstance('queue', $queue);
        $this->container->registerInstance('eventManager', new EventManager([], $this->container, $queue));
        $this->container->registerInstance('transformer', new Transformer([]));

        $router = new Router($this->container, new Validator());
        $this->container->registerInstance('router', $router);
    }
}