<?php

if (!function_exists('configureEnvironment'))
{
    function configureEnvironment()
    {
        $environment = 'dev';
        $content = fopen(__DIR__.'/../../.env', 'r');
        if ($content)
        {
            $environment = explode('=', trim(str_replace(PHP_EOL, '', fgets($content))))[1];

            fclose($content);
        }

        $envFile = __DIR__.'/../../.env.'.$environment;

        $content = fopen($envFile, 'r');
        if ($content) {
            while (($line = fgets($content)) !== false) {
                if (preg_match('/[a-zA-Z0-9_-]+\=[.a-zA-Z0-9_\-@]+[\r]?[\n]?$/', $line) != 1)
                {
                    continue;
                }

                $line = trim(str_replace(PHP_EOL, '', $line));

                putenv($line);
            }

            fclose($content);
        }
    }
}

if (!function_exists('env'))
{
    function env($name)
    {
        $value = getenv($name);

        switch (strtolower($value))
        {
            case 'true':
                return true;
            case 'false':
                return false;
        }

        return $value;
    }
}