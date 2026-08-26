const GroceryList = require("../models/GroceryList");
const GroceryItem = require("../models/GroceryItem");

const createList = async (req, res) => {
  try {
    const {
      name,
      recurring,
      recurrence,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "List name is required",
      });
    }

    const list = await GroceryList.create({
      name,
      recurring: recurring || false,
      recurrence: recurring
        ? recurrence
        : "none",
      user: req.user.id,
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await GroceryList.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(lists);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getListById = async (req, res) => {
  try {
    const list = await GroceryList.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    const items = await GroceryItem.find({
      list: list._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      list,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateList = async (req, res) => {
  try {
    const list = await GroceryList.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteList = async (req, res) => {
  try {
    const list = await GroceryList.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    await GroceryItem.deleteMany({
      list: list._id,
    });

    res.json({
      message: "List deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
};