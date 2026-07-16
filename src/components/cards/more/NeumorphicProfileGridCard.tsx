"use client";

import { useState } from "react";
import { PlusCircle, Star, Bell, Search, MessageCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// NeumorphicProfileGridCard — soft neumorphic profile grid.
// Dual-shadow surfaces (light from top-left, shadow bottom-right) create a
// tactile, premium feel. Filter by All/Premium/Guest. Each card has a memoji
// avatar, status dot, verified badge, followers count, and action buttons.
// Includes an "Add New Member" CTA card.
//
// Theme-aware neumorphic shadows: in light mode the surface is #e8eaf0 with
// white highlights and dark shadows. In dark mode the surface is #2a2b30
// (mid-tone, not pure black) with subtle dark shadows and faint light
// highlights — neumorphism needs a mid-tone bg to work at all.

type Status = "online" | "offline" | "away";

interface Profile {
  name: string;
  role: string;
  status: Status;
  avatar: string;
  tags: string[];
  isVerified: boolean;
  followers: number;
}

const PROFILES: Profile[] = [
  {
    name: "Alex Thompson",
    role: "UI/UX Designer",
    status: "online",
    avatar: "/memoji/memoji-alex.png",
    tags: ["Premium"],
    isVerified: true,
    followers: 1240,
  },
  {
    name: "Michael Chen",
    role: "Frontend Developer",
    status: "online",
    avatar: "/memoji/memoji-michael.png",
    tags: ["Guest"],
    isVerified: false,
    followers: 856,
  },
  {
    name: "Emily Wilson",
    role: "Product Manager",
    status: "away",
    avatar: "/memoji/memoji-emily.png",
    tags: ["Premium"],
    isVerified: true,
    followers: 2100,
  },
  {
    name: "David Rodriguez",
    role: "Marketing Specialist",
    status: "offline",
    avatar: "/memoji/memoji-david.png",
    tags: ["Guest"],
    isVerified: false,
    followers: 432,
  },
];

const STATUS_DOT: Record<Status, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-slate-400 dark:bg-slate-600",
};

export function NeumorphicProfileGridCard() {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? PROFILES.filter((p) => p.tags.includes(filter)) : PROFILES;

  return (
    <motion.div
      className="w-[clamp(300px,92vw,440px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* The container defines CSS custom properties for the 3 shadow states.
          Children read these via var() in their own boxShadow styles. */}
      <style>{`
        .neu-surface {
          --neu-out: 8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.9);
          --neu-in: inset 4px 4px 8px rgba(0,0,0,0.08), inset -4px -4px 8px rgba(255,255,255,0.8);
          --neu-pressed: 3px 3px 6px rgba(0,0,0,0.08), -3px -3px 6px rgba(255,255,255,0.7);
          --neu-bg: #e8eaf0;
        }
        .dark .neu-surface {
          --neu-out: 6px 6px 14px rgba(0,0,0,0.5), -6px -6px 14px rgba(255,255,255,0.04);
          --neu-in: inset 3px 3px 7px rgba(0,0,0,0.4), inset -3px -3px 7px rgba(255,255,255,0.04);
          --neu-pressed: 2px 2px 5px rgba(0,0,0,0.4), -2px -2px 5px rgba(255,255,255,0.03);
          --neu-bg: #2a2b30;
        }
      `}</style>

      <div
        className="neu-surface rounded-[22px] p-3.5 sm:p-4"
        style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-out)" }}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-slate-800 dark:text-white">Team Members</h2>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">Connect with your colleagues</p>
          </div>
          <div className="flex items-center gap-1.5">
            <NeuIconButton ariaLabel="Notifications">
              <Bell className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" strokeWidth={2} />
            </NeuIconButton>
            <NeuIconButton ariaLabel="Search">
              <Search className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" strokeWidth={2} />
            </NeuIconButton>
          </div>
        </div>

        {/* Filter pills */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {[
            { label: "All", value: null },
            { label: "Premium", value: "Premium" },
            { label: "Guests", value: "Guest" },
          ].map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setFilter(f.value)}
                style={{
                  background: "var(--neu-bg)",
                  boxShadow: active ? "var(--neu-pressed)" : "var(--neu-out)",
                }}
                className={`rounded-full px-4 py-2 text-[12px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: EASE }}
              >
                <ProfileCard profile={p} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add new member CTA */}
          <AddProfileCard />
        </div>
      </div>
    </motion.div>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div
      className="neu-surface group relative overflow-hidden rounded-lg p-2.5 transition-all duration-300 hover:[box-shadow:var(--neu-pressed)]"
      style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-out)" }}
    >
      {/* Status dot */}
      <div className="absolute right-3 top-3">
        <div className={`h-2.5 w-2.5 rounded-full border-2 ${STATUS_DOT[profile.status]}`}
          style={{ borderColor: "var(--neu-bg)" }}
        />
      </div>

      {/* Verified badge */}
      {profile.isVerified && (
        <div className="absolute right-3 top-8">
          <div className="rounded-full bg-blue-500 p-0.5 shadow-sm">
            <Star className="h-2.5 w-2.5 fill-white text-white" strokeWidth={2} />
          </div>
        </div>
      )}

      {/* Avatar */}
      <div className="mb-2 flex justify-center">
        <div
          className="relative h-14 w-14 overflow-hidden rounded-full p-1"
          style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-in)" }}
        >
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            sizes="56px"
            className="rounded-full object-contain p-1"
          />
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="text-[12px] font-semibold text-slate-800 dark:text-white">{profile.name}</h3>
        <p className="mt-0.5 text-[10.5px] text-slate-500 dark:text-slate-400">{profile.role}</p>
        <p className="mt-0.5 text-[9.5px] text-slate-400 dark:text-slate-500">
          {profile.followers.toLocaleString()} followers
        </p>
      </div>

      {/* Tags */}
      <div className="mt-2 flex justify-center gap-1.5">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2 py-0.5 text-[9.5px] font-medium ${
              tag === "Premium" ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
            }`}
            style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-pressed)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-2.5 flex gap-1.5">
        <button
          type="button"
          aria-label={`Follow ${profile.name}`}
          className="flex-1 rounded-full py-1.5 text-blue-600 transition-all hover:[box-shadow:var(--neu-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 dark:text-blue-400"
          style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-out)" }}
        >
          <UserPlus className="mx-auto h-3.5 w-3.5" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          aria-label={`Message ${profile.name}`}
          className="flex-1 rounded-full py-1.5 text-slate-600 transition-all hover:[box-shadow:var(--neu-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 dark:text-slate-300"
          style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-out)" }}
        >
          <MessageCircle className="mx-auto h-3.5 w-3.5" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

function AddProfileCard() {
  return (
    <button
      type="button"
      className="neu-surface flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg p-2.5 transition-all hover:[box-shadow:var(--neu-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
      style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-out)" }}
    >
      <div
        className="mb-2 rounded-full p-2.5"
        style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-pressed)" }}
      >
        <PlusCircle className="h-5 w-5 text-slate-500 dark:text-slate-400" strokeWidth={1.8} />
      </div>
      <h3 className="text-[12px] font-semibold text-slate-800 dark:text-white">Add Member</h3>
      <p className="mt-0.5 text-center text-[10px] text-slate-500 dark:text-slate-400">
        Invite someone
      </p>
    </button>
  );
}

function NeuIconButton({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="neu-surface rounded-full p-2 transition-all hover:[box-shadow:var(--neu-pressed)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
      style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-out)" }}
    >
      {children}
    </button>
  );
}
