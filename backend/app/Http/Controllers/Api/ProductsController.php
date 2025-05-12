<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;


class ProductsController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json($products);
       
    }

  public function   store(Request $request)
    {
        
       
         $request->validate([
            
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'nullable|string', 
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::create($request->all());
        return response()->json($product, 201);
    }
    public function show(Product $product)
    {
        
        $product->load('category');
        return response()->json($product);
    }
    

   
    public function update(Request $request, Product $product)
    {
       
        $validatedData = $request->validate([
            'name' => 'sometimes|required',
            'price' => 'sometimes|required|numeric',
            'description' => 'sometimes|required|string',
            'stock' => 'sometimes|required|integer',
            'image' => 'sometimes|nullable|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $product->update($validatedData);
        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
    
    public function GetDetails($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
    public function getProductsByCategory($id)
{
    $products = Product::where('category_id', $id)->with('category')->get();
    return response()->json($products);
}

public function autocomplete(Request $request)
    {
        $query = $request->input('q');
        $products = Product::where('name', 'LIKE', "%$query%")
            ->select('id', 'name', 'image') 
            ->get();

        return response()->json($products);
    }

   
    public function search(Request $request)
    {
        $query = $request->input('q');
        $products = Product::where('name', 'LIKE', "%$query%")
            ->orWhereHas('category', function ($q) use ($query) {
                $q->where('name', 'LIKE', "%$query%");
            })
            ->with('category') 
            ->get();

        return response()->json($products);
    }
}
