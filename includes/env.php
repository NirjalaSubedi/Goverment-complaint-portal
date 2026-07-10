<?php

if (!function_exists('loadEnvFile')) {
    function loadEnvFile($envFilePath)
    {
        static $loaded = false;

        if ($loaded || !file_exists($envFilePath)) {
            return;
        }

        $lines = file($envFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);

            if ($line === '' || substr($line, 0, 1) === '#' || strpos($line, '=') === false) {
                continue;
            }

            [$name, $value] = array_map('trim', explode('=', $line, 2));

            if ($name === '') {
                continue;
            }

            $valueLength = strlen($value);
            $startsWithDoubleQuote = $valueLength >= 2 && substr($value, 0, 1) === '"' && substr($value, -1) === '"';
            $startsWithSingleQuote = $valueLength >= 2 && substr($value, 0, 1) === "'" && substr($value, -1) === "'";

            if ($startsWithDoubleQuote || $startsWithSingleQuote) {
                $value = substr($value, 1, -1);
            }

            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
            putenv($name . '=' . $value);
        }

        $loaded = true;
    }
}

if (!function_exists('envValue')) {
    function envValue($key, $default = null)
    {
        $value = $_ENV[$key] ?? getenv($key);

        if ($value === false || $value === null || $value === '') {
            return $default;
        }

        return $value;
    }
}

loadEnvFile(dirname(__DIR__) . '/.env');