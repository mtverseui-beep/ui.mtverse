"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  AudioLines,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Download,
  Headphones,
  History,
  Menu,
  MessageSquare,
  Mic,
  MicOff,
  Moon,
  Pause,
  Phone,
  PhoneOff,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Send,
  Settings2,
  Sparkles,
  Sun,
  Trash2,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { AI_MODELS } from "./model-icons";
import {
  AI_FOCUS_RESET,
  ModernSelect,
  type ModernSelectOption,
  ProfileAvatar,
} from "./ai-ui";

const MODELS = [AI_MODELS[3], AI_MODELS[0], AI_MODELS[5]];
const EASE = [0.16, 1, 0.3, 1] as const;
let voiceId = 3000;

type VoiceState =
  | "idle"
  | "connecting"
  | "listening"
  | "paused"
  | "thinking"
  | "speaking"
  | "error";

type MessageRole = "user" | "assistant";

interface ToolRun {
  id: string;
  label: string;
  detail: string;
  state: "queued" | "running" | "complete";
}

interface VoiceMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  model?: string;
}

interface VoiceSession {
  id: string;
  title: string;
  createdAt: number;
  messages: VoiceMessage[];
}

interface RecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface RecognitionResultLike {
  readonly isFinal: boolean;
  readonly length: number;
  readonly [index: number]: RecognitionAlternativeLike;
}

interface RecognitionResultListLike {
  readonly length: number;
  readonly [index: number]: RecognitionResultLike;
}

interface RecognitionEventLike {
  readonly resultIndex: number;
  readonly results: RecognitionResultListLike;
}

interface RecognitionErrorLike {
  readonly error: string;
  readonly message?: string;
}

interface BrowserSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): BrowserSpeechRecognition;
}

const WELCOME_MESSAGE: VoiceMessage = {
  id: "voice-welcome",
  role: "assistant",
  content:
    "Voice workspace is ready. Start a live session or type below. I can transcribe speech, answer locally, read responses aloud, and export the full transcript.",
  timestamp: 1752700000000,
  model: "claude-3.5-sonnet",
};

const INITIAL_SESSIONS: VoiceSession[] = [
  {
    id: "voice-session-1",
    title: "Voice workspace",
    createdAt: 1752700000000,
    messages: [WELCOME_MESSAGE],
  },
  {
    id: "voice-session-2",
    title: "Product launch notes",
    createdAt: 1752613600000,
    messages: [
      {
        id: "voice-history-user-1",
        role: "user",
        content: "Summarize the priorities for a strong product launch.",
        timestamp: 1752613600000,
      },
      {
        id: "voice-history-ai-1",
        role: "assistant",
        content:
          "Focus on a clear target audience, one measurable activation event, a concise launch narrative, and a feedback loop that turns early-user behavior into the next release plan.",
        timestamp: 1752613660000,
        model: "claude-3.5-sonnet",
      },
    ],
  },
  {
    id: "voice-session-3",
    title: "Morning planning",
    createdAt: 1752527200000,
    messages: [
      {
        id: "voice-history-user-2",
        role: "user",
        content: "Help me structure a focused workday.",
        timestamp: 1752527200000,
      },
      {
        id: "voice-history-ai-2",
        role: "assistant",
        content:
          "Choose one high-impact outcome, protect a ninety-minute focus block for it, batch communication into two windows, and close the day with a ten-minute review.",
        timestamp: 1752527260000,
        model: "claude-3.5-sonnet",
      },
    ],
  },
];

const STATUS_META: Record<
  VoiceState,
  { label: string; detail: string; color: string }
> = {
  idle: { label: "Ready", detail: "Start when you are ready", color: "#71717a" },
  connecting: { label: "Connecting", detail: "Requesting microphone access", color: "#f59e0b" },
  listening: { label: "Listening", detail: "Speak naturally", color: "#10b981" },
  paused: { label: "Paused", detail: "Microphone capture is paused", color: "#f59e0b" },
  thinking: { label: "Thinking", detail: "Processing the transcript", color: "#8b5cf6" },
  speaking: { label: "Speaking", detail: "Assistant audio is playing", color: "#d97757" },
  error: { label: "Needs attention", detail: "Check the session message", color: "#ef4444" },
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(remainder).padStart(2, "0");
}

function formatMessageTime(timestamp: number) {
  return new Date(timestamp).toISOString().slice(11, 16);
}

function createToolRuns(prompt: string): ToolRun[] {
  const normalized = prompt.toLowerCase();
  const intent = normalized.includes("summary")
    ? "Conversation summarization"
    : normalized.includes("time") || normalized.includes("date")
      ? "Live date and time lookup"
      : normalized.includes("microphone") || normalized.includes("voice")
        ? "Voice capability lookup"
        : "Local intent routing";

  return [
    {
      id: "transcript",
      label: "Transcript cleanup",
      detail: "Normalize punctuation and remove speech fillers",
      state: "running",
    },
    {
      id: "intent",
      label: intent,
      detail: "Choose the safest local response path",
      state: "queued",
    },
    {
      id: "compose",
      label: "Response composer",
      detail: "Prepare a concise voice-friendly answer",
      state: "queued",
    },
  ];
}

