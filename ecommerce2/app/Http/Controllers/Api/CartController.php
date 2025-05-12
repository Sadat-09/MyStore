<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validatedData['product_id']);

        if ($product->stock < $validatedData['quantity']) {
            return response()->json(['message' => 'Not enough stock available'], 400);
        }

        $order = Order::firstOrCreate(
            ['user_id' => auth()->id(), 'status' => 'pending'],
            ['total_price' => 0]
        );

        $orderItem = $order->items()->create([
            'product_id' => $product->id,
            'quantity' => $validatedData['quantity'],
            'price' => $product->price,
        ]);

        
        $order->update([
            'total_price' => $order->items->sum(function ($item) {
                return $item->quantity * $item->price;
            }),
        ]);

        return response()->json(['message' => 'Product added to cart', 'order' => $order]);
    }

    public function viewCart()
    {
        $order = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->where('status', 'pending')
            ->first();

        return response()->json($order);
    }

    public function checkout()
    {
        $order = Order::where('user_id', auth()->id())
            ->where('status', 'pending')
            ->first();

        if (!$order) {
            return response()->json(['message' => 'No items in the cart to checkout'], 400);
        }

        
        foreach ($order->items as $item) {
            $product = $item->product;
            if ($product->stock < $item->quantity) {
                return response()->json(['message' => "Not enough stock for product {$product->name}"], 400);
            }

            $product->decrement('stock', $item->quantity);
        }

        
        $order->update(['status' => 'completed']);

        return response()->json(['message' => 'Checkout successful', 'order' => $order]);
    }

    public function removeFromCart($itemId)
    {
        $orderItem = OrderItem::findOrFail($itemId);
        $order = $orderItem->order;

        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $orderItem->delete();

        
        $order->update([
            'total_price' => $order->items->sum(function ($item) {
                return $item->quantity * $item->price;
            }),
        ]);

        return response()->json(['message' => 'Item removed from cart', 'order' => $order]);
    }
}