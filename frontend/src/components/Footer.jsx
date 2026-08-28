const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <div className="footer-logo">
            🛒 <span>Shopping List</span>
          </div>

          <p>
            Organize your shopping, manage your lists,
            and make every trip easier.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="/dashboard">Dashboard</a>
            <a href="/lists">My Lists</a>
            <a href="/history">History</a>
          </div>

          <div>
            <h4>Account</h4>
            <a href="/profile">Profile</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>

          <div>
            <h4>Connect</h4>
            <a href="mailto:support@example.com">Contact</a>
            <a href="https://github.com/nantelo">GitHub</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Shopping List Manager. All rights reserved.
        </p>

        <span>Made with 💚</span>
      </div>
    </footer>
  );
};

export default Footer;