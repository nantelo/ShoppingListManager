import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { addItem } from "../services/api";

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    unit: "pcs",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await addItem(id, {
        name: form.name,
        quantity: Number(form.quantity),
        unit: form.unit,
      });

      navigate(`/lists/${id}`);
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
            <div className="eyebrow">ADD ITEM</div>
            <h1>Add grocery item</h1>
            <p>Add something you need to buy.</p>
          </div>
        </div>

        <div className="form-container">
          <form className="form-card" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}

            <div className="form-icon">🥦</div>

            <h2>Item details</h2>

            <p className="form-description">
              Enter the item and the quantity you need.
            </p>

            <div className="form-group">
              <label>Item name</label>

              <input
                type="text"
                placeholder="e.g. Apples"
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

            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>

                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Unit</label>

                <select
                  value={form.unit}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      unit: e.target.value,
                    })
                  }
                >
                  <option value="pcs">Pieces</option>
                  <option value="kg">Kilograms</option>
                  <option value="g">Grams</option>
                  <option value="l">Litres</option>
                  <option value="ml">Millilitres</option>
                  <option value="pack">Pack</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(`/lists/${id}`)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add item"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default AddItem;