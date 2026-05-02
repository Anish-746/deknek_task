export default function Stats({ total, active, completed }) {
  return (
    <section className="stats-grid">
      <article className="card stat-card">
        <span>Total entries</span>
        <strong>{total}</strong>
      </article>
      <article className="card stat-card">
        <span>Open</span>
        <strong>{active}</strong>
      </article>
      <article className="card stat-card">
        <span>Completed</span>
        <strong>{completed}</strong>
      </article>
    </section>
  );
}
