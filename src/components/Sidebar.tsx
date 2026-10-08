"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Sun,
  Moon,
  X,
} from "lucide-react";

type SidebarProps = {
  collapsed?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
  onToggleCollapse?: () => void;
};

// One navigation source keeps desktop and mobile routing consistent.
const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
  { name: "Leave", href: "/leave", icon: CalendarDays },
  { name: "Payroll", href: "/payroll", icon: WalletCards },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const secondaryNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export default function Sidebar({
  collapsed = false,
  mobile = false,
  onNavigate,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const isCollapsed = mobile ? false : collapsed;

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-72 flex-col bg-slate-950 px-4 py-5 text-slate-300"
          : `flex h-screen ${isCollapsed ? "w-20" : "w-72"} shrink-0 flex-col border-r border-white/10 bg-slate-950 px-4 py-5 text-slate-300 transition-[width] duration-300 ease-in-out`
      }
    >
      {/* Brand / mobile close button */}
      <div
        className={
          isCollapsed
            ? "mb-8 flex items-center justify-center px-2"
            : "mb-8 flex items-center justify-between px-2"
        }
      >
        <Link
          href="/"
          onClick={onNavigate}
          className={
            isCollapsed
              ? "flex items-center justify-center"
              : "flex items-center gap-3"
          }
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
            P
          </div>

          {!isCollapsed && (
            <div className="min-w-0">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                PulseHR
              </h1>

              <p className="text-xs text-slate-500">People management</p>
            </div>
          )}
        </Link>

        {mobile ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={onToggleCollapse}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft size={18} className={isCollapsed ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"} />
          </button>
        )}
      </div>

      {/* Main navigation */}
      <nav className="flex-1">
        {!isCollapsed && (
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Workspace
          </p>
        )}

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={isCollapsed ? item.name : undefined}
                className={
                  isCollapsed
                    ? `group flex items-center justify-center rounded-xl px-3 py-2.5 transition-all duration-200 ${isActive ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`
                    : `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive ? "bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/5" : "text-slate-400 hover:bg-white/5 hover:text-white"}`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-indigo-400"
                      : "text-slate-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-slate-300"
                  }
                />

                {!isCollapsed && <span>{item.name}</span>}

                {!isCollapsed && isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="my-6 h-px bg-white/5" />

        {!isCollapsed && (
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Support
          </p>
        )}

        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={isCollapsed ? item.name : undefined}
                className={
                  isCollapsed
                    ? `group flex items-center justify-center rounded-xl px-3 py-2.5 transition-all duration-200 ${isActive ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`
                    : `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-indigo-400"
                      : "text-slate-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-slate-300"
                  }
                />

                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Theme toggle placeholder */}
      <div className="mb-3 border-t border-white/5 pt-4">
        <button
          type="button"
          title={isCollapsed ? "Toggle theme" : undefined}
          className={
            isCollapsed
              ? "flex w-full items-center justify-center rounded-xl p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
              : "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          }
        >
          <Sun size={19} strokeWidth={1.8} />
          {!isCollapsed && (
            <>
              <span>Theme</span>
              <Moon size={16} className="ml-auto text-slate-600" />
            </>
          )}
        </button>
      </div>

      {/* Profile */}
      <div className="border-t border-white/5 pt-4">
        <div
          className={
            isCollapsed
              ? "flex items-center justify-center"
              : "flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/5"
          }
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-semibold text-white">
            RA
          </div>

          {!isCollapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  Admin User
                </p>

                <p className="truncate text-xs text-slate-500">Administrator</p>
              </div>

              <button
                type="button"
                aria-label="Log out"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut size={17} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
