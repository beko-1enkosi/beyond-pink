import { useCallback, useEffect, useRef, useState } from "react";

interface RecognitionResult { isFinal: boolean; [index: number]: { transcript: string } }
interface RecognitionEvent { results: ArrayLike<RecognitionResult> }
export interface NativeRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type VoiceWindow = Window & {
  SpeechRecognition?: new () => NativeRecognition;
  webkitSpeechRecognition?: new () => NativeRecognition;
};

export function speechText(text: string) {
  return text.replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[*_`#>~]/g, "")
    .replace(/\p{Extended_Pictographic}|\uFE0F/gu, "")
    .replace(/\s+/g, " ").trim();
}

export function useBriVoice(open: boolean, onDraft: (text: string) => void) {
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState("");
  const [playback, setPlayback] = useState<{ id: string; state: "playing" | "paused" } | null>(null);
  const recognition = useRef<NativeRecognition | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const updateDraft = useRef(onDraft);
  useEffect(() => { updateDraft.current = onDraft; }, [onDraft]);
  useEffect(() => {
    const browser = window as VoiceWindow;
    setRecognitionSupported(Boolean(browser.SpeechRecognition ?? browser.webkitSpeechRecognition));
    setSynthesisSupported(Boolean(window.speechSynthesis && window.SpeechSynthesisUtterance));
  }, []);

  const abortListening = useCallback(() => {
    const current = recognition.current;
    recognition.current = null;
    if (current) {
      current.onstart = current.onresult = current.onerror = current.onend = null;
      current.abort();
    }
    setListening(false);
  }, []);
  const stopPlayback = useCallback(() => {
    const current = utterance.current;
    utterance.current = null;
    if (current) {
      current.onend = current.onerror = null;
      window.speechSynthesis?.cancel();
    }
    setPlayback(null);
  }, []);
  useEffect(() => {
    if (!open) {
      abortListening();
      stopPlayback();
      setVoiceNotice("");
    }
    return () => { abortListening(); stopPlayback(); };
  }, [open, abortListening, stopPlayback]);

  const startListening = (draft: string) => {
    const browser = window as VoiceWindow;
    const Constructor = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Constructor) {
      setVoiceNotice("Voice input isn’t available in this browser. You can type your question instead.");
      return;
    }
    if (recognition.current) return;
    stopPlayback();
    const current = new Constructor();
    recognition.current = current;
    current.lang = "en-ZA";
    current.interimResults = true;
    current.continuous = true;
    setListening(true);
    setVoiceNotice("Listening in English… Tap the microphone to stop, then review your question before sending.");
    current.onstart = () => setListening(true);
    current.onresult = (event) => {
      if (recognition.current !== current) return;
      const spoken = Array.from(event.results, (result) => result[0]?.transcript ?? "").join(" ").trim();
      updateDraft.current(`${draft.trim()}${draft.trim() && spoken ? " " : ""}${spoken}`.slice(0, 1000));
    };
    let failed = false;
    current.onerror = ({ error }) => {
      failed = true;
      setListening(false);
      setVoiceNotice(error === "not-allowed" || error === "service-not-allowed"
        ? "Microphone access wasn’t allowed. You can allow it in your browser settings, or type your question."
        : error === "no-speech"
          ? "No speech was detected. Try again or type your question."
          : error === "audio-capture"
            ? "No microphone is available. You can type your question instead."
            : "Voice input couldn’t connect. Please try again or type your question.");
      recognition.current = null;
      current.onresult = current.onstart = current.onend = current.onerror = null;
      current.abort();
    };
    current.onend = () => {
      if (recognition.current !== current) return;
      recognition.current = null;
      setListening(false);
      if (!failed) setVoiceNotice("Voice input stopped. Review or edit your question, then press Send.");
    };
    try { current.start(); }
    catch { abortListening(); setVoiceNotice("Voice input couldn’t start. Please try again or type your question."); }
  };
  const stopListening = () => {
    try { recognition.current?.stop(); }
    catch { abortListening(); }
    setListening(false);
    setVoiceNotice("Voice input stopped. Review or edit your question, then press Send.");
  };
  const readAloud = (id: string, text: string) => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setVoiceNotice("Read aloud isn’t available in this browser. Bri’s responses are still available as text.");
      return;
    }
    abortListening();
    stopPlayback();
    const spoken = speechText(text);
    if (!spoken) return;
    const current = new window.SpeechSynthesisUtterance(spoken);
    current.lang = "en-ZA";
    const voices = window.speechSynthesis.getVoices();
    const english = voices.find((voice) => /^en[-_]ZA$/i.test(voice.lang))
      ?? voices.find((voice) => /^en\b/i.test(voice.lang) && voice.localService)
      ?? voices.find((voice) => /^en\b/i.test(voice.lang));
    if (english) { current.voice = english; current.lang = english.lang; }
    current.rate = 0.95;
    utterance.current = current;
    current.onend = () => {
      if (utterance.current === current) { utterance.current = null; setPlayback(null); }
    };
    current.onerror = () => {
      if (utterance.current !== current) return;
      utterance.current = null;
      setPlayback(null);
      setVoiceNotice("Read aloud couldn’t play. Please try again; you can still read Bri’s response.");
    };
    setVoiceNotice("");
    setPlayback({ id, state: "playing" });
    try {
      // Cancellation may leave the browser's global speech queue paused.
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.speak(current);
    }
    catch { stopPlayback(); setVoiceNotice("Read aloud couldn’t start. Bri’s response is still available as text."); }
  };
  const togglePause = () => {
    if (!playback) return;
    if (playback.state === "playing") window.speechSynthesis.pause();
    else window.speechSynthesis.resume();
    setPlayback({ id: playback.id, state: playback.state === "playing" ? "paused" : "playing" });
  };
  return { recognitionSupported, synthesisSupported, listening, voiceNotice, playback,
    startListening, stopListening, abortListening, readAloud, togglePause, stopPlayback };
}