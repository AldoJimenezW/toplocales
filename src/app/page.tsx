import { getStreamersData } from '@/lib/kick-api';
import { StreamerCard } from '@/components/StreamerCard';

const STREAMER_USERNAMES = [
  'rakyz',
  'elflaco',
  'picklez',
  'ekiztres',
  'quantumsillo',
  'role7',
];

export const dynamic = 'force-dynamic';
export const revalidate = 30;

export default async function Home() {
  const streamers = await getStreamersData(STREAMER_USERNAMES);
  const liveStreamers = streamers.filter(s => s.isLive);
  const offlineStreamers = streamers.filter(s => !s.isLive);
  const sortedStreamers = [...liveStreamers, ...offlineStreamers];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-radial from-green-900/20 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-black/40 border-b border-green-500/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                    <span className="text-black font-black text-lg">T</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl blur opacity-60" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Top<span className="text-green-400">locales</span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative px-4 py-2 rounded-full bg-black/60 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    {liveStreamers.length > 0 ? (
                      <>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="text-sm text-white font-medium">
                          <span className="text-green-400 font-bold">{liveStreamers.length}</span> en vivo
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-600"></span>
                        <span className="text-sm text-neutral-400">Todos offline</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortedStreamers.map((streamer) => (
              <StreamerCard key={streamer.username} streamer={streamer} />
            ))}
          </div>

          {streamers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
              <p className="mt-6 text-neutral-400 text-lg font-medium">Cargando streamers...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
