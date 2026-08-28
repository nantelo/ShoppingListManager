import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
   
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span>🛒</span>
        P-Manager
      </Link>

      {token ? (
        <div className="nav-user">
          <div className="avatar" onClick={() => navigate("/profile")}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="nav-user-info">
            <strong>{user?.name || "User"}</strong>
            <span>My account</span>
          </div>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-register">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;