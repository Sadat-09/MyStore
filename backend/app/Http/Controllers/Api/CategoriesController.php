<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Log;


class CategoriesController extends Controller
{
    public function index()
    {
        
        $categories = Category::all();
        return response()->json($categories);
    }

    public function show(Category $category)
    {
        
        $category->load('products');
        return response()->json($category);
    }

    public function store(Request $request)
{
    
    $validatedData = $request->validate([
        'name' => 'required|string',
        'image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',     
        'image_url' => 'nullable|string|url', 
    ]);

 
    if ($request->hasFile('image')) {
        $validatedData['image'] = $request->file('image')->store('categories', 'public');
    } elseif ($request->has('image_url')) {
        
        $validatedData['image'] = $request->input('image_url');
    }

    
    $category = Category::create([
        'name' => $validatedData['name'],
        'image' => $validatedData['image'] ?? null, 
    ]);

    return response()->json([
        'message' => 'Category created successfully',
        'category' => $category,
    ], 201);
}
    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string',
            'image' => 'nullable|string',
        ]);

        $category->update($validatedData);
        return response()->json(['message' => 'Category updated successfully', 'category' => $category]);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}