function buildLocalResponse(
  prompt: string,
  messages: VoiceMessage[],
  modelName: string,
  deviceLabel: string,
) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("what time") || normalized.includes("current time")) {
    return (
      "The current local time is " +
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
      "."
    );
  }

  if (
    normalized.includes("today") ||
    normalized.includes("date") ||
    normalized.includes("what day")
  ) {
    return (
      "Today is " +
      new Date().toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      "."
    );
  }

  if (normalized.includes("summary") || normalized.includes("summarize")) {
    const userMessages = messages.filter((message) => message.role === "user");
    const recent = userMessages
      .slice(-3)
      .map((message) => message.content)
      .join("; ");
    return userMessages.length === 0
      ? "There are no earlier user messages to summarize yet."
      : "Here is the short session summary: " + recent + ".";
  }

  if (
    normalized.includes("microphone") ||
    normalized.includes("voice") ||
    normalized.includes("transcription")
  ) {
    return (
      "Your active input is " +
      deviceLabel +
      ". This demo uses the browser microphone, Web Audio for the waveform, browser speech recognition for live captions, and speech synthesis for playback."
    );
  }

  if (normalized.includes("help") || normalized.includes("can you do")) {
    return (
      "I can capture live speech, keep an editable transcript, answer typed or spoken prompts, replay responses, switch microphones and voices, and export the conversation. " +
      modelName +
      " is selected in the interface."
    );
  }

  if (normalized.includes("plan") || normalized.includes("priority")) {
    return "Start with one measurable outcome, break it into three concrete actions, protect a focused work block, and review progress before adding more scope.";
  }

  return (
    "I heard: “" +
    prompt +
    "” I processed that locally so the interaction works without an external AI key. Connect the provider adapter to replace this fallback with a live " +
    modelName +
    " response while keeping the same streaming and voice controls."
  );
}

