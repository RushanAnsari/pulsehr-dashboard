import {
  Users,
  Activity,
  CalendarClock,
  WalletCards,
  ArrowUpRight,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    // `flex` puts the fixed-width sidebar beside the flexible dashboard area.
    <main className="flex min-h-screen bg-slate-950 text-white">
      {/* Left navigation */}
      <Sidebar />

      {/* Right side takes all remaining horizontal space */}
      <section className="min-w-0 flex-1 overflow-y-auto">
        {/* Dashboard content container */}
        <div className="mx-auto max-w-[1600px] p-6 lg:p-8">

          {/* Dashboard heading */}
          <div className="mb-8">
            <p className="mb-1 text-sm font-medium text-indigo-400">
              Overview
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here's what's happening across your organization today.
            </p>
          </div>

          {/* 
            Responsive grid:
            1 column → mobile
            2 columns → tablet
            4 columns → desktop

            `min-w-0` on the parent prevents grid content from
            creating unwanted horizontal overflow.
          */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total Employees */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.05]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Total Employees
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    248
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Users size={21} strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                  <ArrowUpRight size={13} />
                  +12%
                </span>

                <span className="text-xs text-slate-500">
                  this month
                </span>
              </div>

              {/* Decorative background glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Active Now */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.05]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Active Now
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    186
                  </h2>
                </div>

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Activity size={21} strokeWidth={1.8} />

                  {/* Small pulsing status indicator */}
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>

                <span className="text-xs text-slate-500">
                  employees online
                </span>
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Leave Requests */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-white/[0.05]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Leave Requests
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    14
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <CalendarClock size={21} strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-400">
                  5 pending
                </span>

                <span className="text-xs text-slate-500">
                  requires review
                </span>
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Payroll Status */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.05]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Payroll Status
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    96.4%
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <WalletCards size={21} strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-400">
                  <ArrowUpRight size={13} />
                  +2.4%
                </span>

                <span className="text-xs text-slate-500">
                  processed
                </span>
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}