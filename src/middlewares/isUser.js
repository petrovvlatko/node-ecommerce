import { pool } from "../db.js";

const isUser = async (req, res, next) => {
  const { body } = req;
  const { login_username, login_password } = body;
  if (!login_username || !login_password)
    return res
      .status(400)
      .json({ message: "username and password are required." });

  let [rows] = await pool.query(
    `SELECT login_password FROM users WHERE login_username = ?`,
    [login_username]
  );
  if (rows.length > 0) {
    req.passwordHash = rows[0].login_password;
    next();
  } else {
    return res.status(401).json({ message: "NOT_USER_FOUND" });
  }
};
export { isUser };
