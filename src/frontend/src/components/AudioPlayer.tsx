import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { cn } from "@/lib/utils";
import {
  Download,
  Pause,
  Play,
  SkipBack,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect } from "react";

interface AudioPlayerProps {
  src: string | null;
  filename?: string;
  className?: string;
  compact?: boolean;
}

function formatTime(seconds: number): string {
  if (Number.isNaN(seconds) || !Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Static waveform bars for visual decoration
function WaveformViz({ isPlaying }: { isPlaying: boolean }) {
  const heights = [
    30, 60, 45, 80, 55, 90, 40, 70, 35, 85, 50, 75, 65, 95, 45, 60, 80, 35, 70,
    55, 90, 40, 65, 80, 50, 75, 35, 90, 60, 45, 85, 70, 55, 40, 80, 65, 30, 75,
    50, 60,
  ];
  const bars = heights.map((h, i) => ({ h, key: `bar-${i}` }));

  return (
    <div className="flex items-center gap-0.5 h-8 flex-1">
      {bars.map(({ h, key }, i) => (
        <div
          key={key}
          className={cn(
            "w-1 rounded-sm bg-accent/60 transition-all duration-150",
            isPlaying && "waveform-pulse",
          )}
          style={{
            height: `${h}%`,
            animationDelay: `${(i * 0.025) % 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AudioPlayer({
  src,
  filename,
  className,
  compact = false,
}: AudioPlayerProps) {
  const player = useAudioPlayer();

  const loadFn = player.load;
  useEffect(() => {
    if (src) {
      loadFn(src);
    }
  }, [src, loadFn]);

  const progressPercent =
    player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0;

  const handleDownload = () => {
    if (!src) return;
    const a = document.createElement("a");
    a.href = src;
    a.download = filename ?? "audio.webm";
    a.click();
  };

  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-16 bg-secondary border border-border rounded-md",
          className,
        )}
        data-ocid="audio-player-empty"
      >
        <span className="text-xs text-muted-foreground font-display uppercase tracking-wide">
          No audio loaded
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-md p-3 space-y-2",
        className,
      )}
      data-ocid="audio-player"
    >
      {/* Waveform */}
      <WaveformViz isPlaying={player.isPlaying} />

      {/* Progress bar */}
      <div className="space-y-1">
        <Slider
          value={[progressPercent]}
          max={100}
          step={0.1}
          onValueChange={([v]) => player.seek((v / 100) * player.duration)}
          className="h-1.5"
          data-ocid="audio-seek"
        />
        <div className="flex justify-between text-xs font-mono text-muted-foreground">
          <span>{formatTime(player.currentTime)}</span>
          <span>{formatTime(player.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7"
          onClick={() => player.seek(0)}
          data-ocid="audio-restart"
          aria-label="Restart"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 border-accent/40 text-accent hover:bg-accent/10"
          onClick={player.togglePlay}
          disabled={player.isLoading}
          data-ocid="audio-play-pause"
          aria-label={player.isPlaying ? "Pause" : "Play"}
        >
          {player.isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7"
          onClick={player.stop}
          data-ocid="audio-stop"
          aria-label="Stop"
        >
          <Square className="w-3.5 h-3.5" />
        </Button>

        {/* Volume */}
        {!compact && (
          <div className="flex items-center gap-1.5 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6"
              onClick={() => player.setVolume(player.volume > 0 ? 0 : 1)}
              aria-label={player.volume > 0 ? "Mute" : "Unmute"}
            >
              {player.volume > 0 ? (
                <Volume2 className="w-3 h-3 text-muted-foreground" />
              ) : (
                <VolumeX className="w-3 h-3 text-muted-foreground" />
              )}
            </Button>
            <Slider
              value={[player.volume * 100]}
              max={100}
              step={1}
              onValueChange={([v]) => player.setVolume(v / 100)}
              className="w-16 h-1"
              data-ocid="audio-volume"
            />
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 ml-auto font-display text-xs uppercase tracking-wide border-border text-muted-foreground hover:text-foreground"
          onClick={handleDownload}
          data-ocid="audio-download"
        >
          <Download className="w-3 h-3 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
}
