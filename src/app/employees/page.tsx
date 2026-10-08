"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  CalendarDays,
  Users,
} from "lucide-react";

import DashboardShell from "@/components/DashboardShell";

// Temporary employee data.
// Later this will come from our backend/API.
const employees = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    role: "Senior Frontend Developer",
    department: "Engineering",
    joinDate: "Jan 12, 2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Mehta",
    initials: "PM",
    role: "Product Designer",
    department: "Design",
    joinDate: "Mar 08, 2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Verma",
    initials: "RV",
    role: "Marketing Manager",
    department: "Marketing",
    joinDate: "Jun 21, 2023",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Ananya Singh",
    initials: "AS",
    role: "Financial Analyst",
    department: "Finance",
    joinDate: "Sep 15, 2024",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Patel",
    initials: "VP",
    role: "Backend Engineer",
    department: "Engineering",
    joinDate: "Nov 04, 2023",
    status: "Active",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    initials: "NK",
    role: "UX Researcher",
    department: "Design",
    joinDate: "Feb 19, 2025",
    status: "On Leave",
  },
  {
    id: 7,
    name: "Rohan Malhotra",
    initials: "RM",
    role: "Growth Specialist",
    department: "Marketing",
    joinDate: "Apr 11, 2024",
    status: "Active",
  },
  {
    id: 8,
    name: "Simran Kaur",
    initials: "SK",
    role: "Accountant",
    department: "Finance",
    joinDate: "Jul 29, 2023",
    status: "Active",
  },
];

const departments = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "Finance",
];

export default function EmployeesPage() {
  // Search input state.
  const [search, setSearch] = useState("");

  // Selected department state.
  const [department, setDepartment] = useState("All Departments");

  // Filter employees whenever search or department changes.
  // useMemo avoids recalculating the list unnecessarily.
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All Departments" || employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  return (
    <DashboardShell>
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-indigo-400">People</p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Employees Directory
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and view everyone across your organization.
          </p>
        </div>

        {/* Add Employee button */}
        <button
          type="button"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-indigo-500/30 sm:w-auto"
        >
          <Plus
            size={18}
            className="transition-transform duration-200 group-hover:rotate-90"
          />
          Add Employee
        </button>
      </div>

      {/* Search and filter section */}
      <div className="mb-6 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees by name..."
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          {/* Department filter */}
          <div className="relative w-full md:w-56">
            <SlidersHorizontal
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500"
            />

            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-slate-300 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10"
            >
              {departments.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-slate-900 text-white"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <Users size={14} />
          <span>
            Showing {filteredEmployees.length} of {employees.length} employees
          </span>
        </div>
      </div>

      {/* Employee table */}
      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        {/* Desktop/tablet table */}
        <div className="hidden w-full min-w-0 overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                  Employee
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                  Role
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                  Join Date
                </th>

                <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.025] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-xs font-semibold text-indigo-300 ring-1 ring-white/10">
                        {employee.initials}
                      </div>

                      <span className="whitespace-nowrap text-sm font-medium text-slate-200">
                        {employee.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                    {employee.role}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-400">
                      {employee.department}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={14} className="text-slate-600" />
                      {employee.joinDate}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={employee.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile employee cards */}
        <div className="divide-y divide-white/5 md:hidden">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="flex min-w-0 items-center gap-3 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-xs font-semibold text-indigo-300 ring-1 ring-white/10">
                {employee.initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-200">
                  {employee.name}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {employee.role}
                </p>

                <p className="mt-1 truncate text-xs text-slate-600">
                  {employee.department} · Joined {employee.joinDate}
                </p>
              </div>

              <StatusBadge status={employee.status} />
            </div>
          ))}
        </div>

        {/* Empty search state */}
        {filteredEmployees.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-500">
              <Users size={22} />
            </div>

            <h3 className="text-sm font-semibold text-white">
              No employees found
            </h3>

            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Try changing your search term or selecting another department.
            </p>
          </div>
        )}
      </section>
    </DashboardShell>
  );
}

// Reusable status badge.
// Keeping this separate makes the employee row easier to maintain.
function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";

  return (
    <span
      className={
        isActive
          ? "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20"
          : "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20"
      }
    >
      <span
        className={
          isActive
            ? "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"
            : "h-1.5 w-1.5 rounded-full bg-amber-400"
        }
      />
      {status}
    </span>
  );
}
