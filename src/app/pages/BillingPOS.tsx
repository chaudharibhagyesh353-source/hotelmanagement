import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  IndianRupee,
  Printer,
  Split,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface BillItem {
  menuItem: MenuItem;
  quantity: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Paneer Butter Masala", price: 280, category: "Mains" },
  { id: 2, name: "Butter Chicken", price: 320, category: "Mains" },
  { id: 3, name: "Dal Makhani", price: 220, category: "Mains" },
  { id: 4, name: "Veg Biryani", price: 250, category: "Mains" },
  { id: 5, name: "Chicken Biryani", price: 300, category: "Mains" },
  { id: 6, name: "Garlic Naan", price: 60, category: "Breads" },
  { id: 7, name: "Butter Naan", price: 50, category: "Breads" },
  { id: 8, name: "Tandoori Roti", price: 35, category: "Breads" },
  { id: 9, name: "Paneer Tikka", price: 240, category: "Starters" },
  { id: 10, name: "Chicken Tikka", price: 280, category: "Starters" },
  { id: 11, name: "Veg Spring Roll", price: 180, category: "Starters" },
  { id: 12, name: "Coke", price: 60, category: "Beverages" },
  { id: 13, name: "Fresh Lime Soda", price: 80, category: "Beverages" },
  { id: 14, name: "Masala Chai", price: 40, category: "Beverages" },
  { id: 15, name: "Gulab Jamun", price: 80, category: "Desserts" },
  { id: 16, name: "Ice Cream", price: 100, category: "Desserts" },
];

export function BillingPOS() {
  const [selectedTable, setSelectedTable] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [discount, setDiscount] = useState(0);

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItemToBill = (menuItem: MenuItem) => {
    const existingItem = billItems.find(
      (item) => item.menuItem.id === menuItem.id
    );
    if (existingItem) {
      setBillItems(
        billItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setBillItems([...billItems, { menuItem, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setBillItems(
      billItems
        .map((item) =>
          item.menuItem.id === itemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId: number) => {
    setBillItems(billItems.filter((item) => item.menuItem.id !== itemId));
  };

  const subtotal = billItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const gstAmount = subtotal * 0.05; // 5% GST
  const serviceCharge = subtotal * 0.1; // 10% service charge
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal + gstAmount + serviceCharge - discountAmount;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Billing & Point of Sale
        </h1>
        <p className="text-gray-600">Create and manage customer bills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Menu Selection */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Table
                  </label>
                  <Select value={selectedTable} onValueChange={setSelectedTable}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          Table {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search Menu Items
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                {filteredMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItemToBill(item)}
                    className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.category}
                        </p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{item.price}
                        </p>
                      </div>
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Bill Summary */}
        <div>
          <Card className="sticky top-4">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <span>Current Bill</span>
                <span className="text-sm font-normal">Table {selectedTable}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Items List */}
              <div className="max-h-[300px] overflow-y-auto p-4 space-y-2">
                {billItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No items added yet</p>
                  </div>
                ) : (
                  billItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.menuItem.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{item.menuItem.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, -1)}
                          className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, 1)}
                          className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.menuItem.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bill Summary */}
              <div className="p-4 bg-gray-50 space-y-2 border-t-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Charge (10%)</span>
                  <span className="font-semibold">
                    ₹{serviceCharge.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t">
                  <span className="text-gray-600">Discount (%)</span>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-20 h-8 text-right"
                    min="0"
                    max="100"
                  />
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount Amount</span>
                    <span className="font-semibold">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-gray-300">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-5 h-5" />
                    Final Total
                  </span>
                  <span className="text-blue-600">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-2 border-t-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Bill
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 border-gray-300"
                >
                  <Split className="w-4 h-4 mr-2" />
                  Split Bill
                </Button>
                <div className="pt-2 border-t">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Settle Payment:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="h-16 flex flex-col gap-1"
                    >
                      <Wallet className="w-5 h-5" />
                      <span className="text-xs">Cash</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex flex-col gap-1"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-xs">UPI</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex flex-col gap-1"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-xs">Card</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
