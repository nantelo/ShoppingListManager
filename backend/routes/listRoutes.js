const express = require("express");

const {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
} = require("../controllers/listController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getLists);

router.post("/", createList);

router.get("/:id", getListById);

router.put("/:id", updateList);

router.delete("/:id", deleteList);

module.exports = router;