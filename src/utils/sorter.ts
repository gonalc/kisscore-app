export function sortByField<T>(field: keyof T) {
  return (a: T, b: T) => {
    const aValue = a[field]
    const bValue = b[field]

    if (aValue < bValue) return 1
    if (aValue > bValue) return -1
    return 0
  }
}
