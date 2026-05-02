import Entry from "../models/Entry.js";

export const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ owner: req.auth.userId }).sort({
      createdAt: -1,
    });
    return res.json({ entries });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch entries", error: error.message });
  }
};

export const createEntry = async (req, res) => {
  try {
    const { title, details = "" } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const entry = await Entry.create({
      owner: req.auth.userId,
      title: title.trim(),
      details: details.trim(),
    });

    return res.status(201).json({ entry });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to create entry", error: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const result = await Entry.deleteOne({
      _id: req.params.id,
      owner: req.auth.userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Entry not found" });
    }

    return res.json({ message: "Entry deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to delete entry", error: error.message });
  }
};
