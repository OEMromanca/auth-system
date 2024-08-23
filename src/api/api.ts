export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error getting item from localStorage with key "${key}":`, error)
    return null
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item in localStorage with key "${key}":`, error)
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item from localStorage with key "${key}":`, error)
  }
}
