import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ItemCard from "../components/ItemCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

import {
  getList,
  togglePurchased,
  deleteItem,
} from "../services/api";

const ListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadList = async () => {
    try {
      const result = await getList(id);
      setData(result);
    } catch (error) {
      alert(error.message);
      navigate("/lists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, [id]);

  const handleToggle = async (itemId) => {
    try {
      await togglePurchased(itemId);
      await loadList();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await deleteItem(itemId);
      await loadList();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <main className="page-container">
          <Loading text="Loading list..." />
        </main>
      </>
    );
  }

  const items = data?.items || [];

  const purchased = items.filter(
    (item) => item.purchased
  ).length;

  const percentage =
    items.length > 0
      ? Math.round((purchased / items.length) * 100)
      : 0;

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <Link to="/lists" className="back-link">
          ← Back to lists
        </Link>

        <div className="list-detail-header">
          <div>
            <div className="eyebrow">SHOPPING LIST</div>

            <h1>{data?.list?.name}</h1>

            <p>
              {data?.list?.recurring
                ? `Repeats ${data.list.recurrence}`
                : "One-time shopping list"}
            </p>
          </div>

          <Link
            to={`/lists/${id}/add-item`}
            className="primary-button"
          >
            + Add item
          </Link>
        </div>

        <div className="detail-progress-card">
          <div>
            <span>Shopping progress</span>
            <strong>{percentage}%</strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-value"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <small>
            {purchased} of {items.length} items purchased
          </small>
        </div>

        <div className="section-header">
          <div>
            <h2>Items</h2>
            <p>Your shopping items</p>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon="🥕"
            title="No items yet"
            description="Add your first grocery item to this list."
            buttonText="Add item"
            buttonLink={`/lists/${id}/add-item`}
          />
        ) : (
          <div className="items-container">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default ListDetails;