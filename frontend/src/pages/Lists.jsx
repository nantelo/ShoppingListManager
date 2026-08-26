import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ListCard from "../components/ListCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

import {
  getLists,
  deleteList,
} from "../services/api";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLists = async () => {
    try {
      const data = await getLists();
      setLists(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this list?"
    );

    if (!confirmed) return;

    try {
      await deleteList(id);

      setLists((prev) =>
        prev.filter((list) => list._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <div className="page-heading">
          <div>
            <div className="eyebrow">SHOPPING</div>
            <h1>My Lists</h1>
            <p>Everything you need for your next shopping trip.</p>
          </div>

          <Link to="/lists/create" className="primary-button">
            + Create list
          </Link>
        </div>

        {loading ? (
          <Loading text="Loading your lists..." />
        ) : lists.length === 0 ? (
          <EmptyState
            icon="📝"
            title="Your list is empty"
            description="Create a grocery list to start organizing your shopping."
            buttonText="Create list"
            buttonLink="/lists/create"
          />
        ) : (
          <div className="list-grid">
            {lists.map((list) => (
              <ListCard
                key={list._id}
                list={list}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Lists;