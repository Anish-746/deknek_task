import { formatDate } from "../utils/helpers";

export default function EntryList({
  entries,
  loading,
  onToggleEntry,
  onDeleteEntry,
}) {
  return (
    <article className="card list-card">
      <div className="list-header">
        <div>
          <h2>Saved entries</h2>
          <p className="subtle">
            Update, complete, or delete records.
          </p>
        </div>
        <span className="badge">{loading ? "Syncing" : "Live"}</span>
      </div>

      <div className="entry-list">
        {entries.length === 0 ? (
          <div className="empty-state">
            <h3>No entries yet</h3>
            <p>
              Create your first record.
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <article
              className={
                entry.completed ? "entry-card completed" : "entry-card"
              }
              key={entry._id}
            >
              <label className="entry-toggle">
                <input
                  type="checkbox"
                  checked={entry.completed}
                  onChange={() => onToggleEntry(entry)}
                />
                <span className="checkmark" />
              </label>

              <div className="entry-content">
                <div className="entry-title-row">
                  <h3>{entry.title}</h3>
                  <span>{formatDate(entry.createdAt)}</span>
                </div>
                {entry.details ? (
                  <p>{entry.details}</p>
                ) : (
                  <p className="subtle">No details added.</p>
                )}
              </div>

              <button
                className="ghost-button"
                type="button"
                onClick={() => onDeleteEntry(entry._id)}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </article>
  );
}
