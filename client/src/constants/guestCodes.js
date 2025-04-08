/**
 * Guest code mapping for Jake's Bachelor Golf Trip
 * Maps unique anonymous codes to guest information for URL tracking
 */

export const GUEST_CODES = {
  c3d5e8: { name: "Cole Horchler", phone: "480-772-5592" },
  d6e9f1: { name: "Jake Flick", phone: "480-209-9357" },
  f2g4h6: { name: "Wyatt McPherson", phone: "480-993-5988" },
  j8k1l3: { name: "Drew Tsao", phone: "480-323-0900" },
  m5n7p9: { name: "Todd Bridges", phone: "408-334-0748" },
  q2r4s6: { name: "Matt Jirak", phone: "610-883-1444" },
  t8u1v3: { name: "Marco Ruiz", phone: "602-516-9094" },
  w5x7y9: {
    name: "Marco de Leon",
    phone: "602-510-6961",
    altPhone: "34-672-412-007",
  },
  z2a4b6: { name: "Alec Anson", phone: "480-686-1235" },
  c8d1e3: { name: "Matt Klein", phone: "602-708-0227" },
  f5g7h9: { name: "Nathan Long", phone: "480-251-7257" },
  j2k4l6: { name: "Arcangelo Rea", phone: "480-619-1603" },
  m8n1p3: { name: "Connor Tobin", phone: "602-317-1084" },
  q5r7s9: { name: "Ben Cooper", phone: "480-440-0042" },
  t2u4v6: { name: "Ryan Kates", phone: "480-246-5492" },
  w8x1y3: { name: "Gian Paolo Scorzo", phone: "480-600-5912" },
  z5a7b9: { name: "Rob Leonard", phone: "602-622-4195" },
};

/**
 * Get guest information by code
 * @param {string} code - The unique guest code
 * @returns {Object|null} - Guest information or null if not found
 */
export const getGuestByCode = (code) => {
  if (!code) return null;
  return GUEST_CODES[code] || null;
};
