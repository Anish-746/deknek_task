export const FORM_INITIAL_STATE = {
  auth: {
    name: "",
    email: "",
    password: "",
  },
  entry: {
    title: "",
    details: "",
  },
};

export const AUTH_LABELS = {
  login: "Sign in",
  signup: "Create account",
};

export const ERROR_MESSAGES = {
  loadingWorkspace: "Loading workspace...",
  fetchFailed: "Failed to fetch data",
  authFailed: "Authentication failed",
};

export const SUCCESS_MESSAGES = {
  signupSuccess: "Account created successfully.",
  loginSuccess: "Signed in successfully.",
  logoutSuccess: "You have been signed out.",
  entrySaved: "Entry saved to MongoDB.",
  entryDeleted: "Entry deleted.",
};
