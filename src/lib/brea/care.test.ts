import { describe, expect, it } from "vitest";
import { CARE_FACILITIES, CARE_PROVINCES } from "./care-data";
import { careDirections, carePhoneHref, distanceKm, EMPTY_CARE_FILTERS, filterCareFacilities } from "./care";

describe("Find Care directory rules", () => {
  it("offers all nine South African provinces", () => {
    expect(CARE_PROVINCES).toEqual(["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"]);
  });
  it("starts with fourteen unique sourced records", () => {
    expect(CARE_FACILITIES).toHaveLength(14);
    expect(new Set(CARE_FACILITIES.map((facility) => facility.id)).size).toBe(14);
    CARE_FACILITIES.forEach((facility) => expect(facility.sources.every((url) => url.startsWith("https://"))).toBe(true));
  });
  it("combines province, facility type, service and city search", () => {
    expect(filterCareFacilities({ query: "Johannesburg", province: "Gauteng", type: "private", service: "imaging" }).map((facility) => facility.id)).toEqual(["park-lane"]);
    expect(filterCareFacilities({ query: "", province: "Western Cape", type: "public", service: "clinic" }).map((facility) => facility.id)).toEqual(["groote-schuur", "tygerberg"]);
  });
  it("searches named service categories and handles empty provinces", () => {
    expect(filterCareFacilities({ ...EMPTY_CARE_FILTERS, query: "counselling" }).map((facility) => facility.id)).toEqual(["cansa-national", "cansa-pretoria"]);
    expect(filterCareFacilities({ ...EMPTY_CARE_FILTERS, province: "Limpopo" })).toEqual([]);
    expect(filterCareFacilities(EMPTY_CARE_FILTERS)).toHaveLength(14);
  });
  it("never assigns inferred imaging or treatment services to uncertain listings", () => {
    expect(CARE_FACILITIES.find((facility) => facility.id === "george")?.services).toEqual([]);
    expect(CARE_FACILITIES.find((facility) => facility.id === "albert-luthuli")?.services).toEqual([]);
    expect(CARE_FACILITIES.find((facility) => facility.id === "cansa-national")?.services).toEqual(["support"]);
  });
  it("keeps regional Pretoria support unmapped without directions", () => {
    const facility = CARE_FACILITIES.find((item) => item.id === "cansa-pretoria");
    if (!facility) throw new Error("Missing regional contact");
    expect(facility.coordinates).toBeUndefined();
    expect(careDirections(facility)).toBeNull();
    expect(carePhoneHref(facility.phone ?? "")).toBe("tel:0123293036");
  });
  it("uses the supplied published hospital and support phone numbers", () => {
    expect(carePhoneHref(CARE_FACILITIES.find((facility) => facility.id === "steve-biko")?.phone ?? "")).toBe("tel:0123541597");
    expect(carePhoneHref(CARE_FACILITIES.find((facility) => facility.id === "cansa-national")?.phone ?? "")).toBe("tel:0800226622");
  });
  it("sorts verified locations by straight-line distance and leaves unmapped contacts last", () => {
    const base = CARE_FACILITIES[0];
    if (!base) throw new Error("Missing facility");
    const location = { latitude: -25, longitude: 28 };
    const unmapped = { ...base, id: "unmapped" };
    delete unmapped.coordinates;
    const records = [{ ...base, id: "far", coordinates: [-33, 18] as const }, unmapped, { ...base, id: "near", coordinates: [-25, 28] as const }];
    expect(filterCareFacilities(EMPTY_CARE_FILTERS, location, records).map((facility) => facility.id)).toEqual(["near", "far", "unmapped"]);
    expect(distanceKm(location, [-25, 28])).toBe(0);
    expect(distanceKm({ latitude: 0, longitude: 0 }, [0, 1])).toBeCloseTo(111.195, 2);
  });
  it("requires recorded provenance for every physical pin", () => {
    CARE_FACILITIES.filter((facility) => facility.coordinates).forEach((facility) => {
      expect(facility.coordinateSource).toMatch(/^https:\/\//);
      expect(facility.coordinates?.[0]).toBeLessThan(-20);
      expect(facility.coordinates?.[1]).toBeGreaterThan(15);
    });
  });
});