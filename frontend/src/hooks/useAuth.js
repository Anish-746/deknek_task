import { useState } from "react";
import { apiRequest } from "../lib/api";
import { FORM_INITIAL_STATE, SUCCESS_MESSAGES } from "../utils/constants";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState(FORM_INITIAL_STATE.auth);
  const [mode, setMode] = useState("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function updateForm(event) {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  }

  function clearMessages() {
    setError("");
    setMessage("");
  }

  async function login(credentials) {
    setBusy(true);
    clearMessages();

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      setUser(data.user);
      setAuthForm(FORM_INITIAL_STATE.auth);
      setMessage(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function signup(credentials) {
    setBusy(true);
    clearMessages();

    try {
      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      setUser(data.user);
      setAuthForm(FORM_INITIAL_STATE.auth);
      setMessage(SUCCESS_MESSAGES.signupSuccess);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    clearMessages();

    try {
      await apiRequest("/auth/logout", { method: "POST" });
      setUser(null);
      setMode("login");
      setAuthForm(FORM_INITIAL_STATE.auth);
      setMessage(SUCCESS_MESSAGES.logoutSuccess);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function restoreSession() {
    try {
      const session = await apiRequest("/auth/me");
      setUser(session.user);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  }

  return {
    user,
    authForm,
    mode,
    busy,
    error,
    message,
    setMode,
    updateForm,
    login,
    signup,
    logout,
    restoreSession,
  };
}
