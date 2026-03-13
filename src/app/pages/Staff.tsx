import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Users, Clock, IndianRupee, UserPlus } from "lucide-react";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  status: "active" | "off";
  shift: string;
  salary: number;
  checkinTime?: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Amit Kumar",
    role: "Chef",
    status: "active",
    shift: "Morning",
    salary: 35000,
    checkinTime: "09:00 AM",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Waiter",
    status: "active",
    shift: "Morning",
    salary: 18000,
    checkinTime: "09:15 AM",
  },
  {
    id: 3,
    name: "Rahul Singh",
    role: "Kitchen Helper",
    status: "active",
    shift: "Morning",
    salary: 15000,
    checkinTime: "08:45 AM",
  },
  {
    id: 4,
    name: "Sunita Devi",
    role: "Cleaner",
    status: "active",
    shift: "Morning",
    salary: 12000,
    checkinTime: "08:30 AM",
  },
  {
    id: 5,
    name: "Vikram Patel",
    role: "Waiter",
    status: "off",
    shift: "Evening",
    salary: 18000,
  },
];

export function Staff() {
  const activeStaff = staffMembers.filter((s) => s.status === "active");
  const totalSalary = staffMembers.reduce((sum, s) => sum + s.salary, 0);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Staff & Payroll Management
          </h1>
          <p className="text-gray-600">Manage your team and payroll</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Staff
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-3xl font-bold text-gray-900">
                  {staffMembers.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Duty Today</p>
                <p className="text-3xl font-bold text-green-600">
                  {activeStaff.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Off Duty</p>
                <p className="text-3xl font-bold text-gray-600">
                  {staffMembers.length - activeStaff.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Payroll</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{totalSalary.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {staffMembers.map((staff) => (
              <div
                key={staff.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {staff.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                    <p className="text-sm text-gray-600">{staff.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-xs text-gray-600">Shift</p>
                    <p className="text-sm font-medium text-gray-900">
                      {staff.shift}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Salary</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{staff.salary.toLocaleString()}
                    </p>
                  </div>
                  {staff.checkinTime && (
                    <div>
                      <p className="text-xs text-gray-600">Check-in</p>
                      <p className="text-sm font-medium text-gray-900">
                        {staff.checkinTime}
                      </p>
                    </div>
                  )}
                  <div>
                    {staff.status === "active" ? (
                      <Badge className="bg-green-600">On Duty</Badge>
                    ) : (
                      <Badge className="bg-gray-600">Off Duty</Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
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
