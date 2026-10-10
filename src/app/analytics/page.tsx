
"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  DollarSign,
  Users,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock department data. Replace with API data when the backend is ready.
const departmentData = [
  { department: "Engineering", employees: 42, color: "#818CF8" },
  { department: "Design", employees: 18, color: "#22D3EE" },
  { department: "Marketing", employees: 24, color: "#F472B6" },
  { department: "Finance", employees: 16, color: "#34D399" },
];

// Six months of sample financial data. Values are in INR lakhs.
const financialData = [
  { month: "May", expenses: 8.2, budget: 10 },
  { month: "Jun", expenses: 9.1, budget: 10 },
  { month: "Jul", expenses: 8.7, budget: 10 },
  { month: "Aug", expenses: 9.6, budget: 10 },
  { month: "Sep", expenses: 8.9, budget: 10 },
  { month: "Oct", expenses: 9.3, budget: 10 },
];

const totalEmployees = departmentData.reduce((sum, item) => sum + item.employees, 0);
const totalExpenses = financialData.reduce((sum, item) => sum + item.expenses, 0);
const totalBudget = financialData.reduce((sum, item) => sum + item.budget, 0);
const budgetUtilization = Math.round((totalExpenses / totalBudget) * 100);
const budgetSavings = totalBudget - totalExpenses;

// Shared currency formatter for chart labels and metric cards.
function formatLakhs(value: number) {
  return `₹${value.toFixed(1)}L`;
}

