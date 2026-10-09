"use client";

import { useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  X,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Users,
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";

// Leave request model with a status that updates independently for each employee.
type LeaveStatus = "Pending" | "Approved" | "Rejected";
type LeaveRequest = {
  id: number;
  name: string;
  initials: string;
  role: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  appliedOn: string;
  status: LeaveStatus;
};

// Mock requests for the initial admin queue.
const initialRequests: LeaveRequest[] = [
  {
    id: 1,
    name: "Priya Mehta",
    initials: "PM",
    role: "Product Designer",
    department: "Design",
    leaveType: "Casual Leave",
    startDate: "2026-10-14",
    endDate: "2026-10-15",
    days: 2,
    reason: "Personal commitments",
    appliedOn: "Oct 08, 2026",
    status: "Pending",
  },
  {
    id: 2,
    name: "Rahul Verma",
    initials: "RV",
    role: "Marketing Manager",
    department: "Marketing",
    leaveType: "Sick Leave",
    startDate: "2026-10-12",
    endDate: "2026-10-12",
    days: 1,
    reason: "Medical appointment",
    appliedOn: "Oct 08, 2026",
    status: "Pending",
  },
  {
    id: 3,
    name: "Neha Kapoor",
    initials: "NK",
    role: "UX Researcher",
    department: "Design",
    leaveType: "Annual Leave",
    startDate: "2026-10-19",
    endDate: "2026-10-21",
    days: 3,
    reason: "Family trip",
    appliedOn: "Oct 07, 2026",
    status: "Pending",
  },
  {
    id: 4,
    name: "Vikram Patel",
    initials: "VP",
    role: "Backend Engineer",
    department: "Engineering",
    leaveType: "Casual Leave",
    startDate: "2026-10-05",
    endDate: "2026-10-05",
    days: 1,
    reason: "Personal work",
    appliedOn: "Oct 02, 2026",
    status: "Approved",
  },
];

export default function LeavePage() {
  // Keep requests in React state so every decision updates the UI without reloading.
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);
  const [activeFilter, setActiveFilter] = useState<"All" | LeaveStatus>("All");

  // Derive counters from the request state instead of maintaining duplicate values.
  const pendingCount = requests.filter(
    (request) => request.status === "Pending",
  ).length;
  const approvedCount = requests.filter(
    (request) => request.status === "Approved",
  ).length;
  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected",
  ).length;

  // Update only the selected request; all other request statuses remain unchanged.
  function updateRequestStatus(id: number, status: "Approved" | "Rejected") {
    setRequests((current) =>
      current.map((request) =>
        request.id === id && request.status === "Pending"
          ? { ...request, status }
          : request,
      ),
    );
  }

  // Apply the selected queue filter.
  const visibleRequests = requests.filter(
    (request) => activeFilter === "All" || request.status === activeFilter,
  );

  return (
    <DashboardShell>
      <div className="mx-auto w-full min-w-0 max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-indigo-400">Workspace / Time Off</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Leave Management
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Review employee leave requests and manage time-off approvals.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
            <CalendarDays size={17} className="text-indigo-400" />
            Leave Year 2026
          </div>
        </div>

        {/* Leave summary cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Total Annual Leaves"
            value="24 days"
            description="Standard annual allowance"
            icon={CalendarCheck}
            iconStyle="text-indigo-400"
            iconBg="bg-indigo-500/10"
          />
          <SummaryCard
            title="Leaves Taken"
            value="8 days"
            description="Used this leave year"
            icon={CalendarDays}
            iconStyle="text-sky-400"
            iconBg="bg-sky-500/10"
          />
          <SummaryCard
            title="Pending Approvals"
            value={String(pendingCount)}
            description={
              pendingCount === 1
                ? "Request awaiting review"
                : "Requests awaiting review"
            }
            icon={Clock3}
            iconStyle="text-amber-400"
            iconBg="bg-amber-500/10"
          />
        </div>

        {/* Request queue header and status filters */}
        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Admin Requests Queue
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review each request and record your decision.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All", "Pending", "Approved", "Rejected"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${activeFilter === filter ? "border-indigo-400/30 bg-indigo-500/15 text-indigo-300" : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}
                  >
                    {filter}
                    {filter === "Pending" && (
                      <span className="ml-2">{pendingCount}</span>
                    )}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Each request is rendered independently from the requests array. */}
          <div className="mt-5 space-y-4">
            {visibleRequests.length > 0 ? (
              visibleRequests.map((request) => (
                <article
                  key={request.id}
                  className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-colors hover:border-white/15 sm:p-5"
                >
                  <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
                        {request.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="break-words text-sm font-semibold text-white sm:text-base">
                            {request.name}
                          </h3>
                          <StatusBadge status={request.status} />
                        </div>
                        <p className="mt-1 break-words text-xs text-slate-400">
                          {request.role} · {request.department}
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <InfoItem
                            label="Leave Type"
                            value={request.leaveType}
                          />
                          <InfoItem
                            label="Duration"
                            value={`${formatDate(request.startDate)}${request.startDate === request.endDate ? "" : ` – ${formatDate(request.endDate)}`}`}
                          />
                          <InfoItem
                            label="Total Days"
                            value={`${request.days} ${request.days === 1 ? "day" : "days"}`}
                          />
                          <InfoItem
                            label="Applied On"
                            value={request.appliedOn}
                          />
                        </div>
                        <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/10 px-3 py-3">
                          <p className="text-xs font-medium text-slate-500">
                            Reason
                          </p>
                          <p className="mt-1 break-words text-sm text-slate-300">
                            {request.reason}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Only pending requests can be approved or rejected. */}
                    <div className="flex shrink-0 flex-col gap-2 border-t border-white/[0.06] pt-4 lg:w-36 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                      {request.status === "Pending" ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              updateRequestStatus(request.id, "Approved")
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                          >
                            <Check size={16} />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateRequestStatus(request.id, "Rejected")
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/20"
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      ) : (
                        <div
                          className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-medium ${request.status === "Approved" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-rose-500/20 bg-rose-500/10 text-rose-400"}`}
                        >
                          {request.status === "Approved" ? (
                            <CheckCircle2 size={16} />
                          ) : (
                            <XCircle size={16} />
                          )}
                          {request.status === "Approved"
                            ? "Approved"
                            : "Rejected"}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center">
                <Users size={28} className="mx-auto text-slate-600" />
                <p className="mt-3 text-sm font-medium text-slate-300">
                  No {activeFilter.toLowerCase()} requests
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try another filter to see leave requests.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Compact summary of decisions */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Approved Requests</p>
              <p className="mt-1 text-xl font-bold text-white">
                {approvedCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-rose-500/15 bg-rose-500/[0.04] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
              <XCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Rejected Requests</p>
              <p className="mt-1 text-xl font-bold text-white">
                {rejectedCount}
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

// Reusable summary card for leave metrics.
function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconStyle,
  iconBg,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof CalendarDays;
  iconStyle: string;
  iconBg: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/20">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={19} className={iconStyle} />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

// Small reusable detail field inside a request card.
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-200">
        {value}
      </p>
    </div>
  );
}

// Color-coded status badge.
function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles: Record<LeaveStatus, string> = {
    Pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    Approved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    Rejected: "border-rose-500/20 bg-rose-500/10 text-rose-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === "Pending" ? "bg-amber-400" : status === "Approved" ? "bg-emerald-400" : "bg-rose-400"}`}
      />
      {status}
    </span>
  );
}

// Format ISO date strings without relying on UTC parsing.
function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
