import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import {
  getProducts,
  addItem,
} from "../services/api";

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [quantity, setQuantity] = useState(1);

  const [unit, setUnit] = useState("pcs");

  const [loading, setLoading] = useState(true);

  const [adding, setAdding] = useState(false);

  const [error, setError] = useState("");

  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ==========================
  // ADD ITEM TO MONGODB
  // ==========================
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedProduct) {
    setError("Please select a product");
    return;
  }

  setAdding(true);
  setError("");

  try {
    await addItem(id, {
      name: selectedProduct.title,
      quantity: Number(quantity),
      unit: unit,
    });

    navigate(`/lists/${id}`);
  } catch (error) {
    setError(error.message);
  } finally {
    setAdding(false);
  }
};

  return (
    <>
      <Sidebar />

      <main className="page-container">
        <div className="page-heading">
          <div>
            <div className="eyebrow">
              ADD ITEM
            </div>

            <h1>Add Product item</h1>

            <p>
              Choose a product and add it to your
              shopping list.
            </p>
          </div>
        </div>

        <div className="form-container">
          <form
            className="form-card"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="error">
                {error}
              </div>
            )}

            <div className="form-icon">
              🛒
            </div>

            <h2>
              Select a product
            </h2>

            <p className="form-description">
              Choose a product from the available
              products.
            </p>

            {/* PRODUCTS */}

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>

                <p>
                  Loading products...
                </p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`product-select-card ${
                      selectedProduct?.id ===
                      product.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                    />

                    <div className="product-info">
                      <h3>
                        {product.title}
                      </h3>

                      <p>
                        ${product.price}
                      </p>
                    </div>

                    {selectedProduct?.id ===
                      product.id && (
                      <div className="product-selected">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* QUANTITY */}

            {selectedProduct && (
              <>
                <div className="selected-product">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                  />

                  <div>
                    <span>
                      Selected product
                    </span>

                    <strong>
                      {selectedProduct.title}
                    </strong>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Unit
                    </label>

                    <select
                      value={unit}
                      onChange={(e) =>
                        setUnit(
                          e.target.value
                        )
                      }
                    >
                      <option value="pcs">
                        Pieces
                      </option>

                      <option value="kg">
                        Kilograms
                      </option>

                      <option value="g">
                        Grams
                      </option>

                      <option value="l">
                        Litres
                      </option>

                      <option value="ml">
                        Millilitres
                      </option>

                      <option value="pack">
                        Pack
                      </option>

                      <option value="dozen">
                        Dozen
                      </option>
                    </select>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      navigate(
                        `/lists/${id}`
                      )
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                    disabled={adding}
                  >
                    {adding
                      ? "Adding..."
                      : "Add to list"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default AddItem;