import Link from "next/link";
import { fetchToday, fetchWeekly } from "@/lib/api";
import { reverseGeocodeLocation } from "@/lib/geocoding";
import {
  Ruler,
  Gauge,
  Rocket,
  ScatterChart,
  ChevronLeft,
  TrendingUp,
  MapPin,
} from "lucide-react";

// Force dynamic rendering and disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export type TodayStats = {
  totalDistanceToday: number;
  avgSpeed: number;
  maxSpeed: number;
  firstLocation: { latitude: number; longitude: number } | null;
  lastLocation: { latitude: number; longitude: number } | null;
  pointsCount: number;
};

export type WeeklyStat = {
  dayKey: string;
  totalDistance: number;
};

export default async function DevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const today = await fetchToday(id);
  const weekly = await fetchWeekly(id);

  // Reverse geocode locations
  const firstLocationAddress = await reverseGeocodeLocation(
    today.firstLocation,
  );
  const lastLocationAddress = await reverseGeocodeLocation(today.lastLocation);

  // Calculate max distance for progress bars
  const maxDistance = Math.max(...weekly.map((d) => d.totalDistance), 1);

  return (
    <div className="min-h-screen bg-[--bg] text-[--text] p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-[--primary] hover:underline mb-6"
        >
          <ChevronLeft size={20} className="mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{id}</h1>
          <p className="text-[--text-muted] text-lg">
            Device tracking insights
          </p>
        </div>

        {/* Today's Stats */}
        <h2 className="text-2xl font-semibold mb-6">Today&apos;s Stats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Distance"
            value={today.totalDistanceToday.toFixed(2)}
            unit="m"
            icon={<Ruler size={26} color="#22C55E" />}
          />
          <StatCard
            label="Average Speed"
            value={today.avgSpeed.toFixed(2)}
            unit="m/s"
            icon={<Gauge size={26} color="#22C55E" />}
          />
          <StatCard
            label="Max Speed"
            value={today.maxSpeed.toFixed(2)}
            unit="m/s"
            icon={<Rocket size={26} color="#22C55E" />}
          />
          <StatCard
            label="Data Points"
            value={today.pointsCount.toString()}
            unit=""
            icon={<ScatterChart size={26} color="#22C55E" />}
          />
        </div>

        {/* Location Data */}
        <div className="bg-[--card] border border-[--border] rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <MapPin size={24} color="#22C55E" className="mr-2" />
            <h3 className="text-xl font-semibold">Location Data</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[--bg]/50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <p className="text-[--text-muted] text-sm font-medium">
                  First Location
                </p>
              </div>
              <p className="text-[--text] text-base font-medium mb-2">
                {firstLocationAddress}
              </p>
              {today.firstLocation && (
                <p className="text-[--text-muted] text-sm font-mono">
                  {today.firstLocation.latitude.toFixed(6)},{" "}
                  {today.firstLocation.longitude.toFixed(6)}
                </p>
              )}
            </div>

            <div className="bg-[--bg]/50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <p className="text-[--text-muted] text-sm font-medium">
                  Last Location
                </p>
              </div>
              <p className="text-[--text] text-base font-medium mb-2">
                {lastLocationAddress}
              </p>
              {today.lastLocation && (
                <p className="text-[--text-muted] text-sm font-mono">
                  {today.lastLocation.latitude.toFixed(6)},{" "}
                  {today.lastLocation.longitude.toFixed(6)}
                </p>
              )}
            </div>
          </div>

          {/* Journey Summary */}
          {today.firstLocation &&
            today.lastLocation &&
            firstLocationAddress !== "No location data" &&
            lastLocationAddress !== "No location data" && (
              <div className="mt-6 pt-6 border-t border-[--border]">
                <div className="bg-linear-to-r from-[--primary]/10 to-green-400/10 rounded-lg p-4">
                  <p className="text-[--text-muted] text-sm font-medium mb-2">
                    Journey Summary
                  </p>
                  <p className="text-[--text] text-base">
                    Traveled from{" "}
                    <span className="font-semibold text-blue-400">
                      {firstLocationAddress}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-red-400">
                      {lastLocationAddress}
                    </span>
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Weekly Stats */}
        <h2 className="text-2xl font-semibold mb-6">Weekly Analytics</h2>

        {weekly.length > 0 ? (
          <div className="space-y-4">
            {weekly.map((d: WeeklyStat) => (
              <div
                key={d.dayKey}
                className="bg-[--card] border border-[--border] rounded-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[--text] font-semibold text-lg">
                    {d.dayKey}
                  </span>
                  <span className="text-[--primary] font-bold text-xl">
                    {d.totalDistance.toFixed(0)} m
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-[--border] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[--primary] to-green-400 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max((d.totalDistance / maxDistance) * 100, 2)}%`,
                    }}
                  />
                </div>

                {/* Percentage */}
                <div className="mt-2 text-right">
                  <span className="text-[--text-muted] text-sm">
                    {((d.totalDistance / maxDistance) * 100).toFixed(1)}% of max
                    day
                  </span>
                </div>
              </div>
            ))}

            {/* Weekly Summary */}
            <div className="bg-linear-to-br from-[--card] to-[--primary]/10 border border-[--border] rounded-xl p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Weekly Summary</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-[--text-muted] text-sm font-medium mb-1">
                    Total Distance
                  </p>
                  <p className="text-2xl font-bold text-[--primary]">
                    {weekly
                      .reduce((sum, day) => sum + day.totalDistance, 0)
                      .toFixed(0)}{" "}
                    m
                  </p>
                </div>

                <div>
                  <p className="text-[--text-muted] text-sm font-medium mb-1">
                    Average Daily
                  </p>
                  <p className="text-2xl font-bold text-[--text]">
                    {(
                      weekly.reduce((sum, day) => sum + day.totalDistance, 0) /
                      weekly.length
                    ).toFixed(0)}{" "}
                    m
                  </p>
                </div>

                <div>
                  <p className="text-[--text-muted] text-sm font-medium mb-1">
                    Best Day
                  </p>
                  <p className="text-2xl font-bold text-green-400">
                    {Math.max(
                      ...weekly.map((day) => day.totalDistance),
                    ).toFixed(0)}{" "}
                    m
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp size={64} color="#22C55E" className="mx-auto mb-4" />
            <p className="text-[--text-muted] text-lg">
              No weekly data available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  icon,
}: {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[--card] border border-[--border] rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="mb-3">{icon}</div>
      <p className="text-[--text-muted] text-sm font-medium mb-2">{label}</p>
      <div className="flex items-baseline">
        <p className="text-3xl font-bold text-[--text]">{value}</p>
        {unit && <p className="text-[--text-muted] text-lg ml-2">{unit}</p>}
      </div>
    </div>
  );
}
