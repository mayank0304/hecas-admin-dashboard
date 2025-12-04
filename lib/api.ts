import { TodayStats, WeeklyStat } from "@/app/device/[id]/page";

const DEVICE = process.env.NEXT_API_DEVICES;
const TODAY = process.env.NEXT_API_TODAY_STATS;
const WEEKLY = process.env.NEXT_API_WEEKLY_STATS;

export async function fetchDevices() {
  const res = await fetch(`${DEVICE}?t=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
  return res.json();
}

export async function fetchToday(device: string): Promise<TodayStats> {
  const res = await fetch(`${TODAY}?device=${device}&t=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
  return res.json();
}

export async function fetchWeekly(device: string): Promise<WeeklyStat[]> {
  const res = await fetch(`${WEEKLY}?device=${device}&t=${Date.now()}`, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
  return res.json();
}
