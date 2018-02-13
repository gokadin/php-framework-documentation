<?php

namespace Tests;

use Library\Application;
use Library\DataMapper\Database\SchemaTool;
use Library\DataMapper\DataMapper;
use Library\Testing\FakerTestTrait;
use Library\Testing\TestCase;

abstract class BaseTest extends TestCase
{
    /**
     * @var DataMapper
     */
    protected $dm;

    /**
     * @var Application
     */
    protected $app;

    public function setUp()
    {
        parent::setUp();

        date_default_timezone_set('America/Montreal');
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    public function setUpApplication()
    {
        $this->app = new Application();

        $this->app->configureContainer();
    }

    public function setUpDatamapper(array $classes, bool $registerToContainer = false)
    {
        $dmConfig = [
            'mappingDriver' => 'annotation',
            'databaseDriver' => 'mysql',
            'mysql' => [
                'host' => env('DATABASE_HOST'),
                'database' => env('DATABASE_NAME'),
                'username' => env('DATABASE_USERNAME'),
                'password' => env('DATABASE_PASSWORD')
            ],
            'classes' => $classes
        ];

        $this->dm = new DataMapper($dmConfig);
        if ($registerToContainer)
        {
            $this->app->container()->registerInstance('datamapper', $this->dm);
        }

        $schemaTool = new SchemaTool($dmConfig);
        $schemaTool->create();

        $this->addTearDownCallback(function() use ($schemaTool) {
            $schemaTool->drop();
        });
    }
}