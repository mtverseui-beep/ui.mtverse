"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Pencil, Trash2, X, Folder, Clock } from "lucide-react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const TRANSITION_DURATION = 0.3;

// CinematicFolderCard — premium 3D folder with generation states.
// Upgraded from the original with: sparkles during generation, progress bar,
// inline rename with glow, delete confirmation with 5 exit animations, slot
// number counter, and polished image fan with center-out stagger.

interface FolderProject {
  id: string;
  title: string;
  status: "Synced" | "Rendering" | "Draft";
  itemCount: number;
  lastUpdated: string;
  accent: "cyan";
  previews: { src: string; alt: string }[];
}

const PROJECT: FolderProject = {
  id: "prj-aurora-9",
  title: "Unlocking Your Creative Potential",
  status: "Synced",
  itemCount: 42,
  lastUpdated: "Updated 2h ago",
  accent: "cyan",
  previews: [
    { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=85", alt: "Cinematic portrait — creative director in studio light" },
    { src: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&w=400&q=85", alt: "Cinematic portrait — photographer at golden hour" },
    { src: "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=400&q=85", alt: "Cinematic portrait — focused craftsperson at work" },
    { src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=85", alt: "Cinematic portrait — visionary in dramatic key light" },
    { src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=400&q=85", alt: "Cinematic portrait — atmospheric lone silhouette" },
  ],
};

const ACCENT = {
  glow: "rgba(34,211,238,0.50)",
  soft: "rgba(34,211,238,0.10)",
  ring: "rgba(34,211,238,0.65)",
  text: "text-cyan-600 dark:text-cyan-300",
  pillBg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  pillBorder: "border-cyan-500/30 dark:border-cyan-400/30",
  pillText: "text-cyan-700 dark:text-cyan-200",
  dot: "bg-cyan-500 dark:bg-cyan-400",
  halo: "rgba(34,211,238,0.20)",
};

const TOTAL_SPREAD = 168;
const STEP = TOTAL_SPREAD / 4;
const START_X = -TOTAL_SPREAD / 2;

const IMAGE_POSITIONS = Array.from({ length: 5 }, (_, i) => {
  const x = START_X + STEP * i;
  const normalized = (i / 4) * 2 - 1;
  const rotate = normalized * 11;
  return { x, rotate };
});

// Sparkle positions for generation state
const SPARKLE_POSITIONS = [
  { x: 15, y: 20 }, { x: 85, y: 25 }, { x: 30, y: 70 }, { x: 70, y: 75 },
  { x: 50, y: 40 }, { x: 25, y: 45 }, { x: 75, y: 50 }, { x: 45, y: 80 },
  { x: 10, y: 55 }, { x: 90, y: 60 }, { x: 60, y: 20 }, { x: 40, y: 30 },
];

export function CinematicFolderCard() {
  const project = PROJECT;

  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(project.title);
  const [editCooldown, setEditCooldown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [exitAnimationType, setExitAnimationType] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showImages, setShowImages] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const deleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deleteIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const generateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isActive = isHovered && !isEditing && !isMenuOpen && !showDeleteConfirm && !isDeleting && !isGenerating;
  const isCompact = isEditing || isMenuOpen || showDeleteConfirm || isDeleting;

  // Focus textarea on edit
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const t = textareaRef.current;
      t.focus();
      const len = t.value.length;
      t.setSelectionRange(len, len);
    }
  }, [isEditing]);

  // Handler functions — declared before the effects that use them.
  const handleEditClick = () => {
    setEditTitle(project.title);
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleConfirmEdit = () => {
    setIsEditing(false);
    setIsMenuOpen(false);
    setIsHovered(false);
    setEditCooldown(true);
    setTimeout(() => setEditCooldown(false), 300);
  };

  const handleCancelEdit = () => {
    setEditTitle(project.title);
    setIsEditing(false);
    setIsMenuOpen(false);
    setIsHovered(false);
    setEditCooldown(true);
    setTimeout(() => setEditCooldown(false), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleConfirmEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  // Close on outside click when editing
  useEffect(() => {
    if (!isEditing) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCancelEdit();
      }
    };
    const timer = setTimeout(() => document.addEventListener("mousedown", handler), 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handler);
    };
  }, [isEditing]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
      if (deleteIntervalRef.current) clearInterval(deleteIntervalRef.current);
      if (generateIntervalRef.current) clearInterval(generateIntervalRef.current);
    };
  }, []);

  const handleStartGeneration = () => {
    setIsMenuOpen(false);
    setIsGenerating(true);
    setShowImages(false);
    setProgress(0);
    const startTime = Date.now();
    const duration = 6000;
    generateIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.round(newProgress));
      if (elapsed >= duration) {
        if (generateIntervalRef.current) clearInterval(generateIntervalRef.current);
        setShowImages(true);
        setTimeout(() => setIsGenerating(false), 800);
      }
    }, 100);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setIsMenuOpen(false);
  };

  const startDeleteCountdown = () => {
    setIsDeleting(true);
    setDeleteProgress(0);
    const duration = 3000;
    const interval = 50;
    let elapsed = 0;
    deleteIntervalRef.current = setInterval(() => {
      elapsed += interval;
      setDeleteProgress((elapsed / duration) * 100);
    }, interval);
    deleteTimeoutRef.current = setTimeout(() => {
      if (deleteIntervalRef.current) clearInterval(deleteIntervalRef.current);
      setExitAnimationType(Math.floor(Math.random() * 5));
      setIsExiting(true);
    }, duration);
  };

  const cancelDeleteCountdown = () => {
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current);
      deleteTimeoutRef.current = null;
    }
    if (deleteIntervalRef.current) {
      clearInterval(deleteIntervalRef.current);
      deleteIntervalRef.current = null;
    }
    setIsDeleting(false);
    setDeleteProgress(0);
    setShowDeleteConfirm(false);
    setIsHovered(false);
  };

  const formattedDate = useMemo(() => {
    return project.lastUpdated;
  }, [project.lastUpdated]);

  return (
    <motion.div
      ref={containerRef}
      className="group relative w-[clamp(260px,85vw,300px)] cursor-pointer"
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.95 : 1,
        rotateX: isExiting ? 15 : 0,
        y: isExiting ? -20 : 0,
      }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      style={{
        perspective: "1400px",
        zIndex: isActive || isEditing || isMenuOpen || showDeleteConfirm || isDeleting ? 50 : 1,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => !editCooldown && !showDeleteConfirm && !isDeleting && setIsHovered(true)}
      onMouseLeave={() => !isMenuOpen && !isEditing && !showDeleteConfirm && !isDeleting && setIsHovered(false)}
    >
      {/* Ambient glow */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0 blur-2xl"
          animate={{
            opacity: isActive ? 0.8 : 0.3,
            background: isActive
              ? `radial-gradient(circle at 50% 38%, ${ACCENT.glow}, transparent 65%)`
              : `radial-gradient(circle at 50% 40%, ${ACCENT.soft}, transparent 70%)`,
          }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        />
      </motion.div>

      <div className="relative w-[clamp(260px,85vw,300px)]" style={{ perspective: "1200px" }}>
        {/* ───────── BACK PANEL ───────── */}
        <motion.div
          className="relative z-0 rounded-2xl"
          animate={{
            rotateX: isActive ? 15 : 0,
            // Dark surface for both themes — the back panel is the "folder"
            // behind the images, always dark so images pop.
            backgroundColor: isGenerating ? "#111111" : "#1a1a1a",
          }}
          transition={{
            rotateX: { type: "spring", stiffness: 200, damping: 25, mass: 0.8 },
            backgroundColor: { duration: TRANSITION_DURATION, ease: EASE_OUT_EXPO },
          }}
          style={{
            height: "224px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          {/* Sparkles during generation */}
          {isGenerating && (
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 animate-pulse"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 70%)" }}
              />
              {SPARKLE_POSITIONS.map((pos, idx) => {
                const size = 4 + (idx % 4) * 2;
                const opacity = 0.15 + (idx % 4) * 0.1;
                return (
                  <div
                    key={idx}
                    className="absolute animate-float-sparkle"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${idx * 0.15}s`,
                      animationDuration: `${2 + (idx % 3) * 0.5}s`,
                    }}
                  >
                    <svg
                      style={{ width: size, height: size, opacity }}
                      className="text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                    </svg>
                  </div>
                );
              })}
            </div>
          )}

          {/* Top highlight */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Folder header */}
          <div className="absolute left-4 top-3 z-20 flex items-center gap-2">
            <Folder className={`h-3.5 w-3.5 ${ACCENT.text}`} strokeWidth={1.8} />
            <span className="font-mono text-[10px] tracking-wider text-white/35">{project.id.toUpperCase()}</span>
          </div>

          {/* Status pill */}
          <motion.div
            className="absolute right-3 top-3 z-20"
            animate={{ opacity: isEditing ? 0 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <span className={`inline-flex items-center gap-1.5 rounded-full border ${ACCENT.pillBorder} ${ACCENT.pillBg} ${ACCENT.pillText} px-2 py-1 text-[10px] font-medium backdrop-blur-md`}>
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${ACCENT.dot} opacity-30`} />
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${ACCENT.dot} opacity-80`} />
              </span>
              {isGenerating ? "Generating" : project.status}
            </span>
          </motion.div>

          {/* ───────── IMAGE STACK ───────── */}
          <motion.div
            className="absolute inset-0 z-[1]"
            animate={{ rotateX: isActive ? -15 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
            style={{ transformStyle: "flat", transformOrigin: "center bottom", pointerEvents: "none" }}
          >
            {IMAGE_POSITIONS.map((pos, imgIndex) => {
              const image = project.previews[imgIndex];
              const imageUrl = image?.src;
              const alt = image?.alt ?? `Preview ${imgIndex + 1}`;
              const centerIndex = 2;
              const distanceFromCenter = Math.abs(imgIndex - centerIndex);
              const zIndex = 10 - distanceFromCenter;
              const brightness = distanceFromCenter === 0 ? 1 : distanceFromCenter === 1 ? 0.55 : 0.3;
              const blurAmount = distanceFromCenter === 0 ? 0 : distanceFromCenter === 1 ? 0.5 : 1.5;
              const yOffset = -16 * (1 - distanceFromCenter / centerIndex) || 0;
              const scale = distanceFromCenter === 0 ? 1.05 : distanceFromCenter === 1 ? 0.95 : 0.88;
              const xPos = isCompact ? pos.x * 0.85 : isActive ? pos.x * 1.4 : pos.x;
              const yPos = isCompact ? 18 + yOffset : isActive ? -8 + yOffset : 8 + yOffset;
              const rotation = isCompact ? pos.rotate * 0.8 : isActive ? pos.rotate * 1.3 : pos.rotate;
              const finalScale = isCompact ? scale * 0.98 : isActive ? scale * 1.02 : scale;
              const staggerDelay = distanceFromCenter * 0.08;
              const shouldShow = showImages || !isGenerating;

              return (
                <motion.div
                  key={imgIndex}
                  className="absolute left-1/2 top-0"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${xPos}px)`,
                    y: yPos,
                    rotate: rotation,
                    scale: shouldShow ? finalScale : 0.8,
                    opacity: shouldShow ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 16,
                    mass: 1,
                    delay: shouldShow ? staggerDelay : 0,
                    opacity: { duration: 0.4, ease: "easeOut", delay: shouldShow ? staggerDelay : 0 },
                  }}
                  style={{ zIndex }}
                >
                  <div className="h-[160px] w-[100px] overflow-hidden rounded-lg border border-white/[0.04] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)]">
                    {imageUrl && (
                      <motion.div
                        animate={{
                          filter: `brightness(${isActive ? Math.min(1, brightness + 0.2) : brightness}) contrast(1.08) saturate(${1 - distanceFromCenter * 0.2}) blur(${isActive ? 0 : blurAmount}px)`,
                        }}
                        transition={{ duration: TRANSITION_DURATION, ease: EASE_OUT_EXPO }}
                        className="relative h-full w-full"
                      >
                        <Image src={imageUrl} alt={alt} fill sizes="100px" className="object-cover" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ───────── FRONT PANEL ───────── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden rounded-2xl"
          animate={{
            rotateX: isActive ? -25 : 0,
            // Front panel uses theme-aware surface — light in light mode,
            // dark in dark mode. The backdrop-blur frosts whatever is behind.
            backgroundColor: "var(--card-surface)",
          }}
          transition={{
            rotateX: { type: "spring", stiffness: 180, damping: 22, mass: 0.8 },
            backgroundColor: { duration: TRANSITION_DURATION, ease: EASE_OUT_EXPO },
          }}
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--card-border)",
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          {/* Title row with edit mode glow */}
          <div className="relative min-h-[2.75rem] px-4 py-3">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-2 rounded-t-2xl transition-all duration-500"
              style={{
                opacity: isEditing ? 1 : 0,
                background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${ACCENT.halo} 0%, transparent 60%)`,
                filter: "blur(12px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px overflow-hidden rounded-t-lg transition-all duration-500"
              style={{
                opacity: isEditing ? 1 : 0,
                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-2 -top-px h-px transition-all duration-500"
              style={{
                opacity: isEditing ? 1 : 0,
                background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.55) 50%, transparent 100%)",
                filter: "blur(0.5px)",
              }}
            />

            <h3
              className={`relative z-0 line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug cs-text transition-all duration-200 ${isActive ? "" : "cs-muted"}`}
              style={{ opacity: isEditing ? 0 : 1, pointerEvents: isEditing ? "none" : "auto" }}
            >
              {project.title}
            </h3>
            <textarea
              ref={textareaRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              aria-label="Edit folder title"
              className="absolute inset-0 h-full w-full resize-none rounded-none border-none bg-transparent px-4 py-3 text-base font-semibold leading-snug cs-text caret-cyan-500 transition-opacity duration-200 focus:outline-none"
              style={{ opacity: isEditing ? 1 : 0, pointerEvents: isEditing ? "auto" : "none" }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Footer */}
          <div className="relative h-[52px]">
            <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--card-border-subtle)" }} />

            {/* Progress bar during generation */}
            {isGenerating && progress < 100 && (
              <motion.div
                className="absolute left-0 top-0 h-px"
                style={{ background: ACCENT.ring }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            )}

            <div className="relative h-full">
              {isEditing ? (
                <motion.div
                  key="editing"
                  className="absolute inset-0 flex items-center justify-end gap-2 px-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8, opacity: { duration: 0.15 } }}
                >
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer rounded-full px-3 py-1.5 text-[12px] cs-muted transition-colors hover:bg-black/5 cs-hover dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40"
                    onClick={(e) => { e.stopPropagation(); handleCancelEdit(); }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer rounded-full bg-cyan-500 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                    onClick={(e) => { e.stopPropagation(); handleConfirmEdit(); }}
                  >
                    Save
                  </motion.button>
                </motion.div>
              ) : isGenerating && !showImages ? (
                <motion.div
                  key="generating"
                  className="absolute inset-0 flex items-center justify-between px-2 pl-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8, opacity: { duration: 0.15 } }}
                >
                  <div className="flex items-center gap-1.5">
                    <motion.svg
                      className="h-3 w-3 cs-muted"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                    </motion.svg>
                    <span className="text-[13px] cs-text">Generating</span>
                    {progress < 95 && (
                      <span className="text-[13px] cs-muted">
                        ~{Math.max(0, Math.ceil((100 - progress) / 10))}s
                      </span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  className="absolute inset-0 flex items-center justify-between pl-4 pr-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1, opacity: { duration: 0.35, ease: "easeOut" } }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[13px] cs-muted">
                      <Folder className={`h-3.5 w-3.5 ${ACCENT.text}`} strokeWidth={1.9} />
                      <span className="font-semibold cs-text tabular-nums">{project.itemCount}</span>
                      <span className="cs-subtle">clips</span>
                    </span>
                    <span className="flex items-center gap-1 text-[12px] cs-subtle">
                      <Clock className="h-3 w-3" strokeWidth={1.9} />
                      {formattedDate}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    data-menu
                    aria-label="Folder actions"
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    whileTap={{ scale: 0.94 }}
                    onClick={(e) => { e.stopPropagation(); setIsMenuOpen((v) => !v); }}
                    className={`cursor-pointer rounded-md p-1.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 cs-hover dark:hover:bg-white/10 ${
                      isMenuOpen ? "bg-black/5 dark:bg-white/10" : ""
                    }`}
                  >
                    <MoreVertical
                      className={`h-4 w-4 transition-colors ${isMenuOpen ? ACCENT.text : "cs-subtle"}`}
                      strokeWidth={2.2}
                    />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Menu dropdown — rendered OUTSIDE the front panel's overflow-hidden
          so it isn't clipped. Positioned at the container level, floating
          above the footer area. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
            className="absolute bottom-[52px] right-0 z-50 w-40 overflow-hidden rounded-lg cs-border cs-surface shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <MenuButton label="Rename" icon={Pencil} onClick={(e) => { e.stopPropagation(); handleEditClick(); }} />
            <MenuButton label="Generate" icon={Folder} onClick={(e) => { e.stopPropagation(); handleStartGeneration(); }} />
            <MenuButton label="Delete" icon={Trash2} tone="danger" onClick={(e) => { e.stopPropagation(); handleDeleteClick(); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────── DELETE CONFIRMATION OVERLAY ───────── */}
      <AnimatePresence>
        {(showDeleteConfirm || isDeleting) && !isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center rounded-2xl"
            onClick={() => cancelDeleteCountdown()}
          >
            <div className="absolute inset-0 rounded-2xl" style={{ background: "var(--card-surface)" }} />
            <div
              className="relative flex cursor-default flex-col items-center px-5 py-5"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[13px] font-medium cs-text">Delete this folder?</p>
              <p className="mt-1 text-[11px] cs-muted">Hold to confirm · click to cancel</p>
              <button
                type="button"
                onMouseDown={startDeleteCountdown}
                onMouseUp={cancelDeleteCountdown}
                onMouseLeave={cancelDeleteCountdown}
                onTouchStart={startDeleteCountdown}
                onTouchEnd={cancelDeleteCountdown}
                className="mt-3 w-32 rounded-lg bg-rose-500/20 py-2 text-[12px] font-semibold text-rose-300 transition hover:bg-rose-500/30"
              >
                {isDeleting ? `Deleting… ${Math.round(deleteProgress)}%` : "Hold to delete"}
              </button>
              {isDeleting && (
                <div className="mt-2 h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-rose-500 transition-all duration-75"
                    style={{ width: `${deleteProgress}%` }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit animation styles */}
      <style>{`
        @keyframes exitShrinkRise {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.7) translateY(-40px); }
        }
        @keyframes exitCollapse {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          50% { opacity: 0.8; transform: scale(0.5); filter: blur(2px); }
          100% { opacity: 0; transform: scale(0.1); filter: blur(8px); }
        }
        @keyframes exitFlashFade {
          0% { opacity: 1; filter: brightness(1); }
          15% { opacity: 1; filter: brightness(2); }
          100% { opacity: 0; filter: brightness(0.5); }
        }
        @keyframes exitFoldAway {
          0% { opacity: 1; transform: perspective(800px) rotateX(0deg); }
          100% { opacity: 0; transform: perspective(800px) rotateX(90deg); }
        }
        @keyframes exitDissolve {
          0% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(20px); }
        }
      `}</style>
    </motion.div>
  );
}

function MenuButton({
  label,
  icon: Icon,
  tone,
  onClick,
}: {
  label: string;
  icon: typeof Pencil;
  tone?: "danger";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-[13px] transition cs-hover ${
        tone === "danger" ? "text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300" : "cs-muted hover:cs-text"
      }`}
    >
      <Icon className="h-3.5 w-3.5 opacity-80" strokeWidth={1.9} />
      {label}
    </button>
  );
}
