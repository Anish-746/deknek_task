import { useEffect, useState } from "react";
import AuthPanel from "./components/AuthPanel";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useEntries } from "./hooks/useEntries";
import { calculateStats } from "./utils/helpers";

function App() {
  const auth = useAuth();
  const entries = useEntries();
  const [appLoading, setAppLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const sessionRestored = await auth.restoreSession();

      if (mounted && sessionRestored) {
        await entries.fetchEntries();
      }

      if (mounted) {
        setAppLoading(false);
      }
    }

    void initialize();

    return () => {
      mounted = false;
    };
  }, []);

  // Handle auth submit (login or signup)
  async function handleAuthSubmit(event) {
    event.preventDefault();

    const success =
      auth.mode === "login"
        ? await auth.login(auth.authForm)
        : await auth.signup(auth.authForm);

    if (success) {
      await entries.fetchEntries();
    }
  }

  // Handle logout
  async function handleLogout() {
    await auth.logout();
    entries.reset();
  }

  // Handle entry submit
  async function handleEntrySubmit(event) {
    event.preventDefault();
    await entries.createEntry(entries.entryForm);
  }

  // Calculate stats from entries
  const stats = calculateStats(entries.entries);

  if (appLoading) {
    return (
      <main className="loading-card">
        <span>Loading secure workspace...</span>
      </main>
    );
  }

  if (!auth.user) {
    return (
      <AuthPanel
        mode={auth.mode}
        onModeChange={auth.setMode}
        form={auth.authForm}
        onFieldChange={auth.updateForm}
        onSubmit={handleAuthSubmit}
        busy={auth.busy}
        error={auth.error}
        message={auth.message}
      />
    );
  }

  return (
    <Dashboard
      user={auth.user}
      stats={stats}
      entries={entries.entries}
      entryForm={entries.entryForm}
      onEntryFieldChange={entries.updateForm}
      onEntrySubmit={handleEntrySubmit}
      onToggleEntry={entries.toggleEntry}
      onDeleteEntry={entries.deleteEntry}
      onLogout={handleLogout}
      busy={entries.busy}
      loadingEntries={entries.loading}
      error={entries.error || auth.error}
      message={entries.message || auth.message}
    />
  );
}

export default App;
