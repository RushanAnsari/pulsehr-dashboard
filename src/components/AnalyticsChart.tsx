
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

// Temporary static data.
// Later this will come from our backend/API.
const hiringData = [
  { month: "May", employees: 142 },
  { month: "Jun", employees: 156 },
  { month: "Jul", employees: 168 },
  { month: "Aug", employees: 181 },
  { month: "Sep", employees: 214 },
  { month: "Oct", employees: 248 },
];

// Custom tooltip shown when the user hovers over a chart point.
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/95 px-4 py-3 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
      <p className="mb-1 text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="text-sm font-semibold text-white">
        {payload[0].value} employees
      </p>
    </div>
  );
}

export default function AnalyticsChart() {
  return (
    <section className="mt-6 w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">

      {/* Chart header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-semibold text-white sm:text-lg">
              Hiring Trends
            </h2>

            <span className="hidden items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 sm:flex">
              <TrendingUp size={13} />
              +18.6%
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Employee growth over the last 6 months
          </p>
        </div>

        {/* Time range indicator */}
        <span className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
          6 Months
        </span>
      </div>

      {/* 
        Responsive chart wrapper.
        `min-w-0` prevents Recharts from forcing the page wider
        than the viewport on smaller screens.
      */}
      <div className="h-[280px] w-full min-w-0 sm:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hiringData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              {/* Gradient used to create the glowing area effect */}
              <linearGradient id="hiringGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#ffffff08" vertical={false} />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={45}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#6366f1", strokeOpacity: 0.2 }}
            />

            <Area
              type="monotone"
              dataKey="employees"
              stroke="#818cf8"
              strokeWidth={2}
              fill="url(#hiringGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#818cf8",
                stroke: "#0f172a",
                strokeWidth: 3,
              }}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

