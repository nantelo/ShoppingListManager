import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ListCard from "../components/ListCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

import {
  getLists,
  getHistory,
} from "../services/api";
import AddItem from "./AddItem";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [lists, setLists] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [listsData, historyData] = await Promise.all([
          getLists(),
          getHistory(),
        ]);

        setLists(listsData);
        setHistory(historyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Sidebar />
        <main className="page-container">
          <Loading text="Loading dashboard..." />
        </main>
      </>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <div className="dashboard-header">
          <div>
            <div className="eyebrow">YOUR DASHBOARD</div>

            <h1>
              Hello, {user?.name?.split(" ")[0] || "there"} 👋
            </h1>

            <p>
              Keep your shopping organized and stress-free.
            </p>
          </div>

          <Link to="/lists/create" className="primary-button">
            + New list
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <span className="stat-label">Product lists</span>
                <h3>{lists.length}</h3>
              </div>

              <div className="stat-card-icon">📝</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <span className="stat-label">Purchased items</span>
                <h3>{history.length}</h3>
              </div>

              <div className="stat-card-icon">✓</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <span className="stat-label">Recurring lists</span>
                <h3>
                  {lists.filter((list) => list.recurring).length}
                </h3>
              </div>

              <div className="stat-card-icon">↻</div>
            </div>
          </div>
        </div>

        <div className="section-header">
          <div>
            <h2>Your product lists</h2>
            <p>Recently created shopping lists</p>
          </div>

          <Link to="/lists">View all →</Link>
        </div>

        {lists.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="No product lists yet"
            description="Create your first list and start planning your shopping."
            buttonText="Create your first list"
            buttonLink="/lists/create"
          />
        ) : (
          <div className="list-grid">
            {lists.slice(0, 6).map((list) => (
              <ListCard
                key={list._id}
                list={list}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
       
      </main>
       
    </>
  );
};

export default Dashboard;