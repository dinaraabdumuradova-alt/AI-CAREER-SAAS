'use client';

import { useState, useEffect } from 'react';

interface TimeZone {
  name: string;
  timezone: string;
  emoji: string;
  offset: number;
}

const timezones: TimeZone[] = [
  { name: 'New York', timezone: 'America/New_York', emoji: '🗽', offset: -5 },
  { name: 'London', timezone: 'Europe/London', emoji: '🇬🇧', offset: 0 },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', emoji: '🗼', offset: 9 },
  { name: 'Sydney', timezone: 'Australia/Sydney', emoji: '🇦🇺', offset: 10 },
  { name: 'Dubai', timezone: 'Asia/Dubai', emoji: '🌴', offset: 4 },
  { name: 'Singapore', timezone: 'Asia/Singapore', emoji: '🇸🇬', offset: 8 },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', emoji: '☀️', offset: -8 },
  { name: 'Berlin', timezone: 'Europe/Berlin', emoji: '🇩🇪', offset: 1 },
];

export default function DigitalClock() {
  const [times, setTimes] = useState<{ [key: string]: string }>({});
  const [currentUTC, setCurrentUTC] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};

      timezones.forEach((tz) => {
        const time = new Date().toLocaleString('en-US', {
          timeZone: tz.timezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        newTimes[tz.timezone] = time;
      });

      const utcTime = new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      setTimes(newTimes);
      setCurrentUTC(utcTime);
      setIsLoaded(true);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading world clocks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
          🌍 World Clock
        </h1>
        <p className="text-gray-300 text-lg">
          Real-time display of current time across major time zones
        </p>
      </div>

      {/* UTC Display */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-cyan-500/30 rounded-xl p-6 shadow-2xl">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            Coordinated Universal Time (UTC)
          </p>
          <p className="text-cyan-400 text-4xl md:text-5xl font-mono font-bold drop-shadow-lg">
            {currentUTC}
          </p>
        </div>
      </div>

      {/* Time Zones Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {timezones.map((tz) => (
            <div
              key={tz.timezone}
              className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-cyan-500/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
            >
              {/* Location */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{tz.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-lg">{tz.name}</p>
                    <p className="text-gray-400 text-xs">
                      UTC {tz.offset > 0 ? '+' : ''}{tz.offset}
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Display */}
              <div className="bg-black/40 rounded-lg p-4 border border-cyan-500/10">
                <p className="text-cyan-400 text-3xl md:text-4xl font-mono font-bold drop-shadow-lg tracking-wider">
                  {times[tz.timezone]}
                </p>
              </div>

              {/* Timezone Code */}
              <p className="text-gray-500 text-xs mt-4 font-mono break-words">
                {tz.timezone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <p className="text-gray-500 text-sm">
          ⏰ Last updated: {new Date().toLocaleString()}
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Time updates automatically every second
        </p>
      </div>
    </div>
  );
}
