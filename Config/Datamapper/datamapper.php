<?php

return [

    'mappingDriver' => 'annotation',

    'databaseDriver' => 'mysql',

    'mysql' => [
        'host' => env('DATABASE_HOST'),
        'database' => env('DATABASE_NAME'),
        'username' => env('DATABASE_USERNAME'),
        'password' => env('DATABASE_PASSWORD')
    ],

    'classes' => [
        App\Domain\Models\Users\User::class,
        App\Domain\Models\Day::class,
    ]

];