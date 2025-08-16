/**
 * Convert slug to readable string
 * @param slug - The slug string (e.g., "hello-world")
 * @returns Readable string (e.g., "Hello World")
 */
export function slugToString(slug: string) {
  if (!slug.trim()) return slug;
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Capitalize first letter of a string
 * @param str - Input string
 * @returns String with first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Extracts initials from a full name.
 *
 * - If the name has multiple words, it returns the first letter of the first and last word.
 * - If the name has only one word, it returns the first letter only.
 *
 * @param fullName - The full name string to extract initials from.
 * @returns A string containing the initials (1 or 2 characters).
 *
 * @example
 * ```ts
 * nameInitials("John Doe"); // "JD"
 * nameInitials("Alice");    // "A"
 * nameInitials("Mary Jane Watson"); // "MW"
 * ```
 */
export const nameInitials = (fullName: string): string => {
  const splitedName = fullName.trim().split(" ").filter(Boolean);

  if (splitedName.length > 1) {
    const firstName = splitedName[0];
    const lastName = splitedName[splitedName.length - 1];
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  } else {
    return splitedName[0].charAt(0).toUpperCase();
  }
};
