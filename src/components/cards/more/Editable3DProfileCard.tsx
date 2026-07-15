"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  ExternalLink,
  Heart,
  Package,
  Edit2,
  Check,
  Camera,
  CreditCard,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

// Editable3DProfileCard — interactive 3D profile card with drag-to-rotate
// and inline edit mode. Front shows avatar, name, title, bio, action buttons
// (Products, Portfolio, Support), payment options (UPI/Stripe/Link), and
// social links. Back shows an edit form with image upload via FileReader.
// Drag anywhere on the card to rotate it in 3D space; release to snap back.

export function Editable3DProfileCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Jessin Sam S");
  const [title, setTitle] = useState("Vibe Coder");
  const [about, setAbout] = useState(
    "Crafting digital experiences with code and creativity. Building the future, one line at a time.",
  );
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  );
  const [portfolioUrl, setPortfolioUrl] = useState("#");
  const [productsUrl, setProductsUrl] = useState("#");
  const [donationUrl, setDonationUrl] = useState("#");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/");
  const [twitterUrl, setTwitterUrl] = useState("https://x.com/");
  const [upiId, setUpiId] = useState("jessin@upi");
  const [stripeUrl, setStripeUrl] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditing) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({
          x: newX,
          y: newY,
          z: Math.abs(newX) * 0.1 + Math.abs(newY) * 0.1,
        });
        setRotateX((newY / window.innerHeight) * 20);
        setRotateY((newX / window.innerWidth) * 20);
      } else if (!isEditing) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX(((y - centerY) / centerY) * -10);
        setRotateY(((x - centerX) / centerX) * 10);
      }
    },
    [isDragging, dragStart, isEditing, position],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0, z: 0 });
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setRotateX(0);
    setRotateY(0);
    setPosition({ x: 0, y: 0, z: 0 });
  };

  return (
    <motion.div
      className="w-[clamp(300px,92vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.14), transparent 55%), radial-gradient(circle at 70% 80%, rgba(236,72,153,0.10), transparent 60%)",
        }}
      />

      <div
        className="cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        style={{ perspective: 2000 }}
      >
        <div
          ref={cardRef}
          onMouseDown={handleMouseDown}
          className="relative w-full transition-all duration-500 ease-out"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${rotateX}deg) rotateY(${isEditing ? 180 : rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── FRONT ── */}
          <div
            aria-hidden={isEditing}
            className="cs-surface relative w-full overflow-hidden rounded-[22px] border cs-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Edit button */}
            <button
              type="button"
              aria-label="Edit profile"
              onClick={() => setIsEditing(true)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border cs-border bg-[var(--card-surface)]/80 backdrop-blur-xl transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              <Edit2 className="h-3.5 w-3.5 cs-muted" strokeWidth={2} />
            </button>

            {/* Avatar */}
            <div className="relative mt-10 flex justify-center px-6">
              <div
                className="relative"
                style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-slate-900 ring-1 ring-black/5 dark:ring-white/5">
                  <Image src={profileImage} alt={name} fill sizes="96px" className="object-cover" priority />
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full bg-cyan-500 p-1.5 shadow-md ring-2 ring-white dark:ring-slate-900">
                  <BadgeCheck className="h-4 w-4 text-white" strokeWidth={2.4} />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 px-6 pb-6 pt-4">
              <div className="space-y-2 text-center">
                <h2 className="text-[22px] font-semibold tracking-tight cs-text">{name}</h2>
                <div className="inline-block rounded-full border cs-border px-3 py-1 text-[11.5px] font-medium cs-muted">
                  {title}
                </div>
              </div>

              <p className="text-center text-[12px] leading-relaxed cs-muted">{about}</p>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => window.open(productsUrl, "_blank")}
                  className="group flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-[12px] font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  <Package className="h-3.5 w-3.5 transition group-hover:scale-110" strokeWidth={2.2} />
                  Products
                </button>
                <button
                  type="button"
                  onClick={() => window.open(portfolioUrl, "_blank")}
                  className="group flex items-center justify-center gap-1.5 rounded-xl border cs-border py-2 text-[12px] font-medium cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                >
                  <ExternalLink className="h-3.5 w-3.5 transition group-hover:scale-110" strokeWidth={2.2} />
                  Portfolio
                </button>
              </div>

              <button
                type="button"
                onClick={() => window.open(donationUrl, "_blank")}
                className="group flex w-full items-center justify-center gap-1.5 rounded-xl bg-rose-500 py-2 text-[12px] font-medium text-white transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
              >
                <Heart className="h-3.5 w-3.5 transition group-hover:scale-110" strokeWidth={2.2} />
                Support My Work
              </button>

              {/* Payment options */}
              {(upiId || stripeUrl || paymentLink) && (
                <div className="space-y-1.5 pt-1">
                  <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-medium cs-muted">
                    <CreditCard className="h-3.5 w-3.5" strokeWidth={2.2} />
                    Payment Options
                  </div>
                  <div className="grid gap-1.5">
                    {upiId && (
                      <button
                        type="button"
                        onClick={() => window.open(`upi://pay?pa=${upiId}`, "_blank")}
                        className="flex w-full items-center justify-start rounded-lg border cs-border px-3 py-1.5 text-[11px] transition cs-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40"
                      >
                        <span className="mr-2 font-medium cs-text">UPI:</span>
                        <span className="truncate cs-muted">{upiId}</span>
                      </button>
                    )}
                    {stripeUrl && (
                      <button
                        type="button"
                        onClick={() => window.open(stripeUrl, "_blank")}
                        className="w-full rounded-lg border cs-border px-3 py-1.5 text-left text-[11px] font-medium cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40"
                      >
                        Stripe Payment
                      </button>
                    )}
                    {paymentLink && (
                      <button
                        type="button"
                        onClick={() => window.open(paymentLink, "_blank")}
                        className="w-full rounded-lg border cs-border px-3 py-1.5 text-left text-[11px] font-medium cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40"
                      >
                        Payment Link
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Socials */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => window.open(instagramUrl, "_blank")}
                  aria-label="Instagram"
                  className="flex-1 rounded-xl border cs-border py-2 transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                >
                  <Instagram className="mx-auto h-4 w-4 cs-text" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => window.open(twitterUrl, "_blank")}
                  aria-label="Twitter / X"
                  className="flex-1 rounded-xl border cs-border py-2 transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                >
                  <Twitter className="mx-auto h-4 w-4 cs-text" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* ── BACK (edit form) ── */}
          <div
            aria-hidden={!isEditing}
            className="cs-surface absolute inset-0 w-full overflow-hidden rounded-[22px] border cs-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <button
              type="button"
              aria-label="Save and close"
              onClick={() => setIsEditing(false)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 dark:bg-white dark:text-slate-900"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>

            <div className="scrollbar-modern max-h-[520px] space-y-4 overflow-y-auto px-6 py-8">
              <div className="mb-4 text-center">
                <h3 className="text-[18px] font-semibold cs-text">Edit Profile</h3>
                <p className="mt-1 text-[11.5px] cs-muted">Update your information</p>
              </div>

              {/* Image upload */}
              <div className="flex flex-col items-center gap-2 border-b cs-border pb-3">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 cs-border">
                  <Image src={profileImage} alt="Profile" fill sizes="80px" className="object-cover" />
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg border cs-border px-3 py-1 text-[11px] font-medium cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/40"
                >
                  <Camera className="h-3 w-3" strokeWidth={2.2} />
                  Change Photo
                </button>
              </div>

              {/* Form fields */}
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Title" value={title} onChange={setTitle} placeholder="Your title" />
              <Field label="About" value={about} onChange={setAbout} placeholder="Tell us about yourself" textarea />

              <div className="space-y-3 border-t cs-border pt-3">
                <Field label="Products URL" value={productsUrl} onChange={setProductsUrl} placeholder="https://..." />
                <Field label="Portfolio URL" value={portfolioUrl} onChange={setPortfolioUrl} placeholder="https://..." />
                <Field label="Donation URL" value={donationUrl} onChange={setDonationUrl} placeholder="https://..." />
              </div>

              <div className="space-y-3 border-t cs-border pt-3">
                <div className="flex items-center gap-1.5 text-[10.5px] font-medium cs-muted">
                  <CreditCard className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Payment Options
                </div>
                <Field label="UPI ID" value={upiId} onChange={setUpiId} placeholder="yourname@upi" />
                <Field label="Stripe Link" value={stripeUrl} onChange={setStripeUrl} placeholder="https://buy.stripe.com/..." />
                <Field label="Payment Link" value={paymentLink} onChange={setPaymentLink} placeholder="https://..." />
              </div>

              <div className="space-y-3 border-t cs-border pt-3">
                <Field label="Instagram" value={instagramUrl} onChange={setInstagramUrl} placeholder="https://instagram.com/..." />
                <Field label="Twitter / X" value={twitterUrl} onChange={setTwitterUrl} placeholder="https://x.com/..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p className="mt-3 text-center text-[11px] cs-subtle">
        Drag to rotate · Click edit to flip
      </p>
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10.5px] font-medium cs-muted">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="cs-input w-full resize-none rounded-lg border cs-border px-3 py-2 text-[12px] cs-text placeholder:cs-subtle focus:border-cyan-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/30"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="cs-input w-full rounded-lg border cs-border px-3 py-2 text-[12px] cs-text placeholder:cs-subtle focus:border-cyan-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/30"
        />
      )}
    </div>
  );
}
