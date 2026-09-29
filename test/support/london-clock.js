// The backend derives exemption statuses from the London calendar date, so
// anything reasoning about "today" or midnight reads the London clock
// explicitly rather than trusting the machine's local time zone.
const londonParts = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
})

export function londonNow() {
  const parts = Object.fromEntries(
    londonParts
      .formatToParts(new Date())
      .map(({ type, value }) => [type, value])
  )
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute)
  }
}

/** The London date `offsetDays` from today, as activity date form parts. */
export function londonDateParts(offsetDays = 0) {
  const { year, month, day } = londonNow()
  const date = new Date(Date.UTC(year, month - 1, day + offsetDays))
  return {
    day: String(date.getUTCDate()).padStart(2, '0'),
    month: String(date.getUTCMonth() + 1).padStart(2, '0'),
    year: String(date.getUTCFullYear())
  }
}
