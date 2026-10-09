"use client";

import { useState } from "react";
import {
  Banknote,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Printer,
  ReceiptText,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import DashboardShell from "@/components/DashboardShell";

// Payroll record model. Net pay is calculated from salary minus deductions.
type PayrollEmployee = {
  id: number;
  name: string;
  initials: string;
  role: string;
  department: string;
  employeeCode: string;
  baseSalary: number;
  deductions: number;
  tax: number;
  status: "Processed" | "Pending";
};

const initialPayroll: PayrollEmployee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    role: "Senior Frontend Developer",
    department: "Engineering",
    employeeCode: "EMP-001",
    baseSalary: 85000,
    deductions: 4500,
    tax: 8500,
    status: "Processed",
  },
  {
    id: 2,
    name: "Priya Mehta",
    initials: "PM",
    role: "Product Designer",
    department: "Design",
    employeeCode: "EMP-002",
    baseSalary: 72000,
    deductions: 3200,
    tax: 6200,
    status: "Processed",
  },
  {
    id: 3,
    name: "Rahul Verma",
    initials: "RV",
    role: "Marketing Manager",
    department: "Marketing",
    employeeCode: "EMP-003",
    baseSalary: 90000,
    deductions: 5000,
    tax: 9000,
    status: "Pending",
  },
  {
    id: 4,
    name: "Ananya Singh",
    initials: "AS",
    role: "Financial Analyst",
    department: "Finance",
    employeeCode: "EMP-004",
    baseSalary: 68000,
    deductions: 2800,
    tax: 5200,
    status: "Processed",
  },
  {
    id: 5,
    name: "Vikram Patel",
    initials: "VP",
    role: "Backend Engineer",
    department: "Engineering",
    employeeCode: "EMP-005",
    baseSalary: 95000,
    deductions: 5500,
    tax: 10500,
    status: "Processed",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    initials: "NK",
    role: "UX Researcher",
    department: "Design",
    employeeCode: "EMP-006",
    baseSalary: 65000,
    deductions: 2500,
    tax: 5000,
    status: "Pending",
  },
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// Calculate take-home pay dynamically from the employee's salary components.
function getNetPay(employee: PayrollEmployee) {
  return employee.baseSalary - employee.deductions - employee.tax;
}

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<PayrollEmployee[]>(initialPayroll);

  // The selected employee drives the contents and visibility of the salary-slip modal.
  const [selectedSlip, setSelectedSlip] = useState<PayrollEmployee | null>(
    null,
  );

  const processedCount = payroll.filter(
    (employee) => employee.status === "Processed",
  ).length;
  const pendingCount = payroll.filter(
    (employee) => employee.status === "Pending",
  ).length;
  const processedPercentage =
    payroll.length === 0
      ? 0
      : Math.round((processedCount / payroll.length) * 100);
  const monthlyPayout = payroll
    .filter((employee) => employee.status === "Processed")
    .reduce((total, employee) => total + getNetPay(employee), 0);

  // Mark a pending payroll record as processed without reloading the page.
  function markAsProcessed(id: number) {
    setPayroll((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, status: "Processed" } : employee,
      ),
    );
  }

  // Open the selected employee's slip.
  function generateSlip(employee: PayrollEmployee) {
    setSelectedSlip(employee);
  }

  // Clear the selection to close the modal.
  function closeSlip() {
    setSelectedSlip(null);
  }

  // Print only the document when the browser's print dialog opens.
  function printSlip() {
    window.print();
  }

  return (
    <DashboardShell>
      <div className="mx-auto w-full min-w-0 max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-indigo-400">Workspace / Finance</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Payroll Suite
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Review salary records, track payroll processing, and generate
              payslips.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
            <ReceiptText size={17} className="text-indigo-400" />
            October 2026 Payroll
          </div>
        </div>

        {/* Finance metrics derived from payroll state */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricCard
            title="Monthly Payout"
            value={currency.format(monthlyPayout)}
            description="Net pay for processed records"
            icon={Banknote}
            color="text-emerald-400"
            background="bg-emerald-500/10"
          />
          <MetricCard
            title="Processed"
            value={`${processedPercentage}%`}
            description={`${processedCount} of ${payroll.length} employees processed`}
            icon={CheckCircle2}
            color="text-indigo-400"
            background="bg-indigo-500/10"
          />
          <MetricCard
            title="Pending Approvals"
            value={String(pendingCount)}
            description={
              pendingCount === 1
                ? "Payroll record awaiting processing"
                : "Payroll records awaiting processing"
            }
            icon={Clock3}
            color="text-amber-400"
            background="bg-amber-500/10"
          />
        </div>

        {/* Payroll records section */}
        <section className="mt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Payroll Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Salary breakdowns and monthly payment status.
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {payroll.length} employee records
            </span>
          </div>

          {/* Desktop/tablet table: hidden on mobile to prevent duplicate content. */}
          <div className="mt-5 hidden w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:block">
            <div className="w-full overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-medium">Employee</th>
                    <th className="px-5 py-4 font-medium">Base Salary</th>
                    <th className="px-5 py-4 font-medium">Deductions / Tax</th>
                    <th className="px-5 py-4 font-medium">Net Pay</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {payroll.map((employee) => (
                    <tr
                      key={employee.id}
                      className="transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <EmployeeIdentity employee={employee} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-300">
                        {currency.format(employee.baseSalary)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-rose-300">
                        {currency.format(employee.deductions + employee.tax)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-white">
                        {currency.format(getNetPay(employee))}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <PayrollStatus status={employee.status} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {employee.status === "Pending" && (
                            <button
                              type="button"
                              onClick={() => markAsProcessed(employee.id)}
                              className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                            >
                              Process
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => generateSlip(employee)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-3 py-2 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/20"
                          >
                            <FileText size={14} />
                            Generate Slip
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile-only payroll cards */}
          <div className="mt-5 block space-y-3 md:hidden">
            {payroll.map((employee) => (
              <article
                key={employee.id}
                className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <EmployeeIdentity employee={employee} />
                  </div>
                  <PayrollStatus status={employee.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
                  <SalaryField
                    label="Base Salary"
                    value={currency.format(employee.baseSalary)}
                  />
                  <SalaryField
                    label="Deductions / Tax"
                    value={currency.format(employee.deductions + employee.tax)}
                  />
                  <SalaryField
                    label="Net Pay"
                    value={currency.format(getNetPay(employee))}
                    emphasis
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {employee.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => markAsProcessed(employee.id)}
                      className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                    >
                      Process Payroll
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => generateSlip(employee)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-3 py-2.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20"
                  >
                    <FileText size={15} />
                    Generate Slip
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Payroll note */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-indigo-400" />
          <p className="text-xs leading-5 text-slate-500">
            Demo payroll data only. These figures are illustrative and are not
            connected to real employee payments, tax calculations, or a payroll
            provider.
          </p>
        </div>
      </div>

      {/* Payslip modal: only renders when an employee is selected. */}
      {selectedSlip && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-3 backdrop-blur-md sm:p-6 print:static print:block print:bg-white print:p-0 print:backdrop-blur-none"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSlip();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payslip-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200 print:my-0 print:max-w-none print:overflow-visible print:rounded-none print:border-0 print:bg-white print:text-black print:shadow-none"
          >
            {/* Modal actions stay outside the printed invoice. */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 print:hidden sm:px-7">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <FileText size={17} className="text-indigo-400" />
                Salary Slip Preview
              </div>
              <button
                type="button"
                onClick={closeSlip}
                aria-label="Close salary slip"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* Invoice body */}
            <div id="payslip-document" className="p-5 sm:p-8 print:p-10">
              <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between print:border-slate-200">
                <div className="flex items-center gap-3">
                  {/* Logo placeholder */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white print:bg-slate-900">
                    <Banknote size={25} />
                  </div>
                  <div>
                    <p className="text-lg font-bold tracking-tight text-white print:text-black">
                      PulseHR
                    </p>
                    <p className="mt-1 text-xs text-slate-500 print:text-slate-600">
                      People. Payroll. Performance.
                    </p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <h2
                    id="payslip-title"
                    className="text-xl font-bold text-white print:text-black"
                  >
                    Salary Slip
                  </h2>
                  <p className="mt-1 text-sm text-slate-400 print:text-slate-600">
                    October 2026
                  </p>
                  <p className="mt-1 text-xs text-slate-500 print:text-slate-600">
                    Document: PAY-{String(selectedSlip.id).padStart(4, "0")}
                    -2026
                  </p>
                </div>
              </div>

              {/* Employee and payment details */}
              <div className="grid grid-cols-1 gap-5 py-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 print:text-slate-500">
                    Employee Details
                  </p>
                  <p className="mt-3 text-base font-semibold text-white print:text-black">
                    {selectedSlip.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400 print:text-slate-700">
                    {selectedSlip.role}
                  </p>
                  <p className="mt-1 text-sm text-slate-400 print:text-slate-700">
                    {selectedSlip.department}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 print:text-slate-600">
                    Employee ID: {selectedSlip.employeeCode}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:text-right print:border-slate-200 print:bg-white">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Net Pay
                  </p>
                  <p className="mt-2 text-2xl font-bold text-emerald-400 print:text-black">
                    {currency.format(getNetPay(selectedSlip))}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Illustrative monthly take-home
                  </p>
                </div>
              </div>

              {/* Earnings breakdown */}
              <div className="overflow-hidden rounded-xl border border-white/10 print:border-slate-200">
                <div className="grid grid-cols-[1fr_auto] gap-3 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 print:bg-slate-100 print:text-slate-700">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <PayslipRow
                  label="Base Salary"
                  amount={selectedSlip.baseSalary}
                  kind="earning"
                />
                <PayslipRow label="Other Earnings" amount={0} kind="earning" />
                <PayslipRow
                  label="Deductions"
                  amount={selectedSlip.deductions}
                  kind="deduction"
                />
                <PayslipRow
                  label="Tax Withholding"
                  amount={selectedSlip.tax}
                  kind="deduction"
                />
                <div className="grid grid-cols-[1fr_auto] gap-3 border-t border-white/10 bg-indigo-500/[0.08] px-4 py-4 print:border-slate-200 print:bg-slate-100">
                  <span className="text-sm font-bold text-white print:text-black">
                    Net Pay
                  </span>
                  <span className="text-sm font-bold text-emerald-400 print:text-black">
                    {currency.format(getNetPay(selectedSlip))}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 print:border-slate-200 print:bg-white">
                <p className="text-xs leading-5 text-slate-500 print:text-slate-600">
                  This is a sample salary slip generated from mock application
                  data. It is not an official tax document or confirmation of
                  payment. Please verify all figures before using any real
                  payroll information.
                </p>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end print:hidden">
                <button
                  type="button"
                  onClick={closeSlip}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={printSlip}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
                >
                  <Printer size={16} />
                  Print / Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

// Reusable finance metric card.
function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  background,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Banknote;
  color: string;
  background: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/20">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${background}`}
        >
          <Icon size={19} className={color} />
        </div>
      </div>
      <p className="mt-4 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

// Reusable employee identity used by both the table and mobile cards.
function EmployeeIdentity({ employee }: { employee: PayrollEmployee }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
        {employee.initials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-200">{employee.name}</p>
        <p className="mt-1 text-xs text-slate-500">
          {employee.employeeCode} · {employee.department}
        </p>
      </div>
    </div>
  );
}

// Payroll processing badge.
function PayrollStatus({ status }: { status: PayrollEmployee["status"] }) {
  const processed = status === "Processed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${processed ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-amber-500/20 bg-amber-500/10 text-amber-400"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${processed ? "bg-emerald-400" : "bg-amber-400"}`}
      />
      {status}
    </span>
  );
}

// Compact salary detail for mobile cards.
function SalaryField({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`mt-1 break-words text-sm ${emphasis ? "font-bold text-emerald-400" : "font-medium text-slate-200"}`}
      >
        {value}
      </p>
    </div>
  );
}

// Single row in the salary-slip breakdown.
function PayslipRow({
  label,
  amount,
  kind,
}: {
  label: string;
  amount: number;
  kind: "earning" | "deduction";
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 border-t border-white/[0.06] px-4 py-3 print:border-slate-200">
      <span className="text-sm text-slate-300 print:text-slate-700">
        {label}
      </span>
      <span
        className={`text-sm font-medium ${kind === "deduction" ? "text-rose-300 print:text-slate-700" : "text-slate-200 print:text-slate-700"}`}
      >
        {kind === "deduction" ? "− " : ""}
        {currency.format(amount)}
      </span>
    </div>
  );
}
