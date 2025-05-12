<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): mixed
    {
        
        if (auth()->check() && auth()->user()->role === $role) {
            return $next($request);
        }

        
        return response()->json(['message' => 'Access denied.'], 403);
    }
}