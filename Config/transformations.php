<?php

return [

    App\Domain\Models\Users\User::class => [
        'id' => function($o) { return $o->getId(); },
        'firstName' => function($o) { return $o->firstName(); },
        'lastName' => function($o) { return $o->lastName(); },
        'email' => function($o) { return $o->email(); },
        'type' => function($o) { return $o->type(); }
    ]

];