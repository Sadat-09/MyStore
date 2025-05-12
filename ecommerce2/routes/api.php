<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoriesController;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
// Route::get('orders', [OrderController::class, 'getOrderHistory'])->middleware('auth:sanctum'); 
Route::get('products', [ProductsController::class, 'index']);
Route::get('products/category/{id}', [ProductsController::class, 'getProductsByCategory']);
Route::get('/products/autocomplete', [ProductsController::class, 'autocomplete']);
Route::get('/products/search', [ProductsController::class, 'search']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('products', ProductsController::class); 
//     Route::post('logout', [AuthController::class, 'logout']); 

// });

Route::middleware('auth:sanctum')->group(function () {
    Route::post('cart', [CartController::class, 'addToCart']);
    Route::get('cart', [CartController::class, 'viewCart']);
    Route::delete('cart/{item}', [CartController::class, 'removeFromCart']);
    Route::post('checkout', [CartController::class, 'checkout']);
    Route::get('profile', [AuthController::class, 'getUserProfile']);
    Route::post('/change-password', [UserController::class, 'changePassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Route::get('products', [ProductsController::class, 'index']); 
    Route::get('products/{product}', [ProductsController::class, 'show']);
    Route::get('orders', [OrderController::class, 'getOrderHistory'])->middleware('auth:sanctum');
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('products', [ProductsController::class, 'store']);
    Route::get('users', [UserController::class, 'index']);
    Route::put('products/{product}', [ProductsController::class, 'update']);
    Route::put('users/{id}/role', [UserController::class, 'updateRole']);
    Route::delete('products/{product}', [ProductsController::class, 'destroy']);


    Route::post('categories', [CategoriesController::class, 'store']);
    Route::put('categories/{category}', [CategoriesController::class, 'update']);
    Route::delete('categories/{category}', [CategoriesController::class, 'destroy']);
});
Route::get('categories', [CategoriesController::class, 'index']);

