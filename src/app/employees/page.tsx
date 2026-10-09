"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";

// Mock employee data. Employee CRUD and backend integration can be added next.
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

type EmployeeStatus = "Active" | "On Leave";

type Employee = (typeof employees)[number];

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  // Apply both filters together whenever the search or department changes.
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = `${employee.name} ${employee.role}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesDepartment =
        department === "All Departments" || employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  return (
    <DashboardShell>
      <div className="mx-auto w-full min-w-0 max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Page heading and primary action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-indigo-400">Workspace / People</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Employees
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage your team, employee records, and departments.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              alert("Add Employee form will be implemented in the next step.")
            }
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 sm:w-auto"
          >
            <Plus size={18} />
            Add Employee
          </button>
        </div>

        {/* Summary and filters */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Total Employees</p>
              <Users size={19} className="text-indigo-400" />
            </div>
            <p className="mt-3 text-3xl font-bold text-white">
              {employees.length}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Across all departments
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">Active Employees</p>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <p className="mt-3 text-3xl font-bold text-white">
              {
                employees.filter((employee) => employee.status === "Active")
                  .length
              }
            </p>
            <p className="mt-2 text-xs text-slate-500">Currently active</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">On Leave</p>
              <CalendarDays size={19} className="text-amber-400" />
            </div>
            <p className="mt-3 text-3xl font-bold text-white">
              {
                employees.filter((employee) => employee.status === "On Leave")
                  .length
              }
            </p>
            <p className="mt-2 text-xs text-slate-500">Currently on leave</p>
          </div>
        </div>

        {/* Search and department filter */}
        <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees or roles..."
              aria-label="Search employees or roles"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          <div className="relative w-full shrink-0 sm:w-56">
            <SlidersHorizontal
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              aria-label="Filter by department"
              className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900 py-3 pl-9 pr-4 text-sm text-slate-200 outline-none focus:border-indigo-400/50"
            >
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results heading */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-white">
            Employee Directory
          </h2>
          <span className="shrink-0 text-xs text-slate-500">
            {filteredEmployees.length}{" "}
            {filteredEmployees.length === 1 ? "employee" : "employees"}
          </span>
        </div>

        {/* Desktop/tablet table: hidden on mobile, with horizontal scrolling confined to this container. */}
        <section className="mt-4 hidden md:block w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <div className="hidden md:block w-full min-w-0 overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-medium">Employee</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Join Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <EmployeeIdentity employee={employee} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                      {employee.role}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                      {employee.department}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                      {employee.joinDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={employee.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty state for desktop/tablet search results */}
            {filteredEmployees.length === 0 && <EmptyState />}
          </div>
        </section>

        {/* Mobile employee cards: strictly visible below md; the table is hidden there. */}
        <section className="mt-4 block md:hidden">
          {filteredEmployees.length > 0 ? (
            <div className="space-y-3">
              {filteredEmployees.map((employee) => (
                <article
                  key={employee.id}
                  className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <EmployeeIdentity employee={employee} />
                    </div>
                    <StatusBadge status={employee.status} />
                  </div>

                  <div className="mt-4 border-t border-white/[0.06] pt-3">
                    <p className="break-words text-sm text-slate-300">
                      {employee.role}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span>{employee.department}</span>
                      <span>Joined {employee.joinDate}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </DashboardShell>
  );
}

// Shared employee identity keeps the table and mobile card designs consistent.
function EmployeeIdentity({ employee }: { employee: Employee }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
        {employee.initials}
      </div>
      <span className="break-words text-sm font-medium text-slate-200">
        {employee.name}
      </span>
    </div>
  );
}

// Reusable status badge with consistent styling.
function StatusBadge({ status }: { status: EmployeeStatus }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${isActive ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-amber-500/20 bg-amber-500/10 text-amber-400"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-400" : "bg-amber-400"}`}
      />
      {status}
    </span>
  );
}

// Shared empty state for searches with no matching employees.
function EmptyState() {
  return (
    <div className="px-6 py-12 text-center">
      <Users size={28} className="mx-auto text-slate-600" />
      <p className="mt-3 text-sm font-medium text-slate-300">
        No employees found
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Try another name, role, or department.
      </p>
    </div>
  );
}
