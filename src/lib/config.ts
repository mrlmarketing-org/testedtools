// Central destination for every "Book a call" CTA.
//
// ⚠️ REPLACE the path below with your real Calendly event link:
//   1. Calendly → create an event type (e.g. "Intro call, 30 min")
//   2. Copy its share link and paste it here.
// Because this is now an https:// URL, `isExternalBooking` is true, so every
// CTA opens it in a new tab automatically.
export const BOOKING_URL = 'https://calendly.com/operatorstudio-sales/30min'

// True once BOOKING_URL is a real external link (used to open in a new tab).
export const isExternalBooking = /^https?:\/\//.test(BOOKING_URL)
