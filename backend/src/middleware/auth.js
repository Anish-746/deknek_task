import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const cookieToken = req.cookies?.token;
  const token = bearerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = payload;
    return next();
  } catch {
    return res
      .status(401)
      .json({ message: "Session expired. Please sign in again." });
  }
}
