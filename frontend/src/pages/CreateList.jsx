import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { createList } from "../services/api";

const CreateList = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    recurring: false,
    recurrence: "weekly",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const list = await createList(form);

      navigate(`/lists/${list._id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <div className="page-heading">
          <div>
            <div className="eyebrow">NEW LIST</div>
            <h1>Create a product list</h1>
            <p>Plan what you need before your next shopping trip.</p>
          </div>
        </div>

        <div className="form-container">
          <form className="form-card" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}

            <div className="form-icon">🛒</div>

            <h2>List details</h2>

            <p className="form-description">
              Give your list a name that makes it easy to recognize.
            </p>

            <div className="form-group">
              <label>List name</label>

              <input
                type="text"
                placeholder="e.g. Weekly product shopping"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.recurring}
                onChange={(e) =>
                  setForm({
                    ...form,
                    recurring: e.target.checked,
                  })
                }
              />

              Make this a recurring list
            </label>

            {form.recurring && (
              <div className="form-group">
                <label>Repeat</label>

                <select
                  value={form.recurrence}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      recurrence: e.target.value,
                    })
                  }
                >
                  <option value="daily">Every day</option>
                  <option value="weekly">Every week</option>
                  <option value="monthly">Every month</option>
                </select>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/lists")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create list"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateList;