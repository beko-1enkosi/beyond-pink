import { describe, expect, it } from "vitest";
import { BRI_SUPPORT_CONTACT } from "./support-contact";

describe("Bri's approved support contact", () => {
  it("uses only the requested CANSA toll-free telephone number", () => {
    expect(BRI_SUPPORT_CONTACT.number).toBe("0800 22 66 22");
    expect(BRI_SUPPORT_CONTACT.href).toBe("tel:0800226622");
  });
  it("classifies the contact as support, not emergency care", () => {
    expect(BRI_SUPPORT_CONTACT.purpose).toBe("support line, not an emergency number");
  });
});