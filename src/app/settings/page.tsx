import React from "react";
import { DashboardShell } from "@/components/web-components/overview/dashboard-shell";
import { Navbar } from "@/components/web-components/req/nonDashboard-Header";

const ProductPage = () => {
  return (
    <DashboardShell>
      <Navbar activePage="settings" />
      {/* Product page content */}
    </DashboardShell>
  );
};

export default ProductPage;
