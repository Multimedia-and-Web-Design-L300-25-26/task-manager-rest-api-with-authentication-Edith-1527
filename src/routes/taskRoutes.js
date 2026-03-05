import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

// POST /api/tasks
router.post("/", async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  await task.save();
  res.status(201).json(task);
});

// GET /api/tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });
  res.json(tasks);
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  const result = await Task.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id
  });
  if (!result) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }
  res.json({ message: "Task deleted" });
});

export default router;