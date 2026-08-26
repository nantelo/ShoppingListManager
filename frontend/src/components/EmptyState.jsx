import { Link } from "react-router-dom";

const EmptyState = ({
  icon = "🛒",
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      {buttonText && buttonLink && (
        <Link to={buttonLink} className="primary-button">
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;