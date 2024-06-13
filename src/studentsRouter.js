const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  findById,
  update,
  deleteById,
} = require("./students_controller");
const { authenticateToken, authorizeRole } = require("./authMiddleware");

router.get("/", authenticateToken, authorizeRole("user"), findAll);

router.post("/", authenticateToken, authorizeRole("admin"), create);

router.get("/:id", authenticateToken, authorizeRole("user"), findById);

router.put("/:id", authenticateToken, authorizeRole("admin"), update);

router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteById);

module.exports = router;
