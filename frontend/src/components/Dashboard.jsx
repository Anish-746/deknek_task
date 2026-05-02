import Topbar from "./Topbar";
import Stats from "./Stats";
import EntryComposer from "./EntryComposer";
import EntryList from "./EntryList";

export default function Dashboard({
  user,
  stats,
  entries,
  entryForm,
  onEntryFieldChange,
  onEntrySubmit,
  onToggleEntry,
  onDeleteEntry,
  onLogout,
  busy,
  loadingEntries,
  error,
  message,
}) {
  return (
    <main className="app-shell dashboard-shell">
      <Topbar user={user} onLogout={onLogout} />
      <Stats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />
      <section className="workspace-grid">
        <EntryComposer
          entryForm={entryForm}
          onFieldChange={onEntryFieldChange}
          onSubmit={onEntrySubmit}
          busy={busy}
          error={error}
          message={message}
        />
        <EntryList
          entries={entries}
          loading={loadingEntries}
          onToggleEntry={onToggleEntry}
          onDeleteEntry={onDeleteEntry}
        />
      </section>
    </main>
  );
}
