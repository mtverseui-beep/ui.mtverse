"use client";

import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mic, Volume2, VolumeX } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RecordingState =
  | "idle"
  | "requesting"
  | "recording"
  | "stopping"
  | "error"
  | "unavailable";

export interface VoiceAudioCardProps {
  onRecordingComplete?: (blob: Blob, objectUrl: string) => void;
  muted?: boolean;
  defaultMuted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  volume?: number;
  defaultVolume?: number;
  onVolumeChange?: (volume: number) => void;
}

function clampVolume(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function VoiceAudioCard({
  onRecordingComplete,
  muted,
  defaultMuted = false,
  onMutedChange,
  volume,
  defaultVolume = 60,
  onVolumeChange,
}: VoiceAudioCardProps = {}) {

  const reduceMotion = Boolean(useReducedMotion());
  const [internalMuted, setInternalMuted] = useState(defaultMuted);
  const [internalVolume, setInternalVolume] = useState(clampVolume(defaultVolume));
  const titleId = useId();
  const effectiveMuted = muted ?? internalMuted;
  const effectiveVolume = clampVolume(volume ?? internalVolume);

  const setMuted = (next: boolean) => {
    if (muted === undefined) setInternalMuted(next);
    onMutedChange?.(next);
  };

  const setVolume = (next: number) => {
    const normalized = clampVolume(next);
    if (volume === undefined) setInternalVolume(normalized);
    onVolumeChange?.(normalized);
  };

  return (
    <motion.section
      aria-labelledby={titleId}
      className="relative w-[clamp(17.5rem,88vw,23.75rem)] select-none"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.08), transparent 55%)" }}
      />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20">
              <Mic className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h2 id={titleId} className="text-[14px] font-bold tracking-tight cs-text">Voice &amp; Audio</h2>
              <p className="text-[10.5px] cs-muted">Local browser recording demo · audio controls</p>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-4 sm:space-y-7 sm:p-5">
          <HoldToTalkButton onRecordingComplete={onRecordingComplete} reduceMotion={reduceMotion} />
          <MuteToggleButton muted={effectiveMuted} onChange={setMuted} reduceMotion={reduceMotion} />
          <VolumeSliderButton volume={effectiveVolume} onChange={setVolume} reduceMotion={reduceMotion} />
        </div>

        <footer className="border-t cs-border px-4 py-2.5 text-center sm:px-5">
          <p className="text-[9.5px] cs-subtle">Microphone capture stays local to this card unless your completion callback handles it.</p>
        </footer>
      </div>
    </motion.section>
  );
}

interface HoldToTalkButtonProps {
  onRecordingComplete?: (blob: Blob, objectUrl: string) => void;
  reduceMotion: boolean;
}

