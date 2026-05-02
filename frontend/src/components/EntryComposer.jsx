export default function EntryComposer({
  entryForm,
  onFieldChange,
  onSubmit,
  busy,
  error,
  message,
}) {
  return (
    <article className="card composer-card">
      <h2>Create a new record</h2>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          <span>Title</span>
          <input
            type="text"
            name="title"
            value={entryForm.title}
            onChange={onFieldChange}
            placeholder="Enter a title"
          />
        </label>

        <label>
          <span>Details</span>
          <textarea
            name="details"
            value={entryForm.details}
            onChange={onFieldChange}
            placeholder="Add notes, next steps etc."
            rows="5"
          />
        </label>

        <button className="primary-button" type="submit" disabled={busy}>
          {busy ? "Saving..." : "Save entry"}
        </button>
      </form>

      {error ? <p className="feedback error">{error}</p> : null}
      {message ? <p className="feedback success">{message}</p> : null}
    </article>
  );
}
