import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { AlertTriangle, Package, Plus, Search, TrendingDown } from "lucide-react";
import { Progress } from "../components/ui/progress";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minStock: number;
  maxStock: number;
  lastRestocked: string;
  status: "good" | "low" | "critical";
}

const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Paneer",
    category: "Dairy",
    currentStock: 5,
    unit: "kg",
    minStock: 10,
    maxStock: 50,
    lastRestocked: "2 days ago",
    status: "critical",
  },
  {
    id: 2,
    name: "Chicken",
    category: "Meat",
    currentStock: 15,
    unit: "kg",
    minStock: 10,
    maxStock: 40,
    lastRestocked: "1 day ago",
    status: "low",
  },
  {
    id: 3,
    name: "Basmati Rice",
    category: "Grains",
    currentStock: 80,
    unit: "kg",
    minStock: 20,
    maxStock: 100,
    lastRestocked: "5 days ago",
    status: "good",
  },
  {
    id: 4,
    name: "Tomatoes",
    category: "Vegetables",
    currentStock: 25,
    unit: "kg",
    minStock: 15,
    maxStock: 50,
    lastRestocked: "1 day ago",
    status: "good",
  },
  {
    id: 5,
    name: "Onions",
    category: "Vegetables",
    currentStock: 30,
    unit: "kg",
    minStock: 20,
    maxStock: 60,
    lastRestocked: "2 days ago",
    status: "good",
  },
  {
    id: 6,
    name: "Cooking Oil",
    category: "Cooking",
    currentStock: 8,
    unit: "liters",
    minStock: 10,
    maxStock: 30,
    lastRestocked: "3 days ago",
    status: "low",
  },
  {
    id: 7,
    name: "Wheat Flour",
    category: "Grains",
    currentStock: 45,
    unit: "kg",
    minStock: 15,
    maxStock: 50,
    lastRestocked: "4 days ago",
    status: "good",
  },
  {
    id: 8,
    name: "Butter",
    category: "Dairy",
    currentStock: 12,
    unit: "kg",
    minStock: 5,
    maxStock: 20,
    lastRestocked: "1 day ago",
    status: "good",
  },
];

export function Inventory() {
  const criticalItems = inventoryItems.filter((i) => i.status === "critical");
  const lowStockItems = inventoryItems.filter((i) => i.status === "low");
  const goodStockItems = inventoryItems.filter((i) => i.status === "good");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>;
      case "low":
        return <Badge className="bg-yellow-600">Low Stock</Badge>;
      case "good":
        return <Badge className="bg-green-600">Good</Badge>;
    }
  };

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.maxStock) * 100;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Inventory & Stock Management
          </h1>
          <p className="text-gray-600">Track and manage your inventory levels</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Alert Banner for Critical Items */}
      {criticalItems.length > 0 && (
        <Card className="mb-6 border-l-4 border-l-red-500 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  Critical Stock Alert!
                </h3>
                <p className="text-sm text-gray-700">
                  {criticalItems.length} item(s) are below minimum stock level and
                  need immediate restocking.
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stock Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">
                  {inventoryItems.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Stock</p>
                <p className="text-3xl font-bold text-red-600">
                  {criticalItems.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {lowStockItems.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Good Stock</p>
                <p className="text-3xl font-bold text-green-600">
                  {goodStockItems.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Current Stock Levels</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search inventory..." className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 border-2 rounded-lg ${
                  item.status === "critical"
                    ? "border-red-200 bg-red-50"
                    : item.status === "low"
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {item.currentStock}
                      <span className="text-sm text-gray-600 ml-1">
                        {item.unit}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Min: {item.minStock} {item.unit}
                    </p>
                  </div>
                </div>

                {/* Stock Level Progress Bar */}
                <div className="mb-2">
                  <Progress
                    value={getStockPercentage(item)}
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Last restocked: {item.lastRestocked}</span>
                  <Button variant="outline" size="sm">
                    Restock
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
