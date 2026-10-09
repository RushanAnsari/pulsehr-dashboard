"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";

// Employee data model shared by the directory, filters, and modal form.
type EmployeeStatus = "Active" | "On Leave";

type Employee = {
  id: number;
  name: string;
  initials: string;
  role: string;
  department: string;
  joinDate: string;
  status: EmployeeStatus;
};

type EmployeeFormData = {
  name: string;
  role: string;
  department: string;
  joinDate: string;
  status: EmployeeStatus;
};

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    role: "Senior Frontend Developer",
    department: "Engineering",
    joinDate: "2024-01-12",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Mehta",
    initials: "PM",
    role: "Product Designer",
    department: "Design",
    joinDate: "2024-03-08",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Verma",
    initials: "RV",
    role: "Marketing Manager",
    department: "Marketing",
    joinDate: "2023-06-21",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Ananya Singh",
    initials: "AS",
    role: "Financial Analyst",
    department: "Finance",
    joinDate: "2024-09-15",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Patel",
    initials: "VP",
    role: "Backend Engineer",
    department: "Engineering",
    joinDate: "2023-11-04",
    status: "Active",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    initials: "NK",
    role: "UX Researcher",
    department: "Design",
    joinDate: "2025-02-19",
    status: "On Leave",
  },
  {
    id: 7,
    name: "Rohan Malhotra",
    initials: "RM",
    role: "Growth Specialist",
    department: "Marketing",
    joinDate: "2024-04-11",
    status: "Active",
  },
  {
    id: 8,
    name: "Simran Kaur",
    initials: "SK",
    role: "Accountant",
    department: "Finance",
    joinDate: "2023-07-29",
    status: "Active",
  },
];

const departments = ["Engineering", "Design", "Marketing", "Finance"];

const emptyForm: EmployeeFormData = {
  name: "",
  role: "",
  department: "Engineering",
  joinDate: "",
  status: "Active",
};

export default function EmployeesPage() {
  // Keep employee records in React state so adding an employee updates the UI immediately.
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  // Modal visibility and form values.
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>(emptyForm);
  const [formError, setFormError] = useState("");

  // Search by employee name or role, then apply the department filter.
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = `${employee.name} ${employee.role}`
        .toLowerCase()
        .includes(query);
      const matchesDepartment =
        department === "All Departments" || employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  // Derive summary values from state instead of maintaining duplicate counters.
  const activeCount = employees.filter(
    (employee) => employee.status === "Active",
  ).length;
  const onLeaveCount = employees.filter(
    (employee) => employee.status === "On Leave",
  ).length;

  // Update a single form field without overwriting the other values.
  function handleFormChange(field: keyof EmployeeFormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormError("");
  }

  // Close the modal and reset its form. No employee is added when cancelling.
  function closeModal() {
    setIsOpen(false);
    setFormData(emptyForm);
    setFormError("");
  }

  // Validate and add a new employee to the local React state.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = formData.name.trim();
    const role = formData.role.trim();

    if (!name || !role || !formData.department || !formData.joinDate) {
      setFormError("Please complete all fields before saving.");
      return;
    }

    // Generate initials from the entered full name.
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    const newEmployee: Employee = {
      id:
        employees.reduce((maxId, employee) => Math.max(maxId, employee.id), 0) +
        1,
      name,
      initials,
      role,
      department: formData.department,
      joinDate: formData.joinDate,
      status: formData.status,
    };

    // Add the employee; the table, mobile cards, and summary counters rerender automatically.
    setEmployees((current) => [newEmployee, ...current]);

    // Clear old filters so the newly created employee is immediately visible.
    setSearch("");
    setDepartment("All Departments");

    closeModal();
  }

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
            onClick={() => setIsOpen(true)}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 sm:w-auto"
          >
            <Plus size={18} />
            Add Employee
          </button>
        </div>

        {/* Summary cards update automatically when employees are added. */}
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
            <p className="mt-3 text-3xl font-bold text-white">{activeCount}</p>
            <p className="mt-2 text-xs text-slate-500">Currently active</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">On Leave</p>
              <CalendarDays size={19} className="text-amber-400" />
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{onLeaveCount}</p>
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
              <option value="All Departments">All Departments</option>
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic result count */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-white">
            Employee Directory
          </h2>
          <span className="text-xs text-slate-500">
            Showing {filteredEmployees.length} of {employees.length} employees
          </span>
        </div>

        {/* Desktop/tablet table; its own wrapper contains horizontal scrolling. */}
        <section className="mt-4 hidden w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:block">
          <div className="w-full min-w-0 overflow-x-auto scrollbar-thin">
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
                      {formatDate(employee.joinDate)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={employee.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEmployees.length === 0 && <EmptyState />}
          </div>
        </section>

        {/* Mobile-only employee cards; the table above is hidden below md. */}
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
                      <span>Joined {formatDate(employee.joinDate)}</span>
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

      {/* Modal is rendered only while open. Clicking the backdrop closes it. */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-employee-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
              <div>
                <h2
                  id="add-employee-title"
                  className="text-lg font-semibold text-white"
                >
                  Add New Employee
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the employee details below.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close add employee form"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* Employee form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-5 py-6 sm:px-6"
            >
              <div>
                <label
                  htmlFor="employee-name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  id="employee-name"
                  type="text"
                  autoFocus
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(event) =>
                    handleFormChange("name", event.target.value)
                  }
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="employee-role"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Role <span className="text-rose-400">*</span>
                </label>
                <input
                  id="employee-role"
                  type="text"
                  required
                  maxLength={100}
                  value={formData.role}
                  onChange={(event) =>
                    handleFormChange("role", event.target.value)
                  }
                  placeholder="e.g. Frontend Developer"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="employee-department"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Department <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="employee-department"
                    required
                    value={formData.department}
                    onChange={(event) =>
                      handleFormChange("department", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                  >
                    {departments.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="employee-status"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Status <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="employee-status"
                    required
                    value={formData.status}
                    onChange={(event) =>
                      handleFormChange("status", event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-400/60"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="employee-join-date"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Join Date <span className="text-rose-400">*</span>
                </label>
                <input
                  id="employee-join-date"
                  type="date"
                  required
                  max="9999-12-31"
                  value={formData.joinDate}
                  onChange={(event) =>
                    handleFormChange("joinDate", event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none [color-scheme:dark] focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/10"
                />
              </div>

              {/* Validation feedback */}
              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
                >
                  {formError}
                </p>
              )}

              {/* Modal actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
                >
                  <Plus size={17} />
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

// Shared employee identity component for both responsive layouts.
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

// Reusable status badge.
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

// Keep date formatting consistent between the form, table, and cards.
function formatDate(dateString: string) {
  if (!dateString) return "—";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
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
