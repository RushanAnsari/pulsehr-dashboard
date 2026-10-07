"use client";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  WalletCards,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";

// Navigation items are kept as data instead of writing every link manually.
// Later this makes it easy to add/remove/reorder dashboard sections.
const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "Employees",
    icon: Users,
  },
  {
    name: "Attendance",
    icon: CalendarCheck,
  },
  {
    name: "Leave",
    icon: CalendarDays,
  },
  {
    name: "Payroll",
    icon: WalletCards,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    name: "Settings",
    icon: Settings,
  },
  {
    name: "Help & Support",
    icon: HelpCircle,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        flex h-screen w-72 flex-col
        border-r border-white/10
        bg-slate-950
        px-4 py-5
        text-slate-300
      "
    >
      {/* Brand */}
      <div className="mb-8 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          {/* PulseHR logo mark */}
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              bg-indigo-500
              text-sm font-bold text-white
              shadow-lg shadow-indigo-500/20
            "
          >
            P
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              PulseHR
            </h1>

            <p className="text-xs text-slate-500">People management</p>
          </div>
        </div>

        {/* Sidebar collapse button — functionality comes later */}
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="
            hidden rounded-lg p-2
            text-slate-500
            transition
            hover:bg-white/5
            hover:text-white
            lg:block
          "
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1">
        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            // Each item becomes its own reusable navigation element.
            // React uses the `key` to efficiently track these items.
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                className={`
                  group flex w-full items-center gap-3
                  rounded-xl px-3 py-2.5
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    item.active
                      ? "bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/5"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className={`
                    transition-transform duration-200
                    ${
                      item.active
                        ? "text-indigo-400"
                        : "text-slate-500 group-hover:scale-110 group-hover:text-slate-300"
                    }
                  `}
                />

                <span>{item.name}</span>

                {/* Active indicator */}
                {item.active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary navigation */}
        <div className="my-6 h-px bg-white/5" />

        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
          Support
        </p>

        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                className="
                  group flex w-full items-center gap-3
                  rounded-xl px-3 py-2.5
                  text-sm font-medium text-slate-400
                  transition-all duration-200
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className="
                    text-slate-500
                    transition-transform duration-200
                    group-hover:scale-110
                    group-hover:text-slate-300
                  "
                />

                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-white/5 pt-4">
        <div
          className="
            flex items-center gap-3
            rounded-xl p-2
            transition
            hover:bg-white/5
          "
        >
          {/* Avatar */}
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              bg-gradient-to-br from-indigo-500 to-violet-500
              text-xs font-semibold text-white
            "
          >
            RA
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              Admin User
            </p>

            <p className="truncate text-xs text-slate-500">Administrator</p>
          </div>

          <button
            type="button"
            aria-label="Log out"
            className="
              rounded-lg p-2
              text-slate-500
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
