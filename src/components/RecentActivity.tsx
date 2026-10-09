"use client";

import { CalendarOff, Laptop, LogIn, LogOut } from "lucide-react";

// Mock activity data. This can later be replaced with API data.
const recentActivities = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    action: "Checked In",
    time: "09:12 AM",
    department: "Engineering",
    status: "success",
  },
  {
    id: 2,
    name: "Priya Mehta",
    initials: "PM",
    action: "Remote Work",
    time: "09:28 AM",
    department: "Design",
    status: "remote",
  },
  {
    id: 3,
    name: "Rahul Verma",
    initials: "RV",
    action: "On Leave",
    time: "10:05 AM",
    department: "Marketing",
    status: "leave",
  },
  {
    id: 4,
    name: "Ananya Singh",
    initials: "AS",
    action: "Checked Out",
    time: "05:42 PM",
    department: "Finance",
    status: "checkout",
  },
  {
    id: 5,
    name: "Vikram Patel",
    initials: "VP",
    action: "Checked In",
    time: "09:46 AM",
    department: "Engineering",
    status: "success",
  },
];

const statusStyles: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  remote: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  leave: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  checkout: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

const statusIcons: Record<string, typeof LogIn> = {
  success: LogIn,
  remote: Laptop,
  leave: CalendarOff,
  checkout: LogOut,
};

export default function RecentActivity() {
  return (
    <section className="mt-6 w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {/* Section heading */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-5 sm:px-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Recent Activity
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Latest employee attendance updates
          </p>
        </div>
        <span className="shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
          Today
        </span>
      </div>

      {/* Desktop/tablet table: hidden below the md breakpoint to prevent duplicate mobile content. */}
      <div className="hidden md:block w-full min-w-0 overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Activity</th>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {recentActivities.map((activity) => {
              const StatusIcon = statusIcons[activity.status];

              return (
                <tr
                  key={activity.id}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
                        {activity.initials}
                      </div>
                      <span className="text-sm font-medium text-slate-200">
                        {activity.name}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                    {activity.action}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                    {activity.department}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                    {activity.time}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[activity.status]}`}
                    >
                      <StatusIcon size={13} />
                      {activity.status === "success"
                        ? "Present"
                        : activity.status === "remote"
                          ? "Remote"
                          : activity.status === "leave"
                            ? "On Leave"
                            : "Completed"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile-only activity cards: strictly hidden at md and above. */}
      <div className="block md:hidden">
        <div className="divide-y divide-white/[0.06]">
          {recentActivities.map((activity) => {
            const StatusIcon = statusIcons[activity.status];

            return (
              <div
                key={activity.id}
                className="flex min-w-0 items-start gap-3 px-4 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
                  {activity.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="break-words text-sm font-medium text-slate-200">
                      {activity.name}
                    </p>
                    <span className="shrink-0 text-xs text-slate-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {activity.action} · {activity.department}
                  </p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[activity.status]}`}
                  >
                    <StatusIcon size={13} />
                    {activity.status === "success"
                      ? "Present"
                      : activity.status === "remote"
                        ? "Remote"
                        : activity.status === "leave"
                          ? "On Leave"
                          : "Completed"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
