const API_URL = "http://localhost:8000/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// FAKE STORE PRODUCTS
// ==========================

export const getProducts = async () => {
  try {
   

    const response = await fetch(
      "https://fakestoreapi.com/products"
    );


    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    

    return data;
  } catch (error) {
   
    throw error;
  }
};

// AUTH

export const registerUser = (userData) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const loginUser = (userData) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const getProfile = () =>
  request("/auth/profile");

// LISTS

export const getLists = () =>
  request("/lists");

export const createList = (data) =>
  request("/lists", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getList = (id) =>
  request(`/lists/${id}`);

export const updateList = (id, data) =>
  request(`/lists/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteList = (id) =>
  request(`/lists/${id}`, {
    method: "DELETE",
  });

// ITEMS

export const addItem = (listId, data) =>
  request(`/items/${listId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateItem = (id, data) =>
  request(`/items/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const togglePurchased = (id) =>
  request(`/items/${id}/purchased`, {
    method: "PATCH",
  });

export const deleteItem = (id) =>
  request(`/items/${id}`, {
    method: "DELETE",
  });

// HISTORY

export const getHistory = () =>
  request("/items/history");