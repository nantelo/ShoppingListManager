import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

import { getHistory } from "../services/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <div className="page-heading">
          <div>
            <div className="eyebrow">YOUR ACTIVITY</div>
            <h1>Purchase History</h1>
            <p>Keep track of everything you've purchased.</p>
          </div>
        </div>

        {loading ? (
          <Loading text="Loading history..." />
        ) : history.length === 0 ? (
          <EmptyState
            icon="🕒"
            title="No purchase history"
            description="Purchased items will appear here."
          />
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div className="history-card" key={item._id}>
                <div className="history-check">✓</div>

                <div className="history-info">
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} {item.unit}
                    {item.list?.name &&
                      ` • ${item.list.name}`}
                  </p>
                </div>

                <div className="history-date">
                  {item.purchasedAt
                    ? new Date(
                        item.purchasedAt
                      ).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default History;