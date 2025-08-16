import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * A custom React hook to persist state in `localStorage`.
 *
 * @template T The type of the stored value.
 * @param {string} key - The key under which the value is stored in `localStorage`.
 * @param {T} initialValue - The initial value used if nothing is found in `localStorage`.
 *
 * @returns {[T, Dispatch<SetStateAction<T>>]}
 * A tuple where the first element is the stored value,
 * and the second is a setter function (like `useState`).
 *
 * @example
 * ```tsx
 * const [name, setName] = useLocalStorage<string>("username", "Guest");
 *
 * // Later
 * setName("Kanhu");
 * ```
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  // Sync across tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [storedValue, setValue];
}
