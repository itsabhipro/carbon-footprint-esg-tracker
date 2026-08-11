"use client";

import { Leaf, LayoutDashboard, Globe2, BarChart3, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "countries", label: "Countries", icon: Globe2 },
  { id: "emissions", label: "Emissions", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ active, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow border border-slate-200"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-60 bg-eco-900 text-white flex flex-col transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-eco-700/50">
          <div className="w-9 h-9 rounded-lg bg-eco-500 flex items-center justify-center">
            <Leaf size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm">Carbon & ESG</p>
            <p className="text-xs text-eco-100/70">Tracker</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-eco-600 text-white"
                    : "text-eco-100/80 hover:bg-eco-800 hover:text-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-eco-700/50 text-xs text-eco-100/60">
          Multi-country · Scope 1–3 · ESG
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
