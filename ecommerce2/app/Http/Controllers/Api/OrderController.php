<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    
    public function getOrderHistory()
    {
        $user = auth()->user();
    
        
        $orders = Order::with('items.product')
            ->where('user_id', $user->id)
            ->where('status', 'completed') 
            ->orderBy('created_at', 'desc')
            ->get();
    
        return response()->json($orders);
    }

    
}
