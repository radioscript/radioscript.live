'use client';

import { usePostStore } from '@/store';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface Track {
  title: string;
  src: string;
  thumbnail: string;
}

export const ReactAudioPlayer: React.FC = () => {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const error = usePostStore((state) => state.error);
  const fetchPosts = usePostStore((state) => state.fetchPosts);

  useEffect(() => {
    fetchPosts(1, 10, '');
  }, [fetchPosts]);

  const tracks: Track[] = posts
    .map((post) => {
      const audioMeta = post.meta.find((m) => m.key === 'audio_url');
      return audioMeta ? { title: post.title, src: audioMeta.value, thumbnail: post.featuredImage.url } : null;
    })
    .filter((t): t is Track => t !== null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [sleepTimeout, setSleepTimeout] = useState<number | null>(null);
  const [sleepTimerId, setSleepTimerId] = useState<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const currentTrack = tracks[currentIndex] ?? null;

  // Update time and duration
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMeta = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMeta);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
    };
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Play/pause logic
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndex, currentTrack]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const playNext = () => setCurrentIndex((i) => (i < tracks.length - 1 ? i + 1 : repeatMode === 'all' ? 0 : i));
  const playPrev = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime > 5) audioRef.current.currentTime = 0;
      else setCurrentIndex((i) => Math.max(i - 1, 0));
    }
  };
  const handleEnded = () => {
    if (repeatMode === 'one') {
      audioRef.current?.play();
    } else {
      playNext();
    }
  };
  const cycleRepeat = () => setRepeatMode((m) => (m === 'none' ? 'all' : m === 'all' ? 'one' : 'none'));

  const scheduleSleep = (min: number) => {
    if (sleepTimerId) clearTimeout(sleepTimerId);
    const id = setTimeout(() => {
      audioRef.current?.pause();
      setIsPlaying(false);
    }, min * 60000);
    setSleepTimerId(id);
    setSleepTimeout(min);
  };
  const onSleepKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = Number((e.target as HTMLInputElement).value);
      if (!isNaN(val) && val > 0) scheduleSleep(val);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentTrack) return null;

  // Format mm:ss using slice
  const formatTime = (time: number) => {
    const iso = new Date(time * 1000).toISOString();
    return iso.slice(14, 19); // positions 14 to 18 represent mm:ss
  };

  return (
    <div className="fixed bottom-0 start-0 end-0 bg-background border-t shadow-md p-4 flex items-center z-50">
      <div className="app-container flex items-center gap-4 w-full">
        {currentTrack.thumbnail && <img src={currentTrack.thumbnail} alt={currentTrack.title} className="w-12 h-12 object-cover rounded" />}
        <div className="text-lg font-semibold truncate">{currentTrack.title}</div>
        <div className="flex gap-2 w-full">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              const t = Number(e.target.value);
              if (audioRef.current) audioRef.current.currentTime = t;
              setCurrentTime(t);
            }}
            className="w-full "
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};
