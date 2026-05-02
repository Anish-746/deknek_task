import { useState } from "react";
import { apiRequest } from "../lib/api";
import { FORM_INITIAL_STATE, SUCCESS_MESSAGES } from "../utils/constants";

export function useEntries() {
  const [entries, setEntries] = useState([]);
  const [entryForm, setEntryForm] = useState(FORM_INITIAL_STATE.entry);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function updateForm(event) {
    const { name, value } = event.target;
    setEntryForm((current) => ({ ...current, [name]: value }));
  }

  function clearMessages() {
    setError("");
    setMessage("");
  }

  async function fetchEntries() {
    setLoading(true);
    try {
      const data = await apiRequest("/entries");
      setEntries(data.entries || []);
      return data.entries || [];
    } catch (err) {
      setError(err.message);
      setEntries([]);
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function createEntry(formData) {
    setBusy(true);
    clearMessages();

    try {
      const data = await apiRequest("/entries", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setEntries((current) => [data.entry, ...current]);
      setEntryForm(FORM_INITIAL_STATE.entry);
      setMessage(SUCCESS_MESSAGES.entrySaved);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function toggleEntry(entry) {
    clearMessages();

    try {
      const data = await apiRequest(`/entries/${entry._id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !entry.completed }),
      });

      setEntries((current) =>
        current.map((item) => (item._id === entry._id ? data.entry : item)),
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function deleteEntry(entryId) {
    clearMessages();

    try {
      await apiRequest(`/entries/${entryId}`, { method: "DELETE" });
      setEntries((current) => current.filter((item) => item._id !== entryId));
      setMessage(SUCCESS_MESSAGES.entryDeleted);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  function reset() {
    setEntries([]);
    setEntryForm(FORM_INITIAL_STATE.entry);
    clearMessages();
  }

  return {
    entries,
    entryForm,
    loading,
    busy,
    error,
    message,
    updateForm,
    fetchEntries,
    createEntry,
    toggleEntry,
    deleteEntry,
    reset,
  };
}
