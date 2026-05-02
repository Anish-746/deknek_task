export default function Topbar({ user, onLogout }) {
  return (
    <section className="topbar card">
      <div>
        <h1>Welcome back, {user.name}.</h1>
      </div>

      <button className="secondary-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </section>
  );
}
