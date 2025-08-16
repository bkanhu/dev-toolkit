/**
 * Formats a number into a localized currency string.
 *
 * @returns {string} The formatted currency string (e.g., `"₹1,23,456.00"`).
 */
type FormatCurrencyOptions = {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  amount: number,
  currency: string = "INR",
  options?: FormatCurrencyOptions
): string {
  const {
    locale = "en-IN",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options ?? {};

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

/**
 * Format number with custom decimal places
 * @returns Formatted number string
 *
 * @example
 * formatDecimal(123.456,2);
 * // "123.46"
 *
 */
export function formatDecimal(num: number, decimals: number = 2): string {
  if (typeof num !== "number" || isNaN(num)) return "";
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Convert number to percentage
 * @returns Percentage string
 *
 * @example
 * formatPercentage(0.1234);
 * // "12.3%"
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

/**
 * Formats a number that already represents a percentage.
 * @returns {string} Percentage string with a "%" suffix.
 *
 * @example
 * stylePercentage(12.3456);
 * // "12.35%"
 *
 * @example
 * stylePercentage(45, 0);
 * // "45%"
 */
export function stylePercentage(num: number, decimals: number = 2): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Format a number with commas as thousands separators.
 * @returns {string} The formatted number string.
 *
 * @example
 * formatNumber(1234567);
 * // "1,234,567"
 *
 * @example
 * formatNumber(1234567, "en-IN");
 * // "12,34,567"
 */
export function formatNumber(num: number, locale: string = "en-US"): string {
  return num.toLocaleString(locale);
}
