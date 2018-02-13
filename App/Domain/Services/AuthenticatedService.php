<?php

namespace App\Domain\Services;

use App\Domain\Authentication\Authenticator;
use Library\Events\EventManager;
use Library\Log\Log;
use Library\Transformer\Transformer;

class AuthenticatedService extends Service
{
    /**
     * @var Authenticator
     */
    protected $authenticator;

    public function __construct(EventManager $eventManager, Transformer $transformer, Log $log,
                                Authenticator $authenticator)
    {
        parent::__construct($eventManager, $transformer, $log);

        $this->authenticator = $authenticator;
    }
}