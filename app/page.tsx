import Link from "next/link";
import { fetchDevices } from "@/lib/api";
import { BarChart3, MapPin, TrendingUp, Smartphone } from "lucide-react";

export default async function HomePage() {
  const devices = await fetchDevices();

  return (
    <div className="min-h-screen bg-[--bg] text-[--text]">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-[--card] to-[--primary]/20 border-b border-[--border]">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Device Dashboard</h1>
            <p className="text-[--text-muted] text-xl max-w-2xl mx-auto">
              Monitor and analyze your IoT devices with real-time analytics and
              insights
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[--primary]">
                  {devices.length}
                </div>
                <div className="text-[--text-muted] text-sm">
                  Active Devices
                </div>
              </div>
              <div className="w-px h-12 bg-[--border]"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-[--text-muted] text-sm">Monitoring</div>
              </div>
              <div className="w-px h-12 bg-[--border]"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  Real-time
                </div>
                <div className="text-[--text-muted] text-sm">Analytics</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Devices Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Devices</h2>
          <p className="text-[--text-muted] text-lg">
            Click on any device to view detailed analytics and tracking data
          </p>
        </div>

        {devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devices.map((device: string) => (
              <Link
                key={device}
                href={`/device/${device}`}
                className="group block"
              >
                <div className="bg-[--card] border border-[--border] rounded-2xl p-8 hover:bg-[--card-hover] hover:border-[--primary]/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Device ID */}
                  <p className="text-[--text-muted] text-lg mb-4 font-mono">
                    {device}
                  </p>

                  {/* Status Indicator */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">
                      Active
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <div className="w-full bg-[--primary]/10 text-[--primary] border border-[--primary]/20 rounded-lg py-3 text-center font-semibold group-hover:bg-[--primary] group-hover:text-white transition-all duration-300">
                      View Analytics
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Smartphone size={80} color="#22C55E" className="mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">No Devices Found</h3>
            <p className="text-[--text-muted] text-lg">
              Connect your first device to start tracking
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 pt-20 border-t border-[--border]">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Powerful Analytics</h3>
            <p className="text-[--text-muted] text-lg">
              Everything you need to monitor and analyze your devices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[--primary]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={32} color="#22C55E" />
              </div>
              <h4 className="text-xl font-bold mb-2">Real-time Data</h4>
              <p className="text-[--text-muted]">
                Monitor your devices with live data updates and instant alerts
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[--primary]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} color="#22C55E" />
              </div>
              <h4 className="text-xl font-bold mb-2">Location Tracking</h4>
              <p className="text-[--text-muted]">
                Track device locations with precise GPS coordinates and movement
                data
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[--primary]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} color="#22C55E" />
              </div>
              <h4 className="text-xl font-bold mb-2">Detailed Analytics</h4>
              <p className="text-[--text-muted]">
                Get comprehensive insights with daily and weekly statistics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
