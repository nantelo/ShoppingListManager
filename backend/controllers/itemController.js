const GroceryItem = require("../models/GroceryItem");
const GroceryList = require("../models/GroceryList");

const addItem = async (req, res) => {
  try {
    const {
      name,
      quantity,
      unit,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Item name is required",
      });
    }

    const list = await GroceryList.findOne({
      _id: req.params.listId,
      user: req.user.id,
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    const item = await GroceryItem.create({
      list: list._id,
      name,
      quantity: quantity || 1,
      unit: unit || "pcs",
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await GroceryItem.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const list = await GroceryList.findOne({
      _id: item.list,
      user: req.user.id,
    });

    if (!list) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedItem =
      await GroceryItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const togglePurchased = async (req, res) => {
  try {
    const item = await GroceryItem.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const list = await GroceryList.findOne({
      _id: item.list,
      user: req.user.id,
    });

    if (!list) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    item.purchased = !item.purchased;

    item.purchasedAt = item.purchased
      ? new Date()
      : null;

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await GroceryItem.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const list = await GroceryList.findOne({
      _id: item.list,
      user: req.user.id,
    });

    if (!list) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await GroceryItem.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const lists = await GroceryList.find({
      user: req.user.id,
    }).select("_id");

    const listIds = lists.map(
      (list) => list._id
    );

    const items = await GroceryItem.find({
      list: {
        $in: listIds,
      },
      purchased: true,
    })
      .populate("list", "name")
      .sort({
        purchasedAt: -1,
      });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addItem,
  updateItem,
  togglePurchased,
  deleteItem,
  getHistory,
};