import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Utensils,
  ChefHat,
  Receipt,
  BookOpen,
  Package,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navigationItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard Overview" },
  { path: "/floor-plan", icon: Utensils, label: "Live Floor Plan" },
  { path: "/kitchen", icon: ChefHat, label: "Kitchen View / KOT" },
  { path: "/billing", icon: Receipt, label: "Billing & POS" },
  { path: "/menu", icon: BookOpen, label: "Menu Manager" },
  { path: "/inventory", icon: Package, label: "Inventory & Stock" },
  { path: "/staff", icon: Users, label: "Staff & Payroll" },
  { path: "/reports", icon: BarChart3, label: "Reports & Analytics" },
  { path: "/settings", icon: Settings, label: "Settings" },
  { path: "/subscription", icon: CreditCard, label: "Subscription" },
];

export function DashboardLayout() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(5);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">Grand Palace</h1>
          <p className="text-xs text-blue-200 mt-1">Management System</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navigationItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-blue-600 border-l-4 border-white"
                    : "hover:bg-blue-700 border-l-4 border-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              MR
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Manager Role</p>
              <p className="text-xs text-blue-200">admin@grandpalace.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Grand Palace Hotel & Restaurant
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {currentDate} • {currentTime}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="relative"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Notifications */}
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Manager Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Rajesh Kumar
                  </p>
                  <p className="text-xs text-gray-600">Restaurant Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  RK
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
