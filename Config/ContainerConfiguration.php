<?php

namespace Config;

use Library\Events\EventManager;
use Library\Http\Request;
use Library\Log\Log;
use Library\Mail\Mail;
use Library\Queue\Queue;
use Library\Routing\Router;
use Library\DataMapper\DataMapper;
use Library\Transformer\Transformer;
use Library\Validation\Validator;
use Library\Engine\Engine;

class ContainerConfiguration extends \Library\Container\ContainerConfiguration
{
    public function configureContainer()
    {
        $app = $this->container->resolveInstance('app');

        $this->container->registerInstance('request', new Request());
        $this->container->registerInstance('log', new Log());
        $queueConfig = require $app->basePath().'Config/queue.php';
        $queue = new Queue($queueConfig);
        $this->container->registerInstance('queue', $queue);
        $eventManagerConfig = require $app->basePath().'Config/events.php';
        $this->container->registerInstance('eventManager',
            new EventManager($eventManagerConfig, $this->container, $queue));
        $transformerConfig = require $app->basePath().'Config/transformations.php';
        $this->container->registerInstance('transformer', new Transformer($transformerConfig));
        $mailConfig = require $app->basePath().'Config/mail.php';
        $this->container->registerInstance('mail', new Mail($mailConfig));
        $router = new Router($this->container, new Validator());
        $this->container->registerInstance('router', $router);

        // ORM
        $datamapperConfig = require $app->basePath().'Config/Datamapper/datamapper.php';
        $dm = new DataMapper($datamapperConfig);
        $this->container->registerInstance('datamapper', $dm);

        // Engine
        $schema = json_decode(file_get_contents($app->basePath().'Config/Datamapper/schema.json'), true);
        $engine = new Engine($schema, $dm, $this->container);
        $this->container->registerInstance('engine', $engine);
    }
}