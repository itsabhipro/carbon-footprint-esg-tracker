"use client";

import { useState } from "react";
// Change from default imports to structured named imports
import Sidebar from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { CountriesView } from "@/components/CountriesView";
import { EmissionsView } from "@/components/EmissionsView";
import { ReportsView } from "@/components/ReportsView";

export default function Home() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 antialiased">
      <Sidebar active={view} onNavigate={setView} />
      <main className="flex-1 p-2 overflow-y-auto">
        {view === "dashboard" && <Dashboard />}
        {view === "emissions" && <EmissionsView />}
        {view === "countries" && <CountriesView />}
        {view === "reports" && <ReportsView />}
      </main>
    </div>
  );
}