export function AIVoiceAssistant() {
  const [isDark, setIsDark] = useState(false);
  const [sessions, setSessions] = useState<VoiceSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState(INITIAL_SESSIONS[0].id);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [draft, setDraft] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toolRuns, setToolRuns] = useState<ToolRun[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<(typeof MODELS)[number]>(
    MODELS[0],
  );
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [voiceRate, setVoiceRate] = useState(1);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [assistantMuted, setAssistantMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [hasActiveStream, setHasActiveStream] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const shouldListenRef = useRef(false);
  const voiceStateRef = useRef<VoiceState>("idle");
  const micMutedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const responseTimersRef = useRef<number[]>([]);

  const activeSession =
    sessions.find((session) => session.id === activeSessionId) ?? sessions[0];
  const messages = activeSession?.messages ?? [];

  const palette = {
    background: isDark ? "#09090b" : "#ffffff",
    panel: isDark ? "#0f0f13" : "#fafafa",
    surface: isDark ? "#15151b" : "#f4f4f5",
    elevated: isDark ? "#1b1b22" : "#ffffff",
    border: isDark ? "#27272f" : "#e4e4e7",
    text: isDark ? "#fafafa" : "#09090b",
    secondary: isDark ? "#a1a1aa" : "#52525b",
    muted: isDark ? "#71717a" : "#a1a1aa",
  };
  const accent = selectedModel.color;
  const statusMeta = STATUS_META[voiceState];

  const filteredSessions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return query
      ? sessions.filter((session) => session.title.toLowerCase().includes(query))
      : sessions;
  }, [searchQuery, sessions]);

  const setSessionState = useCallback((nextState: VoiceState) => {
    voiceStateRef.current = nextState;
    setVoiceState(nextState);
  }, []);

  const cancelResponseTimers = useCallback(() => {
    responseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    responseTimersRef.current = [];
  }, []);

  const stopMedia = useCallback(() => {
    shouldListenRef.current = false;
    try {
      recognitionRef.current?.abort();
    } catch {
      // Recognition may already be stopped.
    }
    recognitionRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setHasActiveStream(false);
    sourceNodeRef.current?.disconnect();
    sourceNodeRef.current = null;
    analyserRef.current?.disconnect();
    analyserRef.current = null;
    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const microphones = devices.filter((device) => device.kind === "audioinput");
      setAudioDevices(microphones);
      if (!selectedDeviceId && microphones[0]) {
        setSelectedDeviceId(microphones[0].deviceId);
      }
    } catch {
      // Device labels become available after permission is granted.
    }
  }, [selectedDeviceId]);

  const drawWaveform = useCallback(
    (analyser: AnalyserNode) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
      const values = new Uint8Array(analyser.fftSize);

      const draw = () => {
        const bounds = canvas.getBoundingClientRect();
        const density = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.floor(bounds.width * density));
        const height = Math.max(1, Math.floor(bounds.height * density));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        analyser.getByteTimeDomainData(values);
        context.clearRect(0, 0, width, height);
        context.lineWidth = 2 * density;
        context.strokeStyle = accent;
        context.beginPath();

        const slice = width / values.length;
        let x = 0;
        values.forEach((value, index) => {
          const y = (value / 255) * height;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
          x += slice;
        });
        context.stroke();
        animationFrameRef.current = requestAnimationFrame(draw);
      };

      draw();
    },
    [accent],
  );

  const startRecognition = useCallback(() => {
    const browserWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition =
      browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;

    if (!Recognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      recognitionRef.current?.abort();
    } catch {
      // Ignore stale recognition instances.
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) finalText += transcript + " ";
        else interimText += transcript;
      }
      if (finalText.trim()) {
        setDraft((current) => (current + " " + finalText).trim());
      }
      setInterimTranscript(interimText.trim());
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setErrorMessage(
          "Speech recognition permission was blocked. You can still type and use the microphone waveform.",
        );
        setSessionState("error");
        shouldListenRef.current = false;
        return;
      }
      setErrorMessage("Speech recognition stopped: " + event.error + ".");
    };

    recognition.onend = () => {
      setInterimTranscript("");
      if (
        shouldListenRef.current &&
        voiceStateRef.current === "listening" &&
        !micMutedRef.current
      ) {
        window.setTimeout(() => {
          try {
            recognition.start();
          } catch {
            // A restart can race with the browser's previous recognition session.
          }
        }, 160);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setSpeechSupported(true);
    } catch {
      // The recognition service may already be active.
    }
  }, [setSessionState]);

  const setupMedia = useCallback(
    async (deviceId?: string) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("This browser does not provide microphone capture.");
      }

      stopMedia();
      const audioConstraint: MediaTrackConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      };
      if (deviceId) audioConstraint.deviceId = { exact: deviceId };

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraint,
      });
      streamRef.current = stream;
      setHasActiveStream(true);

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      if (audioContext.state === "suspended") await audioContext.resume();

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(analyser);
      sourceNodeRef.current = source;
      analyserRef.current = analyser;
      drawWaveform(analyser);
      await refreshDevices();
    },
    [drawWaveform, refreshDevices, stopMedia],
  );

  const resumeListening = useCallback(() => {
    if (!streamRef.current) {
      setSessionState("idle");
      return;
    }
    if (micMutedRef.current) {
      setSessionState("paused");
      return;
    }
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
    shouldListenRef.current = true;
    setSessionState("listening");
    startRecognition();
  }, [setSessionState, startRecognition]);

  const speakText = useCallback(
    (text: string) => {
      if (
        !autoSpeak ||
        assistantMuted ||
        !("speechSynthesis" in window) ||
        !text.trim()
      ) {
        resumeListening();
        return;
      }

      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = voiceRate;
      utterance.pitch = 1;
      utterance.onstart = () => {
        shouldListenRef.current = false;
        setSessionState("speaking");
      };
      utterance.onend = resumeListening;
      utterance.onerror = resumeListening;
      window.speechSynthesis.speak(utterance);
    },
    [
      assistantMuted,
      autoSpeak,
      resumeListening,
      selectedVoiceName,
      setSessionState,
      voiceRate,
      voices,
    ],
  );

  const startSession = useCallback(async () => {
    if (voiceStateRef.current === "connecting") return;
    cancelResponseTimers();
    setErrorMessage("");
    setToolRuns([]);
    setMicMuted(false);
    micMutedRef.current = false;
    setSessionState("connecting");
    try {
      await setupMedia(selectedDeviceId || undefined);
      setElapsedSeconds(0);
      shouldListenRef.current = true;
      setSessionState("listening");
      startRecognition();
    } catch (error) {
      stopMedia();
      const message =
        error instanceof Error ? error.message : "Microphone access failed.";
      setErrorMessage(
        message +
          " Allow microphone permission, choose a valid input, or continue with typed messages.",
      );
      setSessionState("error");
    }
  }, [
    cancelResponseTimers,
    selectedDeviceId,
    setSessionState,
    setupMedia,
    startRecognition,
    stopMedia,
  ]);

  const endSession = useCallback(() => {
    cancelResponseTimers();
    stopMedia();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setToolRuns([]);
    setInterimTranscript("");
    setMicMuted(false);
    micMutedRef.current = false;
    setElapsedSeconds(0);
    setSessionState("idle");
  }, [cancelResponseTimers, setSessionState, stopMedia]);

  const togglePause = useCallback(() => {
    if (voiceStateRef.current === "paused") {
      resumeListening();
      return;
    }
    if (voiceStateRef.current !== "listening") return;
    shouldListenRef.current = false;
    recognitionRef.current?.stop();
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
    setSessionState("paused");
  }, [resumeListening, setSessionState]);

  const toggleMicrophone = useCallback(() => {
    if (!streamRef.current) return;
    const nextMuted = !micMutedRef.current;
    micMutedRef.current = nextMuted;
    setMicMuted(nextMuted);
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted && voiceStateRef.current !== "paused";
    });
    if (nextMuted) {
      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      setSessionState("paused");
    } else {
      resumeListening();
    }
  }, [resumeListening, setSessionState]);

  const toggleAssistantAudio = useCallback(() => {
    const nextMuted = !assistantMuted;
    setAssistantMuted(nextMuted);
    if (nextMuted && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      resumeListening();
    }
  }, [assistantMuted, resumeListening]);

  const updateActiveMessages = useCallback(
    (updater: (current: VoiceMessage[]) => VoiceMessage[]) => {
      setSessions((current) =>
        current.map((session) =>
          session.id === activeSessionId
            ? { ...session, messages: updater(session.messages) }
            : session,
        ),
      );
    },
    [activeSessionId],
  );

  const sendPrompt = useCallback(
    (value?: string) => {
      const prompt = (value ?? draft).trim();
      if (
        !prompt ||
        voiceStateRef.current === "connecting" ||
        voiceStateRef.current === "thinking"
      ) {
        return;
      }

      cancelResponseTimers();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      shouldListenRef.current = false;
      recognitionRef.current?.stop();
      setInterimTranscript("");
      setDraft("");
      setErrorMessage("");

      const userMessage: VoiceMessage = {
        id: "voice-message-" + ++voiceId,
        role: "user",
        content: prompt,
        timestamp: Date.now(),
      };
      updateActiveMessages((current) => [...current, userMessage]);
      setSessions((current) =>
        current.map((session) =>
          session.id === activeSessionId &&
          (session.title === "Voice workspace" || session.title === "New voice session")
            ? {
                ...session,
                title: prompt.slice(0, 34) + (prompt.length > 34 ? "…" : ""),
              }
            : session,
        ),
      );

      setToolRuns(createToolRuns(prompt));
      setSessionState("thinking");

      const intentTimer = window.setTimeout(() => {
        setToolRuns((current) =>
          current.map((tool, index) =>
            index === 0
              ? { ...tool, state: "complete" }
              : index === 1
                ? { ...tool, state: "running" }
                : tool,
          ),
        );
      }, 360);

      const composeTimer = window.setTimeout(() => {
        setToolRuns((current) =>
          current.map((tool, index) =>
            index < 2
              ? { ...tool, state: "complete" }
              : { ...tool, state: "running" },
          ),
        );
      }, 760);

      const answerTimer = window.setTimeout(() => {
        const activeDevice =
          audioDevices.find((device) => device.deviceId === selectedDeviceId)
            ?.label || "the default microphone";
        const answer = buildLocalResponse(
          prompt,
          messages,
          selectedModel.name,
          activeDevice,
        );
        const assistantMessage: VoiceMessage = {
          id: "voice-message-" + ++voiceId,
          role: "assistant",
          content: answer,
          timestamp: Date.now(),
          model: selectedModel.id,
        };
        setToolRuns((current) =>
          current.map((tool) => ({ ...tool, state: "complete" })),
        );
        updateActiveMessages((current) => [...current, assistantMessage]);
        speakText(answer);

        const clearTimer = window.setTimeout(() => setToolRuns([]), 2200);
        responseTimersRef.current.push(clearTimer);
      }, 1160);

      responseTimersRef.current = [intentTimer, composeTimer, answerTimer];
    },
    [
      activeSessionId,
      audioDevices,
      cancelResponseTimers,
      draft,
      messages,
      selectedDeviceId,
      selectedModel.id,
      selectedModel.name,
      setSessionState,
      speakText,
      updateActiveMessages,
    ],
  );

  const stopResponse = useCallback(() => {
    cancelResponseTimers();
    setToolRuns([]);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    resumeListening();
  }, [cancelResponseTimers, resumeListening]);

  const createNewSession = useCallback(() => {
    endSession();
    const session: VoiceSession = {
      id: "voice-session-" + ++voiceId,
      title: "New voice session",
      createdAt: Date.now(),
      messages: [{ ...WELCOME_MESSAGE, id: "voice-welcome-" + voiceId }],
    };
    setSessions((current) => [session, ...current]);
    setActiveSessionId(session.id);
    setDraft("");
    setSearchQuery("");
  }, [endSession]);

  const selectSession = useCallback(
    (sessionId: string) => {
      if (sessionId === activeSessionId) return;
      endSession();
      setActiveSessionId(sessionId);
      setDraft("");
      setToolRuns([]);
      setSidebarOpen(false);
    },
    [activeSessionId, endSession],
  );

  const deleteSession = useCallback(
    (sessionId: string) => {
      endSession();
      setSessions((current) => {
        const remaining = current.filter((session) => session.id !== sessionId);
        if (remaining.length > 0) {
          if (sessionId === activeSessionId) setActiveSessionId(remaining[0].id);
          return remaining;
        }
        const replacement: VoiceSession = {
          id: "voice-session-" + ++voiceId,
          title: "New voice session",
          createdAt: Date.now(),
          messages: [{ ...WELCOME_MESSAGE, id: "voice-welcome-" + voiceId }],
        };
        setActiveSessionId(replacement.id);
        return [replacement];
      });
    },
    [activeSessionId, endSession],
  );

  const clearTranscript = useCallback(() => {
    updateActiveMessages(() => [
      { ...WELCOME_MESSAGE, id: "voice-welcome-" + ++voiceId },
    ]);
    setDraft("");
    setToolRuns([]);
  }, [updateActiveMessages]);

  const copyMessage = useCallback(async (message: VoiceMessage) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setErrorMessage("Clipboard access is unavailable in this browser.");
    }
  }, []);

  const exportTranscript = useCallback(() => {
    const text = messages
      .map(
        (message) =>
          "[" +
          formatMessageTime(message.timestamp) +
          "] " +
          (message.role === "user" ? "You" : "Assistant") +
          ": " +
          message.content,
      )
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download =
      activeSession.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-transcript.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, [activeSession.title, messages]);

  const handleDeviceChange = useCallback(
    async (deviceId: string) => {
      setSelectedDeviceId(deviceId);
      if (!streamRef.current) return;
      setSessionState("connecting");
      setErrorMessage("");
      try {
        await setupMedia(deviceId);
        shouldListenRef.current = true;
        setSessionState("listening");
        startRecognition();
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to switch microphone.",
        );
        setSessionState("error");
      }
    },
    [setSessionState, setupMedia, startRecognition],
  );

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    micMutedRef.current = micMuted;
  }, [micMuted]);

  useEffect(() => {
    const browserWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    setSpeechSupported(
      Boolean(
        browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition,
      ),
    );
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (!selectedVoiceName && availableVoices[0]) {
        const preferred =
          availableVoices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
          availableVoices[0];
        setSelectedVoiceName(preferred.name);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [selectedVoiceName]);

  useEffect(() => {
    void refreshDevices();
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices?.addEventListener) return;
    const handleDeviceListChange = () => void refreshDevices();
    mediaDevices.addEventListener("devicechange", handleDeviceListChange);
    return () =>
      mediaDevices.removeEventListener("devicechange", handleDeviceListChange);
  }, [refreshDevices]);

  useEffect(() => {
    if (
      voiceState !== "listening" &&
      voiceState !== "paused" &&
      voiceState !== "thinking" &&
      voiceState !== "speaking"
    ) {
      return;
    }
    const timer = window.setInterval(
      () => setElapsedSeconds((current) => current + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [voiceState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, toolRuns, interimTranscript]);

  useEffect(() => {
    return () => {
      cancelResponseTimers();
      stopMedia();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [cancelResponseTimers, stopMedia]);

  const canPause = voiceState === "listening" || voiceState === "paused";
  const isSessionActive =
    voiceState !== "idle" && voiceState !== "error" && voiceState !== "connecting";

  return (
    <div
      className="relative flex h-full min-h-full w-full overflow-hidden font-sans"
      style={{ background: palette.background, color: palette.text }}
    >
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -252, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -252, opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="absolute inset-y-0 left-0 z-40 flex w-[252px] shrink-0 flex-col border-r shadow-2xl lg:relative lg:shadow-none"
            style={{ background: palette.panel, borderColor: palette.border }}
          >
            <div
              className="flex h-16 items-center gap-3 border-b px-4"
              style={{ borderColor: palette.border }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ background: accent }}
              >
                <AudioLines className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold">Voice AI</p>
                <p className="truncate text-[10px]" style={{ color: palette.muted }}>
                  Realtime workspace
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
                style={{ color: palette.muted }}
                aria-label="Close session sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3">
              <button
                onClick={createNewSession}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-white transition hover:brightness-95"
                style={{ background: accent }}
              >
                <Plus className="h-4 w-4" />
                New voice session
              </button>
            </div>

            <div className="px-3 pb-2">
              <label className="relative block">
                <History
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                  style={{ color: palette.muted }}
                />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search sessions"
                  className="w-full rounded-xl border bg-transparent py-2.5 pl-9 pr-3 text-[11px] outline-none"
                  style={{ borderColor: palette.border, color: palette.text }}
                />
              </label>
            </div>

            <div className="scrollbar-modern flex-1 overflow-y-auto px-2 pb-3">
              <p
                className="px-2 py-2 text-[9px] font-bold uppercase tracking-[0.16em]"
                style={{ color: palette.muted }}
              >
                Recent sessions
              </p>
              {filteredSessions.map((session) => {
                const isActive = session.id === activeSessionId;
                return (
                  <div key={session.id} className="group relative mb-1">
                    <button
                      onClick={() => selectSession(session.id)}
                      className="flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 pr-9 text-left transition"
                      style={{
                        background: isActive ? palette.surface : "transparent",
                        borderColor: isActive ? palette.border : "transparent",
                        color: isActive ? palette.text : palette.secondary,
                      }}
                    >
                      <MessageSquare
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: isActive ? accent : palette.muted }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[11.5px] font-medium">
                          {session.title}
                        </span>
                        <span
                          className="mt-0.5 block text-[9px]"
                          style={{ color: palette.muted }}
                        >
                          {session.messages.length} messages
                        </span>
                      </span>
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md opacity-70 transition sm:opacity-0 sm:group-hover:opacity-100"
                      style={{ color: palette.muted }}
                      aria-label={"Delete " + session.title}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
              {filteredSessions.length === 0 && (
                <p
                  className="px-4 py-8 text-center text-[11px]"
                  style={{ color: palette.muted }}
                >
                  No matching sessions
                </p>
              )}
            </div>

            <div className="border-t p-3" style={{ borderColor: palette.border }}>
              <div
                className="flex items-center gap-2 rounded-xl border p-2.5"
                style={{ borderColor: palette.border, background: palette.elevated }}
              >
                <ProfileAvatar />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold">Local workspace</p>
                  <p className="truncate text-[9px]" style={{ color: palette.muted }}>
                    Browser media enabled
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="relative z-30 flex h-16 shrink-0 items-center gap-2 border-b px-3 sm:gap-3 sm:px-5"
          style={{ background: palette.background, borderColor: palette.border }}
        >
          <button
            onClick={() => setSidebarOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{ borderColor: palette.border, color: palette.secondary }}
            aria-label="Toggle session sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setModelMenuOpen((current) => !current)}
              className="flex items-center gap-2 rounded-xl border px-2.5 py-2"
              style={{ borderColor: palette.border, background: palette.elevated }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-lg"
                style={{ background: palette.surface, color: accent }}
              >
                <selectedModel.Icon className="h-4 w-4" />
              </span>
              <span className="hidden text-[11.5px] font-semibold sm:block">
                {selectedModel.name}
              </span>
              <ChevronDown className="h-3.5 w-3.5" style={{ color: palette.muted }} />
            </button>

            <AnimatePresence>
              {modelMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border p-2 shadow-2xl"
                  style={{ background: palette.elevated, borderColor: palette.border }}
                >
                  <p className="px-2 pb-2 pt-1 text-[10px] font-bold">
                    Voice response model
                  </p>
                  {MODELS.map((model) => {
                    const ModelIcon = model.Icon;
                    const active = model.id === selectedModel.id;
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setModelMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left"
                        style={{
                          background: active ? palette.surface : "transparent",
                          borderColor: active ? palette.border : "transparent",
                        }}
                      >
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{ background: palette.surface, color: model.color }}
                        >
                          <ModelIcon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11.5px] font-semibold">
                            {model.name}
                          </span>
                          <span className="text-[9px]" style={{ color: palette.muted }}>
                            {model.vendor} · {model.context} context
                          </span>
                        </span>
                        {active && (
                          <Check className="h-4 w-4" style={{ color: model.color }} />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="hidden items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] sm:flex"
            style={{ borderColor: palette.border, color: statusMeta.color }}
          >
            <motion.span
              animate={
                voiceState === "listening" || voiceState === "thinking"
                  ? { opacity: [0.4, 1, 0.4] }
                  : { opacity: 1 }
              }
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: statusMeta.color }}
            />
            {statusMeta.label}
          </div>

          <div className="flex-1" />

          <span
            className="hidden items-center gap-1.5 text-[10px] md:flex"
            style={{ color: palette.muted }}
          >
            <Clock3 className="h-3.5 w-3.5" />
            {formatDuration(elapsedSeconds)}
          </span>
          <button
            onClick={exportTranscript}
            className="hidden h-9 w-9 items-center justify-center rounded-xl border sm:flex"
            style={{ borderColor: palette.border, color: palette.secondary }}
            aria-label="Export transcript"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setSettingsOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border xl:hidden"
            style={{ borderColor: palette.border, color: palette.secondary }}
            aria-label="Open voice settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsDark((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border"
            style={{ borderColor: palette.border, color: palette.secondary }}
            aria-label={isDark ? "Use light preview" : "Use dark preview"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <ProfileAvatar />
        </header>

        <div className="scrollbar-modern min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6">
            <section
              className="mb-6 overflow-hidden rounded-3xl border"
              style={{ background: palette.panel, borderColor: palette.border }}
            >
              <div className="flex flex-col gap-5 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: palette.surface, color: statusMeta.color }}
                  >
                    {voiceState === "speaking" ? (
                      <Volume2 className="h-5 w-5" />
                    ) : voiceState === "error" ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[14px] font-bold">{statusMeta.label}</h2>
                      {isSessionActive && (
                        <span
                          className="rounded-full border px-2 py-0.5 text-[9px] font-semibold"
                          style={{ borderColor: palette.border, color: palette.muted }}
                        >
                          LIVE · {formatDuration(elapsedSeconds)}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px]" style={{ color: palette.muted }}>
                      {statusMeta.detail}
                    </p>
                  </div>
                  {!speechSupported && (
                    <span
                      className="hidden rounded-lg border px-2 py-1 text-[9px] sm:block"
                      style={{ borderColor: palette.border, color: palette.muted }}
                    >
                      Typed transcript fallback
                    </span>
                  )}
                </div>

                <div
                  className="relative h-24 overflow-hidden rounded-2xl border"
                  style={{ background: palette.elevated, borderColor: palette.border }}
                >
                  <canvas
                    ref={canvasRef}
                    className="h-full w-full"
                    aria-label="Live microphone waveform"
                  />
                  {!hasActiveStream && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex w-[72%] items-center gap-1 opacity-50">
                        {Array.from({ length: 42 }).map((_, index) => (
                          <span
                            key={index}
                            className="flex-1 rounded-full"
                            style={{
                              height: 4 + ((index * 7) % 18),
                              background: index % 3 === 0 ? accent : palette.border,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div
                    className="absolute bottom-2 right-3 flex items-center gap-1 text-[9px]"
                    style={{ color: palette.muted }}
                  >
                    <Radio className="h-3 w-3" />
                    {hasActiveStream ? "Live input" : "No active input"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {voiceState === "idle" || voiceState === "error" ? (
                    <button
                      onClick={() => void startSession()}
                      className="flex h-11 items-center gap-2 rounded-xl px-5 text-[12px] font-semibold text-white"
                      style={{ background: accent }}
                    >
                      <Phone className="h-4 w-4" />
                      Start voice session
                    </button>
                  ) : voiceState === "connecting" ? (
                    <button
                      disabled
                      className="flex h-11 items-center gap-2 rounded-xl px-5 text-[12px] font-semibold text-white opacity-70"
                      style={{ background: accent }}
                    >
                      <Activity className="h-4 w-4 animate-pulse" />
                      Connecting…
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={toggleMicrophone}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border"
                        style={{
                          background: micMuted ? "#ef4444" : palette.elevated,
                          borderColor: micMuted ? "#ef4444" : palette.border,
                          color: micMuted ? "#ffffff" : palette.secondary,
                        }}
                        aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
                      >
                        {micMuted ? (
                          <MicOff className="h-4 w-4" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={togglePause}
                        disabled={!canPause}
                        className="flex h-11 items-center gap-2 rounded-xl border px-4 text-[11px] font-semibold disabled:opacity-35"
                        style={{
                          background: palette.elevated,
                          borderColor: palette.border,
                        }}
                      >
                        {voiceState === "paused" ? (
                          <Play className="h-4 w-4" />
                        ) : (
                          <Pause className="h-4 w-4" />
                        )}
                        {voiceState === "paused" ? "Resume" : "Pause"}
                      </button>
                      {(voiceState === "thinking" || voiceState === "speaking") && (
                        <button
                          onClick={stopResponse}
                          className="flex h-11 items-center gap-2 rounded-xl border px-4 text-[11px] font-semibold"
                          style={{ borderColor: palette.border, color: "#ef4444" }}
                        >
                          <X className="h-4 w-4" />
                          Stop response
                        </button>
                      )}
                      <button
                        onClick={endSession}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-white"
                        aria-label="End voice session"
                      >
                        <PhoneOff className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {(draft || interimTranscript) && (
                  <div
                    className="rounded-2xl border p-3"
                    style={{
                      borderColor: palette.border,
                      background: palette.elevated,
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span
                        className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: accent }}
                      >
                        <Zap className="h-3 w-3" />
                        Live transcript
                      </span>
                      <button
                        onClick={() => {
                          setDraft("");
                          setInterimTranscript("");
                        }}
                        className="text-[9px]"
                        style={{ color: palette.muted }}
                      >
                        Clear
                      </button>
                    </div>
                    <p className="text-[12px] leading-relaxed">
                      {draft}
                      {interimTranscript && (
                        <span style={{ color: palette.muted }}>
                          {draft ? " " : ""}
                          {interimTranscript}
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </section>

            <div className="space-y-5">
              {messages.map((message) => {
                const isUser = message.role === "user";
                const model = MODELS.find((item) => item.id === message.model);
                const MessageIcon = model?.Icon;
                return (
                  <motion.article
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={"flex gap-3 " + (isUser ? "flex-row-reverse" : "")}
                  >
                    {isUser ? (
                      <ProfileAvatar />
                    ) : (
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                        style={{ background: palette.surface, borderColor: palette.border, color: model?.color ?? accent }}
                      >
                        {MessageIcon ? <MessageIcon className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                      </div>
                    )}
                    <div
                      className={
                        "min-w-0 " + (isUser ? "max-w-[82%]" : "flex-1")
                      }
                    >
                      <div
                        className={
                          "mb-1 flex items-center gap-2 " +
                          (isUser ? "justify-end" : "")
                        }
                      >
                        <span className="text-[10.5px] font-semibold">
                          {isUser ? "You" : model?.name ?? "Voice Assistant"}
                        </span>
                        <span className="text-[9px]" style={{ color: palette.muted }}>
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                      <div
                        className="rounded-2xl border px-4 py-3 text-[12.5px] leading-relaxed"
                        style={{
                          background: isUser ? palette.surface : palette.elevated,
                          borderColor: palette.border,
                        }}
                      >
                        {message.content}
                      </div>
                      <div
                        className={
                          "mt-1 flex items-center gap-1 " +
                          (isUser ? "justify-end" : "")
                        }
                      >
                        <button
                          onClick={() => void copyMessage(message)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg"
                          style={{
                            color:
                              copiedId === message.id
                                ? "#10b981"
                                : palette.muted,
                          }}
                          aria-label="Copy message"
                        >
                          {copiedId === message.id ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                        {!isUser && (
                          <button
                            onClick={() => speakText(message.content)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg"
                            style={{ color: palette.muted }}
                            aria-label="Replay assistant message"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              <AnimatePresence>
                {toolRuns.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="ml-12 rounded-2xl border p-3"
                    style={{
                      background: palette.panel,
                      borderColor: palette.border,
                    }}
                  >
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold">
                      <Activity className="h-3.5 w-3.5" style={{ color: accent }} />
                      Local processing
                    </div>
                    <div className="space-y-2">
                      {toolRuns.map((tool) => (
                        <div key={tool.id} className="flex items-center gap-2.5">
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-full"
                            style={{
                              background: palette.surface,
                              color:
                                tool.state === "complete" ? "#10b981" : accent,
                            }}
                          >
                            {tool.state === "complete" ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <motion.span
                                animate={
                                  tool.state === "running"
                                    ? { opacity: [0.35, 1, 0.35] }
                                    : { opacity: 0.35 }
                                }
                                transition={{ duration: 1, repeat: Infinity }}
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: "currentColor" }}
                              />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[10px] font-medium">
                              {tool.label}
                            </span>
                            <span
                              className="block truncate text-[9px]"
                              style={{ color: palette.muted }}
                            >
                              {tool.detail}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="shrink-0 px-4 pb-2">
            <div
              className="mx-auto flex max-w-4xl items-start gap-2 rounded-xl border px-3 py-2.5 text-[10px]"
              style={{
                borderColor: "#ef444455",
                background: isDark ? "#2a1317" : "#fff1f2",
                color: isDark ? "#fda4af" : "#be123c",
              }}
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="flex-1">{errorMessage}</span>
              <button onClick={() => setErrorMessage("")} aria-label="Dismiss error">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <div
          className="shrink-0 border-t px-4 pb-3 pt-3"
          style={{
            background: palette.background,
            borderColor: palette.border,
          }}
        >
          <div className="mx-auto max-w-4xl">
            <div
              className="flex items-end gap-2 rounded-2xl border p-2"
              style={{
                background: palette.elevated,
                borderColor: palette.border,
              }}
            >
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendPrompt();
                  }
                }}
                placeholder={
                  speechSupported
                    ? "Speak or type a message…"
                    : "Live captions unavailable — type a message…"
                }
                rows={1}
                className={AI_FOCUS_RESET + " max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2.5 text-[12px]"}
                style={{ color: palette.text, outline: "none", boxShadow: "none" }}
              />
              {voiceState === "thinking" || voiceState === "speaking" ? (
                <button
                  onClick={stopResponse}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                  style={{ borderColor: palette.border, color: "#ef4444" }}
                  aria-label="Stop response"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => sendPrompt()}
                  disabled={!draft.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-30"
                  style={{ background: accent }}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>
            <p
              className="mt-1.5 text-center text-[9px]"
              style={{ color: palette.muted }}
            >
              Browser speech features vary by platform. Enter sends · Shift+Enter adds a line.
            </p>
          </div>
        </div>
      </div>

      <aside
        className="hidden w-[260px] shrink-0 flex-col border-l xl:flex"
        style={{ background: palette.panel, borderColor: palette.border }}
      >
        <VoiceSettings
          palette={palette}
          accent={accent}
          audioDevices={audioDevices}
          selectedDeviceId={selectedDeviceId}
          onDeviceChange={(deviceId) => void handleDeviceChange(deviceId)}
          voices={voices}
          selectedVoiceName={selectedVoiceName}
          onVoiceChange={setSelectedVoiceName}
          voiceRate={voiceRate}
          onVoiceRateChange={setVoiceRate}
          autoSpeak={autoSpeak}
          onAutoSpeakChange={setAutoSpeak}
          assistantMuted={assistantMuted}
          onToggleAssistantAudio={toggleAssistantAudio}
          onReplay={() =>
            speakText(
              "Voice playback is working. You can change the voice and speaking rate in this panel.",
            )
          }
          onClear={clearTranscript}
          onExport={exportTranscript}
        />
      </aside>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            className="absolute bottom-3 right-3 top-[68px] z-50 flex w-[min(300px,calc(100%-1.5rem))] overflow-hidden rounded-2xl border shadow-2xl xl:hidden"
            style={{
              background: palette.panel,
              borderColor: palette.border,
            }}
          >
            <div className="absolute right-2 top-2">
              <button
                onClick={() => setSettingsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ color: palette.muted }}
                aria-label="Close voice settings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <VoiceSettings
              palette={palette}
              accent={accent}
              audioDevices={audioDevices}
              selectedDeviceId={selectedDeviceId}
              onDeviceChange={(deviceId) => void handleDeviceChange(deviceId)}
              voices={voices}
              selectedVoiceName={selectedVoiceName}
              onVoiceChange={setSelectedVoiceName}
              voiceRate={voiceRate}
              onVoiceRateChange={setVoiceRate}
              autoSpeak={autoSpeak}
              onAutoSpeakChange={setAutoSpeak}
              assistantMuted={assistantMuted}
              onToggleAssistantAudio={toggleAssistantAudio}
              onReplay={() =>
                speakText(
                  "Voice playback is working. You can change the voice and speaking rate in this panel.",
                )
              }
              onClear={clearTranscript}
              onExport={exportTranscript}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface VoiceSettingsProps {
  palette: {
    background: string;
    panel: string;
    surface: string;
    elevated: string;
    border: string;
    text: string;
    secondary: string;
    muted: string;
  };
  accent: string;
  audioDevices: MediaDeviceInfo[];
  selectedDeviceId: string;
  onDeviceChange: (deviceId: string) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoiceName: string;
  onVoiceChange: (voiceName: string) => void;
  voiceRate: number;
  onVoiceRateChange: (rate: number) => void;
  autoSpeak: boolean;
  onAutoSpeakChange: (enabled: boolean) => void;
  assistantMuted: boolean;
  onToggleAssistantAudio: () => void;
  onReplay: () => void;
  onClear: () => void;
  onExport: () => void;
}

function VoiceSettings({
  palette,
  accent,
  audioDevices,
  selectedDeviceId,
  onDeviceChange,
  voices,
  selectedVoiceName,
  onVoiceChange,
  voiceRate,
  onVoiceRateChange,
  autoSpeak,
  onAutoSpeakChange,
  assistantMuted,
  onToggleAssistantAudio,
  onReplay,
  onClear,
  onExport,
}: VoiceSettingsProps) {
  const deviceOptions: ModernSelectOption[] = audioDevices.length
    ? audioDevices.map((device, index) => ({
        value: device.deviceId,
        label: device.label || "Microphone " + (index + 1),
        meta: "Browser audio input",
        Icon: Mic,
      }))
    : [{ value: "", label: "Default microphone", meta: "Browser audio input", Icon: Mic }];
  const voiceOptions: ModernSelectOption[] = voices.length
    ? voices.map((voice) => ({
        value: voice.name,
        label: voice.name,
        meta: voice.lang + " · system voice",
        Icon: Headphones,
      }))
    : [{ value: "", label: "System default", meta: "Browser speech voice", Icon: Headphones }];

  return (
    <div className="scrollbar-modern flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
      <div className="mb-5 flex items-center gap-2">
        <Settings2 className="h-4 w-4" style={{ color: accent }} />
        <div>
          <p className="text-[12px] font-bold">Voice settings</p>
          <p className="text-[9px]" style={{ color: palette.muted }}>
            Live browser controls
          </p>
        </div>
      </div>

      <label className="mb-4 block">
        <span
          className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em]"
          style={{ color: palette.muted }}
        >
          <Mic className="h-3 w-3" />
          Microphone
        </span>
        <ModernSelect
          value={selectedDeviceId}
          options={deviceOptions}
          onChange={onDeviceChange}
          palette={palette}
          accent={accent}
        />
      </label>

      <label className="mb-4 block">
        <span
          className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em]"
          style={{ color: palette.muted }}
        >
          <Headphones className="h-3 w-3" />
          Assistant voice
        </span>
        <ModernSelect
          value={selectedVoiceName}
          options={voiceOptions}
          onChange={onVoiceChange}
          palette={palette}
          accent={accent}
        />
      </label>

      <label className="mb-4 block">
        <span
          className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em]"
          style={{ color: palette.muted }}
        >
          <span>Speaking rate</span>
          <span style={{ color: palette.secondary }}>{voiceRate.toFixed(1)}×</span>
        </span>
        <input
          type="range"
          min="0.7"
          max="1.4"
          step="0.1"
          value={voiceRate}
          onChange={(event) => onVoiceRateChange(Number(event.target.value))}
          className="w-full accent-current"
          style={{ color: accent }}
        />
      </label>

      <div className="space-y-2">
        <button
          onClick={() => onAutoSpeakChange(!autoSpeak)}
          className="flex w-full items-center gap-3 rounded-xl border p-3 text-left"
          style={{ background: palette.elevated, borderColor: palette.border }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: palette.surface, color: accent }}
          >
            <Volume2 className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10.5px] font-semibold">
              Auto-play replies
            </span>
            <span className="block text-[9px]" style={{ color: palette.muted }}>
              Read new answers aloud
            </span>
          </span>
          <span
            className="relative h-5 w-9 rounded-full transition"
            style={{ background: autoSpeak ? accent : palette.border }}
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition"
              style={{ left: autoSpeak ? 18 : 2 }}
            />
          </span>
        </button>

        <button
          onClick={onToggleAssistantAudio}
          className="flex w-full items-center gap-3 rounded-xl border p-3 text-left"
          style={{ background: palette.elevated, borderColor: palette.border }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: palette.surface,
              color: assistantMuted ? "#ef4444" : palette.secondary,
            }}
          >
            {assistantMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10.5px] font-semibold">
              {assistantMuted ? "Assistant muted" : "Assistant audio"}
            </span>
            <span className="block text-[9px]" style={{ color: palette.muted }}>
              {assistantMuted ? "Tap to restore playback" : "Tap to mute playback"}
            </span>
          </span>
        </button>

        <button
          onClick={onReplay}
          className="flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[10px] font-semibold"
          style={{ borderColor: palette.border, color: palette.secondary }}
        >
          <Play className="h-3.5 w-3.5" />
          Test selected voice
        </button>
      </div>

      <div className="my-5 h-px" style={{ background: palette.border }} />

      <div className="space-y-2">
        <button
          onClick={onExport}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[10px]"
          style={{ color: palette.secondary }}
        >
          <Download className="h-3.5 w-3.5" />
          Export transcript
        </button>
        <button
          onClick={onClear}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[10px]"
          style={{ color: "#ef4444" }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset current transcript
        </button>
      </div>

      <div className="mt-auto pt-5">
        <div
          className="rounded-xl border p-3"
          style={{ borderColor: palette.border, background: palette.elevated }}
        >
          <div className="flex items-center gap-2 text-[9.5px] font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            Privacy status
          </div>
          <p
            className="mt-1 text-[8.5px] leading-relaxed"
            style={{ color: palette.muted }}
          >
            Audio stays in the browser. Only finalized transcript text is passed
            to the response adapter.
          </p>
        </div>
      </div>
    </div>
  );
}
