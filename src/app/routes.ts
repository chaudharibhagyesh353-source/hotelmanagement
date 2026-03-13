import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardOverview } from "./pages/DashboardOverview";
import { LiveFloorPlan } from "./pages/LiveFloorPlan";
import { KitchenView } from "./pages/KitchenView";
import { BillingPOS } from "./pages/BillingPOS";
import { MenuManager } from "./pages/MenuManager";
import { Inventory } from "./pages/Inventory";
import { Staff } from "./pages/Staff";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { Subscription } from "./pages/Subscription";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardOverview },
      { path: "floor-plan", Component: LiveFloorPlan },
      { path: "kitchen", Component: KitchenView },
      { path: "billing", Component: BillingPOS },
      { path: "menu", Component: MenuManager },
      { path: "inventory", Component: Inventory },
      { path: "staff", Component: Staff },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
      { path: "subscription", Component: Subscription },
    ],
  },
]);
