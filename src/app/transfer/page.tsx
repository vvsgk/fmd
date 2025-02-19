import React from "react";
import { DashboardShell } from "@/components/web-components/overview/dashboard-shell";
import { Navbar } from "@/components/web-components/req/nonDashboard-Header";

const ProductPage = () => {
  return (
    <DashboardShell>
      <Navbar activePage="transfer" />
        <h1>Trnsfer Page</h1>
    </DashboardShell>
  );
};

export default ProductPage;
