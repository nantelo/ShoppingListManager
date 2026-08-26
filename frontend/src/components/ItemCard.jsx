const ItemCard = ({ item, onToggle, onDelete }) => {
  return (
    <div className={`item-card ${item.purchased ? "item-done" : ""}`}>
      <div className="item-left">
        <button
          className={`check-button ${
            item.purchased ? "checked" : ""
          }`}
          onClick={() => onToggle(item._id)}
        >
          {item.purchased ? "✓" : ""}
        </button>

        <div>
          <h4>{item.name}</h4>

          <span>
            {item.quantity} {item.unit}
          </span>
        </div>
      </div>

      <button
        className="item-delete"
        onClick={() => onDelete(item._id)}
      >
        ×
      </button>
    </div>
  );
};

export default ItemCard;