export default function AnalyticsPage() {
  // Clicking a legend item hides or restores that department's pie slice.
  const [visibleDepartments, setVisibleDepartments] = useState<string[]>(departmentData.map((item) => item.department));

  const visibleDepartmentData = departmentData.filter((item) => visibleDepartments.includes(item.department));
  const visibleEmployees = visibleDepartmentData.reduce((sum, item) => sum + item.employees, 0);

  function toggleDepartment(department: string) {
    setVisibleDepartments((current) => {
      if (current.includes(department)) {
        // Keep at least one department visible.
        if (current.length === 1) return current;
        return current.filter((item) => item !== department);
      }
      return [...current, department];
    });
  }

  return (
    <DashboardShell>
      <main className="mx-auto w-full min-w-0 max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-indigo-400">Workspace / Insights</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Analytics &amp; Reports Deep-Dive</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Explore workforce distribution, financial performance, and budget utilization across PulseHR.</p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-400">
            <Activity size={16} className="text-emerald-400" />
            Reporting period: May – Oct 2026
          </div>
        </div>

        {/* Top-level analytics KPIs */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Total Employees" value={String(totalEmployees)} description="Across 4 departments" icon={Users} iconClass="text-indigo-400" iconBg="bg-indigo-500/10" trend="+8.2%" positive />
          <MetricCard title="Monthly Avg. Expense" value={formatLakhs(totalExpenses / financialData.length)} description="Average monthly spend" icon={DollarSign} iconClass="text-cyan-400" iconBg="bg-cyan-500/10" trend="−2.4%" positive />
          <MetricCard title="Budget Utilization" value={`${budgetUtilization}%`} description="Of the 6-month budget" icon={BriefcaseBusiness} iconClass="text-fuchsia-400" iconBg="bg-fuchsia-500/10" trend={`${100 - budgetUtilization}% remaining`} positive />
          <MetricCard title="Budget Remaining" value={formatLakhs(budgetSavings)} description="Across the reporting period" icon={Activity} iconClass="text-emerald-400" iconBg="bg-emerald-500/10" trend="Within budget" positive />
        </section>


        {/* Charts use min-w-0 so Recharts can measure responsive containers correctly. */}
        <section className="mt-8 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Department distribution donut */}
          <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white sm:text-lg">Department Distribution</h2>
                <p className="mt-1 text-xs text-slate-500">Workforce breakdown by department</p>
              </div>
              <span className="w-fit rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">Headcount</span>
            </div>

            <div className="mt-6 grid min-w-0 grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="relative h-[260px] min-w-0 sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={visibleDepartmentData} dataKey="employees" nameKey="department" cx="50%" cy="50%" innerRadius="62%" outerRadius="84%" paddingAngle={4} stroke="none" cornerRadius={5}>
                      {visibleDepartmentData.map((entry) => (
                        <Cell key={entry.department} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<DepartmentTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label for the currently visible slices */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold tracking-tight text-white">{visibleEmployees}</span>
                  <span className="mt-1 text-xs text-slate-500">Employees</span>
                  <span className="mt-2 text-[10px] text-slate-600">of {totalEmployees} total</span>
                </div>
              </div>

              {/* Interactive legend also acts as a department filter. */}
              <div className="min-w-0 space-y-2">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Departments</p>
                {departmentData.map((item) => {
                  const isVisible = visibleDepartments.includes(item.department);
                  const percentage = Math.round((item.employees / totalEmployees) * 100);

                  return (
                    <button key={item.department} type="button" aria-pressed={isVisible} onClick={() => toggleDepartment(item.department)} className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left transition-all ${isVisible ? "border-white/10 bg-white/[0.04]" : "border-transparent bg-black/10 opacity-50 hover:opacity-80"}`}>
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}70` }} />
                        <span className="truncate text-xs font-medium text-slate-300">{item.department}</span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-sm font-semibold text-white">{item.employees}</span>
                        <span className="text-[10px] text-slate-500">{percentage}%</span>
                      </span>
                    </button>
                  );
                })}
                <p className="pt-2 text-[11px] leading-5 text-slate-500">Select a department to toggle its slice. At least one department stays visible.</p>
              </div>
            </div>
          </article>

          {/* Financial expenses versus budget target */}
          <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-white sm:text-lg">Financial Analytics</h2>
                <p className="mt-1 text-xs text-slate-500">Monthly expenses vs. budget target</p>
              </div>
              <span className="w-fit rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300">INR · Lakhs</span>
            </div>

            <div className="mt-6 h-[300px] min-w-0 sm:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={financialData} margin={{ top: 12, right: 4, left: -14, bottom: 0 }}>
                  <CartesianGrid stroke="#ffffff" strokeOpacity={0.06} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} tickMargin={12} />
                  <YAxis domain={[0, 12]} ticks={[0, 3, 6, 9, 12]} tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(value: number) => `₹${value}L`} />
                  <Tooltip content={<FinancialTooltip />} cursor={{ fill: "#ffffff", fillOpacity: 0.04 }} />
                  <ReferenceLine y={10} stroke="#22D3EE" strokeDasharray="5 5" strokeOpacity={0.35} />
                  <Bar dataKey="expenses" name="Expenses" fill="#818CF8" radius={[6, 6, 0, 0]} maxBarSize={38} />
                  <Line dataKey="budget" name="Budget target" type="monotone" stroke="#22D3EE" strokeWidth={2.5} dot={{ r: 3, fill: "#22D3EE", stroke: "#0F172A", strokeWidth: 2 }} activeDot={{ r: 5, fill: "#22D3EE", stroke: "#ffffff", strokeWidth: 1 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Chart legend */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2.5 w-2.5 rounded-sm bg-indigo-400" />Monthly expenses</div>
              <div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-0.5 w-5 rounded-full bg-cyan-400" />Budget target</div>
              <div className="ml-auto text-xs font-medium text-emerald-400">{formatLakhs(budgetSavings)} under budget</div>
            </div>
          </article>
        </section>

        {/* Additional reporting insight cards */}
        <section className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><ArrowDownRight size={21} /></div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Budget Performance</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">Total recorded expenses are {budgetUtilization}% of the planned six-month budget, leaving {formatLakhs(budgetSavings)} unspent.</p>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400"><ArrowUpRight size={21} /></div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Workforce Overview</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">Engineering is the largest department, representing {Math.round((departmentData[0].employees / totalEmployees) * 100)}% of the current workforce in this sample dataset.</p>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">PulseHR Analytics · Sample reporting data · May–October 2026</p>
      </main>
    </DashboardShell>
  );
}

// Reusable KPI card.
function MetricCard({ title, value, description, icon: Icon, iconClass, iconBg, trend, positive }: { title: string; value: string; description: string; icon: typeof Users; iconClass: string; iconBg: string; trend: string; positive: boolean }) {
  return (
    <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-3 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">{value}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon size={19} className={iconClass} />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-slate-500">{description}</p>
        <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {trend}
        </span>
      </div>
    </article>
  );
}

// Custom department tooltip for the donut chart.
function DepartmentTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { department: string; employees: number; color: string } }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/95 px-4 py-3 shadow-2xl">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
        <p className="text-xs text-slate-400">{item.department}</p>
      </div>
      <p className="mt-1 text-lg font-bold text-white">{item.employees} employees</p>
      <p className="text-xs text-slate-500">{Math.round((item.employees / totalEmployees) * 100)}% of total workforce</p>
    </div>
  );
}

// Custom tooltip shared by monthly expenses and budget target.
function FinancialTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/95 px-4 py-3 shadow-2xl">
      <p className="mb-2 text-xs font-semibold text-white">{label} 2026</p>
      {payload.map((item) => (
        <div key={item.name} className="flex items-center justify-between gap-5 py-1">
          <span className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>
          <span className="text-xs font-semibold text-white">{formatLakhs(item.value)}</span>
        </div>
      ))}
    </div>
  );
}