function HoldToTalkButton({ onRecordingComplete, reduceMotion }: HoldToTalkButtonProps) {
  const [state, setState] = useState<RecordingState>("idle");
  const [message, setMessage] = useState("Hold to record with your microphone.");
  const stateRef = useRef<RecordingState>("idle");
  const mountedRef = useRef(true);
  const requestRef = useRef(0);
  const holdActiveRef = useRef(false);
  const activePointerRef = useRef<number | null>(null);
  const keyboardHeldRef = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const objectUrlRef = useRef<string | null>(null);
  const labelId = useId();
  const statusId = useId();

  const updateStatus = useCallback((nextState: RecordingState, nextMessage: string) => {
    stateRef.current = nextState;
    if (!mountedRef.current) return;
    setState(nextState);
    setMessage(nextMessage);
  }, []);

  const stopStream = useCallback((stream: MediaStream | null) => {
    stream?.getTracks().forEach((track) => track.stop());
    if (streamRef.current === stream) streamRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    holdActiveRef.current = false;

    if (stateRef.current === "requesting") {
      requestRef.current += 1;
      updateStatus("idle", "Recording canceled before microphone access completed.");
      return;
    }

    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") return;

    updateStatus("stopping", "Finishing local recording…");
    try {
      recorder.stop();
    } catch {
      recorder.ondataavailable = null;
      recorder.onerror = null;
      recorder.onstop = null;
      recorderRef.current = null;
      chunksRef.current = [];
      stopStream(streamRef.current);
      updateStatus("error", "The recorder could not stop safely. Please try again.");
    }
  }, [stopStream, updateStatus]);

  const startRecording = useCallback(async () => {
    if ((stateRef.current !== "idle" && stateRef.current !== "error") || recorderRef.current) return;

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      updateStatus("unavailable", "Audio recording is unavailable in this browser.");
      return;
    }

    const requestId = ++requestRef.current;
    updateStatus("requesting", "Waiting for microphone permission…");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      if (!mountedRef.current || requestRef.current !== requestId) return;
      const denied = error instanceof DOMException
        && (error.name === "NotAllowedError" || error.name === "SecurityError");
      updateStatus(
        "error",
        denied ? "Microphone permission was denied." : "The microphone could not be opened. Please try again.",
      );
      return;
    }

    if (!mountedRef.current || requestRef.current !== requestId || !holdActiveRef.current) {
      stopStream(stream);
      if (mountedRef.current && requestRef.current === requestId) {
        updateStatus("idle", "Recording canceled before microphone access completed.");
      }
      return;
    }

    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream);
    } catch {
      stopStream(stream);
      updateStatus("error", "This browser could not create an audio recorder.");
      return;
    }

    streamRef.current = stream;
    recorderRef.current = recorder;
    chunksRef.current = [];
    let recorderFailed = false;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };

    recorder.onerror = () => {
      recorderFailed = true;
      if (mountedRef.current) {
        updateStatus("error", "Recording failed. Please check the microphone and try again.");
      }
      if (recorder.state !== "inactive") {
        try {
          recorder.stop();
        } catch {
          recorder.onstop = null;
          recorderRef.current = null;
          chunksRef.current = [];
          stopStream(stream);
        }
      }
    };

    recorder.onstop = () => {
      const chunks = chunksRef.current;
      chunksRef.current = [];
      if (recorderRef.current === recorder) recorderRef.current = null;
      stopStream(stream);

      if (!mountedRef.current) return;
      if (recorderFailed) {
        updateStatus("error", "Recording failed. Please check the microphone and try again.");
        return;
      }

      const blob = new Blob(chunks, { type: recorder.mimeType || chunks[0]?.type || "audio/webm" });
      if (blob.size === 0) {
        updateStatus("idle", "No audio was captured. Hold to try again.");
        return;
      }

      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const objectUrl = URL.createObjectURL(blob);
      objectUrlRef.current = objectUrl;

      try {
        onRecordingComplete?.(blob, objectUrl);
        updateStatus("idle", "Local recording is ready. Hold to record again.");
      } catch {
        updateStatus("error", "The recording is ready locally, but its completion handler failed.");
      }
    };

    try {
      recorder.start();
      updateStatus("recording", "Recording locally… release, leave, or cancel to stop.");
    } catch {
      recorder.ondataavailable = null;
      recorder.onerror = null;
      recorder.onstop = null;
      recorderRef.current = null;
      chunksRef.current = [];
      stopStream(stream);
      updateStatus("error", "The audio recorder could not start. Please try again.");
    }
  }, [onRecordingComplete, stopStream, updateStatus]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      holdActiveRef.current = false;
      requestRef.current += 1;

      const recorder = recorderRef.current;
      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onerror = null;
        recorder.onstop = null;
        if (recorder.state !== "inactive") {
          try {
            recorder.stop();
          } catch {
            // Tracks are stopped below even if the recorder rejects stop().
          }
        }
      }
      recorderRef.current = null;
      chunksRef.current = [];
      stopStream(streamRef.current);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [stopStream, updateStatus]);

  const releasePointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    activePointerRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Capture may already have been released by the browser.
      }
    }
    stopRecording();
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || !event.isPrimary || activePointerRef.current !== null || keyboardHeldRef.current) return;
    event.preventDefault();
    activePointerRef.current = event.pointerId;
    holdActiveRef.current = true;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Recording still ends through pointer up, leave, cancel, or lost capture.
    }
    void startRecording();
  };

  const handleLostPointerCapture = (event: PointerEvent<HTMLButtonElement>) => {
    if (activePointerRef.current !== event.pointerId) return;
    activePointerRef.current = null;
    stopRecording();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (event.repeat || keyboardHeldRef.current || activePointerRef.current !== null) return;
    keyboardHeldRef.current = true;
    holdActiveRef.current = true;
    void startRecording();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key !== " " && event.key !== "Enter") || !keyboardHeldRef.current) return;
    event.preventDefault();
    keyboardHeldRef.current = false;
    stopRecording();
  };

  const handleBlur = () => {
    if (!keyboardHeldRef.current) return;
    keyboardHeldRef.current = false;
    stopRecording();
  };

  const isPressed = state === "requesting" || state === "recording";
  const isError = state === "error" || state === "unavailable";

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Hold to Talk</p>
      <div className="flex items-center justify-center py-2">
        <motion.button
          type="button"
          aria-label="Hold to record local microphone audio"
          aria-pressed={isPressed}
          aria-describedby={statusId}
          disabled={state === "unavailable" || state === "stopping"}
          onPointerDown={handlePointerDown}
          onPointerUp={releasePointer}
          onPointerLeave={releasePointer}
          onPointerCancel={releasePointer}
          onLostPointerCapture={handleLostPointerCapture}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          onContextMenu={(event) => { if (isPressed) event.preventDefault(); }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          className={`relative flex h-14 w-14 touch-none items-center justify-center rounded-full shadow-sm transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${state === "recording" ? "bg-violet-600 dark:bg-violet-500" : "bg-slate-900 dark:bg-slate-100"}`}
        >
          <AnimatePresence>
            {state === "recording" && !reduceMotion && [0, 1, 2].map((index) => (
              <motion.span
                key={index}
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-violet-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.3, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
          <Mic className={`relative z-10 h-5 w-5 ${state === "recording" ? "text-white" : "text-white dark:text-slate-900"}`} strokeWidth={2} />
        </motion.button>
      </div>
      <p
        id={statusId}
        className={`min-h-4 text-center text-[10px] ${isError ? "text-amber-700 dark:text-amber-300" : "cs-subtle"}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
    </div>
  );
}

function MuteToggleButton({
  muted,
  onChange,
  reduceMotion,
}: {
  muted: boolean;
  onChange: (muted: boolean) => void;
  reduceMotion: boolean;
}) {
  const labelId = useId();

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Mute Toggle</p>
      <div className="flex items-center justify-center py-1">
        <motion.button
          type="button"
          aria-label={muted ? "Unmute audio" : "Mute audio"}
          aria-pressed={muted}
          onClick={() => onChange(!muted)}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          className="flex items-center gap-2.5 rounded-xl border cs-border cs-surface px-5 py-2.5 text-[12.5px] font-semibold cs-text transition-colors motion-reduce:transition-none cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        >
          <AnimatePresence mode="wait" initial={false}>
            {muted ? (
              <motion.span key="muted" initial={reduceMotion ? false : { scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={reduceMotion ? undefined : { scale: 0, rotate: 90 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
                <VolumeX className="h-5 w-5 text-rose-500" strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span key="on" initial={reduceMotion ? false : { scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={reduceMotion ? undefined : { scale: 0, rotate: -90 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
                <Volume2 className="h-5 w-5 text-violet-600 dark:text-violet-400" strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
          {muted ? "Unmute" : "Mute"}
        </motion.button>
      </div>
    </div>
  );
}

function VolumeSliderButton({
  volume,
  onChange,
  reduceMotion,
}: {
  volume: number;
  onChange: (volume: number) => void;
  reduceMotion: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const labelId = useId();
  const panelId = useId();
  const rangeId = useId();
  const valueId = useId();

  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Volume Slider</p>
      <div className="flex items-center justify-center py-1">
        <motion.div layout={!reduceMotion} className="flex max-w-full items-center gap-1 overflow-hidden rounded-xl border cs-border cs-surface p-1">
          <motion.button
            type="button"
            aria-label={expanded ? "Hide volume control" : "Show volume control"}
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((value) => !value)}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-1"
          >
            {volume === 0
              ? <VolumeX className="h-4 w-4 cs-text" strokeWidth={2.2} />
              : <Volume2 className="h-4 w-4 cs-text" strokeWidth={2.2} />}
          </motion.button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={panelId}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="flex h-9 w-[clamp(6rem,32vw,7.5rem)] items-center"
              >
                <label htmlFor={rangeId} className="sr-only">Volume</label>
                <input
                  id={rangeId}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={volume}
                  onChange={(event) => onChange(Number(event.currentTarget.value))}
                  aria-describedby={valueId}
                  aria-valuetext={`${volume} percent`}
                  className="h-2 w-full cursor-pointer accent-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {expanded && (
            <output id={valueId} htmlFor={rangeId} className="w-9 shrink-0 text-center text-[11px] font-semibold cs-muted tabular-nums" aria-live="polite">
              {volume}%
            </output>
          )}
        </motion.div>
      </div>
    </div>
  );
}
