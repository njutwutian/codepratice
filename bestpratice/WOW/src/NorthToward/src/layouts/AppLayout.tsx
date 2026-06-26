import { NavLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h1>Demo</h1>
        <p className="sidebar-subtitle">菜单</p>
        <nav className="app-nav" defaultValue="dashboard">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
          >
            Events
          </NavLink>
        </nav>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
