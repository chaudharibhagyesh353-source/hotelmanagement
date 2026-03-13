import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  image?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    price: 280,
    category: "Mains",
    inStock: true,
  },
  {
    id: 2,
    name: "Butter Chicken",
    price: 320,
    category: "Mains",
    inStock: true,
  },
  {
    id: 3,
    name: "Dal Makhani",
    price: 220,
    category: "Mains",
    inStock: true,
  },
  {
    id: 4,
    name: "Veg Biryani",
    price: 250,
    category: "Mains",
    inStock: false,
  },
  {
    id: 5,
    name: "Chicken Biryani",
    price: 300,
    category: "Mains",
    inStock: true,
  },
  {
    id: 6,
    name: "Paneer Tikka",
    price: 240,
    category: "Starters",
    inStock: true,
  },
  {
    id: 7,
    name: "Chicken Tikka",
    price: 280,
    category: "Starters",
    inStock: true,
  },
  {
    id: 8,
    name: "Veg Spring Roll",
    price: 180,
    category: "Starters",
    inStock: true,
  },
  {
    id: 9,
    name: "Fish Tikka",
    price: 320,
    category: "Starters",
    inStock: false,
  },
  {
    id: 10,
    name: "Coke",
    price: 60,
    category: "Beverages",
    inStock: true,
  },
  {
    id: 11,
    name: "Fresh Lime Soda",
    price: 80,
    category: "Beverages",
    inStock: true,
  },
  {
    id: 12,
    name: "Masala Chai",
    price: 40,
    category: "Beverages",
    inStock: true,
  },
  {
    id: 13,
    name: "Mango Lassi",
    price: 90,
    category: "Beverages",
    inStock: true,
  },
];

export function MenuManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Mains");

  const categories = ["Mains", "Starters", "Beverages", "Breads", "Desserts"];

  const filteredProducts = products.filter(
    (product) =>
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Menu Manager
          </h1>
          <p className="text-gray-600">
            Manage your restaurant menu items and categories
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Menu Items</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-3">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No items found in this category</p>
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <ImageWithFallback
                            src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{product.price}
                          </p>
                        </div>

                        {/* In Stock Toggle */}
                        <div className="flex items-center gap-2">
                          <Switch checked={product.inStock} />
                          <span
                            className={`text-sm font-medium ${
                              product.inStock
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category
          );
          const inStock = categoryProducts.filter((p) => p.inStock).length;
          return (
            <Card key={category}>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-2">{category}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categoryProducts.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {inStock} in stock
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
