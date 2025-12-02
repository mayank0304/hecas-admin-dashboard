interface GeocodeResponse {
  address: string;
  error?: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<GeocodeResponse> {
  try {
    // Using OpenStreetMap Nominatim service (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
      {
        headers: {
          "User-Agent": "HECAS Dashboard",
        },
      },
    );

    if (!response.ok) {
      return {
        address: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        error: "Geocoding service unavailable",
      };
    }

    const data = await response.json();

    if (data.error) {
      return {
        address: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
        error: data.error,
      };
    }

    // Extract meaningful address components
    const address = data.address;
    let formattedAddress = "";

    if (address) {
      const parts = [];

      // Add building/house number and road
      if (address.house_number && address.road) {
        parts.push(`${address.house_number} ${address.road}`);
      } else if (address.road) {
        parts.push(address.road);
      }

      // Add suburb/neighbourhood
      if (address.suburb || address.neighbourhood) {
        parts.push(address.suburb || address.neighbourhood);
      }

      // Add city/town
      if (address.city || address.town || address.village) {
        parts.push(address.city || address.town || address.village);
      }

      // Add state/region
      if (address.state) {
        parts.push(address.state);
      }

      // Add country
      if (address.country) {
        parts.push(address.country);
      }

      formattedAddress = parts.filter(Boolean).slice(0, 3).join(", ");
    }

    return {
      address:
        formattedAddress ||
        data.display_name ||
        `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      address: `${lat.toFixed(4)}, ${lon.toFixed(4)}`,
      error: "Failed to fetch location",
    };
  }
}

export async function reverseGeocodeLocation(
  location: Location | null,
): Promise<string> {
  if (!location) {
    return "No location data";
  }

  const result = await reverseGeocode(location.latitude, location.longitude);
  return result.address;
}

// Batch geocode multiple locations
export async function batchReverseGeocode(
  locations: (Location | null)[],
): Promise<string[]> {
  const promises = locations.map((location) =>
    location
      ? reverseGeocodeLocation(location)
      : Promise.resolve("No location data"),
  );

  // Add delay between requests to respect rate limits
  const results = [];
  for (let i = 0; i < promises.length; i++) {
    if (i > 0) {
      // 1 second delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    results.push(await promises[i]);
  }

  return results;
}
