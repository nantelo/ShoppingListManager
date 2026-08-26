import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>MENU</span>
      </div>

      <nav>
        <NavLink to="/dashboard">
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink to="/lists">
          <span>☷</span>
          My Lists
        </NavLink>

        <NavLink to="/lists/create">
          <span>＋</span>
          Create List
        </NavLink>

        <NavLink to="/history">
          <span>◷</span>
          Purchase History
        </NavLink>

        <NavLink to="/profile">
          <span>◎</span>
          Profile
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <span>💡</span>
          <div>
            <strong>Shopping tip</strong>
            <p>Plan your list before shopping.</p>
          </div>
        </div>

        <button onClick={logout} className="sidebar-logout">
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;