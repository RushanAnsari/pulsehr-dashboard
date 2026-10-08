import { LogIn, LogOut, CalendarOff, Laptop } from "lucide-react";
import { Activity } from "react";

// Temporary frontend data.
// Later this will come from our attendance/activity API.
const recentActivities = [
  {
    name: "Aarav Sharma",
    initials: "AS",
    action: "Checked In",
    time: "09:12 AM",
    department: "Engineering",
    type: "success",
  },
  {
    name: "Priya Mehta",
    initials: "PM",
    action: "Remote Work",
    time: "09:28 AM",
    department: "Design",
    type: "remote",
  },
  {
    name: "Rahul Verma",
    initials: "RV",
    action: "On Leave",
    time: "10:05 AM",
    department: "Marketing",
    type: "leave",
  },
  {
    name: "Ananya Singh",
    initials: "AS",
    action: "Checked Out",
    time: "05:42 PM",
    department: "Finance",
    type: "checkout",
  },
  {
    name: "Vikram Patel",
    initials: "VP",
    action: "Checked In",
    time: "09:46 AM",
    department: "Engineering",
    type: "success",
  },
];

const statusStyles = {
  success: {
    className: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    icon: LogIn,
  },
  remote: {
    className: "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20",
    icon: Laptop,
  },
  leave: {
    className: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
    icon: CalendarOff,
  },
  checkout: {
    className: "bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20",
    icon: LogOut,
  },
};

export default function RecentActivity() {
  return (
    <section className="mt-6 w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
      {/* Section header */}

      <div className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Recent Activity
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Latest employee activity across your organization
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium text-indigo-400 transition hover:bg-indigo-500/10 hover:text-indigo-300"
        >
          View all
        </button>
      </div>

      {/* Desktop/tablet table. Hidden on small screens because a wide table can cause unnecessary horizontal scrolling.*/}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-600">
                Employee
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-600">
                Time
              </th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-600">
                Department
              </th>
            </tr>
          </thead>

          <tbody>
            {recentActivities.map((activity) => {
              const status =
                statusStyles[activity.type as keyof typeof statusStyles];
              const StatusIcon = status.icon;
              return (
                <tr
                  key={`${activity.name}-${activity.time}`}
                  className="border-b border-white/5 transition hover:bg-white/[0.025] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-xs font-semibold text-indigo-300 ring-1 ring-white/10">
                        {activity.initials}
                      </div>

                      <span className="text-sm font-medium text-slate-200">
                        {activity.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      <StatusIcon size={13} />
                      {activity.action}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                    {activity.time}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-400">
                    {activity.department}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile activity list. Instead of squeezing four coulmns into a phone, we transform each row into a compact activity card. */}
      <div className="divide-y divide-white/5 md:hidden">
            {recentActivities.map((activity) => {
                const status = statusStyles[activity.type as keyof typeof statusStyles];
                const StatusIcon = status.icon;

                return (
                    <div key={`${activity.name}-${activity.time}`} className="flex min-w-0 items-center gap-3 px-4 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-xs font-semibold text-indigo-300 ring-1 ring-white/10">
                {activity.initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-200">
                  {activity.name}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {activity.department} · {activity.time}
                </p>
              </div>

              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${status.className}`}>
                <StatusIcon size={12} />
                <span className="hidden xs:inline">
                  {activity.action}
                </span>
              </span>
            </div>
                );
            })}
      </div>
    </section>
  );
}
