/**
 * Format a date into a human-readable date string.
 *
 * @param {Date | string | number} dateInput - The input date (Date object, ISO string, or timestamp).
 * @param {string} [locale="en-IN"] - Locale for formatting.
 * @param {Intl.DateTimeFormatOptions} [options] - Formatting options.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (
  dateInput: Date | string | number,
  locale: string = "en-IN",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }
): string => {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date input");
  }

  return d.toLocaleDateString(locale, options);
};

/**
 * Format a date into a human-readable time string.
 *
 * @param {Date | string | number} date - The input date (Date object, ISO string, or timestamp).
 * @param {Intl.DateTimeFormatOptions} options - Formatting options (default: HH:mm).
 * @param {string} locale - Locale for formatting (default: 'en-GB' for 24h format).
 * @returns {string} - Formatted time string.
 */
export const formatTime = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" },
  locale: string = "en-IN" // defaults to 24h style
): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date input");
  }

  return d.toLocaleTimeString(locale, options);
};

/**
 * Format a UTC date string into a localized human-readable string.
 *
 * @param {Date | string | number} dateInput - Date object, ISO string, or timestamp.
 * @param {string} locale - Locale for formatting (default: 'en-IN').
 * @param {Intl.DateTimeFormatOptions} options - Formatting options.
 * @returns {string} - Formatted localized date-time string.
 *
 * Example:
 * formatDateTimeToLocale("2024-08-24T14:30:00Z", "en-IN");
 * → "24 August 2024, 8:00 pm"
 */
export const formatDateTimeToLocale = (
  dateInput: Date | string | number,
  locale: string = "en-IN",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }
): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  return date.toLocaleString(locale, options);
};

/**
 * Format a date into a UTC-based string (consistent across environments).
 *
 * @param {Date | string | number} dateInput - Date, ISO string, or timestamp.
 * @param {"iso" | "readable"} [format="iso"] - Output format type.
 * @param {string} [locale="en-IN"] - Locale for human-readable formatting (ignored in ISO mode).
 * @returns {string} - UTC formatted string.
 *
 * Example:
 * constructUTCFormat("2025-08-16T11:00:00Z", "iso");
 * → "2025-08-16T11:00:00.000Z"
 *
 * constructUTCFormat("2025-08-16T11:00:00Z", "readable", "en-IN");
 * → "16 Aug 2025, 11:00:00 UTC"
 */
export const constructUTCFormat = (
  dateInput: Date | string | number,
  format: "iso" | "readable" = "iso",
  locale: string = "en-IN"
): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  if (format === "iso") {
    return date.toISOString(); // machine-friendly UTC
  }

  // human-readable UTC format
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: false,
  });
};

/**
 * Calculate the time difference between two dates.
 *
 * @param {Date | string | number} date1 - First date (Date object, timestamp, or parseable string)
 * @param {Date | string | number} date2 - Second date (Date object, timestamp, or parseable string)
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 *          An object with hierarchical difference
 */
export function timeDifference(
  date1: Date | string,
  date2: Date | string
): { days: number; hours: number; minutes: number; seconds: number } {
  if (!(date1 instanceof Date)) date1 = new Date(date1);
  if (!(date2 instanceof Date)) date2 = new Date(date2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error("Invalid date input");
  }

  // Difference in milliseconds
  const diff = Math.abs(date1.getTime() - date2.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
