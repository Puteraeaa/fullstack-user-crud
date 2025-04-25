<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        api: __DIR__.'/../routes/api.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Mendaftarkan middleware dengan alias yang benar
        $middleware->alias([
            'log.request' => \App\Http\Middleware\LogRequest::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Konfigurasi pengecualian jika perlu
    })
    ->create();
