import { AUTH_LABELS } from "../utils/constants";

export default function AuthPanel({
  mode,
  onModeChange,
  form,
  onFieldChange,
  onSubmit,
  busy,
  error,
  message,
}) {
  const isLogin = mode === "login";

  return (
    <main className="app-shell auth-shell">
      <section className="card auth-card">
        <div className="tabs" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={isLogin ? "tab active" : "tab"}
            onClick={() => onModeChange("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "tab active" : "tab"}
            onClick={() => onModeChange("signup")}
          >
            Signup
          </button>
        </div>

        <h2>{AUTH_LABELS[mode]}</h2>
        <p className="subtle">
          Use your email and password to access the protected dashboard.
        </p>

        <form className="form-grid" onSubmit={onSubmit}>
          {mode === "signup" && (
            <label>
              <span>Full name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onFieldChange}
                placeholder="Avery Quinn"
                autoComplete="name"
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onFieldChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onFieldChange}
              placeholder="At least 8 characters"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>

          <button className="primary-button" type="submit" disabled={busy}>
            {busy ? "Please wait..." : AUTH_LABELS[mode]}
          </button>
        </form>

        {error ? <p className="feedback error">{error}</p> : null}
        {message ? <p className="feedback success">{message}</p> : null}
        <p className="mode-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => onModeChange(isLogin ? "signup" : "login")}
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </section>
    </main>
  );
}
