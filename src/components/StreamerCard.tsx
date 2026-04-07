'use client';

import { useState } from 'react';
import { Streamer } from '@/lib/types';

interface StreamerCardProps {
  streamer: Streamer;
}

const formatViewers = (num: number): string => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
};

export function StreamerCard({ streamer }: StreamerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const openKick = () => {
    window.open(`https://kick.com/${streamer.username}`, '_blank');
  };

  return (
    <div
      className={`group relative bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 rounded-2xl border border-neutral-800/50 transition-all duration-300 hover:border-green-500/40 ${
        isExpanded ? 'ring-2 ring-green-500/30 shadow-xl shadow-green-500/10' : ''
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-5 flex flex-col items-center">
        <div className="relative">
          <div className={`relative w-20 h-20 rounded-full overflow-hidden ring-2 transition-all duration-300 ${
            streamer.isLive ? 'ring-red-500 shadow-lg shadow-red-500/30' : 'ring-neutral-700'
          }`}>
            {streamer.profilePic && !imgError ? (
              <img
                src={streamer.profilePic}
                alt={streamer.displayName}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-700 text-white text-2xl font-bold">
                {streamer.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {streamer.isLive && (
            <div className="absolute -top-0.5 -right-0.5">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
                <div className="relative bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                  En Vivo
                </div>
              </div>
            </div>
          )}
        </div>

        <h3 className="mt-3 text-base font-bold text-white group-hover:text-green-400 transition-colors">
          {streamer.displayName}
        </h3>

        {streamer.isLive ? (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
              </svg>
              <span className="font-semibold text-red-400">{formatViewers(streamer.viewers)}</span>
              <span>espectadores</span>
            </span>
          </div>
        ) : (
          <span className="mt-1.5 text-xs text-neutral-500 font-medium">Offline</span>
        )}

        {streamer.isLive && streamer.streamCategory && (
          <div className="mt-2 px-2 py-0.5 rounded-full bg-neutral-800/80 text-[10px] text-neutral-300 font-medium">
            {streamer.streamCategory}
          </div>
        )}

        <div 
          className="mt-3 flex items-center gap-1 text-green-500/60 group-hover:text-green-400 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-xs font-medium cursor-pointer">{isExpanded ? 'Ver menos' : 'Ver más'}</span>
          <svg 
            className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4">
          <div className="border-t border-neutral-800/50 pt-4">
            {streamer.isLive ? (
              <>
                <div 
                  onClick={openKick}
                  className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-3 cursor-pointer group/thumb"
                >
                  <iframe
                    src={`https://player.kick.com/${streamer.username}?autoplay=true&muted=true`}
                    className="w-full h-full"
                    allowFullScreen
                    style={{ border: 'none' }}
                    allow="autoplay; fullscreen"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-black/30">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium text-sm text-white line-clamp-2 leading-relaxed">
                  {streamer.streamTitle || 'En vivo ahora'}
                </h4>

                <p className="mt-2 text-xs text-neutral-500">Click en el video para ver en Kick</p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-800/50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-neutral-400">Actualmente offline</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
