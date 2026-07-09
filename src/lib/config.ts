// Central destination for every "Book a call" CTA.
//
// TODO: replace with the Calendly scheduling link once it exists, e.g.
//   export const BOOKING_URL = 'https://calendly.com/operatorstudio/intro'
// (When it becomes an external URL, the CTAs will open it in a new tab.)
//
// Until then this is an inert placeholder — it deliberately does NOT point at
// the page's #contact / footer section.
export const BOOKING_URL = '#book'

// True once BOOKING_URL is a real external link (used to open in a new tab).
export const isExternalBooking = /^https?:\/\//.test(BOOKING_URL)
