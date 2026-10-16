import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { speechText, useBriVoice, type NativeRecognition } from "./use-bri-voice";

let instance: NativeRecognition;
class Recognition implements NativeRecognition {
  lang = ""; interimResults = false; continuous = false;
  onstart: NativeRecognition["onstart"] = null;
  onresult: NativeRecognition["onresult"] = null;
  onerror: NativeRecognition["onerror"] = null;
  onend: NativeRecognition["onend"] = null;
  start = vi.fn(); stop = vi.fn(); abort = vi.fn();
  constructor() { instance = this; }
}
class Utterance {
  lang = ""; rate = 1; voice = null; onend = null; onerror = null;
  constructor(public text: string) {}
}
const synthesis = { speak: vi.fn(), cancel: vi.fn(), pause: vi.fn(), resume: vi.fn(), getVoices: () => [] };
beforeEach(() => {
  vi.stubGlobal("SpeechRecognition", Recognition);
  vi.stubGlobal("SpeechSynthesisUtterance", Utterance);
  vi.stubGlobal("speechSynthesis", synthesis);
  vi.clearAllMocks();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("Bri optional voice rules", () => {
  it("never starts recording or reading without a visitor action", () => {
    const { result } = renderHook(() => useBriVoice(true, vi.fn()));
    expect(result.current.listening).toBe(false);
    expect(synthesis.speak).not.toHaveBeenCalled();
  });
  it("recognises English into an editable draft without sending it", () => {
    const draft = vi.fn();
    const { result } = renderHook(() => useBriVoice(true, draft));
    act(() => result.current.startListening("Hello"));
    expect(instance.lang).toBe("en-ZA");
    act(() => instance.onresult?.({ results: [{ isFinal: false, 0: { transcript: "what is Brea" } }] }));
    expect(draft).toHaveBeenLastCalledWith("Hello what is Brea");
    act(() => result.current.stopListening());
    expect(instance.stop).toHaveBeenCalledOnce();
  });
  it("replaces interim recognition instead of duplicating it", () => {
    const draft = vi.fn();
    const { result } = renderHook(() => useBriVoice(true, draft));
    act(() => result.current.startListening(""));
    act(() => instance.onresult?.({ results: [{ isFinal: false, 0: { transcript: "What is" } }] }));
    act(() => instance.onresult?.({ results: [{ isFinal: true, 0: { transcript: "What is BeyondPink?" } }] }));
    expect(draft).toHaveBeenLastCalledWith("What is BeyondPink?");
  });
  it("releases the microphone after a permission denial", () => {
    const { result } = renderHook(() => useBriVoice(true, vi.fn()));
    act(() => result.current.startListening(""));
    act(() => instance.onerror?.({ error: "not-allowed" }));
    expect(result.current.listening).toBe(false);
    expect(instance.abort).toHaveBeenCalledOnce();
  });
  it("does not exceed the existing 1000 character draft limit", () => {
    const draft = vi.fn();
    const { result } = renderHook(() => useBriVoice(true, draft));
    act(() => result.current.startListening(""));
    act(() => instance.onresult?.({ results: [{ isFinal: true, 0: { transcript: "a".repeat(1200) } }] }));
    expect(draft.mock.lastCall?.[0].length).toBe(1000);
  });
  it("uses English synthesis even when the website is isiZulu", () => {
    document.documentElement.lang = "zu";
    const { result } = renderHook(() => useBriVoice(true, vi.fn()));
    act(() => result.current.readAloud("one", "Hello 💚"));
    const spoken = synthesis.speak.mock.lastCall?.[0];
    expect(spoken.lang).toBe("en-ZA");
    expect(spoken.text).toBe("Hello");
    document.documentElement.lang = "en";
  });
  it("supports pause, resume and stop", () => {
    const { result } = renderHook(() => useBriVoice(true, vi.fn()));
    act(() => result.current.readAloud("one", "Hello"));
    act(() => result.current.togglePause());
    expect(synthesis.pause).toHaveBeenCalledOnce();
    expect(result.current.playback?.state).toBe("paused");
    act(() => result.current.togglePause());
    expect(synthesis.resume).toHaveBeenCalledOnce();
    act(() => result.current.stopPlayback());
    expect(synthesis.cancel).toHaveBeenCalledOnce();
    expect(result.current.playback).toBeNull();
  });
  it("cancels previous speech when a different response is selected", () => {
    const { result } = renderHook(() => useBriVoice(true, vi.fn()));
    act(() => result.current.readAloud("one", "First"));
    act(() => result.current.readAloud("two", "Second"));
    expect(synthesis.cancel).toHaveBeenCalledOnce();
    expect(result.current.playback?.id).toBe("two");
  });
  it("stops microphone and playback on chat close", () => {
    const { result, rerender } = renderHook(({ open }) => useBriVoice(open, vi.fn()), { initialProps: { open: true } });
    act(() => result.current.startListening(""));
    rerender({ open: false });
    expect(instance.abort).toHaveBeenCalledOnce();
    rerender({ open: true });
    act(() => result.current.readAloud("one", "Hello"));
    rerender({ open: false });
    expect(synthesis.cancel).toHaveBeenCalledOnce();
    expect(result.current.playback).toBeNull();
  });
  it("supports typing and reading text when native voice APIs are absent", () => {
    vi.stubGlobal("SpeechRecognition", undefined);
    vi.stubGlobal("webkitSpeechRecognition", undefined);
    vi.stubGlobal("speechSynthesis", undefined);
    const draft = vi.fn();
    const { result } = renderHook(() => useBriVoice(true, draft));
    act(() => result.current.startListening(""));
    act(() => result.current.readAloud("one", "Hello"));
    expect(result.current.recognitionSupported).toBe(false);
    expect(result.current.synthesisSupported).toBe(false);
    expect(draft).not.toHaveBeenCalled();
    expect(result.current.playback).toBeNull();
  });
  it("reads link labels rather than Markdown or raw URLs", () => {
    expect(speechText("Visit **[CANSA](https://cansa.org.za)** 💚")).toBe("Visit CANSA");
  });
});