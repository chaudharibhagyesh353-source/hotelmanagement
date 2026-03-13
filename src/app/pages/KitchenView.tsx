import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Clock, CheckCircle, AlertCircle, ChefHat } from "lucide-react";

interface KOTItem {
  id: number;
  tableNumber: number;
  kotNumber: string;
  items: { name: string; quantity: number }[];
  status: "pending" | "preparing" | "ready";
  orderTime: string;
  waitTime: string;
  priority: "normal" | "high";
}

const kotOrders: KOTItem[] = [
  {
    id: 1,
    tableNumber: 5,
    kotNumber: "KOT-1234",
    items: [
      { name: "Paneer Butter Masala", quantity: 2 },
      { name: "Butter Naan", quantity: 4 },
      { name: "Dal Makhani", quantity: 1 },
    ],
    status: "pending",
    orderTime: "14:25",
    waitTime: "2 mins",
    priority: "high",
  },
  {
    id: 2,
    tableNumber: 12,
    kotNumber: "KOT-1235",
    items: [
      { name: "Chicken Tikka", quantity: 1 },
      { name: "Veg Spring Roll", quantity: 2 },
    ],
    status: "preparing",
    orderTime: "14:20",
    waitTime: "7 mins",
    priority: "normal",
  },
  {
    id: 3,
    tableNumber: 8,
    kotNumber: "KOT-1236",
    items: [
      { name: "Veg Biryani", quantity: 2 },
      { name: "Chicken Biryani", quantity: 1 },
      { name: "Raita", quantity: 3 },
    ],
    status: "preparing",
    orderTime: "14:18",
    waitTime: "9 mins",
    priority: "normal",
  },
  {
    id: 4,
    tableNumber: 3,
    kotNumber: "KOT-1237",
    items: [
      { name: "Butter Chicken", quantity: 1 },
      { name: "Garlic Naan", quantity: 3 },
    ],
    status: "ready",
    orderTime: "14:10",
    waitTime: "17 mins",
    priority: "normal",
  },
  {
    id: 5,
    tableNumber: 15,
    kotNumber: "KOT-1238",
    items: [
      { name: "Paneer Tikka", quantity: 2 },
      { name: "Tandoori Roti", quantity: 4 },
    ],
    status: "ready",
    orderTime: "14:12",
    waitTime: "15 mins",
    priority: "normal",
  },
  {
    id: 6,
    tableNumber: 7,
    kotNumber: "KOT-1239",
    items: [
      { name: "Fish Curry", quantity: 1 },
      { name: "Butter Naan", quantity: 2 },
      { name: "Dal Tadka", quantity: 1 },
    ],
    status: "pending",
    orderTime: "14:26",
    waitTime: "1 min",
    priority: "high",
  },
];

export function KitchenView() {
  const pendingOrders = kotOrders.filter((o) => o.status === "pending");
  const preparingOrders = kotOrders.filter((o) => o.status === "preparing");
  const readyOrders = kotOrders.filter((o) => o.status === "ready");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-red-600">New Order</Badge>;
      case "preparing":
        return <Badge className="bg-yellow-600">In Progress</Badge>;
      case "ready":
        return <Badge className="bg-green-600">Ready to Serve</Badge>;
    }
  };

  const KOTCard = ({ order }: { order: KOTItem }) => (
    <Card
      className={`${
        order.priority === "high" ? "border-2 border-red-500" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
            <p className="text-sm text-gray-600 font-mono">{order.kotNumber}</p>
          </div>
          {getStatusBadge(order.status)}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {order.orderTime}
          </div>
          <div
            className={`flex items-center gap-1 font-semibold ${
              order.priority === "high" ? "text-red-600" : ""
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            {order.waitTime}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
            >
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
              <span className="text-sm font-bold text-blue-600">
                × {item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          {order.status === "pending" && (
            <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700">
              Start Preparing
            </Button>
          )}
          {order.status === "preparing" && (
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Ready
            </Button>
          )}
          {order.status === "ready" && (
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              Complete Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <ChefHat className="w-8 h-8" />
            Kitchen View / KOT
          </h1>
          <p className="text-gray-600">
            Kitchen Order Tickets - Real-time order management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="border-red-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-red-600">
                    {pendingOrders.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Orders</p>
                <p className="text-3xl font-bold text-red-600">
                  {pendingOrders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {preparingOrders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready to Serve</p>
                <p className="text-3xl font-bold text-green-600">
                  {readyOrders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KOT Boards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            New Orders ({pendingOrders.length})
          </h2>
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <KOTCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Preparing Orders */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-600" />
            In Progress ({preparingOrders.length})
          </h2>
          <div className="space-y-4">
            {preparingOrders.map((order) => (
              <KOTCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Ready Orders */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            Ready to Serve ({readyOrders.length})
          </h2>
          <div className="space-y-4">
            {readyOrders.map((order) => (
              <KOTCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
