<?php

function exception_error_handler($errno, $errstr, $errfile, $errline ) {
    throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
}
set_error_handler("exception_error_handler");

date_default_timezone_set('America/Montreal');

require __DIR__.'/env.php';

require __DIR__.'/../vendor/autoload.php';
