const express = require("express");

const {
  addItem,
  updateItem,
  togglePurchased,
  deleteItem,
  getHistory,
} = require("../controllers/itemController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/history", getHistory);

router.post("/:listId", addItem);

router.put("/:id", updateItem);

router.patch(
  "/:id/purchased",
  togglePurchased
);

router.delete("/:id", deleteItem);

module.exports = router;