import { CARE_FACILITIES, CARE_SERVICES, type CareFacility } from "./care-data";

export type CareFilters = { query: string; province: string; type: string; service: string };
export const EMPTY_CARE_FILTERS: CareFilters = { query: "", province: "all", type: "all", service: "all" };
export type CareLocation = { latitude: number; longitude: number };

export function distanceKm(location: CareLocation, coordinates: readonly [number, number]): number {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const lat = radians(coordinates[0] - location.latitude);
  const lon = radians(coordinates[1] - location.longitude);
  const a = Math.sin(lat / 2) ** 2 + Math.cos(radians(location.latitude)) * Math.cos(radians(coordinates[0])) * Math.sin(lon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}

export function filterCareFacilities(filters: CareFilters, location: CareLocation | null = null, facilities: readonly CareFacility[] = CARE_FACILITIES): CareFacility[] {
  const words = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const result = facilities.filter((facility) => {
    const text = [facility.name, facility.city, facility.province, facility.type, facility.description, ...facility.services.map((service) => CARE_SERVICES[service])].join(" ").toLowerCase();
    return (filters.province === "all" || facility.province === filters.province)
      && (filters.type === "all" || facility.type === filters.type)
      && (filters.service === "all" || facility.services.some((service) => service === filters.service))
      && words.every((word) => text.includes(word));
  });
  if (location) result.sort((a, b) => {
    const first = a.coordinates ? distanceKm(location, a.coordinates) : Infinity;
    const second = b.coordinates ? distanceKm(location, b.coordinates) : Infinity;
    return first === second ? 0 : first - second;
  });
  return result;
}

export function careDirections(facility: CareFacility): string | null {
  if (!facility.address) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${facility.name}, ${facility.address}, South Africa`)}`;
}

export function carePhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}