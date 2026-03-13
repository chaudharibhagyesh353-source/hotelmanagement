import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  IndianRupee,
  Utensils,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 45000 },
  { day: "Tue", sales: 52000 },
  { day: "Wed", sales: 48000 },
  { day: "Thu", sales: 61000 },
  { day: "Fri", sales: 73000 },
  { day: "Sat", sales: 85000 },
  { day: "Sun", sales: 78000 },
];

const recentActivity = [
  {
    id: 1,
    action: "Table 12 - Bill Settled",
    amount: "₹2,450",
    time: "2 mins ago",
    type: "success",
  },
  {
    id: 2,
    action: "Low Stock Alert: Paneer",
    amount: "5 kg left",
    time: "15 mins ago",
    type: "warning",
  },
  {
    id: 3,
    action: "Table 5 - Order Placed",
    amount: "₹1,850",
    time: "18 mins ago",
    type: "info",
  },
  {
    id: 4,
    action: "KOT #1234 - Completed",
    amount: "4 items",
    time: "22 mins ago",
    type: "success",
  },
  {
    id: 5,
    action: "New Staff Check-in: Amit",
    amount: "Kitchen",
    time: "1 hour ago",
    type: "info",
  },
];

const urgentActions = [
  {
    id: 1,
    title: "Subscription Expiring Soon",
    description: "Your Pro Plan expires in 7 days",
    action: "Renew Now",
    priority: "high",
  },
  {
    id: 2,
    title: "Low Stock Items",
    description: "3 items need immediate restock",
    action: "View Details",
    priority: "medium",
  },
  {
    id: 3,
    title: "Pending Bills",
    description: "2 tables with pending payments",
    action: "Check Now",
    priority: "high",
  },
];

export function DashboardOverview() {
  return (
    <div className="p-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today's Total Sales
            </CardTitle>
            <IndianRupee className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">₹42,580</div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              +12.5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Live Active Tables
            </CardTitle>
            <Utensils className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">12 / 20</div>
            <p className="text-xs text-gray-500 mt-1">60% occupancy rate</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Orders KOT
            </CardTitle>
            <ClipboardList className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-500 mt-1">4 in progress</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Graph and Urgent Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Sales Performance</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Revenue trends for the past 7 days
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#1e3a8a"
                  strokeWidth={3}
                  dot={{ fill: "#1e3a8a", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent Actions</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Items requiring attention
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {urgentActions.map((action) => (
              <div
                key={action.id}
                className={`p-3 rounded-lg border-l-4 ${
                  action.priority === "high"
                    ? "border-l-red-500 bg-red-50"
                    : "border-l-yellow-500 bg-yellow-50"
                }`}
              >
                <h4 className="font-semibold text-sm text-gray-900">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {action.description}
                </p>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2">
                  {action.action} →
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Live feed of system events
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
