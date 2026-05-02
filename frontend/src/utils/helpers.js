export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function calculateStats(entries) {
  return {
    total: entries.length,
    completed: entries.filter((entry) => entry.completed).length,
    active: entries.filter((entry) => !entry.completed).length,
  };
}
