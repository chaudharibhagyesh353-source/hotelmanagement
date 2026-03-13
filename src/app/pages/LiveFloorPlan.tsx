import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock, Users, IndianRupee } from "lucide-react";

type TableStatus = "available" | "occupied" | "billed";

interface Table {
  id: number;
  number: number;
  status: TableStatus;
  capacity: number;
  currentGuests?: number;
  amount?: number;
  duration?: string;
  items?: number;
}

const tables: Table[] = [
  { id: 1, number: 1, status: "available", capacity: 4 },
  {
    id: 2,
    number: 2,
    status: "occupied",
    capacity: 2,
    currentGuests: 2,
    amount: 1200,
    duration: "25 mins",
    items: 4,
  },
  { id: 3, number: 3, status: "available", capacity: 6 },
  {
    id: 4,
    number: 4,
    status: "occupied",
    capacity: 4,
    currentGuests: 3,
    amount: 850,
    duration: "12 mins",
    items: 3,
  },
  {
    id: 5,
    number: 5,
    status: "occupied",
    capacity: 4,
    currentGuests: 4,
    amount: 2450,
    duration: "45 mins",
    items: 8,
  },
  {
    id: 6,
    number: 6,
    status: "billed",
    capacity: 2,
    currentGuests: 2,
    amount: 680,
    duration: "55 mins",
    items: 2,
  },
  { id: 7, number: 7, status: "available", capacity: 4 },
  {
    id: 8,
    number: 8,
    status: "occupied",
    capacity: 8,
    currentGuests: 6,
    amount: 3200,
    duration: "38 mins",
    items: 12,
  },
  { id: 9, number: 9, status: "available", capacity: 4 },
  { id: 10, number: 10, status: "available", capacity: 2 },
  {
    id: 11,
    number: 11,
    status: "occupied",
    capacity: 4,
    currentGuests: 4,
    amount: 1580,
    duration: "20 mins",
    items: 5,
  },
  {
    id: 12,
    number: 12,
    status: "billed",
    capacity: 6,
    currentGuests: 5,
    amount: 2100,
    duration: "1h 5m",
    items: 7,
  },
  { id: 13, number: 13, status: "available", capacity: 4 },
  {
    id: 14,
    number: 14,
    status: "occupied",
    capacity: 2,
    currentGuests: 2,
    amount: 420,
    duration: "8 mins",
    items: 2,
  },
  { id: 15, number: 15, status: "available", capacity: 4 },
  { id: 16, number: 16, status: "available", capacity: 8 },
  {
    id: 17,
    number: 17,
    status: "occupied",
    capacity: 4,
    currentGuests: 3,
    amount: 950,
    duration: "15 mins",
    items: 3,
  },
  { id: 18, number: 18, status: "available", capacity: 2 },
  { id: 19, number: 19, status: "available", capacity: 4 },
  { id: 20, number: 20, status: "available", capacity: 6 },
];

export function LiveFloorPlan() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [hoveredTable, setHoveredTable] = useState<number | null>(null);

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-500 hover:bg-green-200";
      case "occupied":
        return "bg-red-100 border-red-500 hover:bg-red-200";
      case "billed":
        return "bg-yellow-100 border-yellow-500 hover:bg-yellow-200";
    }
  };

  const getStatusBadge = (status: TableStatus) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-600">Available</Badge>;
      case "occupied":
        return <Badge className="bg-red-600">Occupied</Badge>;
      case "billed":
        return <Badge className="bg-yellow-600">Bill Printed</Badge>;
    }
  };

  const availableCount = tables.filter((t) => t.status === "available").length;
  const occupiedCount = tables.filter((t) => t.status === "occupied").length;
  const billedCount = tables.filter((t) => t.status === "billed").length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Live Floor Plan & Table Management
        </h1>
        <p className="text-gray-600">
          Real-time view of all restaurant tables
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tables</p>
                <p className="text-3xl font-bold text-gray-900">{tables.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-3xl font-bold text-green-600">
                  {availableCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupied</p>
                <p className="text-3xl font-bold text-red-600">
                  {occupiedCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payment</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {billedCount}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floor Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Floor Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className={`relative cursor-pointer border-4 rounded-lg p-4 transition-all ${getStatusColor(
                      table.status
                    )} ${
                      selectedTable?.id === table.id
                        ? "ring-4 ring-blue-500 scale-105"
                        : ""
                    }`}
                    onClick={() => setSelectedTable(table)}
                    onMouseEnter={() => setHoveredTable(table.id)}
                    onMouseLeave={() => setHoveredTable(null)}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {table.number}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {table.capacity} seats
                      </div>
                    </div>

                    {/* Hover Tooltip for Occupied Tables */}
                    {hoveredTable === table.id &&
                      table.status !== "available" && (
                        <div className="absolute z-10 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs whitespace-nowrap">
                          <div className="font-semibold mb-1">
                            Table {table.number}
                          </div>
                          <div>₹{table.amount?.toLocaleString()} - {table.items} items</div>
                          <div>Pending {table.duration}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="border-8 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Details Panel */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Table Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTable ? (
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      Table {selectedTable.number}
                    </div>
                    {getStatusBadge(selectedTable.status)}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Capacity</span>
                      <span className="font-semibold text-gray-900">
                        {selectedTable.capacity} guests
                      </span>
                    </div>

                    {selectedTable.status !== "available" && (
                      <>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-gray-600 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Current Guests
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedTable.currentGuests}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Duration
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedTable.duration}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm text-gray-600">Items</span>
                          <span className="font-semibold text-gray-900">
                            {selectedTable.items} items
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-3 bg-blue-50 px-3 rounded-lg">
                          <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            <IndianRupee className="w-4 h-4" />
                            Current Bill
                          </span>
                          <span className="text-xl font-bold text-blue-600">
                            ₹{selectedTable.amount?.toLocaleString()}
                          </span>
                        </div>

                        <div className="space-y-2 pt-4">
                          {selectedTable.status === "occupied" && (
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              Add Items
                            </button>
                          )}
                          {selectedTable.status === "occupied" && (
                            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Generate Bill
                            </button>
                          )}
                          {selectedTable.status === "billed" && (
                            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                              Settle Payment
                            </button>
                          )}
                        </div>
                      </>
                    )}

                    {selectedTable.status === "available" && (
                      <div className="py-8 text-center">
                        <p className="text-sm text-gray-500 mb-4">
                          This table is available
                        </p>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Assign Guests
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Select a table to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
