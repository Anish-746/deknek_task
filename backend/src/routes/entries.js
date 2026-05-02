import { Router } from "express";
import {
  getEntries,
  createEntry,
  deleteEntry,
} from "../controllers/entriesController.js";

const router = Router();

router.get("/", getEntries);
router.post("/", createEntry);
router.delete("/:id", deleteEntry);

export default router;
