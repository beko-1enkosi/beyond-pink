import { Pause, Play, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useBriVoice } from "./use-bri-voice";

export function VoiceResponse({ id, text, voice }: {
  id: string; text: string; voice: ReturnType<typeof useBriVoice>;
}) {
  const active = voice.playback?.id === id;
  const paused = voice.playback?.state === "paused";
  const label = active ? paused ? "Resume reading" : "Pause reading" : "Read Bri response aloud";
  return (
    <div className="mt-1 flex min-h-7 items-center gap-1 text-muted-foreground">
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-foreground"
        aria-label={label} title={voice.synthesisSupported ? label : "Read aloud unavailable in this browser"}
        onClick={() => active ? voice.togglePause() : voice.readAloud(id, text)}>
        {active ? paused ? <Play className="!h-3.5 !w-3.5" /> : <Pause className="!h-3.5 !w-3.5" /> : <Volume2 className="!h-3.5 !w-3.5" />}
      </Button>
      {active && <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"
        aria-label="Stop reading" title="Stop reading" onClick={voice.stopPlayback}>
        <Square className="!h-3.5 !w-3.5" />
      </Button>}
      {active && <span role="status" className="text-[11px]">{paused ? "Paused" : "Reading aloud"}</span>}
    </div>
  );
}