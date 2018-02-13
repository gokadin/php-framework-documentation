<?php

require __DIR__ . '/../Bootstrap/autoload.php';

$app = new Library\Application();

$app->configureContainer();

$app->loadRoutes();

$app->processRoute();

$app->sendResponse();
