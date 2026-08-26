import { Link } from "react-router-dom";

const ListCard = ({ list, onDelete }) => {
  return (
    <div className="list-card">
      <div className="list-card-top">
        <div className="list-icon">🛒</div>

        {list.recurring && (
          <span className="recurring-badge">
            ↻ {list.recurrence}
          </span>
        )}
      </div>

      <h3>{list.name}</h3>

      <p>
        {list.recurring
          ? "Recurring shopping list"
          : "One-time shopping list"}
      </p>

      <div className="list-card-footer">
        <span>
          Created{" "}
          {new Date(list.createdAt).toLocaleDateString()}
        </span>

        <Link to={`/lists/${list._id}`}>
          Open →
        </Link>
      </div>

      <button
        className="card-delete"
        onClick={() => onDelete(list._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ListCard;