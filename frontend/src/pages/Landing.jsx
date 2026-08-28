import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="landing">
      <div className="landing-background-circle circle-one"></div>
      <div className="landing-background-circle circle-two"></div>
        
      <section className="landing-content">
        <div className="landing-badge">
          ✨ Simple shopping. Better planning.
        </div>

        <h1>
          shopping,
          <span> made effortless.</span>
        </h1>

        <p>
          Create smart products lists, track quantities,
          mark items as purchased, and keep your recurring
          shopping organized in one place.
        </p>

        <div className="landing-actions">
          <Link to="/register" className="primary-button large">
            Start Shopping →
          </Link>

          <Link to="/login" className="secondary-button large">
            I already have an account
          </Link>
        </div>

        <div className="landing-features">
          <div>
            <span>✓</span>
            Easy lists
          </div>

          <div>
            <span>✓</span>
            Quantity tracking
          </div>

          <div>
            <span>✓</span>
            Purchase history
          </div>
        </div>
      </section>

      <div className="landing-preview">
        <div className="preview-header">
          <div>
            <small>THIS WEEK</small>
            <h3>Weekly products</h3>
          </div>

          <span>🛒</span>
        </div>

        <div className="preview-item done">
          <span className="preview-check">✓</span>
          <span>Milk</span>
          <small>2 pcs</small>
        </div>

        <div className="preview-item">
          <span className="preview-circle"></span>
          <span>Bags</span>
          <small>2 pcs</small>
        </div>

        <div className="preview-item">
          <span className="preview-circle"></span>
          <span>Brown cosmetic</span>
          <small>2 pcs</small>
        </div>

        <div className="preview-progress">
          <div>
            <span>Progress</span>
            <strong>33%</strong>
          </div>

          <div className="progress-bar">
            <div className="progress-value" style={{ width: "33%" }} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;