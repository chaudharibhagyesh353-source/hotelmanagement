import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Download,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const planFeatures = [
  "Unlimited Tables & Seats",
  "Kitchen Order Ticket (KOT) App Access",
  "Advanced Reports & Analytics",
  "Multi-User Access (Up to 10 users)",
  "Inventory Management",
  "Staff & Payroll Management",
  "Cloud Backup & Data Security",
  "24/7 Priority Support",
  "Mobile App Access",
  "Custom Branding",
];

const paymentHistory = [
  {
    id: 1,
    date: "January 25, 2026",
    amount: 1000,
    status: "Paid",
    invoice: "INV-2026-001",
  },
  {
    id: 2,
    date: "December 25, 2025",
    amount: 1000,
    status: "Paid",
    invoice: "INV-2025-012",
  },
  {
    id: 3,
    date: "November 25, 2025",
    amount: 1000,
    status: "Paid",
    invoice: "INV-2025-011",
  },
  {
    id: 4,
    date: "October 25, 2025",
    amount: 1000,
    status: "Paid",
    invoice: "INV-2025-010",
  },
];

export function Subscription() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Subscription & Recharge
        </h1>
        <p className="text-gray-600">Manage your software subscription plan</p>
      </div>

      {/* Current Status Banner */}
      <Card className="mb-6 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Active Pro Plan
                  </h2>
                  <Badge className="bg-green-600">Active</Badge>
                </div>
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Subscription Expiry: <strong>March 25, 2026</strong>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  28 days remaining
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Monthly Plan</p>
              <p className="text-3xl font-bold text-green-600">₹1,000/mo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expiry Warning (if applicable) */}
      <Card className="mb-6 border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                Subscription Expiring Soon!
              </h3>
              <p className="text-sm text-gray-600">
                Your subscription will expire in 28 days. Renew now to avoid
                service interruption.
              </p>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700 flex-shrink-0">
              Renew Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recharge Options Card - Main Focus */}
        <div className="lg:col-span-2">
          <Card className="border-4 border-blue-600 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Monthly Pro Plan
                </CardTitle>
                <Badge className="bg-white text-blue-600 text-sm px-3 py-1">
                  Recommended
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Pricing */}
              <div className="text-center mb-8 pb-8 border-b-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-gray-900">₹1000</span>
                  <span className="text-xl text-gray-600">/ Month</span>
                </div>
                <p className="text-gray-600 mt-2">
                  Billed monthly • Cancel anytime
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  Everything You Need to Manage Your Restaurant:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {planFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <CreditCard className="w-5 h-5 mr-2" />
                Recharge Now - Pay ₹1,000
              </Button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Secure payment powered by Razorpay • All major cards & UPI accepted
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subscription Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-blue-600">₹12,000</p>
                <p className="text-xs text-gray-500 mt-1">Last 12 months</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="text-xl font-bold text-green-600">
                  February 2025
                </p>
                <p className="text-xs text-gray-500 mt-1">12 months active</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Auto-Renewal</p>
                <p className="text-xl font-bold text-purple-600">Disabled</p>
                <Button
                  variant="outline"
                  className="w-full mt-3 text-xs"
                  size="sm"
                >
                  Enable Auto-Renewal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Billing FAQs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Invoice Number
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{payment.date}</td>
                    <td className="py-4 px-4 text-gray-700 font-mono text-sm">
                      {payment.invoice}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-600">{payment.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Invoice
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
