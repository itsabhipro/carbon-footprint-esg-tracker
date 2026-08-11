"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import CountriesView from "@/components/CountriesView";
import EmissionsView from "@/components/EmissionsView";
import ReportsView from "@/components/ReportsView";

export default function Home() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar active={view} onNavigate={setView} />
      <main className="lg:pl-60 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pt-16 lg:pt-6">
          {view === "dashboard" && <Dashboard />}
          {view === "countries" && <CountriesView />}
          {view === "emissions" && <EmissionsView />}
          {view === "reports" && <ReportsView />}
        </div>
      </main>
    </div>
  );
}
