
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  // Controls desktop/tablet sidebar width.
  const [collapsed, setCollapsed] = useState(false);

  // Controls the mobile navigation drawer.
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="flex min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">

      {/* Desktop and tablet sidebar */}
      <div className="hidden shrink-0 md:flex">
        <div className="relative">
          <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((current) => !current)} />

          {/* Desktop collapse control */}
          
        </div>
      </div>

      {/* Main application area */}
      <section className="min-w-0 w-full flex-1 overflow-x-hidden overflow-y-auto">

        {/* Mobile top navigation */}
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 backdrop-blur-xl md:hidden">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
              P
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                PulseHR
              </p>

              <p className="text-[10px] text-slate-500">
                People management
              </p>
            </div>
          </a>

          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Page content */}
        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-8">
          {children}
        </div>
      </section>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">

          {/* Clicking this backdrop closes the drawer. */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Sliding mobile sidebar */}
          <div className="absolute inset-y-0 left-0 z-50 w-72 animate-[slideIn_250ms_ease-out]">
            <Sidebar mobile onClose={() => setMobileOpen(false)} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
