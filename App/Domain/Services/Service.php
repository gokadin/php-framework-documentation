<?php

namespace App\Domain\Services;

use Library\Events\Event;
use Library\Events\EventManager;
use Library\Log\Log;
use Library\Transformer\Transformer;

abstract class Service
{
    /**
     * @var EventManager
     */
    private $eventManager;

    /**
     * @var Transformer
     */
    protected $transformer;

    /**
     * @var Log
     */
    protected $log;

    public function __construct(EventManager $eventManager, Transformer $transformer, Log $log)
    {
        $this->eventManager = $eventManager;
        $this->transformer = $transformer;
        $this->log = $log;
    }

    /**
     * @param Event $event
     */
    protected function fireEvent(Event $event)
    {
        $this->eventManager->fire($event);
    }
}