
import {
  Users,
  Activity,
  CalendarClock,
  WalletCards,
  ArrowUpRight,
} from "lucide-react";

import DashboardShell from "@/components/DashboardShell";
import AnalyticsChart from "@/components/AnalyticsChart";
import RecentActivity from "@/components/RecentActivity";

export default function Home() {
  return (
    <DashboardShell>
      {/* Dashboard heading */}
      <div className="mb-6 sm:mb-8">
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

      {/* Summary cards */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Employees */}
        <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.05]">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-400">
                Total Employees
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                248
              </h2>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users size={21} strokeWidth={1.8} />
            </div>
          </div>

          <div className="mt-5 flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight size={13} />
              +12%
            </span>

            <span className="truncate text-xs text-slate-500">
              this month
            </span>
          </div>
        </div>

        {/* Active Now */}
        <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.05]">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-400">
                Active Now
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                186
              </h2>
            </div>

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity size={21} strokeWidth={1.8} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>
          </div>

          <div className="mt-5 flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>

            <span className="truncate text-xs text-slate-500">
              employees online
            </span>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-white/[0.05]">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-400">
                Leave Requests
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                14
              </h2>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <CalendarClock size={21} strokeWidth={1.8} />
            </div>
          </div>

          <div className="mt-5 flex min-w-0 items-center gap-2">
            <span className="shrink-0 rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-400">
              5 pending
            </span>

            <span className="truncate text-xs text-slate-500">
              requires review
            </span>
          </div>
        </div>

        {/* Payroll Status */}
        <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/[0.05]">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-400">
                Payroll Status
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                96.4%
              </h2>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <WalletCards size={21} strokeWidth={1.8} />
            </div>
          </div>

          <div className="mt-5 flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-400">
              <ArrowUpRight size={13} />
              +2.4%
            </span>

            <span className="truncate text-xs text-slate-500">
              processed
            </span>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <AnalyticsChart />

      {/* Recent employee activity */}
      <RecentActivity />
    </DashboardShell>
  );
}
