"use client"

import { motion } from "framer-motion"
import { Repeat, Calendar, Clock, MoreHorizontal } from "lucide-react"

export interface DirectDebitCardProps {
  payeeName?: string
  amount?: number
  frequency?: "weekly" | "monthly" | "yearly"
  nextPaymentDate?: string
  lastPaymentDate?: string
  accountEnding?: string
  status?: "active" | "paused" | "pending"
  category?: string
}

export function DirectDebitCard({
  payeeName = "Netflix Premium",
  amount = 15.99,
  frequency = "monthly",
  nextPaymentDate = "Jan 15, 2026",
  lastPaymentDate = "Dec 15, 2025",
  accountEnding = "6789",
  status = "active",
  category = "Entertainment",
}: DirectDebitCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    pending: "bg-blue-100 text-blue-700",
  }

  const frequencyLabel = {
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900"
      style={{
        boxShadow:
          "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
      }}
    >
      <div className="p-6 px-3 py-3">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Repeat className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-zinc-100">{payeeName}</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-400">{category}</p>
            </div>
          </div>
          <button className="rounded-full p-1 hover:bg-slate-100 transition-colors dark:hover:bg-zinc-800">
            <MoreHorizontal className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Amount */}
        <div className="mb-4 rounded-xl p-4 py-3 px-3 bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{frequencyLabel[frequency]} Payment</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-zinc-100">${amount.toFixed(2)}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-slate-400" />
            <div className="flex-1">
              <span className="text-slate-500 text-xs">Next Payment:</span>
              <span className="ml-2 font-semibold text-slate-900 text-xs dark:text-zinc-100">{nextPaymentDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-slate-400" />
            <div className="flex-1">
              <span className="text-slate-500 text-xs">Last Payment:</span>
              <span className="ml-2 font-semibold text-slate-900 text-xs dark:text-zinc-100">{lastPaymentDate}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-zinc-800">
          <p className="text-xs text-slate-500">From account ****{accountEnding}</p>
          <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700">
            Manage
          </button>
        </div>
      </div>
    </motion.div>
  )
}
