'use client';
import WavesurferPlayer from '@wavesurfer/react';
import { Pause, Play } from 'iconsax-react';
import { useState } from 'react';

export function WavePlayer({ className }: { className: string }) {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <>
      <div className={`flex items-center gap-4 md:flex-row flex-col ${className}`}>
        <div className="flex-1 w-full">
          <WavesurferPlayer
            height={100}
            progressColor="#10B981"
            barWidth={8}
            barGap={4}
            barRadius={16}
            url="https://storage.verzion.ir/radioscript-local/media/b4b8d606-8492-49c7-83b8-851aae77d5ba-demo.mp3"
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onInteraction={() => {
              wavesurfer.play();
            }}
          />
        </div>

        <button
          className="flex items-center justify-center size-24 rounded-full bg-secondary text-secondary-foreground"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause size="48" className="fill-secondary-foreground" variant="Bold" />
          ) : (
            <Play size="56" className="fill-secondary-foreground" variant="TwoTone" />
          )}
        </button>
      </div>
    </>
  );
}
