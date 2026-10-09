"use client";

import { useEffect, useState } from "react";
import { BarChart3, CalendarDays, Clock3, LogIn, LogOut, Monitor, Users, CheckCircle2, AlertCircle }  from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import DashboardShell from "@/components/DashboardShell";

// Weekly attendance percentage by department. Replace with API data later.

const weeklyAttendance = [
    {department: "Engineering", attendance: 96, color: "#818cf8"},
    {department: "Design", attendance: 92, color: "#a78bfa"},
    {department: "Marketing", attendance: 88, color: "#38bdf8"},
    {department: "Finance", attendance: 95, color: "#34d399"},
    {department: "HR", attendance: 98, color: "#fbbf24"},
];

// Initial mock metrics for today's attendance overview.
const initialMetrics = [
    {label: "On Time", value: 124, change: "Checked in on schedule", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-400"},
    {label: "Late Arrivals", value: 8, change: "Arrived after schedule", icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-500/10", dot: "bg-amber-400"},
    {label: "Remote", value: 18, change: "Working remotely", icon: Monitor, color: "text-sky-400", bg: "bg-sky-500/10", dot: "bg-sky-400"},
    {label: "Absent", value: 5, change: "Not Checked in today", icon: Users, color: "text-rose-400", bg: "bg-rose-500/10", dot: "bg-rose-400"},
];

type AttendanceLog = {
    id: number;
    action: "Clock In" | "Clock Out";
    timestamp: string;
};

export default function AttendancePage() {
    // Track the current Clock state and the employee's activity log.
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [clockInAt, setClockInAt] = useState<string | null>(null);
    const [clockOutAt, setClockOutAt] = useState<string | null>(null);
    const [logs, setLogs] = useState<AttendanceLog[]>([]);

    // Set data and greeting after mounting to avoid server/client data mismatch.
    const [currentDate, setCurrentDate] = useState("");
    const [greeting, setGreeting] = useState("Hello");

    useEffect(() => {
        const now = new Date();
        setCurrentDate(now.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"}));

        const hour = now.getHours();
        setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternonn" : "Good evening");
    }, []);

// Format a local timestamp for the acitvity log.
function getTimestamp() {
    return new Date().toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric", hour : "2-digit", minute: "2-digit", second: "2-digit"});
}

// Toggle clock state and record each action with a timestamp.
function handleClockToggle() {
    const timestamp = getTimestamp();

    if (!isClockedIn) {
        setIsClockedIn(true);
        setClockInAt(timestamp);
        setClockOutAt(null);
        setLogs((current) => [{ id: Date.now(), action: "Clock In", timestamp}, ...current]);
    } else {
        setIsClockedIn(false);
        setClockOutAt(timestamp);
        setLogs((current) => [{ id: Date.now(), action: "Clock Out", timestamp}, ...current]);
    }
}

return (
    <DashboardShell>
      <div className="mx-auto w-full min-w-0 max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-indigo-400">Workspace / Time & Attendance</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Attendance Management</h1>
            <p className="mt-2 text-sm text-slate-400">Track work hours, attendance trends, and daily check-ins.</p>
          </div>
          <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400 sm:mt-0">
            <CalendarDays size={16} className="text-indigo-400" />
            <span>{currentDate || "Loading date..."}</span>
          </div>
        </div>

        {/* Live clock widget */}
        <section className="relative mt-8 overflow-hidden rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/[0.12] via-slate-900/80 to-slate-950 p-5 shadow-xl shadow-indigo-950/20 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-300">
                <span className={`h-2 w-2 rounded-full ${isClockedIn ? "animate-pulse bg-emerald-400" : "bg-slate-500"}`} />
                {isClockedIn ? "Your shift is in progress" : "Your attendance workspace"}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{greeting}, Rushan!</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{isClockedIn ? "You're clocked in. Remember to clock out when your workday ends." : "Ready to start your workday? Clock in to record your attendance."}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs text-slate-500">Clock In</p>
                  <p className="mt-1 text-sm font-semibold text-white">{clockInAt ?? "Not recorded"}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs text-slate-500">Clock Out</p>
                  <p className="mt-1 text-sm font-semibold text-white">{clockOutAt ?? "Not recorded"}</p>
                </div>
              </div>
            </div>

            <div className="relative flex shrink-0 flex-col items-start gap-3 lg:items-center">
              <button type="button" onClick={handleClockToggle} className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto ${isClockedIn ? "border border-rose-400/30 bg-rose-500/10 shadow-lg shadow-rose-950/30 hover:bg-rose-500/20 focus:ring-rose-400" : "bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 hover:shadow-indigo-500/40 focus:ring-indigo-400"}`}>
                {isClockedIn ? <LogOut size={19} /> : <LogIn size={19} />}
                {isClockedIn ? "Clock Out" : "Clock In"}
              </button>
              <p className="text-xs text-slate-500">{isClockedIn ? "Click when your shift ends" : "Your check-in will be timestamped"}</p>
            </div>
          </div>
        </section>

        {/* Daily attendance metrics */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Today's Overview</h2>
            <p className="mt-1 text-sm text-slate-500">Company-wide attendance snapshot</p>
          </div>
          <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">Live overview</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {initialMetrics.map((metric) => {
            const MetricIcon = metric.icon;

            return (
              <div key={metric.label} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/20">
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.bg}`}>
                    <MetricIcon size={21} className={metric.color} />
                  </div>
                  <span className={`mt-2 h-2 w-2 rounded-full ${metric.dot}`} />
                </div>
                <p className="mt-5 text-sm text-slate-400">{metric.label}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-white">{metric.value}</p>
                <p className="mt-2 text-xs text-slate-500">{metric.change}</p>
              </div>
            );
          })}
        </div>

        {/* Weekly attendance chart */}
        <section className="mt-8 w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 size={19} className="text-indigo-400" />
                <h2 className="text-base font-semibold text-white sm:text-lg">Weekly Attendance Trends</h2>
              </div>
              <p className="mt-1 text-sm text-slate-500">Attendance percentage by department</p>
            </div>
            <span className="w-fit rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">This Week</span>
          </div>

          <div className="h-[280px] w-full min-w-0 sm:h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttendance} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barCategoryGap="25%">
                <CartesianGrid stroke="#ffffff0d" vertical={false} />
                <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} interval={0} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                <Tooltip cursor={{ fill: "#ffffff08" }} contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff1a", borderRadius: "12px", color: "#ffffff" }} formatter={(value) => [`${value}%`, "Attendance"]} />
                <Bar dataKey="attendance" name="Attendance" radius={[7, 7, 0, 0]} maxBarSize={48} animationDuration={900}>
                  {weeklyAttendance.map((entry) => <Cell key={entry.department} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4">
            {weeklyAttendance.map((entry) => (
              <div key={entry.department} className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.department}
                <span className="font-semibold text-slate-200">{entry.attendance}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent clock actions */}
        <section className="mt-8 w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-white sm:text-lg">My Attendance Activity</h2>
              <p className="mt-1 text-sm text-slate-500">Your clock-in and clock-out history for this session</p>
            </div>
            <Clock3 size={20} className="shrink-0 text-indigo-400" />
          </div>

          {logs.length > 0 ? (
            <div className="divide-y divide-white/[0.06]">
              {logs.map((log) => (
                <div key={log.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${log.action === "Clock In" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                      {log.action === "Clock In" ? <LogIn size={18} /> : <LogOut size={18} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200">{log.action}</p>
                      <p className="mt-1 text-xs text-slate-500">Recorded successfully</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{log.timestamp}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center sm:px-6">
              <Clock3 size={28} className="mx-auto text-slate-600" />
              <p className="mt-3 text-sm font-medium text-slate-300">No attendance activity yet</p>
              <p className="mt-1 text-xs text-slate-500">Your clock actions will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
)